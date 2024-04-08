import { useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import AuthService from "../services/auth.service"
import { Alert, Snackbar } from "@mui/material"

function ValidateEmail() {
  const [searchParams, setSearchParams] = useSearchParams()
  const $Auth = useMemo(() => new AuthService(), [])
  const navigate = useNavigate()
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    status: "success"
  })

  const resetAlert = () => {
    setAlert({ show: false, message: "", status: "success" })
  }

  useEffect(() => {
    let validateEmail = async () => {
      let tokenEmail = searchParams.get("token")
      if (tokenEmail) {
        const { status, data } = await $Auth.validateAccount(tokenEmail)
        if (status) {
          setAlert({
            show: true,
            message: "Email validado con éxito.",
            status: "success"
          })
          setTimeout(() => {
            navigate("/signin")
          }, 1000)
        } else {
          if (data.response.data.message === "ok") {
            setAlert({
              show: true,
              message: "Email validado con éxito.",
              status: "success"
            })
            setTimeout(() => {
              navigate("/signin")
            }, 1000)
          } else {
            setAlert({
              show: true,
              message:
                "Ha ocurrido un error al validar el E-mail, contáctate con el administrador.",
              status: "error"
            })
          }
        }
      }
    }

    validateEmail()
  }, [])
  return (
    <div>
      {" "}
      <Snackbar
        open={alert.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={resetAlert}>
        <Alert severity={alert.status} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ValidateEmail
