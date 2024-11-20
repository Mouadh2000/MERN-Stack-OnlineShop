import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsById } from '../Api/productApi';
import { getAllCategory } from '../Api/categoryApi';

const ShopDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductsById(productId);
        if (data) {
          setProduct(data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);
  useEffect(() => {
    const fetchCategories = async () => {
        const fetchedCategories = await getAllCategory();
        if (fetchedCategories) {
            setCategories(fetchedCategories);
        }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No product details available.</p>;
  }
  return (
    <section className="shop-details">
      <div className="product__details__pic">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="product__details__breadcrumb">
                <a href="/">Home</a>
                <a href="/shop">Shop</a>
                <span>Product Details</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <ul className="nav nav-tabs" role="tablist">
                {product.images.slice(0, 4).map((image, index) => (
                  <li className="nav-item" key={index}>
                    <a
                      className={`nav-link ${index === 0 ? 'active' : ''}`}
                      data-toggle="tab"
                      href={`#tabs-${index + 1}`}
                      role="tab"
                    >
                      <div
                        className="product__thumb__pic set-bg"
                        style={{ backgroundImage: `url(${image})` }}
                      ></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6 col-md-9">
              <div className="tab-content">
                {product.images.slice(0, 4).map((image, index) => (
                  <div
                    className={`tab-pane ${index === 0 ? 'active' : ''}`}
                    id={`tabs-${index + 1}`}
                    role="tabpanel"
                    key={index}
                  >
                    <div className="product__details__pic__item">
                      <img src={image} alt={product.name} />
                    </div>
                  </div>
                ))}
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
                <h4>{product.name}</h4>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <i
                      className={`fa ${i < product.rating ? 'fa-star' : 'fa-star-o'}`}
                      key={i}
                    ></i>
                  ))}
                  <span> - {product.rating} Reviews</span>
                </div>
                <h3>
                  {product.price} DT <span>{product.discount > 0 ? `${product.discount} DT` : ''}</span>
                </h3>
                <p>{product.description}</p>
                <div className="product__details__option">
                  <div className="product__details__option__size">
                    <span>Size:</span> {product.size}
                  </div>
                  {product.color && (
                    <div className="product__details__option__color">
                      <span>Color:</span>
                      {product.color.map((color, index) => (
                        <label key={index} style={{ backgroundColor: color }}></label>
                      ))}
                    </div>
                  )}
                </div>
                <div className="product__details__cart__option">
                  <a href="#" className="primary-btn">
                    Add to cart
                  </a>
                </div>
                <div className="product__details__btns__option">
                  <a href="#">
                    <i className="fa fa-heart"></i> Add to wishlist
                  </a>
                </div>
                <div className="product__details__last__option">
                  <h5>
                    <span>Guaranteed Safe Checkout</span>
                  </h5>
                  <ul>
                  <li>
                    <span>Category: </span> 
                    {Array.isArray(categories?.data) 
                      ? categories.data.find(category => category._id === product.category)?.name || 'Category not found' 
                      : 'Categories data is not available'}
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
