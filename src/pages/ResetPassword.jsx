import { useState, useMemo } from "react"
import { useTheme } from "@emotion/react"
import { useSearchParams } from "react-router-dom"
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  Alert,
  Snackbar
} from "@mui/material"
import {
  VisibilityOutlined as VisibilityIcon,
  VisibilityOffOutlined as VisibilityOffIcon
} from "@mui/icons-material"
import background from "../assets/img/backgrounds/background_4.svg"
import useAuth from "../hooks/useAuth"
import AuthService from "../services/auth.service"
import { GoldButton } from "../components/landing/GoldButton"

function ResetPassword() {
  const theme = useTheme()
  const [passOne, setPassOne] = useState("")
  const [passTwo, setPassTwo] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [, setAuth] = useAuth()
  const $Auth = useMemo(() => new AuthService(), [])
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    status: "success"
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    let tokenEmail = searchParams.get("token")

    if (passOne == passTwo) {
      const { status, data } = await $Auth.changePass({
        newPassword: passTwo,
        token: tokenEmail
      })
      if (status) {
        setAlert({
          show: true,
          message: "Contraseña modificado con éxito.",
          status: "success"
        })

        setTimeout(() => {
          window.location.href = "/"
        }, 5000)
      } else {
        setAlert({
          show: true,
          message:
            "Su token ha expirado, inicie el proceso de recuperación de nuevo.",
          status: "error"
        })

        setTimeout(() => {
          window.location.href = "/"
        }, 5000)
      }
    } else {
      setAlert({
        show: true,
        message: "Contraseñas diferentes, inténtelo de nuevo.",
        status: "error"
      })
    }
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
        backgroundColor: `black`,
        backgroundImage: "url('/shape.png'), url('/shape1.png')",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        bgcolor="black"
        padding={4}
        borderRadius={4}
        width={8 * 60}>
        <Typography variant="h2" color="black" fontSize={48} textAlign="center">
          Ultra
        </Typography>
        <Grid display="flex" flexDirection="column" gap={2}>
          <form onSubmit={handleSubmit} noValidate>
            <Grid display="flex" flexDirection="column" gap={2}>
              <Typography variant="h2" fontSize={24}>
                Reiniciar contraseña
              </Typography>

              <Grid display="flex" flexDirection="column" gap={1}>
                <InputLabel>
                  Nueva contraseña{" "}
                  <span style={{ color: theme.palette.custom.required }}>
                    *
                  </span>
                </InputLabel>
                <TextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  required
                  fullWidth
                  value={passOne}
                  onChange={(e) => setPassOne(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}>
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
                <InputLabel>
                  Confirmar contraseña{" "}
                  <span style={{ color: theme.palette.custom.required }}>
                    *
                  </span>
                </InputLabel>
                <TextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  required
                  fullWidth
                  value={passTwo}
                  onChange={(e) => setPassTwo(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}>
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
            </Grid>
            <GoldButton
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
              fullWidth>
              Actualizar contraseña
            </GoldButton>
          </form>
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

export default ResetPassword
