import { Box, Typography, styled } from '@mui/material';
import MicrosoftCartView from './MicrosoftChartView';
import BitcoinCartView from './BitcoinChartView';

const OurMissionSection = () => {
  return (
    <Box display="flex" padding={10} marginTop={10}>
      <img src="/Ultra_files/bull.png" style={{ width: '50%' }} />
      <Box>
        <Typography
          variant="h1"
          component="div"
          sx={{
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
          OUR MISSION
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Bricolage Grotesque, sans-serif',
            fontWeight: 600,
            fontSize: '48px',
            lineHeight: '57.6px',
            color: 'white',
            marginBottom: '20px',
          }}
        >
          Nuestra Misión es tu Éxito
        </Typography>
        <Box width="70%">
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '28.8px',
              color: 'white',
              marginBottom: '20px',
            }}
          >
            En Ultra VIP, nuestra misión es simple: ayudarte a alcanzar tus metas financieras a través del trading. No importa si eres un principiante o un trader experimentado, aquí encontrarás los recursos y el apoyo que necesitas para triunfar en los mercados financieros de manera efectiva y accesible.
          </Typography>
        </Box>
        <Box display="flex">
          <StyledStatsCard>
            <BitcoinCartView />
          </StyledStatsCard>
          <StyledStatsCard>
            <MicrosoftCartView />
          </StyledStatsCard>
          <Box>
            <img src="/Ultra_files/pig_bg_img.png" alt="Background" style={{ position: 'absolute', width: '10%' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const StyledStatsCard = styled(Box)({
  display: 'absolute',
  border: '1px solid',
  margin: '5px',
  borderRadius: '12px',
  padding: '5px',
  color: '#DBBB6F',
});

export default OurMissionSection;
