const ItemCard = ({ item, idx }) => {
  return (
    <li className="list-item">
      <a
        href="http://item.gmarket.co.kr/Item?goodscode=2704155884"
        class="link"
        data-montelena-acode="200000680"
        data-montelena-categorycode="100000006"
        data-montelena-goodsname="2024년산 어사명품 삼광쌀 10kg/특등급"
        data-montelena-asn="1"
        data-montelena-goodscode="2704155884"
      >
        <div class="box__thumbnail">
          <img
            src={item.imageUrl + "/300"}
            alt="1위"
            loading="lazy"
            decoding="async"
            class="image"
          />
          <span class="box__label-rank">{idx + 1}</span>
        </div>
        <div class="box__item-info">
          <p class="box__item-title">{item.goodsName}</p>
          <div class="box__item-price">
            <div class="box__price">
              <span class="text__price-title">쿠폰적용가</span>
              <div class="box__price-original">
                <span class="for-a11y">원가</span>
                <span class="text text__value">{item.price}</span>
                <span class="text text__unit">원</span>
              </div>
            </div>
            <div class="box__price">
              {item.price !== item.discountPrice && (
                <div class="box__discount">
                  <span class="for-a11y">할인율</span>
                  <span class="text text__value">
                    {Math.round(
                      ((Number(item.price.replace(/,/g, "")) -
                        Number(item.discountPrice.replace(/,/g, ""))) /
                        Number(item.price.replace(/,/g, ""))) *
                        100
                    ) + "%"}
                  </span>
                </div>
              )}

              <div class="box__price-seller">
                <span class="for-a11y">판매가</span>
                <span class="text text__value">{item.discountPrice}</span>
                <span class="text text__unit">원</span>
              </div>
              <div class="box__information-tags">
                {item.isFreeShipping && (
                  <span class="icon__tag icon__delivery-free">
                    <img
                      src="//pics.gmarket.co.kr/pc/single/kr/snowwhite/common/icon_deliveyfree_2x.png"
                      alt="무료배송"
                      loading="lazy"
                      decoding="async"
                      class="image"
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
export default ItemCard;
