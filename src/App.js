import React from "react";
import JSONPretty from "react-json-pretty";
import * as CF from "@harnessio/ff-javascript-client-sdk";

const cf = CF.initialize("your key", { identifier: "enver" }, {
  streamEnabled: true,
});

function App() {
  const [data, setData] = React.useState(null);
  const [connected, setConnected] = React.useState(false);
  const [flag, setFlag] = React.useState();
  React.useEffect(() => {
    cf.on(CF.Event.READY, () => {
      setConnected(true);
    });
    cf.on(CF.Event.DISCONNECTED, () => {
      setConnected(false);
    });
    cf.on(CF.Event.CHANGED, (flag) => {
      setFlag(flag);
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
