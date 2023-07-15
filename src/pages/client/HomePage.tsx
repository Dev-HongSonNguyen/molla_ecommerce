import BannerHomePage from "../../components/Banner/BannerHomePage";
import ServiceComponent from "../../components/Service/ServiceComponent";
import { Ibook } from "../../interface/Ibook";
import { useState } from "react";
import { Icategory } from "../../interface/Icategory";
import AOS from "aos";
import { Skeleton, notification } from "antd";
import "../../asset/css/HomePage.css";
import "aos/dist/aos.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface HomePage {
  bookData: Ibook[];
  cateData: Icategory[];
  addToCart: (productId: string) => void;
}
const HomePage = (props: HomePage) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const getCategoryName = (categoryId: any) => {
    const category = props.cateData.find(
      (category: any) => category._id === categoryId
    );
    return category ? category.name : "";
  };
  const showNotificationAdd = () => {
    notification.success({
      message: "Thêm sản phẩm vào giỏ hàng thành công",
      duration: 2,
    });
  };
  const addToCart = async (productId: any) => {
    try {
      const response = await axios.post("http://localhost:8080/cart", {
        productId,
        quantity: 1,
      });
      const { message, cart } = response.data;
      if (message === "Thêm vào giỏ hàng thành công!") {
        navigate("cart");
        showNotificationAdd();
        console.log("Cart:", cart);
      } else {
        console.error("Thêm vào giỏ hàng thất bại:", message);
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };
  AOS.init();
  const renderBookData = () => {
    if (!props.bookData) {
      return Array(5)
        .fill(null)
        .map((_, index) => (
          <div className="product-elem-item" key={index}>
            <div className="product-elem-item-preview">
              <Skeleton />
            </div>
            <div className="product-elem-item-info">
              <Skeleton />
            </div>
          </div>
        ));
    }
    return props.bookData.map((book) => (
      <div className="product-elem-item" key={book._id}>
        <div className="product-elem-item-preview">
          <a href="">
            <img src={book.image} alt="" />
          </a>
        </div>
        <div className="product-elem-item-info">
          <a href="" className="category">
            by {getCategoryName(book.categoryId)}
          </a>
          <a href="" className="name">
            {book.name}
          </a>
          <p>${book.price}</p>
        </div>
        <div className="product-elem-item-actions">
          <div className="product-elem-item-actions-star">
            <span className="material-icons">star</span>
            <span className="material-icons">star</span>
            <span className="material-icons">star</span>
            <span className="material-icons">star</span>
            <span className="material-icons">star</span>
          </div>
          <div className="product-elem-item-actions-addtocart">
            <span className="material-icons">add_shopping_cart</span>
            <button onClick={() => addToCart(book._id)}>ADD TO CART</button>
          </div>
        </div>
      </div>
    ));
  };
  return (
    <div>
      <BannerHomePage />
      <ServiceComponent />
      <section className="product">
        <div className="product-title">
          <h5>List Products</h5>
        </div>
        <div
          className="product-elem"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          {renderBookData()}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
