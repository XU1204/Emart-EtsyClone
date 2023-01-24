const ADD = "images/ADD";

const addImage = (image, productId) => ({
    type: ADD,
    image,
    productId,
  });


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
      await dispatch(addImage(new_img.new_img, productId));
      return new_img;
    }
  };


  // Reducer
export default function imageReducer(state = {}, action) {
    switch(action.type) {
        case ADD:
            return {...state,
                    [action.image.id]: action.image
                };
        default:
            return state
    }
}
