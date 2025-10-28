import { Routes, Route } from "react-router-dom";
import BoxOffice from "./pages/BoxOffice";
import SearchList from "./pages/SearchList";
import Review from "./pages/Review";
import SaveBox from "./pages/SaveBox";
import "./App.css";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";

const nav = [
  { name: "search movie", to: "/SearchList", conponant: <SearchList /> },
  { name: "box office", to: "/", conponant: <BoxOffice /> },
  { name: "review note", to: "/Review", conponant: <Review /> },
  { name: "save box", to: "/SaveBox", conponant: <SaveBox /> },
];

const App = () => {
  return (
    <>
      <SideBar nav={nav} />
      <div className="box_container">
        <Routes>
          {nav.map((item) => (
            <Route path={item.to} element={item.conponant} />
          ))}
        </Routes>
        <Footer />
      </div>
    </>
  );
};
export default App;
