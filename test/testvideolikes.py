from flask import Flask
from flask_sqlalchemy import SQLAlchemy 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    
    videos = db.relationship("Video", back_populates="user", cascade="all, delete-orphan")
    video_likes = db.relationship("VideoLikes", back_populates="user", cascade="all, delete-orphan")
   

class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(40))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="videos")
    video_likes = db.relationship("VideoLikes", back_populates="video", cascade="all, delete-orphan")

class VideoLikes(db.Model):
    __tablename__='videolikes'

    id=db.Column(db.Integer, primary_key=True)
    is_like=db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey("videos.id"), nullable=False)

    user = db.relationship("User", back_populates="video_likes")
    video = db.relationship("Video", back_populates="video_likes")


    # def is_liking(self, videolike):
    #     return self.video_id == videolike.video_id and self.user_id == videolike.user_id and  videolike.is_like == True
    
    # def is_disliking(self, videolike):
    #     return self.video_id == videolike.video_id and self.user_id == videolike.user_id and  videolike.is_like == False
    
    # def liking (self, videolike):
    #     if not self.is_disliking(videolike):
    #         self.user.append(videolike.user_id)
    #         self.video.append(videolike.video_id)
    #         self.is_like.append(videolike.is_like)
    #         return self
    #     else:
            
    #         self.is_like == 0
    #         self.is_like.append(videolike.is_like)
    #         return self
    
    # def disliking (self, videolike):
    #     if not self.is_liking(videolike):
    #         self.user.append(videolike.user_id)
    #         self.video.append(videolike.video_id)
    #         self.is_like.append(videolike.is_like)
    #         return self
    #     else:
    #         self.is_like == 1
    #         self.is_like.append(videolike.is_like)
    #         return self
    @classmethod
    def add(cls, is_like, user_id, video_id):
        item = cls.query.filter_by(user_id=user_id, video_id=video_id).all()
        print("@@@@@@@@@@@@@@", item)
        if len(item) ==1 and item[0].is_like == is_like:
            return

        elif len(item) ==1 and is_like == 0:
            db.session.delete(item[0])

        elif len(item) ==1 and item[0].is_like == -is_like:
            item[0].is_like = is_like

        elif len(item) == 0:
            new_like = cls(is_like =is_like, user_id=user_id, video_id=video_id)
            db.session.add(new_like)
        
        db.session.commit()
        

    
# db.create_all()

# demo1 = User(username='demo1')
# demo2 = User(username='demo2')

# db.session.add(demo1)
# db.session.add(demo2)

# db.session.commit()

# video1=Video(name='video1', user_id=1)
# video2 = Video(name='video2', user_id=2)
# db.session.add(video1)
# db.session.add(video2)

# db.session.commit()

# videolike1=VideoLikes(
    
#     is_like = 1,
#     user_id = 1,
#     video_id = 1
# )

# videolike2=VideoLikes(
#     is_like = 0,
#     user_id = 2,
#     video_id= 2
# )

# videolike3=VideoLikes(
    
#     is_like = 0,
#     user_id = 1,
#     video_id = 1
# )
# db.session.add(videolike1)
# db.session.add(videolike2)
# db.session.add(videolike3)
# db.session.commit()
VideoLikes.add(
    is_like=1, user_id=1, video_id=1
)
# VideoLikes.add(
#     is_like=0, user_id=1, video_id=1
# )

