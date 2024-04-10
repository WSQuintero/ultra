import {
  Dialog,
  Container,
  Typography,
  IconButton,
  Icon,
  Divider,
  Button,
  Grid,
  Alert,
  Snackbar,
  TextField
} from "@mui/material"
import { Box } from "@mui/system"
import useAuth from "../hooks/useAuth"
import useConfig from "../hooks/useConfig"
import useSession from "../hooks/useSession"
import CloseIcon from "@mui/icons-material/Close"
import AuthService from "../services/auth.service"
import { useState, useCallback, useMemo } from "react"

export default function ModalAuth({ open, handleClose, handleAuth }) {
  const [session] = useSession()
  const [, setAuth] = useAuth()
  const [, { setLoading }] = useConfig()
  const [hideAuth, setHideAuth] = useState(false)
  const $Auth = useMemo(() => new AuthService(), [])
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    status: "success"
  })

  const [authUser, setAuthUser] = useState({
    notRefreshToken: true,
    email: session.email,
    password: ""
  })

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setAuthUser((prev) => ({ ...prev, [name]: value }))
  }, [])

  const validateAuthUser = async () => {
    setLoading(true)

    setHideAuth(true)

    const { status, data } = await $Auth.signin(authUser)

    setHideAuth(false)

    setLoading(false)

    if (!status) {
      setAlert({
        show: true,
        message: "Ha ocurrido un error, inténtelo de nuevo.",
        status: "error"
      })

      return
    }

    $Auth.token = data.token

    if ($Auth.token) {
      setAuth($Auth.token)

      let passBefore = authUser.password

      setAuthUser({
        email: session.email,
        password: ""
      })

      const { status, data } = await $Auth.validate()
      if (status) {
        handleAuth(passBefore)
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

  const resetAlert = () => {
    setAlert({ show: false, message: "", status: "success" })
  }

  if (!open || hideAuth) {
    return <></>
  } else {
    return (
      <>
        <Dialog
          style={{ borderRadius: "3rem" }}
          open={open}
          onClose={handleClose}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={handleClose}>
                <Icon>
                  <CloseIcon />
                </Icon>
              </IconButton>
            </Box>
            <Container maxWidth="lg" sx={{ pb: 4 }} align="center">
              <Typography variant="h4" fontWeight={600} color="black">
                Ultra
              </Typography>
              <br />
              <Box>
                <Typography variant="h5" fontWeight={600} color="textPrimary">
                  Autenticación
                </Typography>
              </Box>
              <Box sx={{ width: "100%", m: "auto" }}>
                <Divider sx={{ mb: 2 }}>{"Ingresa tu contraseña"}</Divider>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      value={authUser.password}
                      onChange={handleInputChange}
                      type={"password"}
                      name="password"
                      fullWidth
                    />
                  </Grid>
                  <Snackbar
                    open={alert.show}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    onClose={resetAlert}>
                    <Alert severity={alert.status} sx={{ width: "100%" }}>
                      {alert.message}
                    </Alert>
                  </Snackbar>

                  <Grid item xs={12} md={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color={"warning"}
                      onClick={() => {
                        validateAuthUser()
                      }}>
                      Autenticar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        </Dialog>
      </>
    )
  }
}
