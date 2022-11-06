from pathlib import Path
import pdb, json
import random
import sqlite3

comment_paths=[x for x in Path('/mnt/d/Dropbox/Archive/projects/youtube_crawler/data/').glob('**/*.*') if x.suffix == '.json' and x.stem != 'urls']

userids=[5,6,7,8,9,10]

res = []

def get_name_to_id():

    name2id={}
    # Create a SQL connection to our SQLite database
    con = sqlite3.connect("../dev.db")

    cur = con.cursor()

    # The result of a "cursor.execute" can be iterated over by row
    for row in cur.execute('SELECT * FROM videos;'):
        # print('row!!!!!!!', row)
        stem=Path(row[4]).stem
        video_id = row[0]
        name2id[stem] = video_id

    # Be sure to close the connection
    con.close()

    return name2id

name2id=get_name_to_id()

for comment_path in comment_paths:

    name=comment_path.name
    stem = comment_path.stem

    info = json.load(open(f"{comment_path.parent}/{stem}.json"))
    
    reviews = info['reviews'][1:]
    
        
    num_list = random.sample(userids, len(reviews))
    
    # to put user_id and content of review in a turple
    for n, review in zip(num_list, reviews):
            res.append({
                'content':[(n, review)],
                'video_id': name2id[stem]
            })
  

json.dump(res, open('comments.json', 'w'), indent=4)