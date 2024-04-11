import { useState } from "react"
import CreateUltraLive from "../components/CreateUltraLive"
import PageWrapper from "../components/PageWrapper"

function Deposits() {
  const [id, setId] = useState(false)
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [actualLive, setActualLive] = useState(false)

  const onClose = () => {
    setOpen(false)
  }
  return (
    <PageWrapper sx={{ padding: 2 }} expanded>
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
