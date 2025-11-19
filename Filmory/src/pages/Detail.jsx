import { useEffect, useState } from "react";
import { useKmdbAPI } from "../api/useMovieAPI";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Header from "../components/Header";

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
  console.log(movie);
  return (
    <div>
      <Header />
      <div className="box_detail">
        {loading && <p>로딩 중...</p>}
        {!loading && !movie && <p>결과가 없습니다.</p>}
        {!loading && movie && (
          <>
            <Swiper
              wrapperTag="ul"
              className="list_poster"
              slidesPerView={1}
              modules={[Pagination]}
              pagination={{
                clickable: true,
              }}
            >
              {movie.posters
                ?.split("|")
                .slice(0, 5)
                .map((url, index) => (
                  <SwiperSlide tag="li" className="list-item" key={index}>
                    <img src={url} alt={`${movie.title} poster ${index + 1}`} />
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="box_info">
              <div className="box_title-wrap">
                <h2 className="text_title">{movie.title}</h2>
                <p className="text_title-sub">{movie.titleEng}</p>
              </div>
              <div className="box_description-wrap">
                <p className="text_description">
                  <span className="text_label">company</span>
                  {movie.company}
                </p>
                <p className="text_description">
                  <span className="text_label">runtime</span>
                  {movie.runtime}분
                </p>
                <p className="text_description">
                  <span className="text_label">
                    <span className="text_label">directors</span>
                  </span>
                  {movie.directors}
                </p>
                <p className="text_description ">
                  <span className="text_label">actors</span>
                  {movie.actors}
                </p>
                {movie.rating && (
                  <p className="text_description">
                    <span className="text_label">rating</span>
                    {movie.rating}
                  </p>
                )}

                {movie.regDate && (
                  <p className="text_description">
                    <span className="text_label">Release date</span>
                    {movie.regDate}
                  </p>
                )}
              </div>
            </div>
            <div className="box_info">
              <div className="box_description-wrap">
                <p className="text_description">
                  <span className="text_label">plot</span>
                  {movie.plots?.plot[0].plotText}
                </p>
                {movie.keywords && (
                  <p className="text_description">
                    <span className="text_label">keywords</span>
                    {movie.keywords
                      ?.split(",")
                      .map((word) => word.trim())
                      .filter(Boolean)
                      .map((word, idx) => (
                        <span className="text_tag" key={idx}>
                          {word}
                        </span>
                      ))}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
