import PageWrapper from "../components/PageWrapper"
import * as React from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import { MyContext } from "../generalContext/GeneralContext"
import PriceCards from "../components/PriceCards"
import PayedComissions from "../components/PayedComissions"
import PendingComissions from "../components/PendingComissions"

function Earnings() {
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
                <Tab
                  label="Pagadas"
                  value="1"
                  sx={{
                    color: "white",

                    "&.Mui-selected": {
                      color: "white",
                      background:
                        "linear-gradient(140.75deg, #8F5F25 11.94%, #DBBB6F 61.03%, #8F5F25 113.42%)"
                    }
                  }}
                />
                <Tab
                  label="Pendientes"
                  value="2"
                  sx={{
                    color: "white",

                    "&.Mui-selected": {
                      color: "white",
                      background:
                        "linear-gradient(140.75deg, #8F5F25 11.94%, #DBBB6F 61.03%, #8F5F25 113.42%)"
                    }
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <PayedComissions />
            </TabPanel>
            <TabPanel value="2">
              <PendingComissions />
            </TabPanel>
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

export default Earnings
