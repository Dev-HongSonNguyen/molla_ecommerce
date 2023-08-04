import React, { useEffect, useState } from "react";
import { getOneOrder } from "../../../api/checkout";
import { getAllBook } from "../../../api/book";
import { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";
import { Table, Image } from "antd";
import { Ibook } from "../../../interface/Ibook";

const OrderDetailPage = () => {
  const [orderDetail, setOrderDetail] = useState<any>([]);
  const [book, setBook] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getAllBook().then(({ data }) => {
      const dataBook = data.product;
      setBook(dataBook.docs);
    });
  }, []);

  useEffect(() => {
    getOneOrder(id).then(({ data }) => {
      const carts = data.orders.carts;
      console.log(carts);
      if (Array.isArray(carts)) {
        setOrderDetail(carts);
      } else {
        console.log("Dữ liệu không phải là mảng:", carts);
      }
    });
  }, [id]);
  console.log("orderDetail", orderDetail);
  const getNameBook = (productId: any) => {
    const getName: any = book.find((item: any) => item._id === productId._id);
    console.log("getName", getName);
    return getName ? getName.name : "No Name";
  };
  const getImageBook = (productId: any) => {
    const getImage: any = book.find((item: any) => item._id === productId._id);
    console.log("getImage", getImage);
    return getImage ? getImage.image : "No Name";
  };
  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: "User Name",
      dataIndex: "productId",
      key: "productId",
      render: (productId) => <span>{getNameBook(productId)}</span>,
    },
    {
      title: "Image",
      dataIndex: "productId",
      key: "productId",
      render: (productId) => (
        <Image src={getImageBook(productId)} alt="Product Image" width={50} />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (amount) => (
        <span
          style={{
            fontWeight: "bold",
            color: "#1cc0a0",
          }}
        >
          ${amount}
        </span>
      ),
    },
  ];
  return (
    <>
      <Table
        dataSource={orderDetail}
        columns={columns}
        pagination={{ pageSize: 4 }}
        rowKey={(record) => record._id}
      />
    </>
  );
};

export default OrderDetailPage;
