import { useState } from "react";
import AgreeListItem from "./AgreeListItem";
import "./Agree.css";

const terms = [
  { id: 1, label: "일반자차 동의(필수)" },
  { id: 2, label: "개인정보 수집 동의(필수)" },
  { id: 3, label: "마케팅 수신 동의(선택)" },
];

const AgreeList = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [checkAll, setCheckAll] = useState(false);

  const handleAllChange = (e) => {
    const isChecked = e.target.checked;
    const newCheckedItems = {};
    terms.forEach((item) => {
      newCheckedItems[item.id] = isChecked;
    });
    setCheckedItems(newCheckedItems);
    setCheckAll(isChecked);
  };

  const handleItemChange = (id, isChecked) => {
    const newCheckedItems = {
      ...checkedItems,
      [id]: isChecked,
    };
    setCheckedItems(newCheckedItems);

    const allChecked = terms.every((item) => newCheckedItems[item.id]);
    setCheckAll(allChecked);
  };

  return (
    <div className="box__form">
      <h3 className="text__title-form">예약 동의사항</h3>
      <ul className="list__term">
        <AgreeListItem
          key="all"
          label="전체 동의"
          listAll
          checked={checkAll}
          onChange={handleAllChange}
        />
        {terms.map((item) => (
          <AgreeListItem
            key={item.id}
            label={item.label}
            checked={checkedItems[item.id] || false}
            onChange={(e) => handleItemChange(item.id, e.target.checked)}
          />
        ))}
      </ul>
    </div>
  );
};

export default AgreeList;
