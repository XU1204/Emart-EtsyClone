import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getProductsOfCurrent, removeProdcut } from "../../store/product";
import './product.css'
import UpdateProduct from "./UpdateProduct";

const MyListing = () => {
    const dispatch = useDispatch()

    const products = useSelector(state => Object.values(state.products))

    useEffect(() => {
        dispatch(getProductsOfCurrent())
    }, [dispatch])

    let content;
    if (products.length === 0) {
        content = (
            <div id='no-lst-yet'>Your have no product listings yet!</div>
        )
    } else {
        content = (
            <div className="display-product-wrapper">
                <div className="display-product-container">
                    {products.map(product => (
                        <div key={product.id} className='each-product-container'>
                            <NavLink key={product.id} to={`/products/${product.id}`} style={{ color: 'black', textDecoration: 'none'}}>
                            <img className="hp-product-img" src={product.images[0]?.url} alt={product.name}
                                onError={e => { e.currentTarget.src = "https://media.istockphoto.com/id/897730230/vector/hands-holding-a-gift-box-birthday-anniversary-celebration-pov-flat-editable-vector.jpg?s=612x612&w=0&k=20&c=CHFebwU2TcxGscBx7ObcM4LGciCFWBIQA2poO-izIcs="}}></img>
                            <div className="product-details">
                                <p className="product-name">{product.name}</p>
                                <p className="star">★★★★★</p>
                            </div>
                            <p id='my-lst-price'>${Number(product.price).toFixed(2)}</p>
                            </NavLink>
                            <div id='pen-cross'>
                                <UpdateProduct product={product} />
                                <button onClick={() => dispatch(removeProdcut(product.id))} className="change-product-button" title='Delete Listing'><i className="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div id='my-list-wrapper'>
            <div id='shop-top-bar'>
                <h2>Your Amazing Shop:</h2>
                <NavLink to='/products/new'>
                    <button className="change-product-button"><i class="fa-solid fa-plus"></i> Add a new listing</button>
                </NavLink>
            </div>
            {content}
        </div>
    )
}

export default MyListing;
