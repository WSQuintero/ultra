import { Box, Container, Typography } from "@mui/material"
import PageWrapper from "../components/PageWrapper"
import PerfilCard from "../components/PerfilCard"
import GeneralButton from "../components/GeneralButton"
import ComissionHistoryTable from "../components/ComissionHistoryTable.jsx"

function Profile() {
  return (
    <PageWrapper>
      <Box sx={{ padding: 5, display: "flex", gap: 5, width: "100%" }}>
        <PerfilCard />
        <Box sx={{ height: "calc(100vh - 155px)", overflow: "auto" }}>
          <Box
            sx={{
              backgroundColor: "#131006",
              width: "70%",
              height: "150px",
              borderRadius: 3,
              border: "1px solid #6e5c25",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexShrink: 0
            }}>
            <Box sx={{ padding: 4 }}>
              <Box
                display={"flex"}
                sx={{
                  marginTop: 2,
                  gap: 5,
                  justifyConten: "center",
                  alignItems: "center"
                }}>
                <Box display={"flex"} sx={{ gap: 2 }}>
                  <Box>
                    <img src="/fi_1680012.png" alt="fi_1680012" />
                  </Box>
                  <Box>
                    <Typography>
                      {" "}
                      Your membership has expired, renew it as soon as possible{" "}
                    </Typography>
                  </Box>
                </Box>
                <GeneralButton>Renew Membership</GeneralButton>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexShrink: 0,
              gap: 1,
              width: "70%",
              paddingY: 5
            }}>
            <Container
              sx={{
                backgroundColor: "#010714",
                width: "400px",
                height: "250px",
                borderRadius: 3
              }}>
              <img
                src="/f1.png"
                alt="frame"
                style={{ marginTop: "25px", width: "50px" }}
              />
              <Typography sx={{ fontSize: 25, marginTop: 5, color: "white" }}>
                Ganancias Plan
              </Typography>
              <Typography
                sx={{ fontSize: 30, color: "white", fontWeight: "bold" }}>
                $90.00
              </Typography>
            </Container>
            <Container
              sx={{
                backgroundColor: "#010714",
                width: "400px",
                height: "250px",
                borderRadius: 3
              }}>
              <img
                src="/f2.png"
                alt="frametwo"
                style={{ marginTop: "25px", width: "50px" }}
              />
              <Typography sx={{ fontSize: 25, marginTop: 5, color: "white" }}>
                Ganancias Club{" "}
              </Typography>
              <Typography
                sx={{ fontSize: 30, color: "white", fontWeight: "bold" }}>
                De Fondeo{" "}
              </Typography>
            </Container>
            <Container
              sx={{
                backgroundColor: "#010714",
                width: "400px",
                height: "250px",
                borderRadius: 3
              }}>
              <img
                src="/f3.png"
                alt="frametwo"
                style={{ marginTop: "25px", width: "50px" }}
              />
              <Typography sx={{ fontSize: 25, marginTop: 5, color: "white" }}>
                Ganancias{" "}
              </Typography>
              <Typography
                sx={{ fontSize: 30, color: "white", fontWeight: "bold" }}>
                Xcalper{" "}
              </Typography>
            </Container>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexShrink: 0,
              gap: 1,
              width: "70%"
            }}>
            <Container
              sx={{
                backgroundColor: "#010714",
                width: "100%",
                height: "280px",
                borderRadius: 3,
                padding: 3
              }}>
              <Typography sx={{ color: "white" }}>Sales Performance</Typography>

              <Container
                sx={{
                  backgroundColor: "#0f172a",
                  width: "100%",
                  height: "85%",
                  borderRadius: 3,
                  padding: 3,
                  marginTop: 1
                }}>
                <Box
                  sx={{
                    display: "flex",
                    borderBottom: "1px solid white",
                    padding: 1
                  }}>
                  <img
                    src="/fi_7446910.png"
                    alt="fi_7446910"
                    style={{ width: "60px" }}
                  />
                  <Box>
                    <Typography color="white">
                      Let’s Achieve Your Sales Goal
                    </Typography>
                    <Typography>
                      It is a long established fact that a reader will be
                      distracted
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 1
                  }}>
                  <Box sx={{ width: "50%" }}>
                    <Typography>Ambassadors</Typography>
                    <img src="/f.png" alt="f" />
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <Typography>Masters</Typography>
                    <img src="/f.png" alt="f" />
                  </Box>
                </Box>
              </Container>
            </Container>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexShrink: 0,
              gap: 1,
              width: "70%",
              marginTop: 5
            }}>
            <Container
              sx={{
                backgroundColor: "#010714",
                width: "100%",
                height: "auto",
                borderRadius: 3,
                padding: 3
              }}>
              <Typography sx={{ color: "white" }}>
                Commission History
              </Typography>

              <Container
                sx={{
                  backgroundColor: "#0f172a",
                  width: "100%",
                  height: "90%",
                  borderRadius: 3,
                  padding: 3,
                  marginTop: 1
                }}>
                <ComissionHistoryTable />
              </Container>
            </Container>
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default Profile
