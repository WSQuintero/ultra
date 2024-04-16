import PageWrapper from "../components/PageWrapper"
import ListReports from "../components/ListReports"
import { GoldButton } from "../components/landing/GoldButton"
import { useContext, useState } from "react"
import { MyContext } from "../generalContext/GeneralContext"
import ConfirmationModal from "../components/ConfirmationModal"
import { Alert, Box, Snackbar } from "@mui/material"

function Reports() {
  const { $Reports, token } = useContext(MyContext)
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState({ show: false, message: "" })

  const handlePayComissions = async () => {
    const { status, data } = await $Reports.payComissions(token)
    if (status) {
      setAlert({
        show: true,
        message: "Pagos realizados correctamente",
        severity: "success"
      })
      setOpen(false)
    } else {
      console.log(data)
      setAlert({
        show: true,
        message: "Error al realizar los pagos",
        severity: "error"
      })

      setOpen(false)
    }
  }
  return (
    <PageWrapper expanded>
      <Box
        sx={{
          width: "100%",
          padding: 5,
          display: "flex",
          justifyContent: "end"
        }}>
        <GoldButton onClick={() => setOpen(true)}>Pagar comisiones</GoldButton>
      </Box>
      <ListReports />
      <ConfirmationModal
        deleteModalOpen={open}
        handleCancelDelete={() => setOpen(false)}
        handleDeleteConfirmation={handlePayComissions}
        title={"Pagar comisiones"}
        message={"¿Está seguro de realizar el pago?"}
      />
      <Snackbar
        open={alert.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setAlert({ show: false, message: "" })}>
        <Alert severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </PageWrapper>
  )
}

export default Reports
