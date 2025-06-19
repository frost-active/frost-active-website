import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Navigation links
const navLinks = [
  { name: "Home", url: "/" },
  { name: "Features", url: "/#features" },
  { name: "Working", url: "/#how-it-works" },
  { name: "Team", url: "/#team" },
  { name: "Testimonials", url: "/#testimonials" },
  { name: "Contact Us", url: "/#try" },
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
            onClick={() => handleNavClick("/")}
            className="flex items-center gap-2 font-extrabold text-xl text-primary cursor-pointer"
          >
            <div className="relative top-[6px] left-[-30px]">
              <img
                src="/images/logo2.png"
                alt="FROST Logo"
                className="h-40 w-auto object-contain max-w-[180px]"
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => (
              <span
                key={link.name}
                onClick={() => handleNavClick(link.url)}
                className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition cursor-pointer"
                style={{ fontFamily: "Roboto", fontWeight: "800" }}
              >
                {link.name}
              </span>
            ))}
          </nav>

          {/* Mobile Nav */}
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
                      style={{ fontFamily: "Roboto", fontWeight: "400" }}
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

const DJAngelPage = () => {
  return (
    <div className=" text-[#222] px-5 py-10 max-w-4xl mx-auto font-sans" style={{ fontFamily: "Segoe UI" }}>
      <Header />
    <main className="max-w-5xl mx-auto md:mt-12 border border-gray-300 p-10 rounded-md shadow-sm">

      <h1 className="text-3xl font-bold mb-6">
        🎧 From Dance Floors to Divine Frequencies: Meet DJ Angel Johal, the Sound Alchemist of India
      </h1>

      <p className="mb-4">
        <a
          href="https://www.instagram.com/reel/DA5GLKUR3mp/?igsh=MXVtZzF0Y2xrbmNoNg=="
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Watch this powerful reel
        </a>{" "}
        and you’ll know you’re not just witnessing a DJ — you’re feeling a{" "}
        <strong>soul curator, a healer, a wave of frequency wrapped in human form</strong>. That’s{" "}
        <strong>DJ Angel Johal</strong> for you — a sonic force who is reshaping not just how we listen, but how we{" "}
        <em>heal</em>.
      </p>

      <p className="mb-4">
        In a world where most DJs are defined by loud drops and packed clubs, DJ Angel Johal stands apart. She isn’t
        just spinning tracks — she’s <strong>tuning souls</strong>. From being a pioneer female DJ in India’s
        male-dominated music industry to now leading a revolutionary blend of <strong>music and meditation</strong>,
        Angel has truly redefined what it means to be a modern sound artist.
      </p>

     <div className="flex flex-col md:flex-row  justify-center md:space-x-8 space-y-4 md:space-y-0 mb-10">
  
  <div className="w-full md:w-[800px] md:h-[700px] border border-gray-300 rounded overflow-hidden">
    <img
      src="/images/djangel1.jpg"
      alt="Hydration Tip 1"
      className="w-full h-full object-fill"
    />
  </div>
  </div>
      <h2 className="text-2xl font-semibold mt-8 mb-4">🔊 The Journey: From Beats to Balance</h2>

      <p className="mb-4">
        Angel Johal’s journey began behind the DJ console in Mumbai’s bustling music scene, where she quickly rose as a
        beloved figure blending <strong>Bollywood, EDM, and commercial</strong> sets. But even while commanding dance
        floors, she was always drawn to something deeper — the <strong>healing potential of sound</strong>.
      </p>

      <p className="mb-4">
        This curiosity led her to the world of <strong>frequencies, chakra balancing, ancient Vedic sound therapy</strong>,
        and eventually, the birth of her spiritual sound project:
      </p>

      <ul className="border-l-4 border-gray-300 pl-4 list-disc ml-1 mb-4">
        
          🔗{" "}
          <a href="https://www.youtube.com/@thesoundofvedas" target="_blank" rel="noopener noreferrer"  className="text-blue-500 hover:underline">
            The Sound of Vedas – YouTube
          </a>
        <br />
        
          🔗{" "}
          <a href="https://www.instagram.com/thesoundofvedas" target="_blank" rel="noopener noreferrer"  className="text-blue-500 hover:underline">
            The Sound of Vedas – Instagram
          </a>
        
      </ul>

      <p className="mb-4">
        Under this identity, DJ Angel brings to life a stunning fusion of{" "}
        <strong>Indian classical sounds, 432Hz healing frequencies, mantras, and meditative vibrations</strong>, designed
        not just to relax — but to awaken.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">🕉️ What Is “The Sound of Vedas”?</h2>

      <p className="mb-4">
        <strong>The Sound of Vedas</strong> isn’t just a channel — it’s a <strong>movement of mindful listening</strong>. It
        embodies the principle that sound can go beyond entertainment; it can <strong>cleanse, balance, and rewire the
        mind and body</strong>. Through her work on this platform, Angel dives deep into the spiritual science of sound —
        drawing from Vedic texts, ancient instruments, and quantum frequencies.
      </p>

      <p className="mb-4">Whether it’s a sunrise meditation set or a live chakra-cleansing session, her creations are perfect companions for:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Yoga and breathwork</li>
        <li>Energy clearing</li>
        <li>Inner child healing</li>
        <li>Deep focus and creativity</li>
        <li>Stress detox and sleep aid</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">🌟 Why She’s a Perfect Fit for FROST</h2>

      <p className="mb-4">
        At <strong>FROST</strong>, we believe in <em>innovating for wellness</em>, and Angel Johal reflects that perfectly.
        Her presence in the team isn’t just symbolic — it represents our vision to <strong>merge technology, rhythm, and
        wellbeing</strong>. Just like FROST’s smart hydration and mental fitness features, her work with sound brings
        holistic balance to mind, body, and soul.
      </p>

      <p className="mb-4">
        Together, we aim to create experiences where <strong>digital wellness meets ancient wisdom</strong>, where reminders
        are not just about sipping water — but about nourishing your inner self.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">📌 Final Word</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6">
        In a world overloaded with noise, <strong>DJ Angel Johal</strong> offers clarity.<br />
        In the chaos of timelines and schedules, she gives you rhythm.<br />
        And in the race of life, she reminds you to <em>pause, breathe, and realign.</em>
      </blockquote>

      <p className="mb-4">
        So the next time you plug into music, ask yourself:<br />
        <strong>Are you just listening, or are you healing?</strong>
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">🎧 Explore Her Soundscape:</h3>
      <ul className="list-disc ml-6">
        
          📺{" "}
          <a href="https://www.youtube.com/@thesoundofvedas" target="_blank" rel="noopener noreferrer"  className="text-blue-500 hover:underline">
            Subscribe on YouTube – The Sound of Vedas
          </a>
        <br />
        
          📸{" "}
          <a href="https://www.instagram.com/thesoundofvedas" target="_blank" rel="noopener noreferrer"  className="text-blue-500 hover:underline">
            Follow on Instagram – The Sound of Vedas
          </a>
      </ul>

        {/*<div className="mt-10">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-[#389ED7] text-white rounded-full shadow">
            Go Back
          </button>
        </div> */}
     </main>
    </div>
  );
};

export default DJAngelPage;
