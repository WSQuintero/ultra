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

const PriceCard = ({ header, options }) => {
  return (
    <Box
      sx={{
        maxWidth: 350,
        minWidth: 300,
        width: "100%",
        overflow: "hidden",
        borderRadius: 5,
        background: "#010714",
        height: "auto",
        border: "2px solid #23221c",
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
          <Typography sx={{ color: "white" }}>{header?.title}</Typography>
          <div style={{ display: "flex", gap: 4 }}>
            <Typography sx={{ color: "white" }}>{header?.price}</Typography>
            <Typography sx={{ textDecoration: "line-through" }}>
              {header?.realPrice}
            </Typography>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
          <Typography sx={{ fontSize: 15 }}>{header?.description}</Typography>
          <div style={{ display: "flex", gap: 4, marginTop: "10px" }}>
            <Typography
              sx={{
                width: "auto",
                padding: 1,
                borderRadius: 10,
                backgroundColor: "#f45170",
                fontSize: 12,
                color: "white"
              }}>
              {header.discount}
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
        {options?.map((option, index) => (
          <Box
            sx={{
              borderBottom: "1px solid white",
              padding: 1
            }}
            key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
              <Typography variant="body2" color="white" sx={{ fontSize: 20 }}>
                {option.title}
              </Typography>

              <Typography variant="body2" color="white" sx={{ fontSize: 20 }}>
                {option.price}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 15 }} color="textPrimary">
              {option.subtitle}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default PriceCard
