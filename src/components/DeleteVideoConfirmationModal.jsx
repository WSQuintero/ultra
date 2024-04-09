import { Modal, Box, Button, Snackbar, Alert, Typography } from "@mui/material"
import { GoldButton } from "./landing/GoldButton"

function DeleteVideoConfirmationModal({ open, onClose, onDelete }) {
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
            width: "80%",
            textAlign: "center",
            padding: "2rem"
          }}>
          <Typography varian={"h2"} color={"black"}>
            Confirmar Eliminación de Video
          </Typography>
          <Typography varian={"h2"} color={"black"}>
            ¿Estás seguro de que deseas eliminar este video?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
              gap: "1rem"
            }}>
            <GoldButton variant="contained" color="primary" onClick={onClose}>
              Cancelar
            </GoldButton>
            <GoldButton variant="contained" color="primary" onClick={onDelete}>
              Eliminar
            </GoldButton>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={false} // Aquí deberías manejar el estado del Snackbar según necesites
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => {}} // Aquí deberías manejar el cierre del Snackbar
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Mensaje de confirmación de eliminación
        </Alert>
      </Snackbar>
    </>
  )
}

export default DeleteVideoConfirmationModal
