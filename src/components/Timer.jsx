import { Box } from "@mui/material"


function Timer({ days, hours, minutes }) {
  const formatToTwoDigits = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const formattedDays = formatToTwoDigits(days);
  const formattedHours = formatToTwoDigits(hours);
  const formattedMinutes = formatToTwoDigits(minutes);

  return (
    <Box sx={{ display: "flex", gap: 5 }}>
      <div>
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={timerBoxStyle}>{formattedDays[0]}</div>
          <div style={timerBoxStyle}>{formattedDays[1]}</div>
        </div>
        <p style={textAlignCenter}>DAY</p>
      </div>
      <div>
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={timerBoxStyle}>{formattedHours[0]}</div>
          <div style={timerBoxStyle}>{formattedHours[1]}</div>
        </div>
        <p style={textAlignCenter}>HOURS</p>
      </div>
      <div>
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={timerBoxStyle}>{formattedMinutes[0]}</div>
          <div style={timerBoxStyle}>{formattedMinutes[1]}</div>
        </div>
        <p style={textAlignCenter}>MINUTES</p>
      </div>
    </Box>
  );
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
  textAlign: "center"
}

export default Timer
