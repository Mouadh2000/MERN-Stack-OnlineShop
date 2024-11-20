import React, { useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Image1 from '../assets/img/hero/wallpaper1.jpg';
import Image2 from '../assets/img/hero/wallpaper2.jpg';
import WOW from 'wowjs';

// Reusable HeroItem component
const HeroItem = ({ backgroundImage, title, description, socialLinks }) => (
  <div className="hero__items" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="container">
      <div className="row">
        <div className="col-xl-5 col-lg-7 col-md-8">
          <div className="hero__text wow animate__animated animate__fadeIn animate__delay-0.1s">
            <h2 style={{color: 'red', fontSize: '30px'}}>{title}</h2>
            <a href="/shop" className="primary-btn animate__animated animate__fadeIn animate__delay-0.2s">
              Shop now <span className="arrow_right"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HeroSection = () => {
  useEffect(() => {
    new WOW.WOW().init();
    const $ = window.$;
    $('.owl-carousel').owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      items: 1,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="bi bi-chevron-left"></i>',
        '<i class="bi bi-chevron-right"></i>'
      ]
    });
  }, []);

  // Data for hero items
  const heroItems = [
    {
      backgroundImage: Image1,
      title: 'Shopping Tounsi',
      
    },
    {
      backgroundImage: Image2,
      title: 'Shopping Tounsi',
      
    },
  ];

  return (
    <>
      {/* Hero Section Start */}
      <section className="hero">
        <OwlCarousel className="hero__slider owl-carousel owl-theme" items={1} autoplay loop margin={10} nav>
          {heroItems.map((item, index) => (
            <HeroItem
              key={index}
              backgroundImage={item.backgroundImage}
              title={item.title}
              description={item.description}
            />
          ))}
        </OwlCarousel>
      </section>
      {/* Hero Section End */}
    </>
  );
};

export default HeroSection;
