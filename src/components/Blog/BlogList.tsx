import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import { getAllBlog } from "../../api/blog";
import { Iblog } from "../../interface/Iblog";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Skeleton } from "antd";
import { SkeletonBlog } from "../Skeleton";

const BlogList = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllBlog().then(({ data }) => {
      setBlog(data.blog);
      setLoading(false);
    });
  }, []);
  return (
    <section className="bg-[#f8f8f8]">
      <div className="max-w-[1280px] m-auto py-[30px]">
        <h2 className="pb-[20px]">From Our Blog</h2>
        <div className="">
          <Swiper
            spaceBetween={10}
            slidesPerView={5}
            modules={[Navigation]}
            navigation
            breakpoints={{
              1440: {
                slidesPerView: 4,
              },
              970: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 2,
              },
              360: {
                slidesPerView: 1,
              },
            }}
          >
            {loading ? (
              <>
                <div className="grid grid-cols-4 gap-3">
                  <SkeletonBlog></SkeletonBlog>
                  <SkeletonBlog></SkeletonBlog>
                  <SkeletonBlog></SkeletonBlog>
                  <SkeletonBlog></SkeletonBlog>
                </div>
              </>
            ) : (
              blog.map((item: Iblog) => (
                <SwiperSlide className="" key={item._id}>
                  <BlogItem data={item} key={item._id}></BlogItem>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
