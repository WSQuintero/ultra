import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const OurServicesSection = () => {
  return (
    <Box
      // height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      position="relative"
    >
      <img
        src="/Ultra_files/our_services_bg.png"
        alt="Background"
        style={{ position: 'absolute', width: '50%', height: 'auto' }}
      />
      <br />
      <Typography
        variant="h2"
        align="center"
        sx={{
          fontWeight: 600,
          fontSize: '48px',
          lineHeight: '57.6px',
          color: 'white',
        }}
      >
        Our Services
      </Typography>
      <br />

      <Box
        sx={{
          width: {
            xs: '70%',
            xxl: '30%',
          },
        }}
      >
        <Typography
          variant="body1"
          align="center"
          sx={{
            fontWeight: 200,
            fontSize: '18px',
            lineHeight: '28.8px',
            color: 'white',
          }}
        >
          Both a free trial and a free set of features for anyone who wants to
          use them. The more orders your company
        </Typography>
        <br />
      </Box>
      <Box
        padding="10px"
        sx={{
          flexGrow: 1,
          width: {
            xs: '90%',
            xxl: '80%',
            xxxl: '60%',
          },
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          // columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid xs={12} sm={6} md={6} lg={4} key={index}>
              <Item elevation={8} padding="10px">
                <img
                  src="/Ultra_files/bank_icon.png"
                  alt="Background"
                  style={{ height: '50px', width: '50px' }}
                />
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: { xs: 16, md: 18, xxl: 24, xxxl: 26 },
                  }}
                >
                  {getTitle(index)}
                </Typography>
                <br />
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 200,
                    fontSize: { xs: 15, md: 16, xxl: 20, xxxl: 22 },
                  }}
                >
                  {getSubTitle(index)}
                </Typography>
                <Box />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 1)',
  borderRadius: '16px',
  margin: '20px',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '220px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0px 0px 20px rgba(0,0,0,0.2)',
    transform: 'translateY(-5px)',
  },
}));

const getTitle = (index) => {
  const titles = [
    'PlAN 90',
    'SALA DE TRADING',
    'INVERHOME',
    'ULTRA PROFITS',
    'ULTRA SCANNER',
    'CLUB DEL FONDEO 2.0',
  ];

  return titles[index % titles.length];
};

const getSubTitle = (index) => {
  const subtitle = [
    'EDUCACIÓN',
    'EDUACIÓN INTENSIVA',
    'FRACCIONES INMOBILIARIAS',
    'COPYTRADING',
    'PROYECCIONES I.A',
    'CUENTAS DE FONDEO',
  ];

  return subtitle[index % subtitle.length];
};

export default OurServicesSection;
