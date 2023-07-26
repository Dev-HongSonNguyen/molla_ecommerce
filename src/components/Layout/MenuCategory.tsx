import React, { useEffect, useState } from "react";
import { Icategory } from "../../interface/Icategory";
import { getAllCategory } from "../../api/category";
import { Link } from "react-router-dom";
const MenuCategory = () => {
  const [category, setCategory] = useState<Icategory[]>([]);
  useEffect(() => {
    getAllCategory().then(({ data }) => {
      setCategory(data.category);
    });
  }, []);
  return (
    <div className="header-bottom-cate">
      <div className="header-bottom-cate-main">
        <span className="material-icons">menu</span>
        <a>BROWSE CATEGORIES</a>
        <span className="material-icons">arrow_drop_down</span>
      </div>
      <div className="header-bottom-cate-dropdown">
        <ul>
          {category.map((cate) => {
            return (
              <li key={cate._id}>
                <Link to={`category/${cate._id}`}>{cate.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MenuCategory;
