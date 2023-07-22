import React, { Children } from "react";
import "../../asset/css/Cart.css";
interface IBannerProps {
  children: React.ReactNode;
}
const Banner = ({ children }: IBannerProps) => {
  return (
    <div>
      <section className="banner">
        <img
          src="https://res.cloudinary.com/dwzh9i6xf/image/upload/v1689258323/BookShopMolla/page-header-bg_x2hwud.jpg"
          alt=""
        />
        <h1>{children}</h1>
      </section>
    </div>
  );
};

export default Banner;
