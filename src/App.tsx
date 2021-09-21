import React from "react";
import { Provider } from 'react-redux'
import "./App.less";
import { Routes } from "./routes";
import { store } from 'src/redux/store'

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
