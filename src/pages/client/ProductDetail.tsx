import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import { useNavigate, useParams } from "react-router-dom";
import { getOneBook } from "../../api/book";
import jwtDecode from "jwt-decode";
import { addToCart } from "../../api/cart";
import { toast } from "react-toastify";
import { Ibook } from "../../interface/Ibook";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "../../components/Tab-panel/Tabpanel";
import "../../asset/css/ProductDetail.css";
interface DecodedToken {
  _id: string;
}
const ProductDetail = () => {
  const [book, setBook] = useState<any>({});
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const handleChange = (_event: any, newValue: any) => {
    setValue(newValue);
  };
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
  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
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
                  placeholder="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              <div className="add-to-cart">
                <span className="material-icons">add_shopping_cart</span>
                <button onClick={() => addCart(book)}>ADD TO CART</button>
              </div>
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
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Description"
                sx={{
                  color: value === 0 ? "#1cc0a0" : "#1cc0a0",
                }}
                {...a11yProps(0)}
              />
              <Tab
                label="Comment"
                sx={{
                  color: value === 1 ? "#1cc0a0" : "#1cc0a0",
                }}
                {...a11yProps(1)}
              />
            </Tabs>
            <TabPanel value={value} index={0}>
              <div className="detail-book-elem-bottom-box">
                <h3>Product Information</h3>
                <p>{book.description}</p>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="comment-wrraper">
                <form className="comment">
                  <div className="mb-5">
                    <textarea
                      name=""
                      id=""
                      cols={30}
                      rows={10}
                      className="w-full text-[#777777] px-[50px] py-[20px] border outline-none"
                      placeholder="Viết đánh giá cho sản phẩm này *"
                    ></textarea>
                  </div>
                  <button className="bg-[#1cc0a0] text-white px-5 py-2">
                    Bình Luận
                  </button>
                </form>
              </div>
            </TabPanel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
