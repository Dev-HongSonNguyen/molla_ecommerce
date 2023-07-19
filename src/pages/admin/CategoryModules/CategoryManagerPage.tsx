import React, { useEffect, useState } from "react";
import { Space, Table, Modal, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Icategory } from "../../../interface/Icategory";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { deleteCategory, getAllCategory } from "../../../api/category";
interface CategoyManagerPage {
  cateData: Icategory[];
  setCate: any;
  removeCategory: (id: string) => void;
}
const CategoyManagerPage = () => {
  const [category, setCategory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState("");
  useEffect(() => {
    getAllCategory().then(({ data }) => {
      setCategory(data.category);
    });
  }, []);
  const DelCategory = (id: string) => {
    try {
      deleteCategory(id).then(() => {
        const newCate = category.filter((item: any) => item._id !== id);
        setCategory(newCate);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (id: string) => {
    setIsModalVisible(true);
    setCategoryIdToDelete(id);
  };
  const handleConfirmDelete = () => {
    DelCategory(categoryIdToDelete);
    setIsModalVisible(false);
    showNotification();
  };
  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };
  const showNotification = () => {
    notification.success({
      message: "Xóa dữ liệu thành công",
      duration: 2,
    });
  };
  const columns: ColumnsType<Icategory> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
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
            <Link to={`/admin/category/update/${record._id}`}>Update</Link>
          </a>
          <a
            style={{
              border: "1px solid #1cc0a0",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 10px",
              color: "#1cc0a0",
            }}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        dataSource={category}
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
        <p>Bạn có chắc chắn muốn xóa danh mục này?</p>
      </Modal>
    </>
  );
};

export default CategoyManagerPage;
