from .db import db, environment, SCHEMA, add_prefix_for_prod

class OrderDetail(db.Model):
    __tablename__ = 'order_details'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id'), ondelete='CASCADE'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.DECIMAL, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now(), nullable=False)

    order = db.relationship("Order", back_populates="order_details")
    product = db.relationship("Product", back_populates="purchases")

    def to_dict(self):
        return {
            "product_id": self.product_id,
            "product": self.product.to_dict() if self.product else None,
            "price": self.price,
            "quantity": self.quantity,
            "order_id": self.order_id,
        }
