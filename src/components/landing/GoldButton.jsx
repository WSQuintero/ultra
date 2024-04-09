import { Button, styled } from "@mui/material"

export const GoldButton = styled(Button)({
  // backgroundColor: 'linear-gradient(140.75deg, #8F5F25 11.94%, #DBBB6F 61.03%, #8F5F25 113.42%)',
  background:
    "linear-gradient(140.75deg, #8F5F25 11.94%, #DBBB6F 61.03%, #8F5F25 113.42%);",
  color: "white",
  "&:hover": {
    opacity: "0.9",
    boxShadow: "none"
  },
  "&:active": {
    boxShadow: "none",
    background: "#0062cc",
    borderColor: "#005cbf"
  },
  textShadow: "1px 1px 1px rgba(0, 0, 0, 1)"
})
