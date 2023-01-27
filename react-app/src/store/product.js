// constants
const LOAD = 'products/GET'
const CREATE = 'products/CREATE'
const UPDATE = 'products/UPDATE'
const REMOVE = 'products/REMOVE'

// action creators
const load = (products) => ({
    type: LOAD,
    products
})

const create = (product) => ({
    type: CREATE,
    product
})

const update = (product) => ({
    type: UPDATE,
    product
})

const remove = (productId) => ({
    type: REMOVE,
    productId
})


// thunk
// get all prodcuts
export const getProducts = () => async dispatch => {
    const response = await fetch(`/api/products`);
    if (response.ok) {
        const products = await response.json();
        // products.Products returns an array
        dispatch(load(products.Products))
    }
};

// get products of current user
export const getProductsOfCurrent = () => async dispatch => {
    const response = await fetch(`/api/products/current`);
    if (response.ok) {
        const products = await response.json();
        // products.Products returns an array
        dispatch(load(products.Products))
    }
};

// get products of a category
export const getProductsOfCategory = (categoryId) => async dispatch => {
    const response = await fetch(`/api/products/categories/${categoryId}`);
    if (response.ok) {
        const category = await response.json();
        // products.Products returns an array
        dispatch(load(category.products))
    }
}

//create a product
export const createProduct = (payload) => async dispatch => {
    const response = await fetch(`/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const product= await response.json();
        dispatch(create(product));
        return product
    }
    else {
        const data = await response.json()
        // if(data.errors){
        //     return data
        // }
        return data
    }
}


// update info of product
export const updateProduct = (productId, payload) => async dispatch => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const product= await response.json();
        dispatch(update(product));
        return product
    }
    else {
        const data = await response.json()
        if(data.errors){
            return data
        }
    }
}

// delete a product
export const removeProdcut = (productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(remove(productId))
    }
}

// Reducer
export default function productReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case LOAD:
            newState = {};
            action.products.forEach(product => {newState[product.id] = product});
            return newState;
        case CREATE:
            return Object.assign({...state}, {[action.product.id]: action.product})
        case UPDATE:
            return Object.assign({...state}, {[action.product.id]: action.product})
        case REMOVE:
            newState = {...state};
            delete newState[action.productId];
            return newState;
        default:
            return state;
    }
  }
