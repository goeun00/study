import { useState } from "react";
import AgreeListItem from "./AgreeListItem";
import "./Agree.css";

const terms = [
  { id: 1, label: "일반자차 동의(필수)", essential: true },
  { id: 2, label: "개인정보 수집 동의(필수)", essential: true },
  { id: 3, label: "마케팅 수신 동의(선택)", essential: false },
];

const Agree = () => {
  const initialChecked = Object.fromEntries(
    terms.map((term) => [term.id, false])
  );
  const [checkedItems, setCheckedItems] = useState(initialChecked);
  const checkAll = terms.every((term) => checkedItems[term.id]);
  const essentialTerms = terms.filter((term) => term.essential);

  const essentialChecked = essentialTerms.every(
    (term) => checkedItems[term.id]
  );

  const handleAllChecked = (e) => {
    const isChecked = e.target.checked;
    const updated = Object.fromEntries(
      terms.map((term) => [term.id, isChecked])
    );
    setCheckedItems(updated);
  };

  const handleEssentialCheckedAll = (e) => {
    const isChecked = e.target.checked;
    setCheckedItems((prev) => ({
      ...prev,
      ...Object.fromEntries(essentialTerms.map((term) => [term.id, isChecked])),
    }));
  };

  const handleItemChecked = (id, isChecked) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: isChecked,
    }));
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
          onChange={handleEssentialCheckedAll}
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
