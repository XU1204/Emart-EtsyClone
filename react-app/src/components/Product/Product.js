import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/product";
import './product.css'


function Product () {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const allProducts = useSelector(state => Object.values(state.products))
    if (!allProducts) return null

    return (
        <div className="display-product-container">
            {allProducts.map(product => (
                <div key={product.id} className='each-product-container'>
                    <img className="hp-product-img" src={product.previewImage} alt={product.name}></img>
                    <div>
                        <p>{product.name.length > 47 ? product.name.substring(0, 46)+'...' : product.name}</p>
                        <p>★★★★★</p>
                        <p>${Number(product.price).toFixed(2)}</p>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default Product;
