import {
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Card,
  Box,
  IconButton
} from "@mui/material"
import PropTypes from "prop-types"
import { useState } from "react"
import { MdOutlineDeleteOutline } from "react-icons/md"

function CourseCard({
  duration,
  videoCount,
  title,
  progress,
  handleDelete,
  id
}) {
  const [isHover, setIsHover] = useState(false)
  const handleDeleteCategory = (event) => {
    event.stopPropagation()
    handleDelete(id)
  }
  const handleHover = () => {
    setIsHover(true)
  }
  const handleHoverOut = () => {
    setIsHover(false)
  }
  return (
    <Card
      onMouseOver={handleHover}
      onMouseOut={handleHoverOut}
      sx={{
        maxWidth: "350px",
        width: "100%",
        minWidth: "200px",
        maxHeight: "350px",
        borderRadius: 7,
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: "0 4px 8px #ab8e3a",
          transform: "scale(1.05)"
        },
        border: "1px solid #ab8e3a",
        position: "relative"
      }}>
      <CardActionArea>
        <Box
          sx={{
            display: "flex",
            background: "rgba(0,0,0)",
            position: "absolute",
            top: 0,
            right: 0,
            width: 50,
            height: 50,
            padding: 2,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            "&:hover": {
              boxShadow: "0 4px 8px #ab8e3a",
              transform: "scale(1.05)"
            }
          }}>
          <IconButton aria-label="delete" onClick={handleDeleteCategory}>
            <MdOutlineDeleteOutline color="white" />
          </IconButton>
        </Box>

        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image="/card-course.png"
          title="Contemplative Reptile"
        />
        <CardContent sx={{ backgroundColor: "black", paddingBottom: 5 }}>
          <div style={{ display: "flex", gap: "5px" }}>
            <Box
              sx={{
                backgroundColor: "rgba(255,255,255,0.4)",
                padding: "5px",
                paddingX: "10px",
                borderRadius: 2
              }}>
              <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                <span>
                  <img
                    src="/clock.svg"
                    alt="vector"
                    style={{ width: "15px" }}
                  />
                </span>{" "}
                {duration}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "rgba(255,255,255,0.4)",
                padding: "5px",
                paddingX: "10px",
                borderRadius: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)"
                }}>
                <span>
                  <img
                    src="/clock.svg"
                    alt="vector"
                    style={{ width: "15px" }}
                  />
                </span>{" "}
                {videoCount}
              </Typography>
            </Box>
          </div>
          <Typography
            variant="h5"
            component="h2"
            marginLeft={1}
            marginTop={1}
            sx={{ color: "white" }}>
            {title}
          </Typography>
          <div
            style={{
              display: "flex",
              height: "10px",
              alignItems: "center",
              gap: "10px"
            }}>
            <img
              src="/charge.png"
              alt="charge"
              style={{ marginLeft: "10px", width: "80%" }}
            />
            <span>
              <Typography>{progress}</Typography>
            </span>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

CourseCard.propTypes = {
  image: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  videoCount: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  progress: PropTypes.string.isRequired
}

export default CourseCard
