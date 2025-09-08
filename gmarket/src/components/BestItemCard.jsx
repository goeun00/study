const getDiscountRate = (priceStr, discountStr) => {
  const price = Number(priceStr.replace(/,/g, ""));
  const discount = Number(discountStr.replace(/,/g, ""));
  const rate = ((price - discount) / price) * 100;
  return `${Math.round(rate)}%`;
};
const BestItemCard = ({ item, idx }) => {
  return (
    <li className="list-item">
      <a
        href={`http://item.gmarket.co.kr/Item?goodscode=${item.goodsCode}`}
        className="link"
      >
        <div className="box__thumbnail">
          <img
            src={item.imageUrl + "/300"}
            alt="1위"
            loading="lazy"
            decoding="async"
            className="image"
          />
          <span className="box__label-rank">{idx + 1}</span>
        </div>
        <div className="box__item-info">
          <p className="box__item-title">{item.goodsName}</p>
          <div className="box__item-price">
            <div className="box__price">
              <span className="text__price-title">쿠폰적용가</span>
              <div className="box__price-original">
                <span className="for-a11y">원가</span>
                <span className="text text__value">{item.price}</span>
                <span className="text text__unit">원</span>
              </div>
            </div>
            <div className="box__price">
              {item.price !== item.discountPrice && (
                <div className="box__discount">
                  <span className="for-a11y">할인율</span>
                  <span className="text text__value">
                    {getDiscountRate(item.price, item.discountPrice)}
                  </span>
                </div>
              )}

              <div className="box__price-seller">
                <span className="for-a11y">판매가</span>
                <span className="text text__value">{item.discountPrice}</span>
                <span className="text text__unit">원</span>
              </div>
              <div className="box__information-tags">
                {item.isFreeShipping && (
                  <span className="icon__tag icon__delivery-free">
                    <img
                      src="//pics.gmarket.co.kr/pc/single/kr/snowwhite/common/icon_deliveyfree_2x.png"
                      alt="무료배송"
                      loading="lazy"
                      decoding="async"
                      className="image"
                    />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};
export default BestItemCard;
