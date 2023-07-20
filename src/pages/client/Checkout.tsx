import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import "../../asset/css/Cart.css";

const Checkout = () => {
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Lấy dữ liệu từ Local Storage khi component được render
    const storedCartData = JSON.parse(localStorage.getItem("cart")) || [];
    const storedTotalAmount =
      JSON.parse(localStorage.getItem("totalAmount")) || 0;

    // Lưu dữ liệu vào state
    setCartData(storedCartData);
    setTotalAmount(storedTotalAmount);
  }, []);
  console.log(cartData, totalAmount);

  return (
    <div className="">
      <Banner>Checkout</Banner>
      <section>
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 md:grid-cols-2 pt-10">
          <div className="bg-white">
            <div className="mx-auto max-w-lg px-4 lg:px-8">
              <form className="grid grid-cols-6 gap-4">
                {cartData.map((item: any) => {
                  return (
                    <>
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
                          value={item.userId.name}
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
                          value={item.userId.email}
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="Email"
                          className="block text-xs font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <input
                          type="email"
                          id="Email"
                          className="mt-1 w-full border border-[#ebebeb] outline-none shadow-sm sm:text-sm p-[10px]"
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
                        />
                      </div>
                      <div className="col-span-6">
                        <button className="block w-full p-3 bg-[#1cc0b0] p-2.5 text-sm text-white transition hover:shadow-lg">
                          Pay Now
                        </button>
                      </div>
                    </>
                  );
                })}
              </form>
            </div>
          </div>

          <div className="bg-[#f8f8f8]">
            <div className="mx-auto max-w-[500px] space-y-8 py-10">
              <div className="flex items-center justify-between">
                <p className="mt-1 text-sm text-gray-600">Total (tax incl.)</p>
                <p className="font-medium tracking-tight text-gray-900">
                  ${totalAmount}
                </p>
              </div>
              <div>
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-100">
                    {cartData.map((item: any) => (
                      <li
                        className="flex items-center gap-4 py-4"
                        key={item.productId._id}
                      >
                        <img
                          src={item.productId.image}
                          alt={item.productId.name}
                          className="w-[50px]"
                        />
                        <div>
                          <h3 className=" text-sm text-gray-900">
                            {item.productId.name}
                          </h3>
                          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
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
                    ))}
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
