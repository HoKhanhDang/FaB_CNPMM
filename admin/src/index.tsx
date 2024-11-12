import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { rootStore, persistor } from "./redux/config/persist.config";
import { PersistGate } from "redux-persist/integration/react";
import {  HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const queyClient = new QueryClient();
root.render(
    <QueryClientProvider client={queyClient}>
        <Provider store={rootStore}>
            <PersistGate loading={null} persistor={persistor}>
                <HashRouter>
                    <App />
                </HashRouter>
            </PersistGate>
        </Provider>
    </QueryClientProvider>
);
