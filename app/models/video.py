from .db import db
from datetime import datetime
class Video(db.Model):
    __tablename__='videos'

    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String(255), nullable=False)
    description=db.Column(db.String(255), nullable=True)
    thumbnail_pic = db.Column(db.Text, nullable=True)
    url=db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    view_counts=db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="videos")
    comments = db.relationship("Comment", back_populates="video", cascade="all, delete-orphan")
    video_likes = db.relationship("VideoLikes", back_populates="video", cascade="all, delete-orphan")
    
    def to_dict(self):
        
        self.videolike = len([x for x in self.video_likes if x.is_like])
        self.videodislike = len(self.video_likes) - self.videolike

        return {
            'id': self.id,
            'title': self.title,
            'description': self.description, 
            'thumbnail_pic': self.thumbnail_pic,
            'url':self.url,
            'user': self.user.to_dict(),
            'view_counts': self.view_counts,
            'video_likes': self.videolike,
            'video_dislikes': self.videodislike,
            'comments': [comment.to_dict() for comment in self.comments],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def __repr__(self):
        self.videolike = len([x for x in self.video_likes if x.is_like])
        self.videodislike = len(self.video_likes) - self.videolike
        return f'<Video, id={self.id}, title={self.title}, description={self.description}, video_likes={self.videolike}, video_dislikes={self.videodislike} >'