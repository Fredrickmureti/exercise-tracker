// src/Components/Navbar.jsx
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';


const Header = () => {


  return (
      <nav className='navbar' >
        <ul className='nav-list'>
          <li className='nav-item'><Link to="/">Home</Link></li>
          <li className='nav-item'><Link to="/register">Signup</Link></li>
          <li className='nav-item'><Link to="/login">Login</Link></li>
        </ul>
      </nav>

  )
}


export default Header;
