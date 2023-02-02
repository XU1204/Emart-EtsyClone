import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getReviewsOfCurrent, removeReview } from "../../store/review";
import UpdateReview from "./UpdateReview";
import Star from './Star'
import styles from './review.module.css'

const MyReviews = () => {
    const dispatch  = useDispatch();

    useEffect(() => {
        dispatch(getReviewsOfCurrent())
    }, [dispatch])

    const reviews = useSelector(state => Object.values(state.reviews))

    let exist;
    if (reviews.length) exist = true
    else exist = false

    return (
        <div>
            <div className={styles.titleWrapper}>
                <h1>My Reviews</h1>
                {exist && <p> {reviews.length} {reviews.length > 1? 'reviews':'review'}</p>}
            </div>
            <div>
            {exist && reviews.map(review => (
                <div className={styles.reviewWrapper}>
                    <NavLink key={review.id} to={`/products/${review.productId}`} style={{ color: 'black', textDecoration: 'none'}}>
                        <div className={styles.middle}>
                            <img className={styles.image} src={review.Product.images[0].url} alt={review.Product.name}
                                onError={e => { e.currentTarget.src = "https://media.istockphoto.com/id/897730230/vector/hands-holding-a-gift-box-birthday-anniversary-celebration-pov-flat-editable-vector.jpg?s=612x612&w=0&k=20&c=CHFebwU2TcxGscBx7ObcM4LGciCFWBIQA2poO-izIcs="}}>
                            </img>
                            <div className={styles.content}>
                                <h4 className="" title={review.Product.name}>{review.Product.name}</h4>
                                <p><strong>Review: </strong>{review.review}</p>
                                <p style={{display: 'flex'}}><strong>Rating: &nbsp;</strong><Star rating={review.star}/></p>
                                <p><strong>Date: &nbsp;</strong>{review.updatedAt.slice(0,16)}</p>
                            </div>
                        </div>
                    </NavLink>
                    <div className={styles.change}>
                            <UpdateReview review={review} />
                            <button onClick={() => dispatch(removeReview(review.id))} className="change-review-btn" title='Delete Review'><i className="fa-solid fa-xmark"></i></button>
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
