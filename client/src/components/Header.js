import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import logo from '../images/logo_small.png';

function Header() {
    return (
        <div>
            <nav>
          <ul>
            <li id="logo">
              <Link to="/">
                <img className='animated-border-logo' src={logo} alt="logo"/>
                </Link>
            </li>
            
            {/* <li id="logo"><Link to='/'><img src={logo} alt="logo"/></Link></li> */}
            <li id='transactions'>
              <Link to="/transactions"><p className="hover-underline-animation">My transactions</p></Link>
            </li>
          </ul>
        </nav>
        </div>
    )
}

export default Header
