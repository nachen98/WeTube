from flask.cli import AppGroup
from .users import seed_users, undo_users
from .videos import seed_videos, undo_videos
from .comments import seed_comments, undo_comments
from .videolikes import seed_videolikes, undo_videolikes
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_videos()
    seed_comments()
    seed_videolikes()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_videos()
    undo_comments()
    undo_videolikes()