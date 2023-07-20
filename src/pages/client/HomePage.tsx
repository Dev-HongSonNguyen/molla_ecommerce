import React from "react";
import BookList from "../../components/Book/bookList";
import BannerHomePage from "../../components/Banner/BannerHomePage";
import Service from "../../components/Layout/Service";

const HomePage = () => {
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
