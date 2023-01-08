from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

# self-referential relationship, below is association table which indicates the which user in the table is the subscriber,
# which user is to be subscribed. 
subscription = db.Table('subscription',
    db.Column('subscriber_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('subscribed_to_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(255))
    about=db.Column(db.String(255))
    created_at = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    videos = db.relationship("Video", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates= "user", cascade="all, delete-orphan")
    video_likes = db.relationship("VideoLikes", back_populates="user", cascade="all, delete-orphan")
    comment_likes = db.relationship("CommentLikes", back_populates="user", cascade="all, delete-orphan")
    
    #https://stackoverflow.com/questions/20642497/sqlalchemy-query-to-return-only-n-results
    # In a many to many relationship, the primaryjoin expression describes the join between the left table and the junction table,
    # and the secondaryjoin describes the join between the junction table and the right table.

    # In other words, the primaryjoin expression is saying, "find all rows in the subscription table where subscriber_id is X", 
    # the secondaryjoin expression is saying "find all rows in the followers table where subscribed_to_id is X", and get those two together to find all users that follow user X, and all users that are followed by user X.
    
    #primaryjoin=id==subscription.c.subscriber_id meaning: given the id of this current user, and find it in the join table where subscriber_id = to this user's id
    #if we do this user.subscriptions that means this user is a subscriber. this current user's id is in the primaryjoin
    #user1.subscriptions = [user2, user3]
    #user2.subscriptions = [user3]
    #above means user1's subscriptions are user2 and user3, that is, user1 is user2 and user3 's subscribers. primaryjoin id = user1.id, also subscriber_id = user1.id

    #backref gives subscribers. meaning user3.subscribers = user 2. this is a reverse attribute:
    #it could be written as subscribers= db.relationship("Users", secondary = subscription, primaryjoin=id==subcriber.c.subscribed_to_id, secondaryjoin = id==subscription.c.subscriber_id), c means column.
    subscriptions = db.relationship(
        "User",
        secondary=subscription,
        primaryjoin=id==subscription.c.subscriber_id,
        secondaryjoin=id==subscription.c.subscribed_to_id,
        backref=db.backref("subscribers", lazy='dynamic')
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def subscribe(self, user):
        if not self.is_subscribing(user):
            self.subscriptions.append(user)
            return self
    
    def unsubscribe(self, user):
        if self.is_subscribing(user):
            self.subscriptions.remove(user)
            return self
    
    def is_subscribing(self, user):
        return self.subscriptions.filter(subscription.c.subscriber.id==user.id).count() >0


    def to_dict(self):
    

        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email, 
            'profile_pic': self.profile_pic,
            'about': self.about,
            'likes': [video_like.to_dict() for video_like in self.video_likes],
            'subscribing':len(self.subscriptions),
            'subscribed_by':self.subscribers.count(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def __repr__(self):
        return f'<User, id={self.id}, username={self.username}, likes={[video_like.to_dict() for video_like in self.video_likes]},   subscribing={len(self.subscriptions)}, subscribed_by={self.subscribers.count()}>'