import { useContext, useEffect, useMemo, useState } from "react"
import { MaterialReactTable } from "material-react-table"
import { MRT_Localization_ES } from "material-react-table/locales/es"
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  Typography
} from "@mui/material"
import { MyContext } from "../generalContext/GeneralContext"
import { GoldButton } from "./landing/GoldButton"

const SuscriptionList = ({ users, openNewRol, setOpenNewRol }) => {
  const { $Users, token } = useContext(MyContext)
  const [selectedOption, setSelectedOption] = useState("")
  const [roles, setRoles] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [alert, setAlert] = useState({ show: false, message: "" })

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        id: "id",
        header: "Id"
      },
      {
        accessorKey: "fullName",
        id: "fullName",
        header: "Nombre"
      },
      {
        accessorKey: "email",
        id: "email",
        header: "Email"
      },
      {
        accessorKey: "amount_pay",
        id: "amount_pay",
        header: "Monto de pago"
      },
      {
        accessorKey: "cellphone",
        id: "cellphone",
        header: "Teléfono"
      },

      {
        accessorKey: "email_validated",
        id: "email_validated",
        header: "Email validado?",
        Cell: ({ row }) => (
          <Typography>
            {row.original.email_validated == !0 ? "Si" : "No"}
          </Typography>
        )
      },

      {
        accessorKey: "slug_invitation",
        id: "slug_invitation",
        header: "Código invitación"
      },
      {
        accessorKey: "subrole",
        id: "subrole",
        header: "Role"
      },
      {
        accessorKey: "edit",
        id: "edit",
        header: "Editar role",
        Cell: ({ row }) => (
          <GoldButton
            variant="contained"
            color="primary"
            onClick={() => handleEdit(row)}>
            Editar
          </GoldButton>
        )
      }
    ],
    [users]
  )

  const handleEdit = async (user) => {
    setSelectedUser(user)
    setOpenNewRol(true)
  }

  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  }
  const handleClose = () => {
    setOpenNewRol(false)
  }

  useEffect(() => {
    const getRoles = async () => {
      const { status, data } = await $Users.getRoles({ token })

      if (status) {
        // console.log(data)
        setRoles(data)
      } else {
        console.log(data)
      }
    }
    getRoles()
  }, [])

  const handleSend = async () => {
    const { status, data } = await $Users.updateUser({
      user: selectedUser.original.id,
      subrole: selectedOption,
      token
    })

    if (status) {
      setAlert({ show: true, message: "Rol actualizado correctamente" })
      setOpenNewRol(false)
    } else {
      setOpenNewRol(false)
      setAlert({
        show: true,
        message: "Error al actualizar el rol",
        severity: "error"
      })
    }
  }

  useEffect(() => {
    if (selectedUser) {
      setSelectedOption(selectedUser.original.subrole)
    }
  }, [selectedUser])
  return (
    <div style={{ height: "70%" }}>
      <MaterialReactTable
        columns={columns}
        data={users}
        muiTablePaperProps={{ elevation: 0 }}
        muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
        // state={{ showSkeletons: loading }}
        localization={MRT_Localization_ES}
        enablePagination={true}
        initialState={{
          density: "compact",
          pageSize: 5
        }}
      />
      <Modal
        open={openNewRol}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4
          }}>
          <h2
            id="modal-modal-title"
            style={{ color: "black", marginBottom: "30px" }}>
            Selecciona una opción
          </h2>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Opción</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedOption}
              label="Opción"
              onChange={handleChange}>
              {roles?.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ marginTop: 5 }}>
            <GoldButton
              variant="contained"
              color="primary"
              onClick={handleSend}>
              Confirmar
            </GoldButton>
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
    </div>
  )
}

export default SuscriptionList
