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
import ConfirmationModal from "../components/ConfirmationModal"
import PriceCards from "../components/PriceCards"
import EditModal from "../components/EditModal"

function Dashboard() {
  const [open, setOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const [deleteCategoryId, setDeleteCategoryId] = useState(null)
  const [editCategoryId, setEditCategoryId] = useState(false)

  const [, { setLoading }] = useConfig()
  const navigate = useNavigate()
  const { $Course, token, actualUser } = useContext(MyContext)
  const [newCategory, setNewCategory] = useState(0)
  const [textNewCategory, setTextNewCategory] = useState("")
  const [courses, setCourses] = useState([])
  const [categoryName, setCategoryName] = useState("");
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
              title: data[0].name,
              duration: "24 hours",
              videoCount: "8 videos",
              progress: "25%",
              id: data[0].id
            }
          ])
          setTextNewCategory("")
        } else {
          console.error("Error al crear la categoría:", data)
        }
      } catch (error) {
        console.error("Error al crear la categoría:", error)
      }
    }
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
    console.log(deleteCategoryId)
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

  const handleEditConfirmation = async () => {
    setEditModalOpen(false)
    if (editCategoryId && categoryName) { 
      const { status, data } = await $Course.upsertCategory({
        token,
        id: editCategoryId,
        name: categoryName,
        idRole: 1,
      })

      if (status) {
        setCourses((prevCourses) =>
          prevCourses.map((course) => {
            if (course.id === editCategoryId) {
              return {
                ...course,
                title: categoryName 
              };
            }
            return course;
          })
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

  const handleEdit = (name, id) => {
    console.log(name)
    console.log(id)

    setEditModalOpen(true);
    setEditCategoryId(id);
    setCategoryName(name);
  };


  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setEditCategoryId(undefined);
  };
  
  

  return (
    <PageWrapper expanded>
      {actualUser?.membership_status === "Active" || actualUser?.rol === 1 ? (
        <>
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
            <GoldButton onClick={handleCreateCategory}>
              Crear categoria
            </GoldButton>
          </Box>
          <Box
            sx={{
              paddingY: 1,
              width: "100%",
              height: "90%",
              overflow: "auto"
            }}>
            <Typography
              variant="h2"
              color="white"
              marginBottom={5}
              sx={{ marginLeft: 10 }}>
              Cursos
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
                    handleEdit={handleEdit}
                    id={course.id}
                  />
                </Box>
              ))}
            </Box>
          </Box>
          <CreateCourse open={open} onClose={onClose} />
          <ConfirmationModal
            deleteModalOpen={deleteModalOpen}
            handleCancelDelete={handleCancelDelete}
            handleDeleteConfirmation={handleDeleteConfirmation}
            title={"¿Estás seguro de eliminar esta categoría?"}
            message={
              "Ten presente que todos los videos asociados a esta ya no estarán disponibles."
            }
          />
           <EditModal
            editModalOpen={editModalOpen}
            handleCancelEdit={handleCancelEdit}
            handleEditConfirmation={handleEditConfirmation}
            title={"Editar esta categoría"}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
          />
        </>
      ) : (
        <Box sx={{ width: "100%", height: "500px" }}>
          <PriceCards />
        </Box>
      )}
    </PageWrapper>
  )
}

export default Dashboard
