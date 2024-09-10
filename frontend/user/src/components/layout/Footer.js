import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';
import footerLogo from '../../assets/img/logo.png';
import payment from '../../assets/img/payment.png';

const Footer = () => {
  return (
    <footer className="footer">
        <div class="container">
          <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div className="footer__about">
              <div className="footer__logo">
                <a href="./"><img src={footerLogo} alt="Footer Logo" style={{width:'100px'}}/></a>
              </div>
              <p>
                The customer is at the heart of our unique business model, which includes design.
              </p>
              <a href="#"><img src={payment} alt="Payment Methods" /></a>
            </div>
          </div>
          <div class="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
            <div className="footer__widget">
              <h6>Shopping</h6>
              <ul>
                <li><a href="#">Clothing Store</a></li>
                <li><a href="#">Trending Shoes</a></li>
                <li><a href="#">Accessories</a></li>
                <li><a href="#">Sale</a></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-6">
          <div className="footer__widget">
              <h6>Customer Service</h6>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Payment Methods</a></li>
                <li><a href="#">Delivery</a></li>
                <li><a href="#">Return & Exchanges</a></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
          <div className="footer__widget">
              <h6>Newsletter</h6>
              <div className="footer__newslatter">
                <p>Be the first to know about new arrivals, look books, sales & promos!</p>
                <Form action="#">
                  <Form.Control type="email" placeholder="Your email" />
                  <Button type="submit" variant="primary">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
        <div class="col-lg-12 text-center">
        <div className="footer__copyright__text">
              <p>
                Copyright ©
                <script>
                  document.write(new Date().getFullYear());
                </script> 2020
                All rights reserved | This template is made with <FontAwesomeIcon icon={faHeart} aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
