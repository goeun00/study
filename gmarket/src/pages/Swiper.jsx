import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import "./Swiper.css";

const LazyImages = lazy(() => import("../components/SlideImageCard"));

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
    if (!swiperRef.current) return;

    if (autoPlay) {
      swiperRef.current.autoplay.start();
    } else {
      swiperRef.current.autoplay.stop();
    }
  }, [autoPlay]);

  return (
    <Suspense fallback={<div>이미지 불러오는 중... </div>}>
      <LazyImages>
        {(images) => (
          <Swiper
            spaceBetween={16}
            slidesPerView={"auto"}
            centeredSlides
            loop
            pagination={{ clickable: true, type: "fraction" }}
            navigation
            modules={[Pagination, Navigation, Autoplay, Scrollbar]}
            scrollbar={{ draggable: true }}
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
                onClick={() => setAutoPlay((prev) => !prev)}
              >
                <span className="material-symbols-outlined image__icon">
                  {autoPlay ? "autostop" : "autoplay"}
                </span>
              </button>
            </span>

            <p>
              현재 인덱스: {currentIndex + 1} / {images.length}
            </p>
          </Swiper>
        )}
      </LazyImages>
    </Suspense>
  );
};

export default MySwiper;
