import { useState, useEffect } from "react";
import ProductCardList from "./ProductCardList";
import ProductCardGrid from "./ProductCardGrid";

const ViewSwitcher = ({ products }: any) => {
  const [currentView, setCurrentView] = useState("list");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [itemsToShow, setItemsToShow] = useState(20);

  // Sort function
  const sortProducts = (products: any[]) => {
    if (!sortBy) return products;
    return [...products].sort((a, b) => {
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
        case "category-chair":
          return aData.category.toLowerCase() === "chair"
            ? -1
            : bData.category.toLowerCase() === "chair"
            ? 1
            : 0;
        case "category-table":
          return aData.category.toLowerCase() === "table"
            ? -1
            : bData.category.toLowerCase() === "table"
            ? 1
            : 0;
        case "category-cabinet":
          return aData.category.toLowerCase() === "cabinet"
            ? -1
            : bData.category.toLowerCase() === "cabinet"
            ? 1
            : 0;
        case "category-shelf":
          return aData.category.toLowerCase() === "shelf"
            ? -1
            : bData.category.toLowerCase() === "shelf"
            ? 1
            : 0;
        case "category-couch":
          return aData.category.toLowerCase() === "couch"
            ? -1
            : bData.category.toLowerCase() === "couch"
            ? 1
            : 0;
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

  // Handle load more
  const handleLoadMore = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setItemsToShow((prev) => prev + 20);
      setIsTransitioning(false);
    }, 200);
  };

  // Sort change handler with transition
  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      const sortedProducts = sortProducts(products);
      setDisplayedProducts(sortedProducts.slice(0, itemsToShow));
      setIsTransitioning(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, [sortBy, products, itemsToShow]);

  const productData = (entry: any) => {
    // const data = entry.data || entry;
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

  const totalProducts = products.length;
  const showingCount = Math.min(itemsToShow, totalProducts);

  return (
    <div className="min-h-screen relative">
      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        {/* Items counter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Showing {showingCount} of {totalProducts} items
          </span>
        </div>

        <div className="flex items-center gap-4">
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

      {/* Load More Button */}
      {showingCount < totalProducts && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-dark-green text-white rounded-lg hover:bg-green-800 transition-colors duration-300 flex items-center gap-2"
            disabled={isTransitioning}
          >
            <span>Load 20 More</span>
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
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
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
