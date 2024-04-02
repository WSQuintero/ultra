import {
  Button,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  Card
} from "@mui/material"

function CourseCard() {
  return (
    <Card sx={{ width: "350px", height: "300px", borderRadius: 5 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image="/card-course.png"
          title="Contemplative Reptile"
        />
        <CardContent sx={{ backgroundColor: "#010a1e" }}>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

export default CourseCard
