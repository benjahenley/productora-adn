import { companyData } from "../../data/company";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import StatCard from "../StatCard";

const About = () => {
  const [badgeRef, isBadgeVisible] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: "-20px",
  });
  const [titleRef, isTitleVisible] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: "-20px",
  });
  const [textRef, isTextVisible] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: "-20px",
  });
  const [statsRef, isStatsVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "-20px",
  });

  return (
    <section className="py-20 bg-[#121110] text-text -mt-1 triple-rhombus-bg">
      <div className="container">
        <div className="text-center mb-4">
          <span
            ref={badgeRef}
            className={`inline-block bg-primary-600 text-background text-xs font-semibold tracking-wider px-4 py-1 uppercase mb-4 transition-all duration-700  cursor-default ${
              isBadgeVisible
                ? "animate-fall-in opacity-100"
                : "opacity-0 translate-y-4 scale-95"
            }`}>
            Nosotros
          </span>
        </div>
        <div className="w-full gap-12 items-center">
          <div className="max-w-2xl m-auto text-center mb-16">
            <h2
              ref={titleRef}
              className={`text-4xl md:text-5xl font-normal mb-8 uppercase transition-all duration-1000  cursor-default ${
                isTitleVisible
                  ? "animate-fall-in opacity-100 scale-100"
                  : "opacity-0 translate-y-12 scale-95"
              }`}
              style={{ "--animation-delay": "0.2s" }}>
              Nuestro ADN
            </h2>
            <div
              ref={textRef}
              className={`space-y-6 text-text/60 transition-all duration-800 ${
                isTextVisible
                  ? "animate-fall-in opacity-100"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ "--animation-delay": "0.4s" }}>
              <p
                className={`font-roboto text-lg font-light text-justify leading-relaxed md:text-center transition-all duration-700 ${
                  isTextVisible
                    ? "animate-fall-in opacity-100"
                    : "opacity-0 translate-y-6"
                }`}
                style={{
                  letterSpacing: "0.02rem",
                  "--animation-delay": "0.6s",
                }}>
                Nacimos con la pasión de transformar ideas en experiencias
                memorables. Nuestro equipo combina creatividad, tecnología de
                vanguardia y un compromiso absoluto con la excelencia en cada
                proyecto.
              </p>
              <p
                className={`text-lg font-roboto font-light text-justify leading-relaxed md:text-center transition-all duration-700 ${
                  isTextVisible
                    ? "animate-fall-in opacity-100"
                    : "opacity-0 translate-y-6"
                }`}
                style={{
                  letterSpacing: "0.02rem",
                  "--animation-delay": "0.8s",
                }}>
                Creemos que cada evento es una oportunidad única para crear algo
                extraordinario. Por eso invertimos en equipamiento de última
                generación y trabajamos con profesionales especializados que
                comparten nuestra visión de llevar la producción audiovisual al
                siguiente nivel.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {companyData.highlights.map((highlight, index) => (
              <StatCard
                key={index}
                number={highlight.number}
                label={highlight.label}
                index={index}
                isVisible={isStatsVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
