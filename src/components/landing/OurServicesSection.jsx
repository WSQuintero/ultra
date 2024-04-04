import { Box, Card, CardContent, Typography } from '@mui/material';

const OurServicesSection = () => {
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Typography>Our Services</Typography>
      <Typography>
        Both a free trial and a free set of features for anyone who wants to use
        them. The more orders your company
      </Typography>
      <Box>
        {[1, 2, 3, 4, 5, 6].map((e, i) => (
          <ServiceCard key={i} />
        ))}
      </Box>
    </Box>
  );
};

export default OurServicesSection;

const ServiceCard = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <img />
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
