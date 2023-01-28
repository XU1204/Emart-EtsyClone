import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getFavoritsofCurrent } from "../../store/favorite";

const MyFavorites = () => {
    const dispatch  = useDispatch();

    useEffect(() => {
        dispatch(getFavoritsofCurrent())
    }, [dispatch])

    const favorites = useSelector(state => state.favortites)

    return (
        <div>
            <h1>Favorites items</h1>
            {favorites && <span>{Object.values(favorites).length} items</span>}
            {favorites && Object.values(favorites).map(favorite => (
                <div>
                    <img src={favorite.Product.images[0].url} />
                    <h4>{favorite.Product.name}</h4>
                    <p>${favorite.Product.price}</p>
                </div>
            ))}
            {!favorites && (
                <div>
                    <h2>You have no favorite items!</h2>
                    <NavLink style={{ color: 'black'}} to=''>Discover something unique to add to your favorite list!</NavLink>
                </div>
            )}
        </div>
    )
}

export default MyFavorites;
