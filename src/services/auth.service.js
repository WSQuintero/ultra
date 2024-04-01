import axios from "axios";

export default class AuthService {
  constructor(token = null) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
    this.token = token;
  }

  async signin({ email, password, Rtoken, notRefreshToken }) {
    try {
      const { data } = await axios.post(`${this.API_URL}/users/login`, { email, password, Rtoken, notRefreshToken });

      return { status: true, data: data };
    } catch (error) {
      return { status: false, data: "" };
    }
  }
  
  async recoveryPass({ email }) {
    try {
      const { data } = await axios.post(`${this.API_URL}/users/startRecoveryPassword`, { email });

      return { status: true, data: data };
    } catch (error) {
      return { status: false, data: "" };
    }
  } 
  
  async changePass({ newPassword, token }) {
    try {
      const { data } = await axios.put(`${this.API_URL}/users/changePass`, { newPassword }, {
        headers: { Authorization: token },
      });

      return { status: true, data: data };
    } catch (error) {
      return { status: false, data: "" };
    }
  }

  async signup({ fullName, email, cellphone, password, slug = "" } = {}) {
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.split(" ")[1] || "";
    const slugInvitation = `${firstName}${parseInt(Math.random() * 100)}`;

    try {
      const { data } = await axios.post(`${this.API_URL}/users/register/${slug}`, {
        email,
        cellphone,
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

  async validate() {
    if (!this.token) {
      return { status: false, data: null };
    }

    try {
      const { data } = await axios.get(`${this.API_URL}/users/validateSession`, {
        headers: { Authorization: this.token },
      });

      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }
  
  async validateAccount(token) {
    try {
      const { data } = await axios.put(`${this.API_URL}/users/validateEmail`, {}, {
        headers: { Authorization: token },
      });

      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }

  async generate2FaCode() {
    if (!this.token) {
      return { status: false, data: null };
    }

    try {
      const { data } = await axios.get(`${this.API_URL}/users/generate-2fa-code`, {
        headers: { Authorization: this.token },
      });

      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }

  async validate2FaCode(g2FaCode) {
    if (!this.token) {
      return { status: false, data: null };
    }

    try {
      const { data } = await axios.post(
        `${this.API_URL}/users/validate-2fa-code`,
        {g2FaCode},
        { headers: { Authorization: this.token } }
      );

      return { status: true, data };
    } catch (error) {
      return { status: false, data: error };
    }
  }
}
