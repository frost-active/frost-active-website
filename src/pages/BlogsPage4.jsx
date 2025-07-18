import React, { useState, useRef  } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Menu, Bookmark } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';


const handleSaveBookmark = () => {
    const title = document.title;
    const url = window.location.href;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (window.sidebar && window.sidebar.addPanel) {
      window.sidebar.addPanel(title, url, '');
    } else if (window.external && ('AddFavorite' in window.external)) {
      window.external.AddFavorite(url, title);
    } else {
      if (isMobile) {
        alert("To bookmark this page, tap your browser’s menu and select 'Add to bookmarks' or 'Add to Home screen'.");
      } else {
        alert(`Press Ctrl+D (Cmd+D for Mac) to bookmark this page manually.\n\nURL: ${url}`);
      }
    }
  };


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

            {/* Invest Button - Desktop */}
               <div className="-ml-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-primary hover:bg-primary/90 text-white px-5 sm:px-6 py-3 rounded-lg text-sm sm:text-base shadow-md">
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
                                        <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-md text-sm shadow-md">
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


const BlogsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="-mt-20 min-h-screen bg-white px-6 py-28 font-sans">
      <Header />

      <main className="max-w-5xl mx-auto mt-12 border border-gray-300 p-10 rounded-md shadow-sm">
        <div className="-mt-4 flex justify-end">
        <button
            onClick={() => {
              const title = document.title;
              const url = window.location.href;
              const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

              if (window.sidebar && window.sidebar.addPanel) {
                window.sidebar.addPanel(title, url, '');
              } else if (window.external && ('AddFavorite' in window.external)) {
                window.external.AddFavorite(url, title);
              } else {
                if (isMobile) {
                  alert("To bookmark this page, tap your browser’s menu and select 'Add to bookmarks' or 'Add to Home screen'.");
                } else {
                  alert(`Press Ctrl+D (Cmd+D for Mac) to bookmark this page manually.\n\nURL: ${url}`);
                }
              }
            }}
            title="Save Bookmark"
            className="w-10 h-10 bg-[#389ED7] rounded-full flex items-center justify-center text-white hover:bg-[#389ED7] transition"
            aria-label="Save Bookmark"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>


        <div className="mt-10 flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#021637]"
          style={{fontFamily: "Roboto", fontWeight:"semi-bold"}}>
            Healing Frequencies: Can Sound Actually <span className="text-[#389ED7]">Energize Your Water?</span> 
          </h1>
        </div>
        

         <div className="space-y-2 text-sm text-[#021637]"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            Water is more than just a thirst quencher. For centuries, cultures around the world have believed that water has the ability to store energy, respond to vibration, and even carry intention. With the rise of sound healing and frequency therapy, a new question is stirring interest in the wellness world:
          </p>
          <p>
            Can sound actually energize your water?
          </p>
          <p>
            It may sound mystical, but emerging science and ancient wisdom are converging on a fascinating truth: your water might be listening.
          </p>
        </div>

         <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
         What Are <span className="text-[#389ED7]">Healing Frequencies?</span> 
        </h2>

        <div className="space-y-2 text-sm text-[#021637]"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            Healing frequencies are specific sound waves, often measured in Hertz (Hz), believed to affect the human body and mind in subtle but powerful ways. Some of the most popular frequencies include:
          </p>
           <ul className="list-disc pl-10 mt-2">
            <li>432 Hz – Known as the “miracle tone” or “natural frequency of the universe,” it promotes mental clarity, emotional healing, and cellular regeneration.</li>
            <li>528 Hz – Often called the “love frequency,” it is associated with DNA repair and transformation.</li>
            <li>777 Hz – A spiritually aligned frequency linked to intuition, harmony, and energy purification.</li>
           </ul>

           <p>
            These tones are commonly used in meditation, sound baths, and chakra therapy, and are now gaining attention in the field of hydration wellness.
           </p>
          <br />

           <p>
            Water and Vibration: What the Research Says
           </p>

           <p>
            Water is a highly receptive substance. Scientific studies and alternative research have shown that:
           </p>

             <ul className="list-disc pl-10 mt-2">
              <li>Water molecules can change structure when exposed to specific sound vibrations.</li>
              <li>Masaru Emoto’s famous experiments (though controversial) claimed that water crystals form different patterns depending on the words, music, or emotions they're exposed to.</li>
              <li>Cymatics — the study of visible sound vibration — demonstrates how sound can rearrange particles (including water) into geometric patterns.</li>
             </ul>

             <p>
              While mainstream science remains cautious, the anecdotal and observational evidence continues to grow. And the implications for hydration are profound.
             </p>
        </div>


         <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
         Can<span className="text-[#389ED7]"> Energized Water Improve </span>Your Wellness?
        </h2>

        <div className="space-y-2 text-sm text-[#021637]"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            Proponents of sound-charged or energized water claim benefits such as:
          </p>

             <ul className="list-disc pl-10 mt-2">
              <li>Enhanced cellular absorption of water</li>
              <li>Improved mental clarity and mood elevation</li>
              <li>Reduced feelings of stress and tension</li>
              <li>A deeper connection to mindful rituals around drinking water</li>
             </ul>

            <p>
              In today’s high-pressure work environments, where hydration is already neglected, adding intention and healing energy to your water can turn a habit into a holistic act of wellness.
            </p>
        </div>
