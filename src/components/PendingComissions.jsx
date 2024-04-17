import { useContext, useEffect, useMemo, useState } from "react"
import { MaterialReactTable } from "material-react-table"
import { MRT_Localization_ES } from "material-react-table/locales/es"
import { Box } from "@mui/material"
import { MyContext } from "../generalContext/GeneralContext"

const PendingComissions = () => {
  const { $Earnings, token } = useContext(MyContext)
  const [comisions, setComisions] = useState()
  const columns = useMemo(
    () => [
      {
        accessorKey: "ultraPending  ",
        id: "ultraPending  ",
        header: "Comisiones pendientes de pago"
      },
      {
        accessorKey: "ultraPayedDetail",
        id: "ultraPayedDetail",
        header: "Detalle comisiones pendientes de pago"
      },
      {
        accessorKey: "totalCommissions",
        id: "totalCommissions",
        header: "Comisiones totales"
      }
    ],
    []
  )

  useEffect(() => {
    const getEarnings = async () => {
      const { status, data } = await $Earnings.getEarnings(token)
      if (status) {
        // console.log(data)
        setComisions(data)
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
        data={comisions || []}
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

export default PendingComissions
