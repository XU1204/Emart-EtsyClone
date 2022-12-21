from app.models import db, Review, environment, SCHEMA

def seed_reviews():
    reviews = {
        ['1', '2', 'My mom likes this gift!', 5],
        ['2', '3', 'My baby looks cute in the suit. But the quality is not as good as I thought.', 4],
        ['3', '4', 'The art fits my home! It looks so elegant.', 5],
        ['4', '5', 'My kid loves this toy. It\'s of great quality!', 5],
        ['5', '1',  'The quality was so bad. Don\'t waste your monne.', 2]
    }

    for i in reviews:
        review = Review(reviewer_id = i[0], product_id = i[1], review = i[2], stars = i[3])
        db.session.add(review)
        db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
