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

export default function ModalGiveDeposit({ open, handleClose, handleOk }) {
  const [amountDeposit, setAmountDeposit] = useState(0);

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
                  {'Otorgar Depósito'}
                </Typography>
                <br /><br />
                <Typography variant='body1' color={"gray"}>
                  Valor Depósito USDT
                </Typography>
                <Grid item xs={12} md={12}>
                  <TextField
                    value={amountDeposit}
                    onChange={(a)=>{ 
                      setAmountDeposit(a.target.value);
                    }}
                    fullWidth
                  />
                </Grid>
                <br /><br />
                <Box>
                  <Button variant="contained" color={"warning"} onClick={() =>{ 
                    if(amountDeposit){
                      handleOk(amountDeposit)
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
