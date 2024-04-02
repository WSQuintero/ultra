import { useMemo, useState } from "react"
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  Navigate
} from "react-router-dom"
import {
  Box,
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  InputAdornment,
  Link,
  InputLabel,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"
import {
  AccountCircleOutlined as AccountCircleIcon,
  HttpsOutlined as HttpsIcon,
  VisibilityOutlined as VisibilityIcon,
  VisibilityOffOutlined as VisibilityOffIcon,
  SupervisorAccountRounded as StarIcon
} from "@mui/icons-material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import AuthService from "../services/auth.service"
import SliderItem from "../components/SliderItem"

import backgroundSlider1 from "../assets/img/backgrounds/background_1.svg"
import backgroundSlider2 from "../assets/img/backgrounds/background_2.svg"
import backgroundSlider3 from "../assets/img/backgrounds/background_3.svg"
import imageSlider1 from "../assets/img/slider/auth/group_1.svg"
import imageSlider2 from "../assets/img/slider/auth/group_2.svg"
import imageSlider3 from "../assets/img/slider/auth/group_3.svg"
import { Container } from "@mui/system"
import EmailIcon from "@mui/icons-material/Email"

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

export default function Signup() {
  const navigate = useNavigate()
  const params = useParams()
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    status: "success"
  })
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    cellphone: "",
    password: "",
    confirmPassword: "",
    slug: params.slug
  })
  const [checked, setChecked] = useState(false)
  const $Auth = useMemo(() => new AuthService(), [])

  const handleChangeUser = (event) => {
    const { name, value } = event.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      !(
        user.fullName &&
        user.email &&
        user.cellphone &&
        user.password &&
        user.confirmPassword
      )
    ) {
      setAlert({
        show: true,
        message: "Todos los campos son obligatorios.",
        status: "error"
      })

      return
    }

    if (!checked) {
      setAlert({
        show: true,
        message:
          "Debes aceptar Térmimos, condiciones y políticas de privacidad para poder continuar.",
        status: "error"
      })

      return
    }

    if (user.password !== user.confirmPassword) {
      setAlert({
        show: true,
        message: "Las contraseñas no coinciden",
        status: "error"
      })

      return
    }

    const { status } = await $Auth.signup(user)

    if (status) {
      setAlert({
        show: true,
        message: "Registro exitoso. Puedes iniciar sesión.",
        status: "success"
      })

      navigate("/signin")
    }
  }

  const resetAlert = () => {
    setAlert({ show: false, message: "", status: "success" })
  }

  return (
    <Grid container minHeight="100vh">
      <ContainerItem
        sx={{
          backgroundColor: "#9a8034",
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
            backgroundColor: "#9a8034",
            height: "100%",
            width: "100%",
            position: "relative"
          }}>
          <img
            src="/shape.png"
            alt="Login"
            style={{ maxWidth: "80%", position: "absolute", top: 0, right: 0 }}
          />
          <img
            src="/imageLogin.png"
            alt="Login"
            style={{ maxWidth: "60%", zIndex: 50 }}
          />
          <img
            src="/shape1.png"
            alt="Login"
            style={{
              maxWidth: "80%",
              position: "absolute",
              bottom: 0,
              left: 0
            }}
          />
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
      <ContainerItem display="flex" flexDirection="column">
        <Container
          display="flex"
          flexDirection="column"
          padding={4}
          overflow
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: "#010a1e",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            overflow: "auto"
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
            paddingBottom={5}>
            <Grid marginBottom={3}></Grid>
            <Grid display="flex" flexDirection="column" gap={2}>
              <Typography
                variant="h2"
                textAlign="center"
                sx={{ color: "white" }}>
                Create account
              </Typography>
              <Typography textAlign="center">
                Create a new account by completing the registration form with
                your personal information.
              </Typography>
            </Grid>
            <Box
              component="form"
              width="100%"
              onSubmit={handleSubmit}
              noValidate>
              <Grid display="flex" flexDirection="column" gap={2}>
                <Grid display="flex" flexDirection="column" gap={1}>
                  <InputLabel sx={{ color: "white" }}>
                    Name{" "}
                    <span style={{ color: theme.palette.custom.required }}>
                      *
                    </span>
                  </InputLabel>
                  <TextField
                    name="fullName"
                    defaultValue={user.fullName}
                    placeholder="Ingresa tu nombre completo"
                    required
                    fullWidth
                    onChange={handleChangeUser}
                    InputProps={{
                      style: {
                        backgroundColor: "#010a1e",
                        border: "1px solid white",
                        color: "white"
                      },
                      endAdornment: (
                        <InputAdornment
                          position="start"
                          style={{ color: "white" }}>
                          <AccountCircleIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid display="flex" flexDirection="column" gap={1}>
                  <InputLabel sx={{ color: "white" }}>
                    Email{" "}
                    <span style={{ color: theme.palette.custom.required }}>
                      *
                    </span>
                  </InputLabel>
                  <TextField
                    name="email"
                    type="email"
                    defaultValue={user.email}
                    placeholder="Ingresa tu correo"
                    required
                    fullWidth
                    onChange={handleChangeUser}
                    InputProps={{
                      style: {
                        backgroundColor: "#010a1e",
                        border: "1px solid white",
                        color: "white"
                      },
                      endAdornment: (
                        <InputAdornment
                          position="start"
                          style={{ color: "white" }}>
                          <EmailIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid display="flex" flexDirection="column" gap={1}>
                  <InputLabel sx={{ color: "white" }}>
                    Cellphone{" "}
                    <span style={{ color: theme.palette.custom.required }}>
                      *
                    </span>
                  </InputLabel>
                  <TextField
                    name="cellphone"
                    type="cellphone"
                    defaultValue={user.cellphone}
                    placeholder="Ingresa tu número celular"
                    required
                    fullWidth
                    onChange={handleChangeUser}
                    InputProps={{
                      style: {
                        backgroundColor: "#010a1e",
                        border: "1px solid white",
                        color: "white"
                      },
                      endAdornment: (
                        <InputAdornment
                          position="start"
                          style={{ color: "white" }}>
                          <HttpsIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid display="flex" flexDirection="column" gap={1}>
                  <InputLabel sx={{ color: "white" }}>
                    Password{" "}
                    <span style={{ color: theme.palette.custom.required }}>
                      *
                    </span>
                  </InputLabel>
                  <TextField
                    name="password"
                    defaultValue={user.password}
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    required
                    fullWidth
                    onChange={handleChangeUser}
                    InputProps={{
                      style: {
                        backgroundColor: "#010a1e",
                        border: "1px solid white",
                        color: "white"
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={{ color: "white" }}>
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid display="flex" flexDirection="column" gap={1}>
                  <InputLabel sx={{ color: "white" }}>
                    Repeat password{" "}
                    <span style={{ color: theme.palette.custom.required }}>
                      *
                    </span>
                  </InputLabel>
                  <TextField
                    name="confirmPassword"
                    defaultValue={user.confirmPassword}
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    required
                    fullWidth
                    onChange={handleChangeUser}
                    InputProps={{
                      style: {
                        backgroundColor: "#010a1e",
                        border: "1px solid white",
                        color: "white"
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={{ color: "white" }}>
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                {user.slug && (
                  <Grid display="flex" flexDirection="column" gap={1}>
                    <InputLabel sx={{ color: "white" }}>
                      Slug de invitación
                    </InputLabel>
                    <TextField
                      name="slug"
                      fullWidth
                      defaultValue={user.slug}
                      disabled
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <StarIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                )}
                <Grid alignItems="center">
                  <FormControlLabel
                    value={checked}
                    sx={{ gap: 1 }}
                    control={<Checkbox color="primary" />}
                    onChange={({ target }) => setChecked(target.checked)}
                    label={
                      <>
                        He leído y acepto los{" "}
                        <Link
                          to="/termsAndConditions.pdf"
                          component={RouterLink}
                          target="_blank"
                          color={"#ab8e3a"}>
                          Térmimos, condiciones y políticas de privacidad
                        </Link>
                      </>
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 2, backgroundColor: "#ab8e3a", color: "#010a1e" }}
                fullWidth>
                Create account
              </Button>
            </Box>
            <Grid>
              <Typography>
                ¿Ya tienes una cuenta?{" "}
                <Link to="/signin" component={RouterLink} color={"#ab8e3a"}>
                  Iniciar sesión
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </ContainerItem>
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
