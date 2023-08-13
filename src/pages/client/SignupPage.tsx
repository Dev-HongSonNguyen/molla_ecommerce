import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../asset/css/Auth.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "../../components/Common";
const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập vào trường name"),
  email: yup.string().required("Vui lòng nhập vào trường email"),
  password: yup.string().required("Vui lòng nhập password"),
  confirmPassword: yup.string().required("Vui lòng nhập lại password"),
});

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const onSubmitRegister = async (data: any) => {
    try {
      await axios.post("https://ckfkp3-8080.csb.app/signup", data);
      toast.success("Đăng ký tài khoản thành công");
      navigate("/signin");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
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
