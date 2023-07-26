import React, { useEffect } from "react";
import BookList from "../../components/Book/bookList";
import BannerHomePage from "../../components/Banner/BannerHomePage";
import Service from "../../components/Layout/Service";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../components/store/cart/handlers";

const HomePage = () => {
  const dispatch = useDispatch();
  const getCart = () => {
    dispatch(fetchCart() as any);
  };
  useEffect(() => {
    void getCart();
  }, [dispatch]);
  return (
    <div>
      <BannerHomePage></BannerHomePage>
      <Service></Service>
      <section className="product">
        <BookList></BookList>
      </section>
    </div>
  );
};

export default HomePage;
