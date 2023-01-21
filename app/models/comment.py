from .db import db
from sqlalchemy import func
from datetime import datetime
class Comment(db.Model):
    __tablename__='comments'

    id=db.Column(db.Integer, primary_key=True)
    content=db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey("videos.id"), nullable=False)
    created_at = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = db.relationship("User", back_populates="comments")
    video = db.relationship("Video", back_populates="comments")
    #comment_likes = db.relationship("CommentLikes", back_populates="comment", cascade="all, delete-orphan")

    def to_dict(self):

        #self.commentlike = len([x for x in self.comment_likes if x.is_like])
        #self.commentdislike = len(self.comment_likes) - self.commentlike
        return {
            "id":self.id,
            "content": self.content,
            "user_id": self.user_id,
            "video_id": self.video_id,
            "user": self.user.to_dict(),
            #'comment_likes': self.commentlike,
            #'comment_dislike': self.commentdislike,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        #self.commentlike = len([x for x in self.comment_likes if x.is_like])
        #self.commentdislike = len(self.comment_likes) - self.commentlike
        return f'<Comment, id={self.id}, content={self.content}, user={self.user_id}, video={self.video_id}, comment_likes: {self.commentlike}, comment_dislike: {self.commentdislike}>'