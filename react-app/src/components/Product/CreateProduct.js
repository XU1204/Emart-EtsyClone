import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { createProduct } from '../../store/product';
import './createUpdateProduct.css'

function CreateProduct ( ) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

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
        if (name.length > 254) errors.push('Name must be less than 255 characters.')
        if (description.trim().length === 0) errors.push('Description should not contain only spaces.')
        if (name.trim().length === 0) errors.push('Name should not contain only spaces.')
        setErrors(errors)

        return dispatch(createProduct(payload))
        .catch(async (res) => {
        const data = await res.json();
        if (data && typeof data.errors === 'object') {
            setErrors(Object.values(data.errors))
        }
        if (data && (data.errors || data.message)) setErrors([data.errors? data.errors : data.message])
        else {
            setShowModal(false)
            setAvalibility(1)
            setName('')
            setDescription('')
            setCategoryId(1)
            setPrice(0)
            setPreviewImage('')
        }
        });
    }

    return (
        <>
            <button onClick={()=> setShowModal(true)} className="change-product-button"><i class="fa-solid fa-plus"></i> Add new product</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="create-product-container">
                    <form className="create-product" onSubmit={handleSubmit}>
                        <h4>Create a new product</h4>
                        <ul className='error-ul'>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <div className="product-form-input">Name</div>
                        <textarea required
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Name"
                            style={{resize: 'none'}}>
                        </textarea>
                        <div className="product-form-input">Description</div>
                        <textarea required
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            placeholder="Description"
                            style={{resize: 'none'}}>
                        </textarea>
                        <div className="product-form-input">Avalibility</div>
                        <input required
                            type="number" min='1'
                            onChange={(e) => setAvalibility(e.target.value)}
                            value={avalibility}
                            placeholder="Avalibility"></input>
                        <div className="product-form-input">Price</div>
                        <input required
                            type="number" min='0' step="0.01"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            placeholder="Price"></input>

                        <div className="product-form-input">Category</div>
                        <select
                            name='categoryId'
                            onChange={(e) => setCategoryId(e.target.value)}
                            value={categoryId}
                        >
                            <option value='' >
                                Select a Category...
                            </option>
                            <option value='1'>Jewelry & Accessories</option>
                            <option value='2'>Clothing & Shoes</option>
                            <option value='3'>Home & Living</option>
                            <option value='4'>Toys & Entertainment</option>
                            <option value='5'>Art & Collectibles</option>
                        </select>

                        <div className="product-form-input">Preview Image</div>
                        <textarea
                            type="text"
                            onChange={(e) => setPreviewImage(e.target.value)}
                            value={previewImage}
                            placeholder="Preview Image Address"
                            style={{resize: 'none'}}>
                        </textarea>
                        <div>
                            <button type="submit" className="change-product-button">Submit</button>
                        </div>
                    </form>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default CreateProduct;
