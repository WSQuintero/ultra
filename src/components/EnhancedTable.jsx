import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { getComparator, stableSort } from "../utils/table";
import {
  Box,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  useMediaQuery
} from "@mui/material";

import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";

function EnhancedTable({ title, headCells, rows, footer = <></>, onSearch }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(headCells[0]?.id || "");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rows, rowsPerPage]
  );

  const exportToCSV= (data, fileName)=>{
    let dataToExport = [{
      id: 'ID',
      ref: 'Referido por',
      fullName: 'Nombre',
      email: 'Correo',
      cellphone: 'Telefono',
      slug_invitation: 'Slug',
      created_at: 'Fecha Creacion'
    }];
    
    data.map(dat=>{
      dataToExport.push({
        id: dat.id,
        ref: dat.ref,
        fullName: dat.fullName,
        email: dat.email,
        cellphone: dat.cellphone,
        slug_invitation: dat.slug_invitation,
        created_at: dat.created_at
      });
    });

    const csvContent = "data:text/csv;charset=utf-8," + dataToExport.map(row => Object.values(row).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName + ".csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={0} sx={{ width: "100%", borderRadius: 4 }}>
        <EnhancedTableToolbar title={title} filters={{ dense: { value: dense, onChange: handleChangeDense } }} onSearch={onSearch} onCSV={()=>{
          exportToCSV(rows,title);
        }} />

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.name}>
                    {headCells.map((headCell) => (
                      <TableCell key={headCell.id} align={headCell.align} style={{ width: headCell.width }}>
                        {headCell.format(row[headCell.id], row)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={headCells.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container direction={isMobile ? "column" : "row"} display={isMobile ? "block" : "flex"} alignItems={'center'} gap={1} paddingLeft={2}>
          {footer}
          <Box flexGrow={1}/>
          <TablePagination
            labelRowsPerPage={isMobile ? "Filas" : "Filas por pagina"}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Paper>
    </Box>
  );
}

EnhancedTable.propTypes = {
  title: PropTypes.string,
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};

export default EnhancedTable;
