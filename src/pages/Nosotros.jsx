import { useEffect } from "react";
import { companyData } from "../data/company";
import { useCountUp } from "../hooks/useCountUp";
import LogoCarousel from "../components/LogoCarousel";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const FeatureCard = ({ title, delay = 0, isVisible }) => {
  return (
    <div
      className={`text-center p-8 bg-gradient-to-br from-primary-600/10 to-primary-600/5 border border-primary-600/20 hover:border-primary-600/80  hover:shadow-lg hover:shadow-primary-600/20 transition-all duration-500 ${
        isVisible
          ? "animate-fall-in opacity-100 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
      style={{ "--animation-delay": `${delay}ms` }}>
      <div className="text-sm md:text-base text-text/90 uppercase tracking-wider font-light leading-relaxed transition-colors duration-300 hover:text-text/100">
        {title}
      </div>
    </div>
  );
};

const Nosotros = () => {
  const [badgeRef, isBadgeVisible] = useIntersectionObserver();
  const [titleRef, isTitleVisible] = useIntersectionObserver();
  const [logoRef, isLogoVisible] = useIntersectionObserver();
  const [paragraphsRef, isParagraphsVisible] = useIntersectionObserver();
  const [featuresRef, isFeaturesVisible] = useIntersectionObserver();
  const [logosRef, isLogosVisible] = useIntersectionObserver();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-text">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* YouTube Background Video */}
        {companyData.hero.youtubeVideo && (
          <div className="absolute inset-0 w-full h-full z-10 overflow-hidden">
            <iframe
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: "100vw",
                height: "100vh",
                minWidth: "177.77vh",
                minHeight: "56.25vw",
              }}
              src={`https://www.youtube.com/embed/${companyData.hero.youtubeVideo}?autoplay=1&mute=1&loop=1&playlist=${companyData.hero.youtubeVideo}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=10`}
              title="Hero Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
            />
          </div>
        )}

        {/* Background Image (fallback) */}
        {!companyData.hero.youtubeVideo && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10"
            style={{
              backgroundImage: `url(${companyData.hero.backgroundImage})`,
            }}
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-20"></div>

        {/* Content */}
        <div className="container relative z-30 text-center">
          <div className="mb-6">
            <span
              ref={badgeRef}
              className={`inline-block bg-primary-600 text-text text-xs font-semibold tracking-widest px-4 py-1 uppercase transition-all duration-700  cursor-default ${
                isBadgeVisible
                  ? "animate-fall-in opacity-100"
                  : "opacity-0 translate-y-4 scale-95"
              }`}>
              {companyData.nosotros.badge}
            </span>
          </div>
          <h1
            ref={titleRef}
            className={`text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight transition-all duration-1000  cursor-default ${
              isTitleVisible
                ? "animate-fall-in opacity-100 scale-100"
                : "opacity-0 translate-y-12 scale-95"
            }`}
            style={{ "--animation-delay": "0.3s" }}>
            Sobre Nosotros
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-[#121110]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 text-text/70 text-base md:text-lg leading-relaxed font-light">
              {/* Logo Bottom Right */}
              <div
                ref={logoRef}
                className={`place-self-center transition-all duration-700 ${
                  isLogoVisible
                    ? "animate-fall-in opacity-100"
                    : "opacity-0 translate-x-8 scale-95"
                }`}
                style={{ "--animation-delay": "0.5s" }}>
                <img
                  src="/assets/logo-invertido-2.webp"
                  alt="Productora ADN"
                  className="w-16 md:w-20 opacity-30 hover:opacity-50 transition-all duration-300 drop-shadow-lg cursor-default"
                />
              </div>
              <div
                ref={paragraphsRef}
                className={`space-y-8 transition-all duration-800 ${
                  isParagraphsVisible
                    ? "animate-fall-in opacity-100"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ "--animation-delay": "0.7s" }}>
                {companyData.nosotros.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={` transition-all font-roboto text-justify duration-700 ${
                      isParagraphsVisible
                        ? "animate-fall-in opacity-100"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{ "--animation-delay": `${0.9 + index * 0.2}s` }}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div
                ref={featuresRef}
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16 transition-all duration-1000 ${
                  isFeaturesVisible
                    ? "animate-fall-in opacity-100"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ "--animation-delay": "0.9s" }}>
                {companyData.nosotros.features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    title={feature}
                    delay={1.5 + index * 0.15}
                    isVisible={isFeaturesVisible}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confian en nosotros Section */}
      <section className="py-20 bg-secondary-500">
        <div className="container">
          <div
            ref={logosRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              isLogosVisible
                ? "animate-fall-in opacity-100"
                : "opacity-0 translate-y-8"
            }`}
            style={{ "--animation-delay": "0.6s" }}>
            <h2
              className={`text-4xl md:text-5xl font-bold uppercase mb-4 text-white transition-all duration-700 ${
                isLogosVisible
                  ? "animate-fall-in opacity-100"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ "--animation-delay": "0.8s" }}>
              Confían en nosotros
            </h2>
            <p
              className={`text-lg text-white max-w-2xl mx-auto text-balance transition-all duration-700 ${
                isLogosVisible
                  ? "animate-fall-in opacity-100"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ "--animation-delay": "1.0s" }}>
              Empresas líderes que ya confían en nuestra experiencia y
              compromiso
            </p>
          </div>

          <div
            className={`max-w-7xl mx-auto transition-all duration-1000 ${
              isLogosVisible
                ? "animate-fall-in opacity-100"
                : "opacity-0 translate-y-12"
            }`}
            style={{ "--animation-delay": "1.5s" }}>
            <LogoCarousel />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
