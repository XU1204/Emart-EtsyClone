import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createProduct } from '../../store/product';
import './createUpdateProduct.css'
import { useHistory } from 'react-router-dom';

function CreateProduct ( ) {
    // const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [avalibility, setAvalibility] = useState(1)
    const [categoryId, setCategoryId] = useState(1)
    const [price, setPrice] = useState(0)
    const [previewImage, setPreviewImage] = useState("")
    const [errors, setErrors] = useState([]);

    // const user = useSelector(state => Object.values(state.session)[0])

    const payload = {
        name,
        description,
        avalibility,
        categoryId,
        price,
        previewImage,
        // sellerId: user.id
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = []
        if (price <= 0) errors.push('Price nust be greater than 0.');
        if (!previewImage.startsWith('http://') && !previewImage.startsWith('https://')) errors.push('Preview image url must starts with "http://" or "https://".');
        if (description.length > 254) errors.push('Description must be less than 255 characters.')
        if (name.length > 254) errors.push('Title must be less than 255 characters.')
        if (description.trim().length === 0) errors.push('Description should not contain only spaces.')
        if (name.trim().length === 0) errors.push('Title should not contain only spaces.')
        let imgEnd = ['.jpg', '.jpeg', '.png', '.pdf', '.gif', '.svg']
        let count = 0
        for (let i = 0; i < 6; i++) {
            if (previewImage.includes(imgEnd[i])) count++
        }
        if (count === 0) errors.push("Preview Image Url should contain '.jpg', '.jpeg', '.png', '.pdf', '.gif' or '.svg'.")

        setErrors(errors)

        if (errors.length) {
            return;
        }

        // const newProduct = dispatch(createProduct(payload))
        // .catch(async (res) => {
        // const data = await res.json();
        // if (data && typeof data.errors === 'object') {
        //     setErrors(Object.values(data.errors))
        // }
        // else if (data && (data.errors || data.message)) setErrors([data.errors? data.errors : data.message])
        // else if (newProduct) {
        //     console.log('+++++++++++')
        //     setAvalibility(1)
        //     setName('')
        //     setDescription('')
        //     setCategoryId(1)
        //     setPrice(0)
        //     setPreviewImage('')
        //     history.push('/products/current')
        // }
        // });
        return dispatch(createProduct(payload))
        .then(() => {
            setAvalibility(1)
            setName('')
            setDescription('')
            setCategoryId(1)
            setPrice(0)
            setPreviewImage('')
            history.push('/products/current')
        })
    }

    return (
        <div>
            {/* <button className="change-product-button"><i class="fa-solid fa-plus"></i> Add new product</button> */}
            {/* {showModal && (
                <Modal onClose={() => setShowModal(false)}> */}
                    <div className="create-listing-container">
                    <form className="create-listing-form" onSubmit={handleSubmit}>
                        <h4>Listing details</h4>
                        <p>Tell the world all about your item and why they'll love it.</p>
                        <ul className='error-ul'>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>

                        <div className="create-listing-input">
                            <div>
                                <label htmlFor='name'>Title{' '}<span style={{color: 'red'}}>*</span></label>
                                <p>Include keywords that buyers would use to search for your items.</p>
                            </div>
                            <textarea required
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                placeholder="Title"
                                style={{resize: 'none'}}>
                            </textarea>
                        </div>

                        <div className="create-listing-input">
                            <div>
                                <label htmlFor='description'>Description{' '}<span style={{color: 'red'}}>*</span></label>
                                <p>Start with a brief overview that describes your item's great features. Shoppers will only see the first few lines of your description, so make it count!</p>
                            </div>
                            <textarea required
                                type="text"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                placeholder="Description"
                                style={{resize: 'none'}}>
                            </textarea>
                        </div>

                        <div className="create-listing-input">
                            <div>
                                <label htmlFor='avalibility'>Avalibility{' '}<span style={{color: 'red'}}>*</span></label>
                                <p>Please select how many items are in stock.</p>
                            </div>
                            <input required
                                type="number" min='1'
                                onChange={(e) => setAvalibility(e.target.value)}
                                value={avalibility}
                                placeholder="Avalibility"></input>
                        </div>

                        <div className="create-listing-input">
                            <div>
                                <label htmlFor='price'>Price{' '}<span style={{color: 'red'}}>*</span></label>
                                <p>Please input an appropriate listing price.</p>
                            </div>
                            <input required
                                type="number" min='0' step="0.01"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                placeholder="Price"></input>
                        </div>

                        <div className="create-listing-input">
                            <div>
                                <label htmlFor='categoryId'>Category{' '}<span style={{color: 'red'}}>*</span></label>
                                <p>Select the category from dropdown menu which will help more shppers to find it.</p>
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

                        <div className="create-listing-input">
                            <div>
                                <label htmlFor='previewImage'>Preview Image{' '}<span style={{color: 'red'}}>*</span></label>
                                <p>Please enter the url for the product. A good preview image can make your listing more appealing!</p>
                            </div>
                            <input
                                id='image-url-input'
                                type="url"
                                onChange={(e) => setPreviewImage(e.target.value)}
                                value={previewImage}
                                placeholder="Please enter a valid image address, for example: https://example.com">
                            </input>
                        </div>

                        <div id='submit-create-btn-container'>
                            <button id='submit-create-btn' type="submit" className="change-product-button">Submit</button>
                        </div>
                    </form>
                    </div>
                {/* </Modal>
            )} */}
        </div>
    )
}

export default CreateProduct;
