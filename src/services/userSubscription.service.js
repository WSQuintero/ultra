import axios from "axios";
import Base64 from "../lib/Base64";

let interceptor = null;

export default class AuthService {
  constructor() {
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
  }

  async signin({ email, password, rememberPassword }) {
    try {
      const { data } = await axios.post(`${this.API_URL}/users/login`, { email, password });

      // this.refreshSignin();

      return { status: true, data: data };
    } catch (error) {
      return { status: false, data: "" };
    }
  }
  
  async signup({ fullName, email, password, slug = "JhonatanSanchez" } = {}) {
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.split(" ")[1] || "";
    const slugInvitation = `${firstName}${parseInt(Math.random() * 100)}`;

    try {
      const { data } = await axios.post(`${this.API_URL}/users/register/${slug}`, {
        email,
        firstName,
        lastName,
        password,
        slugInvitation,
      });

      return { status: true, data };
    } catch ({ response }) {
      return { status: false, data: response.data };
    }
  }

  signout() {
    axios.interceptors.request.eject(interceptor);
  }

  refreshSignin() {
    interceptor = axios.interceptors.request.use(
      (config) => config,
      (error) => {
        console.log(error);
        return error;
      }
    );
  }
}
