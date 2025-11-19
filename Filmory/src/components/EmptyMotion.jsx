import Lottie from "lottie-react";
import emptynimation from "../assets/lottie/empty_motion.json";

const EmptyMotion = () => {
  return <Lottie animationData={emptynimation} autoplay loop={true} style={{ width: 230, height: 230 }} onComplete={() => {}} className="empty_lottie" />;
};
export default EmptyMotion;
