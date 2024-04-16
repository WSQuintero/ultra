import { useState } from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  Typography,
  useMediaQuery
} from "@mui/material"
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md"

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

function ProductCard({
  commissionable,
  image,
  name,
  handleDelete,
  handleEdit,
  id
}) {
  const [isHover, setIsHover] = useState(false)
  const isMobile = useMediaQuery("(max-width:600px)")

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
    handleEdit(name, id)
  }

  return (
    <Card
      onMouseOver={handleHover}
      onMouseOut={handleHoverOut}
      sx={{
        width: "300px",
        minWidth: isMobile ? "100%" : "200px",
        maxWidth: isMobile ? "100%" : "350px",
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
      <CardActionArea sx={{ height: "100%" }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            height: "100%"
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 2,
            height: "60%",
            backgroundColor: "rgba(255,255,255,0.2)"
          }}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            image={image}
            title="Contemplative Reptile"
            sx={{
              paddingBottom: 5,
              width: "100%",
              objectFit: "cover",
              height: "100%"
            }}
          />
        </Box>
        <CardContent
          sx={{
            backgroundColor: "black",
            paddingBottom: 5,
            height: "100%",
            position: "relative",
            marginTop: 3
          }}>
          <Box sx={{ height: "100%", position: "absolute", bottom: 0 }}>
            <Typography
              variant="h5"
              component="h2"
              marginLeft={1}
              marginTop={1}
              sx={{ color: "white", fontSize: 16, height: "100%" }}>
              {name}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

ProductCard.propTypes = {
  duration: PropTypes.string.isRequired,
  videoCount: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  progress: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  handleEdit: PropTypes.func.isRequired
}

export default ProductCard
