const BestCategoryItem = ({ item, isActive, onClick }) => {
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
