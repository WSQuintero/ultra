import { Box, InputAdornment, OutlinedInput, Typography } from '@mui/material';

const KeepUpdatedSection = () => {
  return (
    <Box>
      <Typography>Stay Informed and never miss an crypteck update!</Typography>
      <OutlinedInput
        id="outlined-adornment-weight"
        endAdornment={<InputAdornment position="end">kg</InputAdornment>}
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          'aria-label': 'weight',
        }}
      />
    </Box>
  );
};

export default KeepUpdatedSection;
