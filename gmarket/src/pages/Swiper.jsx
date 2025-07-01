import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Swiper.css";

import slide1 from "../assets/swiper_gallery/swiper_6.jpg";
import slide2 from "../assets/swiper_gallery/swiper_2.jpg";
import slide3 from "../assets/swiper_gallery/swiper_3.jpg";
import slide4 from "../assets/swiper_gallery/swiper_4.jpg";
import slide5 from "../assets/swiper_gallery/swiper_5.jpg";

const images = [
  { url: slide1, title: "🐱메인타이틀 1🐱", subtitle: "서브타이틀 내용 1" },
  { url: slide2, title: "🐱메인타이틀 2🐱", subtitle: "서브타이틀 내용 2" },
  { url: slide3, title: "🌻메인타이틀 3", subtitle: "서브타이틀 내용 3" },
  { url: slide4, title: "🌻메인타이틀 4", subtitle: "서브타이틀 내용 4" },
  { url: slide5, title: "메인타이틀 5🐈", subtitle: "서브타이틀 내용 5" },
  { url: slide1, title: "🐱메인타이틀 1🐱", subtitle: "서브타이틀 내용 1" },
  { url: slide2, title: "🐱메인타이틀 2🐱", subtitle: "서브타이틀 내용 2" },
  { url: slide3, title: "🌻메인타이틀 3", subtitle: "서브타이틀 내용 3" },
  { url: slide4, title: "🌻메인타이틀 4", subtitle: "서브타이틀 내용 4" },
  { url: slide5, title: "메인타이틀 5🐈", subtitle: "서브타이틀 내용 5" },
];

const MySwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const swiperRef = useRef(null);

  const handleInit = (swiper) => {
    setCurrentIndex(swiper.realIndex);
    swiperRef.current = swiper;
  };

  const handleTransitionEnd = (swiper) => {
    setCurrentIndex(swiper.realIndex);
  };

  useEffect(() => {
    if (autoPlay) {
      swiperRef.current.autoplay.start();
    } else {
      swiperRef.current.autoplay.stop();
    }
  }, [autoPlay]);

  return (
    <>
      <Swiper
        spaceBetween={16}
        slidesPerView={"auto"}
        centeredSlides={true}
        loop={true}
        pagination={{ clickable: true, type: "fraction" }}
        navigation
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onInit={handleInit}
        onTransitionEnd={handleTransitionEnd}
      >
        {images.map((item, idx) => (
          <SwiperSlide key={idx} className="swiper_list">
            <div className="box__image">
              <img src={item.url} className="image" alt="" />
            </div>
            {currentIndex === idx && (
              <div className="box__slide-info">
                <p className="text__tile">{item.title}</p>
                <p className="text__sub-tile">{item.subtitle}</p>
              </div>
            )}
          </SwiperSlide>
        ))}
        <span className="box__control-button">
          <button
            type="button"
            className="button"
            onClick={() => {
              setAutoPlay((prev) => !prev);
            }}
          >
            {autoPlay ? (
              <span className="material-symbols-outlined image__icon">
                autostop
              </span>
            ) : (
              <span className="material-symbols-outlined image__icon">
                autoplay
              </span>
            )}
          </button>
        </span>
        <p>
          현재 인덱스: {currentIndex + 1} / {images.length}
        </p>
      </Swiper>
    </>
  );
};

export default MySwiper;
