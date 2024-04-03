import { Box, Button, Typography } from "@mui/material";
import { GoldButton } from "./GoldButton";

const MainSection = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      position="relative"
    >
      <img src="/Ultra_files/main_stars_bg.png" alt="Background" style={{ position: 'absolute', width: '50%' }} />
      <img src="/Ultra_files/Group_2.png" alt="Background" style={{ position: 'absolute', bottom: "0px", width: '100%' }} />
      <img src="/Ultra_files/main_eclipse_bg.png" alt="Background" style={{ position: 'absolute', width: '100%', height: '100%'}} />
      <Box 
        width="70%" 
        textAlign="center" 
        display="flex"
        alignItems="center" 
        justifyContent="center"
        flexDirection="column"
        style={{color: "white"}} 
      >
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
          }}
        >
          En Ultra Vip te ofrecemos acceso exclusivo a recursos de élite sin ningún cargo.
        </Typography>
        <Box>
          <GoldButton variant="contained" color="primary2">INICIAR SESIÓN</GoldButton>
          <Button
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
