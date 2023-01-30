from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Review
from ..forms.favorite_form import FavoriteForm
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

# get current user's reviews
@review_routes.route('/current', methods=['GET'])
@login_required
def get_reviews_of_current():
    reviews = Review.query.filter(Review.reviewer_id == current_user.id)
    return {'Reviews': {review.to_dict() for review in reviews}}, 200


# delete a review
@review_routes.route('/<int: reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    review = Review.query.filter(Review.id == reviewId).one()
    if not review:
        return {'errors': f'Review {reviewId} not found!'}, 404

    if review.reviewer_id != current_user.id:
        return {'errors': 'Unauthorized!'}, 403

    db.session.delete(review)
    db.session.commit()
    return {'message': f'Sucessfully deleted review {reviewId}'}, 200
