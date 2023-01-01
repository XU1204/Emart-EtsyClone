import { useSelector } from 'react-redux'
import './cart.css'
import flag from '../../assets/flag.png'

function CheckoutCart() {
    const user = useSelector(state => Object.values(state.session)[0])
    
    return (
        <div id='order-palced-container'>
            <img src={flag} alt='flag'></img>
            <h1>Thanks for your order!</h1>
            <p>We've sent a receipt to {user.email}.</p>
        </div>
    )
}

export default CheckoutCart;
