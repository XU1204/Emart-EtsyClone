from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Review
from ..forms.review_form import ReviewForm
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

# get current user's reviews
@review_routes.route('/current', methods=['GET'])
@login_required
def get_reviews_of_current():
    reviews = Review.query.filter(Review.reviewer_id == current_user.id)
    return {'Reviews': {review.to_dict() for review in reviews}}, 200


# update a review for a product
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def update_review(reviewId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    review = Review.query.filter(Review.id == reviewId).one()

    if not review:
        return {'errors': f'Review {reviewId} not found!'}, 404

    if review.reviewer_id != current_user.id:
        return {'errors': 'Unauthorized!'}, 403

    if form.validate_on_submit():
        review.star = form.data['star']
        review.review = form.data['review']

        db.session.add(review)
        db.session.commit()

        return review.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


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
