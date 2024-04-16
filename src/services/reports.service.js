import axios from "axios"

export default class ReportService {
  constructor(token = null) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`
    this.token = token
  }

  async getReports(token) {
    try {
      const { data } = await axios.get(
        `${this.API_URL}/subscription/commissions`,
        {
          headers: {
            Authorization: token
          }
        }
      )

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }
  async payComissions(token) {
    try {
      const { data } = await axios.get(
        `${this.API_URL}/subscription/splitpayments`,
        {
          headers: {
            Authorization: token
          }
        }
      )

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }
}
