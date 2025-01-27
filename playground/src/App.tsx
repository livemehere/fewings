import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Page2 from "./pages/Page2.tsx";
import Home from "./pages/Home.tsx";
import Layout from "./pages/Layout.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/page2"} element={<Page2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
