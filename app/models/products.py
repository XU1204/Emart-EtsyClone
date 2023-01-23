from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.DECIMAL, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), nullable=False)
    avalibility = db.Column(db.Integer, nullable=False)
    # preview_image = db.Column(db.String, default='https://egthreads.com/wp-content/uploads/2022/08/no-preview-3.png')
    created_at = db.Column(db.Date, default = db.func.now())
    updated_at = db.Column(db.Date, server_default=db.func.now(), server_onupdate=db.func.now())

    seller = db.relationship('User', back_populates='products')
    category = db.relationship('Category', back_populates='products')
    reviews = db.relationship('Review', back_populates='product', cascade="all, delete-orphan")
    cart_items = db.relationship('Cart', back_populates='item', cascade="all, delete-orphan")
    # added
    favorites = db.relationship('Favorite', back_populates='product', cascade="all, delete-orphan")
    images = db.relationship('ProductImage', back_populates='product', cascade="all, delete-orphan", order_by='ProductImage.id')
    reviews = db.relationship("Review", back_populates="product", cascade="all, delete-orphan", order_by='Review.id')
    purchases = db.relationship("OrderDetail", back_populates="product", cascade="all, delete-orphan", order_by='OrderDetail.id')

    def to_dict(self):
        preview_image = list(self.images)[0] if len(self.images) else None
        product_rating = sum(
            [review.rating for review in self.reviews]) / len(self.reviews) if len(self.reviews) > 0 else None
        total_reviews = len(self.reviews)
        sales_num = sum([purchase.quantity for purchase in self.purchases])

        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "avalibility": self.avalibility,
            "sellerId": self.seller_id,
            "categoryId": self.category_id,
            "price": float(self.price),
            "previewImage": preview_image,
            "Seller": {
                "id": self.seller.id,
                "username": self.seller.username,
                "email": self.seller.email,
            },
            "Category": {
                "id": self.category.id,
                "categoryName": self.category.category_name,
            },
            "product_rating": product_rating,
            "totalReviews": total_reviews,
            "reviews": [x.to_dict() for x in self.reviews],
            "images": [x.to_dict() for x in self.images]
        }
