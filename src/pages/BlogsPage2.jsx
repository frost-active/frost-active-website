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
                src="/images/logo2.png"
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
            The Hidden Health Risks of <span className="text-[#389ED7]"> Not Drinking Enough Water</span> at work
          </h1>
        </div>
          
          <div className="space-y-2 text-sm text-[#021637]"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            In a world driven by deadlines, meetings, and multitasking, one of the most important health habits is also one of the most overlooked — staying hydrated at work.
          </p>
           <p>
            While many professionals focus on performance, mental clarity, and physical health, most forget the silent driver behind all three: water. Studies have shown that over 70% of professionals do not meet their daily hydration needs, especially during working hours. The consequences? They're not just about feeling thirsty — they’re far more serious and long-term.
           </p>
        </div>


        <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
         Why <span className="text-[#389ED7]"> Hydration is More</span> Than Just a Wellness Trend
        </h2>
         <div className="text-sm text-[#021637] space-y-2 mb-6"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
           Water fuels everything your body does — from circulating blood to supporting brain function. Even mild dehydration (as little as 1–2%) can impact your ability to think clearly, manage stress, and stay focused.
          </p>
          <p>
            But what happens when this dehydration is repeated daily in a workplace setting? The risks compound, quietly damaging health and performance over time.
          </p>
        </div>
      
        
        <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
         Hidden Health Risks of<span className="text-[#389ED7]"> Dehydration </span> at Work
        </h2>
    
        <div className="text-sm text-[#021637] space-y-2 mb-6"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
          1. <b>Brain Fog and Poor Concentration</b>
          </p>
          <p>
            Dehydration reduces blood flow to the brain, impairing memory, focus, and decision-making. You may feel tired, unfocused, or forgetful — and blame stress or sleep, when it's actually your water intake.
          </p>

          <p>
            2. <b>Fatigue and Low Energy</b>
          </p>
            <p>
              When you’re even slightly dehydrated, your body must work harder to complete basic functions. This leads to early-afternoon crashes, sluggishness, and reduced productivity.
            </p>
            
            <p>
              3. <b> Increased Risk of Headaches</b>
            </p>
            <p>
              Workplace headaches are often linked to poor hydration — especially in air-conditioned environments, which accelerate water loss through skin and lungs.
            </p>

            <p>
              4. <b> Kidney Stress and Urinary Issues</b>
            </p>
            <p>
              Long-term underhydration can strain your kidneys, increasing the risk of stones and urinary tract infections — especially for desk-bound professionals with low movement.
            </p>

            <p>
              5. <b> Dry Eyes and Eye Strain</b>
            </p>
            <p>
              Screen fatigue and dry eyes are made worse by dehydration. A lack of water affects tear production, causing irritation and blurred vision — especially after long hours at a screen.
            </p>

            <p>
              6. <b> Weakened Immunity and Metabolism</b>
            </p>
            <p>
              Your body’s ability to detoxify, absorb nutrients, and regulate temperature depends on water. Without enough, you’re more vulnerable to illness and inflammation.
            </p>
        </div>


        {/* Responsive image grid */}
<div className="flex flex-col md:flex-row  md:space-x-8 space-y-4 md:space-y-0 mb-10">
  <div className="w-full md:w-1/2 h-[450px] border border-gray-300 rounded overflow-hidden">
    <img
      src="/images/blog2-1.jpg"
      alt="Hydration Tip 1"
      className="w-full h-full object-fill"
    />
  </div>
  <div className="w-full md:w-1/2 aspect-[3/2] border border-gray-300 rounded overflow-hidden">
    <img
      src="/images/blog2-2.jpg"
      alt="Hydration Tip 2"
      className="w-full h-full object-fill"
    />
  </div>
</div>
    
          <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
         Why Office Workers Are Most <span className="text-[#389ED7]"> at Risk </span> 
        </h2>

         <div className="text-sm text-[#021637] space-y-2 mb-6"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <ul className="list-disc pl-10 mt-2">
            <li>Sedentary behavior = fewer natural reminders to drink</li>
            <li>Air-conditioned offices = faster dehydration</li>
            <li>Back-to-back meetings = no time to refill or sip</li>
            <li>High caffeine intake = fluid loss through diuresis</li>
            <li>Digital focus = delayed thirst response</li>
          </ul>
          <p>
            In short, modern office environments are a perfect storm for chronic, low-level dehydration — and most people don’t even realize it’s happening.
          </p>
        </div>


        <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
          <span className="text-[#389ED7]"> Hydration is a </span>  Workplace Priority — Not a Personal Choice
        </h2>

        <div className="text-sm text-[#021637] space-y-2 mb-6"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
        <p>
          For companies aiming to build healthy, high-performing teams, hydration is more than a wellness checkbox. It directly affects:
        </p>
           <ul className="list-disc pl-10 mt-2">
            <li>Employee focus and productivity</li>
            <li>Mental clarity and decision-making</li>
            <li>Absenteeism and burnout rates</li>
            <li>Overall workplace satisfaction</li>
          </ul>
          <p>
            That’s why many forward-thinking organizations are now looking for smarter hydration solutions that work with employees' routines — not against them.
          </p>
        </div>


        <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
          <span className="text-[#389ED7]"> Frost Aura: </span>  Your Desk-Side Wellness Ally
        </h2>
         
         <div className="text-sm text-[#021637] space-y-2 mb-6"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
        <p>
         Frost Aura is a smart, beautifully designed desktop hydration device that helps professionals stay hydrated without distractions. More than just a water reminder, it creates a mindful wellness experience at work.
        </p>

        <p>
          With gentle cues, healing frequencies, and daily wellness nudges, Frost Aura encourages employees to:
        </p>

        <ul className="list-disc pl-10 mt-2">
          <li>Sip water consistently</li>
          <li>Take mindful micro-breaks</li>
          <li>Clean their bottles regularly</li>
          <li>Maintain better focus without app overload</li>
          <li>Enjoy subtle wellness without disrupting workflow</li>
        </ul>
        <p>
          Compatible with any bottle or mug, and screen-free by design, Frost Aura blends into your workspace while quietly boosting health, focus, and energy.
        </p>
        </div>

        <h2 className="text-xl font-bold text-[#021637] mt-10 mb-2"
         style={{fontFamily: "Roboto", fontWeight:"semi-bold"}} >
           ✅ Conclusion: Don’t Let <span className="text-[#389ED7]"> Dehydration Be the Weak</span> Link in Your Workday
        </h2>

        <div className="text-sm text-[#021637] space-y-2 mb-6"
        style={{fontFamily: "Roboto", fontWeight:"regular"}}>
          <p>
            The dangers of not drinking enough water at work are real — but they’re also preventable. With Frost Aura, hydration becomes a natural part of your day, not an afterthought.
          </p>
          <p>
            Give your brain, body, and business what they truly need — more water, more wellness, and more mindful productivity.
          </p>
        </div>
   
<div className="flex flex-col md:flex-row  justify-center md:space-x-8 space-y-4 md:space-y-0 mb-10">
  
  <div className="w-full md:w-1/2 h-[450px] border border-gray-300 rounded overflow-hidden">
    <img
      src="/images/blog2-3.jpg"
      alt="Hydration Tip 1"
      className="w-full h-full object-fill"
    />
  </div>
  </div>

        <b><i>Because your best work starts with your best self.</i></b>



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
