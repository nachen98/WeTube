from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField,SubmitField
from wtforms.validators import DataRequired, InputRequired, Length


class CommentForm(FlaskForm):
    content=StringField("Content", validators=[InputRequired(), Length(min=1)])
    submit = SubmitField("Submit")