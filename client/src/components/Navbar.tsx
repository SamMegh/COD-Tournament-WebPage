import { useState, useEffect } from 'react';
import logo from '../assets/B_logo-removebg-preview.png';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Tournament', href: '#tournament' },
    { name: 'Rules', href: '#rules' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'Leaderboard', href: '#leaderboard' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900 ${
        scrolled
          ? 'sm:bg-gray-900/20 backdrop-blur-md shadow-lg shadow-orange-500/10'
          : 'sm:bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  items-center justify-between h-20">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-linear-to-r from-orange-600 to-red-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative flex items-center space-x-3 bg-gray-900 px-4 py-2 rounded-lg">
                <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">
                  <img src={logo} alt="logo" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">
                    BattleCore
                  </h1>
                  <p className="text-xs text-orange-400">Tournament</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-800/50 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-orange-500 to-red-500 group-hover:w-3/4 transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-orange-600 to-red-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative px-6 py-2.5 bg-linear-to-r from-orange-500 to-red-600 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105">
                Register Now
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="w-full mt-4 px-6 py-3 bg-linear-to-r from-orange-500 to-red-600 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/50">
            Register Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;