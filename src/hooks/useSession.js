import { useContext } from "react";
import { SessionContext } from "../providers/SessionProvider";

const useSession = () => {
  return useContext(SessionContext);
};

export default useSession;
