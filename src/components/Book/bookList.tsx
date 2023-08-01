import React, { useEffect, useState } from "react";
import { getAllBook } from "../../api/book";
import BookItem from "../Book/BookItem";
import Heading from "../Common/Heading";
import "../../asset/css/HomePage.css";
const BookList = () => {
  const [book, setBook] = useState([]);
  useEffect(() => {
    getAllBook().then(({ data }) => {
      const newBook = data.product;
      setBook(newBook.docs);
    });
  }, []);
  return (
    <div className="">
      <Heading>List Product</Heading>
      <div className="product-elem">
        {book.map((item: any) => (
          <BookItem data={item} key={item._id}></BookItem>
        ))}
      </div>
    </div>
  );
};

export default BookList;
