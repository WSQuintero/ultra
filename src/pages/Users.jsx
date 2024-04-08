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

  const buyPlanIBWithUSDT = async () => {
    setLoading(true)

    let { status, data } = await $Subscription.generateWallet({
      body: {
        idProduct: 4
      },
      network: "TRON"
    })

    setWalletAddressPlan(data[0].product_wallet_address)

    setCurrentPlan({
      isMostPopular: false,
      name: "Membresía IB",
      price: 15,
      features: []
    })

    setLoading(false)
    setModalcurrentPlan(true)
  }
  const courses = ["one", "two", "three", "four", "five", "six"]

  return (
    <PageWrapper expanded>
      <Box
        sx={{
          paddingY: 1,
          width: "100%",
          padding: 5,
          height: "100vh",
          overflow: "auto"
        }}>
        <Typography variant="h2" color="white" marginBottom={5}>
          All courses
        </Typography>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 5, paddingBottom: 10 }}>
          {courses.map((course) => (
            <CourseCard key={course} />
          ))}
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default Dashboard
