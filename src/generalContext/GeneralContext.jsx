import { createContext, useMemo, useState } from "react"
import CourseService from "../services/course.service"

const MyContext = createContext()

function GeneralContext({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const $Course = useMemo(() => new CourseService(), [])
  return (
    <MyContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, $Course }}>
      {children}
    </MyContext.Provider>
  )
}

export { GeneralContext, MyContext }
