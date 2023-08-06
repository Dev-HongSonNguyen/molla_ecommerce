import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../asset/css/HeaderAdmin.css";
const LayoutAdmin = () => {
  return (
    <div className="">
      <div className="layout">
        <div className="flex h-screen flex-col justify-between border-e bg-white">
          <div className="px-4 py-6">
            <img
              src="https://res.cloudinary.com/dwzh9i6xf/image/upload/v1688837403/BookShopMolla/logo-20_rr19vw.png"
              className="]"
            />

            <ul className="mt-6 space-y-1 menu pt-[20px]">
              <li>
                <Link
                  to={"dashboard"}
                  className="flex cursor-pointer items-center justify-between px-4 py-2 text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000] text-[14px]"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between px-4 py-2 text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]">
                    <span className="text-sm font-medium"> Product </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        to={"book"}
                        className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]"
                      >
                        List Product
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"book/add"}
                        className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]"
                      >
                        Add Product
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between px-4 py-2 text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]">
                    <span className="text-sm font-medium"> Category </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        to={"category"}
                        className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]"
                      >
                        List Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"category/add"}
                        className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]"
                      >
                        Add Category
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between px-4 py-2 text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]">
                    <span className="text-sm font-medium"> Order </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        to={"order"}
                        className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]"
                      >
                        List Order
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between px-4 py-2 text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]">
                    <span className="text-sm font-medium"> User </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        to={"user"}
                        className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]"
                      >
                        List user
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between px-4 py-2 text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]">
                    <span className="text-sm font-medium"> Comment </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        to={"comment"}
                        className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]"
                      >
                        List comment
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between px-4 py-2 text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]">
                    <span className="text-sm font-medium"> Blog </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        to={"blog"}
                        className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]"
                      >
                        List Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"blog/add"}
                        className="block px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#1cc0a0] hover:text-[#000000]"
                      >
                        Add Blog
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link to={"/"}>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-[#1cc0a0] hover:text-[#000000]"
                  >
                    Logout
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="layout-content">
          <div className="layout-content-top"></div>
          <div className="layout-content-between">
            <div className="layout-content-between-box">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
