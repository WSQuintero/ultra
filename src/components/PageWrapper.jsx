import { useTheme } from "@emotion/react"
import { Box, Container } from "@mui/material"
import BackgroundImage from "../assets/img/common/city_background.png"
import Sidebar from "./Sidebar"
import { useContext } from "react"
import { MyContext } from "../generalContext/GeneralContext"

function PageWrapper({ sx = {}, expanded = false, empty = false, children }) {
  const theme = useTheme()
  const { openSidebar } = useContext(MyContext)
  const containerExpanded = (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        height: "87vh",
        width: "100%",
        overflow: "hidden",
        justifyContent: "space-evenly"
      }}>
      {openSidebar && (
        <Box
          sx={{
            position: "relative",
            zIndex: 0,
            flex: 1,
            backgroundColor: "black",
            maxWidth: "20%"
          }}>
          <Sidebar />
        </Box>
      )}

      <Box
        sx={{
          backgroundColor: "rgba(0,0,0,0.8)",
          width: "80%",
          flex: 1,
          position: "relative",
          overflow: "auto"
        }}>
        <Box
          sx={{
            zIndex: 0,
            flex: 1,
            backgroundColor: "rgba(255,255,255,0,1)",
            width: "100%"
          }}>
          {children}
        </Box>
      </Box>
    </Box>
  )

  return containerExpanded
}

export default PageWrapper
