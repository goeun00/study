const MovieRankItem = ({ item, isExpanded, onExpand }) => {
  return (
    <div className="box_item">
      <p className="text_rank">{String(item.rank).padStart(2, "0")}</p>
      <a href="#" className="link" onClick={onExpand}>
        <div className={"box_thumnail" + (isExpanded ? " box-expand" : "")}>
          <button type="button" className="button_expand">
            {!isExpanded ? <span className="icon material-symbols-outlined">expand_content</span> : <span className="icon material-symbols-outlined">collapse_content</span>}
          </button>
          {item.posterUrl ? <img src={item.posterUrl} alt={item.title} className="image_poster" /> : <div className="image_poster"></div>}
        </div>
      </a>
      <a
        href="#"
        className="link"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div className="box_info">
          <p className="text_title">{item.title}</p>
          <p className="text_title-sub">{item.titleEng}</p>
          <p className="text_detail">
            <span className="text_num">
              <b>Date</b>: {item.openDt}
            </span>
            <span className="text_num">
              <b>Audience</b>: {item.audiCnt}명
            </span>
          </p>
        </div>
      </a>
    </div>
  );
};
export default MovieRankItem;
