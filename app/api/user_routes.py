from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User
from helper import doesnot_exist_error

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    print("############################", user)
    return user.to_dict()


#subscribe to another user
@user_routes.route('/<int:user_id>/subscribing')
@login_required
def subscribe_user_by_id(user_id):
    if user_id == current_user.id:
        return {
            "message": "Cannot subscribe to yourself",
            "statusCode": 403
        }, 403
    
    subscribee=User.query.get(user_id)

    if subscribee is None:
        return doesnot_exist_error("User")
    
    current_user.subscribe(subscribee)

    return current_user.to_dict()

#unsubscribe to another user
@user_routes.route('/<int:user_id>/subscribing')
@login_required
def subscribe_user_by_id(user_id):
    if user_id == current_user.id:
        return {
            "message": "Cannot subscribe to yourself",
            "statusCode": 403
        }, 403
    
    subscribee=User.query.get(user_id)

    if subscribee is None:
        return doesnot_exist_error("User")
    
    current_user.unsubscribe(subscribee)

    return current_user.to_dict()

