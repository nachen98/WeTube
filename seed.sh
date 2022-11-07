rm app/dev.db
rm -r migrations

flask db init
flask db migrate -m "restore db"
flask db upgrade
flask seed all