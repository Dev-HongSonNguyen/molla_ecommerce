import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Image, Modal, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Icategory } from "../../../interface/Icategory";
import { Ibook } from "../../../interface/Ibook";
import { EditOutlined } from "@ant-design/icons";
import { deleteBook, getAllBook } from "../../../api/book";
import "../../../asset/css/HeaderAdmin.css";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { getAllCategory } from "../../../api/category";
import { toast } from "react-toastify";
const BookManagerPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState("");
  const [book, setBook] = useState([]);
  const [category, setCategory] = useState<Icategory[]>([]);
  // call api list book
  useEffect(() => {
    getAllBook().then(({ data }) => {
      const dataBook = data.product;
      setBook(dataBook.docs);
    });
  }, []);
  //call api list category
  useEffect(() => {
    getAllCategory().then(({ data }) => {
      setCategory(data.category);
    });
  }, []);
  const getCategoryName = (categoryId: any) => {
    const cateGetName = category.find(
      (category: any) => category._id === categoryId
    );
    return cateGetName ? cateGetName.name : "No Category";
  };
  // call api delete book
  const DelBook = async (id: string) => {
    try {
      await deleteBook(id).then((response) => {
        const newBook = book.filter((item: any) => item._id !== id);
        setBook(newBook);
        showNotification(response?.data?.message);
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  // render Description
  const renderDescription = (text: any) => {
    const maxLength = 50;
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const showNotification = (message: any) => {
    notification.success({
      message,
      duration: 2,
    });
  };
  const handleDelete = (id: string) => {
    setIsModalVisible(true);
    setProductIdToDelete(id);
  };
  const handleConfirmDelete = async () => {
    await DelBook(productIdToDelete);
    setIsModalVisible(false);
  };
  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  const columns: ColumnsType<Ibook> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} alt="Product Image" width={50} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId) => (
        <span
          style={{
            border: "1px solid #1cc0a0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            padding: "2px",
            color: "#1cc0a0",
            borderRadius: "20px",
          }}
        >
          {getCategoryName(categoryId)}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => renderDescription(text),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
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
            <Link to={`/admin/book/update/${record._id}`}>Update</Link>
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
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </span>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        dataSource={book}
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

export default BookManagerPage;
