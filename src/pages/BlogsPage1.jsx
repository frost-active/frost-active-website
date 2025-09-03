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
                                        <Button className="w-full bg-[#1F82D1] tracking-wider text-white rounded-md text-sm shadow-md">
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
    <div className="mt-0 min-h-screen bg-white px-6 py-28 font-sans">
 

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
            Why <span className="text-[#389ED7]">80% of Professionals Are Dehydrated</span> and Don’t Even Know It
          </h1>
        </div>

        <div className="space-y-2 text-sm text-[#021637]"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            In the hustle of meetings, emails, deadlines, and back-to-back calls, one essential habit silently slips through the cracks—drinking enough water. Despite increasing health awareness, studies show that up to 80% of working professionals fail to stay properly hydrated throughout the day. This hidden crisis is affecting focus, energy, and long-term health, often without anyone realizing the root cause.
          </p>
        </div>

        <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
         The <span className="text-[#389ED7]"> Dehydration Epidemic</span> in Modern Workplaces
        </h2>
        <div className="text-sm text-[#021637] space-y-2 mb-6"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
           Whether you're in a corporate office or working remotely, it’s easy to forget to sip water when you're deep into tasks. Research from the World Health Organization and workplace wellness surveys shows that most adults do not meet their daily hydration needs, leading to what experts call "low-grade chronic dehydration."
          </p>
        </div>

        
          <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
         Here <span className="text-[#389ED7]"> why it </span> happens:
        </h2>
        <div className="text-sm text-[#021637] space-y-2 mb-6"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <ul className="list-disc pl-10 mt-2">
            <li>Coffee and energy drinks replace water intake</li>
            <li>Air-conditioned environments accelerate moisture loss</li>
            <li>Stress hormones alter kidney function and fluid retention</li>
          </ul>
        </div>
        



        <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
         The Hidden Costs of  <span className="text-[#389ED7]">Dehydration </span> at work
        </h2>
        <div className="text-sm text-[#021637] space-y-2 mb-6"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            Even mild dehydration—just a 1-2% drop in body water—can have serious cognitive effects:
          </p>
          <ul className="list-disc pl-10 mt-2">
            <li>⚠️ Decreased alertness and focus</li>
            <li>⚠️ Fatigue and brain fog</li>
            <li>⚠️ Increased stress levels</li>
            <li>⚠️ Headaches and poor memory recall</li>
          </ul>
          <br />
          <p>
            In fact, according to Office H2O’s productivity study, just 1% dehydration can cause a 12% drop in productivity, while 3-4% dehydration can reduce output by up to 25%
            <br /> <br />
            Imagine the cumulative impact this has across an entire workforce.
          </p>
        </div>



         <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
         Why You May Not Even Realize<span className="text-[#389ED7]"> You're Dehydrated</span> 
        </h2>
        <div className="text-sm text-[#021637] space-y-2 mb-6"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
           Most professionals assume they’re hydrated if they’re not feeling thirsty. But thirst is a delayed signal. If you only drink water when your body asks, you’re already running behind. Plus, caffeine, air-conditioning, and high screen time deplete hydration faster than you might think.
           <br /> <br />

           And if you’re feeling tired by 2 PM every day—it might not be your workload. It might be your water intake.
          </p>
        </div>


       
        <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
         How to<span className="text-[#389ED7]"> Stay Hydrated</span> Without Disrupting Your Workflow
        </h2>
        <div className="text-sm text-[#021637] space-y-2 mb-6"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <ul className="list-disc pl-10 mt-2">
            <li>Keep your bottle always visible on your desk</li>
            <li>Sip water every 20–30 minutes, not just when you feel thirsty</li>
            <li>Use gentle hydration reminders—not noisy apps or alarms</li>
            <li>Pair hydration with movement or breathing breaks</li>
            <li>Make it a ritual, not a chore</li>
          </ul>
          </div>
        
         {/* Responsive image grid */}
<div className="flex flex-col md:flex-row  md:space-x-8 space-y-4 md:space-y-0 mb-10">
  <div className="w-full md:w-1/2 h-[450px] border border-gray-300 rounded overflow-hidden">
    <img
      src="/images/blog1-1.jpg" loading="lazy"
      alt="Hydration Tip 1"
      className="w-full h-full object-fill"
    />
  </div>
  <div className="w-full md:w-1/2 aspect-[3/2] border border-gray-300 rounded overflow-hidden">
    <img
      src="/images/blog1-2.jpg" loading="lazy"
      alt="Hydration Tip 2"
      className="w-full h-full object-fill"
    />
  </div>
</div>
        
          <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
          ✅ Conclusion: Enter <span className="text-[#389ED7]">Frost Aura –  </span> Your Smart Hydration Partner at Work
        </h2>
         <div className="text-sm text-[#021637] space-y-2 mb-6"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            This is where Frost Aura comes in — a smart desktop hydration device that goes beyond simple reminders. Designed for modern professionals, Frost Aura:
          </p>
          <ul className="list-disc pl-10 mt-2">
            <li>Reminds you to drink water before your body asks</li>
            <li>Plays healing sound frequencies to calm and energize you</li>
            <li>Encourages micro-breaks with Pomodoro timers and wellness nudges</li>
            <li>Works with any bottle or mug — no need to buy anything new</li>
            <li>Functions completely screen-free, with optional app integration</li>
          </ul>
          <br /> 
          <p>
            Frost Aura transforms hydration into a daily ritual of well-being and focus — right at your desk. No distractions. No data overload. Just smarter, mindful living.
          </p>
          <br />
          <p>
            Ready to rethink workplace wellness?
 Explore Frost Aura — and take the first sip toward better focus, energy, and health.
          </p>

          
          </div>


<div className="flex flex-col md:flex-row  justify-center md:space-x-8 space-y-4 md:space-y-0 mb-10">
  <div className="w-full md:w-1/2 h-[450px] border border-gray-300 rounded overflow-hidden">
    <img
      src="/images/blog1-3.jpg" loading="lazy"
      alt="Hydration Tip 1"
      className="w-full h-full object-fill"
    />
  </div>
  </div>
      
        <b><i>Stay hydrated. Stay sharp. Stay well.</i></b>

      

        <div className="mt-10">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-[#389ED7] text-white rounded-full shadow">
            Go Back
          </button>
        </div>
      </main>
    </div>
  );
};

export default BlogsPage;
