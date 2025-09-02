import { useState, useEffect } from "react";
import ProductCardList from "./ProductCardList";
import ProductCardGrid from "./ProductCardGrid";

const ViewSwitcher = ({ products }: any) => {
  const [currentView, setCurrentView] = useState("list");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // Filter and sort function
  const filterAndSortProducts = (products: any[]) => {
    let filteredProducts = [...products];

    // Filter by category if sorting by category
    if (sortBy.startsWith("category-")) {
      const category = sortBy.replace("category-", "");
      filteredProducts = products.filter((product) => {
        const productData = product.data || product;
        return productData.category.toLowerCase() === category.toLowerCase();
      });
      // For category sorting, we don't need additional sorting since we're filtering
      return filteredProducts;
    }

    // Sort for non-category options
    if (!sortBy) return filteredProducts;

    return filteredProducts.sort((a, b) => {
      const aData = a.data || a;
      const bData = b.data || b;
      switch (sortBy) {
        case "price-low":
          return aData.price - bData.price;
        case "price-high":
          return bData.price - aData.price;
        case "title-asc":
          return aData.title.localeCompare(bData.title);
        case "title-desc":
          return bData.title.localeCompare(aData.title);
        default:
          return 0;
      }
    });
  };

  // View switch handler
  const switchView = (newView: string) => {
    if (newView === currentView || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(newView);
      setIsTransitioning(false);
    }, 200);
  };

  // Get filtered/sorted products
  const processedProducts = filterAndSortProducts(products);

  // Pagination calculations
  const totalProducts = processedProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Handle page change
  const handlePageChange = (page: number) => {
    if (
      page === currentPage ||
      isTransitioning ||
      page < 1 ||
      page > totalPages
    )
      return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  // Sort change handler with transition
  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      const processedProducts = filterAndSortProducts(products);
      setDisplayedProducts(processedProducts.slice(startIndex, endIndex));
      setIsTransitioning(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, [sortBy, products, currentPage, startIndex, endIndex]);

  // Reset to first page when sort changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [sortBy]);

  const productData = (entry: any) => {
    const image = entry.image;
    return {
      title: entry.title,
      slug: entry.slug,
      description: entry.description,
      image: Array.isArray(image) ? image[0]?.src || image[0] : image,
      price: entry.price,
      category: entry.category,
    };
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show around current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      if (totalPages > 1) rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="min-h-screen relative">
      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        {/* Items counter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Showing {totalProducts > 0 ? startIndex + 1 : 0}-
            {Math.min(endIndex, totalProducts)} of {totalProducts} items
            {sortBy.startsWith("category-") && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium capitalize">
                {sortBy.replace("category-", "")} only
              </span>
            )}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 scale-90 sm:scale-100 justify-end">
          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-select"
              className="text-sm font-medium text-gray-700"
            >
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            >
              <option value="">Default</option>
              <optgroup label="Price">
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </optgroup>
              <optgroup label="Title">
                <option value="title-asc">Title: A to Z</option>
                <option value="title-desc">Title: Z to A</option>
              </optgroup>
              <optgroup label="Category">
                <option value="category-chair">Chair</option>
                <option value="category-table">Table</option>
                <option value="category-cabinet">Cabinet</option>
                <option value="category-shelf">Shelf</option>
                <option value="category-couch">Couch</option>
              </optgroup>
            </select>
          </div>

          {/* View toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => switchView("grid")}
              className={`px-3 py-2 transition-all duration-300 flex items-center gap-2 ${
                currentView === "grid"
                  ? "bg-dark-green text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm6 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM3 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zm6 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              Grid
            </button>
            <button
              onClick={() => switchView("list")}
              className={`px-3 py-2 transition-all duration-300 flex items-center gap-2 ${
                currentView === "list"
                  ? "bg-dark-green text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              List
            </button>
          </div>
        </div>
      </div>

      {/* Views */}
      <div
        className={`transition-all duration-300 ease-in-out transform ${
          isTransitioning
            ? "opacity-0 scale-95 translate-y-2 pointer-events-none"
            : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        {currentView === "grid" ? (
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {displayedProducts.map((product: any) => (
              <ProductCardGrid {...productData(product)} key={product.slug} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
            {displayedProducts.map((product: any) => (
              <ProductCardList {...productData(product)} key={product.slug} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isTransitioning}
            className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors duration-300 ${
              currentPage === 1 || isTransitioning
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          {/* Page numbers */}
          <div className="flex gap-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof page === "number" && handlePageChange(page)
                }
                disabled={page === "..." || isTransitioning}
                className={`px-3 py-2 rounded-lg transition-colors duration-300 min-w-[40px] ${
                  page === currentPage
                    ? "bg-dark-green text-white"
                    : page === "..."
                    ? "bg-transparent text-gray-400 cursor-default"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isTransitioning}
            className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors duration-300 ${
              currentPage === totalPages || isTransitioning
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Spinner */}
      {isTransitioning && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-700"></div>
        </div>
      )}
    </div>
  );
};

export default ViewSwitcher;
