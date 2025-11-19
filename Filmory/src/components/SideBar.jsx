import { useState } from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [menuOpen, setMenuOpen] = useState(null);
  const nav = [
    { name: "search", to: "/SearchList/공효진", icon: "search" },
    { name: "favorite", to: "/SaveBox", icon: "favorite" },
    { name: "review", to: "/Review", icon: "orders" },
  ];

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
      <span className="button_menu">{!menuOpen ? <span className="material-symbols-outlined icon">menu</span> : <NavLink to="/">F.</NavLink>}</span>
      <ul className="list">
        {nav.map((item) => (
          <li className="list-item" key={item.to}>
            <NavLink to={item.to} className={({ isActive }) => `link ${isActive ? "active" : ""}`}>
              <span className="material-symbols-outlined icon">{item.icon}</span>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SideBar;
