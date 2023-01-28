import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../store/product";
import { getCarts } from "../../store/cart";
import CreateCart from "../Cart/CreateCart";
import './productDetails.css'
import cart from '../../assets/cart.png'
import truck from '../../assets/truck.png'
import { getFavoritsofCurrent, createFavorite, removeFavorite } from "../../store/favorite";


function ProductDetail () {
    const dispatch = useDispatch()
    const { productId } = useParams()

    const [isFavored, setIsFavored] = useState(false)

    useEffect(() => {
        dispatch(getProducts())
        dispatch(getCarts())
        dispatch(getFavoritsofCurrent())
    }, [dispatch])

    const allProducts = useSelector(state => Object.values(state.products))
    const product = allProducts.find(product => product.id === +productId)
    const carts = useSelector(state => Object.values(state.carts))
    const favorites = useSelector(state => state.favorites)
    console.log('detail fav +++++++++', favorites)

    if(!product) return null
    if (!carts) return null;

    let heart = (
        <i class="fa-regular fa-heart"></i>
    )
    let favorite;
    if (favorites) {
        favorite = (Object.values(favorites)).find(fav => fav.productId === productId);
        console.log('detail fav ---------', favorite)
        if (favorite) {
            setIsFavored(true)
            heart = (
                <i class="fa-solid fa-heart" style={{color: 'red'}}></i>
            )
        }
    }
    // } else {
    //     heart = (
    //         <i class="fa-regular fa-heart"></i>
    //     )
    // }

    const isExist = carts.find(cart => cart.itemId === +productId)


    const handleSubmit = async (e) => {
        if (isFavored) {
            await dispatch(removeFavorite(favorite.id))
            setIsFavored(false)
            heart = (
                <i class="fa-regular fa-heart"></i>
            )
        } else {
            const payload = {productId}
            await dispatch(createFavorite(payload))
            setIsFavored(true)
            heart = (
                <i class="fa-solid fa-heart" style={{color: 'red'}}></i>
            )
        }
    }


    return (
        <div className="detail-cantainer">
            <div className="detail-left-container">
                <img src={product.images[0]?.url}
                    onError={e => { e.currentTarget.src = "https://media.istockphoto.com/id/897730230/vector/hands-holding-a-gift-box-birthday-anniversary-celebration-pov-flat-editable-vector.jpg?s=612x612&w=0&k=20&c=CHFebwU2TcxGscBx7ObcM4LGciCFWBIQA2poO-izIcs="}}>
                </img>
            </div>
            <div className="detail-right-container">
                <p id='detail-name'>{product.name}</p>
                <div className="price-heart-container">
                    <div id='detail-price'>${product.price.toFixed(2)}</div>
                    <div className="detail-heart-container">
                        <button id='detail-heart' onClick={handleSubmit}>{heart}</button>
                    </div>
                </div>
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
