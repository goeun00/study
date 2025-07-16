import { createPortal } from "react-dom";
const potalRoot = document.body;
const Potal = ({ children, className }) => {
  if (!potalRoot) return null;
  return createPortal(<div className={className}>{children}</div>, potalRoot);
};
export default Potal;
