import { useAtom, useSetAtom } from "jotai";
import { bookmarkAtom, bookmarkMotionAtom } from "../atom/atom";
import { Link } from "react-router-dom";

const ListItem = ({ item, typeLabel, type, isExpanded, onExpand }) => {
  const clearTitle = (text) =>
    text
      .replace(/(?<!^\s*)\([^()]*\)/g, "")
      .replace(/[()]/g, "")
      .trimEnd();

  const [bookmark, setBookmark] = useAtom(bookmarkAtom);
  const setBookmarkMotion = useSetAtom(bookmarkMotionAtom);
  const isBookmarked = bookmark.some((movie) => String(movie.movieSeq) === String(item.movieSeq));

  const toggleBookmark = (movie) => {
    let isAdded = false;
    setBookmark((prev) => {
      const exists = prev.some((m) => String(m.movieSeq) === String(movie.movieSeq));
      if (exists) {
        return prev.filter((m) => String(m.movieSeq) !== String(movie.movieSeq));
      }
      isAdded = true;
      return [...prev, movie];
    });
    if (isAdded) {
      setBookmarkMotion(false);
      requestAnimationFrame(() => {
        setBookmarkMotion(true);
      });
    }
  };

  const highlightHS = (text) => {
    if (!text) return "";
    return text.replace(/ !HS (.*?) !HE /g, "$1");
  };

  return (
    <>
      {type === "rank" ? (
        <div className="box_item">
          <p className="text_rank">{String(item.rank).padStart(2, "0")}</p>
          <span className="link" onClick={onExpand}>
            <div className={"box_thumnail" + (isExpanded ? " box-expand" : "")}>
              <button type="button" className="button_expand">
                {!isExpanded ? <span className="icon material-symbols-outlined">expand_content</span> : <span className="icon material-symbols-outlined">collapse_content</span>}
              </button>
              {item.posterUrl ? <img src={item.posterUrl} alt={item.title} className="image_poster" /> : <div className="image_poster"></div>}
            </div>
          </span>
          <div className="box_info">
            <div className="box_button-wrap">
              <button
                className={`button_bookmark`}
                onClick={() => {
                  toggleBookmark(item);
                }}
              >
                <span className={`material-symbols-outlined icon ${isBookmarked ? "fill" : ""}`}>favorite</span>
              </button>
              <Link className="link_detail" to={`/movie/${item.movieId}/${item.movieSeq}`}>
                <span className="material-symbols-outlined icon">open_in_new</span>
              </Link>
            </div>
            <p className="text_title">{item.title}</p>
            <p className="text_title-sub">{clearTitle(item.titleEng)}</p>
            <p className="text_detail">
              <span className="text_num">
                <b>Date</b>: {item.openDt}
              </span>
              <span className="text_num">
                <b>Audience</b>: {item.audiCnt}명
              </span>
            </p>
          </div>
        </div>
      ) : (
        <li className="list-item">
          <button
            className={`button_bookmark`}
            onClick={() => {
              toggleBookmark(item);
            }}
          >
            <span className={`material-symbols-outlined icon ${isBookmarked ? "fill" : ""}`}>favorite</span>
          </button>
          <Link to={`/movie/${item.movieId}/${item.movieSeq}`}>
            <div className="box_item">
              <div className="box_thumnail">
                {typeLabel && <span className="box_type-label">{item.matchType}</span>}
                {type === "review" ? <>{item.stllsUrl ? <img className="image_poster" src={item.stllsUrl} alt="" /> : <span className="empty">Filmory</span>}</> : <> {item.posterUrl ? <img className="image_poster" src={item.posterUrl} alt="" /> : <span className="empty">Filmory</span>}</>}
              </div>
              <div className="box_info">
                <p className="text_title" dangerouslySetInnerHTML={{ __html: highlightHS(item.title) }} />
                {item.titleEng ? <p className="text_title-sub" dangerouslySetInnerHTML={{ __html: highlightHS(clearTitle(item.titleEng)) }} /> : <p className="text_title-sub" dangerouslySetInnerHTML={{ __html: highlightHS(clearTitle(item.titleOrg)) }} />}
                <p className="text_detail">
                  <span className="text_num">
                    <b>{item.prodYear}</b>
                  </span>
                  <span className="text_num text_director" dangerouslySetInnerHTML={{ __html: highlightHS(item.directors) }} />
                </p>
              </div>
            </div>
          </Link>
        </li>
      )}
    </>
  );
};
export default ListItem;
