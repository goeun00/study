import { useAtom } from "jotai";
import { bookmarkAtom } from "../atom/atom";

const SearchItem = ({ item, typeLabel, type }) => {
  const [bookmark, setBookmark] = useAtom(bookmarkAtom);
  const isBookmarked = bookmark.some((movie) => String(movie.movieSeq) === String(item.movieSeq));

  const toggleBookmark = (movie) => {
    setBookmark((prev) => {
      const exists = prev.some((m) => String(m.movieSeq) === movie.movieSeq);
      if (exists) {
        return prev.filter((m) => String(m.movieSeq) !== movie.movieSeq);
      }
      return [
        ...prev,
        {
          movieSeq: movie.movieSeq,
          title: movie.title,
          posterUrl: movie.posterUrl,
          prodYear: movie.prodYear,
          titleEng: movie.titleEng,
          directors: movie.directors,
          actors: movie.actors,
          stllsUrl: movie.stllsUrl,
        },
      ];
    });
  };

  const highlightHS = (text) => {
    if (!text) return "";
    return text.replace(/!HS(.*?)!HE/g, '<span class="box__highlight">$1</span>');
  };
  return (
    <li className="list-item">
      <button
        className={`button_bookmark ${isBookmarked ? "active" : ""}`}
        onClick={() => {
          toggleBookmark(item);
        }}
      >
        <span className="material-symbols-outlined icon">bookmark</span>
      </button>
      <a href={`https://search.naver.com/search.naver?&query=영화${item.title.replace(/ !HS | !HE /g, "")}`} target="_blank">
        <div className="box_item">
          <div className="box_thumnail">
            {typeLabel && <span className="box_type-label">{item.matchType}</span>}
            {type === "review" ? <>{item.stllsUrl ? <img className="image_poster" src={item.stllsUrl} alt="" /> : <span className="empty">Filmory</span>}</> : <> {item.posterUrl ? <img className="image_poster" src={item.posterUrl} alt="" /> : <span className="empty">Filmory</span>}</>}
          </div>
          <div className="box_info">
            <p className="text_title" dangerouslySetInnerHTML={{ __html: highlightHS(item.title) }} />
            <p className="text_title-sub" dangerouslySetInnerHTML={{ __html: highlightHS(item.titleEng) }} />
            <p className="text_detail">
              <span className="text_num">{item.prodYear}</span>
              <span className="text_num text_director" dangerouslySetInnerHTML={{ __html: highlightHS(item.directors) }} />
            </p>
          </div>
        </div>
      </a>
    </li>
  );
};
export default SearchItem;
