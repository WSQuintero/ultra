import { Box, Typography } from "@mui/material"
import { GoldButton } from "./landing/GoldButton"

function ExpiredMembership() {
  return (
    <Box
      sx={{
        backgroundColor: "#131006",
        width: "97%",
        height: "150px",
        borderRadius: 3,
        border: "1px solid #6e5c25",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexShrink: 0,
        padding: 4
      }}>
      <Box
        display={"flex"}
        sx={{
          marginTop: 2,
          gap: 5,
          justifyConten: "center",
          alignItems: "center"
        }}>
        <Box display={"flex"} sx={{ gap: 2 }}>
          <Box>
            <img src="/fi_1680012.png" alt="fi_1680012" />
          </Box>
          <Box>
            <Typography>
              Tu membresía ha caducado, renuévala lo antes posible
            </Typography>
          </Box>
        </Box>
        <GoldButton>Renovar</GoldButton>
      </Box>
    </Box>
  )
}

export default ExpiredMembership
