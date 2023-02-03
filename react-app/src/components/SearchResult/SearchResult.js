import { useEffect, useState } from "react"
import { useParams, useHistory, NavLink } from "react-router-dom"
import Star from "../Review/Star";
import styles from '../Review/review.module.css'


const SearchResult = () => {

    const { keyword } = useParams()
    const history = useHistory()
    const [items, setItems] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch(`/api/products/search/${keyword}`)
            .then(res => {
                if(res.ok) return res.json()
                throw new Error()
            })
            .then(res => {setItems(Object.values(res.Products))})
            .catch(() => history.push('/'))
            .finally(() => setIsLoaded(true))
    }, [keyword])

    return (
        isLoaded &&
            <div style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>
                <h1 style={{marginLeft: '13vw', marginTop: '5vh'}}>
                    Search results with "{keyword}"
                </h1>
                {!!items.length ?
                        <div id='popular-product-wrapper'>
                        <div className="display-product-wrapper">
                            <div className="display-product-container">
                                {items.map(product => (
                                    <div key={product.id} className='each-product-container'>
                                        <NavLink key={product.id} to={`/products/${product.id}`} style={{ color: 'black', textDecoration: 'none'}}>
                                        <img className="hp-product-img" src={product.images[0]?.url} alt={product.name}
                                            onError={e => { e.currentTarget.src = "https://media.istockphoto.com/id/897730230/vector/hands-holding-a-gift-box-birthday-anniversary-celebration-pov-flat-editable-vector.jpg?s=612x612&w=0&k=20&c=CHFebwU2TcxGscBx7ObcM4LGciCFWBIQA2poO-izIcs="}}></img>
                                        <div className="product-details">
                                            <p className="product-name">{product.name}</p>
                                            <p className="star"><Star rating={product.productRating} />({product.totalReviews})</p>
                                        </div>
                                        <p id='my-lst-price'>${Number(product.price).toFixed(2)}</p>
                                        </NavLink>
                                    </div>
                                ))}
                            </div>
                        </div>
                        </div>
                            :
                            <div className={styles.last} style={{marginTop: '10vh'}}>
                                <h2>No items found!</h2>
                                <NavLink to='' id={styles.discover}>
                                    <p>Discover something unique from homepage!</p>
                                </NavLink>
                            </div>
                        }
                    </div> 
    )
}

export default SearchResult
