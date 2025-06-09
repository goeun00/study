import React from "react";

const BestCategoryItem = ({ item, idx, isActive, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <li className="list-item">
      <a
        aria-current={isActive ? "true" : "false"}
        className={`link__category${isActive ? " link__category--active" : ""}`}
        href="#"
        data-montelena-acode="200000318"
        data-montelena-asn={idx + 1}
        data-montelena-categorycode={item.groupCode}
        data-montelena-categoryname={item.groupName}
        onClick={handleClick}
      >
        <span className="box__thumbnail">
          <img
            src={item.imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="image"
          />
        </span>
        <span className="text__title">{item.groupName}</span>
      </a>
    </li>
  );
};

export default BestCategoryItem;
