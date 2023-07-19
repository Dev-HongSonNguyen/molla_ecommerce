import instance from "./instance";
const searchProduct = (key: any) => {
  return instance.get(`/search?q=${key}`);
};
export { searchProduct };
