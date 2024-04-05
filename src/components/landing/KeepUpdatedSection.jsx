import { Box, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { GoldButton } from './GoldButton';
import { styled } from '@mui/system';

const KeepUpdatedSection = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      position="relative"
    >
      <img
        src="/Ultra_files/subscribe_bg.png"
        alt="Background"
        style={{ position: 'absolute', width: '70%', height: '55%', zIndex: 0, borderRadius: '20px' }}
      />

      <Box width="40%">
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontFamily: 'Bricolage Grotesque',
            fontWeight: 600,
            fontSize: '48px',
            lineHeight: '57.6px',
            color: 'white',
            position: 'relative',
            zIndex: 1
          }}
        >
          Stay Informed and never miss an crypteck update!
        </Typography>
      </Box>
      <br/>
      <br/>

      <CustomOutlinedInput
      id="outlined-adornment-weight"
      placeholder="Enter your email address"
      endAdornment={
        <InputAdornment position="end">
          <GoldButton variant="contained" color="primary2">Subscribe now</GoldButton>
        </InputAdornment>
      }
      aria-describedby="outlined-weight-helper-text"
      inputProps={{
        'aria-label': 'weight',
      }}
      style={{ zIndex: 1, backgroundColor: 'rgba(255, 255, 255, 0.18)', borderRadius: '15px', backdropFilter: 'blur(5px)', width: '35%' }}
    />
    </Box>
  );
};
const CustomOutlinedInput = styled(OutlinedInput)({
  '& .MuiOutlinedInput-input': {
    '&::placeholder': {
      color: 'white', 
      fontSize: '0.9rem', 
    },
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'white', 
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white', 
    },
    '&:focus-within fieldset': {
      borderColor: 'white', 
    },
  },
});

export default KeepUpdatedSection;
