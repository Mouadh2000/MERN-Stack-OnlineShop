import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/logo.png';
import heart from '../../assets/img/icon/heart.png';
import cart from '../../assets/img/icon/cart.png';
import { Form, FormControl } from 'react-bootstrap'; 

const Header = () => {
  const location = useLocation(); 
  const [fix, setFix] = useState(false);

  const setFixed = () => {
    if (window.scrollY >= 1) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", setFixed);
    return () => {
      window.removeEventListener("scroll", setFixed);
    };
  }, []);

  const headerStyle = {
    width: '100%',
    background: 'white',
    zIndex: 1000,
    transition: 'all 0.3s ease',
    ...(fix && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    }),
  };

  return (
    <>
      {/* Header Section Begin */}
      <header className="header" style={headerStyle}>
        <div className="container" style={{height: '90px'}}>
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="header__logo">
                <Link to="./">
                  <img src={logo} alt="Logo" style={{ width: '150px', height: '150px' , marginTop: '-30px'}} />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <nav className="header__menu mobile-menu">
                <ul style={{ marginLeft: '-350px' }}>
                  <li className={location.pathname === './' ? 'active' : ''}>
                    <Link to="./" className="nav-link">Home</Link>
                  </li>
                  <li className={location.pathname === './shop' ? 'active' : ''}>
                    <Link to="./shop" className="nav-link">Shop</Link>
                  </li>
                  <li className={location.pathname === './about' ? 'active' : ''}>
                    <Link to="./about" className="nav-link">About</Link>
                  </li>
                  <li className={location.pathname === './contact' ? 'active' : ''}>
                    <Link to="./contact" className="nav-link">Contacts</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="header__nav__option" style={{ marginLeft: '-140px', display: 'flex' }}>
                {/* Replacing the search button with a search input and icon */}
                <div className="search-container">
                  <Form inline className="search-form">
                    <FormControl type="text" placeholder="Search" className="search-input" />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  </Form>
                </div>
                <Link to="#">
                  <img src={heart} alt="Heart Icon" />
                </Link>
                <Link to="/cart">
                  <img src={cart} alt="Cart Icon" />
                  <span>0</span>
                </Link>
                <div className="price">$0.00</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Header Section End */}
    </>
  );
};

export default Header;
