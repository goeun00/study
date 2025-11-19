import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OptionFilter from "../components/OptionFilter";
import ListItem from "../components/ListItem";
import { useKmdbAPI } from "../api/useMovieAPI";
import Header from "../components/Header";

export default function SearchPage() {
  const { searchMovies } = useKmdbAPI();
  const { query: paramQuery } = useParams();
  const searchOption = [
    { name: "all", option: "query" },
    { name: "title", option: "title" },
    { name: "actor", option: "actor" },
    { name: "director", option: "director" },
  ];
  const [searchCategory, setSearchCategory] = useState(searchOption[0].option);
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

  const fetchData = async (pageNum = 0) => {
    const data = await searchMovies(paramQuery, pageNum, sort, searchCategory);
    if (!data) return;
    setTotalCount(data.total);
    setResults((prev) => (pageNum === 0 ? data.results : [...prev, ...data.results]));
  };

  useEffect(() => {
    if (!paramQuery) return;
    fetchData(0);
    setPage(0);
  }, [paramQuery, sort, searchCategory]);

  return (
    <>
      <Header page="search" option={searchOption} setState={setSearchCategory} />
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
            <ListItem item={item} key={i} typeLabel />
          ))}
        </ul>
        <div className="box_pagination">
          <p className="pagination-label">
            {page + 1} / {Math.ceil(totalCount / 10)}
          </p>
          {results.length < totalCount ? (
            <button
              className="button_more"
              onClick={() => {
                const next = page + 1;
                setPage(next);
                fetchData(next);
              }}
            >
              more<span className="material-symbols-outlined">keyboard_arrow_down</span>
            </button>
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
                  more<span className="material-symbols-outlined">keyboard_arrow_up</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
