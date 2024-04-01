import { useEffect, useMemo, useState } from "react"

import useAuth from "../hooks/useAuth"
import useConfig from "../hooks/useConfig"
import useSession from "../hooks/useSession"
import ModalAuth from "../components/ModalAuth"
import UserService from "../services/user.service"
import EnhancedTable from "../components/EnhancedTable"
import PageWrapper from "../components/PageWrapper"
import SubscriptionService from "../services/subscription.service"
import { Button, Snackbar, Alert, Select, MenuItem } from "@mui/material"
import ModalNewPass from "../components/ModalNewPass"
import ModalChangeTree from "../components/ModalChangeTree"
import ModalGiveDeposit from "../components/ModalGiveDeposit"
import ModalGiveCommissions from "../components/ModalGiveCommissions"

function Users() {
  const [auth] = useAuth()
  const [config, { setLoading }] = useConfig()
  const [users, setUsers] = useState(null)
  const [usersOriginal, setUsersOriginal] = useState(null)
  const [session, setSession] = useSession()
  const [modalConfirmAuth, setModalConfirmAuth] = useState(false)
  const [modalChangeTreeOpen, setModalChangeTreeOpen] = useState(false)
  const [modalChangeTreeProduct, setModalChangeTreeProduct] = useState(false)
  const [modalChangePassOpen, setModalChangePassOpen] = useState(false)
  const [modalGiveDepositOpen, setModalGiveDepositOpen] = useState(false)
  const [modalGiveCommissionsOpen, setModalGiveCommissionsOpen] =
    useState(false)
  const [modalGiveCommissionsOpenPass, setModalGiveCommissionsOpenPass] =
    useState("")

  const $User = useMemo(() => new UserService(auth), [auth])
  const $Subscription = useMemo(() => new SubscriptionService(auth), [auth])
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    status: "success"
  })

  const headCells = [
    {
      id: "id",
      label: "ID",
      align: "left",
      width: "14.2%",
      disablePadding: false,
      format: (value) => value
    },
    {
      id: "ref",
      label: "Referido por",
      align: "left",
      width: "14.2%",
      disablePadding: false,
      format: (value) => value
    },
    {
      id: "fullName",
      label: "Nombre",
      align: "left",
      width: "14.2%",
      disablePadding: false,
      format: (value) => value
    },
    {
      id: "email",
      label: "Correo",
      align: "left",
      width: "14.2%",
      disablePadding: false,
      format: (value) => value
    },
    {
      id: "cellphone",
      label: "Teléfono",
      align: "left",
      width: "14.2%",
      disablePadding: false,
      format: (value) => value
    },
    {
      id: "slug_invitation",
      label: "Enlace de invitación",
      align: "left",
      width: "14.2%",
      disablePadding: false,
      format: (value) => `${import.meta.env.VITE_API_URL}/signup/${value}`
    },
    {
      id: "created_at",
      label: "F. Creación",
      align: "left",
      width: "14.2%",
      disablePadding: false,
      format: (value) => new Date(value).toLocaleDateString()
    },
    {
      id: "email_validated",
      label: "Cuenta",
      align: "left",
      width: "14.2%",
      disablePadding: false,
      format: (value, row) =>
        value === 1 ? (
          "Verificado"
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              setModalConfirmAuth(`6-${row.id}`)
            }}>
            Sin verificar - Enviar Email
          </Button>
        )
    },
    {
      id: "ib",
      label: "M. IB",
      width: "14.2%",
      disablePadding: false,
      format: (value, row) =>
        Number(value) > 0 ? (
          <b>ACTIVA</b>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              setModalConfirmAuth(`4-${row.id}`)
            }}>
            Activar
          </Button>
        )
    },
    {
      id: "standar",
      label: "M. Estándar",
      width: "14.2%",
      disablePadding: false,
      format: (value, row) =>
        Number(value) > 0 ? (
          <b>ACTIVA</b>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              setModalConfirmAuth(`1-${row.id}`)
            }}>
            Activar
          </Button>
        )
    },
    {
      id: "premium",
      label: "M. Premium",
      width: "14.2%",
      disablePadding: false,
      format: (value, row) =>
        Number(value) > 0 ? (
          <b>ACTIVA</b>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              setModalConfirmAuth(`2-${row.id}`)
            }}>
            Activar
          </Button>
        )
    },
    {
      id: "id",
      label: "Operaciones",
      width: "14.2%",
      disablePadding: false,
      format: (value, row) => {
        return (
          <Select
            labelId="demo-simple-select-label"
            value={1}
            onChange={(e) => {
              setModalConfirmAuth(`${e.target.value}-${row.id}`)
            }}>
            <MenuItem value={1}>Selecciona una opción</MenuItem>
            <MenuItem value={5}>Otorgar Comisión</MenuItem>
            <MenuItem value={row.gived ? 8 : 3}>
              {row.gived ? "Otorgar Depósito" : "Retirar Depósito"}
            </MenuItem>
            <MenuItem value={9}>Cambiar Contraseña</MenuItem>
            <MenuItem value={10}>
              Mover árbol - Actualmente bajo: {row.ref}
            </MenuItem>
            <MenuItem value={11}>
              Cambiar directo - Actualmente: {row.dir}
            </MenuItem>
          </Select>
        )
      }
    }
  ]

  const resetAlert = () => {
    setAlert((prev) => ({ show: false, message: "", status: prev.status }))
  }

  useEffect(() => {
    if ($User.token) {
      setLoading(true)

      ;(async () => {
        const { status, data } = await $User.get()
        if (status) {
          setUsers(data)
          setUsersOriginal(data)
        }
      })()

      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [$User])

  return (
    <PageWrapper expanded>
      {users && (
        <EnhancedTable
          title="Usuarios"
          headCells={headCells}
          rows={users}
          csv={true}
          onSearch={(val) => {
            let toFilterUsers = usersOriginal
            let newUsers = []
            toFilterUsers.filter((user) => {
              if (
                user.id == val ||
                user.fullName.toLowerCase().indexOf(val) >= 0 ||
                user.email.toLowerCase().indexOf(val) >= 0
              )
                newUsers.push(user)
            })

            setUsers(newUsers)
          }}
        />
      )}
      {modalConfirmAuth && (
        <ModalAuth
          open={modalConfirmAuth}
          handleClose={() => {
            setModalConfirmAuth(false)
          }}
          handleAuth={async (password) => {
            let idProduct = modalConfirmAuth.split("-")[0]
            let idUser = modalConfirmAuth.split("-")[1]

            if (idProduct == 10 || idProduct == 11) {
              setModalConfirmAuth(false)
              setModalChangeTreeOpen(idUser)
              setModalChangeTreeProduct(idProduct)
              setModalGiveCommissionsOpenPass(password)
            } else if (idProduct == 9) {
              setModalConfirmAuth(false)
              setModalChangePassOpen(idUser)
              setModalGiveCommissionsOpenPass(password)
            } else if (idProduct == 8) {
              const { status, data } = await $Subscription.removeDeposit({
                idUser,
                password
              })

              if (status) {
                setModalConfirmAuth(false)
                setAlert({
                  show: true,
                  message: "Depósito retirado con éxito.",
                  status: "success"
                })

                setLoading(true)

                ;(async () => {
                  const { status, data } = await $User.get()
                  if (status) {
                    setUsers(data)
                  }
                })()

                setTimeout(() => {
                  setLoading(false)
                }, 500)
              }
            } else if (idProduct == 3) {
              setModalConfirmAuth(false)
              setModalGiveDepositOpen(idUser)
              setModalGiveCommissionsOpenPass(password)
            } else if (idProduct == 6) {
              const { status, data } = await $User.resendEmail({ idUser })

              if (status) {
                setModalConfirmAuth(false)
                setAlert({
                  show: true,
                  message: "E-mail enviado con éxito.",
                  status: "success"
                })
              }
            } else if (idProduct == 5) {
              setModalConfirmAuth(false)
              setModalGiveCommissionsOpen(idUser)
              setModalGiveCommissionsOpenPass(password)
            } else {
              setModalConfirmAuth(false)
              setLoading(true)
              const { status } = await $Subscription.giveSubscription({
                idProduct,
                idUser,
                password
              })

              setLoading(false)

              if (status) {
                setAlert({
                  show: true,
                  message: "Membresía activada con éxito.",
                  status: "success"
                })
              } else {
                setAlert({
                  show: true,
                  message:
                    "Error al activar la membresía, inténtelo de nuevo más tarde.",
                  status: "error"
                })
              }

              setLoading(true)

              ;(async () => {
                const { status, data } = await $User.get()
                if (status) {
                  setUsers(data)
                }
              })()

              setTimeout(() => {
                setLoading(false)
              }, 500)
            }
          }}
        />
      )}
      <ModalGiveCommissions
        open={modalGiveCommissionsOpen}
        handleClose={() => {
          setModalGiveCommissionsOpen(false)
          setModalGiveCommissionsOpenPass(false)
        }}
        handleOk={async (originCommission, amount) => {
          let idProduct = originCommission
          let idUser = modalGiveCommissionsOpen
          let password = modalGiveCommissionsOpenPass

          setModalGiveCommissionsOpen(false)
          setModalGiveCommissionsOpenPass(false)

          setLoading(true)

          const { status, data } = await $Subscription.giveCommission({
            idProduct,
            idUser,
            amount,
            password
          })
          setLoading(false)

          if (status) {
            setAlert({
              show: true,
              message: "Comisión asignada con éxito.",
              status: "success"
            })
          } else {
            setAlert({
              show: true,
              message:
                "Error al asignar la comisión, inténtelo de nuevo más tarde.",
              status: "error"
            })
          }

          setLoading(true)

          ;(async () => {
            const { status, data } = await $User.get()
            if (status) {
              setUsers(data)
            }
          })()

          setTimeout(() => {
            setLoading(false)
          }, 500)

          console.log(originCommission)
          console.log(amountCommission)
        }}
      />

      <ModalGiveDeposit
        open={modalGiveDepositOpen}
        handleClose={() => {
          setModalGiveDepositOpen(false)
          setModalGiveCommissionsOpenPass(false)
        }}
        handleOk={async (amount) => {
          let idUser = modalGiveDepositOpen
          let password = modalGiveCommissionsOpenPass

          setModalGiveDepositOpen(false)
          setModalGiveCommissionsOpenPass(false)

          setLoading(true)

          const { status, data } = await $Subscription.giveDeposit({
            idProduct: 3,
            idUser,
            amount,
            password
          })
          setLoading(false)

          if (status) {
            setAlert({
              show: true,
              message: "Depósito asignado con éxito.",
              status: "success"
            })
          } else {
            setAlert({
              show: true,
              message:
                "Error al asignar el depósito, inténtelo de nuevo más tarde.",
              status: "error"
            })
          }

          setLoading(true)

          ;(async () => {
            const { status, data } = await $User.get()
            if (status) {
              setUsers(data)
            }
          })()

          setTimeout(() => {
            setLoading(false)
          }, 500)
        }}
      />

      <ModalNewPass
        open={modalChangePassOpen}
        handleClose={() => {
          setModalChangePassOpen(false)
          setModalGiveCommissionsOpenPass(false)
        }}
        handleOk={async (newPassword) => {
          let idUser = modalChangePassOpen
          let password = modalGiveCommissionsOpenPass

          setModalChangePassOpen(false)
          setModalGiveCommissionsOpenPass(false)

          setLoading(true)

          const { status, data } = await $User.changeAdminPass({
            idUser,
            password,
            newPassword
          })
          setLoading(false)

          if (status) {
            setAlert({
              show: true,
              message: "Contraseña asignada con éxito.",
              status: "success"
            })
          } else {
            setAlert({
              show: true,
              message: "Error al asignar contraseña.",
              status: "error"
            })
          }

          setLoading(true)

          ;(async () => {
            const { status, data } = await $User.get()
            if (status) {
              setUsers(data)
            }
          })()

          setTimeout(() => {
            setLoading(false)
          }, 500)
        }}
      />

      <ModalChangeTree
        open={modalChangeTreeOpen}
        handleClose={() => {
          setModalChangeTreeOpen(false)
          setModalChangeTreeProduct(false)
          setModalGiveCommissionsOpenPass(false)
        }}
        handleOk={async (email) => {
          let idUser = modalChangeTreeOpen
          let password = modalGiveCommissionsOpenPass

          setModalChangeTreeOpen(false)
          setModalChangeTreeProduct(false)
          setModalGiveCommissionsOpenPass(false)

          setLoading(true)

          const { status, data } = await $User.changeParent({
            idUser,
            parent: modalChangeTreeProduct == 11 ? true : false,
            password,
            email
          })
          setLoading(false)

          if (status) {
            setAlert({
              show: true,
              message: "Nuevo Árbol padre asignado con éxito.",
              status: "success"
            })
          } else {
            setAlert({
              show: true,
              message: "Error al asignar nuevo Árbol Padre.",
              status: "error"
            })
          }

          setLoading(true)

          ;(async () => {
            const { status, data } = await $User.get()
            if (status) {
              setUsers(data)
            }
          })()

          setTimeout(() => {
            setLoading(false)
          }, 500)
        }}
      />
      <Snackbar
        open={alert.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={resetAlert}>
        <Alert severity={alert.status} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </PageWrapper>
  )
}

export default Users
