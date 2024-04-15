import { AppBar, Toolbar, Button, Box, useMediaQuery } from "@mui/material"
import { GoldButton } from "./GoldButton"
import theme from "../../theme"

function Navbar() {
  const matches = useMediaQuery(() => theme.breakpoints.up("lg"))

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth"
      })
    }
  }

  const handleSignInClick = () => {
    window.location.href = "/signin"
  }

  const handleRegisterClick = () => {
    window.location.href = "/signup"
  }

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#17181C" }}>
      <Toolbar
        sx={{ justifyContent: { xs: "space-between", lg: "space-evenly" } }}>
        <img
          src="/Ultra_files/logo.png"
          alt="Logo"
          onClick={() => handleScrollToSection("main-section")}
        />
        <Box
          sx={{
            display: {
              xs: "none",
              lg: "block"
            }
          }}>
          <Button
            color="inherit"
            onClick={() => handleScrollToSection("main-section")}>
            QUIENES SOMOS
          </Button>
          <Button
            color="inherit"
            onClick={() => handleScrollToSection("our-mission")}>
            SERVICIO
          </Button>
          <Button
            color="inherit"
            onClick={() => handleScrollToSection("plans-princing")}>
            PLANES
          </Button>
          <Button
            color="inherit"
            onClick={() => handleScrollToSection("contact")}>
            CONTACT
          </Button>
        </Box>
        {matches ? (
          <Box gap="10px" display="flex">
            <GoldButton
              variant="contained"
              color="primary2"
              onClick={handleSignInClick}>
              INICIAR SESIÓN
            </GoldButton>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleRegisterClick}>
              REGISTRAR
            </Button>
          </Box>
        ) : (
          <Box></Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
export { Navbar }
