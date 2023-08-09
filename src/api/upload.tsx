import instance from "./instance";

export const uploadImage = (data: any) => {
  return instance.post(`/images/upload`, data);
};
export const deleteImage = (publicId: any) => {
  return instance.delete(`/images/${publicId}`);
};
