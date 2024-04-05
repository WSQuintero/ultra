import { Button } from "@mui/material"

function GeneralButton({ children }) {
  return (
    <Button
      sx={{
        backgroundColor: "#ab8e3a",
        width: "200px",
        height: "50px",
        color: "white"
      }}>
      {children}
    </Button>
  )
}

export default GeneralButton
