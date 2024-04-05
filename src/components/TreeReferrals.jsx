import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Tree from "react-d3-tree"
import { useTheme } from "@emotion/react"
import {
  alpha,
  Box,
  TextField,
  Typography,
  Grid,
  Select,
  MenuItem,
  Button,
  IconButton,
  Snackbar,
  Alert,
  useMediaQuery,
  Avatar,
  SvgIcon
} from "@mui/material"
import {
  ArrowBack as LeftIcon,
  ArrowForward as RightIcon,
  Person as PersonIcon
} from "@mui/icons-material"
import useAuth from "../hooks/useAuth"
import useSession from "../hooks/useSession"
import useConfig from "../hooks/useConfig"
import ReferralService from "../services/referrals.service"
import BackgroundImage from "../assets/img/common/city_background.png"
import CityIcon from "../assets/icons/city.jsx"

function TreeReferrals() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true })
  const [auth] = useAuth()
  const [session] = useSession()
  const [, { setLoading }] = useConfig()
  const [tree, setTree] = useState()
  const [emailSearch, setEmailSearch] = useState("")
  const [amountRightline, setAmountRightline] = useState(0)
  const [amountLeftline, setAmountLeftline] = useState(0)
  const [treeData, setTreeData] = useState(false)
  const [pendingReferrals, setPendingReferrals] = useState([])
  const [selectedPendingReferral, setSelectedPendingReferral] =
    useState("select")
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    status: "success"
  })
  const $Referral = useMemo(() => new ReferralService(auth), [auth])
  const treeContainer = useRef(null)
  const translate = {
    x: treeContainer.current?.clientWidth / 2 || 0,
    y: ((isMobile ? 2 : 1) * treeContainer.current?.clientHeight) / 3 || 0
  }
  const nodeSize = { x: 320, y: 80 }
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -nodeSize.x / 2,
    y: -nodeSize.y / 2.5
  }

  // console.log(treeContainer.current);

  const buildTree = useCallback((referral, path, emailSearchP) => {
    if (referral === null) return { name: "empty" }

    const left = referral.binary.left
      ? buildTree(referral.binary.left, [...path, "left"])
      : { name: "empty" }
    const right = referral.binary.right
      ? buildTree(referral.binary.right, [...path, "right"])
      : { name: "empty" }

    return {
      name: referral.name,
      attributes: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png",
        name: `${referral.id} - ${referral.name}`,
        id: referral.id,
        email: referral.email,
        isDirect: referral.isDirect,
        itsPayed: !!referral.payment,
        collapsed: emailSearchP ? false : true,
        path
      },
      children: [left, right]
    }
  }, [])

  const updateTree = async ({ name, children, attributes }) => {
    if (name !== "empty") {
      const newTree = { ...tree }
      const parentNode = attributes.path.reduce(
        (a, c) => a.children[c === "left" ? 0 : 1],
        newTree
      )

      if (!attributes.collapsed) {
        parentNode.attributes.collapsed = true
        parentNode.children = [{ name: "empty" }, { name: "empty" }]
        setTree(newTree)
      } else {
        setLoading(true)

        const { data, status } = await $Referral.get({
          depth: 1,
          idUser: attributes.id,
          path: attributes.path ? attributes.path[0] : null
        })

        if (status) {
          const { children } = buildTree(data.tree, attributes.path)
          parentNode.attributes.collapsed = false
          parentNode.children = children
          setTree(newTree)
        }

        setLoading(false)
      }
    }
  }

  const handleAssignReferral = async (side) => {
    if (selectedPendingReferral === "select") {
      setAlert({
        show: true,
        message: "Selecciona un referido primero.",
        status: "error"
      })
      return
    }

    setLoading(true)

    const { status, data } = await $Referral.assing({
      idUser: selectedPendingReferral,
      side
    })

    if (status) {
      await fetchReferrals()
      await fetchPendingReferrals()

      setSelectedPendingReferral("select")

      setAlert({
        show: true,
        message: "Se agregó tu referido al árbol.",
        status: "success"
      })
    } else {
      setAlert({
        show: true,
        message: "Ocurrió un error, inténtalo de nuevo más tarde.",
        status: "error"
      })
    }

    setLoading(false)
  }

  const fetchReferrals = async (emailSearchP) => {
    const { status, data } = await $Referral.get({ depth: 1, emailSearch })

    if (status) {
      const { tree, treeLimit, treeSize, amountLeft, amountRight } = data

      setTreeData(data)
      setAmountLeftline(amountLeft)
      setAmountRightline(amountRight)

      let treeA = buildTree(tree, [], emailSearchP)

      if (treeA.name) {
        setTree(treeA)
      }
    }
  }

  const fetchPendingReferrals = async () => {
    const { status, data } = await $Referral.get({ pending: true })

    if (status) {
      setPendingReferrals(data.data)
    }
  }

  const resetAlert = () => {
    setAlert((prev) => ({ show: false, message: "", status: prev.status }))
  }

  useEffect(() => {
    if ($Referral.token) {
      ;(async () => {
        setLoading(true)
        await fetchReferrals()
        await fetchPendingReferrals()

        setLoading(false)
      })()
    }
  }, [$Referral.token])

  if (!session) {
    return <></>
  }

  return (
    <Grid
      position="relative"
      display="flex"
      flexDirection="column"
      gap={2}
      height="100%"
      width="100%"
      padding={2}
      borderRadius={4}
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        "&::before": {
          content: "''",
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "radial-gradient(#ffffff44 2px, transparent 0)",
          backgroundSize: "40px 40px",
          backgroundPosition: "center",
          pointerEvents: "none"
        },
        "& .rd3t-link": {
          strokeWidth: 2,
          stroke: "#ffffff99"
        }
      }}>
      <Grid
        position="absolute"
        top={16}
        left={16}
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        gap={2}>
        <Grid
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          gap={2}
          paddingX={2}
          paddingY={1}
          borderRadius={2}
          sx={(t) => ({
            backgroundColor: "white",
            [t.breakpoints.down("md")]: {
              justifyContent: "center",
              width: "100%"
            }
          })}>
          <Grid display="flex" alignItems="center" gap={1}>
            <Box
              width={16}
              height={16}
              borderRadius={50}
              sx={(t) => ({ backgroundColor: t.palette.primary.main })}
            />
            <Typography>Directos</Typography>
          </Grid>
          <Grid display="flex" alignItems="center" gap={1}>
            <Box
              width={16}
              height={16}
              borderRadius={50}
              sx={(t) => ({ backgroundColor: t.palette.secondary.main })}
            />
            <Typography>Indirectos</Typography>
          </Grid>
        </Grid>
        <Grid
          display="flex"
          flexDirection="column"
          gap={1}
          paddingX={2}
          paddingY={1}
          borderRadius={2}
          sx={(t) => ({
            backgroundColor: "white",
            [t.breakpoints.down("md")]: {
              alignItems: "center"
            }
          })}>
          <Typography color={session.activeBinary ? "#ff780a" : "textPrimary"}>
            <b>
              {session.activeBinary ? "BINARIO ACTIVO" : "BINARIO INACTIVO"}
            </b>
          </Typography>
          <Typography>
            Línea A (Izquierda):{" "}
            <b>Cuentas {treeData ? treeData.usersLeft : 0}</b> <br />
            <b>
              Disponible {amountLeftline ? amountLeftline.toLocaleString() : 0}{" "}
              USDT
            </b>{" "}
            <b>
              Total{" "}
              {treeData ? treeData.amountLeftOriginal.toLocaleString() : 0} USDT
            </b>{" "}
            <br />
          </Typography>
          <Typography>
            Línea B (Derecha):{" "}
            <b>Cuentas {treeData ? treeData.usersRight : 0}</b> <br />
            <b>
              Disponible{" "}
              {amountRightline ? amountRightline.toLocaleString() : 0} USDT
            </b>{" "}
            <b>
              Total{" "}
              {treeData ? treeData.amountRightOriginal.toLocaleString() : 0}{" "}
              USDT
            </b>{" "}
            <br />
          </Typography>
          <hr />
          <br />
          <Typography>Busca en tu árbol</Typography>
          <TextField
            value={emailSearch}
            onChange={(e) => {
              setEmailSearch(e.target.value)
            }}
            placeholder={"Digita el e-mail"}
            fullWidth
          />
          <Button
            onClick={() => {
              setTree()
              setLoading(true)
              fetchReferrals(true)
              setLoading(false)
            }}
            sx={{ height: "100%" }}
            variant="contained"
            color={"warning"}>
            {"Buscar"}
          </Button>
        </Grid>
      </Grid>
      <Box ref={treeContainer} flexGrow={1}>
        {tree ? (
          <>
            <Tree
              data={tree}
              translate={translate}
              separation={{ nonSiblings: 3, siblings: 3 }}
              scaleExtent={{ min: 0, max: 5 }}
              nodeSize={{ x: 150, y: 150 }}
              collapsible={true}
              zoomable={true}
              zoom={isMobile ? 0.5 : 1}
              pathFunc="diagonal"
              orientation="vertical"
              transitionDuration={800}
              draggable
              hasInteractiveNodes
              renderCustomNodeElement={({ nodeDatum, hierarchyPointNode }) => {
                if (nodeDatum.name !== "empty") {
                  hierarchyPointNode.data.__rd3t.collapsed =
                    nodeDatum.attributes.collapsed
                  return (
                    <g>
                      <foreignObject
                        {...foreignObjectProps}
                        onClick={() => {
                          updateTree(nodeDatum)
                        }}>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={2}
                          width="100%"
                          height="100%"
                          padding={2}
                          borderRadius={16}
                          sx={{ backgroundColor: "white" }}>
                          {/* nodeDatum.attributes.itsPayed */}
                          {/* nodeDatum.attributes.isDirect ? theme.palette.primary.main : theme.palette.secondary.main */}
                          {nodeDatum.attributes.avatar ? (
                            <Avatar
                              sx={{
                                width: 48,
                                height: 48,
                                backgroundColor: alpha(
                                  nodeDatum.attributes.isDirect
                                    ? theme.palette.primary.main
                                    : theme.palette.secondary.main,
                                  0.2
                                )
                              }}
                              // src={`${import.meta.env.VITE_IMAGES_URL}/${session.avatar}`}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                width: 48,
                                height: 48,
                                backgroundColor: alpha(
                                  nodeDatum.attributes.isDirect
                                    ? theme.palette.primary.main
                                    : theme.palette.secondary.main,
                                  0.2
                                )
                              }}>
                              <PersonIcon
                                color={
                                  nodeDatum.attributes.isDirect
                                    ? "primary"
                                    : "secondary"
                                }
                                sx={{ strokeWidth: 0 }}
                              />
                            </Avatar>
                          )}
                          <Grid
                            display="flex"
                            flexDirection="column"
                            gap={0.5}
                            width="100%"
                            paddingY={1}
                            overflow="hidden"
                            textOverflow="ellipsis">
                            <Typography
                              fontWeight={700}
                              fontSize={18}
                              lineHeight={1}
                              color="black"
                              whiteSpace="nowrap">
                              {nodeDatum.attributes.name}
                            </Typography>
                            <Typography
                              fontWeight={300}
                              fontSize={16}
                              lineHeight={1}
                              color="black">
                              {nodeDatum.attributes.email}
                            </Typography>
                          </Grid>
                          {nodeDatum.attributes.itsPayed && (
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              minWidth={32}
                              height={32}
                              borderRadius={16}
                              sx={{
                                strokeWidth: 0,
                                backgroundColor: nodeDatum.attributes.isDirect
                                  ? theme.palette.success.main
                                  : theme.palette.secondary.main
                              }}>
                              <SvgIcon sx={{ width: 16, height: 16 }}>
                                {CityIcon}
                              </SvgIcon>
                            </Box>
                          )}
                        </Box>
                      </foreignObject>
                    </g>
                  )
                }
              }}
            />
          </>
        ) : (
          <Typography
            align="center"
            fontWeight={600}
            variant="h5"
            color="textPrimary">
            {"You don't have any referred yet"}
          </Typography>
        )}
      </Box>
      <Grid
        display="flex"
        alignItems="center"
        gap={2}
        marginX="auto"
        paddingX={2}
        paddingY={1}
        borderRadius={16}
        sx={(t) => ({
          backgroundColor: "white",
          width: "min(320px, 90vw)",
          [t.breakpoints.down("md")]: {
            width: "100%"
          }
        })}>
        <IconButton onClick={() => handleAssignReferral("left")}>
          <LeftIcon />
        </IconButton>
        <Select
          variant="standard"
          value={selectedPendingReferral}
          onChange={(event) => setSelectedPendingReferral(event.target.value)}
          sx={{ flexGrow: 1 }}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            transformOrigin: {
              vertical: "bottom",
              horizontal: "left"
            }
          }}>
          <MenuItem value="select">Seleccionar</MenuItem>
          {pendingReferrals.map((referral) => (
            <MenuItem key={referral.id} value={referral.id}>
              {referral.fullname}
            </MenuItem>
          ))}
        </Select>
        <IconButton onClick={() => handleAssignReferral("right")}>
          <RightIcon />
        </IconButton>
      </Grid>
      <Snackbar
        open={alert.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={resetAlert}>
        <Alert severity={alert.status} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default TreeReferrals
