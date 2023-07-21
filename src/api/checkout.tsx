import instance from "./instance";
export const checkout = (data: any) => {
  return instance.post("/checkout", data);
};
