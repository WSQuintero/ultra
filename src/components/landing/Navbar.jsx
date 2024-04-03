import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { GoldButton } from "./GoldButton"

function Navbar() {
  return (
    <AppBar position="fixed" style={{ backgroundColor: "#17181C" }}>
      <Toolbar style={{justifyContent: 'space-evenly'}}>
        <img src="/Ultra_files/logo.png" alt="Logo"/>
        <Box>
          <Button color="inherit">QUIENES SOMOS</Button>
          <Button color="inherit">SERVICIO</Button>
          <Button color="inherit">PLANES</Button>
          <Button color="inherit">CONTACT</Button>
        </Box>
        <Box display="flex" gap="10px">
          <GoldButton variant="contained" color="primary2">INICIAR SESIÓN</GoldButton>
          <Button variant="outlined" color="inherit">REGISTER</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default Navbar

