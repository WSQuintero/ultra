import { useCallback, useEffect, useMemo, useState, useRef } from "react"
import {
  Alert,
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  alpha
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import useAuth from "../hooks/useAuth"
import useSession from "../hooks/useSession"
import useConfig from "../hooks/useConfig"
import ModalAuth from "../components/ModalAuth"
import ModalG2Fa from "../components/ModalG2Fa"
import UserService from "../services/user.service"
import PageWrapper from "../components/PageWrapper"
import FormRow from "../components/FormRow"
import background from "../assets/img/pageWrapper/background.svg"

function Profile() {
  const [auth] = useAuth()
  const [session, setSession] = useSession()

  const [modalConfirm2Fa, setModalConfirm2Fa] = useState(false)

  const [modalConfirmAuth, setModalConfirmAuth] = useState(false)
  const [{ loading }, { setLoading }] = useConfig({})
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    slug_invitation: "",
    cellphone: "",
    wallet_address_pay_commission: ""
  })
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    status: "success"
  })
  const $User = useMemo(() => new UserService(auth), [auth])

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleFormSubmit = useCallback(
    async (event) => {
      event.preventDefault()

      if (
        !user.firstname ||
        !user.lastname ||
        !user.email ||
        !user.slug_invitation ||
        !user.cellphone
      ) {
        setAlert({
          show: true,
          message: "Todos los campos son requeridos.",
          status: "error"
        })
        return
      }

      const { status } = await $User.update({
        firstName: user.firstname,
        lastName: user.lastname,
        phone: user.cellphone
      })

      if (status) {
        setAlert({
          show: true,
          message: "Perfil actualizado con éxito.",
          status: "success"
        })

        setSession({ ...session, ...user })
      } else {
        setAlert({
          show: true,
          message: "Error al actualizar perfil, inténtelo de nuevo más tarde.",
          status: "error"
        })
      }
    },
    [user, $User]
  )

  const handleFormSubmitWallet = useCallback(
    async (event) => {
      event.preventDefault()

      if (!user.wallet_address_pay_commission) {
        setAlert({
          show: true,
          message: "Por favor ingrese la dirección de billetera.",
          status: "error"
        })
        return
      }

      const expresionOneRegularTRC20 = /^T[1-9A-HJ-NP-Za-km-z]{33}$/
      const expresionTwoRegularTRC20 = /^T[a-zA-Z0-9]{41}$/
      if (
        !expresionOneRegularTRC20.test(user.wallet_address_pay_commission) &&
        !expresionTwoRegularTRC20.test(user.wallet_address_pay_commission)
      ) {
        setAlert({
          show: true,
          message: "Por favor ingrese una billetera TRC-20 válida.",
          status: "error"
        })
        return
      }

      if (session.exist_2fa_auth == 1) {
        setModalConfirm2Fa(true)
      } else {
        setModalConfirmAuth(true)
      }
    },
    [user, $User]
  )

  const resetAlert = () => {
    setAlert((prev) => ({ show: false, message: "", status: prev.status }))
  }

  useEffect(() => {
    setLoading(true)

    if (session) {
      setUser({
        avatar: session.avatar || "",
        firstname: session.firstname || "",
        lastname: session.lastname || "",
        email: session.email || "",
        slug_invitation:
          `${import.meta.env.VITE_APP_URL}/signup/${session.slug_invitation}` ||
          "",
        cellphone: session.cellphone || "",
        contract_balance_own: Number(session.contract_balance_own) || 0,
        wallet_address_pay_commission:
          session.wallet_address_pay_commission || "",
        contract_balance_leveraged:
          Number(session.contract_balance_leveraged) || 0
      })
    }

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [session])

  if (!session) {
    return <></>
  }

  const fileInputRef = useRef(null)

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const { status, data } = await $User.changeAvatar({ avatar: file })

      let newUser = user
      newUser.avatar = data[0].avatar
      setLoading(true)

      setUser(newUser)

      setSession({ ...session, ...newUser })

      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  return (
    <PageWrapper expanded>
      <Container maxWidth="xl">
        <Box borderRadius={4} sx={{ backgroundColor: "white" }}>
          <Box position="relative" paddingX={2} paddingY={4}>
            <Box
              display="flex"
              borderRadius={4}
              overflow="hidden"
              sx={(t) => ({
                [t.breakpoints.down("md")]: {
                  aspectRatio: 2
                }
              })}>
              <img
                src={background}
                alt="cover photo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Grid
              position="absolute"
              bottom={0}
              left={48}
              display="flex"
              alignItems="flex-start"
              gap={2}>
              <IconButton
                component="span"
                size="large"
                onClick={handleButtonClick}
                sx={{
                  position: "relative",
                  padding: 0,
                  "&:hover .MuiBox-root": { opacity: 1 }
                }}>
                <Box
                  position="absolute"
                  zIndex={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="100%"
                  borderRadius={50}
                  sx={(t) => ({
                    backgroundColor: alpha(t.palette.secondary.main, 0.5),
                    opacity: 0,
                    transition: "opacity 0.2s ease-out"
                  })}>
                  <Typography variant="caption" color="white">
                    Actualizar
                  </Typography>
                </Box>
                <Avatar
                  src={`${import.meta.env.VITE_IMAGES_URL}/${user.avatar}`}
                  alt={user.firstname}
                  sx={{ width: 92, height: 92 }}
                />
                {/* Input de archivo oculto */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*" // Esto limita la selección a archivos de imagen
                  onChange={handleFileInputChange}
                />
              </IconButton>
              <Grid display="flex" flexDirection="column">
                <Typography
                  variant="h1"
                  fontSize={32}
                  fontWeight={600}
                  color="white">
                  Perfil
                </Typography>
                <Typography
                  fontSize={16}
                  color="white"
                  sx={(t) => ({
                    [t.breakpoints.down("md")]: {
                      display: "none"
                    }
                  })}>
                  Actualiza tu información personal
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <br />

          {session.exist_2fa_auth == 1 && (
            <Grid
              component="form"
              display="flex"
              flexDirection="column"
              padding={2}
              onSubmit={handleFormSubmitWallet}
              noValidate>
              <FormRow
                title="Google Authenticator - ACTIVO"
                description="Tus transacciones están seguras!"></FormRow>
            </Grid>
          )}

          {session.exist_2fa_auth == 0 && (
            <Grid
              component="form"
              display="flex"
              flexDirection="column"
              padding={2}
              onSubmit={handleFormSubmitWallet}
              noValidate>
              <FormRow
                title="Google Authenticator - INACTIVO"
                description="Asegura todas tus transacciones"></FormRow>

              <Divider flexItem />

              <Grid
                display="flex"
                marginLeft="auto"
                padding={2}
                sx={(t) => ({
                  width: "100%",
                  [t.breakpoints.down("md")]: {
                    width: "100%"
                  }
                })}>
                <LoadingButton
                  onClick={() => {
                    setModalConfirm2Fa(true)
                  }}
                  variant="contained"
                  fullWidth>
                  Activar Google 2 Factor Autenticator
                </LoadingButton>
              </Grid>
            </Grid>
          )}

          <hr />

          <Grid
            component="form"
            display="flex"
            flexDirection="column"
            padding={2}
            onSubmit={handleFormSubmitWallet}
            noValidate>
            <FormRow
              title="Dirección Billetera TRC-20"
              description="Billetera para pago de retiros">
              <TextField
                name="wallet_address_pay_commission"
                value={user.wallet_address_pay_commission}
                onChange={handleInputChange}
                fullWidth
              />
            </FormRow>

            <Divider flexItem />

            <Grid
              display="flex"
              marginLeft="auto"
              padding={2}
              sx={(t) => ({
                width: "20%",
                [t.breakpoints.down("md")]: {
                  width: "100%"
                }
              })}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                fullWidth>
                Guardar
              </LoadingButton>
            </Grid>
          </Grid>

          {modalConfirmAuth && (
            <ModalAuth
              open={modalConfirmAuth}
              handleClose={() => {
                setModalConfirmAuth(false)
              }}
              handleAuth={async (pass) => {
                setModalConfirmAuth(false)
                setLoading(true)

                const { status } = await $User.updateWallet({
                  walletAddress: user.wallet_address_pay_commission,
                  password: pass
                })

                if (status) {
                  setAlert({
                    show: true,
                    message: "Billetera actualizada con éxito.",
                    status: "success"
                  })

                  setSession({ ...session, ...user })
                } else {
                  setAlert({
                    show: true,
                    message:
                      "Error al actualizar billetera, inténtelo de nuevo más tarde.",
                    status: "error"
                  })
                }
              }}
            />
          )}

          <hr />
          <br />
          <Grid
            component="form"
            display="flex"
            flexDirection="column"
            padding={2}
            onSubmit={handleFormSubmit}
            noValidate>
            <FormRow
              title="Status Binario"
              description="Membresía IB Activa + 2 Directos con Standar o Premium Activa">
              <TextField
                name="slug_invitation"
                value={session.activeBinary ? "ACTIVO" : "INACTIVO"}
                fullWidth
                disabled
              />
            </FormRow>
            <FormRow
              title="Enlace de referido"
              description="Actualiza tu enlace de referido">
              <TextField
                name="slug_invitation"
                value={user.slug_invitation}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </FormRow>
            {/*<FormRow title="Balance Contrato" description="Total depositado en sus contratos">
              <TextField
                name="slug_invitation"
                value={user.contract_balance_own}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </FormRow>
            <FormRow title="Balance Contratos Acelerados" description="Total monto acelerado en sus contratos">
              <TextField
                name="slug_invitation"
                value={user.contract_balance_leveraged}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </FormRow>
            <FormRow title="Balance Contrato+Acelaración" description="Total monto depositado+aceleración">
              <TextField
                name="slug_invitation"
                value={user.contract_balance_own + user.contract_balance_leveraged}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </FormRow>*/}
            <FormRow
              title="Correo"
              description="Actualiza tu correco electrónico">
              <TextField
                name="email"
                value={user.email}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </FormRow>
            <FormRow title="Nombre" description="Actualiza tu nombre">
              <TextField
                name="firstname"
                value={user.firstname}
                onChange={handleInputChange}
                fullWidth
              />
            </FormRow>
            <Divider flexItem />
            <FormRow title="Apellido" description="Actualiza tu apellido">
              <TextField
                name="lastname"
                value={user.lastname}
                onChange={handleInputChange}
                fullWidth
              />
            </FormRow>
            <Divider flexItem />
            <Divider flexItem />
            <FormRow
              title="Teléfono"
              description="Actualiza tu número de teléfono">
              <TextField
                name="cellphone"
                value={user.cellphone}
                onChange={handleInputChange}
                fullWidth
              />
            </FormRow>
            <FormRow
              title="Status Binario"
              description="Membresía IB Activa + 2 Directos con Standar o Premium Activa">
              <TextField
                name="slug_invitation"
                value={session.activeBinary ? "ACTIVO" : "INACTIVO"}
                fullWidth
                disabled
              />
            </FormRow>
            <FormRow
              title="Enlace de referido"
              description="Actualiza tu enlace de referido">
              <TextField
                name="slug_invitation"
                value={user.slug_invitation}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </FormRow>
            {/*<FormRow title="Balance Contrato" description="Total depositado en sus contratos">
              <TextField
                name="slug_invitation"
                value={user.contract_balance_own}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </FormRow>
            <FormRow title="Balance Contratos Acelerados" description="Total monto acelerado en sus contratos">
              <TextField
                name="slug_invitation"
                value={user.contract_balance_leveraged}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </FormRow>
            <FormRow title="Balance Contrato+Acelaración" description="Total monto depositado+aceleración">
              <TextField
                name="slug_invitation"
                value={user.contract_balance_own + user.contract_balance_leveraged}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </FormRow>*/}
            <FormRow
              title="Correo"
              description="Actualiza tu correco electrónico">
              <TextField
                name="email"
                value={user.email}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </FormRow>
            <FormRow title="Nombre" description="Actualiza tu nombre">
              <TextField
                name="firstname"
                value={user.firstname}
                onChange={handleInputChange}
                fullWidth
              />
            </FormRow>
            <Divider flexItem />
            <FormRow title="Apellido" description="Actualiza tu apellido">
              <TextField
                name="lastname"
                value={user.lastname}
                onChange={handleInputChange}
                fullWidth
              />
            </FormRow>
            <Divider flexItem />
            <Divider flexItem />
            <FormRow
              title="Teléfono"
              description="Actualiza tu número de teléfono">
              <TextField
                name="cellphone"
                value={user.cellphone}
                onChange={handleInputChange}
                fullWidth
              />
            </FormRow>
            <Divider flexItem />

            <Grid
              display="flex"
              marginLeft="auto"
              padding={2}
              sx={(t) => ({
                width: "20%",
                [t.breakpoints.down("md")]: {
                  width: "100%"
                }
              })}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                fullWidth>
                Guardar
              </LoadingButton>
            </Grid>
          </Grid>

          {modalConfirm2Fa && (
            <ModalG2Fa
              open={modalConfirm2Fa}
              handleClose={() => {
                setModalConfirm2Fa(false)
              }}
              handleAuth={async () => {
                if (session.exist_2fa_auth == 1) {
                  setModalConfirm2Fa(false)
                  setModalConfirmAuth(true)
                }
              }}
            />
          )}
          <Snackbar
            open={alert.show}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={resetAlert}>
            <Alert severity={alert.status} sx={{ width: "100%" }}>
              {alert.message}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </PageWrapper>
  )
}

export default Profile
