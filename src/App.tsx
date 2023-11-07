import React from "react";
import Calculate from "./containers/Calculate";
import { WrapperLayoutCenter } from "./components/Layout";
import "antd/dist/reset.css";

function App() {
  return (
    <WrapperLayoutCenter>
      <Calculate />
    </WrapperLayoutCenter>
  );
}

export default App;
