import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./_index.scss";
import { StyledEngineProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <GoogleOAuthProvider clientId="799776415523-fio97vuli22c1jdc474jg2e3fnjuf9r3.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);
