import { Iblog } from "../interface/Iblog";
import instance from "./instance";
const getAllBlog = () => {
  return instance.get("/blog");
};
const getOneBlog = (id: string | undefined) => {
  return instance.get("/blog/" + id);
};
const deleteBlog = (id: string | undefined) => {
  return instance.delete("/blog/" + id);
};
const updateBlog = (blog: Iblog) => {
  return instance.put(`/blog/${blog._id}`, blog);
};
const addBlog = (blog: Iblog) => {
  return instance.post("/blog", blog);
};
export { getAllBlog, getOneBlog, deleteBlog, updateBlog, addBlog };
