import { useEffect, useState, useMemo, useContext } from "react"
import useAuth from "../hooks/useAuth"

import UserService from "../services/user.service"
import {
  alpha,
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Button,
  TextField
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
import CreateCourse from "../components/CreateCourse"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../generalContext/GeneralContext"
import { GoldButton } from "../components/landing/GoldButton"
import CourseService from "../services/course.service"

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
  const [auth] = useAuth()
  const $Subscription = useMemo(() => new SubscriptionService(auth), [auth])
  const [currentPlan, setCurrentPlan] = useState(false)
  const [modalcurrentPlan, setModalcurrentPlan] = useState(false)
  const [walletAddressPlan, setWalletAddressPlan] = useState(false)
  const [open, setOpen] = useState(false)
  const [, { setLoading }] = useConfig()
  const navigate = useNavigate()
  const { $Course, token } = useContext(MyContext)
  const [newCategory, setNewCategory] = useState(0)
  const [textNewCategory, setTextNewCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [courses, setCourses] = useState([])
  const courseService = useMemo(() => new CourseService(token), [token]) // Instancia del servicio CourseService

  const handleCreateCategory = async () => {
    if (newCategory === 0) {
      setNewCategory(1)
      setTextNewCategory("")
    }
    if (newCategory === 1) {
      setTextNewCategory("")
      setNewCategory(0)
      console.log("Here is it?")

      try {
        const { status, data } = await courseService.createCourse({
          name: textNewCategory
        })

        if (status) {
          console.log("Nueva categoría creada:", data)
          setCourses((prevCourses) => [
            ...prevCourses,
            {
              title: data.name,
              duration: "24 hours",
              videoCount: "8 videos",
              progress: "25%"
            }
          ])

          window.location.reload()
        } else {
          console.error("Error al crear la categoría:", data)
        }
      } catch (error) {
        console.error("Error al crear la categoría:", error)
      }
    }
  }

  const addCourse = (title) => {
    setCourses((prevCourses) => [
      ...prevCourses,
      {
        title: title,
        duration: "24 hours",
        videoCount: "8 videos",
        progress: "25%"
      }
    ])
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    const getCategories = async () => {
      const { status, data } = await $Course.getCategories(token)

      if (status) {
        console.log(data)
        data.forEach((item) => addCourse(item.name))
      } else {
        console.log(data)
      }
    }

    getCategories()
  }, [token])

  const onClose = () => {
    setOpen(false)
  }

  return (
    <PageWrapper expanded>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          padding: 2
        }}>
        {newCategory === 1 && (
          <TextField
            onChange={(event) => setTextNewCategory(event.target.value)}
            value={textNewCategory}
          />
        )}
        <GoldButton onClick={handleCreateCategory}>Crear categoria</GoldButton>
      </Box>
      <Box
        sx={{
          paddingY: 1,
          width: "100%",
          height: "90%",
          overflow: "auto"
        }}>
        <Typography variant="h2" color="white" marginBottom={5}>
          All courses
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            paddingBottom: 10,
            justifyContent: "center"
          }}>
          {courses.map((course, index) => (
            <div
              onClick={() => navigate(`/course/#${course.title}`)}
              key={index}>
              <CourseCard
                image="/card-course.png"
                duration={course.duration}
                videoCount={course.videoCount}
                title={course.title}
                progress={course.progress}
              />
            </div>
          ))}
        </Box>
      </Box>
      <CreateCourse open={open} onClose={onClose} />
    </PageWrapper>
  )
}

export default Dashboard
