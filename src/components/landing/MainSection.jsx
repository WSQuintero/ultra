import { Box, Button, Typography } from "@mui/material"
import { GoldButton } from "./GoldButton"
import styled from "@emotion/styled"

const MainSection = () => {
  const handleSignInClick = () => {
    window.location.href = "/signin"
  }

  const handleRegisterClick = () => {
    window.location.href = "/signup"
  }
  return (
    <Box
      id="main-section"
      // height="100vh"
      marginTop={8}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      position="relative">
      <Video
        src="/FONDO-PRINCIPAL-VIDEO.mp4"
        autoPlay
        muted
        loop
        alt="Background"
        style={{
          // position: 'absolute',
          // bottom: '0px',
          width: "100%",
          zIndex: 0
        }}
      />
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        height="100px"
        background="linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))"
        zIndex="1"
      />
      <Box
        position="absolute"
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        sx={{
          color: "white",
          width: {
            xs: "90%",
            xxl: "70"
          }
        }}>
        <Typography
          variant="h5"
          marginBottom={"20px"}
          zIndex={1}
          fontFamily="Hubot Sans Expanded, sans-serif"
          fontWeight={700}
          color="transparent"
          sx={{
            fontSize: "24px",
            background:
              "linear-gradient(143deg, rgba(143,95,37,1) 0%, rgba(252,227,143,1) 50%, rgba(143,95,37,1) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" // Ajusta los valores de desplazamiento, difuminado y color según tu preferencia
          }}>
          BIENVENIDO A ULTRA
        </Typography>
        <Typography
          color={"white"}
          variant="h3"
          marginBottom={"20px"}
          zIndex={1}
          fontFamily="Hubot Sans Expanded, sans-serif"
          fontWeight={700}
          sx={{
            fontSize: {
              xxl: "56px",
              md: "36px",
              lg: "44px",
              xs: "30px"
            },
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" // Ajusta los valores de desplazamiento, difuminado y color según tu preferencia
          }}>
          ¿Listo para llevar tu trading al siguiente nivel sin costo adicional?
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "28px",
            color: "white",
            marginBottom: "20px",
            zIndex: 1,
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" // Ajusta los valores de desplazamiento, difuminado y color según tu preferencia
          }}>
          En Ultra Vip te ofrecemos acceso exclusivo a recursos de élite sin
          ningún cargo.
        </Typography>

        <br />
        <Box>
          <GoldButton
            onClick={handleSignInClick}
            variant="contained"
            color="primary2">
            INICIAR SESIÓN
          </GoldButton>
          <Button
            onClick={handleRegisterClick}
            variant="contained"
            style={{
              borderRadius: "7px",
              borderColor: "rgba(143,95,37,1)",
              borderStyle: "solid",
              borderWidth: "1px",
              margin: "0 10px",
              background: "transparent",
              color: "white",
              textTransform: "none",
              textAlign: "center",
              zIndex: 2
            }}>
            Registrar ahora
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

const Video = styled("video")(({ theme }) => ({
  // position: 'absolute',
  // width: '100%',
  // zIndex: 0,
  [theme.breakpoints.up("xs")]: {
    // top: 0
  },
  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
  [theme.breakpoints.up("xxl")]: {
    // bottom: 0,
    // top: 'initial'
  }
}))

export default MainSection
