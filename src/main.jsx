import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { ConfigProvider } from "./providers/ConfigProvider.jsx";
import { SessionProvider } from "./providers/SessionProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SessionProvider>
        <ConfigProvider>
          <App />
        </ConfigProvider>
      </SessionProvider>
    </AuthProvider>
  </React.StrictMode>
);
