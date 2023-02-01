import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getProducts } from "../../store/product";
import Star from "../Review/Star";
import './product.css'


function Product () {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const allProducts = useSelector(state => Object.values(state.products))
    if (!allProducts) return null
    const products = allProducts.slice(0,8)

    return (
        <div className="display-product-wrapper">
            <div className="eight-products-container">
                {products.map((product, i) => (
                    <div className="eight-products" key={i}>
                        <NavLink to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                            <div className="item">
                                <img src={product.images[0]?.url} alt={product.name}
                                onError={e => { e.currentTarget.src = "https://media.istockphoto.com/id/897730230/vector/hands-holding-a-gift-box-birthday-anniversary-celebration-pov-flat-editable-vector.jpg?s=612x612&w=0&k=20&c=CHFebwU2TcxGscBx7ObcM4LGciCFWBIQA2poO-izIcs="}}></img>
                            </div>
                        </NavLink>
                        <div className='eight-products-price'>
                            <strong><span>$</span>{parseFloat(product.price).toFixed(2)}</strong>
                        </div>
                    </div>
                ))}
            </div>
            <h3 id='product-h3'>Popular products right now</h3>
            <div className="display-product-container">
                {allProducts.map(product => (
                    <NavLink key={product.id} to={`/products/${product.id}`} style={{ color: 'black', textDecoration: 'none'}}>
                    <div key={product.id} className='each-product-container'>
                        <img className="hp-product-img" src={product.images[0]?.url} alt={product.name}
                            onError={e => { e.currentTarget.src = "https://media.istockphoto.com/id/897730230/vector/hands-holding-a-gift-box-birthday-anniversary-celebration-pov-flat-editable-vector.jpg?s=612x612&w=0&k=20&c=CHFebwU2TcxGscBx7ObcM4LGciCFWBIQA2poO-izIcs="}}></img>
                        <div>
                            <p className="product-name">{product.name}</p>
                            <p className="star">★★★★★☆({product.totalReviews})</p>
                            <p>${Number(product.price).toFixed(2)}</p>
                        </div>
                    </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )

}

export default Product;
