import { useContext, useEffect, useState } from "react"
import CreateUltraLive from "../components/CreateUltraLive"
import PageWrapper from "../components/PageWrapper"
import { MyContext } from "../generalContext/GeneralContext"
import CardLive from "../components/CardLive"
import { Box, Container } from "@mui/material"
import { GoldButton } from "../components/landing/GoldButton"
import PriceCards from "../components/PriceCards"

function Deposits() {
  const [id, setId] = useState(false)
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [actualLive, setActualLive] = useState(false)
  const { $Live, token, actualUser } = useContext(MyContext)
  const [lives, setLives] = useState()
  const onClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const getLives = async () => {
      const { status, data } = await $Live.getLives({ token })

      if (status) {
        setLives(data.data)
      } else {
        console.log(data)
      }
    }
    getLives()
  }, [])

  return (
    <PageWrapper sx={{ padding: 2 }} expanded>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          padding: 2,
          justifyContent: "end"
        }}>
        {actualUser?.rol === 1 && (
          <GoldButton
            onClick={() => {
              setOpen(true)
            }}>
            Crear live
          </GoldButton>
        )}
      </Box>

      {actualUser?.membership_status === "Active" || actualUser?.rol === 1 ? (
        <Box
          sx={{
            width: "100%",
            minHeight: "80%",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexWrap: "wrap",
            padding: 3
          }}>
          {lives?.map((live) => (
            <CardLive
              key={live.id}
              setEditMode={setEditMode}
              setOpen={setOpen}
              img={live.img}
              description={live.description}
              title={live.title}
            />
          ))}
        </Box>
      ) : (
        <>
          <PriceCards />
        </>
      )}

      <CreateUltraLive
        id={id}
        open={open}
        onClose={onClose}
        editMode={editMode}
        video={actualLive}
      />
    </PageWrapper>
  )
}

export default Deposits
