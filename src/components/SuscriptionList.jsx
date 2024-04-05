import { useMemo } from "react"
import { MaterialReactTable } from "material-react-table"
import { MRT_Localization_ES } from "material-react-table/locales/es"

const SuscriptionList = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "sl",
        id: "sl",
        header: "SL"
      },
      {
        accessorKey: "company",
        id: "company",
        header: "Company Name Type"
      },
      {
        accessorKey: "date_time",
        id: "date_time",
        header: "Date Time"
      },
      {
        accessorKey: "timeline_complete",
        id: "timeline_complete",
        header: "Timeline Complete"
      },
      {
        accessorKey: "subscription_fee",
        id: "subscription_fee",
        header: "Subscription Fee"
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
    // Agrega más objetos según sea necesario
  ]

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={list}
        enableColumnFilterModes
        enableColumnOrdering
        enableRowActions
        muiTablePaperProps={{ elevation: 0 }}
        initialState={{ density: "compact" }}
        muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
        // state={{ showSkeletons: loading }}
        localization={MRT_Localization_ES}
        enablePagination={true}
        sx={{ heigth: "100%" }}
      />
    </>
  )
}

export default SuscriptionList
