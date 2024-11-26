import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { heart, compare, search } from '../Icons/Icons';
import { useNavigate } from 'react-router-dom';
import { checkProductStock } from '../Api/productApi';  // Import the stock check API

const ProductItem = ({ products, onAddToCart }) => {
  const navigate = useNavigate();
  const [stockStatus, setStockStatus] = useState({});  // State to store stock status

  const handleRedirect = (productId) => {
    navigate(`/shop-details/${productId}`);
  };

  // Function to check stock for each product
  const checkStock = async (productId) => {
    const data = await checkProductStock(productId);
    setStockStatus((prevState) => ({
      ...prevState,
      [productId]: data.inStock,  // Store the stock status for the specific product
    }));
  };

  useEffect(() => {
    // Call checkStock for each product when products are available
    products.forEach((product) => {
      checkStock(product._id);
    });
  }, [products]);  // Re-run when products change

  const handleAddToCart = (product) => {
    if (stockStatus[product._id]) {
      onAddToCart(product);  // Call the parent function to add the product to the cart
    } else {
      alert('This product is out of stock.');
    }
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
                {/* Display stock status */}
                <p style={{ color: stockStatus[product._id] ? 'green' : 'red' }}>
                  {stockStatus[product._id] ? 'In Stock' : 'Out of Stock'}
                </p>
                <a
                  href="#"
                  className="add-cart"
                  onClick={() => handleAddToCart(product)}
                >
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
  onAddToCart: PropTypes.func.isRequired,  // New prop for adding to the cart
};

export default ProductItem;
