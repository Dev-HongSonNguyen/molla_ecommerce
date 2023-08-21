import React from "react";
import "../../asset/css/Banner.css";
const BannerHomePage = () => {
  return (
    <div>
      <section className="banner">
        <div className="banner-elem">
          <div className="banner-elem-item-1">
            <img
              src="https://res.cloudinary.com/dwzh9i6xf/image/upload/v1688837404/BookShopMolla/banner-1_c92xsh.jpg"
              alt=""
            />
            <div className="banner-elem-item-1-content animationTop-1">
              <span>Your Guide To The World</span>
              <h5>Must-Read Travel Book</h5>
              <a href="#">FIND OUT MORE</a>
            </div>
          </div>
          <div className="banner-elem-item-2">
            <div className="banner-elem-item-1-group-1">
              <img
                src="https://res.cloudinary.com/dwzh9i6xf/image/upload/v1688837404/BookShopMolla/banner-2_wmtc5n.jpg"
                alt=""
              />
              <div className="banner-elem-item-1-group-1-content animationTop-2">
                <span>Your Guide To The World</span>
                <h5>Discover Our Best Romance Books</h5>
                <a href="#">DISCOVER NOW</a>
              </div>
            </div>
            <div className="banner-elem-item-2-group-2">
              <div className="banner-elem-item-2-group-2-1">
                <img
                  src="https://res.cloudinary.com/dwzh9i6xf/image/upload/v1688837404/BookShopMolla/banner-4_twalkg.jpg"
                  alt=""
                />
                <div className="banner-elem-item-2-group-2-1-content animationTop-3">
                  <span>Your Guide To The World</span>
                  <h5>20% Off Use Code</h5>
                  <a href="#">SHOP NOW</a>
                </div>
              </div>
              <div className="banner-elem-item-2-group-2-1">
                <img
                  src="https://res.cloudinary.com/dwzh9i6xf/image/upload/v1688837403/BookShopMolla/banner-3_psv9v2.jpg"
                  alt=""
                />
                <div className="banner-elem-item-2-group-2-1-content animationTop-3">
                  <span>Your Guide To The World</span>
                  <h5>Business Economics</h5>
                  <a href="#">DISCOVER NOW</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BannerHomePage;
