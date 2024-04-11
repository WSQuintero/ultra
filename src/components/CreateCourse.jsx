import { useContext, useEffect, useState } from "react"
import { Modal, Box, TextField, Button, Snackbar, Alert } from "@mui/material"
import { GoldButton } from "./landing/GoldButton"
import { MyContext } from "../generalContext/GeneralContext"
import { useLocation } from "react-router-dom"
const initialState = {
  image: null,
  product: "",
  title: "",
  description: "",
  url_resource: ""
}

function CreateCourse({ id, open, onClose, editMode, video }) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("")
  const [alert, setAlert] = useState({ show: false, message: "" })
  const location = useLocation()
  const [formData, setFormData] = useState(initialState)
  const { $Course, token } = useContext(MyContext)
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (event) => {
    event.preventDefault()
    let reader = new FileReader()
    let file = event.target.files[0]
    setFormData({ ...formData, image: event.target.files[0] })
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviar formData a tu backend
    const newFormData = new FormData()

    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key)) {
        newFormData.append(key, formData[key])
      }
    }
    const ruta = location.hash
    const fragmento = ruta.split("#")[2]
    newFormData.append("category", fragmento)

    if (!editMode && !id) {
      console.log("createmode")

      const { status, data } = await $Course.createCourse(token, newFormData)
      if (status) {
        setAlert({ show: true, message: "Course added correctly" })
        setFormData(initialState)
        setImagePreviewUrl(null)
        onClose()
      } else {
        onClose()
        setFormData(initialState)
        setImagePreviewUrl(null)
        setAlert({ show: true, message: "Error" })
      }
    } else {
      console.log("editMode")

      const ruta = location.hash
      const fragmento = ruta.split("#")[2]
      const { status, data } = await $Course.updateCourse(
        token,
        id,
        newFormData
      )
      if (status) {
        setAlert({ show: true, message: "Course added correctly" })
        setFormData(initialState)
        setImagePreviewUrl(null)
        onClose()
      } else {
        onClose()
        setFormData(initialState)
        setImagePreviewUrl(null)
        setAlert({ show: true, message: "Error" })
      }
    }
  }

  useEffect(() => {
    setImagePreviewUrl(video?.thumbnail || "")
    setFormData({
      ...initialState,
      title: video.title,
      url_resource: video.url
    })
  }, [video])
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
        BackdropProps={{
          style: { backgroundColor: "rgba(171, 142, 58,0.5)" }
        }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: 10,
            maxWidth: "900px",
            width: "100%",
            textAlign: "center",
            height: "80%",
            display: "flex"
          }}>
          {/* Contenedor de la imagen */}

          <div
            style={{
              width: "40%",
              margin: "0 auto",
              position: "relative",
              padding: 20
            }}>
            {imagePreviewUrl && (
              <img
                src={imagePreviewUrl}
                alt="Imagen cargada"
                style={{
                  maxWidth: "100%",
                  maxHeight: "500px", // Altura máxima de la imagen
                  margin: "0 auto"
                }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <GoldButton
                variant="contained"
                color="primary"
                component="span"
                sx={{ position: "absolute", bottom: 20, left: 5 }}
                fullWidth>
                Subir Imagen
              </GoldButton>
            </label>
          </div>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 15,
              width: "50%",
              backgroundColor: "rgba(0,0,0,0.1)",
              padding: 10
            }}>
            {/* Resto de campos */}
            <TextField
              name="product"
              label="Producto"
              variant="outlined"
              fullWidth
              value={formData.product}
              sx={{ borderRadius: 5, marginTop: 2 }}
              onChange={handleInputChange}
              InputLabelProps={{
                style: {
                  color: "black",
                  textShadow: "1px 1px 1px rgba(255,255, 255, 0.7)"
                }
              }}
            />
            <TextField
              name="category"
              label="Categoría"
              variant="outlined"
              fullWidth
              value={location?.hash?.split("#")[1]}
              disabled
              sx={{ borderRadius: 5 }}
              // onChange={handleInputChange}
              InputLabelProps={{
                style: {
                  color: "black",
                  textShadow: "1px 1px 1px rgba(255,255, 255, 0.7)"
                }
              }}
            />
            <TextField
              name="title"
              label="Título"
              variant="outlined"
              fullWidth
              value={formData.title}
              sx={{ borderRadius: 5 }}
              onChange={handleInputChange}
              InputLabelProps={{
                style: {
                  color: "black",
                  textShadow: "1px 1px 1px rgba(255,255, 255, 0.7)"
                }
              }}
            />
            <TextField
              name="description"
              label="Descripción"
              variant="outlined"
              fullWidth
              value={formData.description}
              sx={{ borderRadius: 5 }}
              onChange={handleInputChange}
              InputLabelProps={{
                style: {
                  color: "black",
                  textShadow: "1px 1px 1px rgba(255,255, 255, 0.7)"
                }
              }}
            />
            <TextField
              name="url_resource"
              label="URL del recurso"
              variant="outlined"
              fullWidth
              value={formData.url_resource}
              onChange={handleInputChange}
              sx={{ borderRadius: 5 }}
              InputLabelProps={{
                style: {
                  color: "black",
                  textShadow: "1px 1px 1px rgba(255,255, 255, 0.7)"
                }
              }}
            />
            <Box
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
                gap: 5
              }}>
              <GoldButton
                variant="contained"
                color="primary"
                onClick={() => {
                  onClose()
                  setFormData(initialState)
                  setImagePreviewUrl(null)
                }}>
                Cancelar
              </GoldButton>
              <GoldButton
                variant="contained"
                color="primary"
                onClick={handleSubmit}>
                Crear
              </GoldButton>
            </Box>
          </Box>
        </Box>
      </Modal>
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

export default CreateCourse
