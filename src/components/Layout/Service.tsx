import React from "react";
import "../../asset/css/Service.css";
const Service = () => {
  return (
    <div>
      <section className="service">
        <div className="service-elem">
          <div className="service-elem-item">
            <span className="material-icons">local_shipping</span>
            <div className="service-elem-content">
              <h5>Payment & Delivery</h5>
              <p>Free shipping for orders over $50</p>
            </div>
          </div>
          <div className="service-elem-item">
            <span className="material-icons">restart_alt</span>
            <div className="service-elem-content">
              <h5>Return & Refund</h5>
              <p>Free 100% money back guarantee</p>
            </div>
          </div>
          <div className="service-elem-item">
            <span className="material-icons">support</span>
            <div className="service-elem-content">
              <h5>Quality Support</h5>
              <p>Alway online feedback 24/7</p>
            </div>
          </div>
          <div className="service-elem-item">
            <span className="material-icons">support</span>
            <div className="service-elem-content">
              <h5>Join Our Newsletter</h5>
              <p>10% off by subscribing </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
