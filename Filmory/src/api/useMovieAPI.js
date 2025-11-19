import { useState, useRef } from "react";
import axios from "axios";

export const useKobisAPI = () => {
  const KobisKey = import.meta.env.VITE_KobisKey;
  const KobisUrl = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KobisKey}`;

  /* 데일리 박스오피스 */
  const dailyBoxOffice = async (date) => {
    const kobisRes = await axios.get(KobisUrl + `&repNationCd=&targetDt=${date}`);
    const movieList = kobisRes.data.boxOfficeResult.dailyBoxOfficeList;
    return movieList;
  };
  return { dailyBoxOffice };
};

// 영화 상세 정보 api
export const useKmdbAPI = () => {
  const ServiceKey = import.meta.env.VITE_ServiceKey;
  const kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${ServiceKey}&ratedYn=y`;

  const cache = useRef(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /*  공통 영화 데이터  */
  const parseMovie = (movie) => {
    const directors = movie.directors?.director?.map((d) => d.directorNm).join(", ") || "";
    const actors = movie.actors?.actor?.map((a) => a.actorNm).join(", ") || "";
    const posterUrl = movie.posterUrl || movie.posters?.split("|")[0] || movie.stlls?.split("|")[0] || "";
    const stllsUrl = movie.stlls?.split("|")[0] || "";
    return {
      ...movie,
      directors,
      actors,
      posterUrl,
      stllsUrl,
    };
  };
  const normalize = (str) =>
    str
      .replace(/ !HS | !HE /g, "")
      .replace(/\s+/g, "")
      .toLowerCase() || "";

  /*  검색 타입 및 정렬 정확도 */
  const getMatchMeta = (movie, keyword) => {
    const title = movie.title || "";
    const titleOrg = movie.titleOrg || "";
    const company = movie.company || "";
    const directors = movie.directors?.director?.map((d) => d.directorNm).join(", ") || "";
    const actors = movie.actors?.actor?.map((a) => a.actorNm).join(", ") || "";

    if (normalize(title).includes(keyword) || normalize(titleOrg).includes(keyword)) return { matchType: "title", score: 100 };
    if (normalize(directors).includes(keyword)) return { matchType: "director", score: 90 };
    if (normalize(actors).includes(keyword)) return { matchType: "actor", score: 80 };
    if (normalize(company).includes(keyword)) return { matchType: "company", score: 70 };

    return { matchType: "etc", score: 0 };
  };

  /*  검색용 (키워드 기반) */
  const searchMovies = async (keyword, pageNum, sort, searchCategory) => {
    keyword = normalize(keyword);
    try {
      setLoading(true);
      const cacheKey = `${keyword}-${sort}-${searchCategory}-${pageNum}`;
      if (cache.current.has(cacheKey)) return cache.current.get(cacheKey);
      const res = await axios.get(kmdbUrl + `&sort=${sort}&ratedYn=y&listCount=10&startCount=${pageNum * 10}&${searchCategory}=${encodeURIComponent(keyword)}`);
      const results = res.data?.Data?.[0]?.Result || [];
      const total = res.data?.TotalCount || 0;
      const parsed = results
        .map((movie) => ({ ...parseMovie(movie), ...getMatchMeta(movie, keyword) }))
        .filter(Boolean)
        .sort((a, b) => b.score - a.score);
      const data = { total, results: parsed };
      cache.current.set(cacheKey, data);
      return data;
    } catch (err) {
      setError(err);
      console.error("🚨 error:", err);
      return { total: 0, results: [] };
    } finally {
      setLoading(false);
    }
  };

  /* movieSeq 기반 호출용 */
  const fetchBookmarks = async ([movieId, movieSeq]) => {
    const cacheKey = `${movieId}-${movieSeq}`;
    if (cache.current.has(cacheKey)) {
      return cache.current.get(cacheKey);
    }
    try {
      setLoading(true);
      const res = await axios.get(kmdbUrl + `&movieId=${movieId}&movieSeq=${movieSeq}`);
      const movie = res.data.Data[0].Result[0];
      const parsed = movie ? [parseMovie(movie)] : [];
      cache.current.set(cacheKey, parsed);
      return parsed;
    } catch (err) {
      setError(err);
      console.error("🚨 error:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  /* title+releaseDate 기반 호출용 */
  const fetchMovieDetail = async (title, releaseDate) => {
    try {
      const res = await axios.get(kmdbUrl + `&releaseDts=${releaseDate}&title=${encodeURIComponent(title)}`.replace(/\s+/g, ""));
      const movie = res.data.Data[0].Result[0];
      return movie ? parseMovie(movie) : null;
    } catch (err) {
      console.error("🚨 error:", err);
      return [];
    }
  };

  return { searchMovies, fetchBookmarks, fetchMovieDetail, loading, error };
};
