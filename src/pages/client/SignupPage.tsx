import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../asset/css/Auth.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { notification } from "antd";
import { toast } from "react-toastify";
const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitRegister = async (data: any) => {
    try {
      await axios.post("http://localhost:8080/signup", data);
      toast.success("Đăng ký tài khoản thành công");
      navigate("/signin");
    } catch (error) {
      toast.error("Đăng ký tài khoản thất bại");
    }
  };
  return (
    <div>
      <section className="content-form">
        <div className="content-form-elem">
          <h4>Create an Account</h4>
          <form action="" onSubmit={handleSubmit(onSubmitRegister)}>
            <div className="form-item">
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Your name"
                id="name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="form-item">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Your email"
                id="email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="form-item">
              <label htmlFor="">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                {...register("password", { required: true })}
              />
            </div>
            <div className="form-item">
              <label htmlFor="">ConfirmPassword</label>
              <input
                type="password"
                placeholder="Confirm password"
                id="confirmPassword"
                {...register("confirmPassword", { required: true })}
              />
            </div>
            <button className="btn-submit" type="submit">
              Create an account
            </button>
            <div className="note">
              <p>Already have an account?</p>
              <Link to={"/signin"}>Sign in now</Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
