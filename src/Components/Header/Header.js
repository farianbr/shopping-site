import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'
import avatar from '../../images/avatar.png'
import noAvatar from '../../images/no-avatar.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

    const {currentUser, logOut, totalCartLength} = useContext(AuthContext)
    
    console.log(currentUser);

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div className='nav-links'>
                <Link to="/shop">Shop</Link>
                <span className='text-white ms-2'><FontAwesomeIcon icon={faCartShopping} style={{color: "#ffffff",}} /><sup className='ms-1'>{totalCartLength}</sup></span>    
                <Link to="/orders">Order Review</Link>    
                <Link to="/payment">Payment</Link>  
                
                {!currentUser && <Link to="/register">Register</Link>}  
                <div className='ms-5 pe-2 border rounded avatar-container'>
                    {currentUser? <img className='img-avatar' alt='' src={avatar}></img> : <img className='img-avatar' alt='' src={noAvatar}></img>}
                    <span className='ms-2 text-white'>{currentUser?.email}</span>
                    {currentUser ? <button onClick={logOut} className='p-0 px-3 ms-2 btn btn-danger'>Log out</button>:<Link to="/login">Log in</Link>  }
                </div>
                
                
            </div>
        </nav>
    );
};

export default Header;