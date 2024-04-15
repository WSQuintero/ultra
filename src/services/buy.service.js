import axios from "axios"

export default class BuyService {
  constructor(token = null) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`
    this.token = token
  }

  async buyMembership(token, idProduct) {
    try {
      const { data } = await axios.post(
        `${this.API_URL}/subscription/buy`,
        { idProduct: String(idProduct) },
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
