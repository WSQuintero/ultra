import { AppBar, Toolbar, Box, Avatar } from "@mui/material"
import { useLocation, useNavigate } from "react-router"

function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1e293b",
        justifyCenter: "center",
        display:
          location.pathname === "/signin" || location.pathname === "/signup"
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
        {/* Aquí se agrega el Avatar */}
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
