from app.models import db, Video
import json
from datetime import datetime
def max240(line):
    res = ''
    for l in line.split('.'):
        if len(res+l)>240:
            return res
        res += l+'.'
    return res
def seed_videos():
    items = json.load(open('app/seeds/videos.json'))
    for item in items:
        video = Video(user_id=item['user_id'], title=item['title'], description=max240(item['description']), thumbnail_pic=item['thumbnail_pic'], url=item['url'], view_counts=item['view_counts'])
        db.session.add(video)
    db.session.commit()

def undo_videos():
    db.session.execute('TRUNCATE videos RESTART IDENTITY CASCADE;')
    db.session.commit()