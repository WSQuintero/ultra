import MainSection from "../components/landing/MainSection"
import LogosSection from "../components/landing/LogosSection"
import Navbar from "../components/landing/NavBar"
import OurMissionSection from "../components/landing/OurMissionSection"

function Landing() {
  return (
    <div style={{background: "rgba(16, 17, 21, 1)"}} >
      <Navbar />
      <MainSection/>
      <LogosSection/>
      <OurMissionSection/>
    </div>
  )
}

export default Landing
