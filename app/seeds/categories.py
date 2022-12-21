from app.models import db, Category, environment, SCHEMA

def seed_categories():
    category_list = ['Jewelry & Accessories', 'Clothing & Shoes', 'Home & Living', 'Toys & Entertainment', 'Art & Collectibles']
    for i in range(0, 5):
        category = Category(category_name = category_list[i])
        db.session.add(category)
        db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM categories")

    db.session.commit()
