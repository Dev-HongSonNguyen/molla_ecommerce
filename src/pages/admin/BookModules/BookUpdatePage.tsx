import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { getAllBook, updateBook } from "../../../api/book";
import { toast } from "react-toastify";
import { getAllCategory } from "../../../api/category";
import { Ibook } from "../../../interface/Ibook";
import "../../../asset/css/Form.css";
const BookUpdatePage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [book, setBook] = useState([]);
  const [category, setCategory] = useState([]);
  const { id } = useParams();
  // call api list book
  useEffect(() => {
    getAllBook().then(({ data }) => {
      const dataBook = data.product;
      setBook(dataBook.docs);
    });
  }, []);
  // call api list cate
  useEffect(() => {
    getAllCategory().then(({ data }) => {
      setCategory(data.category);
    });
  }, []);
  // call api update book
  const updBook = async (book: Ibook) => {
    try {
      await updateBook(book);
      navigate("/admin/book");
      toast.success("Update sản phẩm thành công");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const currentBook = book.find((item: any) => item._id == id);
    reset(currentBook);
  }, [book, id]);
  const onSubmit = (data: any) => {
    updBook(data);
  };
  return (
    <div>
      <section className="content-main">
        <h1>Update Product</h1>
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
                {category.map((cate: any) => {
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
          <button className="form-submit">Update product</button>
        </form>
      </section>
    </div>
  );
};

export default BookUpdatePage;
