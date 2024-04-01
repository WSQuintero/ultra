import {
  Dialog,
  Container,
  Typography,
  IconButton,
  Button,
  Icon
} from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

export default function ModalErrorGeneral({ open, error, handleClose }) {
  
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
                  {'Hemos encontrado un error'}
                </Typography>
                <Typography variant='body1' color={"gray"}>
                  {error}
                </Typography>
                <br />
                <Box>
                  <Button variant="contained" color={"warning"} onClick={() => handleClose()}>
                    Revisar
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
