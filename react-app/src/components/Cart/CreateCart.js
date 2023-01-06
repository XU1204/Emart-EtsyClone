import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createCart, updateCart } from '../../store/cart';
import '../Product/productDetails.css'
import { useHistory } from 'react-router-dom';

function CreateCart({product, isExist}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [quantity, setQuantity] = useState(1)

    const user = useSelector(state => Object.values(state.session)[0])

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (!user) {
           return window.alert('Please sign in or register first!')
        }

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
                quantity: isExist.quantity + Number(quantity)
            }
            if (payload2.quantity > 20) {
                return window.alert('Quantity of single item in your shopping cart should not exceed 20. Please check your shopping cart for the quantity!')
            }
            else await dispatch(updateCart(isExist.id, payload2))
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
                {[...Array(21).keys()].slice(1).map((num) => (
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
