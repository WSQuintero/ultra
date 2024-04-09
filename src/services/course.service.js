import axios from "axios"

export default class CourseService {
  constructor(token = null) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`
    this.token = token
  }

  async createCourse(formdata) {
    try {
      const { data } = await axios.put(
        `${this.API_URL}/api/academy`,
        formdata,
        {
          headers: {
            Authorization: this.token,
            redirect: "follow"
          }
        }
      )

      return { status: true, data: data }
    } catch (error) {
      return { status: false, data: "" }
    }
  }
}
