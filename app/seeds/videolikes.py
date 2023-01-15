from app.models import db, VideoLikes



def seed_videolikes():
    
    [db.session.add(x) for x in [
        VideoLikes(is_like= 1, user_id= 1, video_id= 30),
        VideoLikes(is_like= 1, user_id= 1, video_id= 50),
        VideoLikes(is_like= -1,user_id= 1, video_id= 28),
        VideoLikes(is_like= -1,user_id= 1, video_id= 48)
        ]
    ]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_videolikes():
    db.session.execute('TRUNCATE videolikes RESTART IDENTITY CASCADE;')
    db.session.commit()
