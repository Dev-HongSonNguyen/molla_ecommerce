import React, { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getAllBlog, updateBlog } from "../../../api/blog";
import { ToastContainer, toast } from "react-toastify";
import { Iblog } from "../../../interface/Iblog";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập vào trường title"),
  image: yup.string().required("Vui lòng nhập vào trường image"),
  extract: yup.string().required("Vui lòng nhập vào trường extract"),
});
const BlogUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    getAllBlog().then(({ data }) => {
      setBlog(data.blog);
    });
  }, []);
  useEffect(() => {
    const currentBook = blog.find((item: any) => item._id == id);
    reset(currentBook);
  }, [blog, id]);
  const updBlog = async (blog: Iblog) => {
    try {
      await updateBlog(blog);
      navigate("/admin/blog");
      toast.success("Chỉnh sửa bài viết thành công");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const onSubmit = (data: any) => {
    updBlog(data);
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
              <label htmlFor="">Title</label>
              <input type="text" id="title" {...register("title")} />
            </div>
            <div className="form-basic-elem-item">
              <label htmlFor="">Extract</label>
              <textarea id="extract" {...register("extract")} />
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
          <button className="form-submit">Update blog</button>
        </form>
        <ToastContainer />
      </section>
    </div>
  );
};

export default BlogUpdatePage;
