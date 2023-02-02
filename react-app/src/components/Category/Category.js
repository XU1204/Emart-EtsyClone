import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';
import { getProductsOfCategory } from '../../store/product';
import Star from '../Review/Star';

function Category () {
    const { categoryId } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsOfCategory(categoryId))
    }, [dispatch])

    const products = useSelector(state => Object.values(state.products))


    return (
        <div id='popular-product-wrapper'>
            <div className="display-product-wrapper">
                <div className="display-product-container">
                    {products?.map(product => (
                            <NavLink key={product.id} to={`/products/${product.id}`} style={{ color: 'black', textDecoration: 'none'}}>
                            <div key={product.id} className='each-product-container'>
                                <img className="hp-product-img" src={product.images[0]?.url} alt={product.name}
                                    onError={e => { e.currentTarget.src = "https://media.istockphoto.com/id/897730230/vector/hands-holding-a-gift-box-birthday-anniversary-celebration-pov-flat-editable-vector.jpg?s=612x612&w=0&k=20&c=CHFebwU2TcxGscBx7ObcM4LGciCFWBIQA2poO-izIcs="}}></img>
                                <div>
                                    <p className="product-name">{product.name}</p>
                                    <p className="star"><Star rating={product.productRating} />({product.totalReviews})</p>
                                    <p>${Number(product.price).toFixed(2)}</p>
                                </div>
                            </div>
                            </NavLink>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Category;
