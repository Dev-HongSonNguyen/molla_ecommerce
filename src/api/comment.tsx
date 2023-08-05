import instance from "./instance";

export const addComment = (comment: any) => {
  return instance.post("/comment", comment);
};
export const getCommentByProductId = (productId: any) => {
  return instance.get(`/comment/${productId}`);
};
export const getAllComment = () => {
  return instance.get("/comment");
};
export const deleteComment = (id: string | undefined) => {
  return instance.delete("/comment/" + id);
};
