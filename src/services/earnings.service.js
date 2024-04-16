import axios from "axios"

export default class EarningsService {
  constructor(token = null) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`
    this.token = token
  }

  async getEarnings(token) {
    try {
      const { data } = await axios.get(`${this.API_URL}/users/comissions`, {
        headers: {
          Authorization: token
        }
      })

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }
}
