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
        <Box
          sx={{
            height: "calc(100vh - 155px)",
            overflow: "auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 5
          }}>
          {actualUser.membership_status === "Expired" && <ExpiredMembership />}

          <Box sx={{ display: "flex", flexShrink: 0, gap: 1, width: "97%" }}>
            <CommissionContainer
              icon="/f1.png"
              title="Período de comisión por pago en el plan de renovación"
              value={actualUser.months_pay_commission_plan_renovation}
            />
            <CommissionContainer
              icon="/f2.png"
              title="Próxima comisión por pago en el plan de renovación"
              value={actualUser.next_pay_commission_plan_renovation}
            />
            <CommissionContainer
              icon="/f3.png"
              title="Ganancias"
              value="Xcalper"
            />
          </Box>
          <Box sx={{ display: "flex", flexShrink: 0, gap: 1, width: "97%" }}>
            <PerformanceContainer />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexShrink: 0,
              gap: 1,
              width: "97%",
              marginTop: 5
            }}>
            <CommissionHistoryContainer />
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default Profile
