import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SECTIONS = [
  { id: "home", path: "/" },
  { id: "about", path: "/about" },
  { id: "projects", path: "/projects" },
];
const HOME_PATHS = SECTIONS.map((s) => s.path);

let skipNextScroll = false;
let scrollingTo = null;
let scrollTimer = null;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToPath(path, behavior) {
  if (behavior === "smooth") {
    scrollingTo = path;
    clearTimeout(scrollTimer);
    
    scrollTimer = setTimeout(() => {
      scrollingTo = null;
    }, 1500);
  }

  if (path === "/") {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const section = SECTIONS.find((s) => s.path === path);
  const element = section && document.getElementById(section.id);
  if (element) element.scrollIntoView({ behavior, block: "start" });
}

export function useSectionLinkClick() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (event, path) => {
      if (!HOME_PATHS.includes(path)) return; 
      if (!HOME_PATHS.includes(pathname)) return; 
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault(); 
      scrollToPath(path, prefersReducedMotion() ? "auto" : "smooth");

      if (path !== pathname) {
        skipNextScroll = true; 
        navigate(path);
      }
    },
    [pathname, navigate]
  );
}

export default function useSectionRouting() {
  const { pathname, key } = useLocation();
  const navigate = useNavigate();
  const isFirstRun = useRef(true);
  const pathRef = useRef(pathname);

  useEffect(() => {
    pathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    return () => {
      clearTimeout(scrollTimer);
      scrollingTo = null;
    };
  }, []);

  useEffect(() => {
    if (skipNextScroll) {
      skipNextScroll = false;
      return;
    }

    const behavior =
      isFirstRun.current || prefersReducedMotion() ? "auto" : "smooth";
    isFirstRun.current = false;

    scrollToPath(pathname, behavior);
  }, [pathname, key]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const section = SECTIONS.find((s) => s.id === entry.target.id);
          if (!section) return;

          if (scrollingTo) {
            if (section.path !== scrollingTo) return;
            scrollingTo = null; 
          }

          if (section.path === pathRef.current) return;

          skipNextScroll = true;
          navigate(section.path, { replace: true }); 
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [navigate]);
}