import PriceCard from './PriceCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Swiper, SwiperSlide } from 'swiper/react'
// import { Pagination } from "swiper/modules"
import 'swiper/css'
import 'swiper/css/pagination'

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
          centerPadding: '25%' // Ajusta el espacio en móvil
        }
      }
    ]
  }

  const sliderContainerStyle = {
    width: '100%',
    height: 'auto',
    margin: '0 auto',
    padding: '20px'
  }

  return (
    <div style={sliderContainerStyle}>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true
        }}
        // modules={[Pagination]}
        className='mySwiper'>
        {/* <Slider {...settings}> */}
        {products
          ?.filter((product) => product.name !== 'EXCALPER')
          .map((product) => (
            <SwiperSlide key={product.id}>
              <div>
                <PriceCard
                  fromDashboard={fromDashboard}
                  header={{
                    title: product.name,
                    price: `$${product.amount_usdt} USDT`,
                    realPrice: `$${product.amount_usdt} USDT`,
                    description: 'Todos los cursos ahora solo por',
                    discount: '-🔥',
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
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default ProductSlider
