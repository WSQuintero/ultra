import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { GoldButton } from "./GoldButton"
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    window.location.href = '/signin'; 
  };
  
  const handleRegisterClick = () => {
    window.location.href = '/signup'; 
  };

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
          <GoldButton variant="contained" color="primary2" onClick={handleSignInClick}>INICIAR SESIÓN</GoldButton>
          <Button variant="outlined" color="inherit" onClick={handleRegisterClick}>REGISTER</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default Navbar

