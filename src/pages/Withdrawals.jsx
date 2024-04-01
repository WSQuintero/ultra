import { useEffect, useMemo, useState, useCallback } from "react";
import useAuth from "../hooks/useAuth";
import useConfig from "../hooks/useConfig";
import useSession from "../hooks/useSession";
import FormRow from "../components/FormRow";
import ModalG2Fa from "../components/ModalG2Fa";
import ModalAuth from "../components/ModalAuth";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import PageWrapper from "../components/PageWrapper";
import EnhancedTable from "../components/EnhancedTable";
import ModalErrorGeneral from "../components/ModalErrorGeneral";
import ModalSucessGeneral from "../components/ModalSucessGeneral";
import SubscriptionService from "../services/subscription.service";
import ModalDepositFinancity from "../components/ModalDepositFinancity";
import { Grid, Box, Button, TextField, Typography, Checkbox, Select, MenuItem, Divider } from "@mui/material";
import { Link } from "react-router-dom";

const headCells = [
  {
    id: "amount_withdrawal",
    label: "Monto de retiro (USDT)",
    align: "left",
    width: "20%",
    disablePadding: false,
    format: (value) => value,
  },
  {
    id: "date_withdrawal",
    label: "Fecha de Retiro",
    align: "left",
    width: "20%",
    disablePadding: false,
    format: (value) => new Date(value).toLocaleDateString(),
  },
  {
    id: "status",
    label: "Estado",
    align: "left",
    width: "20%",
    disablePadding: false,
    format: (value) => (value == 0 ? "PENDIENTE" : (value == 1 ? "PAGADO" : "RECHAZADO")),
  },
  {
    id: "date_payment",
    label: "Fecha de pago",
    align: "left",
    width: "20%",
    disablePadding: false,
    format: (value) => (value ? new Date(value).toLocaleDateString() : "-"),
  },
  {
    id: "hash_payment",
    label: "Hash de Pago",
    align: "left",
    width: "60%",
    disablePadding: false,
    format: (value) =>
      value ? (
        <Link to={"https://tronscan.org/#/transaction/" + value.split("-")[0]} target="_BLANK">
          {value.split("-")[0]}
        </Link>
      ) : (
        "-"
      ),
  },
];

var paymentsApproved = [];
var totalPaymentsApproved = 0;

const headCellsAdmin = [
  {
    id: "user_fullname",
    label: "Usuario",
    width: "20%",
    disablePadding: false,
    format: (value) => value,
  },
  {
    id: "user_email",
    label: "Usuario Email",
    width: "20%",
    disablePadding: false,
    format: (value) => value,
  },
  {
    id: "amount_withdrawal",
    label: "Monto de retiro (USDT)",
    align: "left",
    width: "20%",
    disablePadding: false,
    format: (value) => value,
  },
  {
    id: "date_withdrawal",
    label: "Fecha de Retiro",
    align: "left",
    width: "20%",
    disablePadding: false,
    format: (value) => new Date(value).toLocaleDateString(),
  },
  {
    id: "id",
    label: "Pagar",
    width: "20%",
    disablePadding: false,
    format: (value, row) => (
      <Checkbox
        value={value}
        amount={row.amount_withdrawal}
        onChange={(val) => {
          let newPayments = paymentsApproved;
          let t = val.target;

          if (t.checked) {
            newPayments.push(t.value);
          } else if (newPayments.indexOf(t.value) >= 0) {
            newPayments = newPayments.splice(newPayments.indexOf(t.value), 1);
          }

          paymentsApproved = newPayments;
        }}
      />
    ),
  },
];

