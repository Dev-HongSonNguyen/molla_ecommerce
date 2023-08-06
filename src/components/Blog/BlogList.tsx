import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { getAllBlog } from "../../api/blog";
import { Iblog } from "../../interface/Iblog";

const BlogList = () => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    getAllBlog().then(({ data }) => {
      setBlog(data.blog);
    });
  }, []);
  return (
    <section className="bg-[#f8f8f8]">
      <div className="max-w-[1280px] m-auto py-[30px]">
        <h2 className="pb-[20px]">From Our Blog</h2>
        <div className="grid grid-cols-4 gap-5">
          {blog.map((item: Iblog) => (
            <BlogItem data={item} key={item._id}></BlogItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
