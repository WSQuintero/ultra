import {
  Dialog,
  Container,
  Typography,
  IconButton,
  Icon,
  Divider,
  Button,
  Grid,
  TextField
} from "@mui/material"
import { Box } from "@mui/system"
import CloseIcon from "@mui/icons-material/Close"
import QRCode from "react-qr-code"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { useState, useCallback } from "react"

export default function ModalPayment({
  walletAddress,
  open,
  handleClose,
  depositAmount,
  items,
  price
}) {
  const [helperCopy, setHelperCopy] = useState({
    show: false,
    message: ""
  })

  const handleCopyIcon = (text) => {
    const { clipboard } = navigator

    if (!clipboard || !clipboard.writeText) {
      return setHelperCopy({
        show: true,
        message: "Cannot access to your clipboard"
      })
    }

    try {
      clipboard.writeText(text).then(() => {
        setHelperCopy({ show: true, message: "Copy successful" })
        setTimeout(() => {
          setHelperCopy({ show: false, message: "" })
        }, 1000)
      })
    } catch (error) {
      setHelperCopy({ show: true, message: error.message })
    }
  }

  if (!open) {
    return <></>
  } else {
    return (
      <>
        <Dialog
          maxWidth="lg"
          fullWidth
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
                FinanCity
              </Typography>
              <br />
              <Box>
                <Typography variant="h5" fontWeight={600} color="textPrimary">
                  {items ? "Tu orden" : `Nuevo Depósito ${depositAmount} USDT`}
                </Typography>
                <Typography variant="body1" color={"gray"}>
                  {"Scanea el Código QR"}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  {items && (
                    <Grid item xs={12} md={6}>
                      <Divider sx={{ my: 1, mt: 2 }} />
                      <Grid container spacing={0}>
                        <Grid item fontWeight={600} xs={6}>
                          {items.name}
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 1, mb: 1 }} />
                      <Typography
                        sx={{ mb: 2 }}
                        fontWeight={600}
                        align="center"
                        variant="h5"
                        color="textPrimary">
                        {"Total"} ${price || items.price} USDT-TRC20
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12} md={items ? 6 : 12}>
                    {/* QRCODE */}
                    <Box align="center" sx={{ my: 2, mx: 2 }}>
                      {
                        <QRCode
                          style={
                            items
                              ? { width: "80%", height: "80%" }
                              : { width: "50%", height: "50%" }
                          }
                          value={walletAddress}
                        />
                      }
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ width: "100%", m: "auto" }}>
                <Divider sx={{ mb: 2 }}>{"Wallet Manual TRC20"}</Divider>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={10}>
                    <TextField
                      // sx={{ backgroundColor: '#F3F2F5', border: '1px solid #E6E6EB' }}
                      value={walletAddress}
                      readOnly
                      fullWidth
                      helperText={helperCopy.show && helperCopy.message}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      onClick={() => handleCopyIcon(walletAddress)}
                      sx={{ height: "100%" }}
                      variant="contained"
                      color="primary">
                      {/* <Icon> */}
                      <ContentCopyIcon />
                      {/* </Icon> */}
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
