import { useEffect, useState } from "react";
import OptionFilter from "../components/OptionFilter";
import SearchItem from "../components/SearchItem";
import { useKmdbAPI } from "../api/useMovieAPI";

export default function SearchPage() {
  const { searchMovies } = useKmdbAPI();

  const searchOption = [
    { name: "통합검색", option: "query" },
    { name: "title", option: "title" },
    { name: "actor", option: "actor" },
    { name: "director", option: "director" },
  ];
  const [searchCategory, setSearchCategory] = useState(searchOption[0].option);

  const [query, setQuery] = useState("공효진");
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [page, setPage] = useState(0);

  const sortOption = [
    { name: "RANK", option: "RANK,1" },
    { name: "A → Z", option: "title,0" },
    { name: "Z → A", option: "title,1" },
    { name: "Newest", option: "prodYear,1" },
    { name: "Oldest", option: "prodYear,0" },
  ];
  const [sort, setSort] = useState(sortOption[0].option);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.search.value.trim();
    if (!value) return;
    setPage(0);
    setQuery(value);
  };

  const fetchData = async (pageNum = 0) => {
    const data = await searchMovies(query, pageNum, sort, searchCategory);
    if (!data) return;
    setTotalCount(data.total);
    setResults((prev) => (pageNum === 0 ? data.results : [...prev, ...data.results]));
  };

  useEffect(() => {
    if (!query) return;
    setPage(0);
    fetchData(0);
  }, [query, sort, searchCategory]);

  return (
    <div>
      <div className="box_header">
        <h1 className="logo">f.</h1>
        <form onSubmit={handleSubmit} role="search" class="from_search">
          <div className="box_search">
            <div className="box_input">
              <OptionFilter option={searchOption} setState={setSearchCategory} />
              <span className="material-symbols-outlined icon">search</span>
              <input id="search-input" className="form_input" name="search" type="search" placeholder="검색어를 입력하세요" autoComplete="off" />
            </div>
            <button type="submit" className="button_submit">
              submit
            </button>
          </div>
        </form>
      </div>
      <div className="box_result">
        <div className="box_result-option">
          <p className="totalCount">
            <b>Total Count</b>
            {totalCount} movies.
          </p>
          <OptionFilter option={sortOption} setState={setSort} />
        </div>
        <ul className="list_results">
          {results.map((item, i) => (
            <SearchItem item={item} key={i} typeLabel />
          ))}
        </ul>
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
                more
              </button>
            </>
          ) : (
            <>
              {totalCount > 10 && (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
