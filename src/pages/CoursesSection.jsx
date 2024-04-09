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

const CoursesSection = () => {
  const [openNewVideo, setOpenNewVideo] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [actualId, setActualId] = useState()
  const { token, $Course } = useContext(MyContext)
  const location = useLocation()
  const [openDeleteModal, setOpenDeleteModal] = useState()
  const [videos, setVideos] = useState([
    {
      id: 1,
      url: "https://www.youtube.com/embed/roZasR_0oHk?si=fSnQWthk5ZI5OzXA",
      thumbnail:
        "https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-1.jpg"
    }
  ])

  const onDelete = async () => {
    const { status, data } = await $Course.deleteCourse(token, actualId)
    if (status) {
      console.log(data)
      setActualId(null)
    } else {
      console.log(data)
      setActualId(null)
    }
  }

  useEffect(() => {
    const ruta = location.hash
    const category = ruta.split("#")[1]
    console.log(category)

    const getVideos = async () => {
      const { status, data } = await $Course.getCourses({ token, category })
      if (status) {
        console.log(data)
        // setVideos(data)
      } else {
        console.log(data)
      }
    }
    console.log(token)
    getVideos()
  }, [token])

  const [selectedVideo, setSelectedVideo] = useState(videos[0])

  const handleVideoSelect = (video) => {
    setSelectedVideo(video)
  }

  const handleEdit = (videoId) => {
    console.log(videoId)
    setEditMode(true)
    setActualId(videoId)
  }

  useEffect(() => {
    if (actualId || editMode) {
      setOpenNewVideo(true)
    }
  }, [actualId, editMode])

  const handleDelete = (videoId) => {
    // Implementar lógica para eliminar el video
    setOpenDeleteModal(true)
    setActualId(videoId)
  }

  const handleBack = () => {
    console.log("atrpas")
    window.history.back()
  }

  const handleAddVideo = () => {
    setActualId(null)
    setEditMode(false)
    setOpenNewVideo(true)
  }

  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false)
    setActualId(null)
  }
  return (
    <PageWrapper>
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
                    backgroundColor: "white",
                    height: "50px",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    padding: 2,
                    flexShrink: 0
                  }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: 25,
                      color: "black"
                    }}>
                    {selectedVideo.id}
                  </Typography>
                </Box>

                <iframe
                  title="Video Player"
                  width="100%"
                  height="74%"
                  style={{ maxHeight: "520px" }}
                  src={selectedVideo.url}
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            )}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: 1,
                backgroundColor: "black",
                position: "absolute",
                borderTop: "1px solid #ab8e3a",
                bottom: 5
              }}>
              <div style={{ position: "relative" }}>
                <BackButton handleBack={handleBack} />
              </div>
              <GoldButton
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddVideo}
                sx={{ height: "30px" }}>
                Agregar Video
              </GoldButton>
            </Box>
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
              overflowY: "scroll"
            }}>
            <List
              style={{
                maxHeight: "calc(100vh - 80px)",
                overflowY: "auto"
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
                    backgroundImage: `url(${video.thumbnail})`,
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
                        fontSize: 15,
                        padding: 1,
                        bottom: 0
                      }}>{`Video ${index + 1}`}</Typography>
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
                        onClick={() => handleEdit(video.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        sx={{ marginRight: "4px", color: "white" }}
                        onClick={() => handleDelete(video.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
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
        }}
        editMode={editMode}
        id={actualId}
      />
      <DeleteVideoConfirmationModal
        open={openDeleteModal}
        onClose={onCloseDeleteModal}
        onDelete={onDelete}
      />
    </PageWrapper>
  )
}

export default CoursesSection
