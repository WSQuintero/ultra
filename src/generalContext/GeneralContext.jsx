import { createContext, useEffect, useMemo, useState } from "react"
import CourseService from "../services/course.service"
import useSession from "../hooks/useSession"
import AuthService from "../services/auth.service"
import useAuth from "../hooks/useAuth"
import LiveService from "../services/live.service"

const MyContext = createContext()

function GeneralContext({ children }) {
  const [auth, , logout] = useAuth()
  const [actualUser, setActualUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const $Auth = useMemo(() => new AuthService(auth), [auth])
  const $Course = useMemo(() => new CourseService(), [])
  const $Live = useMemo(() => new LiveService(), [])

  useEffect(() => {
    setActualUser(JSON.parse(localStorage.getItem("user")))
  }, [])

  return (
    <MyContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        $Course,
        token: $Auth.token,
        actualUser,
        setActualUser,
        $Live
      }}>
      {children}
    </MyContext.Provider>
  )
}

export { GeneralContext, MyContext }
