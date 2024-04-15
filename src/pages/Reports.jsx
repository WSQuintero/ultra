import { useEffect, useMemo, useState } from "react"
import useAuth from "../hooks/useAuth"
import useConfig from "../hooks/useConfig"
import useSession from "../hooks/useSession"
import SubscriptionService from "../services/subscription.service"
import PageWrapper from "../components/PageWrapper"
import EnhancedTable from "../components/EnhancedTable"
import { Grid, Typography, useMediaQuery } from "@mui/material"
import { Link } from "react-router-dom"

const headCells = [
  {
    id: "user_fullname",
    label: "Nombre",
    align: "left",
    width: "11%",
    disablePadding: false,
    format: (value) => value
  },
  {
    id: "email_user",
    label: "Correo",
    align: "left",
    width: "11.111%",
    disablePadding: false,
    format: (value) => value
  },
  {
    id: "percent_profit",
    label: "% Ganancia",
    align: "left",
    width: "11.111%",
    disablePadding: false,
    format: (value) => value
  },
  {
    id: "amount_profit",
    label: "Ganancia (USDT)",
    align: "left",
    width: "11.111%",
    disablePadding: false,
    format: (value) => value
  },
  {
    id: "date_profit",
    label: "Fecha",
    width: "11.111%",
    disablePadding: false,
    format: (value) => value.split("T")[0]
  },
  {
    id: "type",
    label: "Tipo",
    width: "11.111%",
    disablePadding: false,
    format: (value) => value
  },
  {
    id: "gived",
    label: "Origen",
    width: "11.111%",
    disablePadding: false,
    format: (value) => (value == 1 ? "Manual" : "Sistema")
  }
]

function Reports() {
  const [auth] = useAuth()
  const isMobile = useMediaQuery("(max-width:600px)")
  const [config, { setLoading }] = useConfig()
  const [session] = useSession()
  const [profits, setProfits] = useState(null)
  const [totals, setTotals] = useState([{ roi: 0, directo: 0, binario: 0 }])
  const [adminProfits, setAdminProfits] = useState(null)
  const $Subscription = useMemo(() => new SubscriptionService(auth), [auth])
  const totalProfits = useMemo(
    () => profits?.reduce((a, c) => a + parseFloat(c.amount_profit), 0) || 0,
    [profits]
  )
  const totalAdminProfits = useMemo(
    () =>
      adminProfits?.reduce((a, c) => a + parseFloat(c.amount_profit), 0) || 0,
    [adminProfits]
  )

  const fetchProfits = async () => {
    const { status, data } = await $Subscription.getProfits({ pending: true })

    if (status) {
      setProfits(data.data)
      setTotals(data.totals)
    }
  }

  const fetchAdminProfits = async () => {
    const { status, data } = await $Subscription.getProfits({
      isAdmin: true,
      pending: true
    })

    if (status) {
      setAdminProfits(data.data)
    }
  }

  useEffect(() => {
    if ($Subscription.token) {
      ;(async () => {
        setLoading(true)
        await fetchProfits()
        await fetchAdminProfits()
        setLoading(false)
      })()
    }
  }, [$Subscription])

  return (
    <PageWrapper
      expanded
      sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
      {/* <Grid display="flex" flexDirection="column" gap={2}>
        {profits && (
          <>
            <EnhancedTable
              title="Histórico ganancias"
              headCells={headCells}
              rows={profits}
              footer={
                <Grid
                  display={isMobile ? "block" : "flex"}
                  textAlign={"center"}
                  alignItems={"center"}
                  gap={1}>
                  <Typography fontWeight={600} color="primary">
                    Total ROI:
                  </Typography>
                  <Typography>{totals[0].roi.toFixed(2)} USDT</Typography>|
                  <Typography fontWeight={600} color="primary">
                    Total Directo:
                  </Typography>
                  <Typography>{totals[0].directo.toFixed(2)} USDT</Typography>|
                  <Typography fontWeight={600} color="primary">
                    Total Binario:
                  </Typography>
                  <Typography>{totals[0].binario.toFixed(2)} USDT</Typography>
                </Grid>
              }
            />
          </>
        )}
        {session?.rol === 1 && adminProfits && (
          <EnhancedTable
            title="Histórico ganancias (ADMIN)"
            headCells={headCells}
            rows={adminProfits}
            footer={
              <Grid
                display="flex"
                textAlign={"center"}
                alignItems={"center"}
                gap={1}>
                <Typography fontWeight={600} color="primary">
                  Total:
                </Typography>
                <Typography>{totalAdminProfits.toFixed(2)} USDT</Typography>
              </Grid>
            }
          />
        )}
      </Grid> */}

      <Typography sx={{ fontSize: 50, textAlign: "center" }}>
        Ganancias
      </Typography>
    </PageWrapper>
  )
}

export default Reports
