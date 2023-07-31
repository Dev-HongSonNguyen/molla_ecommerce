import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import "../../asset/css/ProductDetail.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getOneBook } from "../../api/book";
import jwtDecode from "jwt-decode";
import { addToCart } from "../../api/cart";
import { toast } from "react-toastify";
import { Ibook } from "../../interface/Ibook";
interface DecodedToken {
  _id: string;
}
const ProductDetail = () => {
  const [book, setBook] = useState<any>({});
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getOneBook(id).then(({ data }) => {
      const book = data.product;
      setBook(book);
    });
  }, [id]);
  console.log(book);
  const getCurrentUserId = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token) as DecodedToken;
      const userId = decodedToken._id;
      return userId;
    }
    return null;
  };
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(value);
  };
  const addCart = async (product: Ibook) => {
    try {
      const userId = getCurrentUserId();
      await addToCart(product, userId, quantity);
      toast.success("Thêm sản phẩm vào giỏ hàng thành công");
      ("/cart");
      navigate("/cart");
    } catch (error) {
      toast.error("Bạn cần đăng nhập");
    }
  };
  return (
    <div>
      <Banner>Product Detail</Banner>
      <section className="detail-book">
        <div className="detail-book-elem">
          <div className="bread-crumnb">
            <span>Home</span>
            <span>&gt;</span>
            <span>Product</span>
            <span>&gt;</span>
            <span>Product-Detail</span>
            <span>&gt;</span>
            <span>{book.name}</span>
          </div>
          <div className="detail-book-elem-top">
            <div className="detail-book-elem-image">
              <img src={book.image} alt="" />
            </div>
            <div className="detail-book-elem-content">
              <h1 className="product-name">{book.name}</h1>
              <span className="product-price">${book.price}</span>
              <p className="description-short">{book.description}</p>
              <div className="qty">
                <span>Quantity:</span>
                <input
                  type="number"
                  min={1}
                  placeholder={"1"}
                  defaultValue={1}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              <button className="add-to-cart">
                <span className="material-icons">add_shopping_cart</span>
                <button onClick={() => addCart(book)}>ADD TO CART</button>
              </button>
              <span className="in-stock">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                In stock
              </span>
              <div className="category">
                <span>Category:</span>
                <a href="">Rachael Lippincott</a>
              </div>
            </div>
          </div>
          <div className="detail-book-elem-bottom">
            <div className="detail-book-elem-bottom-box">
              <h3>Product Information</h3>
              <p>{book.description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
