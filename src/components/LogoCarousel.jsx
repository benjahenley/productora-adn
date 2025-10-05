import { useEffect, useState } from "react";

const LogoCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Argentine brands that use event production services
  const logos = [
    {
      name: "Coca-Cola Argentina",
      logo: "/assets/logos/coca-cola.svg",
    },
    {
      name: "YPF",
      logo: "/assets/logos/ypf.svg",
    },
    {
      name: "Santander",
      logo: "/assets/logos/santander.svg",
    },
    {
      name: "Quilmes",
      logo: "/assets/logos/quilmes.svg",
    },
    {
      name: "Toyota Argentina",
      logo: "/assets/logos/toyota.svg",
    },
    {
      name: "ICBC",
      logo: "/assets/logos/icbc.svg",
    },
    {
      name: "Samsung",
      logo: "/assets/logos/samsung.svg",
    },
    {
      name: "Lg Electronics",
      logo: "/assets/logos/lg-electronics.svg",
    },
  ];

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scroll-animation {
          animation: scroll 20s linear infinite;
        }
      `}</style>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary-500 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary-500 to-transparent z-10"></div>

        {/* Moving carousel */}
        <div className="flex scroll-animation">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-20 mx-4 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <img
                src={logo.logo}
                alt={logo.name}
                className="max-h-12 max-w-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LogoCarousel;
