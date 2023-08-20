import React, { ReactNode, useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import { useForm } from "react-hook-form";
import { checkout } from "../../api/checkout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RootState } from "../../components/store/configStore";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../components/store/cart/handlers";
const Checkout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();
  const { carts, totalAmount } = useSelector((state: RootState) => state.cart);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const schema = yup.object().shape({
    shippingAddress: yup.string().required("Vui lòng nhập địa chỉ"),
    phoneNumber: yup
      .string()
      .required("Vui lòng nhập số điện thoại")
      .matches(/^(0[0-9]+)$/, "Số điện thoại không đúng định dạng")
      .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
      .max(11, "Số điện thoại không được vượt quá 11 chữ số"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const userDataString = sessionStorage.getItem("userData");
    const getUser = userDataString ? JSON.parse(userDataString) : [];
    const userData = getUser.user;
    setUser(userData);
  }, []);
  const getCart = () => {
    dispatch(fetchCart() as any);
  };
  useEffect(() => {
    void getCart();
  }, [dispatch]);
  const handelCheckout = async (values: any) => {
    setIsAddingToCart(true);
    try {
      const userId = user._id;
      const formData = {
        userId,
        carts,
        ...values,
      };
      const reponse = await checkout(formData);
      toast.success(reponse.data.message);
      localStorage.removeItem("cart");
      localStorage.removeItem("totalAmount");
      navigate("/thank");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const arrayError = Object.values(errors);
    if (arrayError.length > 0) {
      const errorMessage = arrayError[0]?.message as string;
      toast.error(React.createElement("div", null, errorMessage) as ReactNode);
    }
  }, [errors]);
  return (
    <div className="">
      <Banner>Checkout</Banner>
      <section>
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 md:grid-cols-2 pt-10">
          <div className="bg-white">
            <div className="mx-auto max-w-lg px-4 lg:px-8">
              <form
                className="grid grid-cols-6 gap-4"
                onSubmit={handleSubmit(handelCheckout)}
              >
                <div className="col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-xs font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="FirstName"
                    className="mt-1 w-full border border-[#ebebeb] outline-none shadow-sm sm:text-sm p-[10px]"
                    value={user.name}
                  />
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-xs font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="LastName"
                    className="mt-1 w-full border border-[#ebebeb] outline-none shadow-sm sm:text-sm p-[10px]"
                    value={user.email}
                  />
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor=""
                    className="block text-xs font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type=""
                    id="Email"
                    className="mt-1 w-full border border-[#ebebeb] outline-none shadow-sm sm:text-sm p-[10px]"
                    {...register("shippingAddress")}
                  />
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="Phone"
                    className="block text-xs font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="Phone"
                    className="mt-1 w-full border border-[#ebebeb] outline-none shadow-sm sm:text-sm p-[10px]"
                    {...register("phoneNumber")}
                  />
                </div>
                <div className="col-span-6">
                  <button
                    className="block w-full p-3 bg-[#1cc0b0] p-2.5 text-sm text-white transition hover:shadow-lg"
                    disabled={isAddingToCart}
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="flex items-center gap-2 justify-center">
                          <span className="material-icons">cached</span>{" "}
                          <span>Loading...</span>
                        </div>
                      </>
                    ) : (
                      <>Checkout Now</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="bg-[#f8f8f8]">
            <div className="mx-auto max-w-[500px] space-y-8 py-10">
              <div className="flex items-center justify-between">
                <p className="mt-1 text-sm text-gray-600">Total (tax incl.)</p>
                <p className="font-medium tracking-tight text-white bg-[#1cc0a0] font-bold px-4 py-1">
                  ${totalAmount}
                </p>
              </div>
              <div>
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-100">
                    {carts.map((item: any) => {
                      return (
                        <li
                          className="flex items-center gap-4 py-4 bg-[#ffffff] px-[30px] mb-2"
                          key={item._id}
                        >
                          <img
                            src={item.productId.image}
                            alt=""
                            className="w-[50px]"
                          />
                          <div>
                            <h3 className=" text-sm text-gray-900">
                              {item.productId.name}
                            </h3>
                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                              <div className="flex items-center gap-[5px]">
                                <dt className="inline">Price</dt>
                                <dd className="inline">
                                  ${item.productId.price}
                                </dd>
                              </div>
                              <div className="flex items-center gap-[5px]">
                                <dt className="inline">Quantity</dt>
                                <dd className="inline">{item.quantity}</dd>
                              </div>
                              <div className="flex items-center gap-[5px]">
                                <dt className="inline">Total Price</dt>
                                <dd className="inline">${item.totalPrice}</dd>
                              </div>
                            </dl>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
