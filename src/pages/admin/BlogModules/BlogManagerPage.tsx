import { Image, Modal, Space, Table, notification } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Iblog } from "../../../interface/Iblog";
import { format } from "date-fns";
import { deleteBlog, getAllBlog } from "../../../api/blog";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const BlogManagerPage = () => {
  const [blog, setBlog] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [blogIdToDelete, setBlogIdToDelete] = useState("");
  const showNotification = (message: any) => {
    notification.success({
      message,
      duration: 2,
    });
  };
  //call api blog
  useEffect(() => {
    getAllBlog().then(({ data }) => {
      setBlog(data.blog);
    });
  }, []);
  const DelBlog = async (id: string) => {
    try {
      await deleteBlog(id).then((response) => {
        const newBook = blog.filter((item: any) => item._id !== id);
        setBlog(newBook);
        showNotification(response?.data?.message);
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const renderDescription = (text: any) => {
    const maxLength = 50;
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const handleDelete = (id: string) => {
    setIsModalVisible(true);
    setBlogIdToDelete(id);
  };
  const handleConfirmDelete = async () => {
    await DelBlog(blogIdToDelete);
    setIsModalVisible(false);
  };
  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };
  const columns: ColumnsType<Iblog> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} alt="Blogt Image" width={50} />,
    },
    {
      title: "Extract",
      dataIndex: "extract",
      key: "extract",
      render: (text) => renderDescription(text),
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
              backgroundColor: "#1cc0a0",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 10px",
              color: "#ffffff",
            }}
          >
            <EditOutlined />
            <Link to={`/admin/blog/update/${record._id}`}>Update</Link>
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
        dataSource={blog}
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

export default BlogManagerPage;
