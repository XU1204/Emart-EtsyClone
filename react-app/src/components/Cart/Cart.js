import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getCarts, removeCart, checkoutCart } from "../../store/cart";
import UpdateCart from "./UpdateCart";
import './cart.css'
import handshake from '../../assets/handshake.png'

function MyCart () {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getCarts())
    }, [dispatch])

    const carts = useSelector(state => Object.values(state.carts))
    if (!carts) return null;
    const number = carts.length
    const total = carts.reduce((totalPrice, cart) => totalPrice + cart.Item.price * cart.quantity, 0)

    const changePath = () => {
        dispatch(checkoutCart())
        history.push('/carts/checkout')
    }

    let content;
    if (carts.length === 0) {
        content = (
            <div className="empty-cart-container">
                <div className="cart-snd-line"><img id='handshake' src={handshake} alt='handshake'></img><span>Earty Purchase Protection:</span>&nbsp;Shop confidently on Emarty knowing if something goes wrong with an order, we've got your back.</div>
                <div id='cart-empty-txt'>
                    You cart is empty.
                </div>
                <NavLink to='' id='navlink'>
                    <span id='discover-txt'>Discover something unique to fill it up</span>
                </NavLink>
            </div>
        )
    } else {
        content = (
            <div className="cart-content-container">
                <div className="cart-top-line">
                    <h3>{number} {number > 1 ? 'items':'item'} in your cart</h3>
                    <NavLink to='' style={{ color: 'black', textDecoration: 'none'}}>
                        <button id='keep-shopping'>Keep shopping</button>
                    </NavLink>
                </div>
                <div className="cart-snd-line"><img id='handshake' src={handshake} alt='handshake'></img><span>Earty Purchase Protection:</span>&nbsp;Shop confidently on Emarty knowing if something goes wrong with an order, we've got your back.</div>
                <div className="cart-middle-container">
                    <div>
                        {carts.map(cart => (
                            <div className='cart-product-container'>
                                <div id='shop-name'><i class="fa-regular fa-gem"></i>&nbsp;Fancy Store</div>
                                <div className="each-cart-middle-container">
                                    <div className="each-cart-middle-container">
                                        <div className="cart-img-container">
                                            <NavLink key={cart.id} to={`/products/${cart.itemId}`} style={{ color: 'black', textDecoration: 'none'}}>
                                                <img className="cart-product-img" src={cart.Item.previewImage} alt={cart.Item.name} onError={e => { e.currentTarget.src = "https://egthreads.com/wp-content/uploads/2022/08/no-preview-3.png"}}></img>
                                            </NavLink>
                                        </div>
                                        <div id='cart-name-remove'>
                                            <NavLink key={cart.id} to={`/products/${cart.itemId}`} style={{ color: 'black', textDecoration: 'none'}}>
                                                {cart.Item.name}
                                            </NavLink>
                                            <button onClick={() => dispatch(removeCart(cart.id))} className="change-product-button">Remove</button>
                                        </div>
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
                    </div>
                    <div className="checkout-container">
                        <h4>Hello, you will pay:</h4>
                        <div className="checkout-line">
                            <span className="checkout-bold-txt">Item(s) total</span><span>${total.toFixed(2)}</span>
                        </div>
                        <div  className="checkout-line">
                            <span className="checkout-bold-txt">Shop discount</span><span>-$0.00</span>
                        </div>
                        <div className="checkout-line" id='subtotal'>
                            <span>Subtotal</span> <span>${total.toFixed(2)}</span>
                        </div>
                        <div  className="checkout-line">
                            <span>Shipping</span><span id='free-txt'>FREE</span>
                        </div>
                        <button id='checkout-button' onClick={changePath}>Proceed to checkout</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div id='cart-page-container'>
            {content}
            <div id='cart-slogan'><i class="fa-brands fa-pagelines"></i>&nbsp;Earty offsets carbon emissions from every delivery</div>
        </div>
    )
}

export default MyCart;
