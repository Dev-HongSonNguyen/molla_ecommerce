import axios from "axios";
const instance = axios.create({
  baseURL: "https://ckfkp3-8080.csb.app",
  headers: {
    Authorization: `Bearer ${JSON.parse(
      sessionStorage.getItem("token") as string
    )}`,
  },
});
export default instance;
