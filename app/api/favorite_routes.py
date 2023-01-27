from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Favorite
from ..forms.favorite_form import FavoriteForm
from .auth_routes import validation_errors_to_error_messages


favorite_routes = Blueprint('favorites', __name__)

# get current user's favorite items
@favorite_routes.route('', methods=['GET'])
@login_required
def get_favorites():
    favorites = Favorite.query.filter(Favorite.user_id == current_user.id).all()
    return {'Favorites': [x.to_dict() for x in favorites]}, 200


# get certain favorite item's info in favorite list
@favorite_routes.route('<int:favoriteId>', methods=['GET'])
@login_required
def get_one_favorite(favoriteId):
    favorite = Favorite.query.filter(Favorite.user_id == current_user.id, Favorite.id == favoriteId).one()

    if not favorite:
        return {'errors': f'This item:{favorite.item.name} is not found in your favorite list!'}, 404
    return favorite.to_dict(), 200


# add a product to user's favorite list
@favorite_routes.route('', methods=['POST'])
@login_required
def add_favorite():
    form = FavoriteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_favorite = Favorite(
            user_id = current_user.id,
            product_id = form.data['productId']
        )
        db.session.add(new_favorite)
        db.session.commit()

        return new_favorite.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# delete a product from user's favorite list
@favorite_routes.route('<int:favoriteId>', methods=['DELETE'])
@login_required
def delete_favorite(favoriteId):
    favorite = Favorite.query.filter(Favorite.user_id == current_user.id, Favorite.id == favoriteId).one()
    if not favorite:
        return {'errors': f'This item:{favorite.item.name} is not found in your favorite list!'}, 404

    db.session.delete(favorite)
    db.session.commit()
    return {'message': f'Sucessfully deleted item:{favorite.item.name} in favorite list.'}, 200
