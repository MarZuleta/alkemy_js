import React from 'react';
import {Link} from 'react-router-dom';
import Styles from './Header.css'

function Header() {
    return (
        <div>
            <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li id='transactions'>
              <Link to="/transactions">Transactions</Link>
            </li>
          </ul>
        </nav>
        </div>
    )
}

export default Header
