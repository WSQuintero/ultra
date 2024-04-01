import ReCAPTCHA from "react-google-recaptcha";
import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams, Link as RouterLink } from "react-router-dom";

import {
  Box,
  Grid,
  Link,
  Alert,
  Button,
  Snackbar,
  TextField,
  InputLabel,
  IconButton,
  Typography,
  InputAdornment
} from "@mui/material";

import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  Https as HttpsIcon,
  VisibilityOutlined as VisibilityIcon,
  VisibilityOffOutlined as VisibilityOffIcon,
} from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import SliderItem from "../components/SliderItem";
import useAuth from "../hooks/useAuth";

import logoGoogle from "../assets/img/social/logo_google.svg";
import logoFacebook from "../assets/img/social/logo_facebook.svg";
import logoInstagram from "../assets/img/social/logo_instagram.svg";

import backgroundSlider1 from "../assets/img/backgrounds/background_1.svg";
import backgroundSlider2 from "../assets/img/backgrounds/background_2.svg";
import backgroundSlider3 from "../assets/img/backgrounds/background_3.svg";
import imageSlider1 from "../assets/img/slider/auth/group_1.svg";
import imageSlider2 from "../assets/img/slider/auth/group_2.svg";
import imageSlider3 from "../assets/img/slider/auth/group_3.svg";
import AuthService from "../services/auth.service";

const sliderOptions = [
  {
    title: "TRANSFORMA TUS IDEAS EN REALIDAD.",
    description: "Calidad y experiencia uniformes en todas las plataformas y dispositivos.",
    background: backgroundSlider3,
    image: imageSlider1,
  },
  {
    title: "TRANSFORMA TUS IDEAS EN REALIDAD.",
    description: "Calidad y experiencia uniformes en todas las plataformas y dispositivos.",
    background: backgroundSlider2,
    image: imageSlider2,
  },
  {
    title: "TRANSFORMA TUS IDEAS EN REALIDAD.",
    description: "Calidad y experiencia uniformes en todas las plataformas y dispositivos.",
    background: backgroundSlider1,
    image: imageSlider3,
  },
];

const ContainerItem = styled(Grid)(({ theme, overflow }) => ({
  width: "50%",
  backgroundColor: "white",
  ...(overflow ? { maxHeight: "100vh", overflowY: "auto" } : {}),
  [theme.breakpoints.down("md")]: {
    width: "100%",
    ...(overflow ? { maxHeight: "initial", overflowY: "auto" } : {}),
  },
}));

export default function Signin() {
  const theme = useTheme();
  const [, setAuth] = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [alert, setAlert] = useState({ show: false, message: "", status: "success" });
  const [user, setUser] = useState({ email: "", password: "" });
  const $Auth = useMemo(() => new AuthService(), []);
  
  const reCaptchaRef = useRef();

  const handleChangeUser = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (token) => {
    let newUser = user;
    newUser.Rtoken = token;

    const { status, data } = await $Auth.signin(newUser);
    
    if (data.message) {
      setAlert({
        show: true,
        message: data.message,
        status: "error",
      });

      return;
    }

    $Auth.token = data.token;

    if ($Auth.token) {
      setAuth($Auth.token);

      const { status, data } = await $Auth.validate();

      if (status) {
        console.log(data);
      }
    } else {
      setAlert({
        show: true,
        message: "Ha ocurrido un error, inténtelo de nuevo.",
        status: "error",
      });
      return;
    }
  };

  const handlePreSubmit = async (event) => {
    event.preventDefault();
    
    reCaptchaRef.current.execute();
  };

  const resetAlert = () => {
    setAlert({ show: false, message: "", status: "success" });
  };

  useEffect(() => {
    
    let validateEmail = async ()=>{
      let tokenEmail = searchParams.get('token');

      if(tokenEmail){
        const { status, data } = await $Auth.validateAccount(tokenEmail);
        if(status){
          setAlert({
            show: true,
            message: "Email validado con éxito.",
            status: "success",
          });
        }else{
          setAlert({
            show: true,
            message: "Ha ocurrido un error al validar el E-mail, contáctate con el administrador.",
            status: "error",
          });
        }
      }
    };

    validateEmail();
  },[]);



  return (
    <Grid container minHeight="100vh">
      <ContainerItem>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Swiper
            pagination={true}
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            style={{ maxHeight: "100vh" }}
          >
            {sliderOptions.map((item, index) => (
              <SwiperSlide key={index} style={{ display: "flex" }}>
                <SliderItem
                  title={item.title}
                  description={item.description}
                  background={item.background}
                  image={item.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </ContainerItem>
      <ContainerItem display="flex" flexDirection="column" padding={4} overflow>
        <Grid
          flexGrow={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={3}
          maxWidth={550}
          marginX="auto"
        >
          <Grid marginBottom={3}>
            <Typography variant="h1" fontSize={56} fontWeight={700} color={theme.palette.primary.main}>
              FinanCity
            </Typography>
          </Grid>
          <Grid display="flex" flexDirection="column" gap={2}>
            <Typography variant="h2" textAlign="center">
              ¡Bienvenido!
            </Typography>
            <Typography textAlign="center">
              Inicie sesión en su cuenta completando el formulario de inicio de sesión con su información personal.
            </Typography>
          </Grid>
          <Box component="form" width="100%" onSubmit={handlePreSubmit} noValidate>
            <Grid display="flex" flexDirection="column" gap={2}>
              <Grid display="flex" flexDirection="column" gap={1}>
                <InputLabel>
                  Correo <span style={{ color: theme.palette.custom.required }}>*</span>
                </InputLabel>
                <TextField
                  name="email"
                  placeholder="Ingresa tu correo"
                  required
                  fullWidth
                  onChange={handleChangeUser}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <HttpsIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid display="flex" flexDirection="column" gap={1}>
                <InputLabel>
                  Contraseña <span style={{ color: theme.palette.custom.required }}>*</span>
                </InputLabel>
                <TextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  required
                  fullWidth
                  onChange={handleChangeUser}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid container alignItems="center">
                {/* <Grid item md={12} lg={6}>
                  <FormControlLabel
                    sx={{ gap: 1 }}
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        color="primary"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            borderRadius: 20,
                          },
                        }}
                      />
                    }
                    label="Recordar contraseña"
                  />
                </Grid> */}
                {<Grid item md={12} lg={6} textAlign="end">
                  <Link to="/forgot-password" component={RouterLink}>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>}
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }} fullWidth>
              Iniciar sesión
            </Button>

            <ReCAPTCHA 
              style={{ display: "inline-block" }}
              theme="dark"
              size="invisible"
              onChange = {token => {
                handleSubmit(token);
              }}
              ref={reCaptchaRef}
              sitekey={import.meta.env.VITE_RECAPCHA} 
            />
          </Box>
          <Grid>
            <Typography>
              ¿No tienes cuenta?{" "}
              <Link to="/signup" component={RouterLink}>
                Registrarme
              </Link>
            </Typography>
          </Grid>
          {/* <Grid display="flex" alignItems="center" justifyContent="center" gap={2}>
            <Divider sx={{ width: "100%" }} />
            <Typography>o</Typography>
            <Divider sx={{ width: "100%" }} />
          </Grid>
          <Grid>
            <Box display="flex" gap={1}>
              <Button>
                <img src={logoGoogle} alt="facebook login" width="32" />
              </Button>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Button>
                <img src={logoFacebook} alt="facebook login" width="32" />
              </Button>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Button>
                <img src={logoInstagram} alt="facebook login" width="32" />
              </Button>
            </Box>
          </Grid> */}
        </Grid>
      </ContainerItem>
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
    </Grid>
  );
}
