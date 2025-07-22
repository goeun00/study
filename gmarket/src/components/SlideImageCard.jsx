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
];

export default function ImagesComponent({ children }) {
  return children(images);
}
