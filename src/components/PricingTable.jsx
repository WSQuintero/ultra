import { useState, useCallback, useMemo } from "react";
import { FrontApi } from "@front-finance/api";
import { Box, Button, Grid, Typography, alpha } from "@mui/material";
import { useTheme } from "@emotion/react";
import { CheckRounded as CheckIcon, ClearRounded as ClearIcon } from "@mui/icons-material";
import background from "../assets/img/pricing/background_1.svg";
import { FrontComponent } from "./Front";
import SubscriptionService from "../services/subscription.service";
import useAuth from "../hooks/useAuth";
import { PRICING_PLANS } from "../utils/constants";
import ModalPayment from "./ModalPayment";
import useConfig from "../hooks/useConfig";

let iframeLinkTransfer = false;
let walletUserBuySubs = false;

const NEXT_PUBLIC_CLIENT_ID = "d03863ce-186e-4f5b-460a-08db7875523d";
const NEXT_PUBLIC_CLIENT_SECRET = "sk_prod_yxz3be0q.gee4eb7h3dqmryg21bawhsvya9r8g2wxq3l23ohu0tfyloqy7jqqmr8su057iyx3";
const NEXT_PUBLIC_FRONT_API_URL = "https://integration-api.getfront.com";

function PricingTable({ disabled = [], discount = [] }) {
  const theme = useTheme();
  const [auth] = useAuth();
  const [config, { setLoading }] = useConfig(false);
  const [iframeLink, setIframeLink] = useState(null);
  const [error, setError] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(false);
  const [currentPlanTprice, setCurrentPlanTprice] = useState(0);
  const [modalcurrentPlan, setModalcurrentPlan] = useState(false);
  const [walletAddressPlan, setWalletAddressPlan] = useState(false);
  const [payload, setPayload] = useState(null);
  const $Subscription = useMemo(() => new SubscriptionService(auth), [auth]);

  const getAuthLink = useCallback(async () => {
    setLoading(true);
    let { status, data } = await $Subscription.generateWallet({
      body: {
        idProduct: 1,
      },
      network: 'TRON'
    });

    walletUserBuySubs = data[0].product_wallet_address;

    setError(null);
    setIframeLink(null);
    const api = new FrontApi({
      baseURL: NEXT_PUBLIC_FRONT_API_URL,
      headers: {
        "x-client-id": NEXT_PUBLIC_CLIENT_ID,
        "x-client-secret": NEXT_PUBLIC_CLIENT_SECRET,
      },
    });

    const response = await api.managedAccountAuthentication.v1CataloglinkList({
      userId: "financity-user-123",
      callbackUrl: window.location.href,
    });

    data = response.data;
    setLoading(false);

    if (response.status !== 200 || !data?.content) {
      const error = (data && data.message) || response.statusText;
      console.error("Error!", error);
      setError(error);
    } else if (!data.content.iFrameUrl) {
      setError("Iframe url is empty");
    } else {
      setIframeLink(data.content.iFrameUrl);
    }
  }, []);

  const buyPlanWithUSDT = async (plan, Tprice)=>{
    setLoading(true);
    let { status, data } = await $Subscription.generateWallet({
      body: {
        idProduct: plan.productId,
        Tprice: Tprice
      },
      network: 'TRON'
    });

    setWalletAddressPlan(data[0].product_wallet_address);

    setCurrentPlan(plan);
    setLoading(false);
    setModalcurrentPlan(true);
    setCurrentPlanTprice(Tprice);
  };

  return (
    <Grid display="flex" gap={2} flexWrap='wrap-reverse' justifyContent='center'>
      {PRICING_PLANS.map((plan, index) => {
        let Tprice = (plan.price/( (discount[0]&&index==0) || (discount[1]&&index==1) ? 2 : 1 ));
        if( (!disabled[1]&&disabled[0]&&index==0) || (disabled[0]&&index==1) || (disabled[1]&&index==1) || (!disabled[0]&&!disabled[1]) ){
          return (<Box
            key={index}
            position="relative"
            display="flex"
            flexDirection="column"
            gap={4}
            padding={4}
            width={8 * 40}
            overflow="hidden"
            borderRadius={4}
            border={plan.isMostPopular ? 0 : 1}
            borderColor="text.disabled"
            sx={{
              backgroundColor: "white",
              ...(plan.isMostPopular
                ? {
                    zIndex: 1,
                    "&::before": {
                      content: "''",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: -1,
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${background})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      opacity: 0.75,
                    },
                    "&::after": {
                      content: "''",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: -1,
                      width: "100%",
                      height: "100%",
                      backgroundImage: `radial-gradient(circle at center, ${theme.palette.primary.main}11 0%, ${theme.palette.primary.main}ff)`,
                      mixBlendMode: "multiply",
                    },
                  }
                : {}),
            }}
          >
            <Box display="flex" flexDirection="column" gap={2}>
              <Grid>
                <Typography variant="overline" color={plan.isMostPopular ? "white" : "primary.main"} lineHeight={1}>
                  Membership
                </Typography>
                <Typography variant="h2" color={plan.isMostPopular ? "white" : "primary.main"} lineHeight={0.75}>
                  {plan.name}
                </Typography>
              </Grid>
              <Typography
                fontSize={52}
                fontWeight={800}
                color={plan.isMostPopular ? "white" : "primary.main"}
                textAlign="center"
              >
                ${Tprice}
                <Typography variant="overline"> USDT</Typography>
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
              {plan.features.map((feature, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1} fontWeight={500}>
                  {feature.isAvailable ? (
                    <CheckIcon
                      sx={{ color: "white", backgroundColor: "success.light", borderRadius: 10 }}
                      fontSize="small"
                    />
                  ) : (
                    <ClearIcon
                      sx={{ color: "white", backgroundColor: "error.light", borderRadius: 10 }}
                      fontSize="small"
                    />
                  )}
                  <Typography color={plan.isMostPopular ? "white" : "inherit"}>{feature.name}</Typography>
                </Box>
              ))}
            </Box>
            <Box>
              <Button
                variant="contained"
                color={plan.isMostPopular ? "warning" : "primary"}
                fullWidth
                onClick={()=>buyPlanWithUSDT(plan, Tprice)}
              >
                Comprar con USDT (TRC20)
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                color={plan.isMostPopular ? "warning" : "primary"}
                fullWidth
                onClick={getAuthLink}
              >
                Comprar con mi propia billetera USDT (TRC20)
              </Button>
            </Box>
            <Box
              position="absolute"
              top={0}
              left={0}
              display={disabled[index] ? "flex" : "none"}
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
              sx={{
                backgroundColor: alpha("#000", 0.5),
                cursor: "not-allowed",
              }}
            >
              <Typography fontSize={40} fontWeight={600} color="white" sx={{ rotate: "-45deg" }}>
                Comprado
              </Typography>
            </Box>
          </Box>);
        }
      })}
      <FrontComponent
        iframeLink={iframeLink}
        onValidateBalance={() => {}}
        onPaymentCompleted={() => {
          handleClose();
        }}
        onSuccess={async (authData, USDCBalance, authToken, brokerType, typeProduct) => {
          if (iframeLinkTransfer == false) {
            USDCBalance = USDCBalance.amount;

            if (walletUserBuySubs) {
              let packagePrice = Number(1);

              const data = JSON.stringify({
                toAddresses: [
                  {
                    "networkId": "c5dc5d2e-68c1-4261-9a30-90b598738bf5",
                    "symbol": "USDT",
                    address: walletUserBuySubs,
                  }
                ],
                amountInFiat: Tprice
              });

              if (packagePrice > USDCBalance) {
                alert("Balance insuficiente para realizar la compra.");

                setPayload(authData);
                setIframeLink(null);
              } else {
                let userId = "financity-user-123";

                const url = `${NEXT_PUBLIC_FRONT_API_URL}/api/v1/cataloglink?userId=${userId}&enableTransfers=true`;

                const headers = {
                  "Content-Type": "application/json",
                  "x-client-id": NEXT_PUBLIC_CLIENT_ID,
                  "x-client-secret": NEXT_PUBLIC_CLIENT_SECRET,
                };

                fetch(url, {
                  method: "POST",
                  headers: headers,
                  body: data,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    iframeLinkTransfer = true;

                    setIframeLink(data.content.iFrameUrl);
                    // Aquí puedes trabajar con los datos de la respuesta
                  })
                  .catch((error) => {
                    console.error(error);
                    // Aquí puedes manejar cualquier error ocurrido durante la solicitud
                  });
              }
            }
          }
        }}
        onExit={(err) => {
          setIframeLink(null);
          setError(err || null);
        }}
      />

      <ModalPayment 
        open={modalcurrentPlan} 
        items={currentPlan}
        price={currentPlanTprice}
        walletAddress={walletAddressPlan}
        handleClose={()=>{
          setModalcurrentPlan(false);
        }}
      />
    </Grid>
  );
}

export default PricingTable;
