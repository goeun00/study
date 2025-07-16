import "./App.css";

import { Routes, Route } from "react-router-dom";
import Best from "./pages/Best";
import EMartMall from "./pages/EMartMall";
import Agree from "./pages/Agree";
import Swiper from "./pages/Swiper";
import RoomFilter from "./pages/RoomFilter";
import CreatePotal from "./pages/CreatePotal";
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

  const tabs = [
    {
      path: "/Best",
      icon: "award_star",
      label: "Best",
      element: <Best />,
    },
    {
      path: "/EMartMall",
      icon: "local_shipping",
      label: "E-mart",
      element: <EMartMall />,
    },
    {
      path: "/Agree",
      icon: "handshake",
      label: "예약 동의",
      element: <Agree />,
    },
    {
      path: "/Swiper",
      icon: "art_track",
      label: "swiper",
      element: <Swiper />,
    },
    {
      path: "/RoomFilter",
      icon: "page_info",
      label: "숙박필터",
      element: <RoomFilter />,
    },
    {
      path: "/CreatePotal",
      icon: "door_open",
      label: "CreatePotal",
      element: <CreatePotal />,
    },
  ];

  return (
    <>
      <WeekTab tabs={tabs} />
      <Routes>
        {tabs.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
