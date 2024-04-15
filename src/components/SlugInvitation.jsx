import { useContext, useState } from "react"
import {
  Grid,
  TextField,
  Snackbar,
  IconButton,
  InputAdornment,
  Alert
} from "@mui/material"
import { ContentCopyRounded as CopyIcon } from "@mui/icons-material"
import useSession from "../hooks/useSession"
import { MyContext } from "../generalContext/GeneralContext"

function SlugInvitation() {
  const [alert, setAlert] = useState({ show: false, message: "" })
  const [session] = useSession()
  const { actualUser } = useContext(MyContext)

  const handleCopySlug = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_APP_URL}/signup/${actualUser?.slug_invitation}`
    )
    setAlert({ show: true, message: "Slug added to your clipboard" })
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        sx={{
          zIndex: 50
        }}>
        <TextField
          style={{
            backgroundColor: "#ffffff22",
            backdropFilter: "blur(8px)"
          }}
          sx={{
            width: "50%",
            "& input:disabled": {
              "-webkit-text-fill-color": "white",
              color: "white !important"
            },
            "& fieldset": {
              border: "1px solid white !important"
            }
          }}
          size="small"
          color="secondary"
          value={`${import.meta.env.VITE_APP_URL}/signup/${
            actualUser?.slug_invitation
          }`}
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="copy slug"
                  onClick={handleCopySlug}
                  sx={{ color: "white" }}>
                  <CopyIcon color="inherit" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Snackbar
        open={alert.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setAlert({ show: false, message: "" })}>
        <Alert severity="success" sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default SlugInvitation
