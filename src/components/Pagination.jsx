const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Show first 4 pages + ellipsis + last page
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page + ellipsis + last 4 pages
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center mt-12"
      aria-label="Paginación">
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            hasPrevPage
              ? "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              : "text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed"
          }`}
          aria-label="Página anterior">
          Anterior
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    page === currentPage
                      ? "bg-primary-600 text-white"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                  aria-label={`Ir a página ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}>
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            hasNextPage
              ? "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              : "text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed"
          }`}
          aria-label="Página siguiente">
          Siguiente
        </button>
      </div>

      {/* Page Info */}
      <div className="ml-6 text-sm text-gray-600">
        Página {currentPage} de {totalPages}
      </div>
    </nav>
  );
};

export default Pagination;
