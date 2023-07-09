import React from "react";
import { Space, Table, Tag, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Icategory } from "../../../interface/Icategory";
import { Iproduct } from "../../../interface/Iproduct";
import { EditOutlined } from "@ant-design/icons";
interface ProductManagerPage {
  cateData: Icategory[];
  bookData: Iproduct[];
}

const ProductManagerPage = (props: ProductManagerPage) => {
  const getCategoryName = (categoryId: any) => {
    const category = props.cateData.find(
      (category) => category._id === categoryId
    );
    return category ? category.name : "";
  };
  const renderDescription = (text: any) => {
    const maxLength = 50;
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const columns: ColumnsType<Iproduct> = [
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
            {" "}
            <EditOutlined />
            Edit
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
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];
  return <Table dataSource={props.bookData} columns={columns} />;
};

export default ProductManagerPage;
