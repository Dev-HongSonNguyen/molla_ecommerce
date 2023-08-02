import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsers, updateUser } from "../../../api/user";
import "../../../asset/css/Form.css";
import { toast } from "react-toastify";
const role = ["admin", "member"];
const UserUpdatePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    getAllUsers().then(({ data }) => {
      setUser(data.data);
    });
  }, []);
  const updatRoleUser = async (user: any) => {
    try {
      await updateUser(user);
      navigate("/admin/user");
      toast.success("Cập nhật vai trò thành công");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const getOneUser = user.find((item: any) => item._id === id);
    if (getOneUser) {
      reset(getOneUser);
    }
  }, [user, id]);
  const onSubmit = async (data: any) => {
    updatRoleUser(data);
  };
  return (
    <div>
      <section className="content-main">
        <h1>Update Role User</h1>
        <form action="" className="form-add" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-basic-elem">
            <div className="form-basic-elem-item">
              <select id="role" {...register("role")}>
                {role.map((status: any) => {
                  return (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form-media-elem"></div>
          <button className="form-submit">Update role</button>
        </form>
      </section>
    </div>
  );
};

export default UserUpdatePage;
