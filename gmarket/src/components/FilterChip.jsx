const FilterChip = ({ item, idx, setActive, active }) => {
  return (
    <label
      htmlFor={`ilter-chip` + idx}
      className={
        active === idx ? "filter-chip filter-chip--active" : "filter-chip"
      }
    >
      <input
        id={`ilter-chip` + idx}
        name="filter-chip_title"
        type="radio"
        className="filter-chip__checkbox"
        checked={active === idx}
        onChange={() => setActive(idx)}
      />
      <img
        src={
          active === idx
            ? item.brandLogoImage.onImageUrl
            : item.brandLogoImage.offImageUrl
        }
        alt={item.sdBrandName}
        className="image__brand-logo"
      />
    </label>
  );
};
export default FilterChip;
