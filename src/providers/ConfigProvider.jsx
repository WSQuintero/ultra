import { createContext, useCallback, useState } from "react";

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({ loading: true });

  const setLoading = useCallback((value) => setConfig((prev) => ({ ...prev, loading: value })), []);

  return <ConfigContext.Provider value={[config, { setLoading }]}>{children}</ConfigContext.Provider>;
};
