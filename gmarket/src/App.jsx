import "./App.css";

import { Routes, Route } from "react-router-dom";
import Best from "./pages/Best";
import EMartMall from "./pages/EMartMall";
import Agree from "./pages/Agree";
import Swiper from "./pages/Swiper";
import WeekTab from "./components/WeekTab";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function App() {
  const titles = {
    "/best": "[study] 베스트",
    "/EMartMall": "[study] 이마트몰",
  };

  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] || "Gmarket";
  }, [location.pathname]);

  return (
    <>
      <WeekTab />
      <Routes>
        <Route path="/best" element={<Best />} />
        <Route path="/EMartMall" element={<EMartMall />} />
        <Route path="/Agree" element={<Agree />} />
        <Route path="/Swiper" element={<Swiper />} />
      </Routes>
    </>
  );
}

export default App;
