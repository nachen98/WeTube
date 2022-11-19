from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.videos_form import VideoForm
from app.forms.comments_form import CommentForm
from app.models import User, Video, Comment, db
from datetime import datetime

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
    #import pdb;pdb.set_trace()
    video = Video.query.get(video_id)
    return video.to_dict(), 200

#creat a video
@video_routes.route('/', methods=['POST'])
@login_required
def create_video():
    form=VideoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        video=Video()
        form.populate_obj(video)

        video.user_id=current_user.id 
        video.created_at=datetime.now()
        video.updated_at=datetime.now()

        db.session.add(video)
        db.session.commit()

        return video.to_dict()
    else:
        return  {'errors': validation_errors_to_error_messages(form.errors)}, 400

#edit a video
@video_routes.route('/<int:video_id>', methods=['POST'])
@login_required
def edit_video(video_id):
    video=Video.query.get(video_id)

    if video is not None:
        form=VideoForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(video)
            db.session.commit()
            return video.to_dict(), 200
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    else:
        return {'errors': "video not found"}, 400

#delete a video
@video_routes.route('/<int:video_id>', methods=['DELETE'])
@login_required
def delete_video(video_id):
    video=Video.query.get(video_id)
    # import pdb; pdb.set_trace()
    if video is not None:
        db.session.delete(video)
        db.session.commit()
        return {"message": "video successfully deleted"}, 200
    else:
        return {"errors": "video not found"}, 404

#get all the comments
@video_routes.route('/<int:video_id>/comments')
def get_all_comments(video_id):
    comments = Comment.query.filter( Comment.video_id == video_id ).all()
    # print('hello!!!!!!!!!!')
    # print('video_id!!!!!!!!', video_id)
    # data=[]
    data = [comment.to_dict() for comment in comments]
    return {"Comments": data}, 200

#post a comment
@video_routes.route('/<int:video_id>/comments', methods=['POST'])
@login_required
def post_comment(video_id):

    form=CommentForm()
    form['csrf_token'].data=request.cookies['csrf_token']
    if form.validate_on_submit():
        comment=Comment()
        form.populate_obj(comment)

        comment.user_id=current_user.id 
        comment.video_id = video_id
        comment.created_at=datetime.now()
        comment.updated_at=datetime.now()
   
        db.session.add(comment)
        db.session.commit()

        return comment.to_dict()
    
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#edit a comment
@video_routes.route('/comments/<int:comment_id>', methods=['POST'])
@login_required
def edit_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment is not None:
        form=CommentForm()
        form['csrf_token'].data=request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(comment)
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