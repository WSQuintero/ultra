import { Container, Typography, useMediaQuery } from "@mui/material"

function CommissionContainer({ icon, title, value }) {
  const isMobile = useMediaQuery("(max-width:600px)")

  return (
    <Container
      sx={{
        backgroundColor: "rgba(0,0,0)",
        width: isMobile ? "100%" : "400px", // Cambio de ancho en móvil
        height: isMobile ? "200px" : "250px", // Ajuste de altura en móvil
        borderRadius: 3,
        border: "1px solid #6e5c25",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Centrado en móvil
        justifyContent: "center", // Centrado en móvil
        textAlign: "center",
        padding: "20px",
        boxSizing: "border-box" // Para que el padding no afecte el ancho y alto
      }}>
      <img
        src={icon}
        alt="frame"
        style={{ width: "50px", marginBottom: "15px" }}
      />
      <Typography
        sx={{
          fontSize: isMobile ? 16 : 18,
          color: "white",
          marginBottom: "10px"
        }}>
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: isMobile ? 24 : 30,
          color: "white",
          fontWeight: "bold"
        }}>
        {value}
      </Typography>
    </Container>
  )
}

export default CommissionContainer
