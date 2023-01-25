from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='cart_items')
    item = db.relationship('Product', back_populates='cart_items')

    def to_dict(self):
        print('+++++++++++', self.item.images[0].url)
        return {
            "id": self.id,
            "itemId": self.item_id,
            "userId": self.user_id,
            "quantity": self.quantity,
            "User": self.user.to_dict(),
            "Item":{
                "id": self.item.id,
                "name": self.item.name,
                "description": self.item.description,
                "avalibility": self.item.avalibility,
                "sellerId": self.item.seller_id,
                "categoryId": self.item.category_id,
                "price": float(self.item.price),
                "images": [x.to_dict() for x in self.item.images]
            }
        }
