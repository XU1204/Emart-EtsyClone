import { useSelector } from "react-redux";
import Product from "../Product/Product";

function Homepage() {
    const user = useSelector(state => Object.values(state.session)[0])
    let hello
    if (!user) {
        hello = (
            <h1>Holiday magic starts with these merry finds.</h1>
        )
    } else {
        hello = (
            <h1>Welcome back, {user.username}!</h1>
        )
    }

    return (
        <div>
            {hello}
            <h2>Popular products right now</h2>
            <Product />
        </div>
    )
}

export default Homepage;
