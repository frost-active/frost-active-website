import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full h-20 z-50 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 h-full overflow-hidden">
          {/* Logo on the left */}
          <a
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 font-extrabold text-xl text-primary cursor-pointer"
          >
           <div className="relative top-[6px] left-[-30px] ">
              <img
                src="/images/logo2.png" loading="lazy"
                alt="FROST Logo"
                className="h-40 w-auto object-contain max-w-[180px]" // restrict height and width
              />
              </div>
          </a>

          {/* Desktop Navigation */}
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

            {/* Pre-Book Button - Desktop 
              <div className="-ml-2 -mr-2 mt-0">
                
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-primary/90 hover:bg-primary/90 text-white font-['Roboto'] px-5 sm:px-2 py-3 rounded-lg text-sm sm:text-base shadow-md">
                    <a href="/order">Pre-order for $1</a>
                  </Button>
                </motion.div>
              </div>
              */}


            {/* Invest Button - Desktop */}
                          <div className="-ml-2 -mr-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button className="bg-[#1F82D1] tracking-wide hover:bg-[#1F82D1] text-white font-['Roboto'] px-5 sm:px-3 py-3 rounded-lg text-sm sm:text-base shadow-md">
                                <a href="/invest">Invest</a>
                              </Button>
                            </motion.div>
                          </div>
          </nav>

          {/* Mobile Menu */}
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

                {/* Invest Button - Mobile */}
                                  
                                  <DropdownMenuItem asChild>
                                    <div className="w-full px-4 py-2">
                                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button className="w-full bg-[#1F82D1] tracking-wider hover:bg-primary/90 text-white rounded-md text-sm shadow-md">
                                          <a href="/invest" className="w-full block text-center">
                                            Invest 
                                          </a>
                                        </Button>
                                      </motion.div>
                                    </div>
                                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Spacer to avoid content being hidden under the fixed header */}
      <div className="h-20" />
    </>
  );
};

// ✅ Updated Box component with blue accents
const Box = ({ children }) => (
  <div className="relative rounded-md overflow-visible">
    {/* Top Blue Bar */}
    <div className="absolute -top-1 left-0 right-0 h-2 bg-[#389ED7] rounded-t-md z-0" />
    {/* Bottom Blue Bar */}
    <div className="absolute -bottom-1 left-0 right-0 h-2 bg-[#389ED7] rounded-b-md z-0" />
    {/* Left Faint Edge */}
    <div className="absolute top-0 bottom-0 -left-0.5 w-1 bg-[#389ED7]  rounded-l-md opacity-70 z-0" />
    {/* Right Faint Edge */}
    <div className="absolute top-0 bottom-0 -right-0.5 w-1 bg-[#389ED7]  rounded-r-md opacity-70 z-0" />

    {/* Box Content */}
    <div className="relative z-10 py-6 px-4 bg-white border shadow-md text-gray-800 text-sm sm:text-base text-center font-medium rounded-md">
      {children}
    </div>
  </div>
);

const CommunityPage = () => {
  return (
    <>
     {/*<Header />*/}

      {/* Hero Section */}
      <section className="mt-20 text-center bg-gradient-to-r from-[#CCD6E8] to-[#D9E3F8] h-[480px] sm:h-[1080px] pt-12 px-4 relative overflow-hidden">

  <h1 className="text-3xl sm:text-5xl font-bold text-[#021637]" style={{ fontFamily: 'Roboto' }}>
    Community & Beta
  </h1>

  <p className="mt-4 text-lg sm:text-xl text-[#FFFFFF] font-medium" style={{ fontFamily: 'Roboto' }}>
    Be among the first to experience <br />
    <span className="text-[#FFFFFF] font-medium tracking-widest" style={{ fontFamily: 'Roboto' }}>
      “The Power of FROST”
    </span>
  </p>

  {/* Full-bleed image */}
  <div className="mt-4 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
    <img
      src="/images/community-hero.png"
      alt="Community"
      className="w-full object-cover"
    />
  </div>

</section>


      {/* Beta Program Benefits */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-xl text-[#021637] sm:text-2xl font-bold text-center mb-8"
        style={{fontFamily:'Roboto'}}>
          Benefits of Joining our BETA PROGRAM
        </h2>
        <div className="grid grid-cols-1 text-[#021637]  m:grid-cols-2 lg:grid-cols-4 gap-6 font-normal"
        style={{fontFamily:'Roboto'}}>
          <Box>Early access to the <br /> FROST dock</Box> 
          <Box>Direct input on  product features &  feedback loops</Box>
          <Box>
            Exclusive “Beta  Tester” badge <br /> + early supporter perk
          </Box>
          <Box>
            A chance to co-create our future <br /> with the core team
          </Box>
        </div>
      </section>

      {/* Community Perks */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-xl text-[#021637] sm:text-2xl font-bold text-center mb-4">
          Community Perks
        </h2>
        <p className="text-center  text-[#021637] font-regular mb-8 tracking-widest"
        style={{fontFamily:'Roboto'}}>
          We don’t build for users <br /> We build with them.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-regular"
        style={{fontFamily:'Roboto'}}>
          <Box>
            Private access to our <br /> Discord/WhatsApp group
          </Box>
          <Box>Behind-the-scenes updates and early announcements</Box>
          <Box>Exclusive merch and pre-launch rewards</Box>
          <Box>Priority access to future FROST features</Box>
        </div>
      </section>

      {/* Join Section */}
      <section className="mt-10 text-center pb-12">
        <h3 className="text-lg text-[#021637] mb-4 font-bold"
        style={{fontFamily:'Roboto'}}>Join Now</h3>
        <div className="flex justify-center gap-6">
          <a href="https://www.facebook.com/share/16Q37LVMTM/" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/facebook.png"
              alt="Facebook"
              className="h-10 w-10 object-contain"
            />
          </a>
          <a href="https://whatsapp.com/channel/0029VbB70aGHAdNWV8ujXX3c" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/whatsapp.png"
              alt="WhatsApp"
              className="h-10 w-10 object-contain"
            />
          </a>
          <a href="https://discordapp.com/users/1381888153929121844" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/discord.png"
              alt="Discord"
              className="h-10 w-10 object-contain"
            />
          </a>
        </div>
      </section>
    </>
  );
};

export default CommunityPage;
