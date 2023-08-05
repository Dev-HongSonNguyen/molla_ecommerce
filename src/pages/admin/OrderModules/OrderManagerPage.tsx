import React, { useEffect, useState } from "react";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Space, Table, Modal, notification } from "antd";
import { ColumnsType } from "antd/es/table";
import { getAllOrder } from "../../../api/checkout";
import { getAllUsers } from "../../../api/user";
import { format } from "date-fns";
const OrderManagerPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    getAllOrder().then(({ data }) => {
      const dataOrder = data.orders;
      setOrder(dataOrder);
    });
  }, []);
  console.log("order", order);
  useEffect(() => {
    getAllUsers().then(({ data }) => {
      setUser(data.data);
    });
  }, []);
  console.log("user", user);
  const getNameUser = (userId: any) => {
    const getName: any = user.find((user: any) => user._id === userId);
    return getName ? getName?.name : "No Name";
  };
  const renderDescription = (text: any) => {
    const maxLength = 50;
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const showNotification = () => {
    notification.success({
      message: "Xóa dữ liệu thành công",
      duration: 2,
    });
  };
  const handleConfirmDelete = () => {
    // DelBook(productIdToDelete);
    setIsModalVisible(false);
    showNotification();
  };
  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };
  const columns: ColumnsType<any> = [
    {
      title: "User Name",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => <span>{getNameUser(userId)}</span>,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (text) => renderDescription(text),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
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
    {
      title: "Purchase Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        const formattedDate = format(
          new Date(createdAt),
          "dd/MM/yyyy - HH:mm:ss"
        );
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <span>
            <Link style={{ color: "#1cc0a0" }} to={`${record._id}`}>
              <EyeOutlined />
            </Link>
          </span>
          <span
            style={{
              backgroundColor: "#1cc0a0",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 10px",
              color: "#ffffff",
            }}
          >
            <EditOutlined />
            <Link to={`/admin/order/update/${record._id}`}>Update</Link>
          </span>
          <span
            style={{
              border: "1px solid #1cc0a0",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 10px",
              color: "#1cc0a0",
              cursor: "pointer",
            }}
            // onClick={() => handleDelete(record._id)}
          >
            Cancel
          </span>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        dataSource={order}
        columns={columns}
        pagination={{ pageSize: 4 }}
        rowKey={(record) => record._id}
      />
      <Modal
        title="Xác nhận xóa"
        open={isModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
      </Modal>
    </>
  );
};

export default OrderManagerPage;
