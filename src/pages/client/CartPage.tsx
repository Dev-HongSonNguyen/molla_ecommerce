import React from "react";
import "../../asset/css/Cart.css";
import BannerCart from "../../components/Banner/BannerCart";
import { Ibook } from "../../interface/Ibook";
interface CartPage {
  cartData: any;
  bookData: Ibook[];
}
const CartPage = (props: CartPage) => {
  return (
    <div>
      <BannerCart />
      <section className="content-cart">
        <div className="content-cart-elem">
          <div className="content-cart-right">
            <table>
              <thead>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img
                      style={{ width: "200px" }}
                      src="https://res.cloudinary.com/dwzh9i6xf/image/upload/v1689095370/BookShopMolla/587-home_default_200x310_mexan0.jpg"
                      alt=""
                    />
                  </td>
                  <td>Wonmenb</td>
                  <td>86</td>
                  <td>
                    <input type="number" min={0} />
                  </td>
                  <td>172</td>
                  <td>Delete</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="content-cart-left">
            <div className="content-cart-left-elem">
              <div className="cart-detailed">
                <span className="">8 Item</span>
                <span className="cart-detailed-price">142$</span>
              </div>
              <div className="cart-detailed-totals">
                <span>Total (tax incl.)</span>
                <span className="cart-detailed-totals-price">442$</span>
              </div>
              <p>Have a promo code?</p>
              <a href="" className="checkout">
                Proceed To Checkout
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
