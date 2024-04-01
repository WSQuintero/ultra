import { useEffect, useState, useMemo } from "react";
import useAuth from "../hooks/useAuth";
import UserService from "../services/user.service";
import { alpha, Box, Container, Divider, Grid, Typography, Button } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import PageWrapper from "../components/PageWrapper";
import PricingTable from "../components/PricingTable";
import useSession from "../hooks/useSession";
import useConfig from "../hooks/useConfig";
import SubscriptionService from "../services/subscription.service";
import ModalPayment from "../components/ModalPayment";
import {
  TrendingUp as TrendingUpIcon,
  TrendingFlat as TrendingFlatIcon,
  TrendingDown as TrendingDownIcon,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import background from "../assets/img/pageWrapper/background.svg";

const data = [];

function SummaryCard({ title, value, trend, backgroundColor, alphaB }) {
  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      paddingY={1}
      paddingX={2}
      height={trend === "" ? "50%" : "100%"}
      borderRadius={4}
      overflow="hidden"
      sx={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        "&::before": {
          content: "''",
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: alpha(backgroundColor, alphaB || 0.5),
        },
      }}
    >
      <Box zIndex={1}>
        <Grid display="flex" gap={1} color="white">
          <Typography color="white">{title}</Typography> 
          {trend === "" ? (
            <></>
          ) : (<Typography color="white" style={{textAlign: 'right', width: '90%', position: 'absolute'}}>Total</Typography>)
          }
        </Grid>
        {trend === "" ? (
          <></>
        ) : (
          <Grid display="flex" alignItems="center" gap={2} justifyContent="space-between">
            <Typography color="white" fontSize={28}>
              {value} USDT
            </Typography>
            <Grid display="flex" gap={1} color="white">
              <Typography color="white">{trend} USDT</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}

function DateCard({ data }) {
  return (
    <Grid
      display="flex"
      alignItems="center"
      gap={2}
      sx={(t) => ({
        [t.breakpoints.down("md")]: {
          flexDirection: "column-reverse",
        },
      })}
    >
      {data.map((el, index) => (
        <Grid key={index} display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Grid display="flex" gap={0.5}>
            <Box paddingY={1} paddingX={2} borderRadius={2} sx={{ backgroundColor: "#3A3689" }}>
              <Typography fontSize={22} color="white">
                {el.value[0]}
              </Typography>
            </Box>
            <Box paddingY={1} paddingX={2} borderRadius={2} sx={{ backgroundColor: "#3A3689" }}>
              <Typography fontSize={22} color="white">
                {el.value[1]}
              </Typography>
            </Box>
            {el.value.length == 4 && (
              <Box paddingY={1} paddingX={2} borderRadius={2} sx={{ backgroundColor: "#3A3689" }}>
                <Typography fontSize={22} color="white">
                  {el.value[2]}
                </Typography>
              </Box>
            )}
            {el.value.length == 4 && (
              <Box paddingY={1} paddingX={2} borderRadius={2} sx={{ backgroundColor: "#3A3689" }}>
                <Typography fontSize={22} color="white">
                  {el.value[3]}
                </Typography>
              </Box>
            )}
          </Grid>
          <Typography fontSize={22} color="white">
            {el.label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}

function Dashboard() {
  const [session] = useSession();
  const [memberIB, setMemberIB] = useState(false);
  const [auth] = useAuth();
  const $Subscription = useMemo(() => new SubscriptionService(auth), [auth]);

  const [currentPlan, setCurrentPlan] = useState(false);
  const [modalcurrentPlan, setModalcurrentPlan] = useState(false);
  const [walletAddressPlan, setWalletAddressPlan] = useState(false);

  const [, { setLoading }] = useConfig();
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (session?.userSubscription.some((plan) => plan.product === 4 && plan.status_pay === 1)) {
      setMemberIB(
        session?.userSubscription
          .filter((plan) => plan.product === 4 && plan.status_pay === 1)[0]
          .expired_at.split("T")[0]
          .split("-")
      );
    }
  }, [session]);

  if (!session) {
    return <></>;
  }

  const buyPlanIBWithUSDT = async () => {
    setLoading(true);

    let { status, data } = await $Subscription.generateWallet({
      body: {
        idProduct: 4,
      },
      network: "TRON",
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
    <PageWrapper expanded>
      {session.userSubscription.every((plan) => plan.status_pay === 0) ? (
        <Grid display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Grid display="flex" flexDirection="column" alignItems="center" gap={4} padding={2}>
            <Typography variant="h2" color="white">
              Empieza ahora
            </Typography>
            <Typography color="white" textAlign="center">
              Accede a beneficios únicos: ¡Adquiere tu plan de suscripción!
            </Typography>
          </Grid>
          <PricingTable />
        </Grid>
      ) : (
        <Container maxWidth="xxxl" disableGutters>
          <Grid display="flex" flexDirection="column" alignItems="center" gap={1}>
            <Grid display="flex" flexWrap="wrap" gap={2} width="100%" padding={4}>
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                width={0}
                flexGrow={1}
                padding={2}
                borderRadius={6}
                sx={(t) => ({
                  backgroundColor: "white",
                  [t.breakpoints.down("xl")]: {
                    width: "100%",
                  },
                })}
              >
                <SummaryCard
                  title={session.activeBinary ? "Binario Activo" : "Binario Inactivo"}
                  value={""}
                  trend={""}
                  alphaB={session.activeBinary ? "0.8" : "0.5"}
                  backgroundColor="#ff780a"
                />
                <SummaryCard
                  title="ROI Disponible"
                  value={parseFloat(session?.balance_roi_available||0).toFixed(2).toLocaleString()}
                  trend={(Number(session?.balance_roi_payed||0)+Number(session?.balance_roi_available||0)).toFixed(2).toLocaleString()}
                  backgroundColor="#01529D"
                />

                <SummaryCard
                  title="Binario Disponible"
                  value={parseFloat(session?.balance_binary_available||0).toFixed(2).toLocaleString()}
                  trend={(Number(session?.balance_binary_payed||0)+Number(session?.balance_binary_available||0)).toFixed(2).toLocaleString()}
                  backgroundColor="#7006A7"
                />
                <SummaryCard
                  title="Directos Disponible"
                  value={parseFloat(session?.balance_direct_available||0).toFixed(2).toLocaleString()}
                  trend={(Number(session?.balance_direct_payed||0)+Number(session?.balance_direct_available||0)).toFixed(2).toLocaleString()}
                  backgroundColor="#10052B"
                />
              </Box>
              <Box
                width={0}
                flexGrow={1}
                paddingY={2}
                paddingX={3}
                borderRadius={6}
                sx={(t) => ({
                  backgroundColor: "white",
                  [t.breakpoints.down("xl")]: {
                    width: "100%",
                  },
                })}
              >
                <Typography variant="h2" fontSize={22} fontWeight={600}>
                  Ganancias
                </Typography>
                <ResponsiveContainer maxHeight={300}>
                  <BarChart data={session.monthsChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend align="left" verticalAlign="top" iconType="circle" spacing={4} height={48} />
                    <Bar dataKey="roi" fill={'#01529D'} radius={8} />
                    <Bar dataKey="binario" fill={'#7006A7'} radius={8} />
                    <Bar dataKey="directo" fill={'#10052B'} radius={8} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
              <Box
                position="relative"
                flexGrow={1}
                width={0}
                overflow="hidden"
                borderRadius={6}
                sx={(t) => ({
                  backgroundImage: `url(${background})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  "&::before": {
                    content: "''",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: alpha("#6D6CEB", 0.5),
                  },
                  [t.breakpoints.down("xl")]: {
                    width: "100%",
                  },
                })}
              >
                <Box position="relative" display="flex" flexDirection="column" zIndex={1} height="100%">
                  <Typography color="white" padding={2}>
                    {memberIB ? "Próximo pago membresía IB" : "Comienza tu red con Membresía IB "}
                  </Typography>
                  <Divider sx={{ borderColor: alpha("#ffffff", 0.25) }} />
                  <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center" padding={4}>
                    {memberIB ? (
                      <DateCard
                        data={[
                          { label: "Año", value: memberIB[0] },
                          { label: "Mes", value: memberIB[1] },
                          { label: "Día", value: memberIB[2] },
                        ]}
                      />
                    ) : (
                      <Button variant="contained" color={"warning"} onClick={() => buyPlanIBWithUSDT()}>
                        Activa la Membresía IB por un Mes - 15 USDT
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <ModalPayment
            open={modalcurrentPlan}
            items={currentPlan}
            walletAddress={walletAddressPlan}
            handleClose={() => {
              setModalcurrentPlan(false);
            }}
          />
        </Container>
      )}
    </PageWrapper>
  );
}

export default Dashboard;
