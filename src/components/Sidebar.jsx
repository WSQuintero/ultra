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
import {
  DashboardRounded as DashboardIcon,
  GroupRounded as GroupIcon,
  DescriptionRounded as ReportsIcon,
  PublishedWithChangesRounded as PublishedWithChangesIcon,
  LanRounded as NetworkIcon,
  LogoutRounded as LogoutIcon
} from "@mui/icons-material"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {
  const [, , logout] = useAuth()

  const pages = [
    { icon: <DashboardIcon />, name: "Dashboard", route: "/" },
    {
      icon: (
        <>
          <img src="/teacher.svg" alt="teacher.svg" />
        </>
      ),
      name: "Courses",
      route: "/courses"
    },
    {
      icon: (
        <>
          <img src="/insert_chart.svg" alt="insert_chart.svg" />
        </>
      ),
      name: "Earnings",
      route: "/earnings"
    },
    {
      icon: (
        <>
          <img src="/shield_person.svg" alt="shield_person.svg" />
        </>
      ),
      name: "Profile",
      route: "/profile"
    },
    {
      icon: (
        <>
          <img src="/request_quote.svg" alt="request_quote.svg" />
        </>
      ),
      name: "Report",
      route: "/report"
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

  return (
    <Box
      sx={{
        width: "20%",
        display: "flex",
        backgroundColor: "#010A1E",
        height: "100vh"
      }}>
      <div
        style={{
          width: "250px",
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
            <ListItem button key={name} component={NavLink} to={route}>
              <ListItemButton
                component={NavLink}
                to={route}
                sx={{
                  "&.active": { color: "primary.main", bgcolor: "#30160c" },
                  "&:hover": {
                    bgcolor: "#30160c"
                  }
                }}>
                <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "12px" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem sx={{ marginTop: "50px", marginLeft: "20px" }}>
            <Button
              onClick={() => logout()}
              to="/"
              sx={{
                justifyContent: "flex-start",
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "14px"
              }}
              startIcon={<LogoutIcon style={{ color: "red" }} />}>
              Logout
            </Button>
          </ListItem>
        </List>
      </div>
    </Box>
  )
}

export default Sidebar
