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
  )
}

export default PriceCards
