import { AppBar, Toolbar, Typography, Button } from "@mui/material"

function HeaderLanding() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mi Aplicación
        </Typography>
        <Button color="inherit">Inicio</Button>
        <Button color="inherit">Acerca de</Button>
        <Button color="inherit">Contacto</Button>
      </Toolbar>
    </AppBar>
  )
}
export default HeaderLanding
