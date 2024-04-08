import {
  Box,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Button
} from "@mui/material"
import { AccountCircle } from "@mui/icons-material"
import GeneralButton from "./GeneralButton"

const PriceCard = () => {
  return (
    <Box
      sx={{
        maxWidth: 450,
        minWidth: 300,
        width: "100%",
        overflow: "hidden",
        borderRadius: 5,
        background: "#010714",
        height: "auto",
        maxHeight: "80vh",
        flexShrink: 0
      }}>
      {/* Sección Inicial */}
      <Box
        sx={{
          height: 170,
          width: "100%",
          backgroundColor: "#13141a",
          backgroundSize: "cover",
          alignItems: "center",
          justifyContent: "center",
          padding: 2
        }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "white" }}>
            Unlock Comprehensive Learning
          </Typography>
          <div style={{ display: "flex", gap: 4 }}>
            <Typography sx={{ color: "white" }}>$299!</Typography>
            <Typography sx={{ textDecoration: "line-through" }}>
              $3,100
            </Typography>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
          <Typography sx={{ fontSize: 15 }}>
            All Courses Now Just Only
          </Typography>
          <div style={{ display: "flex", gap: 4 }}>
            <Typography
              sx={{
                width: "auto",
                padding: 1,
                borderRadius: 10,
                backgroundColor: "#f45170",
                fontSize: 15,
                color: "white"
              }}>
              90.35% Discount 🔥
            </Typography>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <GeneralButton>Get Started</GeneralButton>
        </div>
      </Box>

      <Box
        sx={{
          padding: 2,
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start"
        }}>
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
            <Typography variant="body2" color="white" sx={{ fontSize: 20 }}>
              Texto 1
            </Typography>

            <Typography variant="body2" color="white" sx={{ fontSize: 20 }}>
              $1,000
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 15 }} color="textPrimary">
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
            <Typography variant="body2" color="white" sx={{ fontSize: 20 }}>
              Texto 1
            </Typography>

            <Typography variant="body2" color="white" sx={{ fontSize: 20 }}>
              $1,000
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 15 }} color="textPrimary">
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
            <Typography variant="body2" color="white" sx={{ fontSize: 20 }}>
              Texto 1
            </Typography>

            <Typography variant="body2" color="white" sx={{ fontSize: 20 }}>
              $1,000
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 15 }} color="textPrimary">
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
            <Typography variant="body2" color="white" sx={{ fontSize: 20 }}>
              Texto 1
            </Typography>

            <Typography variant="body2" color="white" sx={{ fontSize: 20 }}>
              $1,000
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 15 }} color="textPrimary">
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
            <Typography variant="body2" color="white" sx={{ fontSize: 20 }}>
              Texto 1
            </Typography>

            <Typography variant="body2" color="white" sx={{ fontSize: 20 }}>
              $1,000
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 15 }} color="textPrimary">
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
            <Typography variant="body2" color="white" sx={{ fontSize: 20 }}>
              Texto 1
            </Typography>

            <Typography variant="body2" color="white" sx={{ fontSize: 20 }}>
              $1,000
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 15 }} color="textPrimary">
            Label 1
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default PriceCard
