import {
  Dialog,
  Container,
  Typography,
  IconButton,
  Icon,
  Divider,
  Button,
  Grid,
  Alert,
  Snackbar,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import useAuth from "../hooks/useAuth";
import useConfig from "../hooks/useConfig";
import useSession from "../hooks/useSession";
import CloseIcon from '@mui/icons-material/Close';
import AuthService from "../services/auth.service";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState, useCallback, useMemo, useEffect } from 'react';

export default function ModalG2Fa({ open, handleClose, handleAuth }) {
  const [session] = useSession();
  const [, setAuth] = useAuth();
  const [, { setLoading }] = useConfig();
  const [hideAuth, setHideAuth] = useState(false);
  const [auth] = useAuth();
  const $Auth = useMemo(() => new AuthService(auth), [auth]);
  const [validate2FaCode, setValidate2FaCode] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [base32QrCode, setBase32QrCode] = useState('');
  const [alert, setAlert] = useState({ show: false, message: "", status: "success" });
  
  const [authUser, setAuthUser] = useState({
    g2FaCode: ''
  });

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setAuthUser((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validate2FaUser = async () => {
    setLoading(true);
    
    setHideAuth(true);

    const { status, data } = await $Auth.validate2FaCode(authUser.g2FaCode);
    
    setHideAuth(false);
    
    setLoading(false);

    if (!status) {
      setAlert({
        show: true,
        message: data.response.data.message,
        status: "error",
      });

      return;
    }
    
    
    resetAlert();

    if(session.exist_2fa_auth==0){
      setAlert({
        show: true,
        message: 'Segundo factor habilitado con éxito.',
        status: "success",
      });
      
      setTimeout(()=>{
        setHideAuth(true);
        window.location.reload();
      },2000);

    }else{
      handleAuth();
    }
  };

  const resetAlert = () => {
    setAlert({ show: false, message: "", status: "success" });
  };
  
  useEffect(() => {
    let gen2FaCode = async ()=>{
      setLoading(true);
    
      setHideAuth(true);
      
      const { status, data } = await $Auth.generate2FaCode();
      setQrCode(data.QRdata);
      setBase32QrCode(data.base32);

      setLoading(false);
    
      setHideAuth(false);
    };
    
    if(session.exist_2fa_auth==0){
      gen2FaCode();
    }
  }, []); 

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

  if(!open||hideAuth){
    return (<></>);
  }else{

    return (
      <>
        <Dialog
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
                  Google Authenticator
                </Typography>
              </Box>
              {
                validate2FaCode==false && session.exist_2fa_auth==0 ?

                (<Box sx={{ width: '100%', m: 'auto' }}>
                  <Divider sx={{ mb: 2 }}>
                    Activar
                  </Divider>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <img src={qrCode} width={350} />
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={10}>
                        <TextField
                          value={base32QrCode}
                          readOnly
                          fullWidth
                          helperText={helperCopy.show && helperCopy.message}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          onClick={() => handleCopyIcon(base32QrCode)}
                          sx={{ height: '100%' }}
                          variant='contained'
                          color='primary'
                        >
                          <ContentCopyIcon />
                        </Button>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Button fullWidth variant="contained" color={"warning"} onClick={() => setValidate2FaCode(true)}>
                        Verificar
                      </Button>
                    </Grid>
                  </Grid>
                </Box>)
                :
                (<Box sx={{ width: '100%', m: 'auto' }}>
                  <Divider sx={{ mb: 2 }}>
                    Digita el Código de tu App
                  </Divider>
                  <Grid container spacing={2}>
                    <Snackbar
                      open={alert.show}
                      autoHideDuration={3000}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      onClose={resetAlert}
                    >
                      <Alert severity={alert.status} sx={{ width: "100%" }}>
                        {alert.message}
                      </Alert>
                    </Snackbar>

                    <Grid item xs={12} md={12}>
                      <TextField
                        value={authUser.password}
                        onChange={handleInputChange}
                        name="g2FaCode"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Button fullWidth variant="contained" color={"warning"} onClick={() => {validate2FaUser()}}>
                        Validar código
                      </Button>
                    </Grid>
                  </Grid>
                </Box>)
              }
            </Container>
          </Box>
        </Dialog>
      </>
    );
  }
}
