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
    centerMode: true,
    centerPadding: 0, // Aumenta el espacio entre las tarjetas
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "25%" // Ajusta el espacio en móvil
        }
      }
    ]
  }

  const sliderContainerStyle = {
    maxWidth: "80%",
    height: "auto",
    margin: "0 auto",
    padding: "20px"
  }

  return (
    <div style={sliderContainerStyle}>
      <Slider {...settings}>
        {products
          ?.filter((product) => product.name !== "EXCALPER")
          .map((product) => (
            <div key={product.id}>
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
            </div>
          ))}
      </Slider>
    </div>
  )
}

export default ProductSlider
