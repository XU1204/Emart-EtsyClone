import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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
                <NavLink key={product.id} to={`/products/${product.id}`} style={{ color: 'black', textDecoration: 'none'}}>
                <div key={product.id} className='each-product-container'>
                    <div className="hp-img-container">
                        <img className="hp-product-img" src={product.previewImage} alt={product.name} onError={e => { e.currentTarget.src = "https://egthreads.com/wp-content/uploads/2022/08/no-preview-3.png"}}></img>
                    </div>
                    <div>
                        <p>{product.name.length > 47 ? product.name.substring(0, 46)+'...' : product.name}</p>
                        <p>★★★★★</p>
                        <p>${Number(product.price).toFixed(2)}</p>
                    </div>
                </div>
                </NavLink>
            ))}
        </div>
    )

}

export default Product;
