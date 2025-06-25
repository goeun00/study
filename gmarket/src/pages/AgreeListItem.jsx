import { useState } from "react";

const AgreeListItem = ({ label, checkedAll, checked, onChange }) => {
  const [expand, setExpand] = useState(false);

  return (
    <li className={`list-item__term ${checkedAll ? "list__all-agree" : ""}`}>
      <div className={`box__form--checkbox`}>
        <label className="label">
          <input
            type="checkbox"
            className="form__checkbox sprite__rentcar-res"
            checked={checked}
            onChange={onChange}
          />
          {label}
        </label>
      </div>
      {!checkedAll && (
        <>
          <button
            className={`button__detail sprite__rentcar-res--after ${
              expand ? "button__detail-expand" : ""
            }`}
            onClick={() => setExpand((prev) => !prev)}
          >
            {expand ? "간단히" : "자세히"}
          </button>
          {expand && (
            <div className="text__detail-term">
              <strong className="text__emphasis">수집 및 이용 목적</strong>
              <p className="text__term">상품 예약 및 확인, 관련 문의 응대</p>
              <strong className="text__emphasis">항목</strong>
              <p className="text__term">예약자정보: 이름, 이메일, 연락처</p>
              <p className="text__term">운전자정보: 이름, 생년월일, 연락처</p>
              <strong className="text__emphasis">보유 및 이용기간</strong>
              <p className="text__term">렌터카 이용 시작일부터 1년간 보관</p>
              <p className="text__term">
                개인정보 수집 및 이용 동의를 거부하실 수 있습니다.
              </p>
              <p className="text__term">
                단, 동의하지 않으실 경우 서비스 제공이 제한될 수 있습니다.
              </p>
            </div>
          )}
        </>
      )}
    </li>
  );
};

export default AgreeListItem;
