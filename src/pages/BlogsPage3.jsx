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
            Breaking the Myth: Thirst Isn’t the <span className="text-[#389ED7]"> First Sign of Dehydration</span> 
          </h1>
        </div>

        <div className="space-y-2 text-sm text-[#021637]"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            Most people believe that if they’re not thirsty, they’re hydrated. But here’s the truth: by the time you feel thirsty, your body is already dehydrated.      
          </p>
          <p>
            This is one of the most common and dangerous misconceptions about hydration — especially among professionals who are often glued to their screens, powering through their workdays without pausing to sip water.
          </p>
          <p>
            Let’s unpack this myth and explore what dehydration really looks like — before thirst even begins.
          </p>
        </div>



         <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
         <span className="text-[#389ED7]"> Thirst Is a</span> Delayed Signal
        </h2>

         <div className="space-y-2 text-sm text-[#021637]"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            The sensation of thirst is regulated by your brain, specifically the hypothalamus. It kicks in only after your body has already experienced a drop in fluid levels. In most cases, you’ve already lost 1–2% of your body’s water content by the time you feel thirsty — enough to affect mental performance, focus, and mood.
          </p>
          <p>
            In short, if thirst is your first signal to drink, you're already playing catch-up.
          </p>
        </div>

         <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
        Early Signs of <span className="text-[#389ED7]">Dehydration </span>You Might Be Ignoring
        </h2>

         <div className="space-y-2 text-sm text-[#021637]"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            Even before you notice dry mouth or thirst, your body gives subtle cues that it's running low on water:
          </p>
          <ul className="list-disc pl-10 mt-2">
            <li>Fatigue or low energy by mid-day</li>
            <li>Brain fog or difficulty concentrating</li>
            <li>Mild headaches or eye strain</li>
            <li>Irritability or mood swings</li>
            <li>Dry skin or chapped lips</li>
            <li>Reduced productivity or motivation</li>
          </ul>
          <p>
            These symptoms often go unrecognized or are blamed on workload, stress, or poor sleep — but in reality, dehydration could be the root cause.
          </p>
        </div>


        <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
       Why <span className="text-[#389ED7]"> Professionals Are </span>Especially at Risk
        </h2>

        <div className="space-y-2 text-sm text-[#021637]"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            In modern work environments — whether at home or in the office — professionals face a unique combination of hydration challenges:
          </p>
           <ul className="list-disc pl-10 mt-2">
            <li><b>Screen addiction: </b>Increased screen time delays your awareness of thirst.</li>
            <li><b>Air-conditioned spaces: </b>Dry air accelerates moisture loss through skin and breath.</li>
            <li><b>Busy schedules: </b> Long meetings and focus sessions reduce time for water breaks.</li>
            <li><b>Caffeine dependency: </b>Tea, coffee, and energy drinks act as mild diuretics, leading to more water loss.</li>
           </ul>
           <p>
            Without proactive hydration habits, professionals gradually slip into <b>low-grade chronic dehydration, </b>which silently affects performance and long-term health.
           </p>
        </div>
<br />
         {/* Responsive image grid */}
<div className="flex flex-col md:flex-row  md:space-x-8 space-y-4 md:space-y-0 mb-10">
  <div className="w-full md:w-1/2 h-[450px] border border-gray-300 rounded overflow-hidden">
    <img
      src="/images/blog3-1.jpg" loading="lazy"
      alt="Hydration Tip 1"
      className="w-full h-full object-fill"
    />
  </div>
  <div className="w-full md:w-1/2 aspect-[3/2] border border-gray-300 rounded overflow-hidden">
    <img
      src="/images/blog3-2.jpg" loading="lazy"
      alt="Hydration Tip 2"
      className="w-full h-full object-fill"
    />
  </div>
</div>

        <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
       Debunking the <span className="text-[#389ED7]">  Myth = Empowering </span>Daily Wellness
        </h2>

         <div className="space-y-2 text-sm text-[#021637]"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            Now that we know thirst isn’t the first sign — what should we rely on instead?
          </p>
             <ul className="list-disc pl-10 mt-2">
              <li><b>Set hydration reminders </b>(ideally gentle, non-digital ones)</li>
              <li><b>Pair water with daily rituals </b>like breaks or meditation</li>
              <li><b>Keep a bottle always visible and accessible</b></li>
              <li><b>Track your intake, </b>especially during intense or long work sessions</li>
              <li><b>Start your day with water, </b>not just caffeine</li>
             </ul>

            <p>
            Hydration isn’t a reactive task — it’s a <b>proactive habit.</b> And like any habit, it needs subtle reinforcement and consistency.
            </p>
        </div>




        <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
       How  <span className="text-[#389ED7]"> Frost Aura</span> Makes Proactive Hydration Effortless
        </h2>


        <div className="space-y-2 text-sm text-[#021637]"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
           This is where <b>Frost Aura</b> comes in — a <b>smart hydration wellness device </b> designed for modern professionals who want to stay healthy and productive, without constant digital distractions.
          </p>
          <p>
            Frost Aura gently encourages hydration before thirst kicks in by:
          </p>

          <ul className="list-disc pl-10 mt-2">
            <li>Using <b>LED reminders and subtle cues </b> instead of noisy alerts</li>
            <li>Playing<b> healing frequencies </b>to enhance mental clarity and calm</li>
            <li>Nudging you to <b> stretch, sip, and reset </b>with Pomodoro-style breaks</li>
            <li>Providing <b>clean bottle reminders </b>for safe, consistent hydration</li>
            <li>Working <b> screen-free, </b>app-optional, and compatible with any bottle</li>
          </ul>

          <p>
            It’s not just hydration — it’s a daily ritual of <b>wellness, focus, and intention.</b>
          </p>
        </div>


            <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
       ✅ Conclusion: Don’t Wait for <span className="text-[#389ED7]"> Thirst</span> — Stay Ahead
        </h2>
        
         <div className="space-y-2 text-sm text-[#021637]"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            Thirst is not a reliable indicator. By the time you feel it, you’re already behind. Instead of reacting to dehydration, let <b>Frost Aura</b>  help you build a proactive, mindful hydration routine — right at your desk.
          </p>
          <p>
            Because when you stay ahead of thirst, you stay ahead of fatigue, distraction, and burnout.
          </p>
        </div>
        <br />

<div className="flex flex-col md:flex-row  justify-center md:space-x-8 space-y-4 md:space-y-0 mb-10">
  <div className="w-full md:w-1/2 h-[450px] border border-gray-300 rounded overflow-hidden">
    <img
      src="/images/blog3-3.jpg" loading="lazy"
      alt="Hydration Tip 1"
      className="w-full h-full object-fill"
    />
  </div>
  </div>


        <b><i>Hydrate with purpose. Work with clarity. Live with balance.</i></b>


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
