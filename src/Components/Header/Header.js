import React from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'

const Header = () => {

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div className='nav-links'>
                <a href="/shop">Shop</a>
                <a href="/orders">Order Review</a>
                <a href="/inventory">Manage Inventory</a>
                <a href="/login">Login</a>
            </div>
        </nav>
    );
};

export default Header;