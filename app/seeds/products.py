from app.models import db, Product, environment, SCHEMA

def seed_products():
    products = {
        [1, 'Crystal Birthstone Necklace for Mom, Personalized Family Tree Necklace, Mom\'s Birthstone Necklace, Grandma Necklace Gift', 'Crystal Birthstone Necklace for Mom, Personalized Family Tree Necklace, Mom\'s Birthstone Necklace, Grandma Necklace Gift', 30.71, 1, 10, 'https://i.etsystatic.com/6120089/r/il/96a56f/3055395537/il_1140xN.3055395537_jcej.jpg'],
        [2, 'Baby Girl First Christmas outfit, 1st christmas outfit, red gold christmas outfit, Christmas tutu outfit, Christmas dress, red tutu', 'Baby\'s 1st Christmas Outfit in glittering colors! For boy\'s i can make in non glitter red and green. LEGWARMERS ARE OUT OF STOCK!!! Makes great photo props for your new born.', 15.29, 2, 20, 'https://i.etsystatic.com/11577357/r/il/0cfce0/1376371256/il_1140xN.1376371256_jb5f.jpg'],
        [3, 'Botanical Print Set of 4 - Botanical Illustration - Botanical Art Print - Art Prints - Vintage Botanical Print Set of 4 - Botanical Poster', 'This is for a set of 4 prints of a Botanical Floral illustration that has been hand painted and were found in an Antique natural history text book. The original has been digitally enhanced and are printed on heavy matte photo paper.', 38.00, 3, 5, 'https://i.etsystatic.com/12324116/r/il/8c7815/4325208654/il_1140xN.4325208654_ppzn.jpg'],
        [4, 'Personalized Wooden Handmade Music Box,Christmas Music Box,Wooden Horse Musical Carousel,Horse Music Box, Musical Carousel,Heirloom Carousel', 'You can engrave your baby\'s name or other content on this music box, but it\'s best not to exceed 9 characters.There are 6 fonts to choose from. You can also choose not to engrave if your preferred font is not available.', 34.31, 4, 2, 'https://i.etsystatic.com/38145326/r/il/43d06c/4380917599/il_1140xN.4380917599_oqhq.jpg'],
        [5, 'Crystal Suncatchers, Light Catcher, Boho Decor, Moon Evil Eye Window Prism, Witchy Decor, Housewarming Gift, Indie Room Decor', 'Brighten your day with this colorful Fairy Crystals Suncatchers! When bright sunlight hits this prism, it transforms the light into beautiful rainbows. Let the sunshine in and color your world!', 11.59, 5, 15, 'https://i.etsystatic.com/26343368/r/il/bcff5a/4260582323/il_1140xN.4260582323_jp01.jpg']
    }
    for i in products:
        product = Product(seller_id=i[0], name=i[1], description=i[2], price=i[3], category_id=i[4], avalibility=i[5], preview_image=i[6])
        db.session.add(product)
        db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
