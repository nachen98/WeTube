from app.models import db, User
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        first_name= 'Demo',
        last_name= 'Lition', 
        password='password',
        about='My channel includes videos from National Geographic.\n Fungal ecologist and National Geographic Explorer Korena Mafune meets up with chef Melissa King in an old-growth forest to search for one of their favorite ingredients: mushrooms.',
       )
    marnie = User(
        username='marnie', 
        email='marnie@aa.io', 
        first_name= 'marnie', 
        last_name='philips', 
        password='password',
        about='In my channel, you get to enjoy videos about various places, \n including UK, Maldives, Palawan, IceLand, Bermuda, VietNam, Patagonia, The Alps...',
       )
    bobbie = User(
        username='bobbie', 
        email='bobbie@aa.io', 
        first_name= 'bobbie', 
        last_name='thompson', 
        password='password',
        about='Come and listen to the hot 50 pop musics of each week. \n The singers are Ed Sheeran, Adele, Marron, Rihana, Bile Eilish...',
     
        )
    nancy = User(
        username='nancy',
        email='nancy@aa.io', 
        first_name= 'nancy', 
        last_name='chan',
        password='password',
        about='My channel has all you need to know about the univers.',
     
        )
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

    demo.subscriptions = [marnie, bobbie, nancy]
    marnie.subscriptions = [demo, bobbie]
    

    db.session.add_all([demo, marnie, bobbie, nancy, leo, steven, peter, alex, rick, emily])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
