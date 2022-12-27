import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCarts, removeCart } from "../../store/cart";
import UpdateCart from "./UpdateCart";
import './cart.css'

function MyCart () {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCarts())
    }, [dispatch])

    const carts = useSelector(state => Object.values(state.carts))
    if (!carts) return null;
    const number = carts.length


    return (
        <div>
            <h3>{number} items in your cart</h3>
            <div><i class="fa-solid fa-handshake-simple"></i>Earty Purchase Protection: Shop confidently on Emarty knowing if something goes wrong with an order, we've got your back.</div>
            {carts.map(cart => (
                <div className='cart-product-container'>
                    <div><i class="fa-regular fa-gem"></i>Fancy Store</div>
                    <div className="each-cart-container">
                        <div className="cart-img-container">
                            <NavLink key={cart.id} to={`/products/${cart.item_id}`} style={{ color: 'black', textDecoration: 'none'}}>
                                <img className="cart-product-img" src={cart.Item.previewImage} alt={cart.Item.name} onError={e => { e.currentTarget.src = "https://egthreads.com/wp-content/uploads/2022/08/no-preview-3.png"}}></img>
                            </NavLink>
                        </div>
                        <div>
                            <NavLink key={cart.id} to={`/products/${cart.item_id}`} style={{ color: 'black', textDecoration: 'none'}}>
                                {cart.Item.name}
                            </NavLink>
                            <button onClick={() => dispatch(removeCart(cart.id))} className="change-product-button">Remove</button>
                        </div>
                        <div>
                            <UpdateCart cart={cart} />
                        </div>
                        {/* <div>
                            {`$${(cart.quantity * cart.Item.price).toFixed(2)}`}
                        </div> */}
                    </div>
                </div>

            ))}

            <div>

            </div>
        </div>
    )
}

export default MyCart;
