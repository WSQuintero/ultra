import PriceCard from "./PriceCard"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const isValidJson = (str) => {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}
function ProductSlider({ products, fromDashboard = false }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  const sliderContainerStyle = {
    maxWidth: "98%",
    height: "70vh", // Ajusta esta altura según tus necesidades
    margin: "0 auto",
    padding: "20px"
  }

  return (
    <div style={sliderContainerStyle}>
      <Slider {...settings}>
        {products?.map((product) => (
          <div key={product.id}>
            {product.name !== "EXCALPER" && (
              <PriceCard
                fromDashboard={fromDashboard}
                header={{
                  title: product.name,
                  price: `$${product.amount_usdt} USDT`,
                  realPrice: `$${product.amount_usdt} USDT`,
                  description: "Todos los cursos ahora solo por",
                  discount: "-🔥",
                  urlImg: product.image
                }}
                options={
                  product?.description
                    ? isValidJson(product?.description)
                      ? JSON.parse(product?.description)
                      : []
                    : []
                }
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ProductSlider
