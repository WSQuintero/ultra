import PriceCards from "../components/PriceCards"
import MainSection from "../components/landing/MainSection"
import TradingViewWidget from "../components/landing/LogosSection"
import OurMissionSection from "../components/landing/OurMissionSection"
import OurServicesSection from "../components/landing/OurServicesSection"
import PricingSection from "../components/landing/PricingSection"
import KeepUpdatedSection from "../components/landing/KeepUpdatedSection"
import { Navbar } from "../components/landing/Navbar"
import { TelegramIcon } from "../components/landing/TelegramFixIIcon"
import { Footer } from "../components/landing/Footer"
import { Box } from "@mui/material"

function Landing() {
  return (
    <div style={{ background: "rgba(16, 17, 21, 1)" }}>
      <Navbar />
      <MainSection />
      <div>
        <TradingViewWidget />
      </div>
      <OurMissionSection />
      <OurServicesSection />
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "80%" }}>
          <PriceCards fromDashboard={true} />
        </Box>
      </Box>
      <KeepUpdatedSection />
      <Footer />
      <TelegramIcon />
    </div>
  )
}

export default Landing
