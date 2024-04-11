import { Container, Typography } from "@mui/material"
import ComissionHistoryTable from "./ComissionHistoryTable.jsx"

function CommissionHistoryContainer() {
  return (
    <Container
      sx={{
        backgroundColor: "#010714",
        width: "100%",
        height: "auto",
        borderRadius: 3,
        padding: 3
      }}>
      <Typography sx={{ color: "white" }}>Commission History</Typography>
      <Container
        sx={{
          backgroundColor: "#0f172a",
          width: "100%",
          height: "90%",
          borderRadius: 3,
          padding: 3,
          marginTop: 1
        }}>
        <ComissionHistoryTable />
      </Container>
    </Container>
  )
}

export default CommissionHistoryContainer
