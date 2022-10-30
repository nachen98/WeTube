from .db import db

class Comment(db.Model):
    __tablename__='comments'

    id=db.Column(db.Integer, primary_key=True)
    content=db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey("videos.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User", back_populates="comments")
    videos = db.relationship("Video", back_populates="comments")

    