import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png'
import './Header.css';

const Header = () => {
    const [logInUser, setLogInUser] = useContext(userContext)
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order review</Link>
                <Link to="/inventory">Management Inventory</Link>
                <button onClick={() =>setLogInUser({})}>Sing Out</button>
                </nav>
        </div>
    );
};

export default Header;