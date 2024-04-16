import { useContext, useState } from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  Typography
} from "@mui/material"
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md"
import { MyContext } from "../generalContext/GeneralContext"

const iconContainerStyle = {
  display: "flex",
  background: "rgba(0,0,0)",
  width: 50,
  height: 50,
  padding: 2,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
  margin: "4px",
  "&:hover": {
    boxShadow: "0 4px 8px #ab8e3a",
    transform: "scale(1.05)"
  }
}

function CourseCard({
  duration,
  videoCount,
  title,
  progress,
  handleDelete,
  handleEdit,
  id
}) {
  const [isHover, setIsHover] = useState(false)
  const { actualUser } = useContext(MyContext)
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

  const handleEditCategory = (event) => {
    event.stopPropagation()
    handleEdit(title, id)
  }

  return (
    <Card
      onMouseOver={handleHover}
      onMouseOut={handleHoverOut}
      sx={{
        maxWidth: "300px",
        width: "100%",
        minWidth: "200px",
        height: "300px",
        borderRadius: 7,
        backgroundColor: "black",
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: "0 4px 8px #ab8e3a",
          transform: "scale(1.05)"
        },
        border: "1px solid #ab8e3a",
        position: "relative"
      }}>
      <CardActionArea>
        {actualUser.rol === 1 && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              display: "flex",
              flexDirection: "column"
            }}>
            <Box sx={iconContainerStyle}>
              <IconButton aria-label="delete" onClick={handleDeleteCategory}>
                <MdOutlineDeleteOutline color="white" />
              </IconButton>
            </Box>
            <Box sx={iconContainerStyle}>
              <IconButton aria-label="edit" onClick={handleEditCategory}>
                <MdOutlineEdit color="white" />
              </IconButton>
            </Box>
          </Box>
        )}

        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image="/card-course.png"
          title="Contemplative Reptile"
          sx={{ backgroundColor: "black", paddingBottom: 5, height: "100%" }}
        />
        <CardContent
          sx={{ backgroundColor: "black", paddingBottom: 5, height: "100%" }}>
          {/* <div style={{ display: "flex", gap: "5px" }}>
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
              <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
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
          </div> */}
          <Box sx={{ height: "100%" }}>
            <Typography
              variant="h5"
              component="h2"
              marginLeft={1}
              marginTop={1}
              sx={{ color: "white", fontSize: 16, height: "100%" }}>
              {title}
            </Typography>
            {/* <div
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
          </div> */}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

CourseCard.propTypes = {
  duration: PropTypes.string.isRequired,
  videoCount: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  progress: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  handleEdit: PropTypes.func.isRequired
}

export default CourseCard
