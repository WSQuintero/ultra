import { Box, Typography } from "@mui/material"
import PriceCard from "./PriceCard"
import { optionsPlan90, planFondeo } from "./constants/constants"
import { useContext, useEffect, useState } from "react"
import { MyContext } from "../generalContext/GeneralContext"
import ProductSlider from "./ProductSlider"

function PriceCards({ fromDashboard = false }) {
  const { $Products, token } = useContext(MyContext)
  const [products, setProducts] = useState(null)

  useEffect(() => {
    const getPlans = async () => {
      const { status, data } = await $Products.getProducts(token)

      if (status) {
        setProducts(data)
      } else {
        console.log(data)
      }
    }

    getPlans()
  }, [])

  return (
    <Box
      style={{
        width: "100%",
        marginTop: 10,
        marginBottom: 20
      }}>
      {!fromDashboard && (
        <Typography
          variant="h5"
          gutterBottom
          sx={{ width: "100%", textAlign: "left", padding: 2, color: "white" }}>
          Para acceder a esta sección debes comprar una Membresía:
        </Typography>
      )}
      {/* <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: 20
        }}>
        {products?.map((product) => (
          <PriceCard
            key={product.id}
            header={{
              title: product.name,
              price: `$${product.amount_usdt} USDT`,
              realPrice: `$${product.amount_usdt} USDT`,
              description: "Todos los cursos ahora solo por",
              discount: "-🔥",
              urlImg: product.image
            }}
            options={JSON.parse(product.description)}
          />
        ))}

        <PriceCard
          header={{
            title: "Club del fondeo 2.0",
            price: "$399 usd",
            realPrice: "$399/mes",
            description: "Todos los cursos ahora solo por",
            discount: "- 🔥",
            urlImg: "/CLUB DEL FONDEO 2.0-01.png"
          }}
          options={planFondeo}
        />
      </Box> */}
      <ProductSlider products={products} fromDashboard={fromDashboard} />
    </Box>
  )
}

export default PriceCards
