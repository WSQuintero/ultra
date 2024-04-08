import { AppBar, Toolbar, Button, Box } from "@mui/material"
import { GoldButton } from "./GoldButton"

function Navbar() {

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleSignInClick = () => {
    window.location.href = '/signin'; 
  };
  
  const handleRegisterClick = () => {
    window.location.href = '/signup'; 
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#17181C" }}>
      <Toolbar style={{justifyContent: 'space-evenly'}}>
        <img src="/Ultra_files/logo.png" alt="Logo" onClick={()=> handleScrollToSection('main-section')}/>
        <Box>
        <Button color="inherit" onClick={() => handleScrollToSection('main-section')}>QUIENES SOMOS</Button>
          <Button color="inherit" onClick={() => handleScrollToSection('our-mission')}>SERVICIO</Button>
          <Button color="inherit" onClick={() => handleScrollToSection('plans-princing')}>PLANES</Button>
          <Button color="inherit" onClick={() => handleScrollToSection('contact')}>CONTACT</Button>
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

