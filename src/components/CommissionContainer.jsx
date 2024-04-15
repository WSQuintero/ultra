import { Container, Typography } from "@mui/material"

function CommissionContainer({ icon, title, value }) {
  return (
    <Container
      sx={{
        backgroundColor: "rgba(0,0,0)",
        width: "400px",
        height: "250px",
        borderRadius: 3,
        border: "1px solid #6e5c25"
      }}>
      <img
        src={icon}
        alt="frame"
        style={{ marginTop: "25px", width: "50px" }}
      />
      <Typography sx={{ fontSize: 18, marginTop: 2, color: "white" }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: 30, color: "white", fontWeight: "bold" }}>
        {value}
      </Typography>
    </Container>
  )
}

export default CommissionContainer
