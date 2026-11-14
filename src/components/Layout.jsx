import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const HOME_PATHS = ["/", "/about", "/projects"];

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (HOME_PATHS.includes(pathname)) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
