import { Image } from "@mui/icons-material";
import { Box } from "@mui/material";

const LogosSection = () => {
  return (
    <Box display="flex" justifyContent="center" style={{height: 70, backgroundColor: 'rgba(22, 23, 27, 1)'}}>
      <img src="/Ultra_files/logos/proline.svg"/>
      <img src="/Ultra_files/logos/octopus.svg"/>
      <img src="/Ultra_files/logos/flash.svg"/>
      <img src="/Ultra_files/logos/hitech.svg"/>
      <img src="/Ultra_files/logos/invert.svg"/>
      <img src="/Ultra_files/logos/snowflake.svg"/>
    </Box>
  )  
}

export default LogosSection;