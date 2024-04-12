import ReCAPTCHA from "react-google-recaptcha"
import { useMemo, useState, useEffect, useRef } from "react"
import {
  useNavigate,
  useSearchParams,
  Link as RouterLink
} from "react-router-dom"
import EmailIcon from "@mui/icons-material/Email"
import {
  Box,
  Grid,
  Link,
  Alert,
  Button,
  Snackbar,
  TextField,
  InputLabel,
  IconButton,
  Typography,
  InputAdornment,
  Avatar
} from "@mui/material"

import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"
import {
  Https as HttpsIcon,
  Image,
  VisibilityOutlined as VisibilityIcon,
  VisibilityOffOutlined as VisibilityOffIcon
} from "@mui/icons-material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import SliderItem from "../components/SliderItem"
import useAuth from "../hooks/useAuth"

import logoGoogle from "../assets/img/social/logo_google.svg"
import logoFacebook from "../assets/img/social/logo_facebook.svg"
import logoInstagram from "../assets/img/social/logo_instagram.svg"

import backgroundSlider1 from "../assets/img/backgrounds/background_1.svg"
import backgroundSlider2 from "../assets/img/backgrounds/background_2.svg"
import backgroundSlider3 from "../assets/img/backgrounds/background_3.svg"
import imageSlider1 from "../assets/img/slider/auth/group_1.svg"
import imageSlider2 from "../assets/img/slider/auth/group_2.svg"
import imageSlider3 from "../assets/img/slider/auth/group_3.svg"
import AuthService from "../services/auth.service"
import { Container } from "@mui/system"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import { useContext } from "react"
import { MyContext } from "../generalContext/GeneralContext"
const sliderOptions = [
  {
    title: "TRANSFORMA TUS IDEAS EN REALIDAD.",
    description:
      "Calidad y experiencia uniformes en todas las plataformas y dispositivos.",
    background: backgroundSlider3,
    image: imageSlider1
  },
  {
    title: "TRANSFORMA TUS IDEAS EN REALIDAD.",
    description:
      "Calidad y experiencia uniformes en todas las plataformas y dispositivos.",
    background: backgroundSlider2,
    image: imageSlider2
  },
  {
    title: "TRANSFORMA TUS IDEAS EN REALIDAD.",
    description:
      "Calidad y experiencia uniformes en todas las plataformas y dispositivos.",
    background: backgroundSlider1,
    image: imageSlider3
  }
]

const ContainerItem = styled(Grid)(({ theme, overflow }) => ({
  width: "50%",
  backgroundColor: "white",
  ...(overflow ? { maxHeight: "100vh", overflowY: "auto" } : {}),
  [theme.breakpoints.down("md")]: {
    width: "100%",
    ...(overflow ? { maxHeight: "initial", overflowY: "auto" } : {})
  }
}))

