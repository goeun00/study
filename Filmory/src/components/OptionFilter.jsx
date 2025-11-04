import { useState } from "react";

const OptionFilter = ({ option, setState }) => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(option[0].name);

  return (
    <div className="box_filter">
      <button className="button_label" tabIndex={0} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
        {label}
        <span className="material-symbols-outlined icon">keyboard_arrow_down</span>
      </button>
      <ul className={`list_filter ${open ? "active" : ""}`}>
        {option.map((item) => (
          <li className="list-item" key={item.name}>
            <button
              className="button_option"
              onClick={() => {
                setState(item.option);
                setLabel(item.name);
              }}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default OptionFilter;
