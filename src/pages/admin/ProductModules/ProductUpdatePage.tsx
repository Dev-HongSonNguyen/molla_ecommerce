import React from "react";
import "../../../asset/css/Form.css";
const ProductUpdatePage = () => {
  return (
    <div>
      <section className="content-main">
        <h1>Update Product</h1>
        <form action="" className="form-add">
          <div className="form-basic-elem">
            <div className="form-basic-elem-item">
              <label htmlFor="">Product name</label>
              <input type="text" />
            </div>
            <div className="form-basic-elem-item">
              <label htmlFor="">Price</label>
              <input type="text" />
            </div>
            <div className="form-basic-elem-item">
              <label htmlFor="">Category</label>
              <select name="" id="">
                <option value="">Select to category</option>
                <option value="">Select to category 2</option>
                <option value="">Select to category 3</option>
              </select>
            </div>
            <div className="form-basic-elem-item">
              <label htmlFor="">Description</label>
              <textarea
                className=""
                name=""
                id=""
                cols={30}
                rows={10}
              ></textarea>
            </div>
          </div>
          <div className="form-media-elem">
            <div className="form-media-elem-item">
              <img
                src="https://res.cloudinary.com/dwzh9i6xf/image/upload/v1688962909/BookShopMolla/upload_sorws1.svg"
                alt=""
              />
              <label htmlFor="">Image</label>
              <input type="text" />
            </div>
          </div>
          <button className="form-submit">Create new product</button>
        </form>
      </section>
    </div>
  );
};

export default ProductUpdatePage;
