import React from 'react';
import CartBreadcrumb from './CartBreadCump';
import { useCart } from '../../context/CartContext';
import { Button, InputGroup, InputGroupText } from 'reactstrap';

const Cart = () => {
  const { cartItems, handleQuantityChange, handleRemoveItem, calculateTotal } = useCart(); // Use global context

  const incrementQuantity = (id, currentQuantity) => {
    handleQuantityChange(id, currentQuantity + 1);
  };

  const decrementQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(id, currentQuantity - 1);
    }
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
                            <h5>{item.price} DT</h5>
                          </div>
                        </td>
                        <td className="quantity__item">
                          <InputGroup>
                            <Button
                              color="secondary"
                              onClick={() => decrementQuantity(item.id, item.quantity)}
                            >
                              -
                            </Button>
                            <InputGroupText>{item.quantity}</InputGroupText>
                            <Button
                              color="secondary"
                              onClick={() => incrementQuantity(item.id, item.quantity)}
                            >
                              +
                            </Button>
                          </InputGroup>
                        </td>
                        <td className="cart__price">
                          {(item.price * item.quantity).toFixed(2)} DT
                        </td>
                        <td
                          className="cart__close"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <i className="fa fa-close"></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cart__total">
                <h6>Cart total</h6>
                <ul>
                  <li>Subtotal <span>{calculateTotal()} DT</span></li>
                  <li>Total <span>{calculateTotal()} DT</span></li>
                </ul>
                <a href="/checkout" className="primary-btn">
                  Proceed to checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
