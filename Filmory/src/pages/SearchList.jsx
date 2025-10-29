import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function SearchPage() {
  const [query, setQuery] = useState("공효진");
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("RANK,1");
  const [openSort, setOpenSort] = useState(false);
  const [page, setPage] = useState(0);

  const ServiceKey = import.meta.env.VITE_ServiceKey;

  const cache = useRef(new Map());

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.search.value.trim();
    if (!value) return;
    setQuery(value);
  };

  const searchMovies = async (keyword, pageNum) => {
    const encoded = encodeURIComponent(keyword);
    const start = pageNum * 10;
    const kmdbReq = await axios.get(
      `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp
    ?ServiceKey=${ServiceKey}&sort=${sort}&collection=kmdb_new2&listCount=10&startCount=${start}&query=${encoded}`.replace(/\s+/g, "")
    );
    const results = kmdbReq.data?.Data?.[0]?.Result || [];
    const total = kmdbReq.data?.TotalCount || 0;
    return { total, results: mergeAndSort(keyword, results) };
  };
  const mergeAndSort = (keyword, results) => {
    const lowerKeyword = keyword.toLowerCase();

    return results
      .map((movie) => {
        const title = movie.title?.replace(/!HS|!HE/g, "") || "";
        const director = movie.directors?.director?.[0]?.directorNm?.replace(/!HS|!HE/g, "") || "";
        const actors = movie.actors?.actor?.map((a) => a.actorNm.replace(/!HS|!HE/g, "")) || [];
        const matchType = title.toLowerCase().includes(lowerKeyword) ? "title" : director.toLowerCase().includes(lowerKeyword) ? "director" : actors.some((a) => a.toLowerCase().includes(lowerKeyword)) ? "actors" : "etc";
        return {
          title,
          posterUrl: movie.posters?.split("|")[0] || movie.stillUrl?.split("|")[0] || "",
          director,
          actors,
          matchType,
          year: movie.prodYear || "",
          score: calcScore(lowerKeyword, { title, director }),
        };
      })
      .filter((movie) => movie.title)
      .sort((a, b) => b.score - a.score);
  };

  useEffect(() => {
    if (!query) return;
    setPage(0);
    const cacheKey = `${query}-${sort}`;
    if (cache.current.has(cacheKey)) {
      console.log("📦 Cached:", cacheKey);
      setResults(cache.current.get(cacheKey));
      return;
    }
    fetchData(0);
  }, [query, sort]);

  const fetchData = async (pageNum) => {
    const cacheKey = `${query}-${sort}-${pageNum}`;
    if (cache.current.has(cacheKey)) {
      setResults((prev) => (pageNum === 0 ? cache.current.get(cacheKey) : [...prev, ...cache.current.get(cacheKey)]));
      return;
    }
    setLoading(true);
    const data = await searchMovies(query, pageNum);
    cache.current.set(cacheKey, data.results);
    setTotalCount(data.total);
    setResults((prev) => (pageNum === 0 ? data.results : [...prev, ...data.results]));
    setLoading(false);
  };

  const calcScore = (keyword, movie) => {
    const title = movie.title?.toLowerCase() || "";
    const director = movie.director?.toLowerCase() || "";
    if (title === keyword) return 100;
    if (director === keyword) return 95;
    if (title.includes(keyword)) return 85;
    if (director.includes(keyword)) return 70;
    return 50;
  };

  return (
    <div>
      <div className="box_content-heading">
        <form onSubmit={handleSubmit} role="search" className="box_search">
          <span className="material-symbols-outlined icon">search</span>
          <input id="search-input" className="form_input" name="search" type="search" placeholder="검색어를 입력하세요" autoComplete="off" defaultValue="공효진" />
          <button type="submit" className="button_submit">
            submit
          </button>
        </form>
        <div className="box_filter">
          <button className="button_label" tabIndex={0} onFocus={() => setOpenSort(true)} onBlur={() => setOpenSort(false)}>
            {sort.split(",")[0]}
            <span className="material-symbols-outlined icon">keyboard_arrow_down</span>
          </button>
          <ul className={`list_filter ${openSort ? "active" : ""}`}>
            <li className="list-item">
              <button
                className="button_option"
                onClick={() => {
                  setSort("RANK,1");
                }}
              >
                RANK
              </button>
            </li>
            <li className="list-item">
              <button
                className="button_option"
                onClick={() => {
                  setSort("title,0");
                }}
              >
                title
              </button>
            </li>
            <li className="list-item">
              <button
                className="button_option"
                onClick={() => {
                  setSort("prodYear,1");
                }}
              >
                prodYear
              </button>
            </li>
          </ul>
        </div>
      </div>

      {loading && <p>로딩중...</p>}

      {!query ? (
        <span>검색어를 입력하세요</span>
      ) : results.length === 0 ? (
        <span>검색 결과가 없습니다.</span>
      ) : (
        <div className="box_result">
          <p className="totalCount">total: {totalCount}</p>
          <ul className="list_results">
            {results.map((item, i) => (
              <li key={i} className="list-item">
                <div className="box_item">
                  <div className="box_thumnail">
                    <span className="box_type-label">{item.matchType}</span>
                    {item.posterUrl ? <img className="image_poster" src={item.posterUrl} alt="" /> : <span className="empty">Filmory</span>}
                  </div>
                  <div className="box_info">
                    <p className="text_title">{item.title}</p>
                    <p className="text_title-sub">
                      <b>director</b>: {item.director}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>{" "}
          <div className="box_pagination">
            {results.length < totalCount ? (
              <>
                <p className="pagination-label">
                  {page + 1} / {Math.ceil(totalCount / 10)}
                </p>
                <button
                  className="button_more"
                  onClick={() => {
                    const next = page + 1;
                    setPage(next);
                    fetchData(next);
                  }}
                >
                  더보기
                </button>
              </>
            ) : (
              <button
                className="button_more"
                onClick={() => {
                  setPage(0);
                  fetchData(0);
                }}
              >
                접기
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
