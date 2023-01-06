from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.videos_form import VideoForm
from app.forms.comments_form import CommentForm
from app.models import User, Video, Comment, db
from datetime import datetime
from app.api.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_file_from_s3
)
import pdb, time, json

video_routes = Blueprint('videos', __name__)

#get all the videos
@video_routes.route('/')
def get_all_videos():
    videos = Video.query.all()
    data = [video.to_dict() for video in videos]
    return {"Videos": data}, 200

#get one video by id
@video_routes.route('/<int:video_id>')
def get_video_by_id(video_id):
    print(f"{video_id=}")
    
    video = Video.query.get(video_id)
    # import pdb;pdb.set_trace()
   
    video.view_counts = video.view_counts + 1

    return video.to_dict(), 200

#creat a video
@video_routes.route('/', methods=['POST'])
@login_required
def create_video():
    # import pdb;pdb.set_trace()
    form=VideoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print(form, "##################")
    if form.validate_on_submit():
        video=Video()
        form.populate_obj(video)

        video.user_id=current_user.id

        db.session.add(video)
        db.session.commit()

        return video.to_dict()
    else:
        return  {'errors': validation_errors_to_error_messages(form.errors)}, 400

#Add video to AWS
@video_routes.route('/upload-video', methods=["POST"])
@login_required
def add_video_to_s3():

    #request.files is in the a dictionary: in this case {thumbnail_pic: <filestorage: 'xxxx.jpg'>, content: <filestorage:'xxxx.mp4'>} xxxhere are the name you stored this file in our local folder
    if "content" not in request.files:
        return {"errors": "Video file is required."}, 400
    print("request****************", request)
    #content is the <filestorage: 'xxxx.mp4'> binary form of the video
    content=request.files["content"]
    
    #request.filename is the string of file name: 'xxx.mp4'
    if not allowed_file(content.filename):
        return {"errors": "This file does not meet the format requirement."}, 400

    #here is to get the unique/hashed filename: the file name here are random letters and numbers, not the one you originally named in your local folder
    content.filename=get_unique_filename(content.filename)

    #videol_upload will return {"url": 'http//bucketname.s3.amazonaws.com/xxxx.mp4} xxx are the random letter and numbers filename
    video_uploaded = upload_file_to_s3(content)
    print("video_uploaded!!!!!!!!!!!!!!!!!!!!!!!!!", video_uploaded)
    if "url" not in video_uploaded:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return video_uploaded, 400

    #this url will be store in the database. The database will only have this url, not the actual photo or video which are stored in aws.
    video_url=video_uploaded["url"]
    # flask_login allows us to get the current user from the request

    #do the same for thumbnail picture
    if "thumbnail_pic" not in request.files:
        return {"errors": "Image File is Required"}, 400

    picture = request.files["thumbnail_pic"]
    print('picture@@@@@@@@@@@@@@@@', picture)

    if not allowed_file(picture.filename):
        return {"errors": "This file does not meet the format requirement."}, 400

    picture.filename = get_unique_filename(picture.filename)

    thumbnail_uploaded = upload_file_to_s3(picture)

    print("thumbnail_uploaded!!!!!!!!!!!!!!!!!", thumbnail_uploaded)

    if "url" not in thumbnail_uploaded:
        return thumbnail_uploaded, 400

    thumbnail_url = thumbnail_uploaded["url"]
    print("thumbnail_url@@@@@@@@@@@@@", thumbnail_url)

    #here we will form a video and save it to the db according to the keys defined in the model
    # thumbnailpicture and video url are obtained above, from request.files
    #while description and title are obtained from request.form
    #request.form returns a object similar format as request.files : {"title": xxx, "description": xxx}
    print("current_user", current_user)
    uploaded_video = Video(
            description=request.form.get('description'),
            title=request.form.get('title'),
            thumbnail_pic=thumbnail_url,
            url=video_url,
            user_id=current_user.id,
            )
    print('uploaded_video!!!!!!!!!!!!!!!!!', uploaded_video)
    #then add and commit to database, in this process the new video id and createdat, updated at will be generated
    db.session.add(uploaded_video)
    db.session.commit()

    # since the id, created at and updated at are new info, refresh() function is needed to send those info to the frontend
    # so that it knows which page to turn to . and then to update the time accordingly
    db.session.refresh(uploaded_video)
    print('uploaded_video.to_dict()', uploaded_video.to_dict())
    return  uploaded_video.to_dict()

#edit a video
@video_routes.route('/<int:video_id>', methods=['POST'])
@login_required
def edit_video(video_id):
    video=Video.query(video_id=video_id).get()
    import pdb;pdb.set_trace()
    if video is not None:
        form=VideoForm(request.form, obj=video)
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(video)
            db.session.commit()
            return video.to_dict(), 200
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    else:
        return {'errors': "video not found"}, 400


#edit video on aws
@video_routes.route('/<int:video_id>/update-video', methods=['POST'])
@login_required

