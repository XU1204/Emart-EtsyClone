from app.models import db, Cart, environment, SCHEMA

def seed_carts():
    carts = (
        ['1', '2', 1],
        ['1', '3', 2],
        ['2', '3', 2],
        ['2', '4', 1],
        ['3', '4', 1],
        ['3', '5', 2]
    )

    for i in carts:
        cart = Cart(user_id = i[0], item_id = i[1], quantity = i[2])
        db.session.add(cart)
        db.session.commit()

def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM carts")

    db.session.commit()
