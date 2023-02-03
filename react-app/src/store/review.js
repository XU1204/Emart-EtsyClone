// constants
const LOAD = 'reviews/GET'
const CREATE = 'reviews/CREATE'
const UPDATE = 'reviews/UPDATE'
const REMOVE = 'reviews/REMOVE'

// action creators
const load = (reviews) => ({
    type: LOAD,
    reviews
})

const create = (review) => ({
    type: CREATE,
    review
})

const update = (review) => ({
    type: UPDATE,
    review
})

const remove = (reviewId) => ({
    type: REMOVE,
    reviewId
})

// thunk
// get reviews of current user
export const getReviewsOfCurrent = () => async dispatch => {
    const response = await fetch(`/api/reviews/current`);
    console.log('11111111111111', response)
    if (response.ok) {
        const reviews = await response.json();
        // products.Products returns an array
        dispatch(load(reviews.Reviews))
    }
};

// get reviews of a product
export const getReviewsOfProduct = (productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        // products.Products returns an array
        dispatch(load(reviews.Reviews))
    }
}

// create a review
export const createReview = (productId, payload) => async dispatch => {
    const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const review = await response.json();
        dispatch(create(review));
        return review;
    }
    else {
        const data = await response.json()
        return data
    }
}

//  update a review of a product
export const updateReview= (reviewId, payload) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        console.log('it is working 2222222')
        const review  = await response.json();
        dispatch(update(review));
        return review
    }
    else {
        const data = await response.json()
        if(data.errors){
            return data
        }
    }
}

// delete a review
export const removeReview = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(remove(reviewId))
    }
}


// reducer
export default function reviewReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case LOAD:
            newState = {};
            action.reviews.forEach(review => {newState[review.id] = review});
            return newState;
        case CREATE:
            return Object.assign({...state}, {[action.review.id]: action.review})
        case UPDATE:
            return Object.assign({...state}, {[action.review.id]: action.review})
        case REMOVE:
            newState = {...state};
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
  }
