import { useAtom } from "jotai";

import {
  exclusiveDeliveryMethodAtom,
  multiDeliveryMethodsAtom,
} from "../atom/atom";

const MiniFilter = ({ deliverymethod }) => {
  const [exclusiveDeliveryMethod, setExclusiveDeliveryMethod] = useAtom(
    exclusiveDeliveryMethodAtom
  );
  const [multiDeliveryMethods, setMultiDeliveryMethods] = useAtom(
    multiDeliveryMethodsAtom
  );

  return (
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
  );
};

export default MiniFilter;
