import PageWrapper from "../components/PageWrapper"
import * as React from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import { MyContext } from "../generalContext/GeneralContext"
import PriceCards from "../components/PriceCards"

function Withdrawals() {
  const [value, setValue] = React.useState("1")
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const { actualUser } = React.useContext(MyContext)

  return (
    <PageWrapper sx={{ padding: 2 }} expanded>
      {actualUser.rol === 1 || actualUser.membership_status !== "Expired" ? (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example">
                <Tab label="Item One" value="1" />
                <Tab label="Item Two" value="2" />
                <Tab label="Item Three" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      ) : (
        <>
          <PriceCards />
        </>
      )}
    </PageWrapper>
  )
}

export default Withdrawals
