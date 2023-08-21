import React, { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton, LoadingSearch } from "../../components/Common";
const schema = yup.object().shape({
  email: yup.string().required("Vui lòng nhập vào trường email"),
  password: yup.string().required("Vui lòng nhập password"),
});

const SigninPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const onSubmitLogin = async (data: any) => {
    try {
      await axios
        .post("https://ckfkp3-8080.csb.app/signin", data)
        .then(({ data }) => {
          const userData = data.data;
          const token = data.data.token;
          const role = data.data.user.role;
          sessionStorage.setItem("userData", JSON.stringify(userData));
          sessionStorage.setItem("token", JSON.stringify(token));
          sessionStorage.setItem("role", JSON.stringify(role));
          setTimeout(() => {
            window.location.reload();
          }, 500);
          toast.success("Đăng nhập thành công");
          navigate("/");
        });
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
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>
            <button className="btn-submit">Login</button>
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
