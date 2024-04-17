import { useContext, useEffect, useMemo, useState } from "react"
import { MaterialReactTable } from "material-react-table"
import { MRT_Localization_ES } from "material-react-table/locales/es"
import { Box } from "@mui/material"
import { MyContext } from "../generalContext/GeneralContext"

const PayedComissions = () => {
  const { $Earnings, token } = useContext(MyContext)
  const [earnings, setEarnings] = useState()
  const columns = useMemo(
    () => [
      {
        accessorKey: "ultraPayed ",
        id: "ultraPayed ",
        header: "Comisiones pagadas"
      },
      {
        accessorKey: "ultraPayedDetail",
        id: "ultraPayedDetail",
        header: "Detalle comisiones pagadas"
      },
      {
        accessorKey: "totalCommissions",
        id: "totalCommissions",
        header: "Comisiones totales"
      }
    ],
    []
  )
  const list = [
    {
      sl: 1,
      company: "Example Company A - Type 1",
      date_time: "2024-04-01T12:00:00",
      timeline_complete: "Yes",
      subscription_fee: 500
    },
    {
      sl: 2,
      company: "Example Company B - Type 2",
      date_time: "2024-03-15T09:30:00",
      timeline_complete: "No",
      subscription_fee: 750
    },
    {
      sl: 3,
      company: "Example Company C - Type 3",
      date_time: "2024-03-28T15:45:00",
      timeline_complete: "Yes",
      subscription_fee: 900
    }
  ]

  useEffect(() => {
    const getEarnings = async () => {
      const { status, data } = await $Earnings.getEarnings(token)
      if (status) {
        console.log(data)
        setEarnings(data)
      } else {
        console.log(data)
      }
    }

    getEarnings()
  }, [])
  return (
    <div style={{ height: "100%" }}>
      <MaterialReactTable
        columns={columns}
        data={earnings}
        enableColumnFilterModes
        enableColumnOrdering
        enableRowActions
        muiTablePaperProps={{ elevation: 0 }}
        initialState={{ density: "compact" }}
        muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
        localization={MRT_Localization_ES}
        enablePagination={true}
        style={{ heigth: "100%" }}
      />
    </div>
  )
}

export default PayedComissions
