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
  async getCategories(token, id) {
    try {
      const { data } = await axios.get(
        `${this.API_URL}/academy/categories?product=${id}`,
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

  async createCategory(token, formdata) {
    try {
      const { data } = await axios.post(`${this.API_URL}/academy/category`, formdata, {
        headers: {
          Authorization: token
        }
      })

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }

  async updateCategory(token, id, formdata) {
    try {
      const { data } = await axios.put(
        `${this.API_URL}/academy/category/${id}`,
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

  async upsertCategory({ token, id, name, idRole }) {
    try {
      const { data } = await axios.put(
        `${this.API_URL}/academy/category/${41}`,
        { name, idRole },
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

  async deleteCategory({ token, id }) {
    try {
      const response = await fetch(
        `${this.API_URL}/academy/delete/category/${id}`,
        {
          method: "POST",
          headers: new Headers({
            Authorization: token,
            "Content-Type": "application/json"
          })
        }
      )

      if (!response.ok) {
        throw new Error("Failed to delete category")
      }

      const data = await response.json()

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: error }
    }
  }
}
