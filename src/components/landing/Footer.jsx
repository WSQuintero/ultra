import { Box, Typography } from "@mui/material"

const Footer = () => {
  return (
    <Box>
      <Box display={"flex"}>
        <img/>
        <Box>

        </Box>
        <SocialMediaIcons />
      </Box>
      <Box display={"flex"}>
        <Typography>Copyright 2024 © Ultra Markets</Typography>
        <Box>
          <Typography>Support-</Typography>
          {/* TELEGRAM ICON AND BUTTON */}
          <Box>
            <img/>
            <Typography>Telegram</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer;

const SocialMediaIcons = () => {
  return (
    <Box>
          
    </Box>
  )
}