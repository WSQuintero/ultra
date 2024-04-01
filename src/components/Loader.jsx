import PropTypes from "prop-types";
import { alpha, Box, CircularProgress } from "@mui/material";

function Loader({ show }) {
  if (!show) {
    return <></>;
  }

  return (
    <Box
      position="fixed"
      zIndex={1200}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      sx={{ backgroundColor: alpha("#ffffff", 0.5) }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}

Loader.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Loader;
