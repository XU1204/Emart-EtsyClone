from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    review = db.Column(db.String(255), nullable=False)
    star = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.Date, default = db.func.now())
    updated_at = db.Column(db.Date, server_default=db.func.now(), server_onupdate=db.func.now())

    reviewer = db.relationship('User', back_populates='reviews')
    product = db.relationship('Product', back_populates='reviews')

    def to_dict(self):
        return {
            "id": self.id,
            "review": self.review,
            "star": self.star,
            "reviewerId": self.reviewer_id,
            "productId": self.product_id,
            "Reviewer": self.reviewer.to_dict(),
            "Product": self.product.to_dict()
        }