function Withdrawals() {
  const [auth] = useAuth();
  const [session] = useSession();
  const [, { setLoading }] = useConfig();
  const [reports, setReports] = useState([]);
  const [reportsAdmin, setReportsAdmin] = useState(null);
  const $User = useMemo(() => new UserService(auth), [auth]);
  const $Auth = useMemo(() => new AuthService(auth), [auth]);
  const $Subscription = useMemo(() => new SubscriptionService(auth), [auth]);

  const [withdrawalsTotal, setWithdrawalsTotal] = useState(false);
  const [withdrawalsBalanceTrx, setWithdrawalsBalanceTrx] = useState(0);
  const [withdrawalsBalanceUSDT, setWithdrawalsBalanceUSDT] = useState(0);
  const [modalDepositFinancity, setModalDepositFinancity] = useState(false);

  const [modalConfirmReInvest, setModalConfirmReInvest] = useState(false);
  const [modalConfirm2Fa, setModalConfirm2Fa] = useState(false);
  const [modalConfirmAuth, setModalConfirmAuth] = useState(false);
  const [modalConfirmAuthSplit, setModalConfirmAuthSplit] = useState(false);
  const [modalConfirmRejectSplit, setModalConfirmRejectSplit] = useState(false);
  const [modalErrorWithdrawal, setModalErrorWithdrawal] = useState(false);
  const [modalSuccessWithdrawal, setModalSuccessWithdrawal] = useState(false);
  const [originWithdrawal, setOriginWithdrawal] = useState(4);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const { status, data } = await $User.getWithdrawals();

      if (status) {
        setReports(data.data);
      }

      const respAll = await $User.getWithdrawalsAll();

      if (respAll.status) {
        setWithdrawalsBalanceTrx(respAll.data.trxBalanceVault);
        setWithdrawalsBalanceUSDT(respAll.data.usdtBalanceVault);
        setWithdrawalsTotal(respAll.data.total);
        setWithdrawalsTotal(respAll.data.total);
        setReportsAdmin(respAll.data.data);
      }
    })();

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [$Auth]);

  const startWithdrawal = async () => {
    if(session.wallet_address_pay_commission==''){
      setModalErrorWithdrawal("Configura la wallet antes de retirar desde tu perfil.");
    }else if (Number(withdrawal.amount) >= 10) {
      setLoading(true);

      let { status, data } = await $User.withdrawal({
        amount: withdrawal.amount,
        origin: originWithdrawal
      });

      setLoading(false);

      if (status) {
        await $Auth.validate();
        const { status, data } = await $User.getWithdrawals();

        if (status) {
          setReports(data.data);
        }

        setModalSuccessWithdrawal("La solicitud de retiro ha sido enviada y en los próximos días será procesada.");
      } else {

        setLoading(false);
        setModalErrorWithdrawal(data.response.data.message);
      }
    }
  };

  const startReinvest = async () => {
    if (Number(withdrawal.amount) >= 100) {
      setLoading(true);

      let { status, data } = await $User.reinvest({
        amount: withdrawal.amount,
        origin: originWithdrawal
      });

      setLoading(false);

      if (status) {
        await $Auth.validate();
        const { status, data } = await $User.getWithdrawals();

        if (status) {
          setReports(data.data);
        }

        setModalSuccessWithdrawal("La reinversión ha sido generada correctamente");
      } else {
        setModalErrorWithdrawal(data.response.data.message);
      }
    }else{
      setLoading(false);
      setModalErrorWithdrawal("El monto mínimo de reinversión es de 100 USDT");
    }
  };

  const startSplit = async (pass) => {
    if (paymentsApproved.length) {
      setLoading(true);

      let { status, data } = await $Subscription.splitWithdrawal({
        splits: paymentsApproved.join(","),
        password: pass,
      });

      setLoading(false);

      if (status) {
        await $Auth.validate();
        const respAll = await $User.getWithdrawalsAll();

        if (respAll.status) {
          setWithdrawalsTotal(respAll.data.total);
          setReportsAdmin(respAll.data.data);
        }

        if(data.error){
          setModalErrorWithdrawal(data.error);
        }else{
          setModalSuccessWithdrawal("Las solicitudes de retiro marcadas han sido ejecutadas.");
        }

      } else {
        setModalErrorWithdrawal(data.response.data.message);
      }
    }
  };
  
  const startRejectSplit = async (pass) => {
    if (paymentsApproved.length) {
      setLoading(true);

      let { status, data } = await $Subscription.rejectWithdrawal({
        splits: paymentsApproved.join(","),
        password: pass,
      });

      setLoading(false);

      if (status) {
        await $Auth.validate();
        const respAll = await $User.getWithdrawalsAll();

        if (respAll.status) {
          setWithdrawalsTotal(respAll.data.total);
          setReportsAdmin(respAll.data.data);
        }

        if(data.error){
          setModalErrorWithdrawal(data.error);
        }else{
          setModalSuccessWithdrawal("Las solicitudes de retiro marcadas han sido rechazadas.");
        }

      } else {
        setModalErrorWithdrawal(data.response.data.message);
      }
    }
  };

  const [withdrawal, setWithdrawal] = useState({
    amount: (parseFloat(session?.balance_roi_available||0)+parseFloat(session?.balance_binary_available||0)+parseFloat(session?.balance_direct_available||0)).toFixed(2),
  });

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setWithdrawal((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <PageWrapper sx={{ padding: 2 }}>
      <Grid display="flex" flexDirection="column" gap={2}>
        <Grid display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
            padding={2}
            borderRadius={4}
            sx={(t) => ({
              backgroundColor: "white",
              [t.breakpoints.down("md")]: {
                flexDirection: "column",
              },
            })}
          >
            <Grid display="flex" flexDirection="column" flexGrow={1}>
              <Typography fontSize={24} fontWeight={700} color="primary">
                {`Monto a Retirar - Balance Total ${(parseFloat(session?.balance_roi_available||0)+parseFloat(session?.balance_binary_available||0)+parseFloat(session?.balance_direct_available||0)).toFixed(2)} USDT`}
              </Typography>
              <Typography>
                {"Fecha Último Retiro: " +
                  (reports.length ? new Date(reports[0]?.date_withdrawal).toLocaleDateString() : "-")}
              </Typography>
            </Grid>
            <Grid
              display="flex"
              alignItems="center"
              gap={2}
              sx={(t) => ({
                [t.breakpoints.down("md")]: {
                  flexDirection: "column",
                  width: "100%",
                },
              })}
            >
              <Select
                value={originWithdrawal}
                label=""
                onChange={(a)=>{ 
                  setOriginWithdrawal(a.target.value);
                  if(a.target.value==4){
                    handleInputChange({
                      target: {
                        name: 'amount',
                        value: (parseFloat(session?.balance_roi_available||0)+parseFloat(session?.balance_binary_available||0)+parseFloat(session?.balance_direct_available||0)).toFixed(2)
                      }
                    })
                  }else{
                    handleInputChange({
                      target: {
                        name: 'amount',
                        value: 0
                      }
                    })
                  }
                }}>
                <MenuItem value={4}>Total - Disponible: {(parseFloat(session?.balance_roi_available||0)+parseFloat(session?.balance_binary_available||0)+parseFloat(session?.balance_direct_available||0)).toFixed(2)} USDT</MenuItem>
                <MenuItem value={1}>ROI - Disponible: {parseFloat(session?.balance_roi_available||0).toFixed(2)} USDT</MenuItem>
                <MenuItem value={2}>Binario - Disponible: {parseFloat(session?.balance_binary_available||0).toFixed(2)} USDT</MenuItem>
                <MenuItem value={3}>Directo - Disponible: {parseFloat(session?.balance_direct_available||0).toFixed(2)} USDT</MenuItem>
              </Select>
              <TextField
                name="amount"
                value={withdrawal.amount}
                disabled={(originWithdrawal==4 ? true : false)}
                type="number"
                size="small"
                inputProps={{
                  step: "1", // Incremento o decremento de los valores permitidos
                  pattern: "[0-9]+([.,][0-9]+)?", // Patrón para permitir números enteros y decimales
                  min: "10", // Valor mínimo permitido
                }}
                fullWidth
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                size="large"
                color={"warning"}
                onClick={() => {
                  setModalConfirmReInvest(true);
                  if (session.exist_2fa_auth == 1) {
                    setModalConfirm2Fa(true);
                  } else {
                    setModalConfirmAuth(true);
                  }
                }}
                fullWidth
              >
                Reinventir
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  setModalConfirmReInvest(false);
                  if (session.exist_2fa_auth == 1) {
                    setModalConfirm2Fa(true);
                  } else {
                    setModalConfirmAuth(true);
                  }
                }}
                fullWidth
              >
                Solicitar Retiro
              </Button>
            </Grid>
          </Box>

          {reports && (
            <EnhancedTable
              title="Histórico de retiros propios"
              headCells={headCells}
              rows={reports}
              footer={
                <>
                  <Grid display="flex" gap={1}>
                    <Typography fontWeight={600} color="primary">
                      Total Pendiente:
                    </Typography>
                    <Typography>{(parseFloat(session?.balance_roi_available||0)+parseFloat(session?.balance_binary_available||0)+parseFloat(session?.balance_direct_available||0)).toFixed(2).toLocaleString()} USDT</Typography>
                    {"-"}
                    <Typography fontWeight={600} color="primary">
                      Total Pagado:
                    </Typography>
                    <Typography>{(parseFloat(session?.balance_roi_payed||0)+parseFloat(session?.balance_binary_payed||0)+parseFloat(session?.balance_direct_payed||0)).toFixed(2).toLocaleString()} USDT</Typography>
                  </Grid>
                </>
              }
            />
          )}
        </Grid>

        <Divider />

          {reportsAdmin && session.rol == 1 && (
            <Grid display="flex" flexDirection="column" gap={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
                padding={2}
                borderRadius={4}
                sx={(t) => ({
                  backgroundColor: "white",
                  [t.breakpoints.down("md")]: {
                    flexDirection: "column",
                  },
                })}
              >
                <Grid display="flex" flexDirection="column" flexGrow={1}>
                  <Typography fontSize={24} fontWeight={700} color="primary">
                    {`Monto a aprobar para retiro`}
                  </Typography>
                  <Typography fontSize={15} color="primary">
                    {`Balance Financity TRX: ${withdrawalsBalanceTrx.toFixed(2).toLocaleString()} TRX`}
                  </Typography>
                  <Typography fontSize={15} color="primary">
                    {`Balance Financity USDT: ${withdrawalsBalanceUSDT.toFixed(2).toLocaleString()} USDT`}
                  </Typography>
                </Grid>
                <Grid
                  display="flex"
                  alignItems="center"
                  gap={2}
                  sx={(t) => ({
                    [t.breakpoints.down("md")]: {
                      flexDirection: "column",
                      width: "100%",
                    },
                  })}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      setModalDepositFinancity(true);
                    }}
                    sx={(t) => ({
                      [t.breakpoints.down("md")]: {
                        width: "100%",
                      },
                    })}
                  >
                    Cargar wallet Financity
                  </Button>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      setModalConfirmAuth(true);
                      setModalConfirmRejectSplit(true);
                    }}
                    sx={(t) => ({
                      [t.breakpoints.down("md")]: {
                        width: "100%",
                      },
                    })}
                  >
                    Rechazar retiros marcados
                  </Button>
                  
                  <Button
                    variant="contained"
                    size="large"
                    color={"warning"}
                    onClick={() => {
                      setModalConfirmAuth(true);
                      setModalConfirmAuthSplit(true);
                    }}
                    sx={(t) => ({
                      [t.breakpoints.down("md")]: {
                        width: "100%",
                      },
                    })}
                  >
                    Aprobar retiros marcados
                  </Button>
                </Grid>
              </Box>
              <EnhancedTable
                title="Histórico de los retiros pendientes de todos los usuarios"
                headCells={headCellsAdmin}
                rows={reportsAdmin}
                footer={
                  <>
                    <Grid display="flex" gap={1}>
                      <Typography fontWeight={600} color="primary">
                        Total Pendiente:
                      </Typography>
                      <Typography>{withdrawalsTotal?.toFixed(2).toLocaleString()} USDT</Typography>
                    </Grid>
                  </>
                }
              />
            </Grid>
          )}
      </Grid>

      {modalConfirm2Fa && (
        <ModalG2Fa
          open={modalConfirm2Fa}
          handleClose={() => {
            setModalConfirm2Fa(false);
          }}
          handleAuth={async () => {
            if (session.exist_2fa_auth == 1) {
              setModalConfirm2Fa(false);
              setModalConfirmAuth(true);
            }
          }}
        />
      )}
      
      {modalDepositFinancity && (
        <ModalDepositFinancity
          open={modalDepositFinancity}
          handleClose={() => {
            setModalDepositFinancity(false);
          }}
        />
      )}

      {modalConfirmAuth&&(<ModalAuth
        open={modalConfirmAuth}
        handleClose={() => {
          setModalConfirmAuth(false);
        }}
        handleAuth={(pass) => {
          setLoading(true);
          if (modalConfirmAuthSplit) {
            startSplit(pass);
          }else if (modalConfirmRejectSplit) {
            startRejectSplit(pass);
          } else if(modalConfirmReInvest) {
            setModalConfirmReInvest(false);
            startReinvest();
          }else{
            startWithdrawal();
          }

          setModalConfirmAuth(false);
        }}
      />)}

      <ModalErrorGeneral
        open={modalErrorWithdrawal ? true : false}
        error={modalErrorWithdrawal}
        handleClose={() => {
          setModalErrorWithdrawal(false);
        }}
      />

      <ModalSucessGeneral
        open={modalSuccessWithdrawal ? true : false}
        message={modalSuccessWithdrawal}
        handleClose={() => {
          setModalSuccessWithdrawal(false);
        }}
      />
    </PageWrapper>
  );
}

export default Withdrawals;
