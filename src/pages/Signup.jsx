import { useMemo, useState } from "react"
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  Navigate
} from "react-router-dom"
import "react-phone-input-2/lib/style.css"
import PhoneField from "react-phone-input-2"

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
import AuthService from "../services/auth.service"
import { Container } from "@mui/system"
import EmailIcon from "@mui/icons-material/Email"

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
    firstName: "",
    lastName: "",
    slugInvitation: "",
    slug: params.slug || "",
    email: "",
    password: "",
    phone: "",
    country: "",
    municipality: ""
  })
  const [checked, setChecked] = useState(true)
  const $Auth = useMemo(() => new AuthService(), [])

  const handleChangeUser = (event) => {
    const { name, value } = event.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }
  const handleChangeCell = (value) => {
    setUser((prev) => ({ ...prev, phone: value }))
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      !(user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.phone,
      user.country,
      user.slugInvitation,
      user.municipality)
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

    const { status, data } = await $Auth.signup(user)

    if (status) {
      if (data.message === "Email already in use.") {
        setAlert({
          show: true,
          message: "Email ya se encuentra registrado",
          status: "error"
        })
        return
      }
      if (data.message === "Slug Code already in use.") {
        setAlert({
          show: true,
          message:
            "Slug ya registrado. Por favor elige otro código de invitación para tí.",
          status: "error"
        })
        return
      }
      setAlert({
        show: true,
        message: "Registro exitoso",
        status: "success"
      })
      setTimeout(() => {
        navigate("/signin")
      }, 2000)
    }
  }

  const resetAlert = () => {
    setAlert({ show: false, message: "", status: "success" })
  }

  return (
    <Grid container minHeight="100vh">
      <ContainerItem
        sx={{
          backgroundColor: "black",
          width: "50%",
          position: "relative",
          maxHeight: "100vh"
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
            backgroundColor: "black",
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
      <ContainerItem
        display="flex"
        flexDirection="column"
        sx={{ minHeight: "100vh", maxHeight: "100vh" }}>
        <Container
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            overflow: "auto",
            height: "100%"
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
            paddingBottom={5}
            sx={{ marginTop: 5 }}>
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
                    Slug de invitación
                  </InputLabel>
                  <TextField
                    name="slugInvitation"
                    fullWidth
                    defaultValue={user.slugInvitation}
                    required
                    onChange={handleChangeUser}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <StarIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid display="flex" flexDirection="column" gap={1}>
                  <TextField
                    name="firstName"
                    label="Nombres"
                    InputLabelProps={{
                      style: {
                        color: "rgba(255,255,255,0.7)"
                      }
                    }}
                    defaultValue={user.firstName}
                    required
                    fullWidth
                    onChange={handleChangeUser}
                    InputProps={{
                      style: {
                        backgroundColor: "black",
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
                  <TextField
                    name="lastName"
                    label="Apellidos"
                    InputLabelProps={{
                      style: {
                        color: "rgba(255,255,255,0.7)"
                      }
                    }}
                    defaultValue={user.lastName}
                    required
                    fullWidth
                    onChange={handleChangeUser}
                    InputProps={{
                      style: {
                        backgroundColor: "black",
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
                  <TextField
                    name="country"
                    label="País"
                    InputLabelProps={{
                      style: {
                        color: "rgba(255,255,255,0.7)"
                      }
                    }}
                    defaultValue={user.country}
                    type={"text"}
                    required
                    fullWidth
                    onChange={handleChangeUser}
                    InputProps={{
                      style: {
                        backgroundColor: "black",
                        border: "1px solid white",
                        color: "white"
                      }
                    }}
                  />
                </Grid>
                <Grid display="flex" flexDirection="column" gap={1}>
                  <TextField
                    name="municipality"
                    label="Ciudad"
                    InputLabelProps={{
                      style: {
                        color: "rgba(255,255,255,0.7)"
                      }
                    }}
                    defaultValue={user.municipality}
                    type={"text"}
                    required
                    fullWidth
                    onChange={handleChangeUser}
                    InputProps={{
                      style: {
                        backgroundColor: "black",
                        border: "1px solid white",
                        color: "white"
                      }
                    }}
                  />
                </Grid>
                <Grid display="flex" flexDirection="column" gap={1}>
                  <TextField
                    name="email"
                    type="email"
                    label="Email"
                    InputLabelProps={{
                      style: {
                        color: "rgba(255,255,255,0.7)"
                      }
                    }}
                    defaultValue={user.email}
                    required
                    fullWidth
                    onChange={handleChangeUser}
                    InputProps={{
                      style: {
                        backgroundColor: "black",
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
                  {/* <InputLabel sx={{ color: "white" }}>
                    Cellphone{" "}
                    <span style={{ color: theme.palette.custom.required }}>
                      *
                    </span>
                  </InputLabel>
                  <TextField
                    name="phone"
                    type="cellphone"
                    defaultValue={user.phone}

                    required
                    fullWidth
                    onChange={handleChangeUser}
                    InputProps={{
                      style: {
                        backgroundColor: "black",
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
                  /> */}

                  <PhoneField
                    enableSearch={true}
                    value={user.cellphone}
                    country="co"
                    specialLabel=""
                    autoFormat={true}
                    inputStyle={{
                      width: "100%",
                      height: 50,
                      padding: 10,
                      backgroundColor: "black",
                      border: "1px solid white",
                      color: "white"
                    }}
                    inputProps={{
                      name: "phone",
                      required: true
                    }}
                    isValid={(value, country) => {
                      if (value.match(/12345/)) {
                        return "Invalid value: " + value + ", " + country.name
                      } else {
                        return true
                      }
                    }}
                    onChange={handleChangeCell}
                  />
                </Grid>
                <Grid display="flex" flexDirection="column" gap={1}>
                  <TextField
                    name="password"
                    label="Password"
                    InputLabelProps={{
                      style: {
                        color: "rgba(255,255,255,0.7)"
                      }
                    }}
                    defaultValue={user.password}
                    type={showPassword ? "text" : "password"}
                    required
                    fullWidth
                    onChange={handleChangeUser}
                    InputProps={{
                      style: {
                        backgroundColor: "black",
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
                  <TextField
                    name="confirmPassword"
                    label="Repetir password"
                    InputLabelProps={{
                      style: {
                        color: "rgba(255,255,255,0.7)"
                      }
                    }}
                    defaultValue={user.confirmPassword}
                    type={showPassword ? "text" : "password"}
                    required
                    variant="outlined"
                    fullWidth
                    onChange={handleChangeUser}
                    InputProps={{
                      style: {
                        backgroundColor: "black",
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

                {/* <Grid alignItems="center">
                  <FormControlLabel
                    value={checked}
                    sx={{ gap: 1 }}
                    control={<Checkbox color="primary" />}
                    onChange={({ target }) => setChecked(target.checked)}
                    label={
                      <>
                        He leído y acepto los{" "}
                        <Link
                          to="#"
                          component={RouterLink}
                          target="_blank"
                          color={"#ab8e3a"}>
                          Térmimos, condiciones y políticas de privacidad
                        </Link>
                      </>
                    }
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 2, backgroundColor: "#ab8e3a", color: "black" }}
                fullWidth>
                Create account
              </Button>
            </Box>
            <Grid>
              <Typography>
                ¿Ya tienes una cuenta?
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
