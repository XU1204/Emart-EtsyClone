import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { updateReview } from '../../store/review';

const UpdateReview = ({review}) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

    const [star, setStar] = useState(review.star)
    const [comment, setComment] = useState(review.review)
    const [errors, setErrors] = useState([]);

    const payload = {
        star,
        review: comment
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = [];
        if (comment.length > 254) errors.push('Review must be less than 255 characters.')
        if (comment.trim().length === 0) errors.push('Review should not contain only spaces.')
        setErrors(errors)
        if (errors.length) return;

        return await dispatch(updateReview(review.id, payload))
        .then(() => {
            setStar(star)
            setComment(comment)
            setShowModal(false)
        })
    }

    return (
        <div>
             <button onClick={()=> setShowModal(true)} className="change-review-btn" title='Edit Review'><i className="fa-solid fa-pen"></i></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="update-listing-container">
                    <form className="update-listing-form" onSubmit={handleSubmit}>
                            <h4>Edit Review</h4>
                            <ul className='error-ul'>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                            <div className="update-listing-input">
                                <div>
                                    <label htmlFor='star'>Star &nbsp;<span style={{color: 'red'}}>*</span></label>
                                </div>
                                <input required
                                    type="number" min='1' max='5'
                                    onChange={(e) => setStar(e.target.value)}
                                    value={star}
                                    placeholder={review.star}>
                                </input>
                            </div>
                            <div className="update-listing-input">
                                <div>
                                    <label htmlFor='comment'>Review&nbsp;<span style={{color: 'red'}}>*</span></label>
                                </div>
                                <textarea required
                                    type="text"
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                    placeholder={review.review}
                                    style={{resize: 'none'}}>
                                </textarea>
                            </div>

                            <div id='submit-update-btn-container'>
                                <button id='submit-update-btn' type="submit" className="change-product-button">Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default UpdateReview;
