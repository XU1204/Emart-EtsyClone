import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsOfCurrent, removeProdcut } from "../../store/product";
import CreateProduct from "./CreateProduct";
import './product.css'

const MyListing = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsOfCurrent())
    }, [dispatch])

    const products = useSelector(state => Object.values(state.products))

    let content;
    if (!products) {
        content = (
            <div>Your have no product listings yet!</div>
        )
    } else {
        content = (
            <div className="display-product-container">
            {products.map(product => (
                <div key={product.id} className='each-product-container'>
                    <img className="hp-product-img" src={product.previewImage} alt={product.name}></img>
                    <div>
                        <p>{product.name.length > 35 ? product.name.substring(0, 34)+'...' : product.name}</p>
                        <p>★★★★★</p>
                        <p>${Number(product.price).toFixed(2)}</p>
                    </div>
                    <button onClick={() => dispatch(removeProdcut(product.id))}><i className="fa-solid fa-xmark"></i></button>
                </div>
            ))}
        </div>
        )
    }

    return (
        <div>
            <div id='shop-top-bar'>
                <h2>Your Amazing Shop:</h2>
                <CreateProduct />
            </div>
            {content}
        </div>
    )
}

export default MyListing;
