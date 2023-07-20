import React, { createContext, useEffect, useState } from "react";
import { Ibook } from "../../interface/Ibook";
import { useNavigate } from "react-router-dom";
import { deleteCart, getAllCart } from "../../api/cart";
import { toast } from "react-toastify";
import { getAllBook } from "../../api/book";
import { Icart } from "../../interface/Icart";
import SvgDelete from "../../components/svg/SvgDelete";
import Banner from "../../components/Banner/Banner";
import "../../asset/css/Cart.css";
const CartPage = () => {
  const [cart, setCart] = useState<Icart[]>([]);
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [book, setBook] = useState<Ibook[]>([]);
  const navigate = useNavigate();
  // call api list book
  useEffect(() => {
    getAllBook().then(({ data }) => {
      const newBook = data.product;
      setBook(newBook.docs);
    });
  }, []);
  console.log("data book", book);
  // call api list cart
  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem("userData"));
    const id = userId?.user._id;
    console.log("id", id);
    if (id !== "") {
      getAllCart(id)
        .then(({ data }) => {
          const totalPrice = data.totalAmount;
          const totalQuatity = data.totalQuantity;
          const cartList = data.carts;
          setCart(cartList);
          setAmount(totalPrice);
          setQuantity(totalQuatity);
        })
        .catch((error) => {
          console.log(error);
          // toast.error(error.response.data.message);
        });
    }
  }, []);
  console.log("data cart", cart);
  const proceedToCheckout = () => {
    // Kiểm tra xem giỏ hàng có dữ liệu hay không
    if (cart.length === 0) {
      // Xử lý trường hợp giỏ hàng trống
      toast.error(
        "Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán."
      );
      return;
    }

    // Lưu thông tin giỏ hàng và tổng giá trị vào Local Storage
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalAmount", JSON.stringify(amount));

    // Điều hướng tới trang checkout
    navigate("/checkout");
  };
  const removeCart = async (id: string) => {
    try {
      deleteCart(id).then(() => {
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
            <table>
              <thead className="">
                <tr className="">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.length > 0 &&
                  cart.map((item: any) => {
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
          </div>
          <div className="content-cart-left">
            <div className="content-cart-left-elem">
              <div className="cart-detailed pb-5">
                <span className="">{quantity} Item</span>
                <span className="cart-detailed-price">{amount}$</span>
              </div>
              <p className="pb-2 text-[14px]">Have a promo code?</p>
              <button className="checkout" onClick={() => proceedToCheckout()}>
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
