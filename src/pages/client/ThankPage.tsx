import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../components/store/cart/handlers";
import { Link } from "react-router-dom";
const ThankPage = () => {
  const dispatch = useDispatch();
  const getCart = () => {
    dispatch(fetchCart() as any);
  };
  useEffect(() => {
    void getCart();
  }, [dispatch]);
  return (
    <div className="mt-[50px]">
      <div className="bg-white p-6 md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-[#1cc0a0] w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you htmlFor completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <Link
              to={"/"}
              className="px-12 bg-[#1cc0a0] text-white font-semibold py-3"
            >
              GO BACK
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankPage;
