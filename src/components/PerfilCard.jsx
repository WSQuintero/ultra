import {
  Box,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Button
} from "@mui/material"
import { AccountCircle } from "@mui/icons-material"

const PerfilCard = () => {
  return (
    <Box
      sx={{
        width: 300,
        overflow: "hidden",
        borderRadius: 5,
        background: "#010714",
        height: "80vh"
      }}>
      {/* Sección Inicial */}
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            height: 130,
            width: "100%",
            backgroundImage: "url(/perfil-color.png)",
            backgroundSize: "cover",
            alignItems: "center",
            justifyContent: "center"
          }}></Box>
        <Divider />
        <Box
          sx={{
            height: 130,
            width: "100%",
            backgroundColor: "#010720",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}>
          <Avatar
            alt="Profile Picture"
            src="/profile.jpg"
            sx={{
              width: 100,
              height: 100,
              border: "2px solid white",
              position: "absolute",
              top: -55
            }}
          />
          <Typography variant="body1" color="textPrimary">
            Nombre de Usuario
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          padding: 2,
          overflow: "auto",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start"
        }}>
        <Box
          sx={{
            borderBottom: "1px solid white",
            padding: 1
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            <Typography
              sx={{ fontSize: 12 }}
              variant="body2"
              color="textPrimary">
              Texto 1
            </Typography>

            <Button sx={{ fontSize: 12 }} variant="body2" color="textPrimary">
              Edit
            </Button>
          </Box>
        </Box>

        {/* Sección 2 */}
        <Box
          sx={{
            borderBottom: "1px solid white",
            padding: 1
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            <Typography
              sx={{ fontSize: 12 }}
              variant="body2"
              color="textPrimary">
              Texto 1
            </Typography>

            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
          <Typography sx={{ fontSize: 20 }} color="textPrimary">
            Label 1
          </Typography>
        </Box>
        <Box
          sx={{
            borderBottom: "1px solid white",
            padding: 1
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            <Typography
              sx={{ fontSize: 12 }}
              variant="body2"
              color="textPrimary">
              Texto 1
            </Typography>

            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
          <Typography sx={{ fontSize: 20 }} color="textPrimary">
            Label 1
          </Typography>
        </Box>
        <Box
          sx={{
            borderBottom: "1px solid white",
            padding: 1
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            <Typography
              sx={{ fontSize: 12 }}
              variant="body2"
              color="textPrimary">
              Texto 1
            </Typography>

            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
          <Typography sx={{ fontSize: 20 }} color="textPrimary">
            Label 1
          </Typography>
        </Box>
        <Box
          sx={{
            borderBottom: "1px solid white",
            padding: 1
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            <Typography
              sx={{ fontSize: 12 }}
              variant="body2"
              color="textPrimary">
              Texto 1
            </Typography>

            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
          <Typography sx={{ fontSize: 20 }} color="textPrimary">
            Label 1
          </Typography>
        </Box>
        <Box
          sx={{
            borderBottom: "1px solid white",
            padding: 1
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            <Typography
              sx={{ fontSize: 12 }}
              variant="body2"
              color="textPrimary">
              Texto 1
            </Typography>

            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
          <Typography sx={{ fontSize: 20 }} color="textPrimary">
            Label 1
          </Typography>
        </Box>
        <Typography sx={{ pl: 2 }} variant="body2" color="textSecondary">
          Texto 2
        </Typography>
      </Box>
    </Box>
  )
}

export default PerfilCard
