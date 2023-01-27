import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
// import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Homepage from './components/Homepage/Homepage';
import MyListing from './components/Product/MyLisitng';
import CreateProduct from './components/Product/CreateProduct';
import ProductDetail from './components/Product/ProductDetails';
import MyCart from './components/Cart/Cart';
import CheckoutCart from './components/Cart/CheckoutCart';
import Footer from './components/Footer/Footer';
import Category from './components/Category/Category';
import MyFavorites from './components/Favorite/Favorite';
import './index.css'


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  const PageNotFound= () =>{
    return (
      <div>
          <h1>404 Error</h1>
          <h1>Page Not Found</h1>
      </div>
    )
  }

  return (
      <BrowserRouter>
        <div className='page-container'>
          <NavBar />
          <Switch>
            {/* <Route path='/login' exact={true}>
              <LoginForm />
            </Route> */}
            {/* <Route path='/sign-up' exact={true}>
              <SignUpForm />
            </Route> */}

            <ProtectedRoute path='/users' exact={true} >
              <UsersList/>
            </ProtectedRoute>
            <ProtectedRoute path='/users/:userId' exact={true} >
              <User />
            </ProtectedRoute>
            <ProtectedRoute path='/products/current' exact={true} >
              <MyListing />
            </ProtectedRoute>
            <ProtectedRoute path='/products/new' exact={true} >
              <CreateProduct />
            </ProtectedRoute>
            <Route path='/products/:productId' exact={true} >
              <ProductDetail />
            </Route>
            <ProtectedRoute path='/carts' exact={true} >
              <MyCart />
            </ProtectedRoute>
            <ProtectedRoute path='/carts/checkout' exact={true} >
              <CheckoutCart />
            </ProtectedRoute>
            <ProtectedRoute path='/favorites' exact={true} >
              <MyFavorites />
            </ProtectedRoute>
            <Route path='/products/categories/:categoryId' exact={true} >
              < Category />
            </Route>
            {/* <Route path='/images' exact={true} >
              <UploadPicture />
            </Route> */}
            <Route path='/' exact={true} >
              <Homepage />
            </Route>
            <Route path='/coming-soon' exact={true} >
              <h1 id='coming-soon'>Feature coming soon! <i class="fa-regular fa-face-smile"></i></h1>
            </Route>
            <Route path="*" exact={true} component={PageNotFound} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
