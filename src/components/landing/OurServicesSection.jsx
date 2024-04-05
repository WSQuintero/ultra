import { Box, Card, CardContent, Typography} from '@mui/material';
import Grid from '@mui/material/Grid'; 
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const OurServicesSection = () => {
  return (
    <Box  
    height="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    position="relative">
    <img src="/Ultra_files/our_services_bg.png" alt="Background" style={{ position: 'absolute', width: '50%', height: 'auto' }} />
    <br/>
    <br/>
    

    <Typography
      variant="h2"
      align="center"
      sx={{
        // fontFamily: 'Bricolage Grotesque',
        fontWeight: 600,
        fontSize: '48px',
        lineHeight: '57.6px',
        color: 'white'
      }}
    >
      Our Services
    </Typography>
    <br/>
    <Box width= '30%'>
    <Typography
      variant="body1"
      align="center"
      sx={{
        fontWeight: 200,
        fontSize: '18px',
        lineHeight: '28.8px',
        color: 'white'
      }}
    >
      Both a free trial and a free set of features for anyone who wants to use them. The more orders your company
    </Typography>
    </Box>
    <br/>
    <br/>

    

  
    </Box>
  );
};

export default OurServicesSection;



const ServiceCard = () => {
  return (
    <Card sx={{ width: '100px'  }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          Oli
        </Typography>
      </CardContent>
    </Card>
  );
};
