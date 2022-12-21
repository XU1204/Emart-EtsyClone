from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), nullable=False)
    avalibility = db.Column(db.Integer, nullable=False)
    preview_image = db.Column(db.String, default='https://egthreads.com/wp-content/uploads/2022/08/no-preview-3.png')
    created_at = db.Column(db.Date, default = db.func.now())
    updated_at = db.Column(db.Date, server_default=db.func.now(), server_onupdate=db.func.now())

    seller = db.relationship('User', back_populates='products')
    category = db.relationship('Category', back_populates='products')
    reviews = db.relationship('Review', back_populates='product', cascade="all, delete-orphan")
    cart_items = db.relationship('Cart', back_populates='item', cascade="all, delete-orphan")
