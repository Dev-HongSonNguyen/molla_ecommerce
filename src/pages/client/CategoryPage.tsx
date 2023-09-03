import Banner from "../../components/Banner/Banner";
import { getOneCategory } from "../../api/category";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Ibook } from "../../interface/Ibook";
import Introduce from "../../components/Layout/Introduce";
import jwtDecode from "jwt-decode";
import { addToCart } from "../../api/cart";
import { toast } from "react-toastify";
import { SkeletonProduct } from "../../components/Skeleton";
import ReactPaginate from "react-paginate";
import "../../asset/css/Book.css";
interface DecodedToken {
  _id: string;
}
const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [cate, setCate] = useState<any>();
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  useEffect(() => {
    getOneCategory(id).then(({ data }) => {
      setCate(data.category);
      setBook(data.category.products);
      setLoading(false);
    });
  }, [id]);
  useEffect(() => {
    setTotalPages(Math.ceil(book.length / itemsPerPage));
  }, [book]);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = book.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
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
    <div>
      <Banner>{cate?.name}</Banner>
      <div className="flex justify-start max-w-[1280px] m-auto py-10">
        <div className="flex gap-8">
          <div className="relative">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                <span className="text-sm font-medium"> Availability </span>
                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>
              <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
                <div className="w-96 rounded border border-gray-200 bg-white">
                  <header className="flex items-center justify-between p-4">
                    <span className="text-sm text-gray-700"> 0 Selected </span>
                    <button
                      type="button"
                      className="text-sm text-gray-900 underline underline-offset-4"
                    >
                      Reset
                    </button>
                  </header>
                  <ul className="space-y-1 border-t border-gray-200 p-4">
                    <li>
                      <label
                        htmlFor="FilterInStock"
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          id="FilterInStock"
                          className="h-5 w-5 rounded border-gray-300"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          In Stock (5+)
                        </span>
                      </label>
                    </li>
                    <li>
                      <label
                        htmlFor="FilterPreOrder"
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          id="FilterPreOrder"
                          className="h-5 w-5 rounded border-gray-300"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Pre Order (3+)
                        </span>
                      </label>
                    </li>
                    <li>
                      <label
                        htmlFor="FilterOutOfStock"
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          id="FilterOutOfStock"
                          className="h-5 w-5 rounded border-gray-300"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Out of Stock (10+)
                        </span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </details>
          </div>
          <div className="relative">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                <span className="text-sm font-medium"> Price </span>
                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>
              <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
                <div className="w-96 rounded border border-gray-200 bg-white">
                  <header className="flex items-center justify-between p-4">
                    <span className="text-sm text-gray-700">
                      The highest price is $600
                    </span>
                    <button
                      type="button"
                      className="text-sm text-gray-900 underline underline-offset-4"
                    >
                      Reset
                    </button>
                  </header>
                  <div className="border-t border-gray-200 p-4">
                    <div className="flex justify-between gap-4">
                      <label
                        htmlFor="FilterPriceFrom"
                        className="flex items-center gap-2"
                      >
                        <span className="text-sm text-gray-600">$</span>
                        <input
                          type="number"
                          id="FilterPriceFrom"
                          placeholder="From"
                          className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                        />
                      </label>
                      <label
                        htmlFor="FilterPriceTo"
                        className="flex items-center gap-2"
                      >
                        <span className="text-sm text-gray-600">$</span>
                        <input
                          type="number"
                          id="FilterPriceTo"
                          placeholder="To"
                          className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
      <div className="">
        {loading ? (
          <>
            <div className="grid grid-cols-5 gap-4 max-w-[1280px] mx-auto">
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
            </div>
          </>
        ) : book.length > 0 ? (
          <div className="product-elem">
            {subset.map((item: Ibook) => {
              return (
                <div className="product-elem-item" key={item._id}>
                  <div className="product-elem-item-preview">
                    <Link to={`/product/${item._id}`}>
                      <img src={item?.image} alt="" />
                    </Link>
                  </div>
                  <div className="product-elem-item-info">
                    <a href="" className="category">
                      {cate.name}
                    </a>
                    <a href="" className="name">
                      {item.name}
                    </a>
                    <p>${item.price}</p>
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
                        onClick={() => addCart(item)}
                      >
                        <span className="material-icons">
                          add_shopping_cart
                        </span>
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-[12px] text-[#777777]">
            This category did not have any product !
          </div>
        )}
      </div>
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageChange}
        forcePage={currentPage}
        containerClassName={"pagination-container"}
        activeClassName={"active-page"}
      />
      <Introduce></Introduce>
    </div>
  );
};

export default CategoryPage;
