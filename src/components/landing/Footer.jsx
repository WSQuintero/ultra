import { Box, Typography, Button, useMediaQuery } from "@mui/material"
import Divider from "@mui/material/Divider"
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material"
import theme from "../../theme"

const SocialMediaIcons = () => {
  return (
    <div>
      <div>
        <Facebook sx={{ marginRight: 2, marginLeft: 5 }} />
        <Twitter sx={{ marginRight: 2 }} />
        <Instagram sx={{ marginRight: 2 }} />
        <LinkedIn sx={{ marginRight: 2 }} />
      </div>
    </div>
  )
}

const Footer = () => {
  const xxlMatches = useMediaQuery(() => theme.breakpoints.up("xxl"))
  const mdMatches = useMediaQuery(() => theme.breakpoints.up("md"))
  const smMatches = useMediaQuery(() => theme.breakpoints.up("sm"))

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth"
      })
    }
  }
  return (
    <Box sx={{ backgroundColor: "rgba(23, 24, 28, 1)", width: "100%" }}>
      <Box
        sx={{
          maxWidth: xxlMatches ? "70%" : "90%",
          margin: "0 auto",
          padding: "10px 0 20px 0",
          // height: '200px',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "white"
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            padding: "10px",
            backgroundColor: "tarnsparent",
            flexDirection: {
              xs: "column",
              sm: "row"
            }
          }}>
          <img
            src="/logo-principal.png"
            alt="Imagen"
            style={{
              top: "50%",
              left: "50%",
              width: "50px",
              height: "auto",
              margin: xxlMatches ? "15px" : "15px 5px",
              marginRight: xxlMatches && 250
            }}
          />
          <Button
            variant="text"
            sx={{ color: "white", fontWeight: 200 }}
            onClick={() => handleScrollToSection("main-section")}>
            Quienes somos
          </Button>
          <Button
            variant="text"
            sx={{ color: "white", fontWeight: 200 }}
            onClick={() => handleScrollToSection("our-mission")}>
            Servicio
          </Button>
          <Button
            variant="text"
            sx={{ color: "white", fontWeight: 200 }}
            onClick={() => handleScrollToSection("plans-princing")}>
            Planes
          </Button>
          <Button
            variant="text"
            sx={{ color: "white", fontWeight: 200 }}
            onClick={() => handleScrollToSection("contact")}>
            MContacto
          </Button>
          {/* <Button variant="text" sx={{ color: "white", fontWeight: 200 }}>
            Ultra Cards
          </Button> */}

          {xxlMatches && <SocialMediaIcons />}
        </Box>
        <Divider
          sx={{ backgroundColor: "rgba(105, 105, 105, 0.4)" }}
          flexItem
        />
        <br />
        <Box display={"flex"} justifyContent="center">
          <Typography style={{ fontWeight: 100 }}>
            Copyright 2024 © Ultra Markets
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export { Footer }
