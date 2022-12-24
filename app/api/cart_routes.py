from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Cart
from ..forms.cart_form import CartForm
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages

cart_routes = Blueprint('carts', __name__)

#get all items in current user's shopping cart
@cart_routes.route('', methods=['GET'])
@login_required
def get_cart ():
     carts = Cart.query.options(joinedload(Cart.user), joinedload(Cart.item)).filter(Cart.user_id == current_user.id).all()
     return {'Carts': [cart.to_dict() for cart in carts]}, 200


# get caertain item's info in cart
@cart_routes.route('<int:cartId>', methods=['GET'])
@login_required
def get_item(cartId):
    item = Cart.query.options(joinedload(Cart.user), joinedload(Cart.item)).filter(Cart.user_id == current_user.id, Cart.id == cartId).one()

    if not item:
        return {'errors': f'This item: {item.item.name} is not found in your cart!'}, 404
    return item.to_dict(), 200


#add an item to current user's shopping cart
@cart_routes.route('', methods=['POST'])
@login_required
def add_item ():
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_item = Cart(
            user_id = current_user.id,
            # ????????????????????????????
            item_id = form.data['itemId'],
            quantity = form.data['quantity'],
        )
        db.session.add(new_item)
        db.session.commit()

        return new_item.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# update item in shopping cart
@cart_routes.route('/<int:cartId>', methods=['PUT'])
@login_required
def update_item(cartId):
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    item = Cart.query.options(joinedload(Cart.user), joinedload(Cart.item)).filter(Cart.user_id == current_user.id, Cart.id == cartId).one()

    if not item:
        return {'errors': f'This item: {item.item.name} is not found in your cart!'}, 404

    if form.validate_on_submit():
        item.itemId = item.item_id
        item.quantity = form.quantity.data

        db.session.add(item)
        db.session.commit()
        return item.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# delete an item in current user's shopping cart
@cart_routes.route('/<int:cartId>', methods=['DELETE'])
@login_required
def delete_product(cartId):
    item = Cart.query.options(joinedload(Cart.user), joinedload(Cart.item)).filter(Cart.user_id == current_user.id, Cart.id == cartId).one()
    if not item:
        return {'errors': f'This item:{item.item.name} is not found in your cart!'}, 404

    db.session.delete(item)
    db.session.commit()
    return {'message': f'Sucessfully deleted item:{item.item.name} in your cart.'}, 200
