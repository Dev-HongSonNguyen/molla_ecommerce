import React from "react";
import BlogItem from "./BlogItem";

const BlogList = () => {
  return (
    <section className="bg-[#f8f8f8]">
      <div className="max-w-[1280px] m-auto py-[30px]">
        <h2 className="pb-[20px]">From Our Blog</h2>
        <div className="grid grid-cols-4 gap-5">
          <BlogItem></BlogItem>
          <BlogItem></BlogItem>
          <BlogItem></BlogItem>
          <BlogItem></BlogItem>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
