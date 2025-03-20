import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "../store";

export const renderStoreWithRedux = (component, preloadedState = {}) => {
  const store = createStore(preloadedState);

  return {
    store,
    ...render(<Provider store={store}>{component}</Provider>),
  };
};
