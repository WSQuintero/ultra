import { Box, Button, Typography } from "@mui/material";
import { GoldButton } from "./GoldButton";

const MainSection = () => {
  return (
    <Box height={"100vh"} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
      <img src="/Ultra_files/Group_2.png" style={{position: 'absolute', bottom: "0px", width: '100%'}}/>
      <Box  display="flex" alignItems="center" justifyContent="center" flexDirection="column">
        <Typography>WELCOME TO ULTRA</Typography>
        <Typography>Ready to Take Your Trading to The Next Level Without Additional Cost?</Typography>
        <Typography>En Ultra Vip te ofrecemos acceso exclusivo a recursos de élite sin ningún cargo.</Typography>
        <Box>
          <GoldButton variant="contained" color="primary2">INICIAR SESIÓN</GoldButton>
          <Button variant="outlined">REGISTER NOW</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default MainSection;