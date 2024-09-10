import React from 'react';
import { heart, compare, search } from '../Icons/Icons';
import { useNavigate } from 'react-router-dom';
import product1 from '../../assets/img/product/product-1.jpg';
import product2 from '../../assets/img/product/product-2.jpg';
import product3 from '../../assets/img/product/product-3.jpg';
import product4 from '../../assets/img/product/product-4.jpg';
import product5 from '../../assets/img/product/product-5.jpg';



const ProductItem = () => {
   const navigate = useNavigate();

   const handleRedirect = () => {
    navigate('/shop-details'); // Redirect to /shop-details
  };

  return(
    <>
    <div className="col-lg-4 col-md-6 col-sm-6">
      <div className="product__item">
        <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${product1})`, cursor: 'pointer' }} onClick={handleRedirect}>
          <ul className="product__hover">
            <li><a href="#"><img src={heart} alt="heart icon" /></a></li>
            <li><a href="#"><img src={compare} alt="compare icon" /> <span>Compare</span></a></li>
            <li><a href="#"><img src={search} alt="search icon" /></a></li>
          </ul>
        </div>
        <div className="product__item__text">
          <h6>Piqué Biker Jacket</h6>
          <a href="#" className="add-cart">+ Add To Cart</a>
          <div className="rating">
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star-o"></i>
          </div>
          <h5>$67.24</h5>
          <div className="product__color__select">
            <label htmlFor="pc-4">
              <input type="radio" id="pc-4" />
            </label>
            <label className="active black" htmlFor="pc-5">
              <input type="radio" id="pc-5" />
            </label>
            <label className="grey" htmlFor="pc-6">
              <input type="radio" id="pc-6" />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-4 col-md-6 col-sm-6">
    <div className="product__item">
      <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${product2})` }}>
        <ul className="product__hover">
          <li><a href="#"><img src={heart} alt="heart icon" /></a></li>
          <li><a href="#"><img src={compare} alt="compare icon" /> <span>Compare</span></a></li>
          <li><a href="#"><img src={search} alt="search icon" /></a></li>
        </ul>
      </div>
      <div className="product__item__text">
        <h6>Piqué Biker Jacket</h6>
        <a href="#" className="add-cart">+ Add To Cart</a>
        <div className="rating">
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
        </div>
        <h5>$67.24</h5>
        <div className="product__color__select">
          <label htmlFor="pc-4">
            <input type="radio" id="pc-4" />
          </label>
          <label className="active black" htmlFor="pc-5">
            <input type="radio" id="pc-5" />
          </label>
          <label className="grey" htmlFor="pc-6">
            <input type="radio" id="pc-6" />
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-lg-4 col-md-6 col-sm-6">
    <div className="product__item">
      <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${product3})` }}>
        <ul className="product__hover">
          <li><a href="#"><img src={heart} alt="heart icon" /></a></li>
          <li><a href="#"><img src={compare} alt="compare icon" /> <span>Compare</span></a></li>
          <li><a href="#"><img src={search} alt="search icon" /></a></li>
        </ul>
      </div>
      <div className="product__item__text">
        <h6>Piqué Biker Jacket</h6>
        <a href="#" className="add-cart">+ Add To Cart</a>
        <div className="rating">
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
        </div>
        <h5>$67.24</h5>
        <div className="product__color__select">
          <label htmlFor="pc-4">
            <input type="radio" id="pc-4" />
          </label>
          <label className="active black" htmlFor="pc-5">
            <input type="radio" id="pc-5" />
          </label>
          <label className="grey" htmlFor="pc-6">
            <input type="radio" id="pc-6" />
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-lg-4 col-md-6 col-sm-6">
    <div className="product__item">
      <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${product4})` }}>
        <ul className="product__hover">
          <li><a href="#"><img src={heart} alt="heart icon" /></a></li>
          <li><a href="#"><img src={compare} alt="compare icon" /> <span>Compare</span></a></li>
          <li><a href="#"><img src={search} alt="search icon" /></a></li>
        </ul>
      </div>
      <div className="product__item__text">
        <h6>Piqué Biker Jacket</h6>
        <a href="#" className="add-cart">+ Add To Cart</a>
        <div className="rating">
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
          <i className="fa fa-star-o"></i>
        </div>
        <h5>$67.24</h5>
        <div className="product__color__select">
          <label htmlFor="pc-4">
            <input type="radio" id="pc-4" />
          </label>
          <label className="active black" htmlFor="pc-5">
            <input type="radio" id="pc-5" />
          </label>
          <label className="grey" htmlFor="pc-6">
            <input type="radio" id="pc-6" />
          </label>
        </div>
      </div>
    </div>
  </div>
  </>
  );
};

export default ProductItem;