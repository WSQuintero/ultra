import { AppBar, Toolbar, Box, Avatar, useMediaQuery } from "@mui/material"
import { useLocation, useNavigate } from "react-router"
import SlugInvitation from "./SlugInvitation"
import { MyContext } from "../generalContext/GeneralContext"
import { useContext } from "react"
import { IoMenu } from "react-icons/io5"

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const isMobile = useMediaQuery("(max-width: 600px)")
  const { actualUser, openSidebar, setOpenSideBar } = useContext(MyContext)
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgba(0,0,0)",
        justifyCenter: "center",
        paddingX: 4,
        height: "70px",
        display:
          !actualUser?.email ||
          location.pathname.includes("/signin") ||
          location.pathname.includes("/signup") ||
          location.pathname.includes("/forgot-password") ||
          location.pathname.includes("/landing") ||
          location.pathname.includes("/auth/validateEmail") ||
          location.pathname === "/" ||
          location.pathname.includes("auth/")
            ? "none"
            : "flex"
      }}>
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            gap: 3,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}>
          <Box
            onClick={() => setOpenSideBar(!openSidebar)}
            sx={{ cursor: "pointer" }}>
            <IoMenu size={40} />
          </Box>
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              maxWidth: "100%",
              height: "80%",
              cursor: "pointer",
              flexShrink: 0
            }}
            onClick={() => navigate("/")}
          />
          <SlugInvitation />
        </Box>

        {/* <Avatar
          alt="Profile"
          src="/profile.webp"
          sx={{ width: 32, height: 32, ml: 2, cursor: "pointer" }}
        /> */}
      </Toolbar>
    </AppBar>
  )
}

export default Header
