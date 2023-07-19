import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../../asset/css/HeaderClient.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCart } from "../../api/cart";
import InputSearch from "../Input/InputSearch";
import Menu from "./Menu";
import MenuCategory from "./MenuCategory";
const LayoutClient = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    const userDataString = sessionStorage.getItem("userData") ?? "";
    if (userDataString) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });
  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem("userData"));
    const id = userId?.user._id;
    if (id !== "") {
      getAllCart(id)
        .then(({ data }) => {
          const totalQuatity = data.totalQuantity;
          setQuantity(totalQuatity);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  }, []);
  const handleLogout = () => {
    setTimeout(() => {
      toast.success("Đăng xuất thành công");
      navigate("/signin");
    }, 1900);
    setTimeout(() => {
      setIsLoggedIn(false);
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
    }, 2000);
  };
  return (
    <div>
      <section className="header">
        <div className="header-top">
          {!isLoggedIn && (
            <>
              <Link to={"signin"}>Sign in /</Link>
              <Link to={"signup"}>Sign up</Link>
            </>
          )}
          {isLoggedIn && <button onClick={handleLogout}>Log out</button>}
        </div>
        <div className="header-between">
          <div className="header-between-logo">
            <img
              src="https://res.cloudinary.com/dwzh9i6xf/image/upload/v1688837403/BookShopMolla/logo-20_rr19vw.png"
              alt=""
            />
          </div>
          <InputSearch></InputSearch>
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
              <div className="relative">
                <p>Cart</p>
                <span className="quantity">{quantity}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <MenuCategory></MenuCategory>
          <Menu></Menu>
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
