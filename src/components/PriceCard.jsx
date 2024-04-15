import {
  Box,
  Typography,
  Modal,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  Snackbar
} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { MyContext } from "../generalContext/GeneralContext"
import { GoldButton } from "./landing/GoldButton"
import WalletAddressQR from "./WalletAddressQR"
import { ContentCopyRounded as CopyIcon } from "@mui/icons-material"

const PriceCard = ({ header, options }) => {
  const { $Buy, token, actualUser } = useContext(MyContext)
  const [product, setProduct] = useState("")
  const [wallet, setWallet] = useState("")
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState({ show: false, message: "" })

  const handleClose = () => {
    setOpen(false)
    setWallet("")
  }
  const handleBuy = async () => {
    const { status, data } = await $Buy.buyMembership(token, product)

    if (status) {
      setWallet(data[0])
      setOpen(true)
      console.log(data[0])
    } else {
      console.log(data)
    }
  }

  useEffect(() => {
    if (header.title) {
      if (header.title === "Plan 90") {
        setProduct(1)
      }
      if (header.title === "Club del fondeo 2.0") {
        setProduct(2)
      }
    }
  }, [header.title])

  const handleCopySlug = () => {
    navigator.clipboard.writeText(wallet?.product_wallet_address)
    setAlert({ show: true, message: "Slug added to your clipboard" })
  }

  function formatDate(fechaString) {
    // Crear un objeto de fecha a partir de la cadena de fecha proporcionada
    const fecha = new Date(fechaString)

    // Obtener los componentes de la fecha
    const diaSemana = fecha.toLocaleDateString("es-ES", { weekday: "long" })
    const mes = fecha.toLocaleDateString("es-ES", { month: "long" })
    const dia = fecha.getDate()
    const ano = fecha.getFullYear()

    // Crear una cadena de fecha normal en el formato deseado
    const fechaNormal = `${diaSemana} ${dia} de ${mes} de ${ano}`

    return fechaNormal
  }
  return (
    <>
      <Box
        sx={{
          maxWidth: 450,
          minWidth: 300,
          width: "100%",
          overflow: "hidden",
          borderRadius: 5,
          background: "#010714",
          border: "2px solid #23221c",
          flexShrink: 0
        }}>
        <Box
          sx={{
            maxHeight: 150,
            width: "100%",
            backgroundColor: "#13141a",
            backgroundSize: "cover",
            alignItems: "center",
            justifyContent: "center",
            padding: 2
          }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ color: "white" }}>{header?.title}</Typography>
            <div style={{ display: "flex", gap: 4 }}>
              <Typography sx={{ color: "white" }}>{header?.price}</Typography>
              <Typography sx={{ textDecoration: "line-through" }}>
                {header?.realPrice}
              </Typography>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
            <Typography sx={{ fontSize: 13 }}>{header?.description}</Typography>
            <div style={{ display: "flex", gap: 4, marginTop: "10px" }}>
              <Typography
                sx={{
                  width: "auto",
                  padding: 1,
                  borderRadius: 10,
                  backgroundColor: "#f45170",
                  fontSize: 12,
                  color: "white"
                }}>
                {header.discount}
              </Typography>
            </div>
          </div>

          <div style={{ marginTop: 5 }}>
            <GoldButton onClick={handleBuy}>Comenzar</GoldButton>
          </div>
        </Box>

        <Box
          sx={{
            padding: 2,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            height: "400px"
          }}>
          {/* Sección 2 */}
          {options?.map((option, index) => (
            <Box
              sx={{
                borderBottom: "1px solid white",
                padding: 1
              }}
              key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                <Typography variant="body2" color="white" sx={{ fontSize: 13 }}>
                  {option.title}
                </Typography>

                <Typography variant="body2" color="white" sx={{ fontSize: 13 }}>
                  {option.price}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 10 }} color="textPrimary">
                {option.subtitle}
              </Typography>
            </Box>
          ))}
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="payment-modal-title"
          aria-describedby="payment-modal-description">
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "black",
              borderRadius: 5,
              padding: 4,
              textAlign: "center",
              width: "60%",
              border: "2px solid #ab8e3a"
            }}>
            <img src="/logo.png" alt="" />
            <Typography
              variant="h5"
              id="payment-modal-title"
              sx={{ color: "rgba(255,255,255,0.7)" }}>
              Tu orden de pago.
            </Typography>
            <Typography
              id="payment-modal-title"
              sx={{ color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
              Escanea el código QR en la app de pago.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 10,
                width: "100%",
                marginTop: 1,
                justifyContent: "space-around"
              }}>
              <Box sx={{ width: "60%" }}>
                <Box
                  sx={{
                    textAlign: "Left",
                    backgroundColor: "#ab8e3a",
                    borderRadius: 2,
                    marginTop: 2,
                    padding: 1
                  }}>
                  <Typography sx={{ color: "white" }}>
                    Correo electrónico:{"  "}
                    <span style={{ color: "black", fontSize: "16px" }}>
                      {actualUser?.email}
                    </span>
                  </Typography>
                  <Typography sx={{ color: "white" }}>
                    Teléfono:{"  "}
                    <span style={{ color: "black", fontSize: "16px" }}>
                      {actualUser?.cellphone}
                    </span>
                  </Typography>
                  <Typography sx={{ color: "white" }}>
                    Fecha:{"  "}
                    <span
                      style={{
                        color: "black",
                        fontSize: "16px"
                      }}>{`${formatDate(new Date())}`}</span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    borderTop: "1px solid #ab8e3a",
                    borderBottom: "1px solid #ab8e3a",
                    marginTop: 2,
                    padding: 1,
                    justifyContent: "space-between"
                  }}>
                  <Box
                    sx={{
                      padding: 1,
                      width: "60%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start"
                    }}>
                    <Typography sx={{ color: "white" }}>Suscripción</Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        width: "100%",
                        textAlign: "start"
                      }}>
                      <span style={{ color: "#ab8e3a", fontSize: "13px" }}>
                        {header.title}
                      </span>
                    </Typography>
                  </Box>
                  <Box sx={{ padding: 1 }}>
                    <Typography sx={{ color: "white", fontSize: "15px" }}>
                      Precio (USDT)
                    </Typography>
                    <Typography
                      sx={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>
                      ${wallet?.amount_usdt - 2}
                    </Typography>
                  </Box>
                  <Box sx={{ padding: 1 }}>
                    <Typography sx={{ color: "white", fontSize: "15px" }}>
                      Comisión (USDT)
                    </Typography>
                    <Typography
                      sx={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>
                      $2
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  <Typography sx={{ color: "#ab8e3a" }}>
                    Total:
                    <span style={{ color: "white" }}>
                      {" "}
                      ${wallet?.amount_usdt}
                    </span>
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: "40%" }}>
                <WalletAddressQR address={wallet.product_wallet_address} />
              </Box>
            </Box>
            {/* <Typography variant="h3" id="payment-modal-title">
            Por favor, realice su pago de ${wallet.amount_usdt} usd.
          </Typography>
          <Typography variant="body1" id="payment-modal-description">
            Haga el pago usando la dirección de la billetera a continuación:
          </Typography> */}
            <Grid
              container
              justifyContent="center"
              sx={{
                zIndex: 50000,
                marginTop: 2
              }}>
              <TextField
                style={{
                  backgroundColor: "#ffffff22",
                  backdropFilter: "blur(8px)"
                }}
                sx={{
                  width: "70%",
                  "& input:disabled": {
                    "-webkit-text-fill-color": "white",
                    color: "white !important"
                  },
                  "& fieldset": {
                    border: "1px solid white !important"
                  }
                }}
                size="large"
                color="secondary"
                value={wallet?.product_wallet_address}
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="copy slug"
                        onClick={handleCopySlug}
                        sx={{ color: "white" }}>
                        <CopyIcon color="inherit" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Box>
        </Modal>
      </Box>
      <Snackbar
        open={alert.show}
        sx={{ zIndex: 1000 }}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setAlert({ show: false, message: "" })}>
        <Alert severity="success" sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default PriceCard
