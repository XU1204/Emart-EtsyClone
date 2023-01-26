const LOAD = 'images/LOAD';
const ADD = "images/ADD";
const UPDATE = 'images/UPDATE'

const getAll = (images, productId) => ({
    type: LOAD,
    images,
    productId,
});

const addImage = (image, productId) => ({
    type: ADD,
    image,
    productId,
});

const updateImage = (image) => ({
  type: UPDATE,
  image
})


// thunk
// get all images of a specific product
export const getImgsByProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/images`);
    if (response.ok) {
      const images = await response.json();
      dispatch(getAll(images.images, productId));
    }
  };

// add images of product
export const addProductImage = (productId, image) => async (dispatch) => {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(`/api/products/${productId}/images`, {
      method: "POST",
      body: formData,
    });

    // console.log("response", response);
    if (response.ok) {
      const new_img = await response.json();
      await dispatch(addImage(new_img, productId));
      return new_img;
    }
  };

// update preview image of product
export const updateProductImage = (productId, image) => async dispatch => {
  const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(`/api/products/${productId}/images`, {
      method: "PUT",
      body: formData,
    });

    // console.log("response", response);
    if (response.ok) {
      const updated_img = await response.json();
      await dispatch(updateImage(updated_img));
      return updated_img;
    }
}

// Reducer
export default function imageReducer(state = {}, action) {
    switch(action.type) {
        case LOAD:
            let newState = {...state};
            action.images.forEach(image => {newState[image.id] = image});
            return newState;
        case ADD:
            return {...state,
                    [action.image.id]: action.image
                };
        case UPDATE:
          return {...state,
                  [action.image.id]: action.image
                }
        default:
            return state
    }
}
