import { useState } from "react";
const MovieRankItem = ({ movie }) => {
  const [expandThumnail, setExpandThumnail] = useState(false);
  return (
    <div className="box_item">
      <p className="text_rank">{String(movie.rank).padStart(2, "0")}</p>
      <a
        href="#"
        className="link"
        onClick={(e) => {
          e.preventDefault();
          setExpandThumnail((prev) => !prev);
        }}
      >
        <div className={"box_thumnail" + (expandThumnail ? " box-expand" : "")}>
          <button type="button" className="button_expand">
            {!expandThumnail ? (
              <span className="icon material-symbols-outlined">
                expand_content
              </span>
            ) : (
              <span className="icon material-symbols-outlined">
                collapse_content
              </span>
            )}
          </button>
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={movie.movieNm}
              className="image_poster"
            />
          ) : (
            <div className="image_poster"></div>
          )}
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
          <p className="text_title">{movie.movieNm}</p>
          <p className="text_title-eng">{movie.titleEng}</p>
          <p className="text_detail">
            <span className="text_num">
              <b>Date</b>: {movie.openDt}
            </span>
            <span className="text_num">
              <b>Audience</b>: {movie.audiCnt}명
            </span>
          </p>
        </div>
      </a>
    </div>
  );
};
export default MovieRankItem;