export default function Signin() {
  const theme = useTheme()
  const [, setAuth] = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    status: "success"
  })
  const [user, setUser] = useState({ email: "", password: "" })
  const $Auth = useMemo(() => new AuthService(), [])
  const { setActualUser } = useContext(MyContext)
  const reCaptchaRef = useRef()

  const handleChangeUser = (event) => {
    const { name, value } = event.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (token) => {
    let newUser = user
    newUser.Rtoken = token

    const { status, data } = await $Auth.signin(newUser)

    if (status) {
      if (data.message === "Please validate your email first.") {
        setAlert({
          show: true,
          message: "Por favor valida primero tu email",
          status: "error"
        })
        return
      }
      setActualUser(data.user)
      localStorage.setItem("user", JSON.stringify(data.user))
    }
    if (data.message) {
      setAlert({
        show: true,
        message: data.message,
        status: "error"
      })

      return
    }

    $Auth.token = data.token

    if ($Auth.token) {
      setAuth($Auth.token)

      const { status, data } = await $Auth.validate()

      if (status) {
        console.log(data)
        console.log(data)
      }
    } else {
      setAlert({
        show: true,
        message: "Ha ocurrido un error, inténtelo de nuevo.",
        status: "error"
      })
      return
    }
  }

  const handlePreSubmit = async (event) => {
    event.preventDefault()

    reCaptchaRef.current.execute()
  }

  const resetAlert = () => {
    setAlert({ show: false, message: "", status: "success" })
  }

  useEffect(() => {
    let validateEmail = async () => {
      let tokenEmail = searchParams.get("token")

      if (tokenEmail) {
        const { status, data } = await $Auth.validateAccount(tokenEmail)
        if (status) {
          setAlert({
            show: true,
            message: "Email validado con éxito.",
            status: "success"
          })
        } else {
          setAlert({
            show: true,
            message:
              "Ha ocurrido un error al validar el E-mail, contáctate con el administrador.",
            status: "error"
          })
        }
      }
    }

    validateEmail()
  }, [])

  return (
    <Grid
      container
      display="flex"
      sx={{ display: "flex", backgroundColor: "black" }}>
      <img
        src="/star.png"
        alt="stars"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          opacity: "9%",
          zIndex: 35
        }}
      />
      <ContainerItem
        sx={{
          height: "100vh",
          width: "50%",
          position: "relative"
        }}>
        <img
          src="/logoLogin.png"
          alt="logoLogin"
          style={{ position: "absolute", zIndex: 50, top: 20, left: 80 }}
        />

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "100%",
            width: "100%",
            position: "relative",
            backgroundColor: "black"
          }}>
          <div style={{ position: "relative", maxWidth: "70%", zIndex: 50 }}>
            <video
              src="/FONDO-PRINCIPAL-VIDEO.mp4"
              style={{
                width: "100%",
                height: "auto",
                boxShadow:
                  "10px 10px 20px #ab8e3a, -10px -10px 20px #ab8e3a, 10px -10px 20px #ab8e3a, -10px 10px 20px #ab8e3a"
              }}
              autoPlay
              loop
              muted
              type="video/mp4"
            />
            <img
              src="/logo-principal.png"
              alt="Imagen"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 100,
                width: "30%"
              }}
            />
          </div>

          {/* <img
            src="/shape1.png"
            alt="Login"
            style={{
              maxWidth: "80%",
              position: "absolute",
              bottom: 0,
              left: 0
            }}
          /> */}
          <Typography
            sx={{
              position: "absolute",
              zIndex: 50,
              bottom: 60,
              left: 80,
              color: "white",
              fontSize: 25
            }}>
            Welcome Back !
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              zIndex: 50,
              bottom: 40,
              left: 80,
              color: "white",
              fontSize: 15
            }}>
            Watch your data grow from anywhere with remote analytics.{" "}
          </Typography>
        </Box>
      </ContainerItem>

      <Box
        display="flex"
        flexDirection="column"
        padding={4}
        overflow
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 50,
          width: "50%",
          backgroundColor: "rgba(255,255,255,0.05)",
          position: "relative"
        }}>
        <Grid
          flexGrow={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={3}
          maxWidth={550}
          marginX="auto"
          sx={{
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Grid
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{ marginTop: 10, width: "100%" }}>
            <Typography
              variant="h2"
              textAlign="start"
              sx={{ color: "white", marginTop: 5 }}>
              Inicia sesión en tu cuenta.
            </Typography>
            <Typography textAlign="start">
              ¡Bienvenido! Por favor ingresa tus datos de inicio.
            </Typography>
          </Grid>
          <Box
            component="form"
            width="100%"
            onSubmit={handlePreSubmit}
            noValidate>
            <Grid display="flex" flexDirection="column" gap={2}>
              <Grid display="flex" flexDirection="column" gap={1}>
                <InputLabel sx={{ color: "white" }}>Email</InputLabel>
                <TextField
                  name="email"
                  placeholder="Ingresa tu correo"
                  required
                  fullWidth
                  placeholderColor="white"
                  onChange={handleChangeUser}
                  InputProps={{
                    style: {
                      backgroundColor: "black",
                      border: "1px solid white",
                      color: "white"
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}>
                          <EmailIcon style={{ color: "white" }} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid
                display="flex"
                flexDirection="column"
                gap={1}
                justifyContent={"center"}>
                <InputLabel sx={{ color: "white" }}>
                  <span style={{ color: theme.palette.custom.required }}>
                    <img src="/lock.svg" alt="lock.svg" />
                  </span>{" "}
                  Contraseña{" "}
                </InputLabel>
                <TextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  required
                  fullWidth
                  onChange={handleChangeUser}
                  InputProps={{
                    style: {
                      backgroundColor: "black",
                      border: "1px solid white",
                      color: "white"
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}>
                          <LockOpenIcon style={{ color: "white" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}>
                          {showPassword ? (
                            <VisibilityIcon style={{ color: "white" }} />
                          ) : (
                            <VisibilityOffIcon style={{ color: "white" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid container alignItems="center">
                <Grid item md={12} lg={12} textAlign="start">
                  <Link
                    to="/forgot-password"
                    component={RouterLink}
                    color={"#ab8e3a"}>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 2, backgroundColor: "#ab8e3a", color: "black" }}
              fullWidth>
              Log in
            </Button>

            <ReCAPTCHA
              style={{ display: "inline-block" }}
              theme="dark"
              size="invisible"
              onChange={(token) => {
                handleSubmit(token)
              }}
              ref={reCaptchaRef}
              sitekey={import.meta.env.VITE_RECAPCHA}
            />
          </Box>
          <Grid>
            <Typography>
              ¿No tienes cuenta?{" "}
              <Link to="/signup" component={RouterLink} color={"#ab8e3a"}>
                Registrarme
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={alert.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={resetAlert}>
        <Alert severity={alert.status} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Grid>
  )
}
