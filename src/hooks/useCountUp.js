import { useEffect, useRef, useState } from "react";

const MIN_DURATION = 3000; 
const TICK_MS = 70; 

function randomDifferent(previous, max) {
  let next;
  do {
    next = Math.floor(Math.random() * (max + 1));
  } while (next === previous && max > 0);
  return next;
}

export default function useCountUp(target, duration = MIN_DURATION) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setValue(target);
      return;
    }

    const totalDuration = Math.max(duration, MIN_DURATION);
    const max = 10 ** String(Math.abs(target)).length - 1;

    let intervalId;
    let observer;

    const start = () => {
      const startTime = performance.now();

      intervalId = setInterval(() => {
        const elapsed = performance.now() - startTime;

        if (elapsed >= totalDuration) {
          clearInterval(intervalId);
          setValue(target); 
          return;
        }

        setValue((previous) => randomDifferent(previous, max));
      }, TICK_MS);
    };

    if ("IntersectionObserver" in window && ref.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            start();
            observer.disconnect();
          }
        },
        { threshold: 0.4 },
      );
      observer.observe(ref.current);
    } else {
      start();
    }

    return () => {
      clearInterval(intervalId);
      if (observer) observer.disconnect();
    };
  }, [target, duration]);

  return [value, ref];
}
