import React, { useEffect, useState } from "react";
import { Ibook } from "../../interface/Ibook";
import jwtDecode from "jwt-decode";
import { addToCart } from "../../api/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCategory } from "../../api/category";
import { Icategory } from "../../interface/Icategory";
import { Link } from "react-router-dom";
import { LoadingButton } from "../Common";
interface DecodedToken {
  _id: string;
}
const BookItem = ({ data }: { data: Ibook }) => {
  const [category, setCategory] = useState<Icategory[]>([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();
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
    setIsAddingToCart(true);
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
    <div className="product-elem-item">
      <div className="product-elem-item-preview">
        <Link to={`/product/${data._id}`}>
          <img className="" src={data?.image} alt="" />
        </Link>
      </div>
      <div className="product-elem-item-info">
        <Link to={`category/${data.categoryId}`} className="category">
          {getCategoryName(data?.categoryId)}
        </Link>
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
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <>
                <LoadingButton></LoadingButton>
              </>
            ) : (
              <>
                <span className="material-icons">add_shopping_cart</span> ADD TO
                CART
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
