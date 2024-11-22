import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnimeById } from '../Api/animeApi';

const AnimeDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for the main image

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getAnimeById(productId);
        if (data) {
          setProduct(data);
          setSelectedImage(data.images[0]); // Set the first image as the default main image
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
            {/* Thumbnails */}
            <div className="col-lg-3 col-md-3">
              <ul className="nav nav-tabs" role="tablist">
                {product.images.slice(0, 4).map((image, index) => (
                  <li className="nav-item" key={index}>
                    <a
                      className={`nav-link ${selectedImage === image ? 'active' : ''}`}
                      onClick={() => setSelectedImage(image)} // Update the selected image
                      role="tab"
                      style={{ cursor: 'pointer' }} // Add pointer cursor

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
            {/* Main Image */}
            <div className="col-lg-6 col-md-9">
              <div className="product__details__pic__item">
                <img src={selectedImage} alt={product.name} />
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
                <p>{product.description}</p>
                <div className="product__details__btns__option">
                  <a href="#">
                    <i className="fa fa-heart"></i> Add to wishlist
                  </a>
                </div>
                <div className="product__details__last__option">
                  <h5>
                    <span>Guaranteed Safe Checkout</span>
                  </h5>
                  <ul></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimeDetails;
