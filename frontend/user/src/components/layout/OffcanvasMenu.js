import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OffcanvasMenu = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Offcanvas Menu Begin */}
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7">
                <div className="header__top__left">
                  <p>Anime Shop</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-5">
                <div className="header__top__right">
                  <div className="header__top__links">
                    {isLoggedIn ? (
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <span 
                          onClick={() => setMenuOpen(!isMenuOpen)}
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'white' }}
                        >
                          Profile <i className="arrow_carrot-down" style={{ marginLeft: '5px', color: 'white'}}></i>
                        </span>
                        {isMenuOpen && (
                          <ul style={{ 
                            display: 'block', 
                            position: 'absolute', 
                            backgroundColor: '#fff', 
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                            margin: '0', 
                            padding: '0', 
                            listStyle: 'none', 
                            zIndex: '1' 
                          }}>
                            <li style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                              <Link to="/profile" style={{ textDecoration: 'none', color: '#333' }}>Profile</Link>
                            </li>
                            <li 
                              onClick={handleLogout} 
                              style={{ padding: '10px', cursor: 'pointer', color: '#d9534f' }}
                            >
                              Logout
                            </li>
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link to="/sign-in">Sign in</Link>
                    )}
                    <Link style={{marginLeft: '8px'}} to="#">FAQs</Link>
                  </div>
                  <div className="header__top__hover">
                    <span>USD <i className="arrow_carrot-down"></i></span>
                    <ul>
                      <li>USD</li>
                      <li>EUR</li>
                      <li>USD</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Offcanvas Menu End */}
    </>
  );
};

export default OffcanvasMenu;
