import React from 'react';
import { Link } from 'react-router-dom';


const Breadcrumb = () => (
    <section className="breadcrumb-option">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb__text">
              <h4>Shop</h4>
              <div className="breadcrumb__links">
                <Link style={{textDecoration: 'none'}} to="/home">Home</Link>
                <span>Shop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
);

export default Breadcrumb;