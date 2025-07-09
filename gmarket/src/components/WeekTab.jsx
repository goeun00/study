import { NavLink } from "react-router-dom";

const WeekTab = ({ tabs }) => {
  return (
    <div className="box__weektab">
      {tabs.map(({ path, icon, label }, idx) => (
        <NavLink
          key={idx}
          to={path}
          className={({ isActive }) =>
            `link__tab${isActive ? " link__tab--active" : ""}`
          }
        >
          <span className="material-symbols-outlined image__icon">{icon}</span>
          {label}
        </NavLink>
      ))}
    </div>
  );
};
export default WeekTab;
