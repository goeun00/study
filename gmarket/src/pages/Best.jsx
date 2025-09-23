import "./Best.css";
import {
  useState,
  useReducer,
  lazy,
  Suspense,
  useMemo,
  useCallback,
} from "react";
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

function withAccessGuard(Component, { fallback }) {
  return function Wrapped(props) {
    if (!props.canAccess) return fallback || null;
    return <Component {...props} />;
  };
}

function useBestCategoryReducer() {
  const init = { categoryActive: 0, subgroupActive: 0 };
  function reducer(state, action) {
    switch (action.type) {
      case "category":
        return { categoryActive: action.idx, subgroupActive: 0 };
      case "subCategory":
        return { ...state, subgroupActive: action.idx };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, init);
  const onClickCategory = useCallback(
    (idx) => {
      dispatch({ type: "category", idx });
    },
    [dispatch]
  );
  const onClickSubgroup = useCallback(
    (idx) => (e) => {
      e.preventDefault();
      dispatch({ type: "subCategory", idx });
    },
    [dispatch]
  );
  return {
    categoryActive: state.categoryActive,
    subgroupActive: state.subgroupActive,
    onClickCategory,
    onClickSubgroup,
  };
}

function MainCategory({ categoryData, categoryActive, onClickCategory }) {
  return (
    <Swiper
      className="list__category-filter list__1depth-filter"
      spaceBetween={0}
      slidesPerView="auto"
    >
      {categoryData.map((item, idx) => (
        <SwiperSlide key={idx}>
          <BestCategoryItem
            item={item}
            isActive={categoryActive === idx}
            onClick={() => onClickCategory(idx)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function SubCategory({ subGroups, subgroupActive, onClickSubgroup }) {
  return (
    <ul className="list__category-filter list__2depth-filter">
      {subGroups.map((item, idx) => (
        <li className="list-item" key={idx}>
          <a
            className={`link__category${
              subgroupActive === idx ? " link__category--active" : ""
            }`}
            href={`/n/best?groupCode=${item.groupCode}`}
            onClick={onClickSubgroup(idx)}
          >
            <span className="text__title">{item.groupSubName}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

const BestContent = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { BestDummyData } = await import("../data/BestDummyData");
  const [{ categoryData = [], item = [] } = {}] = BestDummyData;

  const Component = () => {
    const { categoryActive, subgroupActive, onClickCategory, onClickSubgroup } =
      useBestCategoryReducer();

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
              <MainCategory
                categoryData={categoryData}
                categoryActive={categoryActive}
                onClickCategory={onClickCategory}
              />

              {categoryActive > 0 && (
                <SubCategory
                  subGroups={categoryData[categoryActive].subGroups}
                  subgroupActive={subgroupActive}
                  onClickSubgroup={onClickSubgroup}
                />
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
  if (errorTest)
    throw new Error("정상동작하기로 변경 후 다시시도하면 정상화면노출");
  return <BestContent />;
}

const GuardedBestWrapper = withAccessGuard(BestWrapper, {
  fallback: <div className="box__error">접근 권한이 필요합니다</div>,
});

export default function Best() {
  const [errorTest, setErrorTest] = useState(false);
  const [canAccess, setCanAccess] = useState(true);

  return (
    <div id="container">
      <button
        type="button"
        className="button__error-toggle"
        onClick={() => setErrorTest((prev) => !prev)}
      >
        {errorTest ? "정상 동작하기" : " 에러 발생 시키기"}
      </button>
      <button
        type="button"
        className="button__access-toggle"
        onClick={() => setCanAccess((prev) => !prev)}
      >
        {canAccess ? "권한 제거하기" : "권한 부여하기"}
      </button>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <Suspense
          fallback={
            <div className="box__loading">
              <Lottie
                animationData={loadingLottie}
                loop={false}
                className="image__lottie"
              />
            </div>
          }
        >
          <GuardedBestWrapper errorTest={errorTest} canAccess={canAccess} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
