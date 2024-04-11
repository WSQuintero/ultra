import axios from "axios"

export default class LiveService {
  constructor(token = null) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`
    this.token = token
  }

  async createLive(token, formdata) {
    try {
      const { data } = await axios.post(
        `${this.API_URL}/ultraLive/`,
        formdata,
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
  async updateLive(token, id, formdata) {
    try {
      const { data } = await axios.put(
        `${this.API_URL}/ultraLive/${id}`,
        formdata,
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
  async deleteLive(token, id) {
    try {
      const myHeaders = new Headers()
      myHeaders.append("Authorization", token)

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      }

      const response = await fetch(
        `${this.API_URL}/ultraLive/delete/${id}`,
        requestOptions
      )
      const data = await response.json()

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }

  async getLives({ token, category }) {
    try {
      const { data } = await axios.get(`${this.API_URL}/ultraLive`, {
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
