import { Button } from "@mui/material"

function GeneralButton({ children }) {
  return (
    <Button
      sx={{
        backgroundColor: "#ab8e3a",
        width: "160px",
        height: "40px",
        color: "white"
      }}>
      {children}
    </Button>
  )
}

export default GeneralButton
