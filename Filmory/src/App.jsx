/* eslint-disable no-unused-vars */
import { Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import SearchList from "./pages/SearchList";
import Review from "./pages/Review";
import SaveBox from "./pages/SaveBox";
import MovieDetail from "./pages/Detail";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import { useAtom } from "jotai";
import Lottie from "lottie-react";
import bookmarkAnimation from "./assets/lottie/heart_motion.json";
import { bookmarkMotionAtom } from "./atom/atom";

import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

const route = [
  { to: "/", conponant: <Index /> },
  { to: "/SearchList/:query", conponant: <SearchList /> },
  { to: "/SaveBox", conponant: <SaveBox /> },
  { to: "/Review", conponant: <Review /> },
  { to: "/movie/:movieId/:movieSeq", conponant: <MovieDetail /> },
];

const App = () => {
  const [bookmarkMotion, setBookmarkMotion] = useAtom(bookmarkMotionAtom);
  const location = useLocation();
  const [darkmode, setDarkmode] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {/* <SideBar /> */}

      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: "easeOut" }} className={`box_container ${darkmode ? "darkmode" : "lightmode"}`}>
          <Routes location={location}>
            {route.map((item) => (
              <Route key={item.to} path={item.to} element={item.conponant} />
            ))}
          </Routes>
          <button className="button_them-mode" onClick={() => setDarkmode((prev) => !prev)}>
            <span class="material-symbols-outlined icon">routine</span>
          </button>
          <Footer />
          {bookmarkMotion && (
            <Lottie
              animationData={bookmarkAnimation}
              autoplay
              loop={false}
              style={{ width: 200, height: 200 }}
              onComplete={() => {
                setBookmarkMotion(false);
              }}
              className="favorite_lottie"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default App;
