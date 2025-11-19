import backVideo from "../assets/video/back.mp4";
import Header from "./Header";
import { useAtomValue } from "jotai";
import { reviewDisplayAtom, bookmarkDisplayAtom } from "../atom/atom";
import { useState, useRef, useEffect } from "react";

const Main = () => {
  const total = useAtomValue(bookmarkDisplayAtom);
  const [them, setThem] = useState(true);
  const mainRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;
      const scrollY = window.scrollY;
      const isMain = scrollY < mainRef.current.offsetHeight - 64;
      setThem(isMain);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="box_main" ref={mainRef}>
      <Header mainmode={them} />
      <video autoPlay muted loop playsInline className="video" poster="./assets/image/background.png">
        <source src={backVideo} type="video/mp4" />
      </video>
      <p className="text_script">
        Where every frame tells your story —<br />a cinematic diary of your memories.
        <span className="text_count">{total}</span>
      </p>
      <p className="text_scroll">
        scroll to discover
        <span className="material-symbols-outlined icon">stat_minus_2</span>
      </p>
    </div>
  );
};

export default Main;
