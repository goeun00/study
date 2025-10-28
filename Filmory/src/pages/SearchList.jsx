import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function SearchPage() {
  const [query, setQuery] = useState("공효진");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("RANK,1");
  const [openSort, setOpenSort] = useState(false);
  const ServiceKey = import.meta.env.VITE_ServiceKey;

  const cache = useRef(new Map()); // 검색어 캐싱 Map

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.search.value.trim();
    if (!value) return;
    setQuery(value);
  };

  const searchMovies = async (keyword) => {
    const encoded = encodeURIComponent(keyword);
    const kmdbReq = await axios.get(
      `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp
    ?ServiceKey=${ServiceKey}&sort=${sort}&collection=kmdb_new2&query=${encoded}`.replace(/\s+/g, "")
    );
    const results = kmdbReq.data?.Data?.[0]?.Result || [];
    return mergeAndSort(keyword, results);
  };

  const mergeAndSort = (keyword, results) => {
    const lowerKeyword = keyword.toLowerCase();

    return results
      .map((movie) => {
        const title = movie.title?.replace(/!HS|!HE/g, "") || "";
        const director = movie.directors.director?.[0]?.directorNm.replace(/!HS|!HE/g, "") || "";
        const actors = movie.actors.actor?.map((a) => a.actorNm) || [];

        const matchType = title.toLowerCase().includes(lowerKeyword) ? "title" : director.toLowerCase().includes(lowerKeyword) ? "director" : actors.some((a) => a.toLowerCase().includes(lowerKeyword)) ? "actors" : "ect";

        return {
          title,
          posterUrl: movie.posters?.split("|")[0] || movie.stillUrl?.split("|")[0] || "",
          director,
          actors,
          matchType,
        };
      })
      .filter((movie) => movie.title);
  };

  useEffect(() => {
    if (!query) return;
    const cacheKey = `${query}-${sort}`;
    if (cache.current.has(cacheKey)) {
      console.log("📦 Cached:", cacheKey);
      setResults(cache.current.get(cacheKey));
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("🌐 Fetch:", cacheKey);
        const data = await searchMovies(query);
        cache.current.set(cacheKey, data);
        setResults(data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, sort]);

  return (
    <div>
      <div className="box_content-heading">
        <form onSubmit={handleSubmit} role="search" className="box_search">
          <span class="material-symbols-outlined icon">search</span>
          <input id="search-input" className="form_input" name="search" type="search" placeholder="검색어를 입력하세요" autoComplete="off" defaultValue="공효진" />
          <button type="submit" className="button_submit">
            submit
          </button>
        </form>
        <div className="box_filter">
          <button className="button_label" onClick={() => setOpenSort((prev) => !prev)}>
            {sort.split(",")[0]}
            <span className="material-symbols-outlined icon">keyboard_arrow_down</span>
          </button>
          <ul className={`list_filter ${openSort ? "active" : ""}`}>
            <li className="list-item">
              <button
                className="button_option"
                onClick={() => {
                  setSort("RANK,1");
                  setOpenSort(false);
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
                  setOpenSort(false);
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
                  setOpenSort(false);
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
        <>
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
                    <p className="text_title-sub">{item.director}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
