import React, { useState, useEffect } from 'react';
import CheckoutBreadcrumb from './CheckoutBreadCump';
import { useAuth } from '../../context/AuthContext';

const Checkout = () => {
  const { currentUser } = useAuth();
  const [createAccount, setCreateAccount] = useState(false);
  const [noteAboutOrder, setNoteAboutOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // Default values based on currentUser
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        phone: currentUser.phoneNumber || '',
        email: currentUser.email || '',
      });
    }
  }, [currentUser]);

  const handleCreateAccountChange = () => setCreateAccount(!createAccount);
  const handleNoteAboutOrderChange = () => setNoteAboutOrder(!noteAboutOrder);
  const handlePaymentMethodChange = (method) => setPaymentMethod(method);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <CheckoutBreadcrumb />
      <section className="checkout spad">
        <div className="container">
          <div className="checkout__form">
            <form>
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  <h6 className="coupon__code">
                    <span className="icon_tag_alt"></span> Have a coupon? <a href="#">Click here</a> to enter your code
                  </h6>
                  <h6 className="checkout__title">Billing Details</h6>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>First Name<span>*</span></p>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>Last Name<span>*</span></p>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="checkout__input">
                    <p>Country<span>*</span></p>
                    <input type="text" />
                  </div>
                  <div className="checkout__input">
                    <p>Address<span>*</span></p>
                    <input type="text" placeholder="Street Address" className="checkout__input__add" />
                    <input type="text" placeholder="Apartment, suite, unit etc (optional)" />
                  </div>
                  <div className="checkout__input">
                    <p>Town/City<span>*</span></p>
                    <input type="text" />
                  </div>
                  <div className="checkout__input">
                    <p>Country/State<span>*</span></p>
                    <input type="text" />
                  </div>
                  <div className="checkout__input">
                    <p>Postcode / ZIP<span>*</span></p>
                    <input type="text" />
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>Phone<span>*</span></p>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>Email<span>*</span></p>
                        <input
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="checkout__order">
                    <h4 className="order__title">Your order</h4>
                    <div className="checkout__order__products">Product <span>Total</span></div>
                    <ul className="checkout__total__products">
                      <li>01. Vanilla salted caramel <span>$300.0</span></li>
                      <li>02. German chocolate <span>$170.0</span></li>
                      <li>03. Sweet autumn <span>$170.0</span></li>
                      <li>04. Gluten-free mini dozen <span>$110.0</span></li>
                    </ul>
                    <ul className="checkout__total__all">
                      <li>Subtotal <span>$750.99</span></li>
                      <li>Total <span>$750.99</span></li>
                    </ul>
                    <div className="checkout__input__checkbox">
                      <label htmlFor="acc-or">
                        Delivery
                        <input
                          type="checkbox"
                          id="acc-or"
                          checked={createAccount}
                          onChange={handleCreateAccountChange}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="checkout__input__checkbox">
                      <label htmlFor="payment">
                        Master Card
                        <input
                          type="checkbox"
                          id="payment"
                          checked={paymentMethod === 'check'}
                          onChange={() => handlePaymentMethodChange('check')}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="checkout__input__checkbox">
                      <label htmlFor="paypal">
                        Paypal
                        <input
                          type="checkbox"
                          id="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => handlePaymentMethodChange('paypal')}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <button type="submit" className="site-btn">PLACE ORDER</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
