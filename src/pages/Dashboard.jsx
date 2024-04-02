import { useEffect, useState, useMemo } from "react"
import useAuth from "../hooks/useAuth"
import UserService from "../services/user.service"
import {
  alpha,
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Button
} from "@mui/material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import PageWrapper from "../components/PageWrapper"
import PricingTable from "../components/PricingTable"
import useSession from "../hooks/useSession"
import useConfig from "../hooks/useConfig"
import SubscriptionService from "../services/subscription.service"
import ModalPayment from "../components/ModalPayment"
import {
  TrendingUp as TrendingUpIcon,
  TrendingFlat as TrendingFlatIcon,
  TrendingDown as TrendingDownIcon
} from "@mui/icons-material"
import { useTheme } from "@emotion/react"
import background from "../assets/img/pageWrapper/background.svg"
import CourseCard from "../components/CourseCard"

const data = []

function SummaryCard({ title, value, trend, backgroundColor, alphaB }) {
  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      paddingY={1}
      paddingX={2}
      height={trend === "" ? "50%" : "100%"}
      borderRadius={4}
      overflow="hidden"
      sx={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        "&::before": {
          content: "''",
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: alpha(backgroundColor, alphaB || 0.5)
        }
      }}>
      <Box zIndex={1}>
        <Grid display="flex" gap={1} color="white">
          <Typography color="white">{title}</Typography>
          {trend === "" ? (
            <></>
          ) : (
            <Typography
              color="white"
              style={{
                textAlign: "right",
                width: "90%",
                position: "absolute"
              }}>
              Total
            </Typography>
          )}
        </Grid>
        {trend === "" ? (
          <></>
        ) : (
          <Grid
            display="flex"
            alignItems="center"
            gap={2}
            justifyContent="space-between">
            <Typography color="white" fontSize={28}>
              {value} USDT
            </Typography>
            <Grid display="flex" gap={1} color="white">
              <Typography color="white">{trend} USDT</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  )
}

function DateCard({ data }) {
  return (
    <Grid
      display="flex"
      alignItems="center"
      gap={2}
      sx={(t) => ({
        [t.breakpoints.down("md")]: {
          flexDirection: "column-reverse"
        }
      })}>
      {data.map((el, index) => (
        <Grid
          key={index}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1}>
          <Grid display="flex" gap={0.5}>
            <Box
              paddingY={1}
              paddingX={2}
              borderRadius={2}
              sx={{ backgroundColor: "#3A3689" }}>
              <Typography fontSize={22} color="white">
                {el.value[0]}
              </Typography>
            </Box>
            <Box
              paddingY={1}
              paddingX={2}
              borderRadius={2}
              sx={{ backgroundColor: "#3A3689" }}>
              <Typography fontSize={22} color="white">
                {el.value[1]}
              </Typography>
            </Box>
            {el.value.length == 4 && (
              <Box
                paddingY={1}
                paddingX={2}
                borderRadius={2}
                sx={{ backgroundColor: "#3A3689" }}>
                <Typography fontSize={22} color="white">
                  {el.value[2]}
                </Typography>
              </Box>
            )}
            {el.value.length == 4 && (
              <Box
                paddingY={1}
                paddingX={2}
                borderRadius={2}
                sx={{ backgroundColor: "#3A3689" }}>
                <Typography fontSize={22} color="white">
                  {el.value[3]}
                </Typography>
              </Box>
            )}
          </Grid>
          <Typography fontSize={22} color="white">
            {el.label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  )
}

function Dashboard() {
  const [session] = useSession()
  const [memberIB, setMemberIB] = useState(false)
  const [auth] = useAuth()
  const $Subscription = useMemo(() => new SubscriptionService(auth), [auth])

  const [currentPlan, setCurrentPlan] = useState(false)
  const [modalcurrentPlan, setModalcurrentPlan] = useState(false)
  const [walletAddressPlan, setWalletAddressPlan] = useState(false)

  const [, { setLoading }] = useConfig()
  const theme = useTheme()

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    if (
      session?.userSubscription.some(
        (plan) => plan.product === 4 && plan.status_pay === 1
      )
    ) {
      setMemberIB(
        session?.userSubscription
          .filter((plan) => plan.product === 4 && plan.status_pay === 1)[0]
          .expired_at.split("T")[0]
          .split("-")
      )
    }
  }, [session])

  if (!session) {
    return <></>
  }

  return (
    <PageWrapper expanded>
      <Box sx={{ paddingY: 1, width: "100%", padding: 5 }}>
        <Typography variant="h2" color="white" marginBottom={5}>
          Good Morning! Juan👋
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
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
              Total Earning
            </Typography>
            <Typography
              sx={{ fontSize: 40, color: "white", fontWeight: "bold" }}>
              $230.00
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
              Matatrader Balance
            </Typography>
            <Typography
              sx={{ fontSize: 40, color: "white", fontWeight: "bold" }}>
              $230.00
            </Typography>
          </Container>
          <Container
            sx={{
              backgroundColor: "#010714",
              width: "400px",
              height: "250px",
              borderRadius: 3,
              display: "flex"
            }}>
            <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
              <img src="/torta.png" alt="torta" style={{ width: "100%" }} />
            </Box>
            <Box>
              <Container
                sx={{
                  display: "flex",
                  width: "100%",
                  paddingX: 5,
                  paddingY: 3,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottom: "1px solid white"
                }}>
                <Box>
                  <img src="/tortatwo.png" alt="tortatwo" />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 25, color: "white" }}>
                    6%
                  </Typography>
                  <Typography>In Inactive</Typography>
                </Box>
              </Container>
              <Container
                sx={{
                  display: "flex",
                  width: "100%",
                  paddingX: 5,
                  paddingY: 3,
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                <Box>
                  <img src="/tortatwo.png" alt="tortatwo" />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 25, color: "white" }}>
                    5%
                  </Typography>
                  <Typography>Due Issuee</Typography>
                </Box>
              </Container>
            </Box>
          </Container>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default Dashboard
