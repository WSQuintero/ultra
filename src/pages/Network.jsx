import { Grid } from "@mui/material"
import PageWrapper from "../components/PageWrapper"
import TreeReferrals from "../components/TreeReferrals"

function Network() {
  return (
    <PageWrapper expanded>
      <Grid
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        sx={(t) => ({
          height: `calc(100vh - ${t.sizes.header * 8}px - 16px)`
        })}>
        <TreeReferrals />
      </Grid>
    </PageWrapper>
  )
}

export default Network
