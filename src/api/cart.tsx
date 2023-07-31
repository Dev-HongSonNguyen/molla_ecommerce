import { Ibook } from "../interface/Ibook";
import instance from "./instance";
const addToCart = (product: Ibook, users: any, quantity: number) => {
  return instance.post("/cart", {
    productId: product._id,
    userId: users._id,
    quantity: quantity || 1,
  });
};
const getAllCart = (idUser: any) => {
  return instance.get("/cart", idUser);
};
const deleteCart = (id: string) => {
  return instance.delete("/cart/" + id);
};
export { addToCart, getAllCart, deleteCart };
