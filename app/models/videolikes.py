from .db import db

class VideoLikes(db.Model):
    __tablename__='videolikes'

    id=db.Column(db.Integer, primary_key=True)
    is_like=db.Column(db.Boolean, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey("videos.id"), nullable=False)

    user = db.relationship("User", back_populates="video_likes")
    video = db.relationship("Video", back_populates="video_likes")

    @classmethod
    def add(cls, is_like, user_id, video_id):
        item = cls.query.filter_by(user_id=user_id, video_id=video_id).all()
    
        if len(item) ==1 and item[0].is_like == is_like:
            return item[0].to_dict()

        elif len(item) ==1 and is_like == 0:
            db.session.delete(item[0])
            db.session.commit()
            return None

        elif len(item) ==1 and item[0].is_like == -is_like:
            item[0].is_like = is_like
            db.session.commit()
            return item[0].to_dict()

        elif len(item) == 0:
            new_like = cls(is_like =is_like, user_id=user_id, video_id=video_id)
            db.session.add(new_like)
            db.session.commit()
            return new_like.to_dict()

    def to_dict(self):
        return {
            'id': self.id,
            'is_like': self.is_like,
            'user_id': self.user_id,
            'video_id': self.video_id,
        }

    def __repr__(self):
        return f'<VideoLikes, id={self.id}, is_like={self.is_like}, video_id={self.video_id},>'