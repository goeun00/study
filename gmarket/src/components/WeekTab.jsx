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
        to="/Week2"
        className={({ isActive }) =>
          `link__tab${isActive ? " link__tab--active" : ""}`
        }
      >
        <span className="material-symbols-outlined image__icon">
          date_range
        </span>
        Week<span className="text__num">2</span>
      </NavLink>
    </div>
  );
};
export default WeekTab;
