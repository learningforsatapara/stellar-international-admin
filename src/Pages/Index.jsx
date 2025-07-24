import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AOS from "aos";

// Header & Footer
import Header from "../Components/Module/Header/Header";
import Footer from "../Components/Module/Footer/Footer";

// Scroll to this section with the #element.
import Hash from "../Components/Hash";

// Scroll To Top
import useScrollToTop from "../Components/useScrollToTop";

const Index = () => {
  // Scroll To Top
  useScrollToTop();

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // whether animation should happen only once - while scrolling down
      easing: "ease-in-out", // default easing for AOS animations
    });
  }, []);

  return (
    <div className="">
      <Hash />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Index;
