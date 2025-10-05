import { useState, useEffect } from "react";

export const useCountUp = (
  end,
  duration = 2000,
  start = 0,
  isVisible = false
) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isVisible) return;

    const isNumeric = !isNaN(parseFloat(end)) && isFinite(parseFloat(end));

    if (!isNumeric) {
      setCount(end);
      return;
    }

    const endValue = typeof end === "string" ? parseFloat(end) : end;
    const startValue = typeof start === "string" ? parseFloat(start) : start;
    const increment = (endValue - startValue) / (duration / 16);
    let current = startValue;

    const timer = setInterval(() => {
      current += increment;
      if (current >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, start, duration]);

  return { count };
};
