from .db import db

class CommentLikes(db.Model):
    __tablename__='commentlikes'

    id=db.Column(db.Integer, primary_key=True)
    is_like=db.Column(db.Boolean, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)

    user = db.relationship("User", back_populates="comment_likes")
    comment = db.relationship("Comment", back_populates="comment_likes")

    def to_dict(self):
        return {
            'id': self.id,
            'is_like': self.is_like,
            'user_id': self.user_id,
            'comment_id': self.comment_id,
        }

    def __repr__(self):
        return f'<CommentLikes, id={self.id}, is_like={self.is_like}, comment_id={self.comment_id}, user_id={self.user_id}>'