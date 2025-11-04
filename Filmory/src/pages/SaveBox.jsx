import { useAtomValue } from "jotai";
import { bookmarkAtom } from "../atom/atom";
import SearchItem from "../components/SearchItem";

export default function BookmarkPage() {
  const bookmark = useAtomValue(bookmarkAtom);
  return (
    <div>
      <div className="box_content-heading">save box</div>
      {bookmark.length > 0 ? (
        <div className="box_result">
          <ul className="list_results">
            {bookmark.map((item, i) => (
              <SearchItem item={item} key={i} />
            ))}
          </ul>
        </div>
      ) : (
        <p>저장된 영화가 없습니다 🎬</p>
      )}
    </div>
  );
}
