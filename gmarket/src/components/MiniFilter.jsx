import { useContext } from "react";
import { ItemFilterContext } from "../pages/ItemFilter";

const MiniFilter = ({ deliverymethod, selectedValues }) => {
  const {
    exclusiveDeliveryMethod,
    setExclusiveDeliveryMethod,
    multiDeliveryMethods,
    setMultiDeliveryMethods,
    setFilterButtonActive,
  } = useContext(ItemFilterContext);

  return (
    <div className="box__mini-filter">
      <button
        className={`button__filter-layer ${
          selectedValues > 0 ? "button--active" : ""
        }`}
        onClick={() => setFilterButtonActive((prev) => !prev)}
      >
        {selectedValues > 0 ? (
          <span className="text__selected-number">{selectedValues}</span>
        ) : (
          ""
        )}
      </button>
      <ul className="list__mini-filter">
        {deliverymethod.map((item, idx) => {
          const isExclusive = item === "이마트몰" || item === "스타배송";
          const isActive = isExclusive
            ? exclusiveDeliveryMethod === item
            : multiDeliveryMethods.includes(item);

          return (
            <li
              key={idx}
              className={`list-item ${isActive ? "list-item--active" : ""}`}
            >
              <button
                type="button"
                className="button__filter"
                onClick={() =>
                  isExclusive
                    ? setExclusiveDeliveryMethod((prev) =>
                        prev === item ? null : item
                      )
                    : setMultiDeliveryMethods((prev) =>
                        prev.includes(item)
                          ? prev.filter((m) => m !== item)
                          : [...prev, item]
                      )
                }
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MiniFilter;
