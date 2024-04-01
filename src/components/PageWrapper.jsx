import { useTheme } from "@emotion/react";
import { Box, Container } from "@mui/material";
import Color from "color";
import BackgroundImage from "../assets/img/common/city_background.png";

function PageWrapper({ sx = {}, expanded = false, empty = false, children }) {
  const theme = useTheme();

  const containerCollapsed = (
    <Box
      sx={(t) => ({
        pt: theme.sizes.header,
        overflowX: "hidden",
        backgroundColor: t.palette.custom.background.blue,
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
      })}
    >
      <Box
        position="relative"
        zIndex={0}
        display="flex"
        flexDirection="column"
        overflow="hidden"
        sx={{
          ...sx,
          paddingBottom: 0,
          minHeight: `calc(100vh - ${theme.sizes.header * 8}px)`,
        }}
      >
        <Container maxWidth="xxl" sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }} disableGutters>
          <Box flexGrow={1} display="flex" flexDirection="column" paddingBottom={0} sx={{}}>
            <Box>{children}</Box>
          </Box>
          <Box width="100%" height={16} sx={{}} />
        </Container>
      </Box>
    </Box>
  );

  const containerExpanded = (
    <Box
      sx={{
        position: "relative",
        pt: theme.sizes.header + 2,
        "&::before": {
          content: "''",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          backgroundColor: theme.palette.custom.background.blue,
          backgroundImage: `url(${BackgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
        },
      }}
    >
      <Box>{children}</Box>
    </Box>
  );

  const containerEmpty = (
    <Box
      sx={{
        position: "relative",
        pt: theme.sizes.header,
        "&::before": {
          content: "''",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          backgroundColor: theme.palette.custom.background.blue,
          width: "100%",
          height: "100%",
        },
      }}
    >
      <Box>{children}</Box>
    </Box>
  );

  return empty ? containerEmpty : expanded ? containerExpanded : containerCollapsed;
}

export default PageWrapper;
