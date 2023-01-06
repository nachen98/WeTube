from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(255))
    about=db.Column(db.String(255))
    created_at = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    videos = db.relationship("Video", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates= "user", cascade="all, delete-orphan")
    video_likes = db.relationship("VideoLikes", back_populates="user", cascade="all, delete-orphan")
    comment_likes = db.relationship("CommentLikes", back_populates="user", cascade="all, delete-orphan")
    
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email, 
            'profile_pic': self.profile_pic,
            'about': self.about,
            'likes': [video_like.to_dict() for video_like in self.video_likes],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def __repr__(self):
        return f'<User, id={self.id}, username={self.username}, likes={[video_like.to_dict() for video_like in self.video_likes]}>'