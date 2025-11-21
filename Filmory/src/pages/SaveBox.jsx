import { useAtomValue } from "jotai";
import { bookmarkAtom } from "../atom/atom";
import ListItem from "../components/ListItem";
import Header from "../components/Header";
import EmptyMotion from "../components/EmptyMotion";
export default function BookmarkPage() {
  const bookmark = useAtomValue(bookmarkAtom);
  return (
    <div>
      <Header />
      {bookmark.length > 0 ? (
        <div className="box_result">
          <div className="box_result-option">
            <p className="totalCount">
              <b>Total Count</b>
              {bookmark.length} movies.
            </p>
          </div>
          <ul className="list_bookmark">
            {bookmark.map((item, i) => (
              <ListItem item={item} key={i} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="box_empty-wrap">
          <div className="box_empty">
            <EmptyMotion />
            <p className="text_empty">저장된 영화가 없습니다.</p>
          </div>
        </div>
      )}
    </div>
  );
}
