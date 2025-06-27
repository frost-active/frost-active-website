// No change in imports
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// Navigation links
const navLinks = [
  { name: 'Home', url: '/' },
  { name: 'Features', url: '/#features' },
  { name: 'Working', url: '/#how-it-works' },
  { name: 'Team', url: '/#team' },
  { name: 'Testimonials', url: '/#testimonials' },
  { name: 'Contact Us', url: '/#try' },
];

const Header = () => {
  const navigate = useNavigate();
  const navTimeout = useRef(null);

  const handleNavClick = (url) => {
    if (navTimeout.current) {
      clearTimeout(navTimeout.current);
    }
    navTimeout.current = setTimeout(() => {
      navigate(url);
      navTimeout.current = null;
    }, 300);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-20 z-50 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 h-full overflow-hidden">
          <a
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 font-extrabold text-xl text-primary cursor-pointer"
          >
            <div className="relative top-[6px] left-[-30px]">
              <img
                src="/images/logo2.png" loading="lazy"
                alt="FROST Logo"
                className="h-40 w-auto object-contain max-w-[180px]"
              />
            </div>
          </a>

          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <span
                key={link.name}
                onClick={() => handleNavClick(link.url)}
                className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition cursor-pointer"
                style={{ fontFamily: 'Roboto', fontWeight: '800' }}
              >
                {link.name}
              </span>
            ))}
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white rounded-lg shadow-lg">
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <span
                      onClick={() => handleNavClick(link.url)}
                      className="text-gray-800 hover:bg-blue-100 px-4 py-2 rounded transition cursor-pointer"
                      style={{ fontFamily: 'Roboto', fontWeight: '400' }}
                    >
                      {link.name}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="h-20" />
    </>
  );
};

const AboutPage = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-[#389ED7] text-white text-center h-[360px] sm:h-[580px] pt-28 pb-16 relative overflow-hidden">
      <div className="-mt-14 container mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ fontFamily: 'Roboto' }}>
          About Us
        </h1>
        <p className="text-lg sm:text-xl font-medium tracking-widest" style={{ fontFamily: 'Roboto' }}>
          “a sip of water, a deep breath, a mindful pause”
        </p>
      </div>
      {/* SVG for the curved bottom section */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] sm:h-[180px]" > {/* Adjust height as needed */}
        <svg
          className="block w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          
          {/*
            The path below creates a subtle upward curve at the bottom.
            - M0,100 starts at bottom-left.
            - C bezier curve control points.
            - L100,100 draws to bottom-right.
            - Z closes the path.
            The fill color #F3F4F6 (light gray) is chosen to mimic the image.
          */}
          <path d="M0,100 C20,50 80,50 100,100 L100,100 L0,100 Z" fill="#FFFFFF"></path>
        </svg>
      <div className="absolute bottom-5 -sm:-bottom-2 left-0 w-full">
              <img src="/images/waves.png" loading="lazy" alt="Waves" className="w-full" />
          </div>
      </div>
    </section>

      {/* Main Content */}
      <section className="bg-white py-16 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center -mt-8">
          <p className="text-sm  text-[#021637] font-bold" style={{ fontFamily: 'Roboto', letterSpacing: '0.2em' }}>
            We’re not building a gadget <br /> We’re building a ritual
          </p>
          <p className="text-lg sm:text-xl font-bold mt-4 text-[#021637]" style={{ fontFamily: 'Roboto' }}>
            At FROST, we believe wellness begins with the simplest acts
          </p>
          <p className="mt-2 text-[#021637]" style={{ fontFamily: 'Roboto', letterSpacing: '0.1em' }}>
            In today’s fast-moving world, even these basics get lost in the noise.
          </p>
        </div>

        {/* Section 1 */}
<div className="flex flex-col md:flex-row items-center justify-between gap-8">
  <div className="mt-12 md:w-1/2">
    <h3 className="font-semibold text-[#389ED7] -mb-2" style={{ fontFamily: 'Roboto', fontSize: '21px' }}>
      That’s why we created FROST Aura
    </h3>
    <p className="text-26 font-regular text-[#021637] leading-tight mt-2" style={{ fontFamily: 'Roboto' }}>
      A screen-free desktop companion that gently reminds <br />
      you to <span className="tracking-widest">hydrate, breathe, stretch, and reset.</span>
      <br />
      No apps. No distractions. Just presence.
    </p>
  </div>
  <img src="/images/about1.png" alt="Team Working" className="w-full sm:w-[350px] h-auto mt-6 md:mt-0" />
</div>

{/* Section 2 */}
<div className="flex flex-col md:flex-row items-center justify-between gap-8">
  <div className="md:mt-[-90px] md:w-1/2">
    <h3 className="font-bold text-[#389ED7] -mb-2" style={{ fontFamily: 'Roboto', fontSize: '21px' }}>
      FROST is more than a product “it’s a
    </h3>
    <h3 className="font-bold text-[#389ED7] -mb-2" style={{ fontFamily: 'Roboto', fontSize: '21px' }}>
      movement”
    </h3>
    <p className="text-[#021637] leading-tight mt-2" style={{ fontFamily: 'Roboto' }}>
      One that starts on your desk and flows into how you live.
      <br />
      Join us in bringing calm back to our days, one sip at a time.
    </p>
  </div>
  <div className="mt-6 md:mt-[-70px]">
    <img src="/images/about3.png" alt="Team Meeting" className="w-full sm:w-[350px] h-auto rotate-8" />
  </div>
</div>

{/* Section 3 */}
<div className="flex flex-col md:flex-row items-center justify-between gap-8">
  <div className="md:mt-[-112px] md:w-1/2">
    <h3 className="text-lg font-bold text-[#389ED7] -mb-2" style={{ fontFamily: 'Roboto', fontSize: '21px' }}>
      We’re a small team{' '} {/* Added a space here for separation */}
      <span className="text-[#021637] font-normal leading-tight text-base  ">
        of engineers, designers, and dreamers based in  India, united by a shared belief
      </span>
    </h3>
     
    {/* This p tag remains as is */}
    <p className="text-[#021637] tracking-widest leading-tight mt-2" style={{ fontFamily: 'Roboto' }}>
      Wellness shouldn't be another notification. It should be a lifestyle.
    </p>
  </div>
  <div className="mt-6 md:mt-[-80px]">
    <img src="/images/about2.png" alt="Fun Team" className="w-full sm:w-[350px] h-auto rotate-18" />
  </div>
</div>

      </section>
    </>
  );
};

export default AboutPage;
