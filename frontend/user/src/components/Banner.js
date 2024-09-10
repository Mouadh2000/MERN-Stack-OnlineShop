import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import banner1 from "../assets/img/banner/banner-1.jpg";
import banner2 from '../assets/img/banner/banner-2.jpg';
import banner3 from '../assets/img/banner/banner-3.jpg';

const Banner = () => {
  return (
    <section className="banner spad" >
      <div className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-4">
            <div className="banner__item ">
              <div className="banner__item__pic">
                <img src={banner1} alt="Clothing Collections 2030" />
              </div>
              <div className="banner__item__text">
                <h2>Clothing Collections 2030</h2>
                <Link 
                  to="shop" 
                  smooth={true} 
                  duration={500} 
                  className="btn"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="banner__item banner__item--middle ">
              <div className="banner__item__pic">
                <img src={banner2} alt="Accessories" />
              </div>
              <div className="banner__item__text">
                <h2>Accessories</h2>
                <Link 
                  to="shop" 
                  smooth={true} 
                  duration={500} 
                  className="btn"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="banner__item banner__item--last">
              <div className="banner__item__pic">
                <img src={banner3} alt="Shoes Spring 2030" />
              </div>
              <div className="banner__item__text">
                <h2>Shoes Spring 2030</h2>
                <Link 
                  to="shop" 
                  smooth={true} 
                  duration={500} 
                  className="btn"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
