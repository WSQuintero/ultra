import React from "react"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { GoldButton } from "./landing/GoldButton"

function CardLive({ img, description, title, setEditMode, setOpen }) {
  return (
    <Card
      sx={{
        maxWidth: "350px",
        width: "100%",
        minWidth: "200px",
        maxHeight: "450px",
        borderRadius: 7,
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: "0 4px 8px #ab8e3a",
          transform: "scale(1.05)"
        },
        border: "1px solid #ab8e3a",
        position: "relative",
        backgroundColor: "black"
      }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://img.freepik.com/foto-gratis/retrato-mujer-feliz-natural-peinado-corto-mostrando-buenos-gestos-sonriendo-aprueba-me-gusta-algo-muestra-comentarios-positivos-pared-blanca_176420-34125.jpg"
          alt="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="white">
            Lizard
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.5)">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ paddingX: 5 }}>
        <GoldButton size="small" color="primary">
          Eliminar
        </GoldButton>
        <GoldButton
          size="small"
          color="primary"
          onClick={() => {
            setEditMode(true)
            setOpen(true)
          }}>
          Editar
        </GoldButton>
      </CardActions>
    </Card>
  )
}

export default CardLive
