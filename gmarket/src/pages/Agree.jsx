import { useReducer } from "react";
import AgreeListItem from "./AgreeListItem";
import "./Agree.css";

const terms = [
  { id: 1, label: "일반자차 동의(필수)", essential: true },
  { id: 2, label: "개인정보 수집 동의(필수)", essential: true },
  { id: 3, label: "마케팅 수신 동의(선택)", essential: false },
];

// 체크박스 change케이스 reducer함수
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_ITEM":
      return {
        ...state,
        [action.id]: action.checked,
      };
    case "CHECK_ALL":
      return Object.fromEntries(terms.map((term) => [term.id, action.checked]));
    case "CHECK_ESSENTIAL":
      return {
        ...state,
        ...Object.fromEntries(
          terms
            .filter((term) => term.essential)
            .map((term) => [term.id, action.checked])
        ),
      };
    default:
      return state;
  }
};

const Agree = () => {
  const initialChecked = Object.fromEntries(
    terms.map((term) => [term.id, false])
  );

  const [checkedItems, dispatch] = useReducer(reducer, initialChecked);
  const checkAll = terms.every((term) => checkedItems[term.id]);
  const essentialChecked = terms.every(
    (term) => !term.essential || checkedItems[term.id]
  );

  const handleAllChecked = (e) => {
    dispatch({ type: "CHECK_ALL", checked: e.target.checked });
  };
  const handleEssentialChecked = (e) => {
    dispatch({ type: "CHECK_ESSENTIAL", checked: e.target.checked });
  };
  const handleItemChecked = (id, checked) => {
    dispatch({ type: "TOGGLE_ITEM", id, checked });
  };

  return (
    <div className="box__form">
      <h3 className="text__title-form">예약 동의사항</h3>
      <ul className="list__term">
        <AgreeListItem
          label="전체 동의"
          checkedAll
          checked={checkAll}
          onChange={handleAllChecked}
        />
        <AgreeListItem
          label="필수사항 동의"
          checkedAll
          checked={essentialChecked}
          onChange={handleEssentialChecked}
        />
        {terms.map((item) => (
          <AgreeListItem
            key={item.id}
            label={item.label}
            checked={checkedItems[item.id]}
            onChange={(e) => handleItemChecked(item.id, e.target.checked)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Agree;
