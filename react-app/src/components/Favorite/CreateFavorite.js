import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFavorite, getFavoritsofCurrent, removeFavorite } from "../../store/favorite";

const CreateFavorite = ({product}) => {
    const dispatch  = useDispatch();

    useEffect(() => {
        dispatch(getFavoritsofCurrent())
    }, [dispatch])

    const favorites = useSelector(state => Object.values(state.favorites))
    const favorite = favorites.find(fav => fav.productId === +product.id);

    let heart = (<i class="fa-regular fa-heart"></i>)
    if (favorite) heart = (<i class="fa-solid fa-heart" style={{color: '#a5192e'}}></i>)

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (favorite) {
            await dispatch(removeFavorite(favorite.id))
        } else {
            const payload = {productId: product.id}
            await dispatch(createFavorite(payload))
        }
    }

    return (
        <div className="detail-heart-container">
                <button id='detail-heart' onClick={(e) => handleSubmit(e)} type='submit'>{heart}</button>
        </div>
    )
}

export default CreateFavorite;
