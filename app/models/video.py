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
    comments = db.relationship("Comment", back_populates="Videos", cascade="all, delete-orphan")
   
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description, 
            'thumbnail_pic': self.thumbnail_pic,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }