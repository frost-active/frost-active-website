import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (url, hash = '') => {
    setIsMenuOpen(false);
    if (url.startsWith('http')) {
      window.open(url, '_self');
    } else {
      navigate(`${url}${hash}`);
    }
  };

  const menuItems = [
    // { label: 'Features', action: () => handleNavClick('/', '#features') },
    { label: 'WebApp', action: () => handleNavClick('https://app.frostactive.com') },
    { label: 'Water Intake Calculator', action: () => handleNavClick('/waterintakecalculator') },
    { label: 'Invest', action: () => handleNavClick('/invest') },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#E7F7FF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2 font-extrabold text-xl text-primary cursor-pointer">
              <div className="relative left-[-20px] top-[0px]">
                <img
                  src="/images/logo3.png"
                  loading="lazy"
                  alt="FROST Aura"
                  className="h-40 w-auto object-contain max-w-[160px]"
                />
              </div>
            </a>

            {/* Center Announcement */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center top-1/2 -translate-y-1/2 max-md:left-[62%] max-md:scale-40">
              <motion.a
                href="https://www.indiegogo.com/en/projects/frostactive-38748367/stay-hydrated-focused-balanced-meet-frost-aura?ref=search"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ width: "auto" }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex items-center justify-center gap-2 h-8 md:h-9 px-3 md:px-4 text-[11px] sm:text-xs md:text-base rounded-full bg-white text-[#41587E] font-medium shadow-lg border border-[#41587E]/100 overflow-hidden cursor-pointer hover:shadow-[0_0_25px_rgba(235,20,120,0.6)] transition-all duration-300"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EB1478] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EB1478]"></span>
                </span>

                <span className="whitespace-nowrap">
                  Pre-Launch on
                  <span className="ml-1 font-semibold text-[#EB1478]">Indiegogo</span>
                </span>
              </motion.a>
            </div>

            {/* MENU BUTTON */}
            <div className="relative lg:-mr-2 -mr-3 ">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  relative flex items-center gap-2 px-3 py-2 rounded-full
                  font-semibold text-sm tracking-wide
                  border border-[#2F6995]/30
                  bg-white text-[#2F6995]
                  shadow-[0_0_15px_rgba(47,105,149,0.25)]
                  hover:shadow-[0_0_25px_rgba(47,105,149,0.5)]
                  transition-all duration-300
                  overflow-hidden
                "
              >

                {/* Shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2F6995]/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />

                {/* Hamburger Animation */}
                <span className="flex flex-col justify-center gap-[4px] w-4 h-4">
                  <motion.span
                    animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="block h-[1.5px] w-4 bg-[#2F6995] rounded-full origin-center"
                  />
                  <motion.span
                    animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                    className="block h-[1.5px] w-3 bg-[#2F6995] rounded-full"
                  />
                  <motion.span
                    animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="block h-[1.5px] w-4 bg-[#2F6995] rounded-full origin-center"
                  />
                </span>

                {isMenuOpen && (
                  <span className="absolute inset-0 rounded-full border border-[#2F6995]/40 animate-ping" />
                )}
              </motion.button>

              {/* DROPDOWN MENU */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}

                    /* MOBILE WIDTH SMALLER */
                    className="absolute right-0 mt-3 w-52 md:w-52 rounded-2xl overflow-hidden z-50 bg-white border border-[#2F6995]/15 shadow-xl"
                  >
                    <div className="p-2">

                      {menuItems.map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          onClick={item.action}
                          className="
                            group flex items-center px-4 py-3
                            rounded-xl cursor-pointer
                            text-[#2F6995] font-medium text-sm
                            hover:bg-gray-100
                            transition-all duration-200
                          "
                        >
                          {item.label}

                          <motion.span
                            initial={{ opacity: 0, x: -4 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="ml-auto text-[#2F6995]/40 text-xs"
                          >
                            →
                          </motion.span>
                        </motion.div>
                      ))}

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>
      </header>

      {/* Click outside to close */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  );
};

export default Header;