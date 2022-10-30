from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField,SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Comment

class CommentForm(FlaskForm):
 
    content=TextAreaField('Comment', validators=[DataRequired()])
    submit = SubmitField("Submit")