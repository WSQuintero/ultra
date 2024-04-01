import {
  Dialog,
  Container,
  Typography,
  IconButton,
  Button,
  Icon,
  MenuItem,
  Select,
  Grid,
  TextField,
  FormControl
} from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

export default function ModalGiveCommissions({ open, handleClose, handleOk }) {
  const [originCommission, setOriginCommission] = useState(0);
  const [amountCommission, setAmountCommission] = useState(0);

  if(!open){
    return (<></>);
  }else{
    return (
      <>
        <Dialog
          maxWidth='md'
          style={{ borderRadius: '3rem' }}
          open={open}
          onClose={handleClose}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={handleClose}>
                <Icon>
                  <CloseIcon />
                </Icon>
              </IconButton>
            </Box>
            <Container maxWidth='lg' sx={{ pb: 4 }} align='center'>
              <Typography variant='h4' fontWeight={600} color='black'>
                FinanCity
              </Typography>
              <br />
              <Box>
                <Typography variant='h5' fontWeight={600} color='textPrimary'>
                  {'Otorgar comisión'}
                </Typography>
                <br /><br />
                <Typography variant='body1' color={"gray"}>
                  Origen Comisión
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 380 }} variant="standard">
                  <Select
                    value={originCommission}
                    label=""
                    onChange={(a)=>{ 
                      setOriginCommission(a.target.value);
                    }}>
                    <MenuItem value={5}>Binario</MenuItem>
                    <MenuItem value={3}>Depósito de Directo</MenuItem>
                    <MenuItem value={2}>Membresía Premium de Directo</MenuItem>
                  </Select>
                </FormControl>
                <br /><br />
                <Typography variant='body1' color={"gray"}>
                  Valor Comisión USDT
                </Typography>
                <Grid item xs={12} md={12}>
                  <TextField
                    value={amountCommission}
                    onChange={(a)=>{ 
                      setAmountCommission(a.target.value);
                    }}
                    fullWidth
                  />
                </Grid>
                <br /><br />
                <Box>
                  <Button variant="contained" color={"warning"} onClick={() =>{ 
                    if(amountCommission&&originCommission){
                      handleOk(originCommission, amountCommission)
                    }
                  }}>
                    OTORGAR
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>
        </Dialog>
      </>
    );
  }
}
