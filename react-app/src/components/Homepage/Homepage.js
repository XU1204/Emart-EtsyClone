import { useSelector } from "react-redux";
import Product from "../Product/Product";
import './Homepage.css'

function Homepage() {
    const user = useSelector(state => Object.values(state.session)[0])
    let hello
    if (!user) {
        hello = (
            <p>Holiday magic starts with these merry finds.</p>
        )
    } else {
        hello = (
            <p>Welcome back, {user.username}!</p>
        )
    }

    return (
        <div id='hp-container'>
            <div className="hp-top">
                {hello}
                <div className="category-container">
                    <div className="each-category-container">
                        <img className="category-img" src='http://res.cloudinary.com/mejuri-com/image/upload/v1668465890/campaigns/2022/Holiday/Homepage/01%20Homepage/Gift%20Guide%20Grid/DT/Gifts300-500_-DT-_2x.jpg' alt='Jewelry & Accessories'></img>
                        <div className="category-name">Jewelry & Accessories</div>
                    </div>
                    <div className="each-category-container">
                        <img className="category-img" src="https://media.istockphoto.com/id/1257563298/photo/fashion-clothes-on-a-rack-in-a-light-background-indoors-place-for-text.jpg?s=612x612&w=0&k=20&c=UTL3KlMvLkteLe_9l3QbMklBcyaKQM5j6mcDxxtTr4Y=" alt='Clothing & Shoes'></img>
                        <div className="category-name">Clothing & Shoes</div>
                    </div>
                    <div className="each-category-container">
                        <img className="category-img" src="https://shapestack.com/SS/wp-content/uploads/2020/02/home-letters-with-wreath.jpg" alt='Home & Living'></img>
                        <div className="category-name">Home & Living</div>
                    </div>
                    <div className="each-category-container">
                        <img className="category-img" src="https://img.freepik.com/premium-photo/many-colorful-toys-collection-wooden-desk_488220-17409.jpg?w=900" alt='Toys & Entertainment'></img>
                        <div className="category-name">Toys & Entertainment</div>
                    </div>
                    <div className="each-category-container">
                        <img className="category-img" src="https://images.rawpixel.com/image_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcGR2YW5nb2doLXNlbGYtcG9ydHJhaXQtbTAxLWpvYjY2MV8yLWwxMDBvNmVmLmpwZw.jpg" alt='Art & Collectibles'></img>
                        <div className="category-name">Art & Collectibles</div>
                    </div>
                </div>
            </div>
            <h3>Popular products right now</h3>
            <Product />
        </div>
    )
}

export default Homepage;
