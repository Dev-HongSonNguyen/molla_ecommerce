import React from "react";
import "../../asset/css/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { notification } from "antd";
import { toast } from "react-toastify";
const SigninPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitLogin = async (data: any) => {
    try {
      await axios
        .post("http://localhost:8080/signin", data)
        .then(({ data }) => {
          const userData = data.data;
          const token = data.data.token;
          const role = data.data.user.role;
          sessionStorage.setItem("userData", JSON.stringify(userData));
          sessionStorage.setItem("token", JSON.stringify(token));
          sessionStorage.setItem("role", JSON.stringify(role));
          toast.success("Đăng nhập thành công");
          navigate("/");
        });
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập thất bại");
    }
  };
  return (
    <div>
      <section className="content-form">
        <div className="content-form-elem">
          <h4>Create an Account</h4>
          <form action="" onSubmit={handleSubmit(onSubmitLogin)}>
            <div className="form-item">
              <label htmlFor="">Email</label>
              <input
                type="text"
                placeholder="Your email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="form-item">
              <label htmlFor="">Password</label>
              <input
                type="text"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>
            <button className="btn-submit">Log in</button>
            <div className="note">
              <p>Don't have account?</p>
              <Link to={"/signup"}>Sign up now</Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SigninPage;
