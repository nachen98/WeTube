# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy 

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

# subscriptions= db.Table(
#     "subscriptions",
#     db.Model.metadata,
#     db.Column('subscriber', db.Integer, db.ForeignKey('users.id')),
#     db.Column('subscribee', db.Integer, db.ForeignKey('users.id'))
# )
# class User(db.Model):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(40), nullable=False, unique=True)
#     following=db.relationship(
#         "User",
#         secondary=subscriptions,
#         back_populates="followers"
#     )

#     followers=db.relationship(
#         "User",
#         secondary=subscriptions,
#         back_populates="following"
#     )


# demo1 = User(username='demo1')
# demo2 = User(username='demo2')

# demo1.following.append(demo2)
# demo2.follower.append(demo1)
# db.session.add(demo1)
# db.session.add(demo2)

# db.session.commit()


# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

# # Define the association table for the many-to-many relationship
# subscription = db.Table('subscription',
#     db.Column('subscriber_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#     db.Column('subscribed_to_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
# )

# # Define the ORM classes
# class User(db.Model):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String)
#     subscriptions = db.relationship(
#         "User",
#         secondary=subscription,
#         primaryjoin=id==subscription.c.subscriber_id,
#         secondaryjoin=id==subscription.c.subscribed_to_id,
#         backref=db.backref("subscribers", lazy='dynamic')
#     )

#     def print1(self):
#         print(len(self.subscribers.all()))

# # Create the tables in the database
# db.create_all()

# # Create some test data
# user1 = User(name='Alice')
# user2 = User(name='Bob')
# user3 = User(name='Eve')

# user1.subscriptions = [user2, user3]
# user2.subscriptions = [user3]

# db.session.add_all([user1, user2, user3])
# db.session.commit()

# # Query the subscriptions for user1
# subscriptions = User.query.filter(User.id==user2.id).first().subscriptions
# print(subscriptions)

# import pdb;pdb.set_trace()