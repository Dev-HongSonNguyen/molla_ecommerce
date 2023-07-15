import instance from "./instance";
const getAllCart = () => {
  return instance.get("/cart");
};
const getOneCart = (id: any) => {
  return instance.get("/cart/" + id);
};
const deleteCart = (id: string) => {
  return instance.delete("/cart/" + id);
};
const updateCart = (cart: any) => {
  return instance.put(`/cart/${cart._id}`, cart);
};
const addCart = (cart: string) => {
  return instance.post("/cart", cart);
};
export { getAllCart, getOneCart, deleteCart, updateCart, addCart };
