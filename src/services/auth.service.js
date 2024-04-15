import axios from "axios"

export default class AuthService {
  constructor(token = null) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`
    this.token = token
  }

  async signin({ email, password }) {
    try {
      const { data } = await axios.post(`${this.API_URL}/users/login`, {
        email,
        password
      })

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async recoveryPass({ email }) {
    try {
      const { data } = await axios.post(
        `${this.API_URL}/users/startRecoveryPassword`,
        { email }
      )

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: "" }
    }
  }

  async changePass({ newPassword, token }) {
    try {
      const { data } = await axios.put(
        `${this.API_URL}/users/changePass`,
        { newPassword },
        {
          headers: { Authorization: token }
        }
      )

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: "" }
    }
  }

  async signup({
    firstName,
    slugInvitation,
    slug = "",
    email,
    password,
    phone,
    country,
    municipality,
    lastName
  } = {}) {
    try {
      const { data } = await axios.post(
        `${this.API_URL}/users/register/${slug}`,
        {
          firstName,
          slugInvitation,
          email,
          password,
          phone,
          country,
          municipality,
          lastName
        }
      )

      return { status: true, data }
    } catch ({ response }) {
      return { status: false, data: response.data }
    }
  }

  async validate() {
    if (!this.token) {
      return { status: false, data: null }
    }

    try {
      const { data } = await axios.get(
        `${this.API_URL}/users/validateSession`,
        {
          headers: { Authorization: this.token }
        }
      )

      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async validateAccount(token) {
    try {
      const { data } = await axios.put(
        `${this.API_URL}/users/validateEmail`,
        {},
        {
          headers: { Authorization: token }
        }
      )

      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async generate2FaCode() {
    if (!this.token) {
      return { status: false, data: null }
    }

    try {
      const { data } = await axios.get(
        `${this.API_URL}/users/generate-2fa-code`,
        {
          headers: { Authorization: this.token }
        }
      )

      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async validate2FaCode(g2FaCode) {
    if (!this.token) {
      return { status: false, data: null }
    }

    try {
      const { data } = await axios.post(
        `${this.API_URL}/users/validate-2fa-code`,
        { g2FaCode },
        { headers: { Authorization: this.token } }
      )

      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }
}
