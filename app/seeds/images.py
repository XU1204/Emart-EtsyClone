from app.models import db, ProductImage, environment, SCHEMA

def seed_product_images():
    images = (
        ['1', 'https://i.etsystatic.com/6120089/r/il/96a56f/3055395537/il_1140xN.3055395537_jcej.jpg'],
        ['2', 'https://i.etsystatic.com/11577357/r/il/0cfce0/1376371256/il_1140xN.1376371256_jb5f.jpg'],
        ['3', 'https://i.etsystatic.com/12324116/r/il/8c7815/4325208654/il_1140xN.4325208654_ppzn.jpg'],
        ['4', 'https://i.etsystatic.com/38145326/r/il/43d06c/4380917599/il_1140xN.4380917599_oqhq.jpg'],
        ['5', 'https://i.etsystatic.com/26343368/r/il/bcff5a/4260582323/il_1140xN.4260582323_jp01.jpg'],
        ['6', 'https://i.etsystatic.com/35218888/r/il/74b501/4363128492/il_1140xN.4363128492_n7sw.jpg'],
        ['7', 'https://i.etsystatic.com/23245295/r/il/6dfde3/4341488900/il_794xN.4341488900_b70m.jpg'],
        ['8', 'https://i.etsystatic.com/10204022/r/il/fb2b79/1130332425/il_1140xN.1130332425_rvw1.jpg'],
        ['9', 'https://i.etsystatic.com/31490040/r/il/caacc7/4190641509/il_794xN.4190641509_4w6a.jpg'],
        ['10', 'https://i.etsystatic.com/6891295/r/il/dd44b3/393756947/il_794xN.393756947_sggl.jpg'],
        ['11', 'https://i.etsystatic.com/22554153/r/il/35be66/3896964248/il_794xN.3896964248_6h91.jpg'],
        ['12', 'https://i.etsystatic.com/8065067/r/il/0dcc77/1144032473/il_794xN.1144032473_qcj6.jpg'],
        ['13', 'https://i.etsystatic.com/35172755/r/il/e23ab9/3908200929/il_794xN.3908200929_9amn.jpg'],
        ['14', 'https://i.etsystatic.com/9149057/r/il/8f5821/1342356755/il_794xN.1342356755_bnwn.jpg'],
        ['15', 'https://i.etsystatic.com/18557769/r/il/f58d68/2639714240/il_794xN.2639714240_87z5.jpg'],
        ['16', 'https://i.etsystatic.com/6503413/r/il/29359f/872661501/il_794xN.872661501_dk9f.jpg'],
        ['17', 'https://i.etsystatic.com/6729891/r/il/a4fb57/307109597/il_794xN.307109597.jpg'],
        ['18', 'https://i.etsystatic.com/37950644/r/il/37e54a/4418870918/il_794xN.4418870918_ox7b.jpg'],
        ['19', 'https://i.etsystatic.com/22537583/r/il/9a6c0b/3678864054/il_794xN.3678864054_n8mg.jpg'],
        ['20', 'https://i.etsystatic.com/10835249/r/il/fd3aba/2605938509/il_794xN.2605938509_9qi3.jpg'],
        ['21', 'https://i.etsystatic.com/16304186/r/il/548158/3973677441/il_794xN.3973677441_jlyr.jpg'],
        ['22', 'https://i.etsystatic.com/6249353/r/il/02eed5/1065727861/il_794xN.1065727861_lqzj.jpg'],
        ['23', 'https://i.etsystatic.com/8213739/r/il/0c336b/1486419097/il_794xN.1486419097_napy.jpg'],
        ['24', 'https://i.etsystatic.com/6624893/r/il/873607/4441668625/il_794xN.4441668625_9bmt.jpg'],
        ['25', 'https://i.etsystatic.com/32565506/r/il/a8f4e2/3721115332/il_794xN.3721115332_ip2r.jpg']
    )

    for i in images:
        image = ProductImage(product_id = i[0], url = i[1])
        db.session.add(image)
        db.session.commit()

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM product_images")

    db.session.commit()
