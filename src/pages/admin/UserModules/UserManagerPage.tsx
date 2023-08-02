import { Modal, Space, notification } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../../api/user";
import { toast } from "react-toastify";

const UserManagerPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [user, setUser] = useState([]);
  useEffect(() => {
    getAllUsers().then(({ data }) => {
      setUser(data.data);
    });
  }, []);
  const DelUser = async (id: string) => {
    try {
      await deleteUser(id).then(() => {
        const newUser = user.filter((item: any) => item._id !== id);
        setUser(newUser);
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = (id: string) => {
    setIsModalVisible(true);
    setUserIdToDelete(id);
  };
  const handleConfirmDelete = () => {
    DelUser(userIdToDelete);
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
  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
            <Link to={`/admin/user/update/${record._id}`}>Update</Link>
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
        dataSource={user}
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

export default UserManagerPage;
