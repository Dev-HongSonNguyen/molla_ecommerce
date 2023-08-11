import React, { createContext, useEffect, useState } from "react";
import { Ibook } from "../../interface/Ibook";
import { useNavigate } from "react-router-dom";
import { deleteCart, getAllCart } from "../../api/cart";
import { toast } from "react-toastify";
import { getAllBook } from "../../api/book";
import { Icart } from "../../interface/Icart";
import SvgDelete from "../../components/svg/SvgDelete";
import Banner from "../../components/Banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../components/store/cart/handlers";
import { RootState } from "../../components/store/configStore";
import { LoadingButton } from "../../components/Common";
const CartPage = () => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<Icart[]>([]);
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [book, setBook] = useState<Ibook[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { carts, totalAmount, totalQuantity } = useSelector(
    (state: RootState) => state.cart
  );
  const getCart = () => {
    dispatch(fetchCart() as any);
  };
  useEffect(() => {
    void getCart();
  }, [dispatch]);

  useEffect(() => {
    getAllBook().then(({ data }) => {
      const newBook = data.product;
      setBook(newBook.docs);
    });
  }, []);
  const proceedToCheckout = () => {
    setLoading(true);
    if (carts.length === 0) {
      toast.error(
        "Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán."
      );
      return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalAmount", JSON.stringify(amount));
    navigate("/checkout");
  };
  const removeCart = async (id: string) => {
    try {
      deleteCart(id).then(() => {
        getCart();
        const newCart = cart.filter((item: any) => item._id !== id);
        toast.success("Xóa sản phẩm thành công");
        setCart(newCart);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Banner>Cart</Banner>
      <section className="content-cart">
        <div className="content-cart-elem">
          <div className="content-cart-right">
            {carts.length > 0 ? (
              <table>
                <thead className="bg-[#f8f8f8] px-3">
                  <tr className="">
                    <th className="py-3">Image</th>
                    <th className="py-3">Name</th>
                    <th className="py-3">Price</th>
                    <th className="py-3">Quantity</th>
                    <th className="py-3">Total</th>
                    <th className="py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.length > 0 &&
                    carts.map((item: any) => {
                      console.log(item);
                      const product = book.find((book) => {
                        return book._id === item.productId._id;
                      });
                      return (
                        <tr key={item._id}>
                          <td>
                            <img
                              style={{ width: "50px" }}
                              src={product?.image}
                              alt=""
                            />
                          </td>
                          <td>{product?.name}</td>
                          <td>${product?.price}</td>
                          <td>{item.quantity}</td>
                          <td>${item.totalPrice}</td>
                          <td>
                            <button onClick={() => removeCart(item._id)}>
                              <SvgDelete></SvgDelete>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <div className="bg-[#f8f8f8]">
                <div className="pt-6 pb-8">
                  <p className="text-center text-[12px]">
                    There are no products in the cart!
                  </p>
                  <img
                    className="max-w-[100px] mx-auto"
                    src="https://dominos.vn/img/illustration/empty-cart.svg"
                    alt=""
                  />
                </div>
              </div>
            )}
          </div>
          <div className="content-cart-left">
            <div className="content-cart-left-elem">
              <div className="cart-detailed pb-5">
                <span className="">{totalQuantity} Item</span>
                <span className="cart-detailed-price">{totalAmount}$</span>
              </div>
              <p className="pb-2 text-[14px]">Have a promo code?</p>
              <button
                className="checkout"
                onClick={() => proceedToCheckout()}
                disabled={loading}
              >
                {loading ? (
                  <LoadingButton></LoadingButton>
                ) : (
                  <>Proceed To Checkout</>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
