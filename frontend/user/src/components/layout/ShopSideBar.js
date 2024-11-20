import React, { useState, useEffect } from 'react';
import { getAllCategory } from '../Api/categoryApi';

const ShopSideBar = ({ onCategoryChange }) => {
    const [accordion, setAccordion] = useState({
        categories: true,
        branding: true,
        price: true,
        size: true,
        colors: true,
        tags: true,
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await getAllCategory();  
            setCategories(response.data); 
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories();
      }, []); 


      const toggleAccordion = (section) => {
        setAccordion((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };
    

    const linkStyle = {
        textDecoration: 'none',
    };
    const handleCategoryClick = (category) => {
        onCategoryChange(category); // Notify parent about category selection
      };

    return (
        <div class="col-lg-3">
            <div className="shop__sidebar">
                <div className="shop__sidebar__search">
                    <form action="#">
                        <input type="text" placeholder="Search..." />
                        <button type="submit"><span className="icon_search"></span></button>
                    </form>
                </div>

                <div className="shop__sidebar__accordion">
                    <div className="accordion" id="accordionExample">
                        {/* Categories */}
                        <div className="card">
                            <div className="card-heading">
                                <a
                                    onClick={() => toggleAccordion('categories')}
                                    data-toggle="collapse"
                                    data-target="#collapseOne"
                                    style={linkStyle}
                                >
                                    Categories
                                </a>
                            </div>
                            {accordion.categories && (
                                <div id="collapseOne" className="collapse show" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <div className="shop__sidebar__categories">
                                            <ul className="nice-scroll">
                                                {categories.filter(category => !category.anime).map((category) => (
                                                <li key={category.id}>
                                                    <a href="#" onClick={() => handleCategoryClick(category._id)} style={linkStyle}>{`${category.name}`}</a>
                                                </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Branding */}
                        <div className="card">
                            <div className="card-heading">
                                <a
                                    onClick={() => toggleAccordion('branding')}
                                    data-toggle="collapse"
                                    data-target="#collapseTwo"
                                    style={linkStyle}
                                >
                                    Branding
                                </a>
                            </div>
                            {accordion.branding && (
                                <div id="collapseTwo" className="collapse show" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <div className="shop__sidebar__brand">
                                            <ul>
                                                <li><a href="#" style={linkStyle}>Louis Vuitton</a></li>
                                                <li><a href="#" style={linkStyle}>Chanel</a></li>
                                                <li><a href="#" style={linkStyle}>Hermes</a></li>
                                                <li><a href="#" style={linkStyle}>Gucci</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Filter Price */}
                        <div className="card">
                            <div className="card-heading">
                                <a
                                    onClick={() => toggleAccordion('price')}
                                    data-toggle="collapse"
                                    data-target="#collapseThree"
                                >
                                    Filter Price
                                </a>
                            </div>
                            {accordion.price && (
                                <div id="collapseThree" className="collapse show" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <div className="shop__sidebar__price">
                                            <ul>
                                                <li><a href="#" style={linkStyle}>$0.00 - $50.00</a></li>
                                                <li><a href="#" style={linkStyle}>$50.00 - $100.00</a></li>
                                                <li><a href="#" style={linkStyle}>$100.00 - $150.00</a></li>
                                                <li><a href="#" style={linkStyle}>$150.00 - $200.00</a></li>
                                                <li><a href="#" style={linkStyle}>$200.00 - $250.00</a></li>
                                                <li><a href="#" style={linkStyle}>250.00+</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Size */}
                        <div className="card">
                            <div className="card-heading">
                                <a
                                    onClick={() => toggleAccordion('size')}
                                    data-toggle="collapse"
                                    data-target="#collapseFour"
                                >
                                    Size
                                </a>
                            </div>
                            {accordion.size && (
                                <div id="collapseFour" className="collapse show" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <div className="shop__sidebar__size">
                                            <label htmlFor="xs">xs
                                                <input type="radio" id="xs" name="size" />
                                            </label>
                                            <label htmlFor="sm">s
                                                <input type="radio" id="sm" name="size" />
                                            </label>
                                            <label htmlFor="md">m
                                                <input type="radio" id="md" name="size" />
                                            </label>
                                            <label htmlFor="xl">l
                                                <input type="radio" id="xl" name="size" />
                                            </label>
                                            <label htmlFor="xl">xl
                                                <input type="radio" id="xl" name="size" />
                                            </label>
                                            <label htmlFor="2xl">xxl
                                                <input type="radio" id="2xl" name="size" />
                                            </label>
                                            <label htmlFor="xxl">xxxl
                                                <input type="radio" id="xxl" name="size" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Colors */}
                        <div className="card">
                            <div className="card-heading">
                                <a
                                    onClick={() => toggleAccordion('colors')}
                                    data-toggle="collapse"
                                    data-target="#collapseFive"
                                >
                                    Colors
                                </a>
                            </div>
                            {accordion.colors && (
                                <div id="collapseFive" className="collapse show" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <div className="shop__sidebar__color">
                                            <label className="c-1" htmlFor="sp-1">
                                                <input type="radio" id="sp-1" name="color" />
                                            </label>
                                            <label className="c-2" htmlFor="sp-2">
                                                <input type="radio" id="sp-2" name="color" />
                                            </label>
                                            <label className="c-3" htmlFor="sp-3">
                                                <input type="radio" id="sp-3" name="color" />
                                            </label>
                                            <label className="c-4" htmlFor="sp-4">
                                                <input type="radio" id="sp-4" name="color" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="card">
                            <div className="card-heading">
                                <a
                                    onClick={() => toggleAccordion('tags')}
                                    data-toggle="collapse"
                                    data-target="#collapseSix"
                                >
                                    Tags
                                </a>
                            </div>
                            {accordion.tags && (
                                <div id="collapseSix" className="collapse show" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <div className="shop__sidebar__tags">
                                            <a href="#" style={linkStyle}>Product</a>
                                            <a href="#" style={linkStyle}>Bags</a>
                                            <a href="#" style={linkStyle}>Shoes</a>
                                            <a href="#" style={linkStyle}>Fashion</a>
                                            <a href="#" style={linkStyle}>Clothing</a>
                                            <a href="#" style={linkStyle}>Hats</a>
                                            <a href="#" style={linkStyle}>Accessories</a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopSideBar;
