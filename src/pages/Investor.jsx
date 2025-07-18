import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
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

const tabList = ['Community', 'Campaign', 'Rewards', 'Investors', 'FAQ', 'Updates', 'Collaborators'];

const CommunitySection = () => {
  return (
    <div className="w-full font-['Roboto'] bg-[#E1F6FF] text-[#021637] pt-10 overflow-x-hidden">
      {/* Top Heading */}
      <div className="text-center mb-10">
        <h2 className="text-lg md:text-4xl font-medium text-[#389ED7]">Meet the</h2>
        <h1 className="text-3xl md:text-4xl font-bold text-[#021637]">FROST COMMUNITY</h1>
      </div>

      {/* Hero Section with Concentric Circles and Icons */}
      <div className="relative flex justify-center items-center mb-20 px-4">
        {/* Dark Rectangle Behind Girl - Full Width & Aligned */}
        <img
          src="/images/blackrectangle.png"
          alt="Dark background"
          className="absolute -bottom-[14px] left-0 w-full md:h-[180px] z-10"
        />
        <div className="relative w-[320px] md:w-[480px] aspect-square">
          {/* Outer Blue Circle */}
          <div className="absolute -inset-4 rounded-full bg-[#9CDBFF] z-0"></div>

          {/* Middle White Circle */}
          <div className="absolute inset-[10%] rounded-full bg-white ">
            {/* Social Media Icons in Circular Path (confined inside white circle) */}
            <div className="relative w-full h-full">
              <img src="/images/instagram.png" className="absolute top-3 left-1/2 -translate-x-4 w-8 md:w-8" />
              <img src="/images/youtube.png" className="absolute md:top-[10%] top-[14%] md:right-[90px] right-[18%] w-8 md:w-9" />
              <img src="/images/discord.png" className="absolute md:top-[90px] top-[100px]  md:right-[38px] right-[10px] w-8 md:w-8" />
              <img src="/images/facebook.png" className="absolute md:bottom-[190px] bottom-[60px] md:left-[325px] right-[22px] w-8  md:w-8" />
              <img src="/images/whatsapp.png" className="absolute md:bottom-[230px] bottom-[140px] md:left-[30px] left-[16px] w-8 md:w-8" />
              <img src="/images/linkedin.png" className="absolute md:top[18%] top-[12%] left-[20%] md:left[30%]  w-8 md:w-8" />
            </div>
          </div>

          {/* Inner Yellow Circle */}
          <div className="absolute inset-[25%] rounded-full bg-[#EFC361] "></div>

          {/* Girl Image Above It */}
          <img
            src="/images/girlphone.png"
            alt="Girl using phone"
            className="absolute -bottom-[14px] left-1/2 md:h-[350px] w-[110px] md:w-[200px] -translate-x-1/2 z-20"
          />

          <img
            src="/images/news.jpg"
            alt="news"
            className="absolute md:bottom-[10px] bottom-[8px] md:left-[50px] left-[30px] md:h-[250px] h-[150px] w-[80px] md:w-[130px] -translate-x-1/2 z-20"
          />

          <img
            src="/images/notification.png"
            alt="Girl using phone"
            className="absolute md:bottom-[100px] bottom-[30px] md:-right-[140px] -right-[45px]  md:h-[80px] w-[110px] md:w-[200px] -translate-x-1/2 z-20"
          />
        </div>
      </div>

      {/* Welcome Section */}
      <div className="text-center max-w-3xl mx-auto px-4 mt-10">
        <h2 className="text-4xl tracking-wide font-bold">Welcome to the <span className="text-[#389ED7]">FROST</span> Community</h2>
        <p className="text-sm md:text-sm mt-4 tracking-wide ">
          At FROST, we believe wellness <span className="text-[#389ED7]"><b>isn’t a solo journey</b></span> — it’s something  <span className="text-[#389ED7]"><b> we build together </b></span> <br />
          Our mission isn’t just to create a smart hydration device — it’s to create a global community that believes in better work-life balance, mindful breaks, and small habits that make a big difference.
        </p>
        <br />
        <h3 className="text-4xl font-bold mt-6">Join Now</h3>
        <p className="text-sm text-[#021637]">Click on the icons to join</p>

        {/* Social Join Icons Again */}
        <div className="flex justify-center flex-wrap gap-6 mt-4">
          <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer">
          <img src="/images/whatsapp.png" alt="WhatsApp" className="w-10 cursor-pointer" />
          </a>
          <a href="https://www.linkedin.com/company/frost-active/" target="_blank" rel="noopener noreferrer">
          <img src="/images/linkedin.png" alt="LinkedIn" className="w-10 cursor-pointer" />
          </a>
          <a href="https://www.instagram.com/frost_active?igsh=MXA3N2FoYXY2aDBpbQ==" target="_blank" rel="noopener noreferrer">
          <img src="/images/instagram.png" alt="Instagram" className="w-10 cursor-pointer" />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/discord.png" alt="Discord" className="w-10 cursor-pointer" />
          </a>
          <a href="https://www.facebook.com/share/16Q37LVMTM/" target="_blank" rel="noopener noreferrer">
          <img src="/images/facebook.png" alt="Facebook" className="w-10 cursor-pointer" />
          </a>
          <a href="https://www.youtube.com/@Frost_active" target="_blank" rel="noopener noreferrer">
          <img src="/images/youtube.png" alt="YouTube" className="w-10 cursor-pointer" />
          </a>
        </div>
        {/* New Supporting Text Below Icons */}
        <p className="text-sm text-[#021637] mt-6 max-w-sm md:max-w-2xl mx-auto text-center ">
  Whether you’re an investor, an early supporter, or just someone who cares about health and productivity,
  <span className="font-semibold tracking-normal md:tracking-wider">
    {' '}you’re part of this story
  </span>
</p>

      </div>

      {/* Engagement Section */}
<div className="mt-20 bg-white py-24 md:py-32 md:h-[700px] h-[1250px] relative overflow-hidden">
  <h2 className="-mt-16 text-center text-lg md:text-2xl font-bold mb-2 tracking-normal md:tracking-wider">
  How You Can <span className="text-[#389ED7] md:text-3xl text-xl">ENGAGE</span>{' '}
  <span className="text-[#389ED7] text-2xl md:text-5xl">??</span>
</h2>


  <br /><br />

  {/* Zigzag Top Line Image */}
  <img
    src="/images/line.png"
    alt="Top Line Decoration"
    className="absolute top-20 left-0 w-screen h-auto object-cover"
  />

  {/* Cards Wrapper */}
  <div className="relative z-10 pt-16 px-4 md:px-10">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto text-center">
      {[
  {
    title: 'Investors Circle',
    desc: 'As an early investor, you’ll get access to our private communication channels, regular progress updates, and behind-the-scenes insights.',
  },
  {
    title: 'Whatsapp & Telegram Groups',
    desc: 'Stay connected with other backers, share your thoughts, ask questions, and get real-time updates.',
  },
  {
    title: 'Product Feedback Program',
    desc: 'Be among the first to test FROST and share your honest feedback to shape the final product.',
  },
  {
    title: 'Wellness Movement Ambassadors',
    desc: 'Spread the word about healthy habits at work. We’ll provide resources, content, and support to help you inspire others.',
  },
].map((card, i) => (
  <div
    key={i}
    className={`relative bg-[#9CDBFF] p-6 pt-12 rounded-md shadow-md ${
      i === 1 || i === 3 ? 'md:translate-y-[4rem]' : ''
    }`}
  >
    {/* Number Badge */}
    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white w-12 h-12 rounded-full border-4 border-[#9CDBFF] flex items-center justify-center font-bold text-[#021637] text-md shadow-md z-10">
      0{i + 1}
    </div>
    <h4 className="text-md font-semibold mb-1 mt-2">{card.title}</h4>
    <p className="text-xs text-gray-700">{card.desc}</p>
    <br /> <br />
  </div>
))}

    </div>
  </div>

  {/* Zigzag Bottom Line Image (Flipped) */}
  <img
    src="/images/line.png"
    alt="Bottom Line Decoration"
    className="absolute md:bottom-4 bottom-16 left-0 w-screen h-auto object-cover"
  />
</div>


      {/* Why FROST COMMUNITY MATTERS */}
      <div className="bg-white md:py-12 px-6 text-center">
  <h2 className="text-lg md:text-2xl font-bold mb-2 tracking-normal md:tracking-widest">
  Why FROST COMMUNITY <span className="text-[#389ED7] md:text-3xl text-xl"><b>MATTERS</b></span>{' '}
  <span className="text-[#389ED7] text-2xl md:text-5xl">??</span>
</h2>
<p className="text-sm md:text-base mb-8 leading-relaxed max-w-sm md:max-w-xl mx-auto tracking-normal md:tracking-wider">
  “Together, we normalise taking care of ourselves, even at work”
</p>


  <div className="max-w-[26rem] mx-auto flex flex-col gap-4">
    {[
      'You help us build a product that truly solves real-world problems.',
      'Your feedback keeps us grounded, honest, and customer-first.',
      'You stay ahead with early access, insider news, and direct founder conversations.',
    ].map((point, i) => (
      <div
        key={i}
        className="bg-[#9CDBFF] text-[#021637] text-[12px] px-8 h-[60px] flex items-center justify-center rounded-md text-center font-medium"
      >
        {point}
      </div>
    ))}
  </div>
</div>
    </div>
  );
};




const ChevronLeft = (props) => (
  <svg width="24" height="24" fill="none" {...props}>
    <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRight = (props) => (
  <svg width="24" height="24" fill="none" {...props}>
    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const campaignImages = [
  '/images/campaign1.jpg',
  '/images/campaign2.jpg',
  '/images/campaign3.jpg',
  '/images/campaign4.jpg',
  '/images/campaign5.jpg',
  '/images/campaign6.jpg',
  '/images/campaign7.jpg',
  '/images/campaign8.jpg',
  '/images/campaign9.jpg',
  '/images/campaign10.jpg',
  '/images/campaign11.jpg',
  '/images/campaign12.jpg',
  '/images/campaign13.jpg',
  '/images/campaign14.jpg',
  '/images/campaign15.jpg',
  '/images/campaign16.jpg',
  '/images/campaign17.jpg',
];

const VISIBLE = 5;
function getVisibleImages(list, center, visible) {
  const half = Math.floor(visible / 2);
  const total = list.length;
  let res = [];
  for (let i = -half; i <= half; i++) {
    let idx = (center + i + total) % total;
    res.push({ idx, offset: i });
  }
  return res;
}

const ScrollableCampaignGrid = () => {
  const [center, setCenter] = useState(Math.floor(campaignImages.length / 2));
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);

  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCenter((idx) => (idx - 1 + campaignImages.length) % campaignImages.length);
    setTimeout(() => setIsAnimating(false), 450);
  };

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCenter((idx) => (idx + 1) % campaignImages.length);
    setTimeout(() => setIsAnimating(false), 450);
  };

  useEffect(() => {
    const children = Array.from(carouselRef.current?.querySelectorAll(".carousel-image") || []);
    children.forEach((child) => {
      const offset = parseInt(child.getAttribute("data-offset"), 10);
      let scale = 1, translateX = 0, rotateY = 0, opacity = 1;
      if (offset === 0) {
        scale = 1.15;
        translateX = 0;
        rotateY = 0;
        opacity = 1;
      } else if (Math.abs(offset) === 1) {
        scale = 0.9;
        translateX = offset * 220;
        rotateY = offset * -35;
        opacity = 1;
      } else if (Math.abs(offset) === 2) {
        scale = 0.7;
        translateX = offset * 180;
        rotateY = offset * -30;
        opacity = 0.25;
      } else {
        scale = 0.5;
        translateX = offset * 400;
        rotateY = offset * -40;
        opacity = 0;
      }
      child.style.transform = `perspective(1600px) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`;
      child.style.zIndex = 100 - Math.abs(offset);
      child.style.opacity = opacity;
      child.style.transition = "transform 0.45s ease, opacity 0.45s";
    });
  }, [center]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [center]);

  const visibleImages = getVisibleImages(campaignImages, center, VISIBLE);

  return (
    <div className="relative mb-16 font-['Roboto'] w-full py-10 px-4 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto md:-mt-4 -mt-14">
        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute z-20 left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-[#008cd0] flex items-center justify-center shadow transition hidden md:flex"
          style={{ pointerEvents: isAnimating ? "none" : "auto", opacity: isAnimating ? 0.3 : 1 }}
        >
          <ChevronLeft className="text-[#021637]" />
        </button>

        {/* Carousel */}
        <div
          className="relative flex justify-center items-center overflow-hidden h-[280px] sm:h-[400px]"
          ref={carouselRef}
          style={{ perspective: "2000px" }}
        >
          {visibleImages.map(({ idx, offset }) => (
            <div
              key={`img-${idx}`}
              className="carousel-image absolute rounded-xl overflow-hidden shadow-xl cursor-pointer"
              data-offset={offset}
              style={{
                width: "clamp(220px, 50vw, 360px)",
                height: "100%",
              }}
              onClick={() => setCenter(idx)}
            >
              <img
                src={campaignImages[idx]}
                alt={`Campaign ${idx + 1}`}
                className="
                  w-full h-full
                  object-contain
                  sm:object-cover
                  pointer-events-none select-none
                  sm:rounded-xl
                "
                style={{
                  objectFit: "contain",
                  background: "#FFF",
                }}
                loading="lazy"
                draggable={false}
              />
              <style>{`
                @media (min-width: 640px) {
                  .carousel-image img {
                    object-fit: cover !important;
                    background: none !important;
                  }
                }
              `}</style>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute z-20 right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-[#008cd0] flex items-center justify-center shadow transition hidden md:flex"
          style={{ pointerEvents: isAnimating ? "none" : "auto", opacity: isAnimating ? 0.3 : 1 }}
        >
          <ChevronRight className="text-[#021637]" />
        </button>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {campaignImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCenter(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`w-2.5 h-2.5 rounded-full border-2 border-[#008CD0] ${idx === center ? "bg-[#008CD0]" : "bg-white"}`}
              style={{ transition: "background 0.3s, border 0.3s" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mobileImages = [
  '/images/mobile1.png',
  '/images/mobile2.png',
  '/images/mobile3.png',
  '/images/mobile4.png',
];

const CampaignSection = () => {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const handleNext = () => {
    setActiveMobileIndex((prev) => (prev + 1) % mobileImages.length);
  };

  const handlePrev = () => {
    setActiveMobileIndex((prev) => (prev - 1 + mobileImages.length) % mobileImages.length);
  };

  return (
    <section className="w-full font-['Roboto'] bg-white ">
      {/* Top Banner */}
      <img
        src="/images/campaign.png"
        alt="Campaign Banner"
        className=" w-full rounded-lg mb-12  "
      />
         

      {/* How it STARTED ?? */}
      <div className="text-center mb-16 font-roboto">
        <h2 className="text-2xl md:text-3xl text-[#021637] font-bold mb-2">How it <span className="text-[#389ED7]">STARTED</span>  <span className="text-[#389ED7] text-4xl"> ??</span> </h2>
        <p className="text-sm md:text-base text-[#021637] max-w-2xl mx-auto">
          Our story <span className="text-[#389ED7] font-semibold">began with one simple frustration</span><br />
          we kept forgetting to drink water during work hours, <span className="text-[#389ED7]"><b>Headaches, fatigue, burnout followed. </b></span> 
        </p>
        <p className="mt-4  font-medium text-base md:text-lg">
          <span className="text-[#389ED7] text-2xl font-semibold">So we asked:</span> <span className=" text-base"> What if your desk reminded you to care for yourself </span> <span className=" text-2xl">??</span>
        </p>
        <p className="text-sm md:text-base mt-2 font-medium">
          We <span className="text-[#389ED7]"><b>sketched ideas</b></span>, <span className="text-[#389ED7]"><b>built prototypes</b></span>, <span className="text-[#389ED7]"><b>tested designs</b></span>, and now,<br />
          <span className="font-bold tracking-wider">FROST is ready to make wellness at work effortless.</span>
        </p>
      </div>


      {/* Scrollable Image Grid */}
      <ScrollableCampaignGrid />

      
      {/* App Features Section */}
      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* Mobile Image Carousel on Left */}
        <div className="relative w-full  md:w-1/2 flex justify-center items-center bg-[#D9F0FA] rounded-lg p-4">
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronLeft />
          </button>
          <img
            src={mobileImages[activeMobileIndex]}
            alt="Mobile Preview"
            className="w-[220px] md:w-[260px] h-[430px] z-10"
          />
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Right Text Content */}
        <div className="w-full md:w-1/2 bg-[#021637] text-white rounded-lg p-6">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">App Features</h3>
          <ul className="list-disc list-inside text-sm md:text-base space-y-2">
            <li>Set your hydration and break goals</li>
            <li>Track your progress in real-time</li>
            <li>Gentle reminders based on your routine</li>
            <li>Syncs with your FROST device</li>
            <li>Available for iOS and Android</li>
          </ul>
        </div>
      </div>
    </section>
  );
};



const renderTabContent = (activeTab) => {
  switch (activeTab) {
    case 'Community':
      return <CommunitySection />;
    case 'Campaign':
      return <CampaignSection />;
    case 'Rewards':

    case 'FAQ':

    case 'Updates':

    case 'Collaborators':

    case 'Investors':

    default:
      return (
        <div className="text-center py-10 text-gray-500 text-sm font-['Roboto']">
          <p>🚧 This section is under construction. Coming soon!</p>
        </div>
      );
  }
};

const InvestorPage = () => {
  const [activeTab, setActiveTab] = useState('Community'); // Default active tab
  // Set this to any tab from tabList to choose where the NEW badge appears
  const [newTab] = useState('Investors'); // Change 'Investors' to any of the tabList names as needed

  return (
    <div className="font-sans bg-[#f9f9f9] text-gray-900">
      <Header />

      {/* Main top content remains constant */}
      <section className="text-center py-8 px-4 md:px-20 font-['Roboto']">
  <h1 className="text-3xl md:text-4xl font-bold text-[#021637] mb-2">INVEST IN FROST</h1>
  <p className="text-lg md:text-xl tracking-widest mb-8">India’s First Smart Wellness Dock</p>

  <div className="flex flex-col md:flex-row items-stretch gap-6 w-full">
    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
      <img src="/images/gallery3-2.jpg" alt="frost" className="w-[75%] rounded-lg" />
      <div className="flex justify-center gap-1 my-4 w-full">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-400"
            style={{ opacity: i === 2 ? 1 : 0.4 }}
          />
        ))}
      </div>
    </div>

    <div className="md:-ml-28 w-full md:w-1/2 justify-between p-2 text-left">
      <h3 className="text-lg font-bold mb-2">
        Dummy text of the printing and typesetting industry.
      </h3>
      <p className="text-sm text-gray-700 mb-4">
        Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s. Dummy text of the printing and typesetting industry.
      </p>

      {/*  Moved this section right after the paragraph */}
     <div className="flex flex-row flex-wrap mt-6 w-full mb-4">
  <div className="bg-white p-4 w-[160px] max-w-xs text-left">
    <p className="text-[11px] tracking-widest text-[#021637] font-semibold">Start With Just</p>
    <div className="flex items-baseline space-x-1 -ml-1 -mb-2">
      <span className="text-5xl font-bold text-[#021637]">$599</span>
      <span className="text-base font-semibold text-[#021637]"></span>
    </div>
  </div>
  <div className="flex-1 min-w-[120px] h-24 bg-[#B8E4FD]" />
</div>


      <div className="mt-4 flex flex-row gap-4">
        <div className="flex flex-col items-start">
          <Button className="tracking-wider bg-[#389ED7] hover:bg-[#3a9ad2] text-white text-sm font-bold px-4 py-2 rounded-md">
            💰 INVEST NOW
          </Button>
        </div>
        <div className="flex flex-col items-start">
          <Button
            onClick={() => window.open('https://calendly.com/frost-active-frost/30min', '_blank')}
            className="tracking-wider bg-[#389ED7] hover:bg-[#3a9ad2] text-white text-sm font-bold px-4 py-2 rounded-md"
          >
            🤝 BOOK MEETING
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Tabs at the Bottom */}
      <div className="mt-10 mb-6">
        <div className="flex flex-wrap justify-center gap-6 text-sm py-4 font-['Roboto'] relative">
          {tabList.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative cursor-pointer font-medium px-2 ${
                activeTab === tab ? 'text-[#021637]' : 'text-gray-700'
              }`}
              style={{ minWidth: 80, textAlign: 'center' }}
            >
              {/* NEW badge logic */}
              {tab === newTab && (
                <div className="absolute -top-6 left-2/3 -translate-x-1/2 flex flex-col items-center z-20">
                  <div className="tracking-wider relative bg-[#B8E4FD] text-[#021637] text-[10px] font-semibold px-2 py-[2px] rounded-sm">
                    New
                    <span className="absolute w-2.5 h-2.5 bg-green-500 rounded-full -top-[4px] -right-[6px] animate-ping" />
                    <span className="absolute w-2.5 h-2.5 bg-green-500 rounded-full -top-[4px] -right-[6px]" />
                  </div>
                </div>
              )}
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-8px] left-0 right-0 h-1 bg-[#021637] rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Tab Content Below */}
      <div className="px-4 md:px-20">{renderTabContent(activeTab)}</div>
    </div>
  );
};

export default InvestorPage;