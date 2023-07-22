import React from "react";
import "../../asset/css/profile.css";
const UserProfile = () => {
  const getUserData = JSON.parse(localStorage.getItem("userData"));
  const dataUser = getUserData ? getUserData.user : {};
  return (
    <div>
      <section className="information">
        <div className="information-elem">
          <div className="bread-crumnb">
            <span>Home</span>
            <span>&gt;</span>
            <span>Acount</span>
            <span>&gt;</span>
            <span>Information</span>
          </div>
        </div>
        <div className="form-information">
          <form action="">
            <div className="form-item">
              <label htmlFor="">Image</label>
              <img
                src="https://images.hdqwalls.com/wallpapers/thumb/geek-ld.jpg"
                alt=""
              />
            </div>
            <div className="form-item">
              <label htmlFor="">Name</label>
              <input type="text" value={dataUser.name || ""} />
            </div>
            <div className="form-item">
              <label htmlFor="">Email</label>
              <input type="email" value={dataUser.email || ""} />
            </div>
            <a className="handelSubmit-infor" href="">
              Update Information
            </a>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
