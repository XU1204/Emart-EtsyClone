import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../store/product";
import CreateCart from "../Cart/CreateCart";
import './product.css'


function ProductDetail () {
    const dispatch = useDispatch()
    const { productId } = useParams()

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const allProducts = useSelector(state => Object.values(state.products))
    const product = allProducts.find(product => product.id === +productId)
    if(!product) return null

    return (
        <>
            <h1>detail</h1>
            <img src={product.previewImage}></img>
            <CreateCart product={product} />
        </>
    )
}

export default ProductDetail
