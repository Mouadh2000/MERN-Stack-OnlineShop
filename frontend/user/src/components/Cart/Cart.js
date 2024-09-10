import React, { useState } from 'react';
import CartBreadcrumb from './CartBreadCump';
import cart1 from '../../assets/img/shopping-cart/cart-1.jpg'

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            imgSrc: cart1,
            name: 'T-shirt Contrast Pocket',
            price: 30.00,
            quantity: 1,
        },
        
    ]);

    const handleQuantityChange = (id, value) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: parseInt(value) || 1 } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <>
        <CartBreadcrumb />
        <section className="shopping-cart spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="shopping__cart__table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td className="product__cart__item">
                                                <div className="product__cart__item__pic">
                                                    <img src={item.imgSrc} alt={item.name} />
                                                </div>
                                                <div className="product__cart__item__text">
                                                    <h6>{item.name}</h6>
                                                    <h5>${item.price.toFixed(2)}</h5>
                                                </div>
                                            </td>
                                            <td className="quantity__item">
                                                <div className="quantity">
                                                    <div className="pro-qty-2">
                                                        <input
                                                            type="text"
                                                            value={item.quantity}
                                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="cart__price">${(item.price * item.quantity).toFixed(2)}</td>
                                            <td className="cart__close" onClick={() => handleRemoveItem(item.id)}>
                                                <i className="fa fa-close"></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="continue__btn">
                                    <a href="#">Continue Shopping</a>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="continue__btn update__btn">
                                    <a href="#"><i className="fa fa-spinner"></i> Update cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="cart__discount">
                            <h6>Discount codes</h6>
                            <form action="#">
                                <input type="text" placeholder="Coupon code" />
                                <button type="submit">Apply</button>
                            </form>
                        </div>
                        <div className="cart__total">
                            <h6>Cart total</h6>
                            <ul>
                                <li>Subtotal <span>${calculateTotal()}</span></li>
                                <li>Total <span>${calculateTotal()}</span></li>
                            </ul>
                            <a href="/checkout" className="primary-btn">Proceed to checkout</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default Cart;
