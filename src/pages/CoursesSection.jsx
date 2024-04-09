import React, { useState } from "react"
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

const CoursesSection = () => {
  const [openNewVideo, setOpenNewVideo] = useState(false)
  const [videos, setVideos] = useState([
    {
      id: 1,
      url: "https://www.youtube.com/embed/roZasR_0oHk?si=fSnQWthk5ZI5OzXA",
      thumbnail:
        "https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-1.jpg"
    },
    {
      id: 2,
      url: "https://www.youtube.com/watch?v=UZuavdI6h1Y&list=RDUZuavdI6h1Y&start_radio=1",
      thumbnail: "https://ethic.es/wp-content/uploads/2023/03/imagen.jpg"
    },
    {
      id: 1,
      url: "https://www.youtube.com/watch?v=UZuavdI6h1Y&list=RDUZuavdI6h1Y&start_radio=1",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiHxqXTXWQ5zU6DdUjKo43ZE1401YDUitHYd2cXMR0FA&s"
    }
  ])
  const [selectedVideo, setSelectedVideo] = useState(videos[0])

  const handleVideoSelect = (video) => {
    setSelectedVideo(video)
  }

  const handleEdit = (videoId) => {
    // Implementar lógica para editar el video
  }

  const handleDelete = (videoId) => {
    // Implementar lógica para eliminar el video
  }

  const handleBack = () => {
    console.log("atrpas")
    window.history.back()
  }

  const handleAddVideo = () => {
    setOpenNewVideo(true)
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
            height: "calc(100vh - 120px)"
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
                  height="520px"
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
                padding: 2,
                flexShrink: 0,
                backgroundColor: "black",
                position: "absolute",
                bottom: 0
              }}>
              <div style={{ position: "relative", top: 5 }}>
                <BackButton handleBack={handleBack} />
              </div>
              <GoldButton
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ marginTop: 2 }}
                onClick={handleAddVideo}>
                Agregar Video
              </GoldButton>
            </Box>
          </Grid>

          <Grid item sx={{ width: "20vw", backgroundColor: "black" }}>
            <List
              style={{
                maxHeight: "calc(100vh - 80px)",
                overflowY: "auto"
              }}>
              {videos.map((video, index) => (
                <ListItem
                  sx={{
                    height: "calc(20vw * (9 / 16))",
                    width: "100%",
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
                  <ListItemText
                    primary={`Video ${index + 1}`}
                    sx={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      display: "flex",
                      padding: 2,
                      width: "85%",
                      visibility: video.hover ? "visible" : "hidden"
                    }}
                  />
                  <ListItemSecondaryAction
                    sx={{
                      backgroundColor: "#ab8e3a",
                      borderRadius: "50%",
                      padding: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      visibility: video.hover ? "visible" : "hidden"
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
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
      <CreateCourse
        open={openNewVideo}
        onClose={() => setOpenNewVideo(false)}
      />
    </PageWrapper>
  )
}

export default CoursesSection
