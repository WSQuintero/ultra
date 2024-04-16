import { AppBar, Toolbar, Box, Avatar } from "@mui/material"
import { useLocation, useNavigate } from "react-router"
import SlugInvitation from "./SlugInvitation"
import { MyContext } from "../generalContext/GeneralContext"
import { useContext } from "react"
import { IoMenu } from "react-icons/io5"

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { actualUser, openSidebar, setOpenSideBar } = useContext(MyContext)
  return (
    <AppBar
      position="static"
      sx={{
        background:
          "linear-gradient(140.75deg, #8F5F25 11.94%, #DBBB6F 61.03%, #8F5F25 113.42%)",
        justifyCenter: "center",
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
            justifyContent: "center",
            alignItems: "center"
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
        </Box>
        <SlugInvitation />

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
