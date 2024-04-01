import PropTypes from "prop-types";
import { useState } from "react";
import { FormControlLabel, IconButton, Switch, Toolbar, Tooltip, Typography, TextField, Button, Grid } from "@mui/material";
import { FilterList as FilterListIcon } from "@mui/icons-material";

function EnhancedTableToolbar({ title, filters, onSearch, onCSV }) {
  const [searchText, setSearchText] = useState("");

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography sx={{ flex: "50%" }} variant="h6" id="tableTitle" component="div">
        {title}
      </Typography>
      
      {onSearch&&<Tooltip sx={{ flex: "10%" }} title="Compacto">
        <Grid item xs={11} md={11}>
          <TextField
            value={searchText}
            onChange={(e)=>{
              setSearchText(e.target.value);
              onSearch(e.target.value);
            }}
            type={'text'}
            placeholder="Buscar..."
            fullWidth
          />
        </Grid>
      </Tooltip>}

      {onCSV&&<Tooltip title="Compacto">
        <Button variant="contained" onClick={() =>{ onCSV(); }}>Exportar CSV</Button>
      </Tooltip>}

      {/*<Tooltip title="Compacto">
        <FormControlLabel control={<Switch checked={filters.dense.value} onChange={filters.dense.onChange} />} />
      </Tooltip>

       <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip> */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  title: PropTypes.string,
};

export default EnhancedTableToolbar;
