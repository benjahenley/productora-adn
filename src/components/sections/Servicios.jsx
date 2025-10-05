import { homeServices } from "../../data/homeServices";
import HomeServiceCard from "../HomeServiceCard";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const HomeServicesSection = () => {
  const [titleRef, isTitleVisible] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: "-20px",
  });
  const [textRef, isTextVisible] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: "-20px",
  });

  return (
    <section className="py-20 bg-background triple-rhombus-bg">
      <div className="container">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary-600 text-xs font-semibold tracking-wider px-4 py-1 uppercase mb-8">
            Servicios
          </span>
          <h2
            ref={titleRef}
            className={`text-4xl md:text-5xl font-normal text-text mb-4 uppercase tracking-tighter transition-all duration-700 ${
              isTitleVisible ? "animate-fall-in" : "opacity-0 translate-y-8"
            }`}>
            Todo lo que necesitas para tu evento
          </h2>
          <p
            ref={textRef}
            className={`text-xl text-text/60 max-w-3xl mx-auto transition-all duration-700 font-roboto font-light  leading-relaxed md:text-center ${
              isTextVisible ? "animate-fall-in" : "opacity-0 translate-y-8"
            }`}
            style={{ "--animation-delay": "0.3s" }}>
            Soluciones integrales con tecnología de última generación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {homeServices.map((service, index) => (
            <HomeServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeServicesSection;
