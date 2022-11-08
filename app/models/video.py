from .db import db

class Video(db.Model):
    __tablename__='videos'

    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String(255), nullable=False)
    description=db.Column(db.String(255), nullable=True)
    thumbnail_pic = db.Column(db.Text, nullable=True)
    body=db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User", back_populates="videos")
    comments = db.relationship("Comment", back_populates="video", cascade="all, delete-orphan")
   
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description, 
            'thumbnail_pic': self.thumbnail_pic,
            'user': self.user.to_dict(),
            'comments': [comment.to_dict() for comment in self.comments],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    # def to_dict_without_description(self):
    #     return {
    #         'id': self.id,
    #         'title': self.title,
    #         'thumbnail_pic': self.thumbnail_pic,
    #         'user': self.user.to_dict(),
    #         'created_at': self.created_at,
    #         'updated_at': self.updated_at
    #     }
    

    def __repr__(self):
        return f'<Video, id={self.id}, title={self.title}, description={self.description}>'