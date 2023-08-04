import { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import { getOneOrder } from "../../api/checkout";
import { useParams } from "react-router-dom";

const MyOrderDetail = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState<any>([]);
  useEffect(() => {
    getOneOrder(id).then(({ data }) => {
      const carts = data.orders.carts;
      console.log(carts);
      if (Array.isArray(carts)) {
        setOrderDetails(carts);
      } else {
        console.log("Dữ liệu không phải là mảng:", carts);
      }
    });
  }, [id]);
  console.log("orderDetailokkkkk", orderDetails);
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
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-[#77777]">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-[#77777]">
                Quantity
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-[#77777]">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-[#77777]">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orderDetails.map((item: any, index: any) => {
              return (
                <tr key={item._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex justify-center">
                    <img
                      src={item.productId?.image}
                      className="w-[50px] flex items-center justify-center"
                      alt=""
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.productId?.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.quantity}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${item.productId?.price}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${item.totalPrice}
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

export default MyOrderDetail;
