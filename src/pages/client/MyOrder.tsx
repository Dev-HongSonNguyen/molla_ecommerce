import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import { deleteOrder, getAllOrder } from "../../api/checkout";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const MyOrder = () => {
  const [order, setOrder] = useState<any>([]);
  useEffect(() => {
    getAllOrder().then(({ data }) => {
      setOrder(data.orders);
    });
  }, []);
  const formatCreatedAt = (createdAt: any) => {
    const dateObj = new Date(createdAt);
    return format(dateObj, "HH:mm dd/MM/yyyy");
  };
  const DelOrder = (id: string) => {
    try {
      deleteOrder(id).then(() => {
        const newBook = order.filter((item: any) => item._id !== id);
        setOrder(newBook);
        toast.success("Xóa đơn hàng thành công !");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Banner>My Order</Banner>
      <div className="max-w-[1280px] m-auto pt-[30px]">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-center">
          <thead className="bg-[#f8f8f8]">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-[#77777]">
                STT
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-[#77777]">
                Date
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-[#77777]">
                Total Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-[#77777]">
                Status
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-[#77777]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {order.map((item: any, index: any) => {
              return (
                <tr key={item._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {formatCreatedAt(item.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${item.totalAmount}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.paymentStatus}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <Link
                      to={`/order/${item._id}`}
                      className="inline-block rounded bg-[#1cc0a0] px-4 py-2 text-xs font-medium text-white mr-2"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => DelOrder(item._id)}
                      className="inline-block rounded bg-[#1cc0a0] px-4 py-2 text-xs font-medium text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;