import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, ArrowRight, MessageCircle, ThumbsUp, ArrowLeft, Space } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence  } from 'framer-motion';


const tabList = ['Community', 'Campaign', 'Rewards',  'FAQ', 'Updates'];

const CommunitySection = () => {
  return (
    <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 font-['Roboto'] bg-[#E1F6FF] text-[#021637] pt-10 overflow-x-hidden">

      {/* Top Banner */}
      <img
        src="/images/communitybanner1.png"
        alt="Community  Banner"
        className="w-full rounded-lg mb-12 -mt-6 "
      />
     
      
      {/* Welcome Section */}
      <div className="text-center max-w-3xl mx-auto px-4 md:-mt-4 -mt-8">
        <h2 className="md:text-4xl text-3xl  font-bold">Welcome to the <span className="text-[#389ED7]">FROST</span> Community</h2>
        <p className="text-sm md:text-sm mt-4 tracking-wider">
          At FROST, we believe wellness <span className="text-[#389ED7]"><b>isn’t a solo journey</b></span> — it’s something  <span className="text-[#389ED7]"><b> we build together </b></span> <br />
          Our mission isn’t just to create a smart hydration device — it’s to create a global community that believes in better work-life balance, mindful breaks, and small habits that make a big difference.
        </p>
        <br />
        <h3 className="text-4xl font-bold mt-6">Join Now</h3>
        <p className="text-sm text-[#021637]">Click on the icons to join</p>

        {/* Social Join Icons Again */}
        <div className="flex justify-center flex-wrap gap-6 mt-4">
          <a href="https://whatsapp.com/channel/0029VbB70aGHAdNWV8ujXX3c" target="_blank" rel="noopener noreferrer">
          <img src="/images/whatsapp.png" alt="WhatsApp" className="w-10 cursor-pointer" />
          </a>
          <a href="https://www.linkedin.com/company/frost-active/" target="_blank" rel="noopener noreferrer">
          <img src="/images/linkedin.png" alt="LinkedIn" className="w-10 cursor-pointer" />
          </a>
          <a href="https://www.instagram.com/frost_active?igsh=MXA3N2FoYXY2aDBpbQ==" target="_blank" rel="noopener noreferrer">
          <img src="/images/instagram.png" alt="Instagram" className="w-10 cursor-pointer" />
          </a>
          <a href="https://discordapp.com/users/1381888153929121844" target="_blank" rel="noopener noreferrer">
          <img src="/images/discord.png" alt="Discord" className="w-10 cursor-pointer" />
          </a>
          <a href="https://www.facebook.com/share/16Q37LVMTM/" target="_blank" rel="noopener noreferrer">
          <img src="/images/facebook.png" alt="Facebook" className="w-12 -ml-2 cursor-pointer" />
          </a>
          {/*
         <a href="https://x.com/frostactive_07?s=21" target="_blank" rel="noopener noreferrer">
          <img src="/images/twitter.png" alt="twitter" className="w-14 mt-0 -ml-4 cursor-pointer" />
          </a>
          */}
        
          <a href="https://www.youtube.com/@Frost_active" target="_blank" rel="noopener noreferrer">
          <img src="/images/youtube.png" alt="YouTube" className="-ml-4 mt-2 w-14 cursor-pointer" />
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
  <h2 className="-mt-20 text-center text-lg md:text-2xl font-bold mb-2 tracking-normal md:tracking-wider">
  How You Can <span className="text-[#389ED7] md:text-3xl text-xl">ENGAGE</span>{' '}
  <span className="text-[#389ED7] text-2xl md:text-5xl">??</span>
 </h2>


  <br /><br />

  {/* Zigzag Top Line Image */}
  <img
    src="/images/line.png"
    alt="Top Line Decoration"
    className="absolute top-11 left-0 w-screen h-auto object-cover"
  />

  {/* Cards Wrapper */}
  <div className="md:mt-2 -mt-10 relative z-10 pt-16 px-4 md:px-10">
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
    className="absolute md:bottom-4 bottom-26 left-0 w-screen h-auto object-cover"
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
  '/images/campaign1.jpg', '/images/campaign2.jpg', '/images/campaign3.jpg', '/images/campaign4.jpg',
  '/images/campaign5.jpg', '/images/campaign6.1.jpg', '/images/campaign7.jpg', '/images/campaign8.jpg',
  '/images/campaign15.jpg', '/images/campaign10.jpg', '/images/campaign11.2.jpg', '/images/campaign12.jpg',
  '/images/campaign13.jpg', '/images/campaign14.2.jpg', '/images/campaign9.2.jpg', '/images/campaign16.1.jpg',
  '/images/campaign17.2.jpg',
];

const VISIBLE = 5;

const isMobile = () => typeof window !== "undefined" && window.innerWidth <= 768;

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

// Modified image style function:
// - Increased sideScale and farSideScale to make side images bigger
// - Reduced gap calculation for left/right images to bring them closer
function getImageStyle(offset, dragX = 0, containerWidth = 1200, visibleCount = 5, gap = 16) {
  const totalGaps = (visibleCount - 1) * gap;
  const mobileWidthBoost = isMobile() ? 1.15 : 1.0;
  const mobileHeightBoost = isMobile() ? 1.18 : 1.0;
  const availableWidth = (containerWidth - totalGaps) * mobileWidthBoost;

  const centerScale = 1.1;
  // Increased side and far side scale to make them bigger and fill the space
  const sideScale = 0.92;      // was 0.8
  const farSideScale = 0.75;   // was 0.64

  const baseWidth = availableWidth / (centerScale + 2 * sideScale + 2 * farSideScale);
  const sizes = [
    baseWidth * farSideScale,
    baseWidth * sideScale,
    baseWidth * centerScale,
    baseWidth * sideScale,
    baseWidth * farSideScale,
  ];

  const heights = sizes.map(w => w * mobileHeightBoost);

  // Reduced translateX distances to bring images closer
  const transforms = [
    {
      scale: farSideScale,
      translateX: -((baseWidth * centerScale) / 2 + baseWidth * sideScale * 0.95 + baseWidth * farSideScale / 2 + gap * 1.25),
      rotateY: 40,
      opacity: 0.18,
      zIndex: 1,
      width: sizes[0],
      height: heights[0],
    },
    {
      scale: sideScale,
      translateX: -((baseWidth * centerScale) / 2 + baseWidth * sideScale / 2 + gap * 0.85),
      rotateY: 16,
      opacity: 0.7,
      zIndex: 2,
      width: sizes[1],
      height: heights[1],
    },
    {
      scale: centerScale,
      translateX: 0 + dragX,
      rotateY: 0 + (dragX * -0.06),
      opacity: 1,
      zIndex: 3,
      width: sizes[2],
      height: heights[2],
    },
    {
      scale: sideScale,
      translateX: ((baseWidth * centerScale) / 2 + baseWidth * sideScale / 2 + gap * 0.85),
      rotateY: -16,
      opacity: 0.7,
      zIndex: 2,
      width: sizes[3],
      height: heights[3],
    },
    {
      scale: farSideScale,
      translateX: ((baseWidth * centerScale) / 2 + baseWidth * sideScale * 0.95 + baseWidth * farSideScale / 2 + gap * 1.25),
      rotateY: -40,
      opacity: 0.18,
      zIndex: 1,
      width: sizes[4],
      height: heights[4],
    },
  ];

  const tIdx = offset + 2;
  return transforms[tIdx];
}

const ScrollableCampaignGrid = () => {
  const [center, setCenter] = useState(Math.floor(campaignImages.length / 2));
  const [dragStart, setDragStart] = useState(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isMobileView, setIsMobileView] = useState(isMobile());
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(isMobile());
      if (carouselRef.current) {
        setContainerWidth(carouselRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    if (!isMobileView) {
      const handleWheel = (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault();
          if (e.deltaX > 20) {
            setCenter((idx) => (idx + 1) % campaignImages.length);
          } else if (e.deltaX < -20) {
            setCenter((idx) => (idx - 1 + campaignImages.length) % campaignImages.length);
          }
        }
      };

      carousel.addEventListener("wheel", handleWheel, { passive: false });
      return () => carousel.removeEventListener("wheel", handleWheel);
    }
  }, [isMobileView]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let isDown = false;
    let startX = 0;
    let lastDelta = 0;

    const handlePointerDownMouse = (e) => {
      isDown = true;
      startX = e.clientX;
      setDragStart(startX);
    };
    const handlePointerMoveMouse = (e) => {
      if (!isDown) return;
      const delta = e.clientX - startX;
      setDragDelta(delta);
      lastDelta = delta;
    };
    const handlePointerUpMouse = () => {
      if (!isDown) return;
      isDown = false;
      setDragStart(null);
      setDragDelta(0);

      const threshold = isMobileView ? 30 : 60;
      if (lastDelta > threshold) {
        setCenter((idx) => (idx - 1 + campaignImages.length) % campaignImages.length);
      } else if (lastDelta < -threshold) {
        setCenter((idx) => (idx + 1) % campaignImages.length);
      }
    };

    let touchStartX = 0;
    let touchDelta = 0;
    const handlePointerDownTouch = (e) => {
      if (e.touches.length === 1) {
        isDown = true;
        touchStartX = e.touches[0].clientX;
        setDragStart(touchStartX);
      }
    };
    const handlePointerMoveTouch = (e) => {
      if (!isDown || e.touches.length !== 1) return;
      const delta = e.touches[0].clientX - touchStartX;
      setDragDelta(delta);
      lastDelta = delta;
    };
    const handlePointerUpTouch = () => {
      if (!isDown) return;
      isDown = false;
      setDragStart(null);
      setDragDelta(0);

      if (lastDelta > 30) {
        setCenter((idx) => (idx - 1 + campaignImages.length) % campaignImages.length);
      } else if (lastDelta < -30) {
        setCenter((idx) => (idx + 1) % campaignImages.length);
      }
    };

    carousel.addEventListener("mousedown", handlePointerDownMouse);
    window.addEventListener("mousemove", handlePointerMoveMouse);
    window.addEventListener("mouseup", handlePointerUpMouse);

    carousel.addEventListener("touchstart", handlePointerDownTouch, { passive: false });
    carousel.addEventListener("touchmove", handlePointerMoveTouch, { passive: false });
    carousel.addEventListener("touchend", handlePointerUpTouch);

    const preventScroll = (e) => {
      if (isDown && e.cancelable) e.preventDefault();
    };
    carousel.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      carousel.removeEventListener("mousedown", handlePointerDownMouse);
      window.removeEventListener("mousemove", handlePointerMoveMouse);
      window.removeEventListener("mouseup", handlePointerUpMouse);

      carousel.removeEventListener("touchstart", handlePointerDownTouch);
      carousel.removeEventListener("touchmove", handlePointerMoveTouch);
      carousel.removeEventListener("touchend", handlePointerUpTouch);
      carousel.removeEventListener("touchmove", preventScroll);
    };
  }, [dragStart, dragDelta, isMobileView]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") setCenter((idx) => (idx - 1 + campaignImages.length) % campaignImages.length);
      else if (e.key === "ArrowRight") setCenter((idx) => (idx + 1) % campaignImages.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const visibleImages = getVisibleImages(campaignImages, center, VISIBLE);
  // Reduced gap to bring images closer
  const gap = isMobileView ? 8 : Math.max(6, Math.round(containerWidth / 80));

  return (
    <div
  className={`md:-mt-8 -mt-[130px] relative mb-16 font-['Roboto'] w-full px-0  ${
    isMobileView ? 'overflow-hidden' : 'overflow-x-auto'
  } overflow-y-hidden`}
  style={{
    WebkitOverflowScrolling: isMobileView ? 'auto' : 'touch',
    paddingBottom: isMobileView ? '40px' : '80px',
  }}
>
  <div
    className="md:-mt-2 -mt-[100px] relative mx-auto"
    ref={carouselRef}
    style={{
      width: isMobileView ? '100%' : 'auto',
      maxWidth: isMobileView ? '100%' : '100vw',
      minHeight: isMobileView ? '320px' : '200px',
      overflow: 'visible',
      margin: '0 auto',
      position: 'relative',
    }}
  >
    <div
      className="relative flex justify-center items-center overflow-visible select-none touch-pan-x"
      style={{
        width: '100%',
        height: isMobileView ? 'min(100vw, 400px)' : 'min(90vw, 380px)',
        minHeight: isMobileView ? 180 : 140,
        maxHeight: isMobileView ? 460 : 540,
        perspective: '2000px',
        cursor: dragStart ? 'grabbing' : 'grab',
        userSelect: 'none',
        position: 'relative',
        touchAction: 'pan-y',
      }}
    >
      {isMobileView && (
        <button
          onClick={() => setCenter((idx) => (idx - 1 + campaignImages.length) % campaignImages.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md"
          style={{ opacity: 0.85 }}
          aria-label="Previous"
        >
          <ChevronLeft />
        </button>
      )}
      {visibleImages.map(({ idx, offset }) => {
        const dragX = offset === 0 && dragStart !== null ? dragDelta : 0;
        const style = getImageStyle(offset, dragX, containerWidth, VISIBLE, gap);

        let addGap = offset * gap * (Math.abs(offset) === 2 ? 0.9 : 1);
        if (Math.abs(offset) === 2) addGap += offset * gap * 0.1;

        return (
          <div
            key={`img-${idx}`}
            className="carousel-image absolute rounded-xl overflow-hidden shadow-xl"
            data-offset={offset}
            style={{
              width: `${style.width}px`,
              height: `${style.height}px`,
              left: '50%',
              top: '50%',
              transform: `
                translate(-50%, -50%)
                translateX(${style.translateX + addGap}px)
                scale(${style.scale})
                rotateY(${style.rotateY}deg)
              `,
              zIndex: style.zIndex,
              opacity: style.opacity,
              transition: dragStart
                ? 'none'
                : 'transform 0.5s cubic-bezier(.77,0,.18,1), opacity 0.45s cubic-bezier(.77,0,.18,1)',
              boxShadow: offset === 0
                ? '0 12px 40px 0 rgba(0,0,0,0.11)'
                : '0 2px 20px 0 rgba(0,0,0,0.08)',
              pointerEvents: offset === 0 ? 'auto' : 'none',
              filter: offset === 0 ? 'brightness(1.1)' : 'brightness(.95)',
              border: offset === 0 ? '2.5px solid #008cd0' : '2px solid #e7f6fd',
              cursor: offset === 0 ? 'pointer' : 'default',
              background: '#FFF',
            }}
            tabIndex={offset === 0 ? 0 : -1}
            onClick={() => setCenter(idx)}
            aria-label={`Campaign ${idx + 1}`}
          >
            <img
              src={campaignImages[idx]}
              alt={`Campaign ${idx + 1}`}
              className="w-full h-full object-cover sm:rounded-xl pointer-events-none select-none"
              style={{
                objectFit: 'cover',
                background: '#FFF',
              }}
              loading="lazy"
              draggable={false}
            />
          </div>
        );
      })}
      {isMobileView && (
        <button
          onClick={() => setCenter((idx) => (idx + 1) % campaignImages.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md"
          style={{ opacity: 0.85 }}
          aria-label="Next"
        >
          <ChevronRight />
        </button>
      )}
    </div>
    {/* Dot indicator */}
    <div
      className={`flex justify-center items-center gap-2 ${
        isMobileView
          ? 'absolute bottom-20 left-0 right-0 z-30'
          : 'relative mt-4'
      }`}
    >
      {campaignImages.map((_, idx) => {
        const isActive = idx === center;
        return (
          <span
            key={`dot-${idx}`}
            style={{
              display: 'inline-block',
              width: isActive ? 16 : 9,
              height: isActive ? 16 : 9,
              borderRadius: '999px',
              background: isActive ? '#008cd0' : '#e7f6fd',
              boxShadow: isActive ? '0 0 4px #008cd0b0' : 'none',
              transition: 'all 0.25s',
              margin: '0 2px',
              border: isActive ? '2px solid #389ED7' : '1px solid #8ab5cdff',
              cursor: 'pointer',
            }}
            onClick={() => setCenter(idx)}
            aria-label={`Go to image ${idx + 1}`}
            tabIndex={0}
          />
        );
      })}
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
  '/images/mobile5.png',
];

const sentences = [
  "Gentle reminders based on your routine",
  "Syncs with your FROST device",
  "Available for iOS and Android",
  "Track your progress in real-time",
  "Set your hydration and break goals",
];

const CampaignSection = () => {
  const [activeIndex, setActiveIndex] = useState(0); // default center
  const [sentenceKey, setSentenceKey] = useState(0); // for animation key

  // Swipe handlers
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const deltaX = touchStartX.current - touchEndX.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        updateActiveIndex((activeIndex + 1) % mobileImages.length);
      } else {
        updateActiveIndex((activeIndex - 1 + mobileImages.length) % mobileImages.length);
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const updateActiveIndex = (index) => {
    setActiveIndex(index);
    setSentenceKey((prev) => prev + 1); // trigger sentence animation
  };

  const getVisibleIndices = () => {
    const total = mobileImages.length;
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      let idx = (activeIndex + i + total) % total;
      indices.push(idx);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="-mt-8 relative left-1/2 right-1/2 w-screen -translate-x-1/2 font-['Roboto'] bg-white">
      <br />
      {/* Top Banner */}
      <img
        src="/images/campaign1.png"
        alt="Campaign Banner"
        className="w-full rounded-lg mb-12"
      />

      {/* How it STARTED */}
      <div className="-mt-6 text-center mb-16 font-roboto">
        <h2 className="text-2xl md:text-3xl text-[#021637] font-bold mb-2">
          How it <span className="text-[#389ED7]">STARTED</span>
        </h2>
        <p className="text-sm md:text-base text-[#021637] max-w-2xl mx-auto">
          Our story <span className="text-[#389ED7] font-semibold">began with one simple frustration</span><br />
          we kept forgetting to drink water during work hours, <span className="text-[#389ED7]"><b>Headaches, fatigue, burnout followed.</b></span>
        </p>
        <p className="mt-4 font-medium text-base md:text-lg">
          <span className="text-[#389ED7] text-2xl font-semibold">So we asked:</span> <span className="text-base">What if your desk reminded you to care for yourself</span>
        </p>
        <p className="text-sm md:text-base mt-2 font-medium">
          We <span className="text-[#389ED7]"><b>sketched ideas</b></span>, <span className="text-[#389ED7]"><b>built prototypes</b></span>, <span className="text-[#389ED7]"><b>tested designs</b></span>, and now,<br />
          <span className="font-bold tracking-wider">FROST is ready to make wellness at work effortless.</span>
        </p>
      </div>

      {/* Mobile Image Carousel */}
        <ScrollableCampaignGrid/>

      {/* App Features Section */}
      <div className="w-full -mt-20 px-4 md:px-12 text-center bg-white font-['Roboto']">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="text-[#021637]">App </span>
          <span className="text-[#389ED7]">Features</span>
        </h2>

        {/* Bullet Points */}
        <div className="flex flex-col gap-y-6 text-[#021637] font-medium text-sm md:text-base max-w-6xl mx-auto mb-2 text-center sm:text-left">
  {/* First Row */}
  <div className="flex flex-col sm:flex-wrap sm:flex-row justify-center items-center sm:items-start gap-3 sm:gap-6">
    <div className="flex items-start justify-center sm:justify-start gap-2 sm:pl-4 sm:relative">
      <span className="sm:absolute sm:left-0">•</span>
      <span>Gentle reminders based on your routine</span>
    </div>
    <div className="md:ml-0 -ml-7 flex items-start justify-center sm:justify-start gap-2 sm:pl-4 sm:relative">
      <span className="sm:absolute sm:left-0">•</span>
      <span>Set your hydration and break goals</span>
    </div>
    <div className="md:ml-0 -ml-16 flex items-start justify-center sm:justify-start gap-2 sm:pl-4 sm:relative">
      <span className="sm:absolute sm:left-0">•</span>
      <span>Available for iOS and Android</span>
    </div>
  </div>

  {/* Second Row */}
  <div className="md:-mt-2 flex flex-col sm:flex-wrap sm:flex-row justify-center items-center sm:items-start gap-3 sm:gap-6">
    <div className="md:ml-0 -ml-11 flex items-start justify-center sm:justify-start gap-2 sm:pl-4 sm:relative">
      <span className="sm:absolute sm:left-0">•</span>
      <span>Track your progress in real-time</span>
    </div>
    <div className="md:ml-0 -ml-14 flex items-start justify-center sm:justify-start gap-2 sm:pl-4 sm:relative">
      <span className="sm:absolute sm:left-0">•</span>
      <span>Syncs with your FROST device</span>
    </div>
  </div>
</div>

        <br /><br />
      </div>

      {/* Dynamic Sentence Above Carousel */}
      <div className="text-center text-base md:text-xl font-bold text-[#021637] font-['Roboto'] mb-6 min-h-[30px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={sentenceKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            • {sentences[activeIndex]}
          </motion.div>
        </AnimatePresence>
      </div>



      {/* Carousel in Ring */}
      <div className="mt-20 relative w-full flex justify-center items-center mb-10">
        {/* Outer Ring */}
        <div className="absolute w-[400px] h-[400px] md:w-[520px] md:h-[520px] rounded-full border-[10px] border-[#D7F1FD] z-0" />

        {/* Inner Circle */}
        <div className="absolute w-[330px] h-[330px] md:w-[450px] md:h-[450px] rounded-full bg-[#8ACAED] z-0" />

        {/* 5-image Carousel */}
        <div
          className=" relative z-10 flex items-center justify-center w-full max-w-5xl gap-0 select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {visibleIndices.map((imgIdx, i) => {
            const relativeIndex = i - 2;
            let width, scale, zIndex, rotate, translate;

            if (relativeIndex === 0) {
              width = "w-[132px] md:w-[170px] lg:w-[190px]";
              scale = "scale-110";
              zIndex = "z-30";
              rotate = "rotate-0";
              translate = "translate-x-0";
            } else if (relativeIndex === -1) {
              width = "w-[84px] md:w-[104px] lg:w-[140px]";
              scale = "scale-100";
              zIndex = "z-20";
              rotate = "-rotate-[12deg]";
              translate = "translate-x-[35px]";
            } else if (relativeIndex === 1) {
              width = "w-[84px] md:w-[104px] lg:w-[140px]";
              scale = "scale-100";
              zIndex = "z-20";
              rotate = "rotate-[12deg]";
              translate = "-translate-x-[35px]";
            } else {
              width = "w-[64px] md:w-[104px] lg:w-[100px]";
              scale = "scale-100";
              zIndex = "z-10";
              const isFarLeft = relativeIndex === -2;
              rotate = isFarLeft ? "-rotate-[18deg]" : "rotate-[18deg]";
              translate = `${isFarLeft ? "translate-x-[68px]" : "-translate-x-[68px]"} translate-y-[18px]`;
            }

            return (
              <div
                key={imgIdx}
                className={`transition-all duration-500 ease-in-out transform ${translate} ${scale} ${zIndex} ${rotate}`}
                style={{ marginLeft: 0, marginRight: 0, flexShrink: 0 }}
                onClick={() => updateActiveIndex(imgIdx)}
              >
                <img
                  src={mobileImages[imgIdx]}
                  alt={`Phone ${imgIdx + 1}`}
                  className={`cursor-pointer ${width}`}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center space-x-2 md:mt-0 mt-4">
        {mobileImages.map((_, index) => (
          <button
            key={index}
            onClick={() => updateActiveIndex(index)}
            className={`w-3 h-3 rounded-full mt-8 transition-all duration-200 ${
              index === activeIndex ? 'bg-[#389ED7]' : 'bg-[#D7F1FD]'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
      <br /><br />

      
    </section>
  );
};






const RewardsSection = () => {
  return (
    <div
      className="relative left-1/2 right-1/2 w-screen -translate-x-1/2"
      style={{ backgroundColor: '#D9F0FA', fontFamily: 'Roboto, sans-serif' }}>
      {/* Row 1 - Sidebar + Welcome Header */}
      <div className="flex flex-col md:flex-row w-full max-w-[1300px] md:max-h-[calc(120vh_-_-350px)]  mx-auto px-4 md:px-6 py-6 gap-6">
        {/* Sidebar */}
        

        {/* Welcome Block */}
        <div className="flex-1 space-y-6">
  {/* Heading Block */}
  <div className="bg-white rounded-xl shadow-md p-4 text-center">
    <h2 className="text-lg md:text-3xl font-bold text-[#001335]">
      <span className="text-[#389ED7] tracking-widest">We Are Raising </span> 
      <span className="text-[# 021637] tracking-widest">pre-seed Funding</span>
    </h2>
  </div>
  {/* Image Block */}
  <div className="bg-[#D9F0FA] rounded-xl  p-2 text-center">
    <img
      src="/images/rewards1.png"
      alt="rewards Header"
      className="md:w-full rounded-lg "
    />
  </div>
</div>
      </div>

      {/* Row 2 - Believer Quote */}
      <div className="w-full max-w-[1300px] mx-auto px-4 md:px-6 py-4">
        <div className="bg-white rounded-xl shadow-md p-6 text-center space-y-2">
          <p className="text-[#021637] font-bold text-lg md:text-2xl tracking-wider">
            "We’re not looking for buyers, We’re looking for{' '}
            <span className="text-[#389ED7]">BELIEVERS</span>"
          </p>
          <p className="text-base text-[#021637]">
            <span className="font-semibold">Invest in FROST</span>
            <span className="font-light">, become part of the founding circle </span>
          </p>
          <p>&</p>
          <p className="text-base text-[#021637] font-light tracking-wide ">
            help us build India’s next wellness-tech success story,{' '}
            <span className="text-[#389ED7] text-base font-bold"><b>together!! </b></span>
          </p>
        </div>
      </div>

      {/* Row 3 - Rewards */}
      <div className="w-full max-w-[1300px] mx-auto px-4 md:px-6 py-4">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-10 space-y-6">
          <h2 className="text-[#001335] text-2xl md:text-5xl font-extrabold uppercase text-center md:text-left">
            REWARDS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center justify-center ">
              <img src="/images/rewards2.jpg" alt="Reward Trophy" className="w-52 sm:w-60 md:w-[264px]    md:-ml-40 relative md:-top-0" />
              
            </div>
            <div className="md:-ml-24 text-sm md:text-base text-[#001335]">
              <h3 className="text-[#389ED7] text-lg md:text-2xl font-bold mb-4">All investors will:</h3>
              <ul className="text-base space-y-3 list-disc list-inside">
                <li>Get a legal stake in FROST (Legal documentation to be done with attorney)</li>
                <li>Be part of our early investor community</li>
                <li>Receive regular updates and transparent financial reporting</li>
                <li>Participate in strategy discussions when appropriate</li>
                <li>Be the first to benefit when FROST gets bigger</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4 - Investment & Return */}
      <div className="w-full max-w-[1300px] mx-auto px-4 md:px-6 py-4">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-10 space-y-1">
          <h2 className="text-[#021637] text-2xl md:text-5xl font-extrabold uppercase text-center md:text-left tracking-wide">
            INVESTMENT & RETURN
          </h2>
          <p className="text-[#389ED7] text-xl font-bold text-center md:text-left tracking-wider">
            The amount invested simply defines the size of their stake, not their status.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
            <div className="flex justify-center">
              <img src="/images/rewards3.jpg" alt="Investment Money Bag" className="w-52 sm:w-64 relative md:top-12 md:-ml-20" />
            </div>
            <div className="md:-mt-22 text-sm md:text-base text-[#001335] space-y-3">
              <div>
                <span className="text-[#389ED7] text-xl font-bold">Investment Amount</span>
                <div className="bg-[#001335]  w-40 sm:w-40 h-8 mt-1 rounded flex items-center justify-center text-white text-lg font-semibold">
                  $599 to $5999
                </div>

              </div>
              <div>
                <span className="text-[#389ED7] text-xl font-bold">Outcome</span>
                <p className="text-sm">Pro-rata ownership based on contribution</p>
              </div>
              <p className="text-[#389ED7] text-xl font-bold ">All Investors</p>
              {/* New Points List */}
        <ul className="-ml-1 list-none space-y-1 pl-1 text-xs md:text-sm text-[#001335]">
          <li>✔ Legal stake in FROST (details via agreement)</li>
          <li>✔ Listed in internal investor records</li>
          <li>✔ Regular progress updates</li>
          <li>✔ Priority on future funding rounds</li>
          <li>✔ Invite to milestone events</li>
          <li>✔ Access to product pre-orders at discounted price</li>
        </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Row 5 - Announcement */}
      <div className="w-full max-w-[1300px] mx-auto px-4 md:px-6 py-4">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-10 space-y-6">
          <h2 className="text-[#001335] text-2xl md:text-5xl font-extrabold uppercase text-center md:text-left">
            ANNOUNCEMENT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <img src="/images/rewards4.jpg" alt="Megaphone" className="w-52 sm:w-60" />
            </div>
            <div className="text-sm md:text-base text-[#001335]">
              <h3 className="text-[#389ED7] text-lg md:text-xl font-bold mb-4">Clarification for All Investors</h3>
              <ul className="space-y-3  list-disc list-inside">
                <li>No "perks" based on amount, only proportional stake</li>
                <li>Equal respect, equal communication</li>
                <li>Larger investors simply hold larger ownership %</li>
                <li>Everyone contributes to bringing FROST to life</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [form, setForm] = useState({ question: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const GOOGLE_SHEET_URL =
    "https://script.google.com/macros/s/AKfycbzPn46_hc9gYMS1MsyvUNLbMWogzIn2snF8jx4z3V4Imzxa_n_iaJR1LMTSVxFvNbPxag/exec";

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
 const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const { question, email } = form;
  if (!email) {
    alert("Please enter your email");
    setLoading(false);
    return;
  }

  try {
    // ✅ Google Sheet
    const params = new URLSearchParams();
    params.append("question", question);
    params.append("email", email);

    await fetch(GOOGLE_SHEET_URL, { method: "POST", body: params });

    // ✅ ConvertKit Form (works safely in browser)
    const CONVERTKIT_FORM_ID = "8592548";
    const CONVERTKIT_API_KEY = "f19zF3PqAUMEWKhQJEs0BQ";
    await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: CONVERTKIT_API_KEY,  
      email: email, 
      }),
    });

    // ✅ ConvertKit Tag (optional — not secure for production)
    const CONVERTKIT_TAG_ID = "10984046";
    const CONVERTKIT_API_SECRET = "yPWWBt94zkQpnhckl9HPkaN2NBmZuYgwM_6Zf1N9A0I";
    await fetch(`https://api.convertkit.com/v3/tags/${CONVERTKIT_TAG_ID}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_secret: CONVERTKIT_API_SECRET,  
      email: email,
       }),
    });

    setShowModal(true);
    setForm({ question: "", email: "" });
    setTimeout(() => setShowModal(false), 10000);

  } catch (err) {
    console.error("Error submitting:", err);
    alert("Something went wrong. Please try again.");
  }

  setLoading(false);
};



  //  FAQ List with individual question and answer
  const faqs = [
    {
      question: "What is Frost Aura and how is it different from other wellness products?",
      answer: "Frost Aura is a desktop wellness companion that goes beyond hydration. It blends habit-forming hydration reminders, posture and break cues, and sound-based water energizing (using frequencies like 432Hz, mantras, and affirmations). Unlike smart bottles, Frost Aura works with any container — bottle, mug, or glass — turning hydration into a mindful ritual.",
    },
    {
      question: "What problem does Frost Aura solve?",
      answer: "In our screen-heavy, fast-paced lives, people often forget to hydrate, stretch, or take mindful breaks. This leads to fatigue, poor focus, posture issues, and long-term health problems. Frost Aura provides gentle nudges to restore balance through hydration and energy alignment — right from your desk.",
    },
    {
      question: "What stage is the product in?",
      answer: "We’ve completed the MVP stage with a functional prototype, display logic, and hardware ready. App development is underway, and industrial design is being finalized. Patent application has also been initiated.",
    },
    {
      question: "What is your business model?",
      answer: "We will initially generate revenue through direct hardware sales (via Kickstarter and D2C website). Long-term revenue will come from premium app features like curated healing sound packs, community features, and future wellness accessories.",
    },
    {
      question: "Who is your target audience?",
      answer: "Professionals and remote workers, Health-conscious individuals and yoga/meditation practitioners, Corporates offering wellness kits for employees, Energy healers, manifestation practitioners, and frequency wellness communities.",
    },
    {
      question: "What is the market opportunity?",
      answer: "Frost Aura sits at the intersection of four growing markets: Hydration tech, Mindfulness & productivity tools, Sound therapy & healing frequencies, Corporate wellness gifting, Combined,these segments contribute to a $7T+ global wellness economy.",
    },
    {
      question: "Are you protected by intellectual property?",
      answer: "Yes. We have initiated our patent process to cover both the hardware docking station and the frequency-based water energizing mechanism. Trademark and design protections are also being considered.",
    },
    {
      question: "How much are you raising and at what valuation?",
      answer: "We are raising ₹25 lakhs ($30,000) as seed capital at a ₹5 crore ($600,000) valuation. This will support manufacturing, certification, pre-launch campaigns, and Kickstarter execution.",
    },
    {
      question: "How will you scale after crowdfunding?",
      answer: "After Kickstarter: Direct-to-customer website sales, Strategic partnerships with wellness centers and corporates, Expansion into smart water dispensers (Frost Aura Max), Global distribution via wellness expos, affiliate programs, and Amazon/retail",
    },
    
  ];

  return (
  <section
    className="w-full px-4 md:px-8 lg:px-20 py-0"
    style={{ fontFamily: 'Roboto, sans-serif' }}      
  >
    {/* Title */}
    <div className="text-center mb-12 relative">
      <h2 className="text-[25px] md:text-[44px] font-bold text-[#001335] relative z-10">
        Frequently Asked Questions
      </h2>
      <h2 className="md:mt-6 mt-2 text-[32px] sm:text-[40px] md:text-[75px] font-extrabold text-[#001335] opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0">
        Frequently Asked Questions
      </h2>
    </div>

    {/* Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-[1fr_6px_1fr] gap-4 md:gap-10 items-start">
      
      {/* FAQ List - Vertical scroll removed */}
      <div className="mt-4 md:-ml-24 md:mt-[28px] pr-6 custom-scroll space-y-2">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-md p-4 shadow-sm hover:shadow-md transition"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleIndex(index)}
            >
              <p className="text-[#001335] font-medium text-sm md:text-base">
                {item.question}
              </p>
              <ArrowRight
                className={`text-[#389ED7] transform transition-transform duration-300 ${
                  openIndex === index ? 'rotate-90' : ''
                }`}
              />
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden text-sm text-[#001335] mt-2 ${
                openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="hidden md:flex justify-center" />

      {/* Ask Question Section */}
      <div className="md:mt-[55px] flex flex-col items-center p-6 rounded-md text-center space-y-6">
        <img
          src="/images/faq.png"
          alt="Any Question"
          className="w-24 h-24 object-contain mx-auto"
        />
        <div className="space-y-0">
          <h3 className="text-[#021637] text-lg md:text-xl font-bold">
            Any Questions?
          </h3>
          <p className="text-sm font-light text-[#021637]">
            You can ask anything you want to know
          </p>
        </div>
        <form className="w-full space-y-2" onSubmit={handleSubmit}>
          <label
            htmlFor="question"
            className="text-sm text-left text-[#001335] block"
          >
            Let Us Know
          </label>
          <input
            id="question"
            type="text"
            placeholder="Type your question"
            value={form.question}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#389ED7]"
          />
          <input
            id="email"
            type="email"
            placeholder="Enter your email id"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#389ED7]"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#389ED7] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#2b87c4] transition"
          >
            {loading ? "Sending..." : "Send"}
          </button>

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full text-center"
              >
                <h2 className="text-xl text-[#389ED7] font-semibold mb-2">
                  Message Sent!
                </h2>
                <p className="text-sm text-[#021637] mb-4">
                  Thank you for reaching out! We've received your message and will get back to you shortly.
                </p>
                <Button
                  onClick={() => setShowModal(false)}
                  className="bg-[#389ed7] hover:bg-[#2b7ec5] text-white font-medium py-2 px-4 rounded-lg"
                >
                  Close
                </Button>
              </motion.div>
            </div>
          )}
        </form>
      </div>
    </div>
    <br />
  </section>
  
);
};


const updates = [
  {
    id: 1,
    title: "🎉FROST in the News! 📰",
    date: "June 29, 2025",
    //comments: 0,
    //likes: 0,
    images: [
      { src: "/images/update1.png", alt: "FROST featured in news" },
      { src: "/images/update2.jpg", alt: "Newspaper article photo" }
    ],
    content: (
      <>
        Super excited to share that{" "}
        <span className="text-[#389ED7]">
          <b>FROST</b>
        </span>{" "}
        has been featured in the German newspaper <b>Siegener Zeitung! </b>
        Our mission to build healthier habits and create innovative water solutions is getting noticed, proud moment for all of us! 💧✨
        <br />
        <b>Check it out here online link 👇 </b>
        <br />
        <a
          href="http://bit.ly/frost-germany"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#3B9FD8] hover:underline"
        >
          http://bit.ly/frost-germany
        </a>
        <p>
          Big thanks to the entire team and supporters, this is just the beginning! 🚀
        </p>
      </>
    ),
    commentsList: [
      {
      name: "Peter Sparks",
      time: "2 days ago",
      comment:
        "Dummy text of the printing and typesetting industry. Dummy text of the printing and typesetting industry.",
      image: "/images/user.png"
      },
      {
      name: "Peter Sparks",
      time: "2 days ago",
      comment:
        "Dummy text of the printing and typesetting industry. Dummy text of the printing and typesetting industry.",
      image: "/images/user.png"
      },
      {
      name: "Peter Sparks",
      time: "2 days ago",
      comment:
        "Dummy text of the printing and typesetting industry. Dummy text of the printing and typesetting industry.",
      image: "/images/user.png"
      },
      {
      name: "Peter Sparks",
      time: "2 days ago",
      comment:
        "Dummy text of the printing and typesetting industry. Dummy text of the printing and typesetting industry.",
      image: "/images/user.png"
      },

      ]
  }

];

const UpdatesSection = () => {
  const [selectedUpdateIndex, setSelectedUpdateIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (selectedUpdateIndex !== null && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedUpdateIndex]);

  const selectedUpdate =
    selectedUpdateIndex !== null ? updates[selectedUpdateIndex] : null;

  const handleNext = () => {
    if (selectedUpdateIndex < updates.length - 1) {
      setSelectedUpdateIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedUpdateIndex > 0) {
      setSelectedUpdateIndex((prev) => prev - 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-0 sm:py-0"
      style={{
        fontFamily: "Roboto, sans-serif",
        backgroundColor: "#ffffff"
      }}
    >
      {selectedUpdateIndex === null ? (
        // List View
        <div className=" pr-3 custom-scroll">
          <div className=" space-y-6 p-4">
            {updates.map((update, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-md p-4 sm:p-6 shadow-sm space-y-4"
              >
                {/* Top Row */}
                <div className="flex justify-between items-start text-xs sm:text-sm text-[#001335] font-medium">
                  <span className="font-light">UPDATE #{update.id}</span>
                  <span className="font-light">{update.date}</span>
                </div>

                {/* Heading */}
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#001335] break-words">
                  {update.title}
                </h2>
                <br />

                {/* Image Section */}
                <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 h-auto md:h-[200px] rounded-md">
                  {update.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.src}
                      alt={img.alt}
                      className={
                        idx === 0
                          ? "h-[180px] sm:h-[200px] md:mt-10 md:h-[280px] md:w-[450px] object-contain"
                          : "h-[250px] sm:h-[200px] md:-ml-14 md:mt-4 md:h-[300px] md:w-[450px] object-contain"
                      }
                    />
                  ))}
                </div>
                
                <br />
                <br />
                {/* Bottom Row */}
                <div className="flex flex-wrap justify-between items-center text-sm text-[#001335] mt-2 gap-4">
                  <div className="flex space-x-6 items-center">
                    <div className="flex items-center space-x-1">
                       {/*<MessageCircle className="w-4 h-4" /> */}
                      <span>{update.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {/* <ThumbsUp className="w-4 h-4" /> */}
                      <span>{update.likes}</span>
                    </div>
                  </div>

                  <button
                    className="border border-[#021637] text-[#021637] text-sm px-4 py-1 rounded-md hover:bg-[#001335] hover:text-white transition whitespace-nowrap"
                    onClick={() => setSelectedUpdateIndex(index)}
                  >
                    Read more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (

        // Detail View
        <div className="space-y-4">
          <div className=" md:h-[410px] p-4 rounded-md shadow-sm">
            <button
              className="flex items-center border border-[#001335] text-[#001335] text-sm px-3 py-1 rounded-md hover:bg-[#001335] hover:text-white transition"
              onClick={() => setSelectedUpdateIndex(null)}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              All Updates
            </button>
            <br />
            <div className="flex justify-between items-start text-sm text-[#001335] font-light flex-wrap gap-y-1">
              <span className="font-light">UPDATE #{selectedUpdate.id}</span>
              <span>{selectedUpdate.date}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#001335]">
              {selectedUpdate.title}
            </h2>
            <br />

            {/* Detail Images */}
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 h-auto md:h-[200px] rounded-md">
              {selectedUpdate.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.src}
                  alt={img.alt}
                  className={
                    idx === 0
                      ? "h-[180px] sm:h-[200px] md:mt-10 md:h-[280px] md:w-[450px] object-contain"
                      : "h-[250px] sm:h-[200px] md:-ml-14 md:mt-4 md:h-[300px] md:w-[450px] object-contain"
                  }
                />
              ))}
            </div>

            <br />
            <br />
          
             {/*
            <div className="flex flex-wrap gap-6 items-center mt-2 text-[#001335] text-sm">
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{selectedUpdate.comments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{selectedUpdate.likes}</span>
              </div>
            </div>
            */}
          </div>

          
          {/* Content */}
          <div className="text-base text-[#001335] leading-relaxed whitespace-pre-line">
            {selectedUpdate.content}
          </div>

          {/* Comments Section 
          <div className="mt-8">
            <h3 className="text-lg font-bold text-[#001335] mb-4">Comments</h3>
            <div className="bg-[#D9F0FA] rounded-md max-h-[300px] overflow-y-scroll custom-scroll px-4 py-4 space-y-4">
              {selectedUpdate.commentsList.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-md shadow-sm flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold text-[#001335]">
                      {c.name}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">{c.time}</div>
                    <div className="text-sm text-[#001335]">{c.comment}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          */}

          {/* Pagination 
          <div className="flex justify-between flex-wrap gap-2">
            <button
              className="border border-[#001335] px-4 py-1 rounded-md text-sm disabled:opacity-50"
              onClick={handlePrevious}
              disabled={selectedUpdateIndex === 0}
            >
              <ArrowLeft className="inline w-4 h-4 mr-1" />
              Previous
            </button>
            <button
              className="border border-[#001335] px-4 py-1 rounded-md text-sm disabled:opacity-50"
              onClick={handleNext}
              disabled={selectedUpdateIndex === updates.length - 1}
            >
              Next <ArrowRight className="inline w-4 h-4 ml-1" />
            </button>
          </div>
           */}

        </div>
      )}
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
      return <RewardsSection />;
    case 'FAQ':
        return <FAQSection />;
    case 'Updates':
         return <UpdatesSection />;
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
  const [newTab] = useState(''); // Change 'Investors' to any of the tabList names as needed

  const images = [
  '/images/preorder1.jpg',
  '/images/gallery1-5.jpg',
  '/images/invest1.1.jpg',
  '/images/invest3.jpg',
  '/images/gallery3-3.jpg',
  '/images/invest4.jpg',
  '/images/1.bmp',
 
];
const [selectedImage, setSelectedImage] = useState(0);


  return (
  <div className=" relative left-1/2 right-1/2 w-screen -translate-x-1/2 font-sans bg-[#FFFFFF] text-gray-900">
      
      {/* Main top content  */}
      <section className="text-center py-8 px-4 md:px-20 font-['Roboto']">
     <div className="mt-20 relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#F5F5F5]">
     <h1 className="-mt-4 text-3xl md:text-4xl font-bold text-[#021637] mb-1">
      INVEST IN FROST
     </h1>
     <p className="text-lg md:text-xl tracking-widest mb-8">
      World’s First Smart Wellness Dock
     </p>
   </div>
   <br />

   <div className="flex flex-col md:flex-row items-stretch gap-0 w-full"> {/* gap-6 */}
    {/* Left Image with Thumbnails */} 
    <div className="w-full md:w-[100%] flex flex-col items-center">
       {/*  md:items-start  */}

      {/* Main Image */}
      <img
        src={images[selectedImage]}
        alt="frost"
        className=" -mt-4 w-[550px] lg:h-[355px]  rounded-lg transition-all duration-300"
      /> {/* -ml-8  */}    {/* object-cover , object-contain*/}
      

      {/* Thumbnails 
      <div className="mt-4 flex justify-center md:justify-start gap-1 md:ml-[70px] flex-wrap">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumb-${index}`}
            onClick={() => setSelectedImage(index)}
            className={`md:w-16 md:h-18 w-12 h-14 rounded-md object-cover cursor-pointer border-2 ${
              selectedImage === index
                ? 'border-[#389ED7]'
                : 'border-transparent'
            }  transition-all duration-200`}
          />
        ))}
      </div> */}
    </div>

    {/* Right Text + Investment Card */}
    <div className="lg:-mt-5 w-full md:w-3/4 flex flex-col justify-start items-start gap-6 p-2 text-left md:px-0">
      {/* Text Section */}
      <div className="md:max-w-[460px] w-full"> {/* -ml-8 */}
        <h3 className="text-2xl font-bold mb-1 tracking-wider">
          Be Part of the Wellness Revolution
        </h3>
        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
          <span className="text-[#389ED7] text-base font-bold">Frost</span> is
          reshaping how we hydrate, recharge, and refocus by blending science,
          technology, and mindfulness into one smart wellness dock.
          <br />
          With the{' '}
          <span className="text-[#389ED7] font-bold">
            first ever Smart Wellness Dock
          </span>
          , you’re not just investing in a product you’re backing a mindful
          lifestyle and daily wellness movement.
        </p>
        <p className="text-base text-[#021637] mb-4 leading-relaxed">
          Join us early and grow with a brand that is set to redefine the
          future of everyday well being
        </p>
      </div>

      {/* Investment Card */}
      <div className=" bg-white -mt-6 shadow-md rounded-md px-6 py-4 w-full max-w-[400px] flex justify-between items-center gap-6"> {/* -ml-8 */}
        {/* ₹50k Section (Left) */}
        <div className="text-left">
          <p className="text-[14px] tracking-widest text-[#021637] font-semibold mb-1">
            Start With Just
          </p>
          <div className="flex items-baseline space-x-1">
            <span className="-ml-1 text-6xl font-bold text-[#021637]">
              $599
            </span>
          </div>
        </div>

        {/* Buttons Section (Right) */}
        <div className="flex flex-col items-start gap-2">
          <Button
            onClick={() =>
              window.open(
                'https://docs.google.com/forms/d/e/1FAIpQLSeJycUhnWB_wg4eEXGJLxpj2ED-E4CD4xzTwEbTYOSr3RgeYg/viewform?usp=sharing&ouid=114428934315838563404',
                '_blank'
              )
            }
            className="tracking-wider bg-[#389ED7] hover:bg-[#3a9ad2] text-white text-base font-bold px-4 py-2 rounded-md w-[185px]"
          >
            💰 INVEST NOW
          </Button>

          <Button
            onClick={() =>
              window.open(
                'https://koalendar.com/e/frost-early-investor-and-founders-meeting',
                '_blank'
              )
            }
            className="tracking-wider bg-[#389ED7] hover:bg-[#3a9ad2] text-white text-base font-bold px-4 py-2 rounded-md w-[185px]"
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
        <div className="flex flex-wrap justify-center md:gap-20 md:text-base gap-6 text-sm py-4 font-['Roboto'] relative">
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