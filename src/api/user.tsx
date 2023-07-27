import { Iuser } from "../interface/Iuser";
import instance from "./instance";
const getAllUsers = () => {
  return instance.get("/users");
};
const getOneUser = (id: string) => {
  return instance.get("/users/" + id);
};
const deleteUser = (id: string) => {
  return instance.delete("/users/" + id);
};
const updateUser = (user: Iuser) => {
  return instance.put(`/users/${user._id}`, user);
};
export { getAllUsers, getOneUser, deleteUser, updateUser };
