import { Navigate, useRoutes } from "react-router-dom";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Network from "../pages/Network";
import Users from "../pages/Users";
import Reports from "../pages/Reports";
import Deposits from "../pages/Deposits";
import Withdrawals from "../pages/Withdrawals";
import Profile from "../pages/Profile";
import Pricing from "../pages/Pricing";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import useAuth from "../hooks/useAuth";
import { useMemo } from "react";

const META = {
  REQUIRES_AUTH: Symbol("REQUIRES_AUTH"),
  HIDE_FOR_AUTH: Symbol("HIDE_FOR_AUTH"),
};

function PrivateRoute({ component: Component, meta = [], ...props }) {
  const [auth] = useAuth();
  const isAuthenticated = useMemo(() => auth, [auth]);

  if (isAuthenticated === null) {
    return <></>;
  }

  if (meta.includes(META.REQUIRES_AUTH) && !isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  if (meta.includes(META.HIDE_FOR_AUTH) && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Component {...props} />;
}

function Router() {
  return useRoutes([
    {
      path: "/",
      element: <PrivateRoute component={Dashboard} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/users",
      element: <PrivateRoute component={Users} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/reports",
      element: <PrivateRoute component={Reports} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/deposits",
      element: <PrivateRoute component={Deposits} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/withdrawals",
      element: <PrivateRoute component={Withdrawals} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/profile",
      element: <PrivateRoute component={Profile} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/network",
      element: <PrivateRoute component={Network} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/pricing",
      element: <PrivateRoute component={Pricing} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/signin",
      element: <PrivateRoute component={Signin} meta={[META.HIDE_FOR_AUTH]} />,
    },
    {
      path: "/auth/resetPass",
      element: <PrivateRoute component={ResetPassword} meta={[META.HIDE_FOR_AUTH]} />,
    },
    {
      path: "/validate",
      element: <PrivateRoute component={Signin} meta={[META.HIDE_FOR_AUTH]} />,
    },
    {
      path: "/signup/:slug?",
      element: <PrivateRoute component={Signup} meta={[META.HIDE_FOR_AUTH]} />,
    },
    {
      path: "/forgot-password",
      element: <PrivateRoute component={ForgotPassword} meta={[META.HIDE_FOR_AUTH]} />,
    },
    {
      path: "/reset-password",
      element: <PrivateRoute component={ResetPassword} meta={[META.HIDE_FOR_AUTH]} />,
    },
  ]);
}

export default Router;