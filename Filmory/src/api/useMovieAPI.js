import { useState, useRef } from "react";
import axios from "axios";

export const useMovieAPI = () => {
  const ServiceKey = import.meta.env.VITE_ServiceKey;
  const koreafilmUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${ServiceKey}&ratedYn=y`;

  const cache = useRef(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**  공통 영화 데이터  */
  const parseMovie = (movie) => {
    const directors = movie.directors?.director?.map((d) => d.directorNm).join(", ") || "";
    const actors = movie.actors?.actor?.map((a) => a.actorNm).join(", ") || "";
    const posterUrl = movie.posters?.split("|")[0] || movie.stlls?.split("|")[0] || "";
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

  //  검색 타입 및 정렬 정확도
  const getMatchMeta = (movie, keyword) => {
    const title = movie.title || "";
    const titleOrg = movie.titleOrg || "";
    const directors = movie.directors?.director?.map((d) => d.directorNm).join(", ") || "";
    const actors = movie.actors?.actor?.map((a) => a.actorNm).join(", ") || "";

    if (normalize(title).includes(keyword) || normalize(titleOrg).includes(keyword)) return { matchType: "title", score: 3 };
    if (normalize(directors).includes(keyword)) return { matchType: "director", score: 2 };
    if (normalize(actors).includes(keyword)) return { matchType: "actor", score: 1 };

    return { matchType: "etc", score: 0 };
  };

  /*  검색용 (키워드 기반) */
  const searchMovies = async (keyword, pageNum, sort, searchCategory) => {
    keyword = normalize(keyword);
    try {
      setLoading(true);
      const cacheKey = `${keyword}-${sort}-${searchCategory}-${pageNum}`;
      if (cache.current.has(cacheKey)) return cache.current.get(cacheKey);
      const res = await axios.get(koreafilmUrl + `&sort=${sort}&ratedYn=y&listCount=10&startCount=${pageNum * 10}&${searchCategory}=${encodeURIComponent(keyword)}`);
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
  const fetchBookmarks = async (bookmarkList) => {
    if (!bookmarkList.length) return [];
    try {
      setLoading(true);
      const promises = bookmarkList.map(async (seq) => {
        const res = await axios.get(koreafilmUrl + `&movieSeq=${seq}`);
        const movie = res.data.Data[0].Result[0];
        return movie ? parseMovie(movie) : null;
      });
      const results = (await Promise.all(promises)).filter(Boolean);
      return results;
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
      const res = await axios.get(koreafilmUrl + `&releaseDts=${releaseDate}&title=${encodeURIComponent(title)}`.replace(/\s+/g, ""));
      const movie = res.data.Data[0].Result[0];
      return movie ? parseMovie(movie) : null;
    } catch (err) {
      console.error("🚨 error:", err);
      return [];
    }
  };

  return { searchMovies, fetchBookmarks, fetchMovieDetail, loading, error };
};
