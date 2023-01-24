const LOAD = 'images/LOAD'

const ADD = "images/ADD";

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


// thunk
// get all images of a specific product
export const getImgsByProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/images`);
    if (response.ok) {
      const images = await response.json();
      // console.log("images in thunk", images);
      dispatch(getAll(images.images, productId));
    }
  };

// add images of product
export const addProductImage = (productId, image) => async (dispatch) => {
    const formData = new FormData();
    // console.log("formdata--------", formData);
    formData.append("image", image);

    // console.log("image-----", image);
    // console.log("formdata--------", formData);
    const response = await fetch(`/api/products/${productId}/images`, {
      method: "POST",
      body: formData,
    });

    // console.log("response", response);
    if (response.ok) {
      const new_img = await response.json();
      console.log("new img int hunk++++++++", new_img);
      await dispatch(addImage(new_img, productId));
      return new_img;
    }
  };


// Reducer
export default function imageReducer(state = {}, action) {
    switch(action.type) {
        case LOAD:
            newState = {...state};
            action.images.forEach(image => {newState[image.id] = image});
            return newState;
        case ADD:
            return {...state,
                    [action.image.id]: action.image
                };
        default:
            return state
    }
}
