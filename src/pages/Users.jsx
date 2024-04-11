import { useEffect, useState, useMemo, useContext } from "react"
import { Box, Typography, TextField, Modal, Button, Grid } from "@mui/material"
import PageWrapper from "../components/PageWrapper"
import useConfig from "../hooks/useConfig"
import CourseCard from "../components/CourseCard"
import CreateCourse from "../components/CreateCourse"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../generalContext/GeneralContext"
import { GoldButton } from "../components/landing/GoldButton"
import CourseService from "../services/course.service"

function Dashboard() {
  const [open, setOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteCategoryId, setDeleteCategoryId] = useState(null)
  const [, { setLoading }] = useConfig()
  const navigate = useNavigate()
  const { $Course, token } = useContext(MyContext)
  const [newCategory, setNewCategory] = useState(0)
  const [textNewCategory, setTextNewCategory] = useState("")
  const [courses, setCourses] = useState([])
  const courseService = useMemo(() => new CourseService(token), [token]) // Instancia del servicio CourseService

  const handleCreateCategory = async (event) => {
    event.preventDefault()
    if (newCategory === 0) {
      setNewCategory(1)
      setTextNewCategory("")
    }
    if (newCategory === 1) {
      setTextNewCategory("")
      setNewCategory(0)
      console.log("Here is it?")

      try {
        const { status, data } = await courseService.updateCategory({
          token,
          name: textNewCategory
        })

        if (status) {
          setCourses((prevCourses) => [
            ...prevCourses,
            {
              title: textNewCategory,
              duration: "24 hours",
              videoCount: "8 videos",
              progress: "25%",
              id: data.id
            }
          ])
        } else {
          console.error("Error al crear la categoría:", data)
        }
      } catch (error) {
        console.error("Error al crear la categoría:", error)
      }
    }
  }

  const addCourse = (title, id) => {
    setCourses((prevCourses) => [
      ...prevCourses,
      {
        title: title,
        duration: "24 hours",
        videoCount: "8 videos",
        progress: "25%",
        id: id
      }
    ])
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const getCourses = async () => {
    const { status, data } = await $Course.getCategories(token)

    if (status) {
      setCourses(
        data.map((item) => ({
          title: item.name,
          duration: "24 hours",
          videoCount: "8 videos",
          progress: "25%",
          id: item.id
        }))
      )
    } else {
      console.log(data)
    }
  }

  useEffect(() => {
    getCourses()
  }, [token])

  const onClose = () => {
    setOpen(false)
  }

  const handleDeleteConfirmation = async () => {
    setDeleteModalOpen(false)
    if (deleteCategoryId) {
      const { status, data } = await $Course.deleteCategory({
        token,
        id: deleteCategoryId
      })
      if (status) {
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== deleteCategoryId)
        )
      }
    }
  }

  const handleDelete = (id) => {
    setDeleteModalOpen(true)
    setDeleteCategoryId(id)
  }

  const handleCancelDelete = () => {
    setDeleteModalOpen(false)
    setDeleteCategoryId(undefined)
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
            <Box
              onClick={(event) => {
                event.stopPropagation()
                navigate(`/course/#${course.title}#${course.id}`)
              }}
              key={index}>
              <CourseCard
                image="/card-course.png"
                duration={course.duration}
                videoCount={course.videoCount}
                title={course.title}
                progress={course.progress}
                handleDelete={handleDelete}
                id={course.id}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <CreateCourse open={open} onClose={onClose} />
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "black",
            border: "1px solid #ab8e3a",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <Typography
            id="modal-modal-title"
            variant="h2"
            component="h2"
            sx={{ color: "white" }}>
            ¿Estás seguro de eliminar esta categoría?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: 26 }}>
            Ten presente que todos los videos asociados a esta ya no estarán
            disponibles.
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ marginTop: 3 }}
            justifyContent="center">
            <Grid item>
              <GoldButton onClick={handleCancelDelete}>Cancelar</GoldButton>
            </Grid>
            <Grid item>
              <GoldButton onClick={handleDeleteConfirmation}>
                Eliminar
              </GoldButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </PageWrapper>
  )
}

export default Dashboard
