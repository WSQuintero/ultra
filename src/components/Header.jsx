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
          location.pathname.includes("/signin") ||
          location.pathname.includes("/signup") ||
          location.pathname.includes("/forgot-password") ||
          location.pathname.includes("/landing") ||
          location.pathname.includes("/auth/validateEmail") ||
          location.pathname.includes === "/"
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
