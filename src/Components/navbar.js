import React, { useState } from 'react';
import './navbar.css'
import { Link, useNavigate, } from 'react-router-dom';
import {  FaHistory,FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { removeAll } from '../store/cartSlice';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

export default function NavBar({}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleLogOut=()=>
  {
    dispatch(removeAll());
    localStorage.removeItem("token");
    localStorage.removeItem("admin")
    navigate("/login");
  }
  const handleClick= async ()=>
  {
    navigate("/history")
  }
  return (
  <nav class="navbar">
  <ul class="navbar-menu navbar-brand ">
    <li><Link to="/">E-Buy</Link></li>
    
      <div className="navbar-icons">
        <button onClick={handleClick}>
          <Link>
          <FaHistory />
        </Link>
                </button>
        <button>
        <Link to="/cart">
          <FaShoppingCart />
        </Link>
        </button>

        <button onClick={handleLogOut}>
          <FaSignOutAlt />
        </button>
      
          
      </div>
  </ul>
</nav>);
}
