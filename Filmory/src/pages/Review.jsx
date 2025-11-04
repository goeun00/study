import { useAtomValue } from "jotai";
import { reviewAtom } from "../atom/atom";
import { useEffect, useState } from "react";
import SearchItem from "../components/SearchItem";
import { useMovieAPI } from "../api/useMovieAPI";

export default function BookmarkPage() {
  const review = useAtomValue(reviewAtom);
  const { fetchBookmarks, loading } = useMovieAPI();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!review.length) {
      setResults([]);
      return;
    }
    const fetchData = async () => {
      const data = await fetchBookmarks(review);
      setResults(data);
    };
    fetchData();
  }, [review]);

  return (
    <div>
      <div className="box_content-heading">save box</div>
      {loading ? (
        <p>로딩중...</p>
      ) : (
        <>
          <div className="box_result">
            <ul className="list_review">
              {results.map((item, i) => (
                <SearchItem item={item} key={i} type="review" />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
