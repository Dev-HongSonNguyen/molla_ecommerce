import React from "react";
import { Outlet } from "react-router-dom";
import "../../asset/css/HeaderClient.css";
import { Icategory } from "../../interface/Icategory";
interface LayoutClient {
  cateData: Icategory[];
}
const LayoutClient = (props: LayoutClient) => {
  return (
    <div>
      <section className="header">
        <div className="header-top">
          <a href="">Sign in /</a>
          <a href="">Sign up</a>
        </div>
        <div className="header-between">
          <div className="header-between-logo">
            <img
              src="https://res.cloudinary.com/dwzh9i6xf/image/upload/v1688837403/BookShopMolla/logo-20_rr19vw.png"
              alt=""
            />
          </div>
          <form action="" className="header-between-search">
            <input type="text" placeholder="Search product..." />
            <button>
              <span className="material-icons">search</span>
            </button>
          </form>
          <div className="header-between-action">
            <div className="header-between-action-item">
              <a href="">
                <span className="material-icons">favorite_border</span>
              </a>
              <p>Whishlist</p>
            </div>
            <div className="header-between-action-item">
              <a href="">
                <span className="material-icons">person_outline</span>
              </a>
              <p>Account</p>
            </div>
            <div className="header-between-action-item">
              <a href="cart">
                <span className="material-icons">
                  production_quantity_limits
                </span>
              </a>
              <p>Cart</p>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-cate">
            <div className="header-bottom-cate-main">
              <span className="material-icons">menu</span>
              <a href="">BROWSE CATEGORIES</a>
              <span className="material-icons">arrow_drop_down</span>
            </div>
            <div className="header-bottom-cate-dropdown">
              <ul>
                {props.cateData.map((cate) => {
                  return (
                    <li key={cate._id}>
                      <a href="">{cate.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="header-bottom-nav">
            <ul className="header-bottom-nav-menu">
              <li>
                <a href="/">HOME</a>
              </li>
              <li>
                <a href="">SHOP</a>
              </li>
              <li>
                <a href="">PRODUCT</a>
              </li>
              <li>
                <a href="">PAGES</a>
              </li>
              <li>
                <a href="">BLOGS</a>
              </li>
            </ul>
          </div>
          <div className="header-bottom-sale">
            <span className="material-icons">tungsten</span>
            <p>Clearance Up to 30% Off</p>
          </div>
        </div>
      </section>
      <Outlet />
    </div>
  );
};

export default LayoutClient;
