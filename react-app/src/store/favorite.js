// constants
const LOAD = 'favorites/GET'
const CREATE = 'favorites/CREATE'
const REMOVE = 'favorites/REMOVE'


// action creators
const load = (favorites) => ({
    type: LOAD,
    favorites
})

const create = (favorite) => ({
    type: CREATE,
    favorite
})

const remove = (favoriteId) => ({
    type: REMOVE,
    favoriteId
})


// thunk
// get all favorites of current user
export const getFavoritsofCurrent = () => async dispatch => {
    const response = await fetch(`/api/favorites`);
    if (response.ok) {
        const favorites = await response.json();
        dispatch(load(favorites.Favorites))
    }
};

// add an item to current user's favorite list
export const createFavorite = (payload) => async dispatch => {
    const response = await fetch(`/api/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const favorite = await response.json();
        dispatch(create(favorite));
        return favorite
    }
    else {
        const data = await response.json()
        return data
    }
}

// delete a favorite
export const removeFavorite = (favoriteId) => async dispatch => {
    const response = await fetch(`/api/favorites/${favoriteId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(remove(favoriteId))
    }
    else {
        const data = await response.json()
        return data;
    }
}

// Reducer
export default function favoriteReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case LOAD:
            newState = {};
            action.favorites.forEach(favorite => {newState[favorite.id] = favorite});
            return newState;
        case CREATE:
            return Object.assign({...state}, {[action.favorite.id]: action.favorite})
        case REMOVE:
            newState = {...state};
            delete newState[action.favoriteId];
            return newState;
        default:
            return state;
    }
}
