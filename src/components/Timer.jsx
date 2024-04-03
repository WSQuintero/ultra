import { Box } from "@mui/material"

function Timer() {
  return (
    <Box sx={{ display: "flex", gap: 5 }}>
      <div>
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={timerBoxStyle}>0</div>
          <div style={timerBoxStyle}>2</div>
        </div>
        <p style={textAlignCenter}>DAY</p>
      </div>
      <div>
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={timerBoxStyle}>2</div>
          <div style={timerBoxStyle}>3</div>
        </div>
        <p style={textAlignCenter}>HOURS</p>
      </div>
      <div>
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={timerBoxStyle}>4</div>
          <div style={timerBoxStyle}>2</div>
        </div>
        <p style={textAlignCenter}>MINUTES</p>
      </div>
    </Box>
  )
}

const timerBoxStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#2f2d24",
  textAlign: "center",
  padding: 4,
  borderRadius: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 30,
  color: "#ab8e3a"
}

const textAlignCenter = {
  textAlign: "center"
}

export default Timer
