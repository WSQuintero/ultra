import { useCallback, useEffect, useMemo, useState, useRef } from "react"
import {
  Alert,
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  alpha
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import useAuth from "../hooks/useAuth"
import useSession from "../hooks/useSession"
import useConfig from "../hooks/useConfig"
import ModalAuth from "../components/ModalAuth"
import ModalG2Fa from "../components/ModalG2Fa"
import UserService from "../services/user.service"
import PageWrapper from "../components/PageWrapper"
import FormRow from "../components/FormRow"
import background from "../assets/img/pageWrapper/background.svg"
import PerfilCard from "../components/PerfilCard"

function Profile() {
  const [auth] = useAuth()
  const [session, setSession] = useSession()

  const [modalConfirm2Fa, setModalConfirm2Fa] = useState(false)

  const [modalConfirmAuth, setModalConfirmAuth] = useState(false)
  const [{ loading }, { setLoading }] = useConfig({})
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    slug_invitation: "",
    cellphone: "",
    wallet_address_pay_commission: ""
  })
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    status: "success"
  })
  const $User = useMemo(() => new UserService(auth), [auth])

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleFormSubmit = useCallback(
    async (event) => {
      event.preventDefault()

      if (
        !user.firstname ||
        !user.lastname ||
        !user.email ||
        !user.slug_invitation ||
        !user.cellphone
      ) {
        setAlert({
          show: true,
          message: "Todos los campos son requeridos.",
          status: "error"
        })
        return
      }

      const { status } = await $User.update({
        firstName: user.firstname,
        lastName: user.lastname,
        phone: user.cellphone
      })

      if (status) {
        setAlert({
          show: true,
          message: "Perfil actualizado con éxito.",
          status: "success"
        })

        setSession({ ...session, ...user })
      } else {
        setAlert({
          show: true,
          message: "Error al actualizar perfil, inténtelo de nuevo más tarde.",
          status: "error"
        })
      }
    },
    [user, $User]
  )

  const handleFormSubmitWallet = useCallback(
    async (event) => {
      event.preventDefault()

      if (!user.wallet_address_pay_commission) {
        setAlert({
          show: true,
          message: "Por favor ingrese la dirección de billetera.",
          status: "error"
        })
        return
      }

      const expresionOneRegularTRC20 = /^T[1-9A-HJ-NP-Za-km-z]{33}$/
      const expresionTwoRegularTRC20 = /^T[a-zA-Z0-9]{41}$/
      if (
        !expresionOneRegularTRC20.test(user.wallet_address_pay_commission) &&
        !expresionTwoRegularTRC20.test(user.wallet_address_pay_commission)
      ) {
        setAlert({
          show: true,
          message: "Por favor ingrese una billetera TRC-20 válida.",
          status: "error"
        })
        return
      }

      if (session.exist_2fa_auth == 1) {
        setModalConfirm2Fa(true)
      } else {
        setModalConfirmAuth(true)
      }
    },
    [user, $User]
  )

  const resetAlert = () => {
    setAlert((prev) => ({ show: false, message: "", status: prev.status }))
  }

  useEffect(() => {
    setLoading(true)

    if (session) {
      setUser({
        avatar: session.avatar || "",
        firstname: session.firstname || "",
        lastname: session.lastname || "",
        email: session.email || "",
        slug_invitation:
          `${import.meta.env.VITE_APP_URL}/signup/${session.slug_invitation}` ||
          "",
        cellphone: session.cellphone || "",
        contract_balance_own: Number(session.contract_balance_own) || 0,
        wallet_address_pay_commission:
          session.wallet_address_pay_commission || "",
        contract_balance_leveraged:
          Number(session.contract_balance_leveraged) || 0
      })
    }

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [session])

  if (!session) {
    return <></>
  }

  const fileInputRef = useRef(null)

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const { status, data } = await $User.changeAvatar({ avatar: file })

      let newUser = user
      newUser.avatar = data[0].avatar
      setLoading(true)

      setUser(newUser)

      setSession({ ...session, ...newUser })

      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  return (
    <PageWrapper expanded>
      <PerfilCard />
    </PageWrapper>
  )
}

export default Profile
