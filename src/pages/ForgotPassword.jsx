import { useMemo, useState } from "react"

import { Link as RouterLink, useNavigate } from "react-router-dom"
import {
  Box,
  Link,
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  Alert,
  Snackbar
} from "@mui/material"
import { useTheme } from "@emotion/react"
import { Https as HttpsIcon } from "@mui/icons-material"
import { MuiOtpInput } from "mui-one-time-password-input"
import background from "../assets/img/backgrounds/background_5.svg"
import useAuth from "../hooks/useAuth"
import AuthService from "../services/auth.service"

const SentOTP = ({ theme, onSubmit }) => {
  const [email, setEmail] = useState("")

  return (
    <Grid display="flex" flexDirection="column" gap={2}>
      <Grid
        component="form"
        width="100%"
        onSubmit={(e) => onSubmit(e, email)}
        noValidate>
        <Grid display="flex" flexDirection="column" gap={2}>
          <Typography variant="h2" fontSize={24} color="white">
            Recuperar contraseña
          </Typography>
          <Grid display="flex" flexDirection="column" gap={1}>
            <InputLabel sx={{ color: "white" }}>
              Email{" "}
              <span style={{ color: theme.palette.custom.required }}>*</span>
            </InputLabel>
            <TextField
              name="email"
              placeholder="Ingresa tu correo"
              type="email"
              required
              fullWidth
              onChange={(val) => setEmail(val.target.value)}
              InputProps={{
                style: {
                  backgroundColor: "#010a1e",
                  border: "1px solid white",
                  color: "white"
                },
                endAdornment: (
                  <InputAdornment position="start">
                    <HttpsIcon style={{ color: "white" }} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 2, backgroundColor: "#ab8e3a", color: "#010a1e" }}
          fullWidth>
          Enviar OTP
        </Button>
      </Grid>
      <Grid>
        <Typography textAlign="center">
          ¿Recordaste tu contraseña?{" "}
          <Link to="/signin" component={RouterLink} color={"#ab8e3a"}>
            Iniciar sesión
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

const VerifyOTP = ({ theme, onSubmit, onResend }) => {
  const [otp, setOtp] = useState("")

  return (
    <Grid display="flex" flexDirection="column" gap={2}>
      <Grid
        component="form"
        width="100%"
        onSubmit={(event) => onSubmit(event, otp)}
        noValidate>
        <Grid display="flex" flexDirection="column" gap={4}>
          <Typography variant="h2" fontSize={24}>
            Verificación de OTP
          </Typography>
          <MuiOtpInput
            value={otp}
            length={6}
            TextFieldsProps={{ variant: "standard" }}
            onChange={(newValue) => setOtp(newValue)}
          />
        </Grid>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
          fullWidth>
          Verificar
        </Button>
      </Grid>
      <Grid>
        <Typography
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="center">
          ¿No has recibido ningún correo?{" "}
          <Link component={Button} textTransform="initial" onClick={onResend}>
            Reenviar OTP
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

function ForgotPassword() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [, setAuth] = useAuth()
  const $Auth = useMemo(() => new AuthService(), [])
  const [wasSentOTP, setWasSentOTP] = useState(false)
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    status: "success"
  })

  const handleSubmitSendOTP = async (event, email) => {
    event.preventDefault()

    const { status, data } = await $Auth.recoveryPass({ email })

    setAlert({
      show: true,
      message:
        "Se han enviado instrucciones para recuperar contraseña al email.",
      status: "success"
    })

    setTimeout(() => {
      window.location.href = "/"
    }, 5000)
  }

  const handleSubmitVerifyOTP = (event, value) => {
    event.preventDefault()
    console.log(value)
    navigate("/reset-password")
  }

  const resetAlert = () => {
    setAlert({ show: false, message: "", status: "success" })
  }

  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: "#010a1e",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative"
      }}>
      <img
        src="/shape.png"
        alt="Login"
        style={{ maxWidth: "80%", position: "absolute", top: 0, right: 0 }}
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
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        bgcolor="#010a1e"
        padding={4}
        sx={{
          boxShadow: "0px 0px 10px 0px rgba(255, 255, 255, 0.5)", // Añadiendo sombra
          borderRadius: 4,
          width: 10 * 70
        }}>
        <Typography variant="h2" color="white" fontSize={48} textAlign="center">
          Ultra
        </Typography>
        {!wasSentOTP ? (
          <SentOTP theme={theme} onSubmit={handleSubmitSendOTP} />
        ) : (
          <VerifyOTP theme={theme} onSubmit={handleSubmitVerifyOTP} />
        )}
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

export default ForgotPassword
