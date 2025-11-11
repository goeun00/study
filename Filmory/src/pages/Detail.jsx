import { useEffect, useState } from "react";
import { useKmdbAPI } from "../api/useMovieAPI";
import { useParams } from "react-router-dom";

export default function SearchPage() {
  const { movieId, movieSeq } = useParams();
  const { fetchBookmarks, loading } = useKmdbAPI();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!movieId || !movieSeq) return;
    const fetchData = async () => {
      const data = await fetchBookmarks([movieId, movieSeq]);
      setMovie(data[0] || null);
    };
    fetchData();
  }, [movieId, movieSeq]);

  return (
    <div>
      <div className="box_header"></div>

      <div className="box_result">
        <div className="box_result-option">
          {loading && <p>로딩 중...</p>}
          {!loading && !movie && <p>결과가 없습니다.</p>}
          {!loading && movie && (
            <div>
              <h2>{movie.title}</h2>
              <p>{movie.titleEng}</p>
              <p>{movie.prodYear}</p>
              <p>{movie.actors}</p>
              <p>{movie.directors}</p>
              <p>줄거리:{movie.plots?.plot[0].plotText}</p>
              <p>{movie.rating}</p>
              <p>개봉일:{movie.releaseDate}</p>
              <p>{movie.runtime}분</p>
              <p>{movie.keywords}</p>
             {movie.posters?.split("|").map((url, index) => (
                <img key={index} src={url} alt={`${movie.title} poster ${index + 1}`} />
              ))}
             {movie.stlls?.split("|").map((url, index) => (
                <img key={index} src={url} alt={`${movie.title} poster ${index + 1}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
