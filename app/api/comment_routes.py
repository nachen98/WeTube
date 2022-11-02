from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.comments_form import CommentForm
from app.models import Video, Comment, db
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

#get all the comments
@comment_routes.route('/videos/<int:video_id>/comments')
def get_all_comments():
    comments = Comment.query.all()
    data = [comment.to_dict() for comment in comments]
    return {"Comments": data}, 200

#post a comment
@comment_routes.route('/videos/<int:video_id>/comments', methods=['POST'])
@login_required
def post_comment():
    form=CommentForm()
    form['csrf_token'].data=request.cookies['csrf_token']

    if form.validate_on_submit():
        comment=Comment()
        form.populate_obj(comment)

        comment.user_id=current_user.id 
        comment.created_at=datetime.now()
        comment.updated_at=datetime.now()
        
        db.session.add(comment)
        db.session.commit()

        return comment.to_dict()
    
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#edit a comment
@comment_routes.route('/videos/<int:video_id>/comments/<int:comment_id>', methods=['POST'])
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
@comment_routes.route('/videos/<int:video_id>/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment is not None:
        db.session.delete(comment)
        db.session.commit()
        return {"message": "comment successfully deleted"}, 200
    else:
        return {"errors": "comment not found"}, 404
        


