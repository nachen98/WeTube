from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField,SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Video

class VideoForm(FlaskForm):
    title=StringField('Title', validators=[DataRequired()])
    description=StringField('Description')
    body=TextAreaField('Video', validators=[DataRequired()])
    thumbnail_pic = TextAreaField('Thumbnail')
    submit = SubmitField("Submit")