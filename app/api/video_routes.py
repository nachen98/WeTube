from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.videos_form import VideoForm
from app.models import User, Video, db
from datetime import datetime

video_routes = Blueprint('videos', __name__)

#get all the videos
@video_routes.route('/videos')
def get_all_videos():
    videos = Video.query.all()
    data = [video.to_dict() for video in videos]
    return {"Videos": data}, 200

#get one video by id
@video_routes.route('/videos/<int:video_Id>')
def get_video_by_id(video_id):
    video = Video.query.get(video_id)
    return video.to_dict(), 200

#creat a video
@video_routes.route('/videos', method=['POST'])
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
@video_routes.route('/videos/<int:video_id>', methods=['POST'])
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
@video_routes.route('videos/<int:video_id>', methods=['DELETE'])
@login_required
def delete_video(video_id):
    video=Video.query.get(video_id)

    if video is not None:
        db.session.delete(video)
        db.session.commit()
        return {"message": "video successfully deleted"}, 200
    else:
        return {"errors": "video not found"}, 404