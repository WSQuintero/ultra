import { Box, Typography, styled } from '@mui/material';

const OurMissionSection = () => {
  return (
    <Box display="flex" padding={10} marginTop={10}>
      <img src="/Ultra_files/bull.png" style={{width: '40%'}} />
      <Box>
        <Typography>OUR MISSION</Typography>
        <Typography>Nuestra Misión es tu Éxito</Typography>
        <Typography>
          En Ultra VIP, nuestra misión es simple: ayudarte a alcanzar tus metas
          financieras a través del trading. No importa si eres un principiante o
          un trader experimentado, aquí encontrarás los recursos y el apoyo que
          necesitas para triunfar en los mercados financieros de manera efectiva
          y accesible.
        </Typography>
        <Box display={'flex'}>
          <StatsCard>
            <Box>
              <Typography>Total Transactions</Typography>
              <Typography>60M +</Typography>
            </Box>
            <Box>
              <img src='/Ultra_files/Graph.svg' />
              <Typography>2.11%</Typography>
            </Box>
          </StatsCard>
          <StatsCard>
            <Box>
              <Typography>Active Project</Typography>
              <Typography>1000+</Typography>
            </Box>
            <Box>
              <img src='/Ultra_files/Graph.svg' />
              <Typography>2.11%</Typography>
            </Box>
          </StatsCard>
        </Box>
      </Box>
    </Box>
  );
};

const StatsCard = styled(Box)({
  display: 'flex',
  width: 300,
  border: '1px solid'
})
export default OurMissionSection;
