import { createContext, useEffect, useState } from "react"
import Base64 from "../lib/Base64"

const sessionKey = "session_data"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)

  const logout = () => {
    localStorage.removeItem(Base64.encode(sessionKey))
    setSession(false)
  }

  useEffect(() => {
    setSession(false)

    if (localStorage.getItem(Base64.encode(sessionKey))) {
      setSession(localStorage.getItem(Base64.encode(sessionKey)))
    }
  }, [])

  useEffect(() => {
    if (!localStorage.getItem(Base64.encode(sessionKey)) && session) {
      localStorage.setItem(Base64.encode(sessionKey), session)
    }
  }, [session])

  return (
    <AuthContext.Provider value={[session, setSession, logout]}>
      {children}
    </AuthContext.Provider>
  )
}
