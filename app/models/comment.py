from .db import db
from sqlalchemy import func
from datetime import datetime
class Comment(db.Model):
    __tablename__='comments'

    id=db.Column(db.Integer, primary_key=True)
    content=db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey("videos.id"), nullable=False)
    created_at = db.Column(db.TIMESTAMP, nullable=False, default=datetime.now)
    updated_at = db.Column(db.TIMESTAMP, nullable=False, default=datetime.now, onupdate=datetime.now)
    user = db.relationship("User", back_populates="comments")
    video = db.relationship("Video", back_populates="comments")

    def to_dict(self):
        return {
            "id":self.id,
            "content": self.content,
            "user_id": self.user_id,
            "video_id": self.video_id,
            "user": self.user.to_dict(),
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        return f'<Comment, id={self.id}, content={self.content}, user={self.user_id}, video={self.video_id}>'