import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getReviewsOfCurrent, removeReview } from "../../store/review";
import UpdateReview from "./UpdateReview";
import styles from './review.module.css'

const MyReviews = () => {
    const dispatch  = useDispatch();

    useEffect(() => {
        dispatch(getReviewsOfCurrent())
    }, [dispatch])

    const reviews = useSelector(state => Object.values(state.reviews))
    console.log("review front++++++++", reviews)

    let exist;
    if (reviews.length) exist = true
    else exist = false

    return (
        <div>
            <h1>My Reviews List</h1>
            <div>
            {exist && reviews.map(review => (
                <div>
                    <NavLink key={review.id} to={`/products/${review.productId}`} style={{ color: 'black', textDecoration: 'none'}}>
                                <img className='' src={review.Product.images[0].url} alt={review.Product.name}
                                    onError={e => { e.currentTarget.src = "https://media.istockphoto.com/id/897730230/vector/hands-holding-a-gift-box-birthday-anniversary-celebration-pov-flat-editable-vector.jpg?s=612x612&w=0&k=20&c=CHFebwU2TcxGscBx7ObcM4LGciCFWBIQA2poO-izIcs="}}>
                                </img>
                                <h4 className="" title={review.Product.name}>{review.Product.name}</h4>
                                <p><strong>My Review:</strong>{review.review}</p>
                                <p><strong>My Rating:</strong>{review.star}</p>
                    </NavLink>
                    <div id='pen-cross'>
                            <UpdateReview review={review} />
                            <button onClick={() => dispatch(removeReview(review.id))} className="" title='Delete Review'><i className="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
            ))}
            </div>
            {!exist && (
                <div className={styles.last}>
                    <h2>You have no reviews yet!</h2>
                    <NavLink to='' id={styles.discover}>
                        <p>Discover something unique!</p>
                    </NavLink>
                </div>
            )}
        </div>
    )

}

export default MyReviews
