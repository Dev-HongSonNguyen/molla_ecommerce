import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import "../../asset/css/ProductDetail.css";
import { useParams } from "react-router-dom";
import { getOneBook } from "../../api/book";
import { Ibook } from "../../interface/Ibook";
const ProductDetail = () => {
  const [book, setBook] = useState<any>({});
  const { id } = useParams();
  useEffect(() => {
    getOneBook(id).then(({ data }) => {
      const book = data.product;
      setBook(book);
    });
  }, [id]);
  console.log(book);

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
                />
              </div>
              <button className="add-to-cart">
                <span className="material-icons">add_shopping_cart</span>
                <span>ADD TO CART</span>
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
