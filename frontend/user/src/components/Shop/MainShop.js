import React, { useEffect, useState } from 'react';
import ShopSideBar from '../layout/ShopSideBar';
import Breadcrumb from './BreadCrumb';
import ProductItem from './ProductItem';
import AnimeItem from './AnimeItem';  // Import AnimeItem
import { getProductsByCategory, getAllProduct } from '../Api/productApi';
import { getAllAnime } from '../Api/animeApi';
const MainShop = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [isAnimeCategory, setIsAnimeCategory] = useState(false); // Track if anime category is selected

  const fetchProducts = async (category) => {
    if (category) {
      console.log(category.name);
      if (category.anime) {
        setIsAnimeCategory(true); 
        const data = await getAllAnime(); // Fetch anime products
        if (data) setProducts(data);
      } else {
        setIsAnimeCategory(false); // Set to false for non-anime category
        const data = await getProductsByCategory(category); // Fetch non-anime products
        if (data) setProducts(data);
      }
    } else {
      const data = await getAllProduct(); // Fetch all products if no category selected
      if (data) setProducts(data);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setProducts([]);  // Clear products when a new category is selected
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
                  <AnimeItem products={products} />  // Render AnimeItem when anime category is selected
                ) : (
                  <ProductItem products={products} />  // Render regular ProductItem for non-anime categories
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
