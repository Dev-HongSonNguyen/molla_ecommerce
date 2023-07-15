import React from "react";
import "../../asset/css/Auth.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
interface SigninPage {
  onSignin: (data: any) => void;
}
const SigninPage = (props: SigninPage) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitLogin = (data: any) => {
    props.onSignin(data);
    sessionStorage.setItem("userData", JSON.stringify(data));
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
