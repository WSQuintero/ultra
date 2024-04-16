import { useEffect, useState, useMemo, useContext } from "react"
import { Box, Typography, TextField, Modal, Button, Grid } from "@mui/material"
import PageWrapper from "../components/PageWrapper"
import useConfig from "../hooks/useConfig"
import CourseCard from "../components/CourseCard"
import CreateCourse from "../components/CreateCourse"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { MyContext } from "../generalContext/GeneralContext"
import { GoldButton } from "../components/landing/GoldButton"
import CourseService from "../services/course.service"
import ConfirmationModal from "../components/ConfirmationModal"
import PriceCards from "../components/PriceCards"
import EditModal from "../components/EditModal"

function Categories() {
  const [open, setOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const [deleteCategoryId, setDeleteCategoryId] = useState(null)
  const [editCategoryId, setEditCategoryId] = useState(false)

  const [, { setLoading }] = useConfig()
  const navigate = useNavigate()
  const { $Course, token, actualUser, $Products } = useContext(MyContext)
  const [newCategory, setNewCategory] = useState(0)
  const [textNewCategory, setTextNewCategory] = useState("")
  const [courses, setCourses] = useState([])
  const [categoryName, setCategoryName] = useState("")
  const [products, setProducts] = useState(null)
  const courseService = useMemo(() => new CourseService(token), [token])
  const productIdHash = useLocation()
  const productId = productIdHash.hash.split("#")[1]
  const handleCreateCategory = async (event) => {
    event.preventDefault()
    if (newCategory === 0) {
      setNewCategory(1)
      setTextNewCategory("")
    }
    if (newCategory === 1) {
      setTextNewCategory("")
      setNewCategory(0)

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
        data.data.map((item) => ({
          id: item.id,
          category: item.category,
          resources: item.resources
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

  const handleEditConfirmation = async () => {
    setEditModalOpen(false)
    if (editCategoryId && categoryName) {
      const { status, data } = await $Course.upsertCategory({
        token,
        id: editCategoryId,
        name: categoryName,
        idRole: 1
      })

      if (status) {
        setCourses((prevCourses) =>
          prevCourses.map((course) => {
            if (course.id === editCategoryId) {
              return {
                ...course,
                title: categoryName
              }
            }
            return course
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
    setEditModalOpen(true)
    setEditCategoryId(id)
    setCategoryName(name)
  }

  const handleCancelEdit = () => {
    setEditModalOpen(false)
    setEditCategoryId(undefined)
  }

  const handleOrderCategory = () => {
    setCourses((prev) => [...prev].reverse())
  }

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

            {actualUser.rol === 1 && (
              <Box sx={{ display: "flex", gap: 5 }}>
                <GoldButton onClick={handleOrderCategory}>Ordenar</GoldButton>
                <GoldButton onClick={handleCreateCategory}>
                  Crear Categoría
                </GoldButton>
              </Box>
            )}
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
              Academia
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 5,
                paddingBottom: 10,
                justifyContent: "center"
              }}>
              {actualUser.rol === 1 ? (
                <>
                  {courses.map((course, index) => (
                    <Box
                      onClick={(event) => {
                        event.stopPropagation()
                        navigate(
                          `/course/#${course.category.replace(/\s+/g, "-")}#${
                            course.id
                          }#${productId}`
                        )
                      }}
                      key={index}>
                      <CourseCard
                        image="/card-course.png"
                        title={course.category}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        id={course.id}
                      />
                    </Box>
                  ))}
                </>
              ) : (
                <>
                  {courses.map((course, index) => (
                    <Box
                      onClick={(event) => {
                        event.stopPropagation()
                        navigate(
                          `/course/#${course.category.replace(/\s+/g, "-")}#${
                            course.id
                          }#${productId}`
                        )
                      }}
                      key={index}>
                      <CourseCard
                        image="/card-course.png"
                        title={course.category}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        id={course.id}
                      />
                    </Box>
                  ))}
                </>
              )}
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

export default Categories
