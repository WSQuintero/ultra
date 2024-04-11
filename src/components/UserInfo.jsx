import { Box, IconButton, Typography } from "@mui/material"

function UserInfo({ label, value, icon }) {
  return (
    <Box
      sx={{
        borderBottom: "1px solid white",
        padding: 1
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
        <Typography
          sx={{ fontSize: 12, color: "white" }}
          variant="body2"
          color="textPrimary">
          {label}
        </Typography>

        <IconButton color="inherit">{icon}</IconButton>
      </Box>
      <Typography sx={{ fontSize: 20 }} color="textPrimary">
        {value}
      </Typography>
    </Box>
  )
}

export default UserInfo
