import { useAtom } from "jotai";

import { activeCategoryAtom, activeBrandAtom } from "../atom/atom";

const DynamicFilter = ({ title, option }) => {
  const isCategory = title === "카테고리";

  const [activeCategory, setActiveCategory] = useAtom(activeCategoryAtom);
  const [activeBrand, setActiveBrand] = useAtom(activeBrandAtom);

  return (
    <ul className="list__dynamic-filter">
      <li className="list-item">
        <p className="text__title">{title}</p>
        <div className="box__option">
          {option.map((item, idx) => {
            const isActive = isCategory
              ? activeCategory === item
              : activeBrand.includes(item);
            return (
              <button
                key={idx}
                className={`button__filter ${
                  isActive ? "button__filter--active" : ""
                }`}
                onClick={() =>
                  isCategory
                    ? setActiveCategory((prev) => (prev === item ? null : item))
                    : setActiveBrand((prev) =>
                        prev.includes(item)
                          ? prev.filter((m) => m !== item)
                          : [...prev, item]
                      )
                }
              >
                {item}
              </button>
            );
          })}
        </div>
      </li>
    </ul>
  );
};
export default DynamicFilter;
