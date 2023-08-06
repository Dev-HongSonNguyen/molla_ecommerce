import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import React, { ReactNode, useEffect } from "react";
import { Iblog } from "../../../interface/Iblog";
import { addBlog } from "../../../api/blog";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập vào trường title"),
  image: yup.string().required("Vui lòng nhập vào trường image"),
  extract: yup.string().required("Vui lòng nhập vào trường extract"),
});
const BlogAddPage = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const addNewBlog = async (blog: Iblog) => {
    try {
      await addBlog(blog);
      navigate("/admin/blog");
      toast.success("Thêm bài viết thành công !");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const onSubmit = (data: any) => {
    addNewBlog(data);
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
          <button className="form-submit">Create new blog</button>
        </form>
        <ToastContainer />
      </section>
    </div>
  );
};

export default BlogAddPage;
