import "./App.css";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Footer from "./components/Footer";
import MovieRankItem from "./components/MovieRankItem";

function App() {
  const today = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() - 1);
    return t;
  }, []);

  const [date, setDate] = useState(today);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const KobisKey = import.meta.env.VITE_KobisKey;
  const ServiceKey = import.meta.env.VITE_ServiceKey;

  const formatDate = (date) =>
    date.toISOString().slice(0, 10).replace(/-/g, "");

  const formatMonthFull = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", day: "2-digit" });
  };

  const monthDate = formatMonthFull(date);
  const isNextDisabled =
    date >= today || date.toDateString() === today.toDateString();

  const changeDay = (direction) => {
    setDate((prev) => {
      const newDate = new Date(prev);
      const offset = direction === "next" ? 1 : -1;
      newDate.setDate(prev.getDate() + offset);
      return newDate;
    });
  };

  const handleDateChange = (selectedDate) => {
    if (selectedDate > today) return;
    setDate(selectedDate);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const kobisRes = await axios.get(
          `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KobisKey}&repNationCd=&targetDt=${formatDate(
            date
          )}`
        );
        const movieList = kobisRes.data.boxOfficeResult.dailyBoxOfficeList;
        const kmdbPromises = movieList.map(async (movie) => {
          const openDt = movie.openDt.replaceAll("-", "");
          const kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${ServiceKey}&sort=prodYear,1&releaseDts=${openDt}&detail=Y&query=${encodeURIComponent(
            movie.movieNm
          )}`;
          try {
            const kmdbRes = await axios.get(kmdbUrl);
            const result = kmdbRes.data?.Data?.[0]?.Result?.[0];
            const posterUrl = result?.posters.split("|")[0] || "";
            const titleEng = result?.titleEng.replace(/!HS|!HE/g, "") || "";
            return { ...movie, posterUrl, titleEng };
          } catch {
            return { ...movie, posterUrl: "", titleEng: "" };
          }
        });
        const moviesWithPoster = await Promise.all(kmdbPromises);
        setMovies(moviesWithPoster);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [date]);

  if (error) {
    return <div className="error">An error occurred: {error.message}</div>;
  }
  return (
    <div className="box_wrap">
      {/* <Header /> */}
      <div className="box_content-heading">
        <h2 className="text_heading1">
          <span> {formatDate(date).slice(0, 4)}</span>
          <span className="text">Daily Box Office</span>
        </h2>
        <div className="box_calendar">
          <Calendar
            onChange={handleDateChange}
            value={date}
            maxDate={today}
            locale="en-US"
            calendarType="gregory"
            formatMonthYear={(locale, date) =>
              date.toLocaleDateString("en-US", { month: "short" })
            }
          />
        </div>
      </div>
      <div className="box_date">
        <button
          className="button"
          type="button"
          onClick={() => changeDay("prev")}
        >
          <span className="material-symbols-outlined">keyboard_arrow_left</span>
        </button>
        <span className="text_date">{monthDate} </span>
        {!isNextDisabled && (
          <button
            className="button"
            type="button"
            onClick={() => changeDay("next")}
          >
            <span className="material-symbols-outlined">
              keyboard_arrow_right
            </span>
          </button>
        )}
      </div>
      {loading ? (
        <div className="loading list_box-office">Loading...</div>
      ) : (
        <Swiper
          wrapperTag="ul"
          className="list_box-office"
          slidesPerView={"auto"}
        >
          {movies?.map((movie) => (
            <SwiperSlide key={movie.rnum} className="list-item" tag="li">
              <MovieRankItem movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <Footer />
    </div>
  );
}

export default App;
