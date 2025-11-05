import { Routes, Route } from "react-router-dom";
import BoxOffice from "./pages/BoxOffice";
import SearchList from "./pages/SearchList";
import Review from "./pages/Review";
import SaveBox from "./pages/SaveBox";
import "./App.css";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";

const nav = [
  { name: "box office", to: "/", conponant: <BoxOffice /> },
  { name: "search movie", to: "/SearchList", conponant: <SearchList /> },
  { name: "save box", to: "/SaveBox", conponant: <SaveBox /> },
  { name: "review note", to: "/Review", conponant: <Review /> },
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
