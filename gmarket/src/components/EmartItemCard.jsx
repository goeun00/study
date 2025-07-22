import { useState } from "react";

const formatNumber = (num) => {
  return num.toLocaleString();
};

const BestItemCard = ({ item, setAddCartLayer }) => {
  const [quantities, setQuantities] = useState(1);
  const [activeFavorite, setactiveFavorite] = useState(false);
  return (
    <>
      <div className="box__thumnail">
        {item.tagLabels.length > 0 && (
          <span className="box__thumbnail__label">
            {item.tagLabels[0].text}
          </span>
        )}
        <img src={item.imageUrl} alt="" className="image" />
      </div>
      <div className="box__element-info">
        <div className="element-info-qty">
          <button
            type="button"
            className="sprite__smilefresh--before element-info-qty-minus"
            onClick={() => setQuantities((prev) => Math.max(1, prev - 1))}
          >
            <span className="for-a11y">상품 수 감소</span>
          </button>
          <span className="element-info-item-qty">
            <span className="for-a11y">선택된 수량</span>
            {quantities}
          </span>
          <button
            type="button"
            className="sprite__smilefresh--before element-info-qty-plus"
            onClick={() => setQuantities((prev) => prev + 1)}
          >
            <span className="for-a11y">상품 수 증가</span>
          </button>
        </div>
        <button
          type="button"
          className="sprite__smilefresh--before element-info-cart"
          onClick={() => setAddCartLayer((prev) => !prev)}
        >
          <span className="for-a11y">장바구니 담기</span>
        </button>
      </div>
      <div className="box__info">
        <div className="text__title">{item.itemName}</div>
        <span className="box__itemcard-price-area">
          <span className="box__price-seller">
            <span className="for-a11y">판매가</span>
            <strong className="text__price-seller">
              {formatNumber(item.sellPrice)}
            </strong>
            <span className="text__unit">원</span>
          </span>
          {item.sellPrice !== item.itemPrice && (
            <span className="box__prime-cost">
              <span className="for-a11y">원가</span>
              <strong className="text__dc-rate">{item.discountRate}%</strong>
              <span className="text__prime-cost">
                {formatNumber(item.itemPrice)}
                <span className="text__unit">원</span>
              </span>
            </span>
          )}
        </span>
        <span className="box__itemcard-info-score">
          <span className="sprite__smilefresh--before box__score-awards">
            <span className="for-a11y">평점</span>
            <span className="text text__score">
              {formatNumber(item.reviewPoint.starPoint)}
            </span>
            <span className="for-a11y">후기</span>
            <span className="text text__num">
              ({formatNumber(item.reviewPoint.reviewCount)})
            </span>
            <span className="for-a11y">건</span>
          </span>
          <span className="box__score-buycnt">
            <span className="text text__buy">구매</span>
            <span className="text text__num">
              {formatNumber(item.buyCount)}
            </span>
            <span className="for-a11y">건</span>
          </span>
        </span>
        {item.couponDiscount && (
          <span className="box__itemcard-benefit-tag">
            <span className="box__tag box__tag-coupon">
              <span className="sprite__smilefresh--before box__inner">
                15% 쿠폰
              </span>
            </span>
          </span>
        )}
        <button
          type="button"
          className={
            "sprite__smilefresh--after button__favorite-item" +
            (activeFavorite ? " button__favorite--active" : "")
          }
          onClick={() => {
            setactiveFavorite((prev) => !prev);
          }}
        ></button>
      </div>
    </>
  );
};
export default BestItemCard;
