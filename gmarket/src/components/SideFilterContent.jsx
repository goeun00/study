import { useContext } from "react";
import { ItemFilterContext } from "../pages/ItemFilter";

const SideFilterContent = ({ title, options }) => {
  const {
    exclusiveDeliveryMethod,
    setExclusiveDeliveryMethod,
    multiDeliveryMethods,
    setMultiDeliveryMethods,
    activeCategory,
    setActiveCategory,
    activeBrand,
    setActiveBrand,
  } = useContext(ItemFilterContext);

  const isExclusiveItem = (item) => item === "이마트몰" || item === "스타배송";
  const isActive = (item) => {
    if (title === "배송유형") {
      return isExclusiveItem(item)
        ? exclusiveDeliveryMethod === item
        : multiDeliveryMethods.includes(item);
    }
    if (title === "카테고리") {
      return activeCategory === item;
    }
    if (title === "브랜드") {
      return activeBrand.includes(item);
    }
    return false;
  };

  const onToggle = (item) => {
    if (title === "배송유형") {
      if (isExclusiveItem(item)) {
        setExclusiveDeliveryMethod((prev) => (prev === item ? null : item));
      } else {
        setMultiDeliveryMethods((prev) =>
          prev.includes(item) ? prev.filter((m) => m !== item) : [...prev, item]
        );
      }
    } else if (title === "카테고리") {
      setActiveCategory((prev) => (prev === item ? null : item));
    } else if (title === "브랜드") {
      setActiveBrand((prev) =>
        prev.includes(item) ? prev.filter((m) => m !== item) : [...prev, item]
      );
    }
  };

  return (
    <div className="box__component">
      <div className="box__filter-content">
        <button className="button__filter-toggle">
          <span className="text__title">{title}</span>
        </button>
        <ul className="list__category">
          {options.map((item, idx) => (
            <li className="list-item" key={idx}>
              <label className="form__label">
                {item}
                <input
                  type="checkbox"
                  checked={isActive(item)}
                  onChange={() => onToggle(item)}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideFilterContent;
