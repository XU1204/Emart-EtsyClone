from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError

def len_check(form, field):
    if len(field.data) > 254:
        raise ValidationError(f"{field} must be less than 255 characters")

class ReviewForm(FlaskForm):
    review = TextAreaField('Review', [DataRequired(), len_check])
    star = IntegerField('Star', [DataRequired()])
