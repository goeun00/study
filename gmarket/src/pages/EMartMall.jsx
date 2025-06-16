import "./EmartMall.css";
import { EmartDummyData } from "../data/EmartDummyData";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import EmartItemCard from "../components/EmartItemCard";
import FilterChip from "../components/FilterChip";

const EMartMall = () => {
  const [active, setActive] = useState(0);
  const [AddCartLayer, setAddCartLayer] = useState(false);
  const items = EmartDummyData.sdBrandItemCatalogs[active].items;
  const filledItems = [
    ...items,
    ...items.slice(0, (4 - (items.length % 4)) % 4),
  ];
  return (
    <div className="smilefresh">
      <div className="box__sub-category box__sub-category-type1">
        <div className="box__sub-category-inner">
          <h2 className="text__title" id="">
            {EmartDummyData.title1 + " " + EmartDummyData.title2}
          </h2>
          <div className="box__chip-group brand-type">
            <div className="box__chip-group-inner" role="radiogroup">
              {EmartDummyData.sdBrandItemCatalogs.map((item, idx) => (
                <FilterChip
                  key={idx}
                  item={item}
                  idx={idx}
                  setActive={setActive}
                  active={active}
                />
              ))}
            </div>
          </div>
          <a
            href="https://www.gmarket.co.kr/n/emartmall/brand"
            className="sprite__smilefresh--after link__view-all"
            data-montelena-acode="200007539"
          >
            <span className="for-a11y">믿고 장보는 공식 브랜드</span>
            전체보기
          </a>
        </div>
      </div>
      <div className="box__emart-mall">
        <Swiper
          className="list__emart-mall"
          slidesPerView={4}
          slidesPerGroup={4}
          spaceBetween={20}
          loop={true}
          key={active}
          modules={[Navigation]}
          navigation={{
            nextEl: ".button__swiper-next",
            prevEl: ".button__swiper-prev",
          }}
        >
          {filledItems.map((item, idx) => (
            <SwiperSlide key={idx}>
              <EmartItemCard
                item={item}
                idx={idx}
                setAddCartLayer={setAddCartLayer}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="box__button-wrap">
          <a
            href="https://www.gmarket.co.kr/n/emartmall/brand?brandCode=31170"
            className="link__all sprite__smilefresh--after"
            data-montelena-acode="200007543"
          >
            <span className="text_highlight">
              {EmartDummyData.sdBrandItemCatalogs[active].sdBrandName}
            </span>
            전체보기
          </a>
        </div>
        <button
          type="button"
          className="sprite__smilefresh button__swiper-prev"
          aria-label="이전 상품 리스트"
          tabIndex="0"
        ></button>
        <button
          type="button"
          className="sprite__smilefresh button__swiper-next"
          aria-label="다음 상품 리스트"
          tabIndex="0"
        ></button>
      </div>
      <div
        className="box__layer"
        style={AddCartLayer ? { display: "block" } : { display: "none" }}
      >
        <div
          className="box__dimmed"
          onClick={() => setAddCartLayer(false)}
        ></div>
        <div className="box__layer-cart">
          <p className="text__subject">장바구니에 담을까요? </p>
          <button
            type="button"
            className="button button__confirm"
            onClick={() => setAddCartLayer(false)}
          >
            담기
          </button>
          <button
            type="button"
            className="button button__cencle"
            onClick={() => setAddCartLayer(false)}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
export default EMartMall;
