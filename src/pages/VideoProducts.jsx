import { useEffect, useState, useMemo, useContext } from "react"
import {
  Box,
  Typography,
  TextField,
  Modal,
  Button,
  Grid,
  useMediaQuery
} from "@mui/material"
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
import ProductCard from "../components/ProductCard"

function VideoProducts() {
  const [open, setOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const [deleteCategoryId, setDeleteCategoryId] = useState(null)
  const [editCategoryId, setEditCategoryId] = useState(false)

  const [, { setLoading }] = useConfig()
  const navigate = useNavigate()
  const isMobile = useMediaQuery("(max-width:600px)")
  const { $Course, token, actualUser, $Products } = useContext(MyContext)
  const [newCategory, setNewCategory] = useState(0)
  const [textNewCategory, setTextNewCategory] = useState("")
  const [courses, setCourses] = useState([])
  const [categoryName, setCategoryName] = useState("")
  const [products, setProducts] = useState(null)
  const courseService = useMemo(() => new CourseService(token), [token])
  const [hasProducts, setHasProducts] = useState(false)
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
  const [openPrices, setOpenPrices] = useState(false)
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
        data?.map((item) => ({
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
          prevCourses?.map((course) => {
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

  useEffect(() => {
    const getPlans = async () => {
      const { status, data } = await $Products.getProducts(token)

      if (status) {
        setProducts(data)
      } else {
        console.log(data)
      }
    }

    getPlans()
  }, [])

  useEffect(() => {
    setHasProducts(actualUser.getProductActiveUser.length > 0)
    console.log(actualUser)
  }, [])
  return (
    <PageWrapper expanded>
      {actualUser?.membership_status === "Active" &&
      actualUser.getProductActiveUser.length > 0 &&
      actualUser.rol === 0 ? (
        <>
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
              {products
                ?.filter((pr) => {
                  const activeProductIds =
                    actualUser?.getProductActiveUser?.map((p) => p.id_product)
                  return activeProductIds?.includes(pr.id) || pr.id === 5
                })
                .map((product, index) => (
                  <Box
                    sx={{ width: isMobile ? "100%" : "auto" }}
                    onClick={(event) => {
                      event.stopPropagation()
                      navigate(`/categories/#${product.id}`)
                    }}
                    key={index}>
                    <ProductCard
                      image={product.image}
                      name={product.name}
                      handleEdit={handleEdit}
                      id={product.id}
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
      ) : actualUser.rol === 1 ? (
        <>
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
              {products?.map((product, index) => (
                <Box
                  sx={{ width: isMobile ? "100%" : "auto" }}
                  onClick={(event) => {
                    event.stopPropagation()
                    navigate(`/categories/#${product.id}`)
                  }}
                  key={index}>
                  <ProductCard
                    image={product.image}
                    name={product.name}
                    handleEdit={handleEdit}
                    id={product.id}
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
        <>
          {openPrices ? (
            <>
              {" "}
              <Box sx={{ width: "100%", height: "500px" }}>
                <PriceCards />
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  paddingY: 1,
                  width: "100%",
                  height: "90%",
                  overflow: "auto"
                }}>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                    padding: 2,
                    alignItems: "center"
                  }}>
                  <Typography
                    variant="h2"
                    color="white"
                    marginBottom={5}
                    sx={{ marginLeft: 10 }}>
                    Academia
                  </Typography>
                  <Box sx={{ width: "10%", padding: 2 }}>
                    <GoldButton onClick={() => setOpenPrices(true)}>
                      Comprar
                    </GoldButton>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 5,
                    paddingBottom: 10,
                    justifyContent: "center"
                  }}>
                  {products
                    ?.filter((pr) => {
                      return pr.id === 5
                    })
                    .map((product, index) => (
                      <Box
                        sx={{ width: isMobile ? "100%" : "auto" }}
                        onClick={(event) => {
                          event.stopPropagation()
                          navigate(`/categories/#${product.id}`)
                        }}
                        key={index}>
                        <ProductCard
                          image={product.image}
                          name={product.name}
                          handleEdit={handleEdit}
                          id={product.id}
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
          )}
        </>
      )}
    </PageWrapper>
  )
}

export default VideoProducts
