import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { name: 'Features', url: '/', hash: '#features' },
];

const aboutLinks = [
  { name: 'Water Intake Calculator', url: '/waterintakecalculator' },
  { name: 'Invest', url: '/invest' },
];

const Header = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeTimeout = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsAboutOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setIsAboutOpen(false), 150);
  };

  const handleNavClick = (url, hash = '') => {
    setIsAboutOpen(false);
    setIsMobileMenuOpen(false);

    if (url.startsWith('http')) {
      window.open(url, '_self');
    } else {
      navigate(`${url}${hash}`);
    }
  };

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
                  alt="FROST Aura Smart Hydration dock on a desk"
                  className="h-40 w-auto object-contain max-w-[160px]"
                />
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 justify-center lg:-ml-[150px]">
              <nav className="flex gap-10 items-center">
                {navLinks.map((link) => (
                  <span
                    key={link.name}
                    onClick={() => handleNavClick(link.url, link.hash)}
                    className="text-base text-[#41587E] hover:text-primary hover:underline cursor-pointer transition-all"
                  >
                    {link.name}
                  </span>
                ))}

                <div className="text-base text-[#41587E] hover:text-primary hover:underline cursor-pointer transition-all">
                  <a
                    href="https://app.frostactive.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WebApp
                  </a>
                </div>

                {/* Desktop About Dropdown */}
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center gap-1 text-base text-[#41587E] hover:text-primary transition-all">
                    About
                    <ChevronDown
                      className={`w-4 h-4 mt-[1px] transition-transform duration-300 ${
                        isAboutOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isAboutOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={`absolute -left-12 mt-4 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-10 ${
                      isAboutOpen ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {aboutLinks.map((link) => (
                      <span
                        key={link.name}
                        onClick={() => handleNavClick(link.url)}
                        className="block px-4 py-2 text-gray-700 hover:bg-primary/90 hover:text-black transition-all text-sm cursor-pointer"
                      >
                        {link.name}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </nav>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-2">
              <DropdownMenu
                open={isMobileMenuOpen}
                onOpenChange={setIsMobileMenuOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#41587E]">
                    <Menu className="h-6 w-6 -ml-[60px]" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="bg-white rounded-lg shadow-lg w-56 p-2"
                >
                  <DropdownMenuItem asChild>
                    <span
                      onClick={() => handleNavClick('/', '#features')}
                      className="text-[#41587E] hover:bg-gray-100 rounded-md px-4 py-2 transition-all cursor-pointer block"
                    >
                      Features
                    </span>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <span
                      onClick={() =>
                        handleNavClick('https://app.frostactive.com')
                      }
                      className="text-[#41587E] hover:bg-gray-100 rounded-md px-4 py-2 transition-all cursor-pointer block"
                    >
                      Web App
                    </span>
                  </DropdownMenuItem>

                  {/* Mobile About */}
                  <div className="w-full">
                    <button
                      onClick={() => setIsAboutOpen(!isAboutOpen)}
                      className="w-full flex items-center justify-between text-[#41587E] px-4 py-2 hover:bg-gray-100 rounded-md transition-all"
                    >
                      About
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isAboutOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: isAboutOpen ? 'auto' : 0,
                        opacity: isAboutOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col mt-1">
                        <span
                          onClick={() =>
                            handleNavClick('/waterintakecalculator')
                          }
                          className="text-[#41587E] pl-8 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition-all"
                        >
                          Water Intake Calculator
                        </span>

                        <span
                          onClick={() => handleNavClick('/invest')}
                          className="text-[#41587E] pl-8 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition-all"
                        >
                          Invest
                        </span>
                      </div>
                    </motion.div>
                  </div>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>

          </div>
        </div>
      </header>
    </>
  );
};

export default Header;