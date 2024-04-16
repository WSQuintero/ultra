import React, { useContext, useEffect, useState } from "react"
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Button,
  useMediaQuery
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import PageWrapper from "../components/PageWrapper"
import BackButton from "../components/BackButton"
import AddIcon from "@mui/icons-material/Add"
import { GoldButton } from "../components/landing/GoldButton"
import CreateCourse from "../components/CreateCourse"
import { MyContext } from "../generalContext/GeneralContext"
import { useLocation } from "react-router-dom"
import DeleteVideoConfirmationModal from "../components/DeleteVideoConfirmationModal"
import ConfirmationModal from "../components/ConfirmationModal"
import PriceCards from "../components/PriceCards"

const CoursesSection = () => {
  const [openNewVideo, setOpenNewVideo] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [actualId, setActualId] = useState()
  const { token, $Course, actualUser } = useContext(MyContext)
  const location = useLocation()
  const [openDeleteModal, setOpenDeleteModal] = useState()
  const [updateState, setUpdateState] = useState(false)
  const isMobile = useMediaQuery("(max-width:600px)")
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "",
      url: "",
      thumbnail: "",
      description: ""
    }
  ])

  const onDelete = async () => {
    const { status, data } = await $Course.deleteCourse(token, actualId)
    if (status) {
      setActualId(null)
      setOpenDeleteModal(false)
      setUpdateState(!updateState)
      setVideos([])
      selectedVideo(null)
    } else {
      setActualId(null)
      setOpenDeleteModal(false)
      setUpdateState(!updateState)
      setVideos([])
      selectedVideo(null)
    }
  }

  useEffect(() => {
    const ruta = location.hash
    const category = ruta.split("#")[1]
    const categoryId = ruta.split("#")[2]
    const getVideos = async () => {
      const { status, data } = await $Course.getCourses({
        token,
        category: categoryId
      })
      if (status) {
        setVideos(
          data.map((course) => ({
            id: course.idResource,
            url: course.url_resource,
            title: course.title,
            thumbnail: course.image,
            description: course.description
          }))
        )
      } else {
        console.log(data)
      }
    }
    if (token) {
      getVideos()
    }
  }, [token, updateState])

  const [selectedVideo, setSelectedVideo] = useState(videos[0])

  const handleVideoSelect = (video) => {
    setSelectedVideo(video)
  }

  const handleEdit = (videoId) => {
    setActualId()
    setEditMode(true)
    setActualId(videoId)
  }

  useEffect(() => {
    if ((actualId && !openDeleteModal) || (editMode && !openDeleteModal)) {
      setOpenNewVideo(true)
    }
  }, [actualId, editMode])

  const handleDelete = (event, videoId, video) => {
    event.stopPropagation()
    setOpenDeleteModal(true)
    setActualId(videoId)
    setOpenNewVideo(false)
  }

  const handleBack = () => {
    window.history.back()
  }

  const handleAddVideo = (event) => {
    event.stopPropagation()

    setActualId(null)
    setEditMode(false)
    setOpenNewVideo(true)
  }

  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false)
    setActualId(null)
    setUpdateState(!updateState)
    setOpenNewVideo(false)
  }
  const maxHeight = window.innerHeight <= 720 ? 320 : 520

  return (
    <PageWrapper>
      <>
        {" "}
        <Box
          sx={{
            backgroundColor: "black",
            width: "100%",
            overflow: "auto"
          }}>
          <Grid
            container
            spacing={1}
            sx={{
              position: "relative",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 120px)",
              paddingTop: 3,
              width: "100%"
            }}>
            <Grid
              item
              sx={{
                width: isMobile ? "100%" : "53vw",
                height: "calc(100vh - 150px)",
                maxHeight: "700px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                border: "1px solid #ab8e3a",
                padding: 1,

                overflow: "hidden",
                marginTop: "10px",
                marginLeft: "10px",
                position: "relative"
              }}>
              {selectedVideo && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: 10,
                    flexShrink: 0
                  }}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 2,
                      backgroundColor: "black",
                      position: "relative",
                      borderTop: "1px solid #ab8e3a",
                      top: 5
                    }}>
                    <div style={{ position: "relative" }}>
                      <BackButton handleBack={handleBack} />
                    </div>
                    {actualUser.rol === 1 && (
                      <GoldButton
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleAddVideo}
                        sx={{ height: "30px" }}>
                        Agregar Video
                      </GoldButton>
                    )}
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      backgroundColor: "white",
                      height: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 2,
                      flexShrink: 0,
                      position: "relative",
                      bottom: 0
                    }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: 20,
                        color: "black",
                        textAlign: "center",
                        width: "100%"
                      }}>
                      {selectedVideo.title}
                    </Typography>
                  </Box>
                  {selectedVideo?.url ? (
                    <iframe
                      title="Video Player"
                      width="100%"
                      height="100%"
                      style={{
                        marginTop: 10,
                        objectFit: "contain",
                        objectPosition: "center",
                        maxHeight: maxHeight
                      }}
                      src={selectedVideo?.url}
                      frameBorder="0"
                      allow="autoplay"
                    />
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                      <img
                        src="/elseimg.png"
                        title="Video Player"
                        width="30%"
                        style={{
                          marginBottom: "150px"
                        }}
                      />
                    </Box>
                  )}
                </div>
              )}
            </Grid>

            <Grid
              item
              sx={{
                width: isMobile ? "100%" : "19vw",
                backgroundColor: "black",
                border: "1px solid #ab8e3a",
                height: "calc(100vh - 130px)",
                marginTop: 2,
                maxHeight: "700px",
                overflowY: "auto"
              }}>
              <List
                style={{
                  display: "flex",
                  justifyContent: "start",
                  flexDirection: "Column",
                  alignItems: "center",
                  maxHeight: isMobile
                    ? "calc(100vh - 200px)"
                    : "calc(100vh - 80px)",
                  overflowY: "auto"
                }}>
                {videos.map((video, index) => (
                  <ListItem
                    sx={{
                      height: "200px",
                      width: "200px",

                      fontSize: "1.2rem",
                      marginBottom: "10px",
                      borderRadius: "8px",
                      backgroundImage: `url(${
                        video.thumbnail || "/elseimg.png"
                      })`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      color: "#fff",
                      position: "relative"
                    }}
                    button
                    key={video.id}
                    onMouseEnter={() =>
                      setVideos(
                        videos.map((v, i) =>
                          i === index ? { ...v, hover: true } : v
                        )
                      )
                    }
                    onMouseLeave={() =>
                      setVideos(
                        videos.map((v, i) =>
                          i === index ? { ...v, hover: false } : v
                        )
                      )
                    }
                    onClick={() => handleVideoSelect(video)}>
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column", // Ajuste para móvil
                        justifyContent: "flex-end" // Ajuste para móvil
                      }}>
                      <Typography
                        sx={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          height: isMobile ? "auto" : "40px", // Ajuste de altura en móvil
                          width: isMobile ? "100%" : "85%", // Ajuste de ancho en móvil
                          fontSize: isMobile ? "14px" : "10px", // Ajuste de tamaño de fuente en móvil
                          padding: "1",
                          bottom: 0,
                          textAlign: "center" // Ajuste para móvil
                        }}>
                        {video.title}
                      </Typography>
                      {actualUser?.rol === 1 && (
                        <Box
                          sx={{
                            backgroundColor: "#ab8e3a",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "40px",
                            marginBottom: "0.2",
                            flexDirection: "row" // Ajuste para móvil
                          }}>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            sx={{ marginRight: "4px", color: "white" }}
                            onClick={(e) => {
                              e.stopPropagation() // Prevenir que el click en el botón afecte el click en el ListItem
                              handleEdit(video.id)
                              handleVideoSelect(video)
                            }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            sx={{ marginRight: "4px", color: "white" }}
                            onClick={(e) => {
                              e.stopPropagation() // Prevenir que el click en el botón afecte el click en el ListItem
                              handleDelete(e, video.id, video)
                            }}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
        <CreateCourse
          open={openNewVideo}
          onClose={() => {
            setActualId("")
            setEditMode(false)
            setOpenNewVideo(false)
            setUpdateState(!updateState)
          }}
          editMode={editMode}
          id={actualId}
          video={selectedVideo}
        />
        {/* <DeleteVideoConfirmationModal
      open={openDeleteModal}
      onClose={onCloseDeleteModal}
      onDelete={onDelete}
    /> */}
        <ConfirmationModal
          deleteModalOpen={openDeleteModal}
          handleCancelDelete={onCloseDeleteModal}
          handleDeleteConfirmation={onDelete}
          title={"Confirmar Eliminación de Video"}
          message={"¿Estás seguro de que deseas eliminar este video?"}
        />
      </>
    </PageWrapper>
  )
}

export default CoursesSection
