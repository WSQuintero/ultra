import React, { useContext, useEffect } from "react"
import {
  Box,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Button
} from "@mui/material"
import { AccountCircle } from "@mui/icons-material"
import { MyContext } from "../generalContext/GeneralContext"
import { RiCellphoneLine } from "react-icons/ri"
import { MdOutlineMail, MdOutlineCardMembership } from "react-icons/md"
import { GoCrossReference } from "react-icons/go"
import { FaClipboardUser } from "react-icons/fa6"
import UserInfo from "./UserInfo"

const PerfilCard = () => {
  const { actualUser } = useContext(MyContext)

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "auto",
        borderRadius: 5,
        background: "#010714",
        height: "80vh",
        flexShrink: 0
      }}>
      {/* Sección Inicial */}
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            height: 130,
            width: "100%",
            backgroundImage: "url(/perfil-color.png)",
            backgroundSize: "cover",
            alignItems: "center",
            justifyContent: "center"
          }}></Box>
        <Divider />
        <Box
          sx={{
            height: 130,
            width: "100%",
            backgroundColor: "#010720",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}>
          <Avatar
            alt="Profile Picture"
            src="/profile.jpg"
            sx={{
              width: 100,
              height: 100,
              border: "2px solid white",
              position: "absolute",
              top: -55
            }}
          />
          <Typography variant="body1" color="white">
            {`${actualUser.firstname} ${actualUser.lastname}`}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          padding: 2,
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start"
        }}>
        <UserInfo
          label="Teléfono"
          value={actualUser.cellphone}
          icon={<RiCellphoneLine />}
        />
        <UserInfo
          label="Email"
          value={actualUser.email}
          icon={<MdOutlineMail />}
        />
        <UserInfo
          label="Slug de invitación"
          value={actualUser.slug_invitation}
          icon={<GoCrossReference />}
        />
        <UserInfo
          label="Role"
          value={actualUser.rol === 1 ? "Administrador" : "Usuario"}
          icon={<FaClipboardUser />}
        />
        <UserInfo
          label="Estado suscripción"
          value={actualUser.membership_status}
          icon={<MdOutlineCardMembership />}
        />
      </Box>
    </Box>
  )
}

export default PerfilCard
