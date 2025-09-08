import "./Best.css";
import { useState, lazy, Suspense, useMemo, useCallback } from "react";
import ItemCard from "../components/BestItemCard";
import BestCategoryItem from "../components/BestCategoryItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { ErrorBoundary } from "react-error-boundary";
import Lottie from "lottie-react";
import loadingLottie from "../assets/loading.json";

function FallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div className="box__error">
      <p>Error!!: {error.message}</p>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  );
}

const BestContent = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { BestDummyData } = await import("../data/BestDummyData");
  const [{ categoryData = [], item = [] } = {}] = BestDummyData;

  const Component = () => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [subgropActive, setSubgropActive] = useState(0);

    const handleClickCategory = useCallback((idx) => {
      setActiveIdx(idx);
      setSubgropActive(0);
    }, []);

    const handleClickSubgroup = useCallback(
      (idx) => (e) => {
        e.preventDefault();
        setSubgropActive(idx);
      },
      []
    );

    const itemCards = useMemo(
      () =>
        item.map((target, idx) => (
          <ItemCard item={target} key={idx} idx={idx} />
        )),
      [item]
    );

    return (
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
                slidesPerView="auto"
              >
                {categoryData.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <BestCategoryItem
                      item={item}
                      isActive={activeIdx === idx}
                      onClick={() => handleClickCategory(idx)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {activeIdx > 0 && (
                <ul className="list__category-filter list__2depth-filter">
                  {categoryData[activeIdx].subGroups.map((item, idx) => (
                    <li className="list-item" key={idx}>
                      <a
                        className={`link__category${
                          subgropActive === idx ? " link__category--active" : ""
                        }`}
                        href={`/n/best?groupCode=${item.groupCode}`}
                        onClick={handleClickSubgroup(idx)}
                      >
                        <span className="text__title">{item.groupSubName}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <ul className="list__best">{itemCards}</ul>
        </div>
      </div>
    );
  };
  return { default: Component };
});

function BestWrapper({ errorTest }) {
  if (errorTest) throw new Error("테스트용 에러");
  return <BestContent />;
}

const Best = () => {
  const [errorTest, setErrorTest] = useState(false);

  return (
    <div id="container">
      <button
        type="button"
        className="button__error-toggle"
        onClick={() => setErrorTest((prev) => !prev)}
      >
        {errorTest ? "정상 동작" : " 에러 발생"}
      </button>

      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <Suspense
          fallback={
            <div className="box__loading">
              <Lottie
                animationData={loadingLottie}
                loop={false}
                className={`image__lottie`}
              />
            </div>
          }
        >
          <BestWrapper errorTest={errorTest} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Best;
