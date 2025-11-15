import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/app-layout";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
