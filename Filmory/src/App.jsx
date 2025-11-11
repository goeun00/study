import { Routes, Route } from "react-router-dom";
import BoxOffice from "./pages/BoxOffice";
import SearchList from "./pages/SearchList";
import Review from "./pages/Review";
import SaveBox from "./pages/SaveBox";
import MovieDetail from "./pages/Detail";
import "./App.css";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";

const nav = [
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
          <Route path="/" element={<BoxOffice />} />
          {nav.map((item) => (
            <Route path={item.to} element={item.conponant} />
          ))}
          <Route path="/movie/:movieId/:movieSeq" element={<MovieDetail />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};
export default App;
