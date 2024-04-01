import {
  Dialog,
  Container,
  Typography,
  IconButton,
  Icon,
  Divider,
  Button,
  Grid,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import QRCode from 'react-qr-code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState, useCallback } from 'react';

export default function ModalDepositFinancity({ open, handleClose }) {
  
  const [helperCopy, setHelperCopy] = useState({
    show: false,
    message: '',
  });

  const handleCopyIcon = text => {
    const { clipboard } = navigator;

    if (!clipboard || !clipboard.writeText) {
      return setHelperCopy({ show: true, message: 'Cannot access to your clipboard' });
    }

    try {
      clipboard.writeText(text).then(() => {
        setHelperCopy({ show: true, message: 'Copy successful' });
        setTimeout(() => {
          setHelperCopy({ show: false, message: '' });
        }, 1000);
      });
    } catch (error) {
      setHelperCopy({ show: true, message: error.message });
    }
  };
  
  if(!open){
    return (<></>);
  }else{
    return (
      <>
        <Dialog
          maxWidth='md'
          fullWidth
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
                Wallet FinanCity
              </Typography>
                <br />
              <Box>
                <Typography variant='h5' fontWeight={600} color='textPrimary'>
                  {`Nuevo Depósito USDT`}
                </Typography>
                <Typography variant='body1' color={"gray"}>
                  {'Scanea el Código QR'}
                </Typography>
                <Grid container spacing={2} alignItems='center'>
                  <Grid item xs={12} md={12}>
                    <Box align='center' sx={{ my: 2, mx: 2 }}>
                      {<QRCode style={{ width: '40%', height: '40%' }} value={import.meta.env.VITE_FINANCITY_ADDRESS} />}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ width: '100%', m: 'auto' }}>
                <Divider sx={{ mb: 2 }}>
                  {'Wallet Manual TRC20'}
                </Divider>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={10}>
                    <TextField
                      value={import.meta.env.VITE_FINANCITY_ADDRESS}
                      readOnly
                      fullWidth
                      helperText={helperCopy.show && helperCopy.message}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      onClick={() => handleCopyIcon(import.meta.env.VITE_FINANCITY_ADDRESS)}
                      sx={{ height: '100%' }}
                      variant='contained'
                      color='primary'
                    >
                      {/* <Icon> */}
                      <ContentCopyIcon />
                      {/* </Icon> */}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        </Dialog>
      </>
    );
  }
}
