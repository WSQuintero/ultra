import axios from "axios"

export default class UserService {
  constructor(token) {
    this.token = token
    this.API_URL = `${import.meta.env.VITE_API_URL}`
  }

  async get({ token } = {}) {
    try {
      // if (id) {
      //   const { data } = await axios.get(`${this.API_URL}/users/${id}`, {
      //     headers: { Authorization: this.token }
      //   })
      //   return { status: true, data }
      // }

      const { data } = await axios.get(`${this.API_URL}/users`, {
        headers: { Authorization: token }
      })

      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async updateUser({ user, subrole, token }) {
    try {
      const { data } = await axios.put(
        `${this.API_URL}/subRoles/addUser`,
        {
          user: user,
          subrole: subrole
        },
        { headers: { Authorization: token } }
      )
      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async getRoles({ token }) {
    try {
      const { data } = await axios.get(`${this.API_URL}/subRoles`, {
        headers: { Authorization: token }
      })
      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }
  async resendEmail({ idUser }) {
    try {
      const { data } = await axios.put(
        `${this.API_URL}/users/resendEmail`,
        { idUser },
        { headers: { Authorization: this.token } }
      )
      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async updateWallet({ walletAddress, password }) {
    try {
      const { data } = await axios.put(
        `${this.API_URL}/users/changeWallet`,
        { walletAddress, password },
        { headers: { Authorization: this.token } }
      )
      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async changeAdminPass({ idUser, password, newPassword }) {
    try {
      const { data } = await axios.put(
        `${this.API_URL}/users/changePassAdmin`,
        { idUser, password, newPassword },
        { headers: { Authorization: this.token } }
      )
      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async changeParent({ idUser, password, parent, email }) {
    try {
      const { data } = await axios.put(
        `${this.API_URL}/users/changeParent`,
        { idUser, password, parent, email },
        { headers: { Authorization: this.token } }
      )
      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async changeAvatar({ avatar }) {
    try {
      const formData = new FormData()
      formData.append("image", avatar)

      const { data } = await axios.post(
        `${this.API_URL}/users/photoProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.token
          }
        }
      )
      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async withdrawal({ amount, origin }) {
    try {
      const { data } = await axios.post(
        `${this.API_URL}/users/withdrawal`,
        { amount, origin },
        { headers: { Authorization: this.token } }
      )
      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async reinvest({ amount, origin }) {
    try {
      const { data } = await axios.post(
        `${this.API_URL}/users/reinvest`,
        { amount, origin },
        { headers: { Authorization: this.token } }
      )
      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async getWithdrawals() {
    try {
      const { data } = await axios.get(`${this.API_URL}/users/withdrawals`, {
        headers: { Authorization: this.token }
      })
      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }

  async getWithdrawalsAll() {
    try {
      const { data } = await axios.get(
        `${this.API_URL}/users/withdrawals-all`,
        { headers: { Authorization: this.token } }
      )
      return { status: true, data }
    } catch (error) {
      return { status: false, data: error }
    }
  }
}
