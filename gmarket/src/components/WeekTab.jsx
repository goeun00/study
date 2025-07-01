import { NavLink } from "react-router-dom";

const WeekTab = () => {
  return (
    <div className="box__weektab">
      <NavLink
        to="/best"
        className={({ isActive }) =>
          `link__tab${isActive ? " link__tab--active" : ""}`
        }
      >
        <span className="material-symbols-outlined image__icon">
          award_star
        </span>
        Best
      </NavLink>
      <NavLink
        to="/EMartMall"
        className={({ isActive }) =>
          `link__tab${isActive ? " link__tab--active" : ""}`
        }
      >
        <span className="material-symbols-outlined image__icon">
          local_shipping
        </span>
        E-mart
      </NavLink>
      <NavLink
        to="/Agree"
        className={({ isActive }) =>
          `link__tab${isActive ? " link__tab--active" : ""}`
        }
      >
        <span className="material-symbols-outlined image__icon">handshake</span>
        예약 동의
      </NavLink>
      <NavLink
        to="/Swiper"
        className={({ isActive }) =>
          `link__tab${isActive ? " link__tab--active" : ""}`
        }
      >
        <span className="material-symbols-outlined image__icon">art_track</span>
        swiper
      </NavLink>
    </div>
  );
};
export default WeekTab;
