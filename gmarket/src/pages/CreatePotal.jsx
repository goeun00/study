import Potal from "../components/Potal";
import { useState, useEffect } from "react";
import "./CreatePotal.css";
import Lottie from "lottie-react";
import addCartAnimation from "../assets/add_cart.json";

const CreatePotal = () => {
  const [toastPopupActive, setToastPopupActive] = useState(false);
  const [lottieActive, setLottieActive] = useState(false);
  const [lottieStatus, setLottieStatus] = useState("");

  useEffect(() => {
    if (lottieActive) {
      requestAnimationFrame(() => {
        setLottieStatus("active");
      });
    }
  }, [lottieActive]);

  const lottieComplete = () => {
    setLottieStatus("inactive");
    setTimeout(() => {
      setLottieActive(false);
      setLottieStatus("");
    }, 300);
  };

  return (
    <>
      <div className="CreatePotal">
        <button
          type="button"
          className="button__toast"
          onClick={() => {
            setToastPopupActive(true);
            setTimeout(() => {
              setToastPopupActive(false);
            }, 3000);
          }}
        >
          토스트팝업
        </button>
        <button
          type="button"
          className="button__cart"
          onClick={() => {
            setLottieActive(true);
          }}
        >
          로티 애니메이션
        </button>
      </div>

      <Potal
        className={`box__toast${toastPopupActive ? " box__toast--active" : ""}`}
      >
        <span className="text__toast">놓친 쿠폰을 발급해드렸어요</span>
      </Potal>

      {lottieActive && (
        <Potal className="box__lottie">
          <Lottie
            animationData={addCartAnimation}
            loop={false}
            onComplete={lottieComplete}
            className={`image__lottie ${
              lottieStatus === "active"
                ? "image__lottie--active"
                : lottieStatus === "inactive"
                ? "image__lottie--inactive"
                : ""
            }`}
          />
        </Potal>
      )}
    </>
  );
};

export default CreatePotal;
