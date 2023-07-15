import React, { useEffect } from "react";
import "../../asset/css/Cart.css";
import BannerCart from "../../components/Banner/BannerCart";
import { Ibook } from "../../interface/Ibook";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getAllCart } from "../../api/cart";
interface CartPage {
  cartData: any;
  bookData: Ibook[];
  setCart: any;
  removeCart: (id: string) => void;
}
const CartPage = (props: CartPage) => {
  useEffect(() => {
    getAllCart().then(({ data }) => {
      const newCart = data.carts;
      props.setCart(newCart);
    });
  }, []);
  console.log("cartData", props.cartData);
  return (
    <div>
      <BannerCart />
      <section className="content-cart">
        <div className="content-cart-elem">
          <div className="content-cart-right">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {props.cartData.map((item: any) => {
                  const product = props.bookData.find((book) => {
                    return book._id === item.productId;
                  });
                  return (
                    <tr key={item.productId}>
                      <td>
                        <img
                          style={{ width: "50px" }}
                          src={product?.image}
                          alt=""
                        />
                      </td>
                      <td>{product?.name}</td>
                      <td>${product?.price}</td>
                      <td>{item.quantity}</td>
                      <td>${item.totalPrice}</td>
                      <td>
                        <button onClick={() => props.removeCart(item._id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 text-[#1cc0a0]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
