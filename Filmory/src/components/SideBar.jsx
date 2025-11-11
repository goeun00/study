import { useState } from "react";
import { NavLink } from "react-router-dom";
const SideBar = ({ nav }) => {
  const [menuOpen, setMenuOpen] = useState(null);

  return (
    <div
      className={`box_sidebar ${menuOpen ? "active" : ""}`}
      tabIndex={0}
      onFocus={() => setMenuOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setMenuOpen(false);
        }
      }}
    >
      <span className="button_menu">{!menuOpen ? <span className="material-symbols-outlined icon">menu</span> : <NavLink to="/">Filmory.</NavLink>}</span>
      <ul className="list">
        {nav.map((item) => (
          <li className="list-item" key={item.to}>
            <NavLink to={item.to} className={({ isActive }) => `link ${isActive ? "active" : ""}`}>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SideBar;
