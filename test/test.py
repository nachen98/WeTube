from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(255))
    about=db.Column(db.String(255))

    
    videos = db.relationship("Video", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates= "user", cascade="all, delete-orphan")
    video_likes = db.relationship("VideoLikes", back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    # @password.setter
    # def password(self, password):
    #     self.hashed_password = generate_password_hash(password)

    # def check_password(self, password):
    #     return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email, 
            'profile_pic': self.profile_pic,
            'about': self.about,
            'likes': [video_like.video_id for video_like in self.video_likes],
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
    url=db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    view_counts=db.Column(db.Integer, nullable=False, default=0)


    user = db.relationship("User", back_populates="videos")
    comments = db.relationship("Comment", back_populates="video", cascade="all, delete-orphan")
    video_likes = db.relationship("VideoLikes", back_populates="video", cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description, 
            'thumbnail_pic': self.thumbnail_pic,
            'url':self.url,
            'user': self.user.to_dict(),
            'view_counts': self.view_counts,
            'likes': len(self.video_likes),
            'comments': [comment.to_dict() for comment in self.comments],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def __repr__(self):
        return f'<Video, id={self.id}, title={self.title}, description={self.description}>'
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

comments = Comment.query.filter(video_id = 1).all()
likedvideos=User.query.filter(user_id=1).all()
print(likedvideos)