# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

# models/db.py file

from flask_sqlalchemy import SQLAlchemy

# add import and set variable to access flask environment
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')


db = SQLAlchemy()

# add function to add a prefix to table names in production environment only
def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr