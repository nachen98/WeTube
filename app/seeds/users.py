from app.models import db, User
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', first_name= 'Demo', last_name= 'Lition', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', first_name= 'marnie', last_name='philips', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', first_name= 'bobbie', last_name='thompson', password='password')
    nancy = User(
        username='nancy', email='nancy@aa.io', first_name= 'nancy', last_name='chan',password='password')
    leo = User(
        username='leo', email='leo@aa.io', first_name= 'leo', last_name='lee', password='password')
    steven = User(
        username='steven', email='steven@aa.io', first_name= 'steven', last_name='welch', password='password')
    peter = User(
        username='peter', email='peter@aa.io', first_name= 'peter', last_name='roberts', password='password')
    alex = User(
        username='alex', email='alex@aa.io', first_name= 'alex', last_name='ross', password='password')
    rick = User(
        username='rick', email='rick@aa.io', first_name= 'rick', last_name='webster', password='password')
    emily = User(
        username='emily', email='emily@aa.io', first_name= 'emily', last_name='biro', password='password')
    
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(nancy)
    db.session.add(leo)
    db.session.add(steven)
    db.session.add(peter)
    db.session.add(alex)
    db.session.add(rick)
    db.session.add(emily)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
