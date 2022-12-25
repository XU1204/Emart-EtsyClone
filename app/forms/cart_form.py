from flask_wtf import FlaskForm
from wtforms import IntegerField, SelectField
from wtforms.validators import DataRequired

class CartForm(FlaskForm):
    itemId = IntegerField('Item id')
    quantity = SelectField('Quantity', [DataRequired()], choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10)])