import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../store/product";
import { getCarts } from "../../store/cart";
import CreateCart from "../Cart/CreateCart";
import './productDetails.css'
import cart from '../../assets/cart.png'
import truck from '../../assets/truck.png'


function ProductDetail () {
    const dispatch = useDispatch()
    const { productId } = useParams()

    useEffect(() => {
        dispatch(getProducts())
        dispatch(getCarts())
    }, [dispatch])

    const allProducts = useSelector(state => Object.values(state.products))
    const product = allProducts.find(product => product.id === +productId)
    const carts = useSelector(state => Object.values(state.carts))

    if(!product) return null
    if (!carts) return null;

    const isExist = carts.find(cart => cart.itemId === +productId)


    return (
        <div className="detail-cantainer">
            <div className="detail-left-container">
                <img src={product.previewImage}
                    onError={e => { e.currentTarget.src = "https://media.istockphoto.com/id/897730230/vector/hands-holding-a-gift-box-birthday-anniversary-celebration-pov-flat-editable-vector.jpg?s=612x612&w=0&k=20&c=CHFebwU2TcxGscBx7ObcM4LGciCFWBIQA2poO-izIcs="}}>
                </img>
            </div>
            <div className="detail-right-container">
                <p id='detail-name'>{product.name}</p>
                <div id='detail-price'>${product.price.toFixed(2)}</div>
                <CreateCart product={product} isExist={isExist}/>
                <div className="detail-small-img-txt">
                    <img src={cart} alt='cart' />
                    <p><span style={{fontWeight: 'bold'}}>Other people want this.</span> Many people have this in their carts right now.</p>
                </div>
                <div className="detail-small-img-txt">
                    <img src={truck} alt='truck'></img>
                    <p><span style={{fontWeight: 'bold'}}>Hooray!</span> This item ships free to the US.</p>
                </div>
                <p id='description-txt'>Description</p>
                <p id='detail-description'>{product.description}</p>
            </div>
        </div>
    )
}

export default ProductDetail
