import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../store/product";
import { getCarts } from "../../store/cart";
import CreateCart from "../Cart/CreateCart";
import './product.css'


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
        <>
            <h1>detail</h1>
            <img src={product.previewImage}></img>
            <CreateCart product={product} isExist={isExist}/>
        </>
    )
}

export default ProductDetail
