import {
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Card,
  Box
} from "@mui/material"

import PropTypes from 'prop-types';

function CourseCard({ image, duration, videoCount, title, progress }) {
  return (
    <Card
      sx={{
        maxWidth: "350px",
        width: "100%",
        minWidth: "200px",
        maxHeight: "350px",
        borderRadius: 7,
        transition: "box-shadow 0.3s", 
        "&:hover": {
          boxShadow: "0 4px 8px #ab8e3a"
        }
      }}
    >
      <CardActionArea>
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
              }}
            >
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
              }}
            >
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)"
                }}
              >
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
            sx={{ color: "white" }}
          >
            {title}
          </Typography>
          <div
            style={{
              display: "flex",
              height: "10px",
              alignItems: "center",
              gap: "10px"
            }}
          >
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
  );
}

CourseCard.propTypes = {
  image: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  videoCount: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  progress: PropTypes.string.isRequired,
};

export default CourseCard;
