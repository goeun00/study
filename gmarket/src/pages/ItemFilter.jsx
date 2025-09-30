import MiniFilter from "../components/MiniFilter";
import DynamicFilter from "../components/DynamicFilter";
import SideFilterContent from "../components/SideFilterContent";
import "./ItemFilter.css";
import { useAtom, useSetAtom, useAtomValue, Provider } from "jotai";

import {
  filterButtonActiveAtom,
  resetFiltersAtom,
  selectedValuesAtom,
} from "../atom/atom";

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

  const [filterButtonActive, setFilterButtonActive] = useAtom(
    filterButtonActiveAtom
  );

  const resetFilters = useSetAtom(resetFiltersAtom);
  const selectedValues = useAtomValue(selectedValuesAtom);

  return (
    <>
      <div className="box__dynamic-filter">
        <DynamicFilter title="카테고리" option={category} />
        <DynamicFilter title="브랜드" option={brand} />
      </div>
      <div className="box__mini-filter">
        <button
          className={`button__filter-layer ${
            selectedValues > 0 ? "button--active" : ""
          }`}
          onClick={() => setFilterButtonActive((prev) => !prev)}
        >
          {selectedValues > 0 && (
            <span className="text__selected-number">{selectedValues}</span>
          )}
        </button>
        <MiniFilter deliverymethod={deliverymethod} />
      </div>

      <div className="box__mini-filter">
        <MiniFilter deliverymethod={deliverymethod} />
      </div>

      <Provider>
        <div className="box__mini-filter">
          <MiniFilter deliverymethod={deliverymethod} />
        </div>
      </Provider>

      {filterButtonActive && (
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
      )}
    </>
  );
};

export default ItemFilter;
