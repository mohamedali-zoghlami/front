
import './App.css';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import Login from './Pages/login'
import SignupForm from './Pages/signup';
import Cart from './Components/cart/cart';
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import AdminProduct from './Admin/AdminProduct';
import AdminManageProduct from './Admin/AdminManageProduct';
import ManageUsers from './Admin/ManageUsers';

export default function App() {
  return(
    <Provider store={store}>
    <BrowserRouter>
    <div className='top'>
      <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path='/signup' element={<SignupForm/>}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path="/admin/products/:page?" element={< AdminProduct/>}/>
          <Route path="/admin/add/:name?" element={< AdminManageProduct/>}/>
          <Route path="/admin/users/:page?" element={<ManageUsers/>}/>
          <Route path="/:page?" element={<Home />}/>
          
      </Routes>
      </div>
    </BrowserRouter>
    </Provider>
    );
}
