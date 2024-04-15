import { Box, Modal, Typography, Grid, TextField } from "@mui/material";
import { GoldButton } from "./landing/GoldButton";

function EditModal({
  editModalOpen,
  handleCancelEdit,
  handleEditConfirmation,
  title,
  message,
  categoryName,
  setCategoryName,
}) {
  return (
    <Modal
      open={editModalOpen}
      onClose={handleCancelEdit}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "black",
          border: "1px solid #ab8e3a",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h2"
          component="h2"
          sx={{ color: "white" }}
        >
          {title}
        </Typography>
        <TextField
          id="category-name"
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)
          }
          sx={{ mt: 2 }}
        />
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, fontSize: 26, color: "white" }}
        >
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 3 }} justifyContent="center">
          <Grid item>
            <GoldButton onClick={handleCancelEdit}>Cancelar</GoldButton>
          </Grid>
          <Grid item>
            <GoldButton onClick={handleEditConfirmation}>Editar</GoldButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default EditModal;
