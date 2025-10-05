import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const HomeServiceCard = ({ service, index = 0 }) => {
  const [cardRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px",
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate delay for desktop only
  // Grid: 1 col (mobile), 2 cols (md), 3 cols (lg), 4 cols (xl)
  const getAnimationDelay = () => {
    if (isMobile) return "0s";

    // Desktop: 4 columns on xl, 3 on lg
    const cols = window.innerWidth >= 1280 ? 4 : 3;
    const row = Math.floor(index / cols);
    const colInRow = index % cols;

    // Row-based delay + small stagger within row
    const delay = row * 0.15 + colInRow * 0.08;
    return `${delay}s`;
  };

  return (
    <Link
      ref={cardRef}
      to={`/servicios/${service.slug}`}
      className={`group bg-background p-8 hover:bg-primary-600/50 hover:border-primary-400 text-text shadow-md hover:shadow-xl transition-all duration-300 border border-gray-700 flex flex-col h-full ${
        isVisible ? "animate-fall-in" : "opacity-0 translate-y-8"
      }`}
      style={{ "--animation-delay": getAnimationDelay() }}>
      {/* Icon */}
      <div className="w-16 h-16 mb-6 flex items-center justify-center transition-transform group-hover:scale-110">
        {service.icon ? (
          <div className="w-full h-full relative">
            <img
              src={service.icon}
              alt={service.title}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:rotate-y-180"
            />
          </div>
        ) : (
          <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
            <div className="w-8 h-8 bg-primary-600 rounded transition-transform duration-500 group-hover:rotate-y-180"></div>
          </div>
        )}
      </div>

      <h4 className="text-xl font-bold uppercase mb-3  transition-colors">
        {service.title}
      </h4>

      <p className=" leading-relaxed text-sm flex-grow text-text/60 group-hover:text-text/80">
        {service.description}
      </p>

      <div className="mt-4 self-end text-text font-semibold text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        Ver más
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
};

export default HomeServiceCard;
