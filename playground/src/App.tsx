import { Space } from "@fekit/react/ui";
import "./App.css";
import { addCommas } from "@fekit/core/number";

function App() {
  return (
    <div>
      <h1>hello</h1>
      <Space y={100} />
      <h1>bye</h1>
      <div>${addCommas(10000000)}</div>
    </div>
  );
}

export default App;
