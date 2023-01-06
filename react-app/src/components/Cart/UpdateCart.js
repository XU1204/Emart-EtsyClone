import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateCart } from '../../store/cart';
import { useEffect } from 'react';
import './cart.css'

function UpdateCart({cart}) {
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(cart.quantity)

    const payload = {
        quantity
    }

    useEffect((quantity) => {
        dispatch(updateCart(cart.id, payload))
    }, [quantity])

    return (
        <div id='update-cart-container'>
            <select
                name='quantity'
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
            >
                {/* [...Array(11).keys()] is [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] */}
                {[...Array(11 + quantity).keys()].slice(1).map((num) => (
                    <option
                        key={num}
                        value={num}
                    >
                        {num}</option>
                ))}
            </select>
            <div>
                {`$${(quantity * cart.Item.price).toFixed(2)}`}
            </div>
        </div>
    )
}

export default UpdateCart;
