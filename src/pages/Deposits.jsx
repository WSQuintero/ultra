import { useEffect, useMemo, useState, useCallback } from "react"
import useAuth from "../hooks/useAuth"
import useConfig from "../hooks/useConfig"
import SubscriptionService from "../services/subscription.service"
import PageWrapper from "../components/PageWrapper"
import EnhancedTable from "../components/EnhancedTable"
import ModalPayment from "../components/ModalPayment"
import ModalErrorDeposit from "../components/ModalErrorDeposit"
import AuthService from "../services/auth.service"
import FormRow from "../components/FormRow"
import { Grid, Box, Button, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const headCells = [
  {
    id: "id",
    label: "ID",
    width: "5%",
    disablePadding: false,
    format: (value) => value
  },
  {
    id: "amount_usdt_payed",
    label: "Monto de depósito (USDT)",
    align: "left",
    width: "15%",
    disablePadding: false,
    format: (value) => value
  },
  {
    id: "created_at",
    label: "Fecha de Depósito",
    align: "left",
    width: "15%",
    disablePadding: false,
    format: (value) => new Date(value).toLocaleDateString()
  },
  {
    id: "hash_payment",
    label: "Hash de Depósito",
    align: "left",
    width: "15%",
    disablePadding: false,
    format: (value) =>
      value ? (
        <Link
          to={"https://tronscan.org/#/transaction/" + value.split("-")[0]}
          target="_BLANK">
          {value.split("-")[0]}
        </Link>
      ) : (
        "OTORGADO"
      )
  },
  {
    id: "profit_direct_payed",
    label: "Profit pasivo USDT",
    align: "left",
    width: "15%",
    disablePadding: false,
    format: (value) => value
  },
  {
    id: "profit_leverage_payed",
    label: "Profit binario USDT",
    align: "left",
    width: "15%",
    disablePadding: false,
    format: (value) => value
  },
  {
    id: "hash_payment",
    label: "% Completado",
    width: "15%",
    disablePadding: false,
    format: (value, row) => {
      let originalDeposit = Number(row.amount_usdt_payed) * 2
      let acelerateDeposit =
        Number(row.profit_direct_payed) + Number(row.profit_leverage_payed)
      let percentCompleted =
        acelerateDeposit > 0
          ? Number((acelerateDeposit / originalDeposit) * 100)
          : 0

      return percentCompleted
    }
  }
]

function Deposits() {
  const [auth] = useAuth()
  const [, { setLoading }] = useConfig()
  const [reports, setReports] = useState(null)
  const $Subscription = useMemo(() => new SubscriptionService(auth), [auth])
  const $Auth = useMemo(() => new AuthService(auth), [auth])

  const [modalcurrentPlan, setModalcurrentPlan] = useState(false)
  const [modalErrorDeposit, setModalErrorDeposit] = useState(false)
  const [walletAddressPlan, setWalletAddressPlan] = useState(false)

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const { status, data } = await $Auth.validate()
      let errorDeposit = true

      if (status) {
        let depositsHistory = []
        data.user.userSubscription.map((item) => {
          if (item.product == 3 && Number(item.status_pay) == 1) {
            depositsHistory.push(item)
          }

          if (
            [1, 2].indexOf(item.product) >= 0 &&
            Number(item.status_pay) == 1 &&
            errorDeposit
          ) {
            errorDeposit = false
          }
        })

        setReports(depositsHistory)
      }

      setModalErrorDeposit(errorDeposit)
    })()

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [$Auth])

  const buyPlanWithUSDT = async () => {
    if (Number(deposit.amount) >= 100) {
      setLoading(true)

      try {
        let { status, data } = await $Subscription.generateWallet({
          body: {
            idProduct: 3
          },
          network: "TRON"
        })

        setWalletAddressPlan(data[0].product_wallet_address)
        setLoading(false)
        setModalcurrentPlan(true)
      } catch {
        setModalErrorDeposit(true)
      }
    }
  }

  const [deposit, setDeposit] = useState({
    amount: 100
  })

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setDeposit((prev) => ({ ...prev, [name]: value }))
  }, [])

  return (
    <PageWrapper sx={{ padding: 2 }} expanded>
      {/* <Grid display="flex" flexDirection="column" gap={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
          padding={2}
          borderRadius={4}
          sx={(t) => ({
            backgroundColor: "white",
            [t.breakpoints.down("md")]: {
              flexDirection: "column"
            }
          })}>
          <Grid display="flex" flexDirection="column" flexGrow={1}>
            <Typography fontSize={24} fontWeight={700} color="primary">
              Monto a Depositar - Mínimo 100 USDT
            </Typography>
            <Typography>El monto que deseas agregar a tu contrato</Typography>
          </Grid>
          <Grid
            display="flex"
            alignItems="center"
            gap={2}
            sx={(t) => ({
              [t.breakpoints.down("md")]: {
                flexDirection: "column",
                width: "100%"
              }
            })}>
            <TextField
              name="amount"
              value={deposit.amount}
              type="number"
              size="small"
              inputProps={{
                step: "1", // Incremento o decremento de los valores permitidos
                pattern: "[0-9]+([.,][0-9]+)?", // Patrón para permitir números enteros y decimales
                min: "100" // Valor mínimo permitido
              }}
              onChange={handleInputChange}
              fullWidth
            />
            <Button
              variant="contained"
              color="warning"
              onClick={() => buyPlanWithUSDT()}
              fullWidth>
              Nuevo depósito con USDT (TRC20)
            </Button>
          </Grid>
        </Box>

        {reports && (
          <EnhancedTable
            title="Depósitos"
            headCells={headCells}
            rows={reports}
          />
        )}
      </Grid>

      <ModalPayment
        open={modalcurrentPlan}
        items={false}
        walletAddress={walletAddressPlan}
        depositAmount={deposit.amount}
        handleClose={() => {
          setModalcurrentPlan(false)
        }}
      />
      <ModalErrorDeposit open={modalErrorDeposit} /> */}
      <Typography sx={{ fontSize: 50, textAlign: "center" }}>
        UltraLive
      </Typography>
    </PageWrapper>
  )
}

export default Deposits
