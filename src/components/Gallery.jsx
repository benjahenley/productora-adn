import { useState } from "react";
import { galleryItems } from "../data/gallery";
import Lightbox from "./Lightbox";
import Pagination from "./Pagination";
import { usePagination } from "../hooks/usePagination";

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    currentPage,
    totalPages,
    getPaginatedItems,
    goToPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination(galleryItems.length, 9);

  const openLightbox = (item) => {
    setSelectedItem(item);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const paginatedItems = getPaginatedItems(galleryItems);

  return (
    <>
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nuestros Trabajos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Una muestra de algunos de los eventos que hemos producido con
              excelencia y dedicación
            </p>
          </div>

          <div className="grid-responsive-3 mb-8">
            {paginatedItems.map((item) => (
              <div
                key={item.id}
                className="card cursor-pointer group"
                onClick={() => openLightbox(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(item);
                  }
                }}
                aria-label={`Ver ${item.title}`}>
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={item.thumb}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-primary-600 transition-transform duration-300 group-hover:scale-110">
                      {item.mediaType === "video" && (
                        <svg
                          className="w-8 h-8"
                          viewBox="0 0 24 24"
                          fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                      {item.mediaType === "image" && (
                        <svg
                          className="w-8 h-8"
                          viewBox="0 0 24 24"
                          fill="currentColor">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                      )}
                      {item.mediaType === "youtube" && (
                        <svg
                          className="w-8 h-8"
                          viewBox="0 0 24 24"
                          fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        </div>
      </section>

      {selectedItem && <Lightbox item={selectedItem} onClose={closeLightbox} />}
    </>
  );
};

export default Gallery;
