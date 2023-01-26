from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product, ProductImage
from ..forms.product_form import ProductForm
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)


product_routes = Blueprint('products', __name__)

@product_routes.route('/test')
def test():
    return '<h1>Welcome!</h1>'

# get all products
@product_routes.route('', methods=['GET'])
def all_products():
    products = Product.query.options(joinedload(Product.seller), joinedload(Product.category), joinedload(Product.reviews), joinedload(Product.images)).all()
    return {'Products': [product.to_dict() for product in products]}, 200

# get current user's product listings
@product_routes.route('/current', methods=['GET'])
@login_required
def get_products():
    products = Product.query.options(joinedload(Product.seller), joinedload(Product.category), joinedload(Product.reviews), joinedload(Product.images)).filter(Product.seller_id == current_user.id)
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
            seller_id = current_user.id,
            category_id = form.data['categoryId'],
            price = form.data['price'],
            # preview_image = form.data['previewImage'],
        )
        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# upload product preview image
@product_routes.route("/<int:productId>/images", methods=['POST'])
@login_required
def post_image_by_product_id(productId):
    product = Product.query.filter(Product.id == productId).one()
    # print('back-product ---------', product)
    if "image" not in request.files:
        return {'errors': 'image required'}, 400

    image = request.files['image']
    # print('back-image ---------', image)

    if not allowed_file(image.filename):
        return {'errors': 'file type is not permitted'}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)
    # print('back-upload ---------', upload)

    if 'url' not in upload:
        return upload, 400

    url = upload['url']
    # print('back-url ---------', url)

    new_img = ProductImage(url=url,product_id=productId)
    # print('backend-new_image ---------', new_img.product_id)

    product.images.append(new_img)

    db.session.add(new_img)
    db.session.commit()

    return new_img.to_dict(), 200

# update product preview image
@product_routes.route("/<int:productId>/images", methods=['PUT'])
@login_required
def update_image_by_product_id(productId):
    product = Product.query.filter(Product.id == productId).one()

    if "image" not in request.files:
        return {'errors': 'image required'}, 400

    image = request.files['image']
    # print('back-image ---------', image)

    if not allowed_file(image.filename):
        return {'errors': 'file type is not permitted'}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if 'url' not in upload:
        return upload, 400

    url = upload['url']
    # print('back-url ---------', url)

    img = ProductImage.query.filter(ProductImage.id == product.images[0].id).one()
    print('back-url ---------', img.url)
    img.url = url

    db.session.add(img)
    db.session.commit()
    return img.to_dict(), 200



#GET details of each product
@product_routes.route('/<int:productId>', methods=['GET'])
def get_product_detail(productId):
    product = Product.query.filter(Product.id == productId).one()
    if not product:
        return {'errors': f'Product {productId} not found!'}, 404
    return product.to_dict(), 200


#edit the info of product in current user's product listings based on the product id
@product_routes.route('/<int:productId>', methods=['PUT'])
@login_required
def update_product(productId):
    product = Product.query.filter(Product.id == productId).one()

    if not product:
        return {'errors': f'Product {productId} not found!'}, 404

    if product.seller_id != current_user.id:
        return {'errors': 'Unauthorized!'}, 403

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        product.name = form.name.data
        product.description = form.data['description']
        product.avalibility = form.data['avalibility']
        product.category_id = form.data['categoryId']
        product.price = form.data['price']
        # product.preview_image = form.data['previewImage']

        db.session.add(product)
        db.session.commit()
        return product.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# delete a product in current user's listings
@product_routes.route('/<int:productId>', methods=['DELETE'])
@login_required
def delete_product(productId):
    product = Product.query.filter(Product.id == productId).one()
    if not product:
        return {'errors': f'Product {productId} not found!'}, 404

    if product.seller_id != current_user.id:
        return {'errors': 'Unauthorized!'}, 403

    db.session.delete(product)
    db.session.commit()
    return {'message': f'Sucessfully deleted product {product.id}'}, 200


# get all the images of products
@product_routes.route("/<int:productId>/images", methods=['GET'])
def get_product_images(productId):
    images = ProductImage.query.filter_by(product_id=productId).all()
    return {'images': [i.to_dict() for i in images]}, 200
