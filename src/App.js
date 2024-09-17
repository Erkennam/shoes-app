import React from 'react';
import './App.css';
import Main from './mainPages/main.tsx';
import ProductPage from './mainPages/product-page.tsx';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dark from './mainPages/dark.tsx';
import CartPage from './cart/cartpage.tsx';
import Favorites from './mainPages/favorites.tsx';
import ProductsPage from './mainPages/productsPage.tsx';
import RegistrationPage from './auth/registrationPage.tsx';
import LoginPage from './auth/loginPage.tsx';
import ProfilePage from './auth/profile-page.tsx';
import CollectionPage from './category/collection-page.tsx';
import Delivery from './delivery/delivery.tsx';
import Payement from './delivery/payement.tsx';
import Succesfull from './delivery/succesfull.tsx';

function App() {
  const {dark} = useSelector((state)=> state.slice);
  return (
    <BrowserRouter>
      <div className="overflow-hidden pb-5">
        {dark && <Dark></Dark>}
        <Routes>
          <Route path='/' element={<Main></Main>}></Route>
          <Route path='/product-page/:product_id' element={<ProductPage></ProductPage>}></Route>
          <Route path='/cart' element={<CartPage></CartPage>}></Route>
          <Route path='/favorites' element={<Favorites></Favorites>}></Route>
          <Route path='/products-page' element={<ProductsPage></ProductsPage>}></Route>
          <Route path='/login-page' element={<LoginPage></LoginPage>}></Route>
          <Route path='/registration-page' element={<RegistrationPage></RegistrationPage>}></Route>
          <Route path='/profile-page' element={<ProfilePage></ProfilePage>}></Route>
          <Route path='/collection-page/:collection' element={<CollectionPage></CollectionPage>}></Route>
          <Route path='/delivery' element={<Delivery></Delivery>}></Route>
          <Route path='/payement' element={<Payement></Payement>}></Route>
          <Route path='/success' element={<Succesfull></Succesfull>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
