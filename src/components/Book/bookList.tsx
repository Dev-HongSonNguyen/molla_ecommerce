import React, { useEffect, useState } from "react";
import { getAllBook } from "../../api/book";
import BookItem from "../Book/BookItem";
import Heading from "../Common/Heading";
import "../../asset/css/HomePage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
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
      <div className="max-w-[1280px] m-auto">
        <Swiper
          spaceBetween={10}
          slidesPerView={5} // Mỗi lần trượt hiển thị 5 sản phẩm
          modules={[Navigation]}
          navigation
          breakpoints={{
            1440: {
              slidesPerView: 5,
            },
            970: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            360: {
              slidesPerView: 1,
            },
          }}
        >
          {book?.map((item: any) => (
            <SwiperSlide className="" key={item._id}>
              <BookItem data={item} key={item._id}></BookItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BookList;
