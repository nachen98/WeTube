from pathlib import Path
import pdb, json
# pdb.set_trace()
video_paths= [x for x in Path('/mnt/d/Dropbox/Archive/projects/youtube_crawler/data/').glob('**/*.*') if x.suffix != '.jpg' and x.suffix != '.json']

channel2user_id={
    'national geography':1,
    'natural scene': 2,
    'songs': 3,
    'universe':4
}
res = []
ids = set()
for video_path in video_paths:
    #pdb.set_trace()
    name = video_path.name
    stem = video_path.stem
    #name = str(video_path).split('/')[-1].split('.')[0]
    #print(name)
    info = json.load(open(f"{video_path.parent}/{stem}.json"))

    res.append({
        'title': info['title'],
        'description': info['reviews'][0],
        'thumbnail_pic': f'https://nachen98.s3.us-west-1.amazonaws.com/{stem}.jpg',
        'body': f'https://nachen98.s3.us-west-1.amazonaws.com/{name}',
        'user_id': channel2user_id[video_path.parent.name]
    }
    )
    ids.add(res[-1]['user_id'])

json.dump(res, open('videos.json', 'w'), indent=4)