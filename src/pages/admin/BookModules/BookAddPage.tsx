import React from "react";
import { useForm } from "react-hook-form";
import { Ibook } from "../../../interface/Ibook";
import { Icategory } from "../../../interface/Icategory";
import "../../../asset/css/Form.css";
interface BookAddPage {
  addNewBook: (book: Ibook) => void;
  cateData: Icategory[];
}
const BookAddPage = (props: BookAddPage) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data: any) => {
    props.addNewBook(data);
  };
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
                {props.cateData.map((cate) => {
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
      </section>
    </div>
  );
};

export default BookAddPage;
