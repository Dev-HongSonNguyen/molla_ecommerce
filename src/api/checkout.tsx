import instance from "./instance";
export const checkout = (data: any) => {
  return instance.post("/checkout", data);
};
export const getAllOrder = () => {
  return instance.get("/checkout");
};
export const getOneOrder = (id: any) => {
  return instance.get("/checkout/" + id);
};
export const deleteOrder = (id: any) => {
  return instance.delete("/checkout/" + id);
};
