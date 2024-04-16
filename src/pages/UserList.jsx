import { useContext, useEffect, useState } from "react"
import PageWrapper from "../components/PageWrapper"
import { MyContext } from "../generalContext/GeneralContext"
import SuscriptionList from "../components/SuscriptionList"
import { Box } from "@mui/material"

function UserList() {
  const { $Users, token } = useContext(MyContext)
  const [users, setUsers] = useState()

  useEffect(() => {
    const getUsers = async () => {
      const { status, data } = await $Users.get({ token })

      if (status) {
        console.log(data)
        setUsers(data)
      } else {
        console.log(data)
      }
    }

    getUsers()
  }, [])

  return (
    <PageWrapper>
      <Box sx={{ height: "60vh" }}>
        {users?.length && <SuscriptionList users={users} />}
      </Box>
    </PageWrapper>
  )
}

export default UserList
