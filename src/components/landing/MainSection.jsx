import { Box, Button, Typography } from "@mui/material";
import { GoldButton } from "./GoldButton";

const MainSection = () => {
  const handleSignInClick = () => {
    window.location.href = '/signin'; 
  };
  
  const handleRegisterClick = () => {
    window.location.href = '/signup'; 
  };
  return (
    <Box
      id="main-section" 
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      position="relative"
    >
      <video src="/FONDO-PRINCIPAL-VIDEO.mp4" autoPlay muted  loop alt="Background" style={{ position: 'absolute', bottom: "0px", width: '100%',zIndex: 0 }} />
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        height="100px"  
        background="linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))"
        zIndex="1"
      />
      <Box 
        width="70%" 
        textAlign="center" 
        display="flex"
        alignItems="center" 
        justifyContent="center"
        flexDirection="column"
        style={{color: "white"}} 
      >
      <Box></Box>
        <Typography
          variant="h1"
          component="div"
          style={{
            fontFamily: 'Hubot Sans Expanded, sans-serif',
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '33.6px',
            background: 'linear-gradient(143deg, rgba(143,95,37,1) 0%, rgba(252,227,143,1) 50%, rgba(143,95,37,1) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '20px',
            zIndex: 1,
          }}
        >
          WELCOME TO ULTRA
        </Typography>
        <Typography
          variant="h1"
          component="div"
          style={{
            fontFamily: 'Bricolage Grotesque, sans-serif',
            fontWeight: 700,
            fontSize: '56px',
            lineHeight: '61.6px',
            marginBottom: '20px',
            zIndex: 1,

          }}
        >
          Ready to Take Your Trading to The Next Level Without Additional Cost?
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '28px',
            color: 'white',
            marginBottom: '20px',
            zIndex: 1,

          }}
        >
          En Ultra Vip te ofrecemos acceso exclusivo a recursos de élite sin ningún cargo.
        </Typography>
        <br/>
        <Box>
          <GoldButton onClick={handleSignInClick} variant="contained" color="primary2">INICIAR SESIÓN</GoldButton>
          <Button
          onClick={handleRegisterClick}
            variant="contained" 
            style={{
              borderRadius: '7px',
              borderColor: 'rgba(143,95,37,1)',
              borderStyle: 'solid',
              borderWidth: '1px',
              margin: '0 10px', 
              background: 'transparent',
              color: 'white', 
              textTransform: 'none', 
              textAlign: 'center',
            }}
          >
            REGISTER NOW
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default MainSection;
