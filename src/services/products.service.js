import axios from "axios"

export default class ProductService {
  constructor(token = null) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`
    this.token = token
  }

  async getProducts(token) {
    try {
      const { data } = await axios.get(`${this.API_URL}/products`, {
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
