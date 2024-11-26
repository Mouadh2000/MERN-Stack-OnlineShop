import React, { useEffect, useState } from 'react';
import ShopSideBar from '../layout/ShopSideBar';
import Breadcrumb from './BreadCrumb';
import ProductItem from './ProductItem';
import AnimeItem from './AnimeItem';
import { getProductsByCategory, getAllProduct } from '../Api/productApi';
import { getAllAnime } from '../Api/animeApi';
import { useCart } from '../../context/CartContext';
const MainShop = () => {
  const { handleAddToCart } = useCart(); // Access add-to-cart function from global context
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [isAnimeCategory, setIsAnimeCategory] = useState(false);

  const fetchProducts = async (category) => {
    if (category) {
      if (category.anime) {
        setIsAnimeCategory(true);
        const data = await getAllAnime();
        if (data) setProducts(data);
      } else {
        setIsAnimeCategory(false);
        const data = await getProductsByCategory(category);
        if (data) setProducts(data);
      }
    } else {
      const data = await getAllProduct();
      if (data) setProducts(data);
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
                    {/* Additional filters here */}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__right">
                      <p>Sort by Price:</p>
                      <select style={{ border: 'none', backgroundColor: 'transparent' }}>
                        <option value="">Low To High</option>
                        <option value="">$0 - $55</option>
                        <option value="">$55 - $100</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {isAnimeCategory ? (
                  <AnimeItem products={products} onAddToCart={handleAddToCart} />
                ) : (
                  <ProductItem products={products} onAddToCart={handleAddToCart} />
                )}
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="product__pagination">
                    <a style={{ textDecoration: 'none' }} className="active" href="#">1</a>
                    <a style={{ textDecoration: 'none' }} href="#">2</a>
                    <a style={{ textDecoration: 'none' }} href="#">3</a>
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
