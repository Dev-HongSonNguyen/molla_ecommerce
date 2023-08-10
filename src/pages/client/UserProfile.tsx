import Banner from "../../components/Banner/Banner";
import "../../asset/css/profile.css";
const UserProfile = () => {
  const userDataString = sessionStorage.getItem("userData");
  const getUserData = userDataString ? JSON.parse(userDataString) : null;
  const dataUser = getUserData ? getUserData.user : {};

  return (
    <div>
      <Banner>Profile</Banner>
      <section className="information">
        <div className="information-elem">
          <div className="bread-crumnb">
            <span>Home</span>
            <span>&gt;</span>
            <span>Account</span>
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
              <input type="text" defaultValue={dataUser.name || ""} />
            </div>
            <div className="form-item">
              <label htmlFor="">Email</label>
              <input type="email" defaultValue={dataUser.email || ""} />
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
