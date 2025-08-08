import { useState, useEffect, useRef } from "react";
import {
  IconArrowRightUp,
  IconChevronDown,
  IconCross,
  IconHamburger,
  IconShoppingCart,
} from "./Icons";

const Navbar = ({ currentPath }: { currentPath: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(false);
  const aboutPage = currentPath === "/about/";

  const prevPathRef = useRef(currentPath);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  type MenuItem = {
    page: string;
    path: string;
    hasDropdown?: boolean;
    dropdownItems?: {
      name: string;
      img: string;
      path: string;
    }[];
  };

  const listMenu: MenuItem[] = [
    { page: "About Us", path: "/about" },
    {
      page: "Shop",
      path: "/shop",
      hasDropdown: true,
      dropdownItems: [
        { name: "Tables", img: "/images/kursi-1.jpg", path: "/shop/table" },
        { name: "Chairs", img: "/images/kursi-2.jpg", path: "/shop/chair" },
        { name: "Cabinet", img: "/images/sofa-1.jpg", path: "/shop/cabinet" },
        { name: "Shelf", img: "/images/sofa-2.jpg", path: "/shop/shelf" },
        { name: "Couch", img: "/images/sofa-3.jpg", path: "/shop/couch" },
        { name: "Others", img: "", path: "/shop" },
      ],
    },
    { page: "Blog", path: "/blog" },
    { page: "FAQ", path: "/faq" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) {
      if (path === "/shop" && currentPath !== "/shop") {
        const dropdownItem = listMenu
          .find((item) => item.path === "/shop")
          ?.dropdownItems?.find((item) => item.path === currentPath);
        return !dropdownItem;
      }
      return true;
    }
    return false;
  };

  // Close mobile menu when clicking on links
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsMobileDropdownOpen(false);
  };

  useEffect(() => {
    if (currentPath !== prevPathRef.current) {
      setIsDropDownOpen(false);
      setIsMobileDropdownOpen(false);
      prevPathRef.current = currentPath;
    }
  }, [currentPath]);

  // Handle hover for desktop dropdown
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsDropDownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsDropDownOpen(false);
    }, 150); // Small delay to prevent flickering
  };

  const handleMobileMenuClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    isMenuOpen ? setIsMobileDropdownOpen(false) : setIsMobileDropdownOpen(true);
  };

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMobileDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-white md:bg-transparent transition-all ease-linear duration-300 mt-2 md:mt-0 w-[95%] rounded-full md:rounded-none ${
          scrollPosition ? "md:w-[90%]" : "md:w-full"
        } `}
        aria-label="Navigation"
      >
        <div
          className={`hidden md:relative md:flex justify-center items-center w-full font-medium transition-all duration-300 ease-in-out ${
            aboutPage
              ? "bg-dark-green text-gray-400"
              : "bg-stone-300 text-gray-600"
          } ${
            scrollPosition
              ? "-translate-y-[150%] opacity-0 py-0"
              : "translate-y-0 opacity-100 py-2"
          }`}
        >
          <a
            href="#"
            className="relative flex justify-center items-center w-full h-full hover:underline hover:underline-offset-2 group"
          >
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed natus
              harum fugiat.
            </div>
            <div className="absolute flex left-auto right-6 justify-start items-center">
              <div>Help center</div>
              <span className="group-hover:rotate-45 transition-all duration-200 ease-in-out">
                <IconArrowRightUp />
              </span>
            </div>
          </a>
        </div>
        <div className="relative w-full mx-auto">
          <div
            className={`flex justify-between items-center min-h-16 transition-all duration-300 ease-in-out px-2 ${
              scrollPosition
                ? "md:bg-white md:rounded-t-full md:rounded-b-full md:py-2 md:px-2"
                : "md:py-2 md:px-12"
            } ${
              isDropDownOpen
                ? scrollPosition
                  ? "md:rounded-t-xl md:rounded-b-none"
                  : "md:bg-white"
                : ""
            }`}
          >
            {/* Desktop Menu */}
            <div className="flex">
              {/* Logo */}
              <a href="/" className="flex-shrink-0 flex items-center">
                <img
                  src="/dummy-logo.png"
                  alt="Logo"
                  className="w-12 h-12 md:h-16 md:w-16"
                />
              </a>

              {/* Menu */}
              <div className="hidden md:flex ml-12 items-center space-x-4">
                {listMenu.map((item, index) => (
                  <div
                    key={index}
                    className={`px-3 py-2 font-medium text-lg after:content-[''] after:block after:border-b-2 after:border-black after:transition-all after:duration-500 hover:after:scale-x-50 ${
                      aboutPage
                        ? !scrollPosition
                          ? !isDropDownOpen
                            ? "text-white"
                            : "text-black"
                          : "text-black"
                        : "text-black"
                    } ${
                      isActive(item.path)
                        ? "after:scale-x-50 after:origin-center"
                        : "after:scale-x-0 after:origin-center "
                    }`}
                  >
                    {item.hasDropdown ? (
                      <div
                        ref={dropdownRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="relative"
                      >
                        <div className="inline-flex items-center gap-x-1 transition-all duration-300 transform hover:cursor-pointer">
                          {item.page}
                          <div
                            className={`transition-transform duration-500 ${
                              isDropDownOpen ? "rotate-180" : "rotate-0"
                            }`}
                          >
                            <IconChevronDown />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <a href={item.path}>{item.page}</a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-x-4">
              {/* Shopping Cart */}
              <div className="relative">
                <button className="bg-stone-400 rounded-full flex items-center justify-center hover:bg-stone-300 hover:cursor-pointer transition-all duration-300 w-12 h-12">
                  <IconShoppingCart />
                </button>

                {/* Badge */}
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                id="mobile-menu-button"
                onClick={handleMobileMenuClick}
                className="md:hidden p-2 z-50 relative ring-1 ring-stone-400 rounded-full"
              >
                {isMenuOpen ? <IconCross /> : <IconHamburger />}
              </button>
            </div>
          </div>

          {/* Showing Dropdown item when hover */}
          {listMenu.find((item) => item.hasDropdown) && (
            <div
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`relative top-0 bg-white transition-all duration-500 ease-in-out transform overflow-hidden py-4 rounded-b-xl hidden md:block ${
                isDropDownOpen
                  ? `translate-y-0 opacity-100 h-auto w-full ${
                      scrollPosition ? "px-2" : "px-12"
                    }`
                  : "-translate-y-full opacity-0 h-0 w-0"
              }`}
            >
              <div className="grid grid-cols-6 gap-4 px-2">
                {listMenu
                  .find((item) => item.hasDropdown)
                  ?.dropdownItems?.map((dropdownItem, idx) => (
                    <a key={idx} href={dropdownItem.path}>
                      <div
                        className={`aspect-square flex items-center justify-center overflow-hidden bg-gray-200 group w-full`}
                      >
                        {dropdownItem.img ? (
                          <img
                            src={dropdownItem.img}
                            alt={
                              dropdownItem.img === null ? dropdownItem.name : ""
                            }
                            className="h-full w-full object-cover hover:scale-105 transition-all duration-300 ease-in-out"
                          />
                        ) : (
                          <span className="text-4xl text-gray-500 relative">
                            <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                              +
                            </span>
                          </span>
                        )}
                      </div>
                      <p className="mt-2 font-medium">{dropdownItem.name}</p>
                    </a>
                  ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Fullscreen */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`md:hidden fixed inset-0 bg-white z-40 flex flex-col transition-transform duration-500 ease-linear ${
          isMenuOpen
            ? "translate-y-0"
            : "-translate-y-[100%] pointer-events-none"
        }`}
      >
        {/* Mobile Header space to account for navbar */}
        <div className="h-20"></div>

        {/* Mobile Menu Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {listMenu.map((item, index) => (
            <div
              key={index}
              className="border-b-2 border-stone-300 last:border-b-0"
            >
              {item.hasDropdown ? (
                <div>
                  <button
                    onClick={toggleMobileDropdown}
                    className={`w-full flex items-center justify-between py-2 text-left font-medium text-lg ${
                      isActive(item.path) ? "text-blue-900" : "text-gray-900"
                    }`}
                  >
                    <span>{item.page}</span>
                    <span
                      className={`transition-all duration-300 ease-in-out ${
                        isMobileDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      <IconChevronDown />
                    </span>
                  </button>
                  {isMobileDropdownOpen && (
                    <div className="pb-4 flex gap-4 overflow-scroll">
                      {listMenu
                        .find((item) => item.hasDropdown)
                        ?.dropdownItems?.map((dropdownItem, idx) => (
                          <a key={idx} href={dropdownItem.path}>
                            <div
                              className={`aspect-square flex items-center justify-center overflow-hidden bg-gray-200 group w-32`}
                            >
                              {dropdownItem.img ? (
                                <img
                                  loading="eager"
                                  src={dropdownItem.img}
                                  alt={
                                    dropdownItem.img === null
                                      ? dropdownItem.name
                                      : ""
                                  }
                                  className="h-full w-full object-cover hover:scale-105 transition-all duration-300 ease-in-out"
                                />
                              ) : (
                                <span className="text-4xl text-gray-500 relative">
                                  <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                                    +
                                  </span>
                                </span>
                              )}
                            </div>
                            <p className="mt-2 font-medium">
                              {dropdownItem.name}
                            </p>
                          </a>
                        ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.path}
                  onClick={handleLinkClick}
                  className={`block py-2 text-lg font-medium ${
                    isActive(item.path) ? "text-blue-600" : "text-gray-900"
                  }`}
                >
                  {item.page}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Footer section */}
        <div className="border-t border-gray-200 p-6">
          <div className="text-center text-gray-600 text-sm">
            <p>Our showroom in GKB is open today</p>
            <p>08:00 - 20:00</p>
            <a
              href="#"
              className="inline-flex items-center gap-x-1 mt-2 text-blue-600 hover:underline"
            >
              Help center
              <IconArrowRightUp />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
