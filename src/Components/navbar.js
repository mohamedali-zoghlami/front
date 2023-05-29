import React, { useState } from 'react';
import './navbar.css'
import { Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';

export default function NavBar() {
    const [cartCount, setCartCount] = useState(0);
  return <nav class="navbar">
  <ul class="navbar-menu navbar-brand ">
    <li><Link to="/">E-Buy</Link></li>
    <div className="search-bar">
        <input type="text" placeholder="Search" onChange={handleSearch} />
        <button> <i className="fa fa-search">Search</i></button>
      </div>
      <div className="navbar-icons">
        <button>
          <FaUserCircle />
        </button>
        <button>
          <FaShoppingCart />
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </button>
      </div>
  </ul>
</nav>;
}

const handleSearch = (event) => {
    // Handle search logic here
    const searchTerm = event.target.value;
    console.log('Search term:', searchTerm);
  };