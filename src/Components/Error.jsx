import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Assets
import PageNotFound from "../assets/image/default/page-not-found.lottie";

// Component
import useScrollToTop from "./useScrollToTop";

const Error = () => {
  // Use
  const navigate = useNavigate();

  // Scroll To Top
  useScrollToTop();

  // Navigation Handler For Go Back
  const goPackPageHandler = () => navigate(-1);
  return (
    <div
      className="text-center"
      style={{ minHeight: "100dvh", alignContent: "center" }}
    >
      <DotLottieReact src={PageNotFound} loop autoplay height={"95dvh"} />
      <button
        className="btn btn-lg mt-4 rounded-pill px-4 go-back-page-btn"
        onClick={() => goPackPageHandler()}
      >
        Go Back
      </button>
    </div>
  );
};

export default Error;
