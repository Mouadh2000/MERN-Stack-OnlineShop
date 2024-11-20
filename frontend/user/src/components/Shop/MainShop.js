import React, { useEffect, useState } from 'react';
import ShopSideBar from '../layout/ShopSideBar';
import Breadcrumb from './BreadCrumb';
import ProductItem from './ProductItem';
import { getProductsByCategory } from '../Api/productApi';


const MainShop = () => {
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [products, setProducts] = useState([]); 

  const fetchProducts = async (category) => {
    if (category) {
      const data = await getProductsByCategory(category);
      if (data) setProducts(data);
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]); 

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setProducts([]);
  };

  return (
    <>
      <Breadcrumb />
      <section className="shop spad">
        <div className="container">
          <div className="row">
            <ShopSideBar onCategoryChange={handleCategoryChange} />
            <div className="col-lg-9">
              <div className="shop__product__option">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__right">
                      <p>Sort by Price:</p>
                      <select style={{border: 'none', backgroundColor: 'transparent'}}>
                        <option value="">Low To High</option>
                        <option value="">$0 - $55</option>
                        <option value="">$55 - $100</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <ProductItem products={products} />
              </div>
              <div class="row">
                        <div class="col-lg-12">
                            <div class="product__pagination" >
                                <a style={{textDecoration: 'none'}} class="active" href="#">1</a>
                                <a style={{textDecoration: 'none'}} href="#">2</a>
                                <a style={{textDecoration: 'none'}} href="#">3</a>
                            </div>
                        </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainShop;
