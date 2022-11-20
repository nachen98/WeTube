cd app/seeds
python data2video_json.py
cd ../../

rm app/dev.db
rm -r migrations
flask db init
flask db migrate -m "restore db"
flask db upgrade
flask seed all

cd app/seeds
python data2comment_json.py
cd ../../

rm app/dev.db
rm -r migrations
flask db init
flask db migrate -m "restore db"
flask db upgrade
flask seed all