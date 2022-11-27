from app.models import db, Comment
import json, pdb
from datetime import datetime

def seed_comments():
    items = json.load(open('app/seeds/comments.json'))

    for item in items:
        # pdb.set_trace()
        comment=Comment(content=item['content'][1], user_id=item['content'][0], video_id=item['video_id'])
        db.session.add(comment)
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()