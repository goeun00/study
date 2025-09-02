import { useState, createContext } from "react";
import MiniFilter from "../components/MiniFilter";
import DynamicFilter from "../components/DynamicFilter";
import SideFilterContent from "../components/SideFilterContent";
import "./ItemFilter.css";

export const ItemFilterContext = createContext();

const ItemFilter = () => {
  const deliverymethod = [
    "이마트몰",
    "스타배송",
    "당일배송",
    "오늘출발",
    "무료배송",
  ];
  const category = ["봉지라면", "컵라면"];
  const brand = [
    "안성탕면",
    "농심",
    "오뚜기",
    "진라면",
    "삼양",
    "팔도",
    "신라면",
    "열라면",
    "짜파게티",
  ];

  const [exclusiveDeliveryMethod, setExclusiveDeliveryMethod] = useState(null);
  const [multiDeliveryMethods, setMultiDeliveryMethods] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeBrand, setActiveBrand] = useState([]);
  const [filterButtonActive, setFilterButtonActive] = useState(null);

  const selectedValues = [
    ...(exclusiveDeliveryMethod ? [exclusiveDeliveryMethod] : []),
    ...(activeCategory ? [activeCategory] : []),
    ...multiDeliveryMethods,
    ...activeBrand,
  ];
  const resetFilters = () => {
    setExclusiveDeliveryMethod(null);
    setMultiDeliveryMethods([]);
    setActiveCategory(null);
    setActiveBrand([]);
  };
  return (
    <ItemFilterContext.Provider
      value={{
        exclusiveDeliveryMethod,
        setExclusiveDeliveryMethod,
        multiDeliveryMethods,
        setMultiDeliveryMethods,
        activeCategory,
        setActiveCategory,
        activeBrand,
        setActiveBrand,
        filterButtonActive,
        setFilterButtonActive,
      }}
    >
      <div className="box__dynamic-filter">
        <DynamicFilter title="카테고리" option={category} />
        <DynamicFilter title="브랜드" option={brand} />
      </div>
      <MiniFilter
        deliverymethod={deliverymethod}
        selectedValues={selectedValues.length}
      />
      <div
        className={`region__content-filter ${
          filterButtonActive ? "fixed" : ""
        }`}
      >
        <div
          className="box__dimmed"
          onClick={() => setFilterButtonActive((prev) => !prev)}
        ></div>
        <div className="box__filter-container">
          <div className="box__component-filter-title">
            <h3 className="text__title">필터</h3>
            <div className="box__fillter-reset">
              <button className="button__filter-reset" onClick={resetFilters}>
                모두지우기
              </button>
            </div>
          </div>
          <SideFilterContent title="배송유형" options={deliverymethod} />
          <SideFilterContent title="카테고리" options={category} />
          <SideFilterContent title="브랜드" options={brand} />
        </div>
      </div>
    </ItemFilterContext.Provider>
  );
};

export default ItemFilter;
