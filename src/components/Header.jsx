import { AppBar, Toolbar, Box, Avatar } from "@mui/material"
import { useLocation, useNavigate } from "react-router"
import SlugInvitation from "./SlugInvitation"

function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ab8e3a",
        justifyCenter: "center",
        display:
          location.pathname === "/signin" ||
          location.pathname === "/signup" ||
          location.pathname === "/forgot-password" ||
          location.pathname === "/landing" ||
          location.pathname === "/auth/validateEmail"
            ? "none"
            : "flex"
      }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ maxWidth: "100%", height: "auto", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Box>
        <SlugInvitation />

        <Avatar
          alt="Profile"
          src="/profile.webp"
          sx={{ width: 32, height: 32, ml: 2, cursor: "pointer" }}
        />
      </Toolbar>
    </AppBar>
  )
}

export default Header
