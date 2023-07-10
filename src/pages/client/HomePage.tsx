import BannerHomePage from "../../components/Banner/BannerHomePage";
import ServiceComponent from "../../components/Service/ServiceComponent";
import { Ibook } from "../../interface/Ibook";
import { Icategory } from "../../interface/Icategory";
import "../../asset/css/HomePage.css";
import "aos/dist/aos.css";
import AOS from "aos";
interface HomePage {
  bookData: Ibook[];
  cateData: Icategory[];
}
const HomePage = (props: HomePage) => {
  const getCategoryName = (categoryId: any) => {
    const category = props.cateData.find(
      (category: any) => category._id === categoryId
    );
    return category ? category.name : "";
  };
  AOS.init();
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
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1200"
        >
          {props.bookData.map((book) => {
            return (
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
                  <a href="" className="product-elem-item-actions-addtocart">
                    <span className="material-icons">add_shopping_cart</span>
                    <span>ADD TO CART</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
