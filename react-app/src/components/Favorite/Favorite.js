import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getFavoritsofCurrent, removeFavorite } from "../../store/favorite";
import styles from './favorite.module.css'

const MyFavorites = () => {
    const dispatch  = useDispatch();

    useEffect(() => {
        dispatch(getFavoritsofCurrent())
    }, [dispatch])

    const favorites = useSelector(state => Object.values(state.favorites))

    let exist;
    if (favorites.length) exist = true
    else exist = false

    return (
        <div>
            <div className={styles.titleWrapper}>
                <h1>Favorites items</h1>
                {exist && <p> {favorites.length} {favorites.length > 1? 'items':'item'}</p>}
            </div>
            <div className="display-product-wrapper">
                <div className="display-product-container">
                    {exist && favorites.map(favorite => (
                        <div className='each-product-container'>
                            <NavLink key={favorite.id} to={`/products/${favorite.productId}`} style={{ color: 'black', textDecoration: 'none'}}>
                                <img className='hp-product-img' src={favorite.Product.images[0].url} alt={favorite.Product.name}
                                    onError={e => { e.currentTarget.src = "https://media.istockphoto.com/id/897730230/vector/hands-holding-a-gift-box-birthday-anniversary-celebration-pov-flat-editable-vector.jpg?s=612x612&w=0&k=20&c=CHFebwU2TcxGscBx7ObcM4LGciCFWBIQA2poO-izIcs="}}>
                                </img>
                                <h4 className="product-name" title={favorite.Product.name}>{favorite.Product.name}</h4>
                            </NavLink>
                            <div className={styles.priceWrapper}>
                                <p>${favorite.Product.price.toFixed(2)}</p>
                                <button onClick={() => dispatch(removeFavorite(favorite.id))} className={styles.button} title='Remove from Favorite List'><i className="fa-solid fa-heart" style={{color: '#a5192e'}}></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {!exist && (
                <div className={styles.last}>
                    <h2>You have no favorite items!</h2>
                    <NavLink to='' id={styles.discover}>
                        <p>Discover something unique to add to your favorite list!</p>
                    </NavLink>
                </div>
            )}
        </div>
    )
}

export default MyFavorites;
