import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { updateProduct } from '../../store/product';
import { updateProductImage } from '../../store/image'
import './createUpdateProduct.css'
import { useHistory } from 'react-router-dom';

function UpdateProduct ({product} ) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [avalibility, setAvalibility] = useState(product.avalibility)
    const [categoryId, setCategoryId] = useState(product.categoryId)
    const [price, setPrice] = useState(product.price)
    const [previewImage, setPreviewImage] = useState('none')
    const [errors, setErrors] = useState([]);

    // const user = useSelector(state => Object.values(state.session)[0])

    const payload = {
        name,
        description,
        avalibility,
        categoryId,
        price,
        // previewImage,
        // sellerId: user.id
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = []
        if (price <= 0) errors.push('Price nust be greater than 0.');
        // if (!previewImage.startsWith('http://') && !previewImage.startsWith('https://')) errors.push('Preview image url must starts with "http://" or "https://".');
        if (description.length > 254) errors.push('Description must be less than 255 characters.')
        if (name.length > 254) errors.push('Name must be less than 255 characters.')
        if (description.trim().length === 0) errors.push('Description should not contain only spaces.')
        if (name.trim().length === 0) errors.push('Name should not contain only spaces.')
        // let imgEnd = ['.jpg', '.jpeg', '.png', '.pdf', '.gif', '.svg']
        // let count = 0
        // for (let i = 0; i < 6; i++) {
        //     if (previewImage.includes(imgEnd[i])) count++
        // }
        // if (count === 0) errors.push("Preview Image Url should contain '.jpg', '.jpeg', '.png', '.pdf', '.gif' or '.svg'.")

        setErrors(errors)

        if (errors.length) return;

        const updatedListing = await dispatch(updateProduct(product.id, payload))
        if (updatedListing) {
            return dispatch(updateProductImage(product.id, previewImage))
            .then(() => {
                setAvalibility(avalibility)
                setName(name)
                setDescription(description)
                setCategoryId(categoryId)
                setPrice(price)
                setPreviewImage('none')
                setShowModal(false)
                history.push('/products/current')
            })
        }

    }

    const updateImage = (e) => {
        const file = e.target.files[0];

        setPreviewImage(file);

        const image = document.getElementById("preview-img");
        image.src = URL.createObjectURL(file);

    };


    return (
        <>
            <button onClick={()=> setShowModal(true)} className="change-product-button"><i className="fa-solid fa-pen"></i></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="update-listing-container">
                   <form className="update-listing-form" onSubmit={handleSubmit}>
                        <h4>Edit listing</h4>
                        <ul className='error-ul'>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>

                        <div className="update-listing-input">
                            <div>
                                <label htmlFor='name'>Title{' '}<span style={{color: 'red'}}>*</span></label>
                            </div>
                            <textarea required
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                placeholder="Title"
                                style={{resize: 'none'}}>
                            </textarea>
                        </div>

                        <div className="update-listing-input">
                            <div>
                                <label htmlFor='description'>Description{' '}<span style={{color: 'red'}}>*</span></label>
                            </div>
                            <textarea required
                                type="text"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                placeholder="Description"
                                style={{resize: 'none'}}>
                            </textarea>
                        </div>

                        <div className="update-listing-input">
                            <div>
                                <label htmlFor='avalibility'>Avalibility{' '}<span style={{color: 'red'}}>*</span></label>
                            </div>
                            <input required
                                type="number" min='1'
                                onChange={(e) => setAvalibility(e.target.value)}
                                value={avalibility}
                                placeholder="Avalibility"></input>
                        </div>

                        <div className="update-listing-input">
                            <div>
                                <label htmlFor='price'>Price{' '}<span style={{color: 'red'}}>*</span></label>
                            </div>
                            <input required
                                type="number" min='0' step="0.01"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                placeholder="Price"></input>
                        </div>

                        <div className="update-listing-input">
                            <div>
                                <label htmlFor='categoryId'>Category{' '}<span style={{color: 'red'}}>*</span></label>
                            </div>
                            <select
                                name='categoryId'
                                onChange={(e) => setCategoryId(e.target.value)}
                                value={categoryId}
                            >
                                <option value='' disabled>
                                    Select a Category...
                                </option>
                                <option value='1'>Jewelry & Accessories</option>
                                <option value='2'>Clothing & Shoes</option>
                                <option value='3'>Home & Living</option>
                                <option value='4'>Toys & Entertainment</option>
                                <option value='5'>Art & Collectibles</option>
                            </select>
                        </div>

                        <div className="update-listing-input">
                            <div>
                                <label htmlFor='previewImage'>Preview Image{' '}<span style={{color: 'red'}}>*</span></label>
                            </div>
                            {/* <input
                                id='update-image-url-input'
                                type="url"
                                onChange={(e) => setPreviewImage(e.target.value)}
                                value={previewImage}
                                placeholder="Please enter a valid image address, for example: https://example.png">
                            </input> */}
                             <div className='preview-img-container'>
                                <img
                                    id="preview-img"
                                    alt="preview image"
                                    src={product.images[0].url}
                                    // className={`${
                                    // previewImage ? "cs-preview-img" : "no-preview-img"
                                    // }`}
                                    hidden={previewImage ? false : true}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={updateImage}
                                />
                            </div>
                        </div>

                        <div id='submit-update-btn-container'>
                            <button id='submit-update-btn' type="submit" className="change-product-button">Submit</button>
                        </div>
                    </form>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default UpdateProduct;
