import { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import OptionFilter from "./OptionFilter";

const Header = ({ page, mainmode, option, setState }) => {
  const { query: paramQuery } = useParams();

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const navigate = useNavigate();
  const [searchExpand, setSearchExpand] = useState(null);
  const [isFixed, setIsFixed] = useState(false);
  const headerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.search.value.trim();
    if(!value) return false
    navigate(`/SearchList/${encodeURIComponent(value)}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      const scrollY = window.scrollY;
      setIsFixed(scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="box_header-wrap">
      <div ref={headerRef} className={`box_header ${isFixed ? "fixed" : ""} ${mainmode ? "darkmode" : ""}`}>
        <h1 className="logo">
          <NavLink to="/">f.</NavLink>
        </h1>
        {page === "search" ? (
          <div className="box_search-wrap">
            <form onSubmit={handleSubmit} role="search" className="from_search">
              <div className="box_search">
                <div className="box_input">
                  <OptionFilter option={option} setState={setState} />
                  <input id="search-input" className="form_input" name="search" type="search" placeholder="검색어를 입력하세요" defaultValue={paramQuery} autoComplete="off" />
                </div>
                <button type="submit" className="button_submit">
                  <span className="material-symbols-outlined icon">search</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="box_header-date">
            <span className="text">
              <b>Today</b> · {today}
            </span>
          </div>
        )}

        <ul className="list_nav">
          {page !== "search" && (
            <li className={`list-item item-search ${searchExpand ? "active" : ""}`} onFocus={() => setSearchExpand(true)} onBlur={() => setSearchExpand(false)} tabIndex={0}>
              <button className="button">
                <span className="material-symbols-outlined light icon">search</span>
                <span className="box_info">Search</span>
              </button>
              <form onSubmit={handleSubmit} role="search">
                <input type="search" className="input_mini-search" name="search" placeholder="search movie..." autoComplete="off" />
                <button type="submit"></button>
              </form>
            </li>
          )}
          <li className="list-item">
            <NavLink to="/SaveBox">
              <span className="material-symbols-outlined light icon">favorite</span>
              <span className="box_info">Favorite</span>
            </NavLink>
          </li>
          <li className="list-item">
            <NavLink to="/Review">
              <span className="material-symbols-outlined light icon">orders</span>
              <span className="box_info">Review</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
