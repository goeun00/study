import { useEffect, useState, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ListItem from "../components/ListItem";
import MainVisual from "../components/MainVisual";
import { useKobisAPI, useKmdbAPI } from "../api/useMovieAPI";

export default function BoxOffice() {
  const { fetchMovieDetail } = useKmdbAPI();
  const { dailyBoxOffice } = useKobisAPI();

  const today = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() - 1);
    return t;
  }, []);

  const [date, setDate] = useState(today);
  const [calendarStart, setCalendarStart] = useState(today);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [error, setError] = useState(null);
  const [expandedIdx, setExpandedIdx] = useState(null);

  const formatDate = (date) => date.toISOString().slice(0, 10).replace(/-/g, "");

  const formatMonthFull = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", day: "2-digit" });
  };

  const monthDate = formatMonthFull(date);
  const isNextDisabled = date >= today || date.toDateString() === today.toDateString();

  const changeDay = (direction) => {
    setDate((prev) => {
      const newDate = new Date(prev);
      const offset = direction === "next" ? 1 : -1;
      newDate.setDate(prev.getDate() + offset);
      setCalendarStart(newDate);
      return newDate;
    });
  };

  const handleDateChange = (selectedDate) => {
    if (selectedDate > today) return;
    setDate(selectedDate);
  };

  const handleExpand = (idx) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0, 0);
    }
  }, [movies]);

  useEffect(() => {
    const fetchMovies = async () => {
      setFade(true);
      try {
        const boxOfficeRank = await dailyBoxOffice(formatDate(date));
        const moviesDetail = await Promise.all(
          boxOfficeRank.map(async (movie) => {
            const openDt = movie.openDt.replaceAll("-", "") || "";
            const dateNum = Number(openDt);
            const dateRange = [dateNum - 2, dateNum, dateNum + 2].map(String).join(",");
            const detail = await fetchMovieDetail(movie.movieNm, dateRange);
            return {
              ...movie,
              ...detail,
              title: movie.movieNm,
            };
          })
        );
        setMovies(moviesDetail);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
        setExpandedIdx(null);
        setFade(false);
      }
    };
    fetchMovies();
  }, [date]);

  return (
    <>
      <MainVisual data={formatMonthFull(today) + ", " + formatDate(today).slice(0, 4)} />
      <div className="box_content">
        <div className="box_content-heading">
          <h2 className="text_heading1">
            <span> {formatDate(date).slice(0, 4)}</span>
            <span className="text">Daily Box Office</span>
          </h2>
          <div className="box_calendar">
            <Calendar onChange={handleDateChange} value={date} activeStartDate={calendarStart} onActiveStartDateChange={({ activeStartDate }) => setCalendarStart(activeStartDate)} maxDate={today} minDate={new Date(2003, 10, 12)} locale="en-US" calendarType="gregory" formatMonthYear={(locale, date) => date.toLocaleDateString("en-US", { month: "short" })} />
          </div>
        </div>
        <div className="box_date">
          <button className="button" type="button" onClick={() => changeDay("prev")}>
            <span className="material-symbols-outlined icon">keyboard_arrow_left</span>
          </button>
          <span className="text_date">{monthDate} </span>
          {!isNextDisabled && (
            <button className="button" type="button" onClick={() => changeDay("next")}>
              <span className="material-symbols-outlined">keyboard_arrow_right</span>
            </button>
          )}
        </div>
        {loading ? (
          <div className="loading list_box-office">Loading...</div>
        ) : (
          <>
            {error ? (
              <div className="loading list_box-office">error!</div>
            ) : (
              <Swiper wrapperTag="ul" className={`list_box-office ${fade ? "fade-out" : "fade-in"}`} slidesPerView={"auto"} onSwiper={(swiper) => (swiperRef.current = swiper)}>
                {movies?.map((movie, idx) => (
                  <SwiperSlide key={movie.rnum} className="list-item" tag="li">
                    <ListItem type="rank" item={movie} isExpanded={expandedIdx === idx} onExpand={() => handleExpand(idx)} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </>
        )}
      </div>
    </>
  );
}
