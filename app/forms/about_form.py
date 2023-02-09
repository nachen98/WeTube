from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, InputRequired, Length


class AboutForm(FlaskForm):
    about=StringField("About", validators=[InputRequired(), Length(min=1)])
    submit = SubmitField("Submit")