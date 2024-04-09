import { useTheme } from "@emotion/react"
import { Box, Container } from "@mui/material"
import BackgroundImage from "../assets/img/common/city_background.png"
import Sidebar from "./Sidebar"

function PageWrapper({ sx = {}, expanded = false, empty = false, children }) {
  const theme = useTheme()

  const containerExpanded = (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        height: "89vh",
        width: "100%",
        overflow: "hidden",
        justifyContent: "space-evenly"
      }}>
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
      <Box
        sx={{
          position: "relative",
          zIndex: 0,
          flex: 1,
          backgroundColor: "black",
          width: "80%"
        }}>
        {children}
      </Box>
    </Box>
  )

  return containerExpanded
}

export default PageWrapper
