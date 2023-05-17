import React from "react";
import ReactDOM from "react-dom";
import history from "./@history";
import { Router } from "react-router-dom";
import Authorization from "./components/Authorization";
import Routes from "./components/AppLayout/Routes";
import AppContext from "./AppContext";
import { Provider } from "react-redux";
import { store } from "./toolkit/store";
import routes from "./config/routesConfig";
import { SnackbarProvider } from "notistack";
import { LastLocationProvider } from "react-router-last-location";
import { BrowserTracing } from "@sentry/tracing";
import * as Sentry from "@sentry/react";

if (process.env.REACT_APP_ENV === "production") {
  Sentry.init({
    dsn:
      "https://7c018da1808c4bc4a68e6e8e45669eeb@o4504269238173696.ingest.sentry.io/4504269240336384",
    integrations: [new BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <Provider store={store}>
        <Router history={history}>
          {/* For getting last location of path LastLocationProvider  */}
          <LastLocationProvider>
            <Authorization>
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Routes />
              </SnackbarProvider>
            </Authorization>
          </LastLocationProvider>
        </Router>
      </Provider>
    </AppContext.Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
