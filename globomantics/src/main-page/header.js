import React from 'react';
import { Link } from 'react-router-dom';
import logo from './GloboLogo.png';

const Header = (props) => (

    <header className="row">
        <div className="col-md-5">
            <Link to='/'>
                <img src={logo} className="logo" alt="logo" />
            </Link>
        </div>
        <div className="col-md-7 mt-5 subtitle">
            {props.subtitle}
        </div>
    </header>

);

export default Header;