<br />

{/* Responsive image grid */}
<div className="flex flex-col md:flex-row  md:space-x-8 space-y-4 md:space-y-0 mb-10">
  <div className="w-full md:w-1/2 h-[500px] border border-gray-300 rounded overflow-hidden">
    <img
      src="/images/blog4-1.jpg" loading="lazy"
      alt="Hydration Tip 1"
      className="w-full h-full object-fill"
    />
  </div>
  <div className="w-full md:w-1/2 aspect-[3/2] border border-gray-300 rounded overflow-hidden">
    <img
      src="/images/blog4-2.jpg" loading="lazy"
      alt="Hydration Tip 2"
      className="w-full h-full object-fill"
    />
  </div>
</div>

        <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
         Frost Aura: <span className="text-[#389ED7]"> Bringing Frequency Healing to Your Desk</span>
        </h2>

            <div className="space-y-2 text-sm text-[#021637]"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            This is where Frost Aura stands apart from every other hydration solution. It’s not just a water reminder — it’s a wellness ritual in a device.
          </p>
          <p>With built-in support for healing sound frequencies like 432 Hz and 777 Hz, Frost Aura does what apps and bottles can’t:</p>

            <ul className="list-disc pl-10 mt-2">
              <li>Plays energizing tones through your bottle dock</li>
              <li>Turns hydration into a sensory, mindful experience</li>
              <li>Combines sound therapy with daily water intake</li>
              <li>Helps rewire your workday with calm, clarity, and care</li>
            </ul>

            <p>
              Whether you believe in water memory or just want a peaceful break in your routine, Frost Aura gives your hydration moments meaning, energy, and healing.
            </p>
        </div>


        <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
         ✅ Conclusion: <span className="text-[#389ED7]">Hydration Meets </span>Harmony
        </h2>

            <div className="space-y-2 text-sm text-[#021637]"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
           The idea that sound can energize water may once have been considered fringe — but today, it’s part of a growing movement to <b>treat wellness as more than just steps and data. </b>
          </p>

          <p>
            <b>With Frost Aura, </b>hydration becomes a practice of presence. You’re not just drinking water — you’re drinking intention, vibration, and vitality.
          </p>
        </div>
        <br />

        <div className="flex flex-col md:flex-row  justify-center md:space-x-8 space-y-4 md:space-y-0 mb-10">
  <div className="w-full md:w-1/2 h-[600px] border border-gray-300 rounded overflow-hidden">
    <img
      src="/images/blog4-3.jpg" loading="lazy"
      alt="Hydration Tip 1"
      className="w-full h-full object-fill"
    />
  </div>
  </div>

        <b><i>Because your water deserves more than silence.</i></b>

        
        

        <div className="mt-10">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-[#389ED7] text-white rounded-full shadow"
          >
            Go Back
          </button>
        </div>
      </main>
    </div>
  );
};

export default BlogsPage;
