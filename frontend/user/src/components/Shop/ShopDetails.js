import React from 'react';
import thumb1 from '../../assets/img/shop-details/thumb-1.png';
import thumb2 from '../../assets/img/shop-details/thumb-2.png';
import thumb3 from '../../assets/img/shop-details/thumb-3.png';
import thumb4 from '../../assets/img/shop-details/thumb-4.png';
import prod1 from '../../assets/img/shop-details/product-big.png';
import prod2 from '../../assets/img/shop-details/product-big-2.png';
import prod3 from '../../assets/img/shop-details/product-big-3.png';
import prod4 from '../../assets/img/shop-details/product-big-4.png';


const ShopDetails = () => {
  return (
    <section className="shop-details">
      <div className="product__details__pic">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="product__details__breadcrumb">
                <a href="./index.html">Home</a>
                <a href="./shop.html">Shop</a>
                <span>Product Details</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">
                    <div className="product__thumb__pic set-bg" style={{ backgroundImage: `url(${thumb1})` }}></div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
                    <div className="product__thumb__pic set-bg" style={{ backgroundImage: `url(${thumb2})` }}></div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">
                    <div className="product__thumb__pic set-bg" style={{ backgroundImage: `url(${thumb3})` }}></div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#tabs-4" role="tab">
                    <div className="product__thumb__pic set-bg" style={{ backgroundImage: `url(${thumb4})` }}>
                      <i className="fa fa-play"></i>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 col-md-9">
              <div className="tab-content">
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                  <div className="product__details__pic__item">
                    <img src={prod2} alt="" />
                  </div>
                </div>
                <div className="tab-pane" id="tabs-2" role="tabpanel">
                  <div className="product__details__pic__item">
                    <img src={prod3} alt="" />
                  </div>
                </div>
                <div className="tab-pane" id="tabs-3" role="tabpanel">
                  <div className="product__details__pic__item">
                    <img src={prod1} alt="" />
                  </div>
                </div>
                <div className="tab-pane" id="tabs-4" role="tabpanel">
                  <div className="product__details__pic__item">
                    <img src={prod4} alt="" />
                    <a
                      href="https://www.youtube.com/watch?v=8PJ3_p7VqHw&list=RD8PJ3_p7VqHw&start_radio=1"
                      className="video-popup"
                    >
                      <i className="fa fa-play"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product__details__content">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <div className="product__details__text">
                <h4>Hooded thermal anorak</h4>
                <div className="rating">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-o"></i>
                  <span> - 5 Reviews</span>
                </div>
                <h3>
                  $270.00 <span>70.00</span>
                </h3>
                <p>
                  Coat with quilted lining and an adjustable hood. Featuring long sleeves with adjustable cuff tabs,
                  adjustable asymmetric hem with elastic side tabs and a front zip fastening with placket.
                </p>
                <div className="product__details__option">
                  <div className="product__details__option__size">
                    <span>Size:</span>
                    <label htmlFor="xxl">
                      xxl
                      <input type="radio" id="xxl" />
                    </label>
                    <label className="active" htmlFor="xl">
                      xl
                      <input type="radio" id="xl" />
                    </label>
                    <label htmlFor="l">
                      l
                      <input type="radio" id="l" />
                    </label>
                    <label htmlFor="sm">
                      s
                      <input type="radio" id="sm" />
                    </label>
                  </div>
                  <div className="product__details__option__color">
                    <span>Color:</span>
                    <label className="c-1" htmlFor="sp-1">
                      <input type="radio" id="sp-1" />
                    </label>
                    <label className="c-2" htmlFor="sp-2">
                      <input type="radio" id="sp-2" />
                    </label>
                    <label className="c-3" htmlFor="sp-3">
                      <input type="radio" id="sp-3" />
                    </label>
                    <label className="c-4" htmlFor="sp-4">
                      <input type="radio" id="sp-4" />
                    </label>
                    <label className="c-9" htmlFor="sp-9">
                      <input type="radio" id="sp-9" />
                    </label>
                  </div>
                </div>
                <div className="product__details__cart__option">
                  <div className="quantity">
                    <div className="pro-qty">
                      <input type="text" value="1" />
                    </div>
                  </div>
                  <a href="#" className="primary-btn">
                    add to cart
                  </a>
                </div>
                <div className="product__details__btns__option">
                  <a href="#">
                    <i className="fa fa-heart"></i> add to wishlist
                  </a>
                  
                </div>
                <div className="product__details__last__option">
                  <h5>
                    <span>Guaranteed Safe Checkout</span>
                  </h5>
                  <img src="img/shop-details/details-payment.png" alt="" />
                  <ul>
                    <li>
                      <span>SKU:</span> 3812912
                    </li>
                    <li>
                      <span>Categories:</span> Clothes
                    </li>
                    <li>
                      <span>Tag:</span> Clothes, Skin, Body
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopDetails;
