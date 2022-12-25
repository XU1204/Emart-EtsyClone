import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCarts } from "../../store/cart";
import './cart.css'

function MyCart () {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCarts())
    }, [dispatch])

    const carts = useSelector(state => Object.values(state.carts))
    if (!carts) return null;
    const quantity = carts.length


    return (
        <div>
            <h3>{quantity} items in your cart</h3>
            <div><i class="fa-solid fa-handshake-simple"></i>Earty Purchase Protection: Shop confidently on Emarty knowing if something goes wrong with an order, we've got your back.</div>
            <div>Fancy Store</div>
            <div>
                
            </div>
        </div>
    )
}

export default MyCart;
