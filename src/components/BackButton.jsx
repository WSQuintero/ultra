import React from "react"
import { IconButton } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"

function BackButton({ handleBack }) {
  return (
    <IconButton
      onClick={handleBack}
      aria-label="#ab8e3a"
      sx={{ color: "#ab8e3a", cursor: "pointer" }}>
      <ArrowBack sx={{ fontSize: 50 }} />
    </IconButton>
  )
}

export default BackButton
