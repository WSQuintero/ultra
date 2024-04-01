import { useMemo, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  Grid,
  Divider,
  ListItemIcon,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  MenuOutlined as MenuIcon,
  PieChartRounded as DashboardIcon,
  GroupOutlined as GroupIcon,
  DescriptionOutlined as ReportsIcon,
  MarkUnreadChatAltOutlined as MessagesUnreadIcon,
  SettingsOutlined as SettingsIcon,
  NotificationsNoneOutlined as NotificationsUnreadIcon,
  LogoutRounded as LogoutIcon,
  ContentCopyRounded as CopyIcon,
  LanRounded as NetworkIcon,
  Star as StarIcon,
  Diversity3 as Diversity3Icon,
  PublishedWithChanges as PublishedWithChangesIcon
} from "@mui/icons-material";

import useAuth from "../hooks/useAuth";
import ModalPayment from "./ModalPayment";
import useSession from "../hooks/useSession";
import useConfig from "../hooks/useConfig";
import SubscriptionService from "../services/subscription.service";

function Navbar() {
  const theme = useTheme();
  const [, , logout] = useAuth();
  const [auth] = useAuth();
  const [session] = useSession();
  const navigate = useNavigate();
  const [config, { setLoading }] = useConfig(false);
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const $Subscription = useMemo(() => new SubscriptionService(auth), [auth]);

  const [currentPlan, setCurrentPlan] = useState(false);
  const [modalcurrentPlan, setModalcurrentPlan] = useState(false);
  const [walletAddressPlan, setWalletAddressPlan] = useState(false);

  const [alert, setAlert] = useState({ show: false, message: "" });

  const pages = useMemo(
    () => [
      { icon: <DashboardIcon fontSize="small" />, name: "Dashboard", route: "/", show: true },
      { icon: <ReportsIcon fontSize="small" />, name: "Depósitos", route: "/deposits", show: true },
      { icon: <GroupIcon fontSize="small" />, name: "Usuarios", route: "/users", show: session?.rol === 1 },
      { icon: <ReportsIcon fontSize="small" />, name: "Ganancias", route: "/reports", show: true },
      { icon: <PublishedWithChangesIcon fontSize="small" />, name: "Retiros", route: "/withdrawals", show: true },
      { icon: <NetworkIcon fontSize="small" />, name: "Red", route: "/network", show: true },
    ],
    [session]
  );

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCopySlug = () => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_APP_URL}/signup/${session.slug_invitation}`);
    setAlert({ show: true, message: "Se agregó el slug a tu portapapeles" });
  };

  const handleLogout = (event) => {
    setAnchorElUser(null);
    logout();
  };

  if (!session) {
    return <></>;
  }

  const buyPlanIBWithUSDT = async ()=>{
    setLoading(true);

    let { status, data } = await $Subscription.generateWallet({
      body: {
        idProduct: 4,
      },
      network: 'TRON'
    });

    setWalletAddressPlan(data[0].product_wallet_address);

    setCurrentPlan({
      isMostPopular: false,
      name: "Membresía IB",
      price: 15,
      features: [],
    });
    
    setLoading(false);
    setModalcurrentPlan(true);
  };

  return (
    <AppBar position="absolute" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }} disableGutters>
          <Typography
            variant="h1"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              display: "flex",
              mr: 2,
              fontWeight: 700,
              fontSize: 32,
              textDecoration: "none",
              color: "white",
              [theme.breakpoints.down("lg")]: {
                display: "none",
              },
            }}
          >
            FinanCity
          </Typography>

          <Box sx={{ display: { xs: "flex", lg: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              onClick={() => setSidebarStatus(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              [theme.breakpoints.down("lg")]: {
                display: "none",
              },
            }}
          >
            {pages.map(
              ({ icon, name, route, show }) =>
                show && (
                  <Button
                    component={NavLink}
                    to={route}
                    key={name}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "flex",
                      gap: 0.5,
                      px: 1.5,
                      py: 1,
                      "&.active": {
                        backgroundColor: "secondary.main",
                      },
                    }}
                  >
                    {icon}
                    {name}
                  </Button>
                )
            )}
          </Box>

          <Grid display="flex" alignItems="center" gap={2}>
            <Box>
              <Tooltip title="Open settings">
                <Button onClick={handleOpenUserMenu} sx={{ p: 1, color: "white" }}>
                  <Grid display="flex" alignItems="center" gap={1}>
                    <Avatar 
                      src={`${import.meta.env.VITE_IMAGES_URL}/${session.avatar}`}
                      alt={session.firstname}
                      variant="rounded" />
                    <Grid display="flex" flexDirection="column" alignItems="flex-start">
                      <Typography fontSize={16}>{session.firstname}</Typography>
                      <Typography variant="small">Member</Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Tooltip>

              <Menu
                anchorEl={anchorElUser}
                id="menu-appbar"
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                elevation={2}
                sx={{ width: 36 * 8 }}
              >
                <MenuItem sx={{ display: "flex", gap: 2 }} onClick={() => navigate("/profile")}>
                  <Avatar 
                    src={`${import.meta.env.VITE_IMAGES_URL}/${session.avatar}`} 
                    alt={session.firstname} 
                  />
                  <Typography
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: " nowrap",
                    }}
                  >
                    {session.firstname} {session.lastname}
                  </Typography>
                </MenuItem>
                <Divider />
                {((session.membership_basic>0 && session.membership_premium==0) || (session.membership_basic==0 && session.membership_premium==0)) && (
                  <MenuItem onClick={() => navigate("/pricing")}>
                    <ListItemIcon>
                      <StarIcon fontSize="small" sx={{ color: "gold" }} />
                    </ListItemIcon>
                    Mejorar membresía
                  </MenuItem>
                )}
                {!session.userSubscription.some((plan) => plan.product === 4 && plan.status_pay === 1) && (
                  <MenuItem onClick={() => buyPlanIBWithUSDT()}>
                    <ListItemIcon>
                      <Diversity3Icon fontSize="small" sx={{ color: "#ED6C02" }} />
                    </ListItemIcon>
                    Activar IB
                  </MenuItem>
                )}
                {session.userSubscription.some((plan) => plan.product === 4 && plan.status_pay === 1) && (
                  <MenuItem onClick={() => {}}>
                    <ListItemIcon>
                      <Diversity3Icon fontSize="small" sx={{ color: "#ED6C02" }} />
                    </ListItemIcon>
                    IB ACTIVO
                  </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Toolbar>
        <Grid display="flex" justifyContent="center">
          <TextField
            style={{ backgroundColor: "#ffffff22", backdropFilter: "blur(8px)" }}
            sx={{
              width: 8 * 48,
              "& input:disabled": {
                "-webkit-text-fill-color": "white",
                color: "white !important",
              },
              "& fieldset": {
                border: "1px solid white !important",
              },
            }}
            size="small"
            color="secondary"
            value={`${import.meta.env.VITE_APP_URL}/signup/${session.slug_invitation}`}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleCopySlug} sx={{ color: "white" }}>
                    <CopyIcon color="white" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Container>
      <SwipeableDrawer
        anchor="left"
        open={sidebarStatus}
        onClose={() => setSidebarStatus(false)}
        onOpen={() => setSidebarStatus(true)}
      >
        <Box
          sx={(t) => ({ width: t.sizes.sidebar * 8 })}
          role="presentation"
          onClick={() => setSidebarStatus(false)}
          onKeyDown={() => setSidebarStatus(false)}
        >
          <List>
            <ListItemButton component={NavLink} to={"/"} sx={{ marginBottom: 1 }}>
              <ListItemText
                primary="FinanCity"
                primaryTypographyProps={{
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: 0,
                  textDecoration: "none",
                  textAlign: "center",
                  color: "primary",
                }}
              />
            </ListItemButton>
            <Divider />
            {pages.map(
              ({ icon, name, route, show }) =>
                show && (
                  <ListItem key={name} disablePadding>
                    <ListItemButton
                      component={NavLink}
                      to={route}
                      sx={(t) => ({
                        "&.active": {
                          color: t.palette.primary.main,
                        },
                      })}
                    >
                      <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
                      <ListItemText primary={name} />
                    </ListItemButton>
                  </ListItem>
                )
            )}
          </List>
        </Box>
      </SwipeableDrawer>
      <Snackbar
        open={alert.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setAlert({ show: false, message: "" })}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>

      <ModalPayment 
        open={modalcurrentPlan} 
        items={currentPlan}
        walletAddress={walletAddressPlan}
        handleClose={()=>{
          setModalcurrentPlan(false);
        }}
      />
    </AppBar>
  );
}

export default Navbar;
