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
  Button
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
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "",
      url: "",
      thumbnail: ""
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
    console.log(actualUser)

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
            thumbnail: course.image
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
      {actualUser.membership_status === "Active" || actualUser.rol === 1 ? (
        <>
          {" "}
          <Box sx={{ backgroundColor: "black" }}>
            <Grid
              container
              spacing={1}
              width={"100%"}
              sx={{
                position: "relative",
                gap: 10,
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 120px)",
                paddingTop: 3
              }}>
              <Grid
                item
                xs={8}
                sx={{
                  width: "53vw",
                  height: "calc(100vh - 130px)",
                  maxHeight: "700px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "center",
                  border: "1px solid #ab8e3a",
                  padding: 1,

                  overflow: "hidden",
                  marginTop: "10px",
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
                  width: "20vw",
                  backgroundColor: "black",
                  border: "1px solid #ab8e3a",
                  height: "calc(100vh - 130px)",
                  marginTop: 2,
                  maxHeight: "700px",
                  overflowY: "auto"
                }}>
                <List
                  style={{
                    maxHeight: "calc(100vh - 80px)"
                  }}>
                  {videos.map((video, index) => (
                    <ListItem
                      sx={{
                        height: "calc(20vw * (9 / 16))",
                        width: "97%",
                        padding: "20px",
                        fontSize: "1.2rem",
                        marginBottom: "10px",
                        borderRadius: "8px",
                        backgroundImage: `url(${
                          video.thumbnail || "/elseimg.png"
                        })`,
                        backgroundSize: "cover",
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
                          justifyContent: "center",
                          alignItems: "end"
                        }}>
                        <Typography
                          sx={{
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            display: "flex",
                            height: "40px",
                            width: "85%",
                            fontSize: 10,
                            padding: 1,
                            bottom: 0
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
                              bottom: 0,
                              marginBottom: 0.2
                            }}>
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              sx={{ marginRight: "4px", color: "white" }}
                              onClick={() => {
                                handleEdit(video.id)
                                handleVideoSelect(video)
                              }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              sx={{ marginRight: "4px", color: "white" }}
                              onClick={(event) => {
                                handleDelete(event, video.id, video)
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
      ) : (
        <>
          <PriceCards />
        </>
      )}
    </PageWrapper>
  )
}

export default CoursesSection
