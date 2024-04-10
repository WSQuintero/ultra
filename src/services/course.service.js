import axios from "axios"

export default class CourseService {
  constructor(token = null) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`
    this.token = token
  }

  async createCourse(token, formdata) {
    try {
      const { data } = await axios.post(`${this.API_URL}/academy`, formdata, {
        headers: {
          Authorization: token
        }
      })

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }
  async updateCourse(token, id, formdata) {
    try {
      const { data } = await axios.put(
        `${this.API_URL}/academy/${id}`,
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
  async deleteCourse(token, id) {
    try {
      const myHeaders = new Headers()
      myHeaders.append("Authorization", token)

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      }

      const response = await fetch(
        `${this.API_URL}/academy/delete/${id}`,
        requestOptions
      )
      const data = await response.json()

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }

  async getCourses({ token, category }) {
    try {
      const { data } = await axios.get(`${this.API_URL}/academy/${category}`, {
        headers: {
          Authorization: token
        }
      })

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
  async updateCategory({ token, name }) {
    try {
      const { data } = await axios.post(
        `${this.API_URL}/academy/category`,
        { name },
        {
          headers: {
            Authorization: token
          }
        }
      )

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: error }
    }
  }
}
