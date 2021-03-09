import React from "react";
import JSONPretty from "react-json-pretty";
import * as CF from "js-client-sdk";

const cf = CF.initialize("2c2a12a1-6599-406e-96c4-031a51c8a51b", { identifier: "enver" }, {
  streamEnabled: true,
});

function App() {
  const [data, setData] = React.useState(null);
  const [connected, setConnected] = React.useState(false);
  const [flag, setFlag] = React.useState();
  React.useEffect(() => {
    cf.on("connected", () => {
      setConnected(true);
    });
    cf.on("disconnected", () => {
      setConnected(false);
    });
    cf.on("update", ({detail}) => {
      setFlag(detail);
    })
    cf.variation("bool-flag2", false);
    return () => {
      cf.close();
    }
  }, []);

  return (
    <div className="App">
      <div>connected: {connected ? "true" : "false"}</div>
      <div>Last event: {data && JSON.stringify(data)}</div>
      <JSONPretty id="json-pretty" data={flag}></JSONPretty>
    </div>
  );
}

export default App;
