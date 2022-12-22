from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Product
from ..forms.product_form import ProductForm
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint('products', __name__)

@product_routes.route('/test')
def test():
    return '<h1>Welcome!</h1>'

# get all products
@product_routes.route('', methods=['GET'])
def all_products():
    products = Product.query.options(joinedload(Product.seller), joinedload(Product.category), joinedload(Product.reviews)).all()
    return {'Products': [product.to_dict() for product in products]}, 200

# get current user's product listings
@product_routes.route('/current', methods=['GET'])
@login_required
def get_products():
    products = Product.query.options(joinedload(Product.seller), joinedload(Product.category), joinedload(Product.reviews)).filter(Product.seller_id == current_user.id)
    return {'Products': [product.to_dict() for product in products]}, 200


# create a new product to current user's product listings
@product_routes.route('', methods=['POST'])
@login_required
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_product = Product(
            name = form.data['name'],
            description = form.data['description'],
            avalibility = form.data['avalibility'],
            sellerId = form.data['sellerId'],
            categoryId = form.data['category_id'],
            price = form.data['price'],
            previewImage = form.data['previewImage'],
        )
        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#edit the info of product in current user's product listings based on the product id
@product_routes.route('/<int:productId>', methods=['PUT'])
@login_required
def update_product(productId):
    product = Product.query.filter(id == productId).one()
    if not product:
        return {'errors': f'Product {productId} not found!'}, 404

    if product.seller_id != current_user.id:
        return {'errors': 'Unauthorized!'}, 403

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_product = Product(
            id = productId,
            name = form.data['name'],
            description = form.data['description'],
            avalibility = form.data['avalibility'],
            sellerId = form.data['sellerId'],
            categoryId = form.data['category_id'],
            price = form.data['price'],
            previewImage = form.data['previewImage'],
        )
        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# delete a product in current user's listings
@product_routes.route('/<int:productId>', methods=['DELETE'])
@login_required
def delete_product(productId):
    product = Product.query.filter(id == productId).one()
    if not product:
        return {'errors': f'Product {productId} not found!'}, 404

    if product.seller_id != current_user.id:
        return {'errors': 'Unauthorized!'}, 403

    db.session.delete(product)
    db.session.commit()
    return {'message': f'Sucessfully deleted product {product.id}'}, 200
