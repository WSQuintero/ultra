import { Box, Container, Typography } from "@mui/material"

function PerformanceContainer() {
  return (
    <Container
      sx={{
        backgroundColor: "#010714",
        width: "100%",
        height: "280px",
        borderRadius: 3,
        padding: 3
      }}>
      <Typography sx={{ color: "white" }}>Sales Performance</Typography>
      <Container
        sx={{
          backgroundColor: "#0f172a",
          width: "100%",
          height: "85%",
          borderRadius: 3,
          padding: 3,
          marginTop: 1
        }}>
        <Box
          sx={{ display: "flex", borderBottom: "1px solid white", padding: 1 }}>
          <img
            src="/fi_7446910.png"
            alt="fi_7446910"
            style={{ width: "60px" }}
          />
          <Box>
            <Typography color="white">Let’s Achieve Your Sales Goal</Typography>
            <Typography>
              It is a long established fact that a reader will be distracted
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}>
          <Box sx={{ width: "50%" }}>
            <Typography>Ambassadors</Typography>
            <img src="/f.png" alt="f" />
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography>Masters</Typography>
            <img src="/f.png" alt="f" />
          </Box>
        </Box>
      </Container>
    </Container>
  )
}

export default PerformanceContainer
