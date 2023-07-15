import instance from "./instance";
const signin = (data: any) => {
  return instance.post("/signin", data);
};
const signup = (data: any) => {
  return instance.post("/signup", data);
};
export { signin, signup };
