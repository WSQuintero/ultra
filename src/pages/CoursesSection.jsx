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

const CoursesSection = () => {
  const videos = [
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
  ]
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
  }

  const handleAddVideo = () => {}
  return (
    <PageWrapper>
      <Box sx={{ backgroundColor: "black" }}>
        <div style={{ position: "absolute", top: 5 }}>
          <BackButton handleBack={handleBack} />
        </div>
        <Grid
          container
          spacing={1}
          width={"100%"}
          sx={{ position: "relative" }}>
          <Grid
            item
            xs={8}
            sx={{
              width: "50vw",
              height: "calc(50vw * 9 / 16)",
              marginTop: 10
            }}>
            {selectedVideo && (
              <div
                style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                <iframe
                  title="Video Player"
                  width="100%"
                  height="100%"
                  src={selectedVideo.url}
                  frameBorder="0"
                  allowFullScreen></iframe>
              </div>
            )}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: 2
              }}>
              <GoldButton
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddVideo}>
                Agregar Video
              </GoldButton>
            </Box>
          </Grid>

          <Grid item sx={{ width: "30vw" }}>
            <List
              style={{
                maxHeight: "calc(100vh - 64px)",
                overflowY: "auto"
              }}>
              {videos.map((video, index) => (
                <ListItem
                  sx={{
                    height: "calc(30vw * (9 / 16))", // Calculating height to maintain 16:9 aspect ratio
                    width: "28vw", // Width always 30vw
                    padding: "20px",
                    fontSize: "1.2rem",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    backgroundImage: `url(${video.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "#fff"
                  }}
                  button
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}>
                  <ListItemText primary={`Video ${index + 1}`} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEdit(video.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
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
    </PageWrapper>
  )
}

export default CoursesSection
