import { IMenu } from "../../interface/Imenu";
import { NavLink } from "react-router-dom";
const listMenu: IMenu[] = [
  { path: "/", title: "HOME" },
  { path: "#", title: "SHOP" },
  { path: "#", title: "PRODUCT" },
  { path: "#", title: "BLOG" },
  { path: "#", title: "CONTACT" },
];
const Menu = () => {
  return (
    <div className="header-bottom-nav">
      <div className="header-bottom-nav-menu text-[#ffffff]">
        {listMenu.length > 0 &&
          listMenu.map((item) => (
            <NavLink to={item.path} key={item.title}>
              {item.title}
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default Menu;
{
  /* <div className="header-bottom-nav">
            <ul className="header-bottom-nav-menu">
              <li>
                <a href="/">HOME</a>
              </li>
              <li>
                <a href="">SHOP</a>
              </li>
              <li>
                <a href="">PRODUCT</a>
              </li>
              <li>
                <a href="">PAGES</a>
              </li>
              <li>
                <a href="">BLOGS</a>
              </li>
            </ul>
          </div> */
}
