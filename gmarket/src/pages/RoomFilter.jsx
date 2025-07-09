import { useState, useRef, useEffect } from "react";
import "./RoomFilter.css";

const RoomFilter = () => {
  const layerRef = useRef(null);
  const buttonRef1 = useRef(null);
  const buttonRef2 = useRef(null);
  const buttonRef3 = useRef(null);
  const [buttonRef, setButtonRef] = useState(null);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [activeLayer, setActiveLayer] = useState(false);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
  };

  const layerOpen = (buttonRef) => {
    setActiveLayer(true);
    setButtonRef(buttonRef.current);
    setTimeout(() => {
      const focusable = layerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length) focusable[0].focus();
    }, 0);
  };

  const layerClose = () => {
    setActiveLayer(false);
    buttonRef.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        layerClose();
      }
      if (e.key === "Tab" && activeLayer && layerRef.current) {
        const focusableEls = layerRef.current.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      }
    };
    if (activeLayer) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLayer]);

  const backgroundStyle = {
    background: `linear-gradient(to right, 
      #e0e0e0 0%, 
      #e0e0e0 ${minValue}%, 
      #393d40 ${minValue}%, 
      #393d40  ${maxValue}%, 
      #e0e0e0 ${maxValue}%, 
      #e0e0e0 100%)`,
  };

  const conveniences = [
    { key: "pickup", icon: "directions_car", label: "픽업" },
    { key: "breakfast", icon: "fastfood", label: "무료조식" },
    { key: "pool", icon: "water", label: "수영장" },
    { key: "spa", icon: "spa", label: "스파" },
    { key: "seminar", icon: "podium", label: "세미나실" },
    { key: "karaoke", icon: "mic_external_on", label: "노래방" },
    { key: "basketball", icon: "sports_basketball", label: "농구장" },
    { key: "campfire", icon: "local_fire_department", label: "캠프파이어" },
  ];

  const [checkedConveniences, setCheckedConveniences] = useState([]);

  const handleConvenienceChange = (key) => {
    setCheckedConveniences((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  return (
    <div className="box__room-filter">
      <div className="box__button-wrap">
        <button
          type="button"
          className="button__layer-open"
          ref={buttonRef1}
          onClick={() => layerOpen(buttonRef1)}
        >
          button1
        </button>
        <button
          type="button"
          className="button__layer-open"
          ref={buttonRef2}
          onClick={() => layerOpen(buttonRef2)}
        >
          button2
        </button>
        <button
          type="button"
          className="button__layer-open"
          ref={buttonRef3}
          onClick={() => layerOpen(buttonRef3)}
        >
          button3
        </button>
      </div>
      <div
        className="box__layer"
        style={activeLayer ? { display: "block" } : { display: "none" }}
        ref={layerRef}
      >
        <div className="box__dimmed" onClick={() => layerClose()}></div>
        <div className="box__layer-inner">
          <div className="box__heading">
            <h2>Filters</h2>
            <button
              type="button"
              className="button__close"
              onClick={() => layerClose()}
            >
              <span className="material-symbols-outlined image__icon">
                close_small
              </span>
            </button>
          </div>
          <div className="box__slider dual">
            <p className="text__label">Price Rage</p>
            <div className="range-container">
              <input
                type="range"
                min="0"
                max="100"
                value={minValue}
                onChange={handleMinChange}
                className="box__slider-track"
                style={backgroundStyle}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={maxValue}
                onChange={handleMaxChange}
                className="box__slider-track"
              />
            </div>
            <div className="text__value">
              {minValue}만원 ~ {maxValue}만원 이상
            </div>
          </div>
          <div className="box__slider">
            <p className="text__label">Search</p>
            <div className="box__search-wrap">
              <span className="material-symbols-outlined image__icon">
                search
              </span>
              <input
                type="search"
                className="form__seach"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="box__slider">
            <p className="text__label">편의시설</p>
            <label className="form__label-checkall">
              <input
                type="checkbox"
                className="form__check-all"
                checked={checkedConveniences.length === conveniences.length}
                onChange={() => {
                  if (checkedConveniences.length === conveniences.length) {
                    setCheckedConveniences([]);
                  } else {
                    setCheckedConveniences(
                      conveniences.map((item) => item.key)
                    );
                  }
                }}
              />
              전체선택
            </label>
            <ul className="list__convenience">
              {conveniences.map((item) => (
                <li
                  className={
                    checkedConveniences.includes(item.key)
                      ? "list-item list-item--active"
                      : "list-item"
                  }
                  key={item.key}
                >
                  <label className="form__label">
                    <span className="material-symbols-outlined image__icon">
                      {item.icon}
                    </span>
                    <input
                      type="checkbox"
                      className="form__checkbox"
                      checked={checkedConveniences.includes(item.key)}
                      onChange={() => handleConvenienceChange(item.key)}
                    />
                    {item.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="box__comfirm-wrap">
            <button type="button" className="button button__cencle">
              초기화
            </button>
            <button type="button" className="button button__submit">
              총 12개의 검색결과
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomFilter;
