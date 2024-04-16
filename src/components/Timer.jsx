import React from "react"
import { Box, useMediaQuery } from "@mui/material"

function Timer({ days, hours, minutes }) {
  const formatToTwoDigits = (value) => {
    return value < 10 ? `0${value}` : value
  }
  const isMobile = useMediaQuery("(max-width:600px)")

  const formattedDays = formatToTwoDigits(days)
  const formattedHours = formatToTwoDigits(hours)
  const formattedMinutes = formatToTwoDigits(minutes)

  const hoursFirstDigit =
    formattedHours < 10 ? formattedHours[0] : Math.floor(formattedHours / 10)
  const hoursSecondDigit = formattedHours % 10
  const minutesFirstDigit =
    formattedMinutes < 10
      ? formattedMinutes[0]
      : Math.floor(formattedMinutes / 10)
  const minutesSecondDigit = formattedMinutes % 10

  return (
    <Box
      sx={{
        display: "flex",
        gap: 5,
        flexDirection: isMobile ? "column" : "row" // Cambia a column en móvil
      }}>
      <div>
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={timerBoxStyle}>{formattedDays[0]}</div>
          <div style={timerBoxStyle}>{formattedDays[1]}</div>
        </div>
        <p style={textAlignCenter}>DAY</p>
      </div>
      <div>
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={timerBoxStyle}>{hoursFirstDigit}</div>
          <div style={timerBoxStyle}>{hoursSecondDigit}</div>
        </div>
        <p style={textAlignCenter}>HOURS</p>
      </div>
      <div>
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={timerBoxStyle}>{minutesFirstDigit}</div>
          <div style={timerBoxStyle}>{minutesSecondDigit}</div>
        </div>
        <p style={textAlignCenter}>MINUTES</p>
      </div>
    </Box>
  )
}

const timerBoxStyle = {
  width: "50px",
  height: "50px",
  backgroundColor: "#2f2d24",
  textAlign: "center",
  padding: 4,
  borderRadius: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 20,
  color: "#ab8e3a"
}

const textAlignCenter = {
  textAlign: "center",
  color: "white"
}

export default Timer
