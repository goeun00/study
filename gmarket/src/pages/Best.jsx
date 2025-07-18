import "./Best.css";
import { useState } from "react";
import ItemCard from "../components/BestItemCard";
import BestCategoryItem from "../components/BestCategoryItem";
import { BestDummyData } from "../data/BestDummyData";
import { Swiper, SwiperSlide } from "swiper/react";

const Best = () => {
  const [{ categoryData = [], item = [] } = {}] = BestDummyData;
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <div id="container">
      <div className="service__best">
        <div className="box__best-list">
          <div className="box__best-title">
            <h2 className="text__title">G마켓 베스트</h2>
            <div className="box__tooltip-info">
              <button type="button" className="button__tooltip">
                <span className="for-a11y">안내창</span>
              </button>
            </div>
          </div>
          <div className="box__sub-category" role="navigation">
            <h3 className="for-a11y">카테고리</h3>
            <div className="box__category-filter">
              <Swiper
                className="list__category-filter list__1depth-filter"
                spaceBetween={0}
                slidesPerView={"auto"}
              >
                {categoryData.map((item, idx) => (
                  <SwiperSlide>
                    <BestCategoryItem
                      item={item}
                      key={idx}
                      isActive={activeIdx === idx}
                      onClick={() => setActiveIdx(idx)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <ul
                className="list__category-filter list__2depth-filter"
                aria-label="신선식품"
              >
                <li className="list-item">
                  <a
                    className="link__category link__category--active"
                    aria-current="true"
                    href="/n/best?groupCode=100000006"
                    data-montelena-acode="200000319"
                    data-montelena-asn="1"
                    data-montelena-categoryname="전체"
                    data-montelena-topcategorycode="100000006"
                    data-montelena-topcategoryname="신선식품"
                  >
                    <span className="text__title">전체</span>
                  </a>
                </li>
                <li className="list-item">
                  <a
                    className="link__category"
                    aria-current="false"
                    href="/n/best?groupCode=100000006&amp;subGroupCode=200000042"
                    data-montelena-acode="200000319"
                    data-montelena-asn="2"
                    data-montelena-categorycode="200000042"
                    data-montelena-categoryname="과일/야채"
                    data-montelena-topcategorycode="100000006"
                    data-montelena-topcategoryname="신선식품"
                  >
                    <span className="text__title">과일/야채</span>
                  </a>
                </li>
                <li className="list-item">
                  <a
                    className="link__category"
                    aria-current="false"
                    href="/n/best?groupCode=100000006&amp;subGroupCode=200000039"
                    data-montelena-acode="200000319"
                    data-montelena-asn="3"
                    data-montelena-categorycode="200000039"
                    data-montelena-categoryname="쌀/잡곡/견과류"
                    data-montelena-topcategorycode="100000006"
                    data-montelena-topcategoryname="신선식품"
                  >
                    <span className="text__title">쌀/잡곡/견과류</span>
                  </a>
                </li>
                <li className="list-item">
                  <a
                    className="link__category"
                    aria-current="false"
                    href="/n/best?groupCode=100000006&amp;subGroupCode=200000041"
                    data-montelena-acode="200000319"
                    data-montelena-asn="4"
                    data-montelena-categorycode="200000041"
                    data-montelena-categoryname="축산"
                    data-montelena-topcategorycode="100000006"
                    data-montelena-topcategoryname="신선식품"
                  >
                    <span className="text__title">축산</span>
                  </a>
                </li>
                <li className="list-item">
                  <a
                    className="link__category"
                    aria-current="false"
                    href="/n/best?groupCode=100000006&amp;subGroupCode=200000040"
                    data-montelena-acode="200000319"
                    data-montelena-asn="5"
                    data-montelena-categorycode="200000040"
                    data-montelena-categoryname="수산"
                    data-montelena-topcategorycode="100000006"
                    data-montelena-topcategoryname="신선식품"
                  >
                    <span className="text__title">수산</span>
                  </a>
                </li>
                <li className="list-item">
                  <a
                    className="link__category"
                    aria-current="false"
                    href="/n/best?groupCode=100000006&amp;subGroupCode=200000043"
                    data-montelena-acode="200000319"
                    data-montelena-asn="6"
                    data-montelena-categorycode="200000043"
                    data-montelena-categoryname="김치/반찬"
                    data-montelena-topcategorycode="100000006"
                    data-montelena-topcategoryname="신선식품"
                  >
                    <span className="text__title">김치/반찬</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ul className="list__best">
            {item.map((item, idx) => (
              <ItemCard item={item} key={idx} idx={idx} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Best;
