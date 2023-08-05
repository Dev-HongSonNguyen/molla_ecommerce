import { Modal, Space, Table, message, notification } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { deleteComment, getAllComment } from "../../../api/comment";
import { format } from "date-fns";
import { getAllUsers } from "../../../api/user";
import { toast } from "react-toastify";
import { getAllBook } from "../../../api/book";
const CommentMangerPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const [book, setBook] = useState([]);
  const [user, setUser] = useState([]);
  const [comment, setComment] = useState([]);
  useEffect(() => {
    getAllComment().then(({ data }) => {
      setComment(data.comment);
    });
  }, []);
  useEffect(() => {
    getAllUsers().then(({ data }) => {
      setUser(data.data);
    });
  }, []);
  useEffect(() => {
    getAllBook().then(({ data }) => {
      const newBook = data.product;
      setBook(newBook.docs);
    });
  }, []);

  const DelComment = async (id: string) => {
    try {
      await deleteComment(id).then((response: any) => {
        const newCate = comment.filter((item: any) => item._id !== id);
        showNotification(response?.data?.message);
        setComment(newCate);
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const getNameUser = (userId: any) => {
    const getName: any = user.find((user: any) => user._id === userId);
    return getName ? getName?.name : "No Name";
  };
  const getNameBook = (productId: any) => {
    const getName: any = book.find((book: any) => book._id === productId);
    return getName ? getName?.name : "No Name";
  };
  const handleDelete = (id: string) => {
    setIsModalVisible(true);
    setCommentIdToDelete(id);
  };
  const handleConfirmDelete = async () => {
    await DelComment(commentIdToDelete);
    setIsModalVisible(false);
  };
  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };
  const showNotification = (message: any) => {
    notification.success({
      message,
      duration: 2,
    });
  };
  const columns: ColumnsType<any> = [
    {
      title: "Product",
      dataIndex: "productId",
      key: "productId",
      render: (productId) => <span>{getNameBook(productId)}</span>,
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => <span>{getNameUser(userId)}</span>,
    },
    {
      title: "Comment",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Date",
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
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
        dataSource={comment}
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

export default CommentMangerPage;
