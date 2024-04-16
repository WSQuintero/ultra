import { useContext, useEffect, useMemo, useState } from "react"
import { MaterialReactTable } from "material-react-table"
import { MRT_Localization_ES } from "material-react-table/locales/es"
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select
} from "@mui/material"
import { MyContext } from "../generalContext/GeneralContext"

const SuscriptionList = ({ users }) => {
  const { $Users, token } = useContext(MyContext)
  const [openNewRol, setOpenNewRol] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [roles, setRoles] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
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
        Cell: ({ value }) => (value === "0" ? "No" : "Si")
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(row)}>
            Editar
          </Button>
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
        console.log(data)
        setRoles(data)
      } else {
        console.log(data)
      }
    }
    getRoles()
  }, [])
  const options = ["Opción 1", "Opción 2", "Opción 3"] // Tus opciones

  const handleSend = async () => {
    const { status, data } = await $Users.updateUser({
      user: selectedUser.id,
      subrole: selectedOption
    })

    if (status) {
      console.log(data)
    } else {
      console.log(data)
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
        initialState={{ density: "compact" }}
        muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
        // state={{ showSkeletons: loading }}
        localization={MRT_Localization_ES}
        enablePagination={true}
        style={{ heigth: "70%" }}
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
          <h2 id="modal-modal-title">Selecciona una opción</h2>
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            style={{ marginTop: "20px" }}>
            Confirmar
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

export default SuscriptionList
