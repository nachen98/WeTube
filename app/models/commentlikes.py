# from .db import db

# class CommentLikes(db.Model):
#     __tablename__='commentlikes'

#     id=db.Column(db.Integer, primary_key=True)
#     is_like=db.Column(db.Boolean, nullable=False)

#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#     comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)

#     user = db.relationship("User", back_populates="comment_likes")
#     comment = db.relationship("Comment", back_populates="comment_likes")

#     @classmethod
#     def add(cls, is_like, user_id, comment_id):
#         item = cls.query.filter_by(user_id=user_id, comment_id=comment_id).first()
#         if item is not None and item.is_like == is_like:
#             return item.to_dict()
        
#         elif is_like == 0:

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'is_like': self.is_like,
#             'user_id': self.user_id,
#             'comment_id': self.comment_id,
#         }

#     def __repr__(self): 
#         return f'<CommentLikes, id={self.id}, is_like={self.is_like}, comment_id={self.comment_id}, user_id={self.user_id}>'