// constants
const LOAD = 'carts/GET'
const CREATE = 'carts/CREATE'
const UPDATE = 'carts/UPDATE'
const REMOVE = 'carts/REMOVE'

// action creators
const load = (carts) => ({
    type: LOAD,
    carts
})

const create = (cart) => ({
    type: CREATE,
    cart
})

const update = (cart) => ({
    type: UPDATE,
    cart
})

const remove = (cartId) => ({
    type: REMOVE,
    cartId
})

// thunk
// get all carts
export const getCarts = () => async dispatch => {
    const response = await fetch(`/api/carts`);
    if (response.ok) {
        const carts = await response.json();
        dispatch(load(carts.Carts))
    }
};

// add an item to current user's shopping cart
export const createCart = (payload) => async dispatch => {
    const response = await fetch(`/api/carts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const cart= await response.json();
        dispatch(create(cart));
        return cart
    }
    else {
        const data = await response.json()
        return data
    }
}

// update info of cart
export const updateCart = (cartId, payload) => async dispatch => {
    const response = await fetch(`/api/carts/${cartId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const cart= await response.json();
        dispatch(update(cart));
        return cart
    }
    else {
        const data = await response.json()
        if(data.errors){
            return data
        }
    }
}

// delete a cart
export const removeCart = (cartId) => async dispatch => {
    const response = await fetch(`/api/products/${cartId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(remove(cartId))
    }
}


// Reducer
export default function cartReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case LOAD:
            newState = {};
            action.carts.forEach(cart => {newState[cart.id] = cart});
            return newState;
        case CREATE:
            return Object.assign({...state}, {[action.cart.id]: action.cart})
        case UPDATE:
            return Object.assign({...state}, {[action.cart.id]: action.cart})
        case REMOVE:
            newState = {...state};
            delete newState[action.cartId];
            return newState;
        default:
        return state;
    }
  }
