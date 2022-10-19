import { findAuth } from "apps/authenticated-front/src/app/api";
import {
  initTokens,
  selectHasTokens,
  setUser,
} from "apps/authenticated-front/src/app/state/authSlide";
import { store } from "apps/authenticated-front/src/app/store";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./app/app";

const start = async () => {
  store.dispatch(initTokens());
  const hasTokens = selectHasTokens(store.getState());
  if (hasTokens) {
    const { data } = await findAuth().catch(() => ({ data: null }));
    store.dispatch(setUser(data));
  }
  renderRoot();
};

const renderRoot = () => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </StrictMode>
  );
};

start();
