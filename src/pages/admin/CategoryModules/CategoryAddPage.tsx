import React from "react";
import { useForm } from "react-hook-form";
import { Icategory } from "../../../interface/Icategory";
import "../../../asset/css/Form.css";
interface CategoryAddPage {
  addNewCate: (cate: Icategory) => void;
}
const CategoryAddPage = (props: CategoryAddPage) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data: any) => {
    props.addNewCate(data);
  };
  return (
    <div>
      <section className="content-main">
        <h1>Add New Category</h1>
        <form action="" className="form-add" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-basic-elem">
            <div className="form-basic-elem-item">
              <label htmlFor="">Category name</label>
              <input type="text" id="name" {...register("name")} />
            </div>
            {/* <div className="form-basic-elem-item">
              <label htmlFor="">Price</label>
              <input type="number" id="price" {...register("price")} />
            </div>
            <div className="form-basic-elem-item">
              <label htmlFor="">Description</label>
              <textarea id="description" {...register("description")} />
            </div> */}
          </div>
          <div className="form-media-elem">
            {/* <div className="form-media-elem-item">
              <img
                src="https://res.cloudinary.com/dwzh9i6xf/image/upload/v1688962909/BookShopMolla/upload_sorws1.svg"
                alt=""
              />
              <label htmlFor="">Image</label>
              <input className="image" type="text" {...register("image")} />
            </div> */}
          </div>
          <button className="form-submit">Create new category</button>
        </form>
      </section>
    </div>
  );
};

export default CategoryAddPage;
