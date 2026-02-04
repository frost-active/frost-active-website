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
  { name: 'Technical Specification', url: '/', hash: '#technical' },
  { name: 'Contact Us', url: '/', hash: '#contact' },
  { name: 'Invest', url: '/invest' },

  // ✅ Web App link
  { name: 'Web App', url: 'https://app.frostactive.com' },
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

  // ✅ FIX: open absolute URLs correctly
  const handleNavClick = (url, hash = '') => {
    if (url.startsWith('http')) {
      window.open(url, '_self');
    } else {
      navigate(`${url}${hash}`);
    }
  };

  return (
    <>
      <style>{`
        @keyframes quizBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        .quiz-blink {
          animation: quizBlink 1.2s infinite;
        }
      `}</style>

      <header className="fixed top-0 left-0 w-full z-50 bg-white">
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
                    className="text-base text-[#2F6995] hover:text-primary hover:underline cursor-pointer transition-all"
                  >
                    {link.name}
                  </span>
                ))}

                <div className="text-base text-[#2F6995] hover:text-primary hover:underline cursor-pointer transition-all">
                  <a href="/waterintakecalculator">Water Intake Calculator</a>
                </div>

                {/* About Dropdown */}
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center gap-1 text-base text-[#2F6995] hover:text-primary transition-all">
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

                {/* QUIZ */}
                <div className="text-lg font-semibold text-[#2F6995] hover:underline cursor-pointer transition-all quiz-blink">
                  <a href="/quiz">QUIZ</a>
                </div> 
              </nav>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-2">
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#2F6995]">
                    <Menu className="h-6 w-6 -ml-[60px]" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="bg-white rounded-lg shadow-lg">

  {/* Existing nav links */}
  {navLinks.map((link) => (
    <DropdownMenuItem key={link.name} asChild>
      <span
        onClick={() => handleNavClick(link.url, link.hash)}
        className="text-[#2F6995] hover:bg-primary/90 rounded-md px-4 py-2 transition-all cursor-pointer"
      >
        {link.name}
      </span>
    </DropdownMenuItem>
  ))}

  {/* ✅ ADD Water Intake Calculator for MOBILE ONLY */}
  <DropdownMenuItem asChild>
    <span
      onClick={() => handleNavClick('/waterintakecalculator')}
      className="text-[#2F6995] hover:bg-primary/90 rounded-md px-4 py-2 transition-all cursor-pointer"
    >
      Water Intake Calculator
    </span>
  </DropdownMenuItem>

  {/* About links */}
  {aboutLinks.map((link) => (
    <DropdownMenuItem key={link.name} asChild>
      <span
        onClick={() => handleNavClick(link.url, link.hash)}
        className="text-[#2F6995] hover:bg-primary/90 rounded-md px-4 py-2 transition-all cursor-pointer"
      >
        {link.name}
      </span>
    </DropdownMenuItem>
  ))}
 
 
                      {/*QUIZ */}
                   <div className="w-full px-4 py-2 quiz-blink">
                    <a href="/quiz" className="w-full block text-[#2F6995] font-semibold">
                      QUIZ
                    </a>
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
