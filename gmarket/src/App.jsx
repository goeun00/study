import "./App.css";

import { Routes, Route } from "react-router-dom";
import Best from "./pages/Best";
import Week2 from "./pages/Week2";
import WeekTab from "./components/WeekTab";
function App() {
  return (
    <>
      <WeekTab />
      <Routes>
        <Route path="/best" element={<Best />} />
        <Route path="/week2" element={<Week2 />} />
      </Routes>
    </>
  );
}

export default App;
