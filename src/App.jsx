import { useEffect, useMemo, useState } from "react"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import AuthService from "./services/auth.service"
import useAuth from "./hooks/useAuth"
import useConfig from "./hooks/useConfig"
import useSession from "./hooks/useSession"

import Private from "./components/Private"

import Router from "./router"
import theme from "./theme"

import "swiper/css"
import "swiper/css/pagination"
import "./assets/css/_default.css"
import Loader from "./components/Loader"
import Header from "./components/Header"

function App() {
  const [auth, , logout] = useAuth()
  const [session, setSession] = useSession()
  const [config, { setLoading }] = useConfig(true)
  const $Auth = useMemo(() => new AuthService(auth), [auth])

  useEffect(() => {
    if ($Auth.token) {
      ;(async () => {
        const { status, data } = await $Auth.validate()

        if (!status && data !== null && data.response?.status === 401) {
          logout()
        }

        if (status) {
          setSession(data.user)
        }
      })()
    }

    setLoading(false)
  }, [$Auth])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Loader show={config.loading} />
      <BrowserRouter>
        <Header />

        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
