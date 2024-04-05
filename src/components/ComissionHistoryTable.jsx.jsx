import { useMemo } from "react"
import { MaterialReactTable } from "material-react-table"
import { MRT_Localization_ES } from "material-react-table/locales/es"

const ComissionHistoryTable = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "date",
        id: "date",
        header: "Date"
      },
      {
        accessorKey: "type",
        id: "type",
        header: "Type"
      },
      {
        accessorKey: "sales_amount",
        id: "sales_amount",
        header: "Sales Amount"
      },
      {
        accessorKey: "total_commissions",
        id: "total_commissions",
        header: "Total Commissions"
      }
    ],
    []
  )

  const list = [
    {
      date: "2024-04-01T12:00:00",
      type: "Example Company A - Type 1",
      sales_amount: 500,
      total_commissions: 150
    },
    {
      date: "2024-03-15T09:30:00",
      type: "Example Company B - Type 2",
      sales_amount: 750,
      total_commissions: 200
    },
    {
      date: "2024-03-28T15:45:00",
      type: "Example Company C - Type 3",
      sales_amount: 900,
      total_commissions: 250
    }
    // Agrega más objetos según sea necesario
  ]

  return (
    <div style={{ height: "100%" }}>
      <MaterialReactTable
        columns={columns}
        data={list}
        initialState={{ density: "compact" }}
        localization={MRT_Localization_ES}
        enablePagination={false}
        style={{ height: "100%" }}
      />
    </div>
  )
}

export default ComissionHistoryTable
