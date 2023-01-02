from .db import db

class VideoLikes(db.Model):
    __tablename__='videolikes'

    id=db.Column(db.Integer, primary_key=True)
    is_like=db.Column(db.Boolean, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey("videos.id"), nullable=False)

    user = db.relationship("User", back_populates="video_likes")
    video = db.relationship("Video", back_populates="video_likes")

    def to_dict(self):
        return {
            'id': self.id,
            'is_like': self.is_like,
            'user_id': self.user_id,
            'video_id': self.video_id,
        }

    def __repr__(self):
        return f'<VideoLikes, id={self.id}, is_like={self.is_like}>'