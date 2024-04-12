import { useContext } from "react"
import { Box } from "@mui/material"
import PageWrapper from "../components/PageWrapper"
import PerfilCard from "../components/PerfilCard"
import { MyContext } from "../generalContext/GeneralContext.jsx"
import CommissionContainer from "../components/CommissionContainer.jsx"
import PerformanceContainer from "../components/PerformanceContainer.jsx"
import CommissionHistoryContainer from "../components/CommissionHistoryContainer.jsx"
import ExpiredMembership from "../components/ExpiredMembership.jsx"

function Profile() {
  const { actualUser } = useContext(MyContext)

  return (
    <PageWrapper>
      <Box sx={{ padding: 5, display: "flex", gap: 10, width: "100%" }}>
        <PerfilCard />
      </Box>
    </PageWrapper>
  )
}

export default Profile
