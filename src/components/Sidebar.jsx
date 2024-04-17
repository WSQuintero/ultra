import { NavLink } from "react-router-dom"
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
  Button
} from "@mui/material"
import { FaRegUser } from "react-icons/fa"

import {
  DashboardRounded as DashboardIcon,
  GroupRounded as GroupIcon,
  DescriptionRounded as ReportsIcon,
  PublishedWithChangesRounded as PublishedWithChangesIcon,
  LanRounded as NetworkIcon,
  LogoutRounded as LogoutIcon
} from "@mui/icons-material"
import useAuth from "../hooks/useAuth"
import { useContext } from "react"
import { MyContext } from "../generalContext/GeneralContext"

const Sidebar = () => {
  const [, , logout] = useAuth()
  const { actualUser } = useContext(MyContext)

  const pages = [
    { icon: <DashboardIcon />, name: "Dashboard", route: "/dashboard" },
    {
      icon: (
        <>
          <img src="/teacher.svg" alt="teacher.svg" />
        </>
      ),
      name: "Academia",
      route: "/courses"
    },
    {
      icon: (
        <>
          <img src="/insert_chart.svg" alt="insert_chart.svg" />
        </>
      ),
      name: "Ganancias",
      route: "/earnings"
    },
    {
      icon: (
        <>
          <img src="/shield_person.svg" alt="shield_person.svg" />
        </>
      ),
      name: "Perfil",
      route: "/profile"
    },
    {
      icon: (
        <>
          <img src="/video-square.svg" alt="video-square.svg" />
        </>
      ),
      name: "UltraLive",
      route: "/ultralive"
    }
  ]

  // Condición para omitir "Reportes" si actualUser.role es 0
  if (actualUser.rol === 1) {
    pages.splice(4, 0, {
      icon: (
        <>
          <img src="/request_quote.svg" alt="request_quote.svg" />
        </>
      ),
      name: "Reportes",
      route: "/report"
    })
  }
  if (actualUser.rol === 1) {
    pages.splice(4, 0, {
      icon: (
        <>
          <FaRegUser />
        </>
      ),
      name: "Usuarios",
      route: "/users"
    })
  }

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "rgba(255,255,255,0.1)",
        height: "100vh",
        width: "100%"
      }}>
      <div
        style={{
          position: "relative",
          top: "0",
          left: "0",
          height: "100%",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          color: "white"
        }}>
        <List>
          <Divider />
          {pages.map(({ icon, name, route }) => (
            <ListItem
              button
              key={name}
              component={NavLink}
              to={route}
              sx={{ py: 1 }}>
              <ListItemButton
                component={NavLink}
                to={route}
                sx={{
                  py: 0,
                  "&.active": {
                    color: "primary.main",
                    background:
                      "linear-gradient(140.75deg, #8F5F25 11.94%, #DBBB6F 61.03%, #8F5F25 113.42%)"
                  },
                  "&:hover": {
                    background:
                      "linear-gradient(140.75deg, #8F5F25 11.94%, #DBBB6F 61.03%, #8F5F25 113.42%)"
                  }
                }}>
                <ListItemIcon
                  sx={{ color: "rgba(255, 255, 255, 0.7)", minWidth: 0 }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "10px",
                    marginLeft: 2
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem sx={{ marginTop: "20px", marginLeft: "20px" }}>
            <Button
              onClick={() => logout()}
              to="/"
              sx={{
                justifyContent: "flex-start",
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "14px"
              }}
              startIcon={<LogoutIcon style={{ color: "red" }} />}>
              <span
                style={{ display: window.innerWidth <= 440 ? "none" : "flex" }}>
                Logout
              </span>
            </Button>
          </ListItem>
        </List>
      </div>
    </Box>
  )
}

export default Sidebar
