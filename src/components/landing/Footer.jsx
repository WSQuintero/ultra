import { Box, Typography, Button  } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";



const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "rgba(23, 24, 28, 1)", width: "100%" }}>
      <Box
        sx={{
          maxWidth: "70%",
          margin: "0 auto",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "white",
        }}
      >
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', padding: '10px', backgroundColor: 'tarnsparent' }}>
       <img
              src="/logo-principal.png"
              alt="Imagen"
              style={{
                top: "50%",
                left: "50%",
                width: "50px",
                height: 'auto',
                margin: '15px',
                marginRight: 250,
              }}
            />
        <Button variant="text" sx={{ color: 'white', fontWeight: 200 }}>Golden EA</Button>
      <Button variant="text" sx={{ color: 'white' , fontWeight: 200}}>Funding</Button>
      <Button variant="text" sx={{ color: 'white', fontWeight: 200 }}>Program</Button>
      <Button variant="text" sx={{ color: 'white', fontWeight: 200 }}>Marketplace</Button>
      <Button variant="text" sx={{ color: 'white', fontWeight: 200 }}>Ultra Cards</Button>
     
          <SocialMediaIcons />
    </Box>
        <Box display={"flex"} justifyContent="center">
        </Box>
        <Divider sx={{ backgroundColor: "rgba(105, 105, 105, 0.4)" }} flexItem />
        <br/>
        <Box display={"flex"} justifyContent="center">
          <Typography style={{fontWeight:100}}>Copyright 2024 © Ultra Markets</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

const SocialMediaIcons = () => {
  return  <div>
  <div>
      <Facebook sx={{ marginRight: 2, marginLeft: 5 }} />
      <Twitter sx={{ marginRight: 2 }} />
      <Instagram sx={{ marginRight: 2 }} />
      <LinkedIn sx={{ marginRight: 2 }}/>
    </div>
</div>;
};
