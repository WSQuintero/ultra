import { useLocation } from "react-router-dom";

const routesToExclude = ["/signin", "/signup", "/forgot-password", "/reset-password"];

function Private({ children }) {
  const { pathname } = useLocation();

  if (routesToExclude.reduce((a, c) => a || pathname.includes(c), false)) {
    return <></>;
  }

  return <>{children}</>;
}

export default Private;
