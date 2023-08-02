import { useForm } from "react-hook-form";
import { Icategory } from "../../../interface/Icategory";
import { addCategory } from "../../../api/category";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../asset/css/Form.css";
const CategoryAddPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  // call api add cate
  const addNewCate = async (cate: Icategory) => {
    try {
      await addCategory(cate);
      navigate("/admin/category");
      toast.success("Thêm danh mục thành công");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const onSubmit = (data: any) => {
    addNewCate(data);
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
