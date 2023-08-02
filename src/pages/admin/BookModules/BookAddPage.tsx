import React, { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Ibook } from "../../../interface/Ibook";
import { Icategory } from "../../../interface/Icategory";
import { ToastContainer, toast } from "react-toastify";
import { addBook } from "../../../api/book";
import { useNavigate } from "react-router-dom";
import { getAllCategory } from "../../../api/category";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../asset/css/Form.css";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập vào trường name"),
  price: yup.number().required("Vui lòng nhập vào trường giá"),
  categoryId: yup.string().required("Vui lòng chọn dannh mục"),
  description: yup.string().required("Vui lòng nhập mô tả"),
  image: yup.string().required("Vui lòng nhập ảnh"),
});

const BookAddPage = () => {
  const [category, setCategory] = useState<Icategory[]>([]);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  // call api addBook
  const addNewBook = async (product: Ibook) => {
    try {
      await addBook(product);
      navigate("/admin/book");
      toast.success("Thêm sản phẩm thành công !");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  // call api category list
  useEffect(() => {
    getAllCategory().then(({ data }) => {
      setCategory(data.category);
    });
  }, []);
  const onSubmit = (data: any) => {
    addNewBook(data);
  };
  useEffect(() => {
    const arrayError = Object.values(errors);
    if (arrayError.length > 0) {
      const errorMessage = arrayError[0]?.message as string;
      toast.error(React.createElement("div", null, errorMessage) as ReactNode);
    }
  }, [errors]);
  return (
    <div>
      <section className="content-main">
        <h1>Add New Product</h1>
        <form action="" className="form-add" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-basic-elem">
            <div className="form-basic-elem-item">
              <label htmlFor="">Product name</label>
              <input type="text" id="name" {...register("name")} />
            </div>
            <div className="form-basic-elem-item">
              <label htmlFor="">Price</label>
              <input type="number" id="price" {...register("price")} />
            </div>
            <div className="form-basic-elem-item">
              <label htmlFor="">Category</label>
              <select id="categoryId" {...register("categoryId")}>
                {category.map((cate) => {
                  return (
                    <option key={cate._id} value={cate._id}>
                      {cate.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-basic-elem-item">
              <label htmlFor="">Description</label>
              <textarea id="description" {...register("description")} />
            </div>
          </div>
          <div className="form-media-elem">
            <div className="form-media-elem-item">
              <img
                src="https://res.cloudinary.com/dwzh9i6xf/image/upload/v1688962909/BookShopMolla/upload_sorws1.svg"
                alt=""
              />
              <label htmlFor="">Image</label>
              <input className="image" type="text" {...register("image")} />
            </div>
          </div>
          <button className="form-submit">Create new product</button>
        </form>
        <ToastContainer />
      </section>
    </div>
  );
};

export default BookAddPage;
