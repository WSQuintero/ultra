import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { AuthProvider } from "./providers/AuthProvider.jsx"
import { ConfigProvider } from "./providers/ConfigProvider.jsx"
import { SessionProvider } from "./providers/SessionProvider.jsx"
import { GeneralContext } from "./generalContext/GeneralContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GeneralContext>
      <AuthProvider>
        <SessionProvider>
          <ConfigProvider>
            <App />
          </ConfigProvider>
        </SessionProvider>
      </AuthProvider>
    </GeneralContext>
  </React.StrictMode>
)
