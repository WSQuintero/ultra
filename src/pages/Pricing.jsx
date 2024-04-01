import { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import useSession from "../hooks/useSession";
import useConfig from "../hooks/useConfig";
import PricingTable from "../components/PricingTable";
import PageWrapper from "../components/PageWrapper";

function Pricing() {
  const [session] = useSession();
  const [, { setLoading }] = useConfig();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (!session) {
    return <></>;
  }
  
  return (
    <PageWrapper expanded>
      <Grid display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Grid display="flex" flexDirection="column" alignItems="center" gap={4} padding={2}>
          <Typography variant="h2" color="white">
            Empieza ahora
          </Typography>
          <Typography color="white" textAlign='center'>Accede a beneficios únicos: ¡Adquiere tu plan de suscripción!</Typography>
        </Grid>
        <PricingTable
          discount={[(session.userDiscount.some((plan) => plan.product === 1 ) ? true : false), ( (session.userDiscount.some((plan) => plan.product === 2) ? true : false) || (session.membership_basic>0 && session.membership_premium==0) ) ]}
          disabled={[session.membership_basic>0, (session.membership_basic>0&&session.membership_premium>0)]}
        />
      </Grid>
    </PageWrapper>
  );
}

export default Pricing;
