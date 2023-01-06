from app.models import db, CommentLikes



def seed_commentlikes():
    
    [db.session.add(x) for x in [
        CommentLikes(is_like= True, user_id= 1, comment_id= 1),
        CommentLikes(is_like= False,user_id= 1, comment_id= 7),
        ]
    ]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_commentlikes():
    db.session.execute('TRUNCATE commentlikes RESTART IDENTITY CASCADE;')
    db.session.commit()