import { Box, Typography } from "@mui/material"
import PriceCard from "./PriceCard"
import { optionsPlan90, planFondeo } from "./constants/constants"

function PriceCards() {
  return (
    <Box
      style={{
        width: "100%",
        marginTop: 20,
        marginBottom: 20
      }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ width: "100%", textAlign: "left", padding: 2, color: "white" }}>
        Para acceder a esta sección debes comprar una Membresía:
      </Typography>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 20
        }}>
        <PriceCard
          header={{
            title: "Plan 90",
            price: "$299 usd",
            realPrice: "$299 usd",
            description: "Todos los cursos ahora solo por",
            discount: "-🔥"
          }}
          options={optionsPlan90}
        />
        <PriceCard
          header={{
            title: "Club del fondeo 2.0",
            price: "$399 usd",
            realPrice: "$399/mes",
            description: "Todos los cursos ahora solo por",
            discount: "- 🔥"
          }}
          options={planFondeo}
        />
      </Box>
    </Box>
  )
}

export default PriceCards
