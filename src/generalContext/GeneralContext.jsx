import { createContext, useState } from "react"

const MyContext = createContext()

function GeneralContext({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <MyContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </MyContext.Provider>
  )
}

export { GeneralContext, MyContext }
