import React from 'react';

const Counter = () => {
    return (
        <section className="counter spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="counter__item">
                            <div className="counter__item__number">
                                <h2 className="cn_num">102</h2>
                            </div>
                            <span>Our <br />Clients</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="counter__item">
                            <div className="counter__item__number">
                                <h2 className="cn_num">30</h2>
                            </div>
                            <span>Total <br />Categories</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="counter__item">
                            <div className="counter__item__number">
                                <h2 className="cn_num">102</h2>
                            </div>
                            <span>In <br />Country</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="counter__item">
                            <div className="counter__item__number">
                                <h2 className="cn_num">98</h2>
                                <strong>%</strong>
                            </div>
                            <span>Happy <br />Customer</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Counter;
