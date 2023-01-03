import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createCart, updateCart } from '../../store/cart';
import '../Product/productDetails.css'
import { useHistory } from 'react-router-dom';

function CreateCart({product, isExist}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => Object.values(state.session)[0])

    const [quantity, setQuantity] = useState(1)

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (!user) window.alert('Please sign in to add to cart!')

        const payload = {
            itemId: product.id,
            quantity
        }

        // if the item is not in your cart, then add this new item to your cart
        if (!isExist) {
            await dispatch(createCart(payload))
        // if the item is already in your cart, just update the quantity
        } else {
            const payload2 = {
                quantity: isExist.quantity + quantity
            }
            await dispatch(updateCart(isExist.id, payload2))
        }

        history.push('/carts')
    }
    return (
        <form id='detail-form' onSubmit={handleSubmit}>
            <div id='select-quantity-txt'>Select the quantity{' '}<span className='asterisk'>*</span></div>
            <select
                id='select-quantity'
                name='quantity'
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                >
                {/* [...Array(11).keys()] is [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] */}
                {[...Array(11).keys()].slice(1).map((num) => (
                    <option
                        key={num}
                        value={num}
                    >
                        {num}</option>
                ))}
            </select>
            <button id='add-cart-button' type='submit'>Add to cart</button>
        </form>
    )
    }

export default CreateCart;
