import axios from "axios"

export default class CourseService {
  constructor(token = null) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`
    this.token = token
  }

  async createCourse(token, formdata) {
    try {
      const { data } = await axios.post(
        `${this.API_URL}/academy/category`,
        formdata,
        {
          headers: {
            Authorization: this.token
            // redirect: "follow"
          }
        }
      )

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }
  async getCategories(token) {
    try {
      const { data } = await axios.get(`${this.API_URL}/academy/categories`, {
        headers: {
          Authorization: token
        }
      })

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: error }
    }
  }
}
