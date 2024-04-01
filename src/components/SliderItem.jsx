import { useTheme } from "@emotion/react";
import { Box, Grid, Typography } from "@mui/material";

export default function SliderItem({ title, description, background, image }) {
  const theme = useTheme();

  return (
    <Grid position="relative">
      <Box
        position="absolute"
        top={0}
        left={0}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={8}
        width="100%"
        height="100%"
        padding={8}
      >
        <Box>
          <img src={image} alt="image_slider_1" style={{ width: "100%" }} />
        </Box>
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
          textAlign="center"
        >
          <Typography
            variant="h3"
            fontWeight={600}
            color="white"
            sx={{
              [theme.breakpoints.down("lg")]: {
                fontSize: 32,
              },
            }}
          >
            {title}
          </Typography>
          <Typography color="white">{description}</Typography>
        </Grid>
      </Box>
      <img
        src={background}
        alt="signup_image"
        width="100%"
        style={{
          objectFit: "cover",
          minHeight: "100vh",
        }}
      />
    </Grid>
  );
}
