import { Box, Card, CardContent, Typography } from "@mui/material";

const PricingSection = () => {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography>Pricing & Plans</Typography>
      <Typography>Both a free trial and a free set of features for anyone who wants to use them. The more orders your company</Typography>
      <Box display={"flex"}>
        {[1,2,3].map((e) => <PlanCard key={e}/>)}
      </Box>
    </Box>
  )
}

const PlanCard = () => {
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
  )
}

export default PricingSection;