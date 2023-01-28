from .db import db, environment, SCHEMA, add_prefix_for_prod

class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(100), nullable=False)

    products = db.relationship('Product', back_populates='category', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.category_name,
            "products": [x.to_dict() for x in self.products]
        }
