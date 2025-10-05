import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navbarItems } from "../data/navbar";
import { WipeLink, useWipeNavigate } from "../transition/WipeTransition";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const wipeNavigate = useWipeNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleDropdownEnter = (itemLabel) => {
    setOpenDropdown(itemLabel);
  };

  const handleDropdownLeave = () => {
    setOpenDropdown(null);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = contactSection.offsetTop;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleContactoClick = async (e) => {
    e.preventDefault();
    closeMenu();

    if (isHomePage) {
      // If on home page, just scroll to contact section
      scrollToContact();
    } else {
      // If on another page, navigate to home first with wipe transition
      await wipeNavigate("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        scrollToContact();
      }, 100);
    }
  };

  const handleInicioClick = (e) => {
    closeMenu();

    if (isHomePage) {
      // If on home page, scroll to top
      scrollToTop();
    }
    // If on another page, let NavLink handle navigation normally
  };

  return (
    <header
      className={`sticky top-0 backdrop-blur-md z-50 font-light uppercase transition-all duration-300 ${
        isMenuOpen
          ? "bg-black border-b border-gray-800 shadow-sm"
          : isHomePage
          ? isScrolled
            ? "bg-white/95 border-b border-gray-200 shadow-sm"
            : "bg-transparent"
          : "bg-white/95 border-b border-gray-200 shadow-sm"
      }`}>
      <div className="container">
        <nav className="flex items-center justify-between py-3">
          <WipeLink
            to="/"
            className={`flex items-center gap-3 font-semibold text-xl transition-colors duration-300 ${
              isMenuOpen || (isHomePage && !isScrolled)
                ? "text-white"
                : "text-gray-900"
            }`}
            onClick={closeMenu}>
            {isMenuOpen || (isHomePage && !isScrolled) ? (
              <img
                src="/assets/logo-invertido-2.webp"
                alt="Productora ADN"
                className="w-12 h-12 md:w-14 md:h-14 object-contain ml-2"
              />
            ) : (
              <img
                src="/assets/logo.webp"
                alt="Productora ADN"
                className="w-12 h-12 md:w-14 md:h-14 object-contain ml-2"
              />
            )}
            {!isMenuOpen && (!isHomePage || isScrolled) && (
              <div className="flex flex-col -space-y-1">
                <span className="hidden sm:block text-3xl">ADN</span>
                <span className="hidden sm:block font-roboto text-lg">
                  {" "}
                  PRODUCCIONES SA
                </span>
              </div>
            )}
          </WipeLink>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex list-none gap-8">
            {navbarItems.map((item) => (
              <li
                key={item.to}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && handleDropdownEnter(item.label)
                }
                onMouseLeave={() => item.hasDropdown && handleDropdownLeave()}>
                {item.label === "Contacto" ? (
                  <span
                    onClick={handleContactoClick}
                    className={`px-4 py-2 tracking-wider rounded-lg font-normal text-sm transition-all duration-300 relative cursor-pointer ${
                      isHomePage && !isScrolled
                        ? "text-white hover:text-primary-400"
                        : "text-black hover:text-primary-600"
                    }`}>
                    {item.label}
                  </span>
                ) : (
                  <WipeLink
                    to={item.to}
                    className={
                      location.pathname === item.to
                        ? `px-4 py-2 tracking-wider rounded-lg font-normal text-sm transition-all duration-300 relative text-primary-600`
                        : `px-4 py-2 tracking-wider rounded-lg font-normal text-sm transition-all duration-300 relative ${
                            isHomePage && !isScrolled
                              ? "text-white hover:text-primary-400"
                              : "text-black hover:text-primary-600"
                          }`
                    }
                    onClick={(e) => {
                      if (item.hasDropdown) {
                        e.preventDefault();
                      } else if (item.label === "Inicio") {
                        handleInicioClick(e);
                      }
                    }}>
                    {item.label}
                  </WipeLink>
                )}

                {/* Dropdown Menu */}
                {item.hasDropdown && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 bg-black shadow-2xl border border-gray-800 min-w-[280px] animate-fade-in z-50 px-2 py-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                    <ul className="py-2">
                      {item.subitems.map((subitem, index) => (
                        <li key={subitem.to}>
                          <WipeLink
                            to={subitem.to}
                            className={
                              location.pathname === subitem.to
                                ? `block px-6 py-1 text-white text-sm font-light tracking-wide transition-all duration-200 hover:bg-primary-600 bg-primary-600/30`
                                : `block px-6 py-1 text-white text-sm font-light tracking-wide transition-all duration-200 hover:bg-primary-600`
                            }
                            onClick={closeMenu}>
                            {subitem.label.toUpperCase()}
                          </WipeLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-4 rounded-lg hover:border-white transition-colors"
            onClick={toggleMenu}
            aria-label="Abrir menú de navegación"
            aria-expanded={isMenuOpen}>
            {isMenuOpen ? (
              <X className="w-10 h-10 transition-colors duration-300 text-white" />
            ) : (
              <Menu
                className={`w-10 h-10 transition-colors duration-300 ${
                  isHomePage && !isScrolled ? "text-white" : "text-gray-900"
                }`}
              />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-gray-200 shadow-lg animate-fade-in">
            <ul className="">
              {navbarItems.map((item) => (
                <li key={item.to}>
                  {item.label === "Contacto" ? (
                    <span
                      onClick={handleContactoClick}
                      className="block w-full text-left px-8 py-4 text-text/60 font-medium border-b border-gray-400 transition-all duration-200 hover:text-primary-600 hover:bg-primary-50 hover:pl-10 cursor-pointer">
                      {item.label}
                    </span>
                  ) : (
                    <WipeLink
                      to={item.to}
                      className={
                        location.pathname === item.to
                          ? `block px-8 py-4 text-text/60 font-medium border-b border-gray-400 transition-all duration-200`
                          : `block px-8 py-4 text-text/60 font-medium border-b border-gray-400 transition-all duration-200 hover:text-primary-600 hover:bg-primary-50 hover:pl-10`
                      }
                      onClick={(e) => {
                        if (item.hasDropdown) {
                          e.preventDefault();
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label
                          );
                        } else if (item.label === "Inicio") {
                          handleInicioClick(e);
                        } else {
                          closeMenu();
                        }
                      }}>
                      {item.label}
                    </WipeLink>
                  )}

                  {/* Mobile Dropdown */}
                  {item.hasDropdown && openDropdown === item.label && (
                    <ul className="bg-black py-5 max-h-[200px] overflow-y-auto border-b border-gray-400 custom-scrollbar">
                      {item.subitems.map((subitem, index) => (
                        <li key={subitem.to}>
                          <WipeLink
                            to={subitem.to}
                            className={
                              location.pathname === subitem.to
                                ? `block px-12 py-3 text-white text-xs font-light tracking-wide transition-all duration-200 hover:bg-gray-900 `
                                : `block px-12 py-3 text-white text-xs font-light tracking-wide transition-all duration-200 hover:bg-gray-900`
                            }
                            onClick={closeMenu}>
                            {subitem.label.toUpperCase()}
                          </WipeLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