def update_video_on_s3(video_id):
    video=Video.query.get(video_id)

    # pdb.set_trace()
    #delete the original video and its picture on aws    
    if "content" not in request.files and "thumbnail_pic" not in request.files:
        video_url = video.url
        thumbnail_url=video.thumbnail_pic

        video.description=request.form.get('description')
        video.title=request.form.get('title')
        video.thumbnail_pic=thumbnail_url
        video.url=video_url
    
 
        db.session.commit()
        db.session.refresh(video)
        return  video.to_dict()

    if "content" not in request.files and "thumbnail_pic" in request.files:
        video_url = video.url
        picture = request.files["thumbnail_pic"]


        if not allowed_file(picture.filename):
            return {"errors": "This file does not meet the format requirement."}, 400

        picture.filename = get_unique_filename(picture.filename)

        thumbnail_uploaded = upload_file_to_s3(picture)


        if "url" not in thumbnail_uploaded:
            return thumbnail_uploaded, 400

        thumbnail_url = thumbnail_uploaded["url"]

    

        video.description=request.form.get('description')
        video.title=request.form.get('title')
        video.thumbnail_pic=thumbnail_url
        video.url=video_url
        
    
        db.session.commit()
        db.session.refresh(video)
        return  video.to_dict()

    if "content" in request.files and "thumbnail_pic" not in request.files:
        thumbnail_url=video.thumbnail_pic
        content=request.files["content"]

        if not allowed_file(content.filename):
            return {"errors": "This file does not meet the format requirement."}, 400

        content.filename=get_unique_filename(content.filename)

        video_uploaded = upload_file_to_s3(content)

        if "url" not in video_uploaded:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return video_uploaded, 400

        video_url=video_uploaded["url"]
        # flask_login allows us to get the current user from the request
        video.description=request.form.get('description')
        video.title=request.form.get('title')
        video.thumbnail_pic=thumbnail_url
        video.url=video_url
    
 
        db.session.commit()
        db.session.refresh(video)
        return  video.to_dict()
    
    
    if video is not None and len(video.url) > 0:

        url=video.url

        video_filename=url.split(".com/")[1]
        delete_file_from_s3(video_filename)
    if video is not None and len(video.thumbnail_pic) > 0:
        thumbnail_pic = video.thumbnail_pic
        thumbNail_filename= thumbnail_pic.split(".com/")[1]
        delete_file_from_s3(thumbNail_filename)

    #commit the requested video and its picture 
    # if "content" not in request.files:
    #     return {"errors": "Video file is required."}, 400

    


    content=request.files["content"]

    if not allowed_file(content.filename):
        return {"errors": "This file does not meet the format requirement."}, 400

    content.filename=get_unique_filename(content.filename)

    video_uploaded = upload_file_to_s3(content)

    if "url" not in video_uploaded:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return video_uploaded, 400

    video_url=video_uploaded["url"]
    # flask_login allows us to get the current user from the request

    #do the same for thumbnail picture
    # if "thumbnail_pic" not in request.files:
    #     return {"errors": "Image File is Required"}, 400

  


    picture = request.files["thumbnail_pic"]


    if not allowed_file(picture.filename):
        return {"errors": "This file does not meet the format requirement."}, 400

    picture.filename = get_unique_filename(picture.filename)

    thumbnail_uploaded = upload_file_to_s3(picture)


    if "url" not in thumbnail_uploaded:
        return thumbnail_uploaded, 400

    thumbnail_url = thumbnail_uploaded["url"]

 

    video.description=request.form.get('description')
    video.title=request.form.get('title')
    video.thumbnail_pic=thumbnail_url
    video.url=video_url
    
 
    db.session.commit()
    db.session.refresh(video)
    return  video.to_dict()


#delete a video
@video_routes.route('/<int:video_id>', methods=['DELETE'])
@login_required
def delete_video(video_id):
    video=Video.query.get(video_id)
    # import pdb; pdb.set_trace()

    #delete video on aws and db
    if video is not None:
        if(len(video.url) > 0):
            delete_file_from_s3(video.url.split(".com/")[1])
        if len(video.thumbnail_pic) > 0:
            delete_file_from_s3(video.thumbnail_pic.split(".com/")[1])
    
        db.session.delete(video)
        db.session.commit()
        return {"message": "video successfully deleted"}, 200
    else:
        return {"errors": "video not found"}, 404

#get all the comments
@video_routes.route('/<int:video_id>/comments')
def get_all_comments(video_id):

    comments = Comment.query.filter( Comment.video_id == video_id ).all()
    print('comments$$$$$$$$$$$$', comments)
    data = [comment.to_dict() for comment in comments]
    print('comment data!!!!!', data)
    return {"Comments": data}, 200

#post a comment
@video_routes.route('/<int:video_id>/comments', methods=['POST'])
@login_required
def post_comment(video_id):
    print("gets here!!!!!!!!!!")
    #pdb.set_trace()
    form=CommentForm()
    form['csrf_token'].data=request.cookies['csrf_token']
    if form.validate_on_submit():
        comment=Comment()
        form.populate_obj(comment)

        comment.user_id=current_user.id 
        comment.video_id = video_id
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#edit a comment
@video_routes.route('/comments/<int:comment_id>', methods=['POST'])
@login_required
def edit_comment(comment_id):
    #import pdb; pdb.set_trace()
    comment = Comment.query.get(comment_id)
    if comment is not None:
        form=CommentForm()
        form['csrf_token'].data=request.cookies['csrf_token']
        form.populate_obj(comment)
        if form.validate_on_submit():
            db.session.commit()
            return comment.to_dict(), 200
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400
    
    else:
        return {"errors": "comment not found"}, 404

#delete a comment
@video_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment is not None:
        db.session.delete(comment)
        db.session.commit()
        return {"message": "comment successfully deleted"}, 200
    else:
        return {"errors": "comment not found"}, 404