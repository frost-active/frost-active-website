import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const navLinks = [
  { name: 'Features', url: '/', hash: '#features' },
];

const aboutLinks = [
 // { name: 'Working', url: '/', hash: '#how-it-works' },
 // { name: 'Team', url: '/', hash: '#team' },
  { name: 'Technical Specification', url: '/', hash: '#technical' },
  // { name: 'Testimonials', url: '/', hash: '#testimonials' },
  { name: 'Contact Us', url: '/', hash: '#contact' },
  { name: 'Invest', url: '/invest' },
];

const Header = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
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
    navigate(`${url}${hash}`);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 font-extrabold text-xl text-primary cursor-pointer"
          >
            <div className="relative left-[-30px] top-[6px]">
              <img
                src="/images/logo2.png"
                loading="lazy"
                alt="FROST Aura Smart Hydration dock on a desk"
                className="h-40 w-auto object-contain max-w-[180px]"
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center lg:-ml-[150px]">
            <nav className="flex gap-10 items-center">
              
              {/* Pre-launch Button - Desktop (first) */}
              <div
                className="text-sm text-gray-800 hover:text-primary hover:underline cursor-pointer transition-all"
              >
                <a href="/reserve">Pre-launch</a>
              </div>

              {/* Features */}
              {navLinks.map((link) => (
                <span
                  key={link.name}
                  onClick={() => handleNavClick(link.url, link.hash)}
                  className="text-sm text-gray-800 hover:text-primary hover:underline cursor-pointer transition-all"
                >
                  {link.name}
                </span>
              ))}

              {/* Water Intake Calculator Button - Desktop */}
              <div className="text-sm text-gray-800 hover:text-primary hover:underline cursor-pointer transition-all">
                <a href="/waterintakecalculator">Water Intake Calculator</a>
              </div>

              {/* About Dropdown (Now includes Invest inside) */}
              <div
                className="relative group cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center gap-1 text-sm text-gray-800 hover:text-primary transition-all">
                  About <ChevronDown className="w-4 h-4 mt-[1px]" />
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
                    <a
                      key={link.name}
                      onClick={() => handleNavClick(link.url, link.hash)}
                      className="block px-4 py-2 text-gray-700 hover:bg-primary/90 hover:text-black transition-all text-sm cursor-pointer"
                    >
                      {link.name}
                    </a>
                  ))}
                </motion.div>
              </div>
            </nav>
          </div>

          {/* Mobile Navigation  */}
          <div className="md:hidden flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="h-6 w-6 -ml-[60px]" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white rounded-lg shadow-lg">
                
                {/* Pre-launch Button - Mobile (First Item) */} 
                <DropdownMenuItem asChild>
                  <div className="">
                    <motion.div>
                      <Button className="w-full text-white text-base">
                        <a href="/reserve" className="w-full block text-center">
                          Pre Launch
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <div className="w-full px-4 py-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <a href="/waterintakecalculator" className="w-full block text-center">
                        Water Intake Calculator
                      </a>
                    </motion.div>
                  </div>
                </DropdownMenuItem>

                {/* Other nav + about links */}
                {[...navLinks, ...aboutLinks].map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <span
                      onClick={() => handleNavClick(link.url, link.hash)}
                      className="text-gray-800 hover:bg-primary/90 rounded-md px-4 py-2 transition-all cursor-pointer"
                    >
                      {link.name}
                    </span>
                  </DropdownMenuItem>
                ))}

                {/* Invest Button - Mobile 
                <DropdownMenuItem asChild>
                  <div className="w-full px-4 py-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <a href="/invest" className="w-full block text-center">
                        Invest
                      </a>
                    </motion.div>
                  </div>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
