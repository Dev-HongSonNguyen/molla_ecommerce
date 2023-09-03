import { useEffect, useState } from "react";
import { getBookByCategory } from "../../api/book";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import jwtDecode from "jwt-decode";
import { addToCart } from "../../api/cart";
import { toast } from "react-toastify";
import { Ibook } from "../../interface/Ibook";
import { Icategory } from "../../interface/Icategory";
import { SkeletonProduct } from "../Skeleton";
import { getAllCategory } from "../../api/category";
interface DecodedToken {
  _id: string;
}
const BookRelated = ({ categoryId }: { categoryId: string }) => {
  const navigate = useNavigate();
  const [bookRelated, setBookRelated] = useState([]);
  const [category, setCategory] = useState<Icategory[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (categoryId) {
      setLoading(false);
      const getBook = async () => {
        const response = await getBookByCategory(categoryId);
        setBookRelated(response.data.product);
      };
      getBook();
    }
  }, [categoryId]);
  useEffect(() => {
    getAllCategory().then(({ data }) => {
      setCategory(data.category);
    });
  }, []);
  const getCategoryName = (categoryId: any) => {
    const cate = category.find((category) => category._id === categoryId);
    return cate ? cate.name : "No category";
  };
  const getCurrentUserId = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token) as DecodedToken;
      const userId = decodedToken._id;
      return userId;
    }
    return null;
  };
  const addCart = async (product: Ibook) => {
    try {
      const quantity = 1;
      const userId = getCurrentUserId();
      await addToCart(product, userId, quantity);
      toast.success("Thêm sản phẩm vào giỏ hàng thành công");
      navigate("/cart");
    } catch (error) {
      toast.error("Bạn cần đăng nhập");
    }
  };
  return (
    <div className="">
      <Swiper
        spaceBetween={10}
        slidesPerView={5}
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
        {loading ? (
          <>
            <div className="grid grid-cols-5 gap-4">
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
            </div>
          </>
        ) : (
          bookRelated.map((data: any) => {
            return (
              <SwiperSlide className="" key={data._id}>
                <div className="product-elem-item" key={data._id}>
                  <div className="product-elem-item-preview">
                    <Link to={`/product/${data._id}`}>
                      <img src={data?.image} alt="" className="w-[200px]" />
                    </Link>
                  </div>
                  <div className="product-elem-item-info">
                    <a href="" className="category">
                      {getCategoryName(data?.categoryId)}
                    </a>
                    <a href="" className="name">
                      {data?.name}
                    </a>
                    <p>${data?.price}</p>
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
                      <button
                        className="flex items-center gap-2"
                        onClick={() => addCart(data)}
                      >
                        <span className="material-icons">
                          add_shopping_cart
                        </span>
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </div>
  );
};

export default BookRelated;
