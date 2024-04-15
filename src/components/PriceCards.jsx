import { Box } from "@mui/material"
import PriceCard from "./PriceCard"
import { optionsPlan90, planFondeo } from "./constants/constants"

function PriceCards() {
  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        marginTop: 20,
        marginBottom: 20,
        flexWrap: "wrap",
        gap: 20
      }}>
      <PriceCard
        header={{
          title: "Plan 90",
          price: "$299 usd",
          realPrice: "$3.100 usd",
          description: "Todos los cursos ahora solo por",
          discount: "90.35% Discount 🔥"
        }}
        options={optionsPlan90}
      />
      <PriceCard
        header={{
          title: "Club del fondeo 2.0",
          price: "$300 usd",
          realPrice: "$350/month",
          description: "Todos los cursos ahora solo por",
          discount: "16.67% Discount 🔥"
        }}
        options={planFondeo}
      />
    </Box>
  )
}

export default PriceCards
