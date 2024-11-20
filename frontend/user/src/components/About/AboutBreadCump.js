import React from 'react';
import { Link } from 'react-router-dom';


const AboutBreadcrumb = () => (
    <section className="breadcrumb-option">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb__text">
              <h4>About Us</h4>
              <div className="breadcrumb__links">
                <Link style={{textDecoration: 'none'}} to="/">Home</Link>
                <span>About Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
);

export default AboutBreadcrumb;