import { Box, Button, Typography, useMediaQuery } from "@mui/material"
import { GoldButton } from "./GoldButton"
import styled from "@emotion/styled"

const MainSection = () => {
  const matches = useMediaQuery("(max-width:752px)")
  const matches500 = useMediaQuery("(max-width:500px)")

  const handleSignInClick = () => {
    window.location.href = "/signin"
  }

  const handleRegisterClick = () => {
    window.location.href = "/signup"
  }
  return (
    <Box
      id="main-section"
      display={"flex"}
      marginTop={"56px"}
      // minHeight={'100%'}
      position="relative">
      <Box
        position="relative"
        overflow="hidden"
        width={"100%"}
        sx={{
          paddingBottom: matches ? "520px" : "calc((100% * (1130/1920)))"
        }}>
        <Video
          src="/FONDO-PRINCIPAL-VIDEO.mp4"
          autoPlay
          muted
          loop
          alt="Background"
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            left: matches ? (matches500 ? "-65%" : "-40%") : "0",
            bottom: "0",
            // minWidth: matches ? '1040px' : '100%',
            width: matches
              ? matches500
                ? "calc((100% * (1130/1920))*4)"
                : "calc((100% * (1130/1920))*3)"
              : "100%",
            // objectFit: "contain",
            // objectPosition: "50% 50%",
            // height: '100%',
            zIndex: 0
          }}
        />
      </Box>
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        height="100px"
        background="linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))"
        zIndex="1"
      />
      <Box
        // left={0}
        position="absolute"
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        sx={{
          color: "white",
          width: "100%",
          top: {
            xs: "25%",
            xl: "28%",
            xxl: "30%"
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
            fontSize: {
              md: "21px",
              xl: "22px",
              xxl: "24px"
            },
            background:
              "linear-gradient(143deg, rgba(143,95,37,1) 0%, rgba(252,227,143,1) 50%, rgba(143,95,37,1) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" // Ajusta los valores de desplazamiento, difuminado y color según tu preferencia
          }}>
          WELCOME TO ULTRA
        </Typography>
        <Typography
          color={"white"}
          variant="h3"
          marginBottom={"20px"}
          zIndex={1}
          fontFamily="Hubot Sans Expanded, sans-serif"
          fontWeight={700}
          sx={{
            paddingX: {
              xxl: "20%",
              md: "10%",
              xs: "5%"
            },
            fontSize: {
              xs: "26px",
              md: "28px",
              lg: "40px",
              xxl: "56px"
            },
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" // Ajusta los valores de desplazamiento, difuminado y color según tu preferencia
          }}>
          Ready to Take Your Trading to The Next Level Without Additional Cost?
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: {
              xs: "18px",
              lg: "20px",
              xl: "23px"
            },
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
            REGISTRAR AHORA
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
