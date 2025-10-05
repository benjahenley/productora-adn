import { companyData } from "../data/company";
import { useTypewriter } from "../hooks/useTypewriter";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const Hero = () => {
  const hasYouTubeVideo = companyData.hero.youtubeVideo;
  const hasImage = companyData.hero.backgroundImage;
  const [titleRef, isTitleVisible] = useIntersectionObserver();

  const { displayedText: titleText, isComplete: titleComplete } = useTypewriter(
    companyData.hero.title.toUpperCase(),
    80,
    500,
    true
  );

  const { displayedText: subtitleText } = useTypewriter(
    "TRANSFORMANDO IDEAS EN EXPERIENCIAS AUDIOVISUALES INOLVIDABLES.",
    40,
    500,
    titleComplete
  );

  // Render subtitle with bold "EXPERIENCIAS" and "INOLVIDABLES"
  const renderSubtitle = () => {
    const text = subtitleText;

    // Replace EXPERIENCIAS with bold
    let result = text.replace("EXPERIENCIAS", "||EXPERIENCIAS||");
    // Replace INOLVIDABLES with bold
    result = result.replace("INOLVIDABLES", "||INOLVIDABLES||");

    const parts = result.split("||");

    return parts.map((part, index) => {
      if (part === "EXPERIENCIAS" || part === "INOLVIDABLES") {
        return (
          <b key={index} className="font-bold">
            {part}
          </b>
        );
      }
      return part;
    });
  };

  return (
    <section className="min-h-[calc(100vh-96px)] md:min-h-[calc(100vh-84px)] flex lg:items-center -mt-10 justify-center overflow-hidden">
      {/* YouTube Background Video */}
      {hasYouTubeVideo && (
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

      {/* Background Image (fallback or primary) */}
      {!hasYouTubeVideo && hasImage && (
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
      <div className="container relative z-30 h-full flex items-start justify-center pt-16 md:pt-0 md:items-center">
        <div className="text-text max-w-6xl px-4 md:px-8 text-center mt-12 md:mt-0">
          {/* Main Title */}
          <h1
            ref={titleRef}
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 md:mb-8 drop-shadow-2xl font-sourcecode transition-all duration-1000 ${
              isTitleVisible ? "animate-scale-in" : "opacity-0 scale-50"
            }`}>
            <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]">
              ADN
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              PRODUCCIONES
            </span>
          </h1>

          {/* Typewriter Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed drop-shadow-lg font-light max-w-4xl mx-auto">
            <span
              className="bg-primary-400/30 px-2 py-1 font-extralight box-decoration-clone uppercase"
              style={{
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
              }}>
              {renderSubtitle()}
            </span>
            <span className="inline-block w-1 h-[0.8em] ml-2 bg-primary-500 animate-blink"></span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
