import React,{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { heart, compare, search } from '../Icons/Icons';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ products }) => {
  const navigate = useNavigate();

  const handleRedirect = (productId) => {
    navigate(`/shop-details/${productId}`);
  };

  return (
    <>
      {products && products.length > 0 ? (
        products.map((product, index) => (
          <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
            <div className="product__item">
              <div
                className="product__item__pic set-bg"
                style={{ backgroundImage: `url(${product.images[0]})`, cursor: 'pointer' }}
                onClick={() => handleRedirect(product._id)}
              >
                <ul className="product__hover">
                  <li>
                    <a href="#">
                      <img src={heart} alt="heart icon" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={compare} alt="compare icon" /> <span>Compare</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={search} alt="search icon" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="product__item__text">
                <h6>{product.name}</h6>
                <a href="#" className="add-cart">
                  + Add To Cart
                </a>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <i className={`fa ${i < product.rating ? 'fa-star' : 'fa-star-o'}`} key={i}></i>
                  ))}
                </div>
                <h5>{product.price} DT</h5>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </>
  );
};

ProductItem.defaultProps = {
  products: [],
};

ProductItem.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ),
};

export default ProductItem;
