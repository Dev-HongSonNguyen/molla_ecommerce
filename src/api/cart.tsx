import { Ibook } from "../interface/Ibook";
import instance from "./instance";
const addToCart = (product: Ibook) => {
  return instance.post("/cart", {
    productId: product._id,
    quantity: 1,
  });
};
const getAllCart = () => {
  return instance.get("/cart");
};
const deleteCart = (id: string) => {
  return instance.delete("/cart/" + id);
};
export { addToCart, getAllCart, deleteCart };
