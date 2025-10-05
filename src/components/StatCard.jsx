import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { useCountUp } from "../hooks/useCountUp";

const StatCard = ({ number, label, index, isVisible: parentVisible }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const shouldAnimate = parentVisible || isVisible;
  const { count } = useCountUp(number, 2000, 0, shouldAnimate);

  // Check if number contains only digits (no letters, symbols, etc.)
  const isNumericOnly = /^\d+$/.test(number);
  const displayValue = isNumericOnly ? count : number;

  return (
    <div
      ref={ref}
      className={`group text-center p-6 bg-gradient-to-br from-primary-600/10 to-primary-600/5 border border-primary-600/20 hover:border-primary-600/40 hover:shadow-lg hover:shadow-primary-600/20 transition-all duration-500 ${
        shouldAnimate ? "animate-fall-in" : "opacity-0 translate-y-8"
      }`}
      style={{ "--animation-delay": `${index * 0.2}s` }}>
      <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2 transition-all duration-300 group-hover:text-primary-400">
        {displayValue}+
      </div>
      <div className="text-sm md:text-base text-text/80 uppercase tracking-wider transition-colors duration-300 hover:text-text/100">
        {label}
      </div>
    </div>
  );
};

export default StatCard;
