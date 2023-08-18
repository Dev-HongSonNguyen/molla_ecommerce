import Banner from "../../components/Banner/Banner";
import "../../asset/css/profile.css";
const UserProfile = () => {
  const userDataString = sessionStorage.getItem("userData");
  const getUserData = userDataString ? JSON.parse(userDataString) : null;
  const dataUser = getUserData ? getUserData.user : {};
  console.log(dataUser);

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
              {dataUser.avatar ? (
                <>
                  <img className="object-cover" src={dataUser.avatar} alt="" />
                </>
              ) : (
                <>
                  <img
                    className="object-cover"
                    src="https://res.cloudinary.com/dwzh9i6xf/image/upload/v1692337906/istockphoto-1337144146-612x612_qclfxb.jpg"
                    alt=""
                  />
                </>
              )}
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
