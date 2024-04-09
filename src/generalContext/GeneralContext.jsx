import { createContext, useEffect, useMemo, useState } from "react"
import CourseService from "../services/course.service"
import useSession from "../hooks/useSession"
import AuthService from "../services/auth.service"
import useAuth from "../hooks/useAuth"

const MyContext = createContext()

function GeneralContext({ children }) {
  const [auth, , logout] = useAuth()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const $Auth = useMemo(() => new AuthService(auth), [auth])
  const $Course = useMemo(() => new CourseService(), [])

  return (
    <MyContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        $Course,
        token: $Auth.token
      }}>
      {children}
    </MyContext.Provider>
  )
}

export { GeneralContext, MyContext }
