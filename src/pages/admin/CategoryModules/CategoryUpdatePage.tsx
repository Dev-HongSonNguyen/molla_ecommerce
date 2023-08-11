import React, { useEffect, useState } from "react";
import { getAllCategory, updateCategory } from "../../../api/category";
import { useNavigate, useParams } from "react-router-dom";
import { Icategory } from "../../../interface/Icategory";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "../../../asset/css/Form.css";
const CategoryUpdatePage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [category, setCategory] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getAllCategory().then(({ data }) => {
      setCategory(data.category);
    });
  }, []);
  const updateCate = async (cate: Icategory) => {
    try {
      await updateCategory(cate);
      navigate("/admin/category");
      toast.success("Update danh mục thành công");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const resetCate = category.find((item: any) => item._id === id);
    if (resetCate) {
      reset(resetCate);
    }
  }, [category, id]);
  const onSubmit = (data: any) => {
    updateCate(data);
  };
  return (
    <div>
      <section className="content-main">
        <h1>Update Category</h1>
        <form action="" className="form-add" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-basic-elem">
            <div className="form-basic-elem-item">
              <label htmlFor="">Category name</label>
              <input type="text" id="name" {...register("name")} />
            </div>
          </div>
          <div className="form-media-elem"></div>
          <button className="form-submit">Update category</button>
        </form>
      </section>
    </div>
  );
};

export default CategoryUpdatePage;
