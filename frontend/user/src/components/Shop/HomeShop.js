import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heart, compare, search } from '../Icons/Icons';

import product1 from '../../assets/img/product/product-1.jpg';
import product2 from '../../assets/img/product/product-2.jpg';
import product3 from '../../assets/img/product/product-3.jpg';
import product4 from '../../assets/img/product/product-4.jpg';
import product5 from '../../assets/img/product/product-5.jpg';
import product6 from '../../assets/img/product/product-6.jpg';
import product7 from '../../assets/img/product/product-7.jpg';

// Dummy products data
const products = [
  { id: 1, image: product1, label: 'New', title: 'Piqué Biker Jacket', price: '$67.24', category: 'new-arrivals' },
  { id: 2, image: product2, title: 'Piqué Biker Jacket', price: '$67.24', category: 'hot-sales' },
  { id: 3, image: product3, title: 'Piqué Biker Jacket', price: '$67.24', category: 'hot-sales' },
  { id: 4, image: product4, title: 'Piqué Biker Jacket', price: '$67.24', category: 'best-sellers' },
  { id: 5, image: product5, title: 'Piqué Biker Jacket', price: '$67.24', category: 'best-sellers' },
  { id: 6, image: product6, title: 'Piqué Biker Jacket', price: '$67.24', category: 'best-sellers' },
  { id: 7, image: product7, title: 'Piqué Biker Jacket', price: '$67.24', category: 'hot-sales' },
];

const HomeShop = () => {
  const [activeFilter, setActiveFilter] = useState('*');

  // Filter products based on the active filter
  const filteredProducts = activeFilter === '*' ? products : products.filter(product => product.category === activeFilter);

  // Define animation variants for product cards
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
  };

  return (
    <section className="product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <ul className="filter__controls">
              <li className={activeFilter === '*' ? 'active' : ''} onClick={() => setActiveFilter('*')}>Best Sellers</li>
              <li className={activeFilter === 'new-arrivals' ? 'active' : ''} onClick={() => setActiveFilter('new-arrivals')}>New Arrivals</li>
              <li className={activeFilter === 'hot-sales' ? 'active' : ''} onClick={() => setActiveFilter('hot-sales')}>Hot Sales</li>
            </ul>
          </div>
        </div>
        <div className="row product__filter">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className={`col-lg-3 col-md-6 col-sm-6 mix ${product.category}`}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg"
                    style={{ backgroundImage: `url(${product.image})` }}
                  >
                    {product.label && <span className="label">{product.label}</span>}
                    <ul className="product__hover">
                      <li><a href="#"><img src={heart} alt="heart" /></a></li>
                      <li><a href="#"><img src={compare} alt="compare" /> <span>Compare</span></a></li>
                      <li><a href="#"><img src={search} alt="search" /></a></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>{product.title}</h6>
                    <a href="#" className="add-cart">+ Add To Cart</a>
                    <div className="rating">
                      <i className="fa fa-star-o"></i>
                      <i className="fa fa-star-o"></i>
                      <i className="fa fa-star-o"></i>
                      <i className="fa fa-star-o"></i>
                      <i className="fa fa-star-o"></i>
                    </div>
                    <h5>{product.price}</h5>
                    <div className="product__color__select">
                      {[...Array(3)].map((_, index) => (
                        <label key={index} htmlFor={`pc-${product.id}-${index + 1}`} className={index === 1 ? 'active black' : index === 2 ? 'grey' : ''}>
                          <input type="radio" id={`pc-${product.id}-${index + 1}`} />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HomeShop;
