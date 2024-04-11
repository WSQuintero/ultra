import { useEffect, useState, useMemo, useContext } from "react"
import useAuth from "../hooks/useAuth"
import { alpha, Box, Container, Grid, Typography, Button } from "@mui/material"

import PageWrapper from "../components/PageWrapper"
import useSession from "../hooks/useSession"
import useConfig from "../hooks/useConfig"
import SubscriptionService from "../services/subscription.service"

import { useTheme } from "@emotion/react"
import Timer from "../components/Timer"
import GeneralButton from "../components/GeneralButton"
import PriceCard from "../components/PriceCard"
import { optionsPlan90, planFondeo } from "../components/constants/constants"
import CountdownTimer from "../components/CountdownTimer"
import SuscriptionList from "../components/SuscriptionList"
import { MyContext } from "../generalContext/GeneralContext"
import PriceCards from "../components/PriceCards"

function Dashboard() {
  const [session] = useSession()
  const [memberIB, setMemberIB] = useState(false)
  const [auth] = useAuth()
  const $Subscription = useMemo(() => new SubscriptionService(auth), [auth])
  const { actualUser } = useContext(MyContext)
  const [, { setLoading }] = useConfig()

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  // useEffect(() => {
  //   if (
  //     session?.userSubscription.some(
  //       (plan) => plan.product === 4 && plan.status_pay === 1
  //     )
  //   ) {
  //     setMemberIB(
  //       session?.userSubscription
  //         .filter((plan) => plan.product === 4 && plan.status_pay === 1)[0]
  //         .expired_at.split("T")[0]
  //         .split("-")
  //     )
  //   }
  // }, [session])

  // if (!session) {
  //   return <></>
  // }

  return (
    <PageWrapper expanded>
      {actualUser?.membership_status === "Active" || actualUser?.rol === 1 ? (
        <>
          <Box
            sx={{
              paddingY: 5,
              height: "calc(100vh - 64px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              gap: 1,
              overflow: "auto"
            }}>
            <Typography
              variant="h2"
              color="white"
              marginBottom={5}
              sx={{ width: "88%" }}>
              Hola! {actualUser?.firstname} 👋
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexShrink: 0,
                gap: 1,
                width: "88%",
                paddingY: 5,
                flexWrap: "wrap"
              }}>
              <Container
                sx={{
                  backgroundColor: "#010714",
                  width: "400px",
                  height: "250px",
                  borderRadius: 3
                }}>
                <img
                  src="/frame.png"
                  alt="frame"
                  style={{ marginTop: "25px", width: "50px" }}
                />
                <Typography sx={{ fontSize: 25, marginTop: 5, color: "white" }}>
                  Comisiones totales
                </Typography>
                <Typography
                  sx={{ fontSize: 40, color: "white", fontWeight: "bold" }}>
                  ${actualUser.getTotalCommissions.totalCommissions}
                </Typography>
              </Container>
              <Container
                sx={{
                  backgroundColor: "#010714",
                  width: "400px",
                  height: "250px",
                  borderRadius: 3
                }}>
                <img
                  src="/frametwo.png"
                  alt="frametwo"
                  style={{ marginTop: "25px", width: "50px" }}
                />
                <Typography sx={{ fontSize: 25, marginTop: 5, color: "white" }}>
                  Total de pagos
                </Typography>
                <Typography
                  sx={{ fontSize: 40, color: "white", fontWeight: "bold" }}>
                  ${actualUser.getTotalCommissions.ultraPayed}
                </Typography>
              </Container>
              <Container
                sx={{
                  backgroundColor: "#010714",
                  width: "400px",
                  height: "250px",
                  borderRadius: 3
                }}>
                <img
                  src="/frametwo.png"
                  alt="frametwo"
                  style={{ marginTop: "25px", width: "50px" }}
                />
                <Typography sx={{ fontSize: 25, marginTop: 5, color: "white" }}>
                  Pagos pendientes
                </Typography>
                <Typography
                  sx={{ fontSize: 40, color: "white", fontWeight: "bold" }}>
                  ${actualUser.getTotalCommissions.ultraPending}
                </Typography>
              </Container>

              <Container
                sx={{
                  backgroundColor: "#010714",
                  maxWidth: "400px",
                  width: "45%",
                  height: "250px",
                  borderRadius: 3,
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                <img
                  src="/frametwo.png"
                  alt="frametwo"
                  style={{ marginTop: "25px", width: "50px", flexShrink: 0 }}
                />
                <Typography
                  sx={{
                    fontSize: 25,
                    marginTop: 5,
                    color: "white",
                    flexShrink: 0
                  }}>
                  Total de afiliados
                </Typography>
                <Typography
                  sx={{ fontSize: 40, color: "white", fontWeight: "bold" }}>
                  {actualUser.getTotalDirectUsers}
                </Typography>
              </Container>
              <Container
                sx={{
                  backgroundColor: "#010714",
                  maxWidth: "300px",
                  width: "45%",
                  height: "250px",
                  borderRadius: 3,
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                <img
                  src="/frametwo.png"
                  alt="frametwo"
                  style={{ marginTop: "25px", width: "50px" }}
                />
                <Typography sx={{ fontSize: 25, marginTop: 5, color: "white" }}>
                  Afiliados hoy
                </Typography>
                <Typography
                  sx={{ fontSize: 40, color: "white", fontWeight: "bold" }}>
                  {actualUser.getTotalDirectUsersToday}
                </Typography>
              </Container>
            </Box>
            <Box
              sx={{
                backgroundColor: "#131006",
                width: "88%",
                height: "150px",
                borderRadius: 3,
                border: "1px solid #6e5c25",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexShrink: 0
              }}>
              <Box sx={{ padding: 4 }}>
                <Typography sx={{ fontSize: 20, color: "white" }}>
                  Próximo pago
                </Typography>
                <Box
                  display={"flex"}
                  sx={{
                    marginTop: 2,
                    gap: 5,
                    justifyConten: "center",
                    alignItems: "center"
                  }}>
                  <Box display={"flex"} sx={{ gap: 2 }}>
                    <Box>
                      <img src="/avatar.png" alt="avatar" />
                    </Box>
                    <Box>
                      <Typography sx={{ color: "white" }}>Catalog</Typography>
                      <Typography>-</Typography>
                    </Box>
                  </Box>
                  <GeneralButton>Pagar ahora</GeneralButton>
                </Box>
              </Box>
              <CountdownTimer />
            </Box>
            <Box
              sx={{
                backgroundColor: "#010714",
                width: "88%",
                height: 500,
                borderRadius: 3,
                border: "1px solid #6e5c25",
                flexShrink: 0,
                marginTop: 5
              }}>
              <Container
                sx={{
                  width: "100%",
                  height: 100,
                  borderBottom: "1px solid white",
                  padding: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                <Box>
                  <Typography variant="h2" sx={{ color: "white" }}>
                    Lista de suscriptores
                  </Typography>
                  <Typography>Registro de la lista de suscripciones</Typography>
                </Box>
                <Box>
                  <GeneralButton>+ Buy More</GeneralButton>
                </Box>
              </Container>
              <SuscriptionList />
            </Box>
            <PriceCards />
          </Box>
        </>
      ) : (
        <>
          <PriceCards />
        </>
      )}
    </PageWrapper>
  )
}

export default Dashboard
