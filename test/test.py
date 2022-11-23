from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(255))
    
    videos = db.relationship("Video", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates= "user", cascade="all, delete-orphan")
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email, 
            'profile_pic': self.profile_pic,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def __repr__(self):
        return f'<User, id={self.id}, username={self.username}>'

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

class Comment(db.Model):
    __tablename__='comments'

    id=db.Column(db.Integer, primary_key=True)
    content=db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey("videos.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

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

comments = Comment.query.filter(video_id = 1).all()