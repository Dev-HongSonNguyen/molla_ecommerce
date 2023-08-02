import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../../asset/css/Form.css";
import { getAllOrder, updateOrder } from "../../../api/checkout";
import { toast } from "react-toastify";
const Status = [
  "Pending confirmation",
  "Processing",
  "Out for delivery",
  "Delivered successfully",
  "Delivery failed",
  "Cancelled",
];

const OrderUpdatePage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    getAllOrder().then(({ data }) => {
      setOrder(data.orders);
    });
  }, []);
  const updateOrderStatus = async (order: any) => {
    try {
      await updateOrder(order);
      navigate("/admin/order");
      toast.success("Cập nhật trạng thái thành công");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getOneOrder = order.find((item: any) => item._id === id);
    if (getOneOrder) {
      reset(getOneOrder);
    }
  }, [order, id]);
  const onSubmit = async (data: any) => {
    await updateOrderStatus(data);
  };
  return (
    <div>
      <section className="content-main">
        <h1>Update Status Order</h1>
        <form action="" className="form-add" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-basic-elem">
            <div className="form-basic-elem-item">
              <select id="paymentStatus" {...register("paymentStatus")}>
                {Status.map((status: any) => {
                  return (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* {...register("paymentStatus")} */}
          </div>
          <div className="form-media-elem"></div>
          <button className="form-submit">Update status</button>
        </form>
      </section>
    </div>
  );
};

export default OrderUpdatePage;
