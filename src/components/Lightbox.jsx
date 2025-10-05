import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Lightbox = ({ item, onClose }) => {
  const lightboxRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (lightboxRef.current && !lightboxRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const renderMedia = () => {
    switch (item.mediaType) {
      case "video":
        return (
          <video
            controls
            autoPlay
            className="max-w-full max-h-full w-auto h-auto rounded-lg">
            <source src={item.src} type="video/mp4" />
            Tu navegador no soporta el elemento video.
          </video>
        );
      case "youtube":
        return (
          <iframe
            src={item.src}
            title={item.title}
            className="w-full h-full max-w-4xl max-h-[80vh] rounded-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      default:
        return (
          <img
            src={item.src}
            alt={item.title}
            className="max-w-full max-h-full w-auto h-auto rounded-lg"
          />
        );
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div
        className="relative max-w-[90vw] max-h-[90vh] bg-black rounded-lg overflow-hidden shadow-2xl"
        ref={lightboxRef}>
        <button
          className="absolute top-4 right-4 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white z-10 transition-colors"
          onClick={onClose}
          aria-label="Cerrar lightbox">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        <div className="flex items-center justify-center p-8">
          {renderMedia()}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
          <h3 className="text-white text-lg font-semibold text-center">
            {item.title}
          </h3>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Lightbox;
