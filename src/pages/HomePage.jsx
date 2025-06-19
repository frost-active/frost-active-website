import React, { useState, useEffect, useRef, useLayoutEffect } from "react"; 
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck, Menu, ChevronLeft, ChevronRight, Pill, Clock, Brain, Dumbbell, Footprints, CheckCircle, Droplet, Bell, Coffee, HeartPulse, Users, Thermometer, BarChart, Zap, Settings, Smartphone, ArrowRight, Linkedin, Instagram, Twitter, Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate,  useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwipeable } from 'react-swipeable';
import { Navigation, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import "swiper/css/effect-creative";
import RatingBar from '@/components/ui/RatingBar';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import './DottedLine.css';
import path from 'path';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const navLinks = [
  { name: 'Home', path: 'home' },
  { name: 'Features', path: 'features' },
  { name: 'Working', path: 'how-it-works' },
  { name: 'Team', path: 'team' },
  { name: 'Testimonials', path: 'testimonials' },
  { name: 'Contact Us', path: 'try' },
];

// Header component with scroll-to-section navigation
const Header = () => {
  const handleNavClick = (sectionId) => (e) => {
    e.preventDefault();
    const section = document.getElementById(sectionId.toLowerCase().replace(/\s+/g, ''));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Header (fixed) */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-2 font-extrabold text-xl text-primary hover:text-blue-200 transition-all"
              onClick={handleNavClick('home')}
            >
              <div className="relative left-[-30px] top-[6px] ">
              <img
                src="/images/logo2.png"
                alt="FROST Logo"
                className="h-40 w-auto object-contain max-w-[180px]" // restrict height and width
              />
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.path.toLowerCase().replace(/\s+/g, '')}`}
                  className="text-sm font-semibold text-gray-800 transition-all duration-300 ease-in-out hover:text-primary hover:underline"
                  onClick={handleNavClick(link.path)}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-primary">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white rounded-lg shadow-lg">
                  {navLinks.map((link) => (
                    <DropdownMenuItem key={link.name} asChild>
                      <a
                        href={`#${link.path.toLowerCase().replace(/\s+/g, '')}`}
                        className="text-gray-800 hover:bg-blue-100 rounded-md px-4 py-2 transition-all"
                        onClick={handleNavClick(link.path)}
                      >
                        {link.name}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content being hidden under fixed header */}
     
    </>
  );
};



const heroContent = [
  {
    heading: "YOUR NEW",
    subheading: "DESKTOP COMPANION",
    description:
      "Stay sharp, stay centered. FROST keeps you hydrated and focused with timely posture resets, deep breathing cues, and eye relaxation prompts that recharge your workflow.",
    image: "/images/bottle.png",
    imageStyles: { top: "10px", left: "246px", height: "258px", width: "80px" },
  },
  {
    heading: "YOUR NEW",
    subheading: "KITCHEN COMPANION",
    description:
      "Hydrate with intention while you cook, eat, or unwind. FROST energizes your water with healing frequencies and fits seamlessly into your kitchen flow.",
    image: "/images/bottle3.png",
    imageStyles: { top: "70px", left: "250px", height: "200px", width: "71px" },
  },
  {
    heading: "YOUR NEW",
    subheading: "GYM COMPANION",
    description:
      "Train harder, recover smarter. FROST reminds you to rehydrate mid-set  with energizing buzz and vibes that sync with your fitness rhythm.",
    image: "/images/bottle5.png",
    imageStyles: { top: "68px", left: "250px", height: "200px", width: "100px" },
  },
  {
    heading: "YOUR NEW",
    subheading: "STUDY ROOM COMPANION",
    description:
      "Power through long study hours with clarity. FROST boosts focus with Pomodoro timers and hydration nudges no distractions, just deep work flow.",
    image: "/images/bottle4.png",
    imageStyles: { top: "78px", left: "247px", height: "200px", width: "80px" },
  },
  {
    heading: "YOUR NEW",
    subheading: "YOGA STUDIO COMPANION",
    description:
      "Align your breath, body  & your water. FROST infuses your hydration with healing sound frequencies like 432 Hz etc, designed to enhance flow, balance energy, and deepen your practice.",
    image: "/images/bottle2.png",
    imageStyles: { top: "23px", left: "250px", height: "250px", width: "75px" },
  },
  {
    heading: "YOUR NEW",
    subheading: "CLINIC COMPANION",
    description:
      "Care meets clarity. Perfect for wellness spaces  FROST delivers medication reminders and water cues, designed for health-conscious routines.",
    image: "/images/bottle7.png",
    imageStyles: { top: "190px", left: "248px", height: "80px", width: "100px" },
  },
  {
    heading: "YOUR NEW",
    subheading: "MEDITATION CORNER COMPANION",
    description:
      "Elevate your stillness. FROST plays subtle affirmations and sound frequencies to create a deeper connection between mind and body.",
    image: "/images/bottle9.png",
    imageStyles: { top: "190px", left: "227px", height: "80px", width: "120px" },
  },
  {
    heading: "YOUR NEW",
    subheading: "WORKOUT PLACE COMPANION",
    description:
      "From cardio to cooldown, hydration follows you. FROST adapts to any bottle or mug  tracking your hydration habits with minimalist intelligence.",
    image: "/images/bottle6.png",
    imageStyles: { top: "50px", left: "246px", height: "220px", width: "80px" },
  },
  {
    heading: "YOUR NEW",
    subheading: "COUCH/LIVING ROOM COMPANION",
    description:
      "Even your downtime deserves intention. Whether you’re Netflixing or journaling, FROST quietly reminds you to stay hydrated and balanced.",
    image: "/images/bottle8.png",
    imageStyles: { top: "80px", left: "250px", height: "200px", width: "70px" },
  },
];



const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const subheadingRef = useRef(null);
  const [isMultiLine, setIsMultiLine] = useState(false);

  useEffect(() => {
    if (subheadingRef.current) {
      const element = subheadingRef.current;
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      const height = element.offsetHeight;
      setIsMultiLine(height > lineHeight * 1.1);
    }
  }, [currentIndex, heroContent]);

  // ✅ Preload images
  useEffect(() => {
    heroContent.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroContent.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === heroContent.length - 1 ? 0 : prev + 1));
  };

  const current = heroContent[currentIndex];

  return (
    <section
      id="home"
      className="
        relative w-full 
        flex items-center justify-center
        px-4 sm:px-6 md:px-8
        py-4 md:py-12
        overflow-hidden
        transition-all
        bg-white
      "
      // No min-h or fixed height! Only padding. This removes forced vertical gaps everywhere.
    >
      <div className="absolute inset-0 left-0 w-1/2 bg-gradient-to-r from-[#e0f7ff] to-transparent z-0 pointer-events-none" />

      <div className="flex items-center justify-center w-full max-w-7xl gap-2 relative z-10">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.2)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Main Card */}
        <div className="md:mt-12 mt-20 relative flex flex-col md:flex-row items-center w-full max-w-6xl h-[730px] md:h-[430px] border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
          {/* h-auto on mobile, fixed on desktop */}
          <div
            className="absolute  inset-0 w-full h-full bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/background-image.png)' }}
          />
          <div
            className="w-full md:-mt-8 md:w-1/2 relative px-4 py-6 sm:px-6 md:p-10 flex flex-col z-10"
            style={{ minHeight: "320px" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
                className="text-center md:text-left max-w-lg"
              >
                <h1
                  className="text-[28px] md:text-[34px] font-semibold -mb-2 text-[#021637]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {current.heading}
                </h1>
                <h2
                  ref={subheadingRef}
                  className={`font-roboto font-semibold text-[28px] md:text-[34px] text-[#389ED7] ${
                    isMultiLine ? "mt-2" : ""
                  }`}
                  style={{ lineHeight: "1.3" }}
                >
                  {current.subheading}
                </h2>
                <p className="font-roboto font-regular text-[15px] text-[#000000] mt-3 mb-3">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>

           <div className="absolute -bottom-2 left-[155px] -translate-x-1/2 md:left-10 md:bottom-2 md:translate-x-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-primary hover:bg-primary/90 text-white px-5 sm:px-6 py-3 rounded-lg text-sm sm:text-base shadow-md">
                  <a href="/order">Book Now</a>
                </Button>
              </motion.div>
            </div>

          </div>
          {/* Right Image Section */}
          <motion.div
            className="absolute top-1/2 flex items-center justify-center w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] z-10 px-6 py-6 sm:p-6 md:p-10 min-h-[180px] sm:min-h-[220px] md:min-h-[300px] custom-right-image"
            style={{ right: 0 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Constant Image */}
                <img
                  src="/images/product.png"
                  alt="Constant"
                  className="absolute top-60 left-60 h-20 w-150 object-contain z-0"
                />
                {/* Dynamic Image */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={current.image}
                    alt={`${current.subheading} Image`}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: "absolute",
                      ...current.imageStyles,
                      zIndex: 10,
                    }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.25)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Styling */}
      <style jsx>{`
  .custom-right-image {
    /* Move image further right on mobile/Desktop Site mode */
    transform: translateY(-5%) translateX(-240px);
  }
  @media (min-width: 640px) {
    .custom-right-image {
      transform: translateY(-10%) translateX(-60px);
    }
  }
  @media (min-width: 768px) {
    .custom-right-image {
      transform: translateY(-200px) translateX(-280px);
    }
  }
`}</style>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Drink Water",
      description:
        "Get personalized nudges to drink water throughout your day — no more guesswork, just natural hydration.",
      details:
        "Even mild dehydration (just 1–2% of body weight) can impair memory, concentration, and mood. Office workers often forget to drink water during long stretches of screen time. Frost Aura delivers gentle, timely nudges—so hydration becomes effortless, not an afterthought.",
      backed: "Harvard T.H. Chan School of Public Health, Lieberman HR (2007)",
      img: "/images/drink-water.png",
    },
    {
      id: 2,
      title: "Clean Bottle",
      description:
        "FROST remembers what you forget. It tracks when you last cleaned your bottle and reminds you to wash it — keeping bacteria at bay.",
      details:
        "Reusable bottles can become breeding grounds for bacteria if not cleaned regularly. Studies show biofilms develop within 48 hours. Frost Aura tracks your cleaning intervals and reminds you when it’s time to wash—so your sips stay safe.",
      backed: "NSF International, Dr. Philip Tierno, NYU Langone",
      img: "/images/clean-bottle.png",
    },
    {
      id: 3,
      title: "Take Medicine",
      description:
        "Set gentle, scheduled medicine reminders aligned with your hydration cycle. Stay consistent with your health routine.",
      details:
        "Medication routines are easy to forget—especially when tied to meals or water intake. Frost Aura links hydration and medicine reminders, helping users stay consistent and healthy with subtle, supportive alerts.",
      backed: "WHO Adherence Report, CDC Medication Compliance",
      img: "/images/take-medicine.png",
    },
    {
      id: 4,
      title: "Water Reminder",
      description:
        "Monitor daily water intake, set goals, and get insights via the FROST mobile app — all without micromanaging.",
      details:
        "Most people under-drink water without realizing it. Frost Aura helps you monitor your daily water intake with smart tracking and insights—building healthier habits one sip at a time.",
      backed: "JAMA (hydration & disease prevention), BJ Fogg's Behavior Model",
      img: "/images/water-remainder.png",
    },
    {
      id: 5,
      title: "Meditation, Yoga & Workout",
      description:
        "Activate focused modes for your practice — FROST emits healing vibrations (like 432 Hz) to harmonize body and mind.",
      details:
        "Your water can carry more than hydration—it can carry healing intent. Frost Aura uses vibrational frequencies like 432 Hz to enhance meditation and yoga sessions, energizing water and harmonizing mind and body.",
      backed: "PubMed - Sound Frequencies on Water, Emoto Water Crystal Study",
      img: "/images/meditation.png",
    },
    {
      id: 6,
      title: "Short Walk",
      description:
        "Been sitting too long? FROST encourages short movement breaks to keep your circulation flowing and your head clear.",
      details:
        "Prolonged sitting is linked to heart disease, diabetes, and fatigue. Just 2–3 minutes of walking every hour reduces these risks. Frost Aura gently encourages short walks to reset your posture and energy.",
      backed: "WHO Activity Guidelines, American Heart Association",
      img: "/images/walk.png",
    },
    {
      id: 7,
      title: "Place Bottle",
      description:
        "Left your bottle behind? FROST gently notifies you to place it back on the dock — so your tracking never skips a beat.",
      details:
        "Habit stacking is key to behavior change. When your bottle is on the dock, you're more likely to hydrate and stay consistent. Frost Aura reminds you to place your bottle—keeping the loop intact.",
      backed: "James Clear (Atomic Habits), Charles Duhigg (The Power of Habit)",
      img: "/images/exercise.png",
    },
    {
      id: 8,
      title: "Short Break",
      description:
        "Protect your focus with short, intentional breaks. Stretch, blink, breathe — let FROST cue your brain to reset.",
      details:
        "Micro-breaks reduce eye strain, mental fatigue, and back pain. Frost Aura suggests 2–3 min pauses to stretch, blink, or breathe—recharging your focus without disrupting your flow.",
      backed:
        "American Optometric Association, Microsoft Human Factors Lab Study",
      img: "/images/cleanbottle.png",
    },
    {
      id: 9,
      title: "Pomodoro Activity",
      description:
        "Work in deep focus cycles with built-in Pomodoro timers — paired with hydration cues to keep your energy flowing.",
      details:
        "The Pomodoro technique boosts focus by breaking tasks into 25-min sprints with 5-min breaks. Frost Aura builds hydration cues into these cycles, keeping your brain fresh and your body fueled.",
      backed: "Francesco Cirillo (Pomodoro Creator), UC Irvine Study on Deep Work",
      img: "/images/pomodoro.png",
    },
  ];

  const [expandedRows, setExpandedRows] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);
  const isHovered = useRef(false);
  const isTouching = useRef(false);
  const resumeTimeout = useRef(null);

  const scrollSpeed = 2;
  const cardWidth = 320;

  const toggleExpand = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const startAutoScroll = () => {
if (scrollInterval.current || isHovered.current) return;

    scrollInterval.current = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      container.scrollLeft += scrollSpeed;

      const scrollWidth = container.scrollWidth;
      const scrollLeft = container.scrollLeft;
      const visibleWidth = container.offsetWidth;

      if (scrollLeft >= scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      const index = Math.round(container.scrollLeft / cardWidth) % features.length;
      setActiveIndex(index);
    }, 15);
  };

  const stopAutoScroll = () => {
    clearInterval(scrollInterval.current);
    scrollInterval.current = null;
  };

  const pauseAndResumeAutoScroll = () => {
    stopAutoScroll();
    clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      isTouching.current = false;
      startAutoScroll();
    }, 2000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      stopAutoScroll();
      clearTimeout(resumeTimeout.current);
    };
  }, []);

  const handleTouchStart = () => {
    isTouching.current = true;
    stopAutoScroll();
  };

  const handleTouchEnd = () => {
    pauseAndResumeAutoScroll();
  };

  return (
    <section id="features" className="container bg-white py-16 px-4 mt-0 md:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground" style={{ fontFamily: "Roboto", fontWeight: "600" }}>
        <span style={{ color: "#021637" }}>KEY </span>
        <span style={{ color: "#389ED7" }}>FEATURES</span>
      </h2>
      <p className="text-center text-muted-foreground mb-8">
        <span style={{ color: "#389ED7" }}>Explore here </span>
        <span style={{ color: "#021637" }}>in-depth </span>
      </p>

      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden scroll-smooth pb-[65px] no-scrollbar"
        onMouseEnter={() => {
          isHovered.current = true;
          stopAutoScroll();
        }}
        onMouseLeave={() => {
          isHovered.current = false;
          startAutoScroll();
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex gap-4 snap-x snap-mandatory mt-20 px-4 pb-6 w-max items-start">
          {[...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features, ...features].map((feature, index) => (
            <div key={`${feature.id}-${index}`} className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                className={`snap-start min-w-[300px] max-w-sm flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-md p-6 flex flex-col relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[6px] after:bg-sky-600 after:rounded-b-xl ${
                  [2, 4, 6, 8].includes(feature.id) ? "relative top-20" : ""
                }`}
              >
                <div className="mx-auto rounded-full" style={{ width: 120, height: 120, marginTop: -96 }}>
                  <img src={feature.img} alt={feature.title} className="w-full h-full object-contain" />
                </div>

                <div className="text-center mt-4">
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "Roboto", color: "#021738" }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                  <button
                    onClick={() => toggleExpand(feature.id)}
                    className="text-sm font-medium hover:underline focus:outline-none"
                    style={{ color: "#389ED7" }}
                  >
                    {expandedRows.includes(feature.id) ? "Hide details ↑" : "Learn more →"}
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {expandedRows.includes(feature.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-sm text-gray-700 bg-gray-50 rounded-lg p-3 mt-2"
                    >
                      <p><strong>Why it matters:</strong> {feature.details}</p>
                      {feature.backed && (
                        <p className="mt-2"><strong>Backed by:</strong> {feature.backed}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {features.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === i ? "bg-[#389ED7]" : "bg-[#B3DDF3]"
            }`}
          />
        ))}
      </div>

      {/* Curvy background */}
      <div className="mt-20 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        <img src="/images/curvy.png" alt="curvy" className="w-full h-auto object-cover" />
      </div>
    </section>
  );
};



const steps = [
  {
    number: "01",
    title: "Set Up the FROST Device",
    description:
      "Attach FROST to any bottle or cup—no special container needed. Ready in seconds, wherever you are.",
  },
  {
    number: "02",
    title: "Connect with the FROST App",
    description:
      "Pair seamlessly via Bluetooth to customize hydration reminders, schedules, and wellness settings.",
  },
  {
    number: "03",
    title: "Track Your Progress",
    description:
      "Receive smart alerts and monitor your hydration, activity, and wellness journey—all in one place.",
  },
];

const HowItWorksSection = () => {
  return (
    <>
      <section
        id="how-it-works"
        className="-mt-24 w-full bg-white px-0 py-20 flex flex-col md:flex-row items-center justify-between"
      >
        {/* Left Content */}
        <div className="w-full md:w-1/2 relative left-4 md:left-20 px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ fontFamily: "Roboto" }}>
            <span className="text-[#021637]">How it </span>
            <br />
            <span className="text-[#389ED7]">WORKS?</span>
          </h2>

          {/* Steps with individual dotted lines */}
          <div className="relative space-y-20 left-0 sm:left-1">
            {steps.map((step, index) => (
              <div key={index} className="relative pl-12 sm:pl-16 pr-4">
                {/* Big background number */}
                <span className="absolute -left-2 md:left-2 -top-8 text-[72px] font-bold text-[#E6EAF0] leading-none z-0 select-none">
                  {step.number}
                </span>

                {/* Vertical dotted line below number except for last step */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-10 md:top-10 h-24 border-l-2 border-dotted border-[#B0C4D8] z-0" />
                )}

                {/* Text Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-[#021637]" style={{ fontFamily: "Roboto" }}>
                    {step.title}
                  </h3>
                  <p
                    className="text-sm text-[#021637] mt-2 leading-relaxed max-w-full sm:max-w-sm font-light"
                    style={{ fontFamily: "Roboto", font:"Light" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Dotted line from 03 to button */}
            <div className="absolute left-8 top-[330px] md:top-[285px] h-24 border-l-2 border-dotted border-[#B0C4D8] z-0" />
          </div>

          {/* Order Button */}
          <div className="mt-14 pl-0">
            <Button
              size="lg"
              className="rounded-full px-8 py-3 text-white bg-[#389ED7] hover:bg-[#2CA4E0]/90 text-base font-medium shadow-md"
            >
              <a href="/order">Book Now</a>
            </Button>
          </div>
        </div>

        {/* Right Image with Blue Background Image and Bottle */}
        <div className="w-full md:w-1/2 mt-60 md:mt-16 lg:mt-0 flex justify-center md:justify-end relative">
          {/* Blue background image */}
          <img
            src="/images/BlueBackgroundImage.png"
            alt="Background Shape"
            className="absolute -top-[160px] md:-top-10  right-[1px] md:-right-20 w-[200px] md:w-[500px] 
              h-[300px] md:h-[650px] z-0"
          />
          {/* Bottle Image */}
          <img
            src="/images/works1.png"
            alt="How it Works"
            className="relative left-[185px] md:left-[120px] -top-[160px] md:top-[30px] z-10 md:w-[350px] md:h-[550px] 
              w-[200px]  h-[300px]"
          />
          <img
            src="/images/square1.png"
            alt="square1"
            className="relative right-[10px] -top-[240px]
               md:right-[180px] md:-top-[60px] w-[30px] h-[30px]"
          />
          <img
            src="/images/square2.png"
            alt="square2"
            className="relative -right-[40px] -top-[210px]
               md:right-[100px] md:-top-[40px] z-10 w-10 h-10 "
          />
          <img
            src="/images/square3.png"
            alt="square3"
            className="relative right-[100px] -top-[150px] 
              md:right-[260px] md:top-[45px] z-10 w-[30px] h-[30px] "
          />
        </div>
      </section>

      {/* Curvy Bottom Image (Full Width) */}
      <div className="-mt-[230px] md:-mt-[78px] relative -ml-[1vw] -mr-[5vw] overflow-hidden w-screen">
        <img
          src="/images/curvy1.png"
          alt="curvy"
          className="w-full h-auto md:h-[200px] object-cover"
        />
      </div>
    </>
  );
};



const allImages = [
  "/images/gallery1-1.jpg", "/images/gallery1-2.jpg", "/images/gallery1-3.jpg",
  "/images/gallery1-4.jpg", "/images/gallery1-5.jpg", "/images/gallery1-6.jpg",
  "/images/gallery1-7.jpg", "/images/gallery3-2.jpg", "/images/gallery2-3.jpg",
  "/images/gallery3-1.jpg", "/images/gallery2-2.jpg", "/images/gallery3-3.jpg",
  "/images/gallery3-4.jpg", "/images/gallery3-5.jpg",
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

const GallerySection = () => {
  const [center, setCenter] = useState(Math.floor(allImages.length / 2));
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);

  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCenter((idx) => (idx - 1 + allImages.length) % allImages.length);
    setTimeout(() => setIsAnimating(false), 450);
  };

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCenter((idx) => (idx + 1) % allImages.length);
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
  }, [center]);

  const visibleImages = getVisibleImages(allImages, center, VISIBLE);

  // ---- Responsive image style helpers ----
  // 1. On mobile, use object-fit: contain and 100% width/height for the image
  // 2. On desktop (sm and above), use original object-cover logic

  return (
    <section className="w-full py-14 px-4 relative bg-white overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        <span className="text-[#021637]">PRODUCT</span>{" "}
        <span className="text-[#389ED7]">GALLERY</span>
      </h2>
      <p className="text-sm md:text-base max-w-2xl mx-auto mt-2 text-center px-2">
        Witness how FROST blends into your life from sunrise to sleep. More than a device,
        it’s your hydration companion. Every sip tells a story of care, energy, and better living.
      </p>

      <div className="relative max-w-7xl mx-auto mt-14">
        <button
          onClick={prevImage}
          className="absolute z-20 left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-[#008cd0] flex items-center justify-center shadow transition"
          style={{ pointerEvents: isAnimating ? "none" : "auto", opacity: isAnimating ? 0.3 : 1 }}
        >
          <svg viewBox="0 0 13 20" width="22" height="22">
            <polyline points="10,3 3,10 10,17" stroke="#008CD0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </button>

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
                src={allImages[idx]}
                alt={`Gallery ${idx + 1}`}
                className="
                  w-full h-full
                  object-contain
                  sm:object-cover
                  pointer-events-none select-none
                  sm:rounded-xl
                "
                style={{
                  // On mobile: contain, full width/height, prevent cropping/letterboxing
                  // On desktop: object-cover (via Tailwind sm:object-cover)
                  objectFit: "contain",
                  // Add background color as fallback for images with transparency/letterboxing
                  background: "#FFF",
                  // Remove background on desktop (object-cover)
                }}
                loading="lazy"
                draggable={false}
              />
              <style jsx>{`
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

        <button
          onClick={nextImage}
          className="absolute z-20 right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-[#008cd0] flex items-center justify-center shadow transition"
          style={{ pointerEvents: isAnimating ? "none" : "auto", opacity: isAnimating ? 0.3 : 1 }}
        >
          <svg viewBox="0 0 13 20" width="22" height="22">
            <polyline points="10,3 3,10 10,17" stroke="#008CD0" strokeWidth="2.5" fill="none" strokeLinecap="round" transform="rotate(180 6.5,10)" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {allImages.map((_, idx) => (
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

      <div className="mt-0 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        <motion.img
          src="/images/curvy.png"
          alt="curvy"
          className="w-screen h-auto object-cover"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
      </div>
    </section>
  );
};



const TechnicalSpecification = () => {
  return (
    <div className="w-full px-4 py-10">
      {/* Heading */}
      <motion.h2
        className="-mt-5 text-3xl md:text-4xl font-semibold text-center mb-4 text-foreground"
        style={{ fontFamily: "Roboto", font: "semibold" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <span className="text-[#021637]">TECHNICAL</span>
        <span className="text-[#389ED7]"> SPECIFICATIONS</span>
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-center max-w-2xl mx-auto mb-10 text-sm md:text-base"
        style={{ fontFamily: "Roboto", font: "regular" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Designed with precision, FROST features durable materials, smart sensors, and seamless Bluetooth connectivity.
        Universal bottle compatibility, and compact elegance tech meets lifestyle.
        Crafted for real life, wherever it takes you.
      </motion.p>

      {/* Responsive Centered Image */}
      <motion.div
        className="w-full flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <img
          src="/images/TechnicalSpecification1.png"
          alt="Technical Specification"
          className="w-full max-w-4xl -mt-20 ml-20 h-auto object-cover"
        />
      </motion.div>

      {/* Curvy Bottom Image */}
      <motion.div
        className="mt-0 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <img
          src="/images/curvy.png"
          alt="curvy"
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </div>
  );
};


const ComparisonFrost = () => {
  const features = [
    'Hydration Reminders',
    'App Integration',
    'Water Intake Tracking',
    'Device Visuals',
    'Audio Reminders',
    'Universal Bottle Dock',
    'Healing Sound Waves',
    'Productivity Features',
    'Affirmations & Display',
    'AI-Powered Insights'
  ];

  const smartBottle = [true, true, true, true, true, false, false, false, false, false];
  const frostAura = Array(features.length).fill(true);
  const hydrationApps = [true, true, true, false, false, false, false, false, false, false];

  const renderIcon = (available, isFrostAura = false) => {
    if (isFrostAura) {
      return (
        <div className="ml-auto h-6 w-6 rounded bg-white">
          <img
            src="/images/img_vector_12x16.svg"
            alt="Check"
            className="h-3.5 w-3.5 translate-x-[4px] translate-y-[7px]"
          />
        </div>
      );
    }
    return available ? (
      <div className="ml-auto h-6 w-6 rounded bg-[#64c40a]">
        <img
          src="/images/img_vector_1.svg"
          alt="Check"
          className="h-3.5 w-3.5 translate-x-[4px] translate-y-[7px]"
        />
      </div>
    ) : (
      <img
        src="/images/img_vector_28x28.svg"
        alt="Cross"
        className="ml-auto h-6 w-6"
      />
    );
  };

  return (
    <section className="container py-12 px-4">
      <div className="container mx-auto -mt-8">
        {/* Heading */}
        <motion.h2
          className="text-center text-2xl font-semibold md:text-3xl"
          style={{ fontFamily: "Roboto", font: "semibold" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#021637]">COMPARISION</span>
          <span className="text-[#389ED7]"> why FROST AURA?</span>
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          className="mx-auto mb-10 mt-4 max-w-3xl text-center text-sm md:text-base"
          style={{ color: "#000000", fontFamily: "Roboto", font: "regular" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Unlike smart bottles or hydration apps alone, FROST merges physical tracking, intelligent reminders, and water energizing in one device.
          It’s not just about drinking water, it’s about enhancing how you live, move, and thrive.
          FROST is where wellness meets intelligence.
        </motion.p>

        {/* Comparison Image */}
        <motion.div
          className="mb-10 md:mb-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:gap-10 lg:gap-16 grid-cols-1 md:grid-cols-3">
          {/* Smart Water Bottle */}
          <motion.div
            className="rounded-xl bg-white p-6 shadow-md max-w-sm w-full mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-center text-lg md:text-xl font-bold text-[#021637]">
              SMART<br />WATER BOTTLE
            </h3>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-3 text-sm md:text-base text-[#021637]">{feature}</span>
                  {renderIcon(smartBottle[index])}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Frost Aura */}
          <motion.div
            className="relative md:-top-20 rounded-xl bg-[#389ed7] p-6 shadow-md max-w-sm w-full mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-center text-xl font-bold text-white">FROST AURA</h3>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-3 text-sm md:text-base font-medium text-white">{feature}</span>
                  {renderIcon(true, true)}
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <button className="rounded-2xl bg-white px-6 py-2 text-base font-semibold text-[#021637]">
                <a href="/order">Book Now</a>
              </button>
            </div>
          </motion.div>

          {/* Hydration Apps */}
          <motion.div
            className="rounded-xl bg-white p-6 shadow-md max-w-sm w-full mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-center text-lg md:text-xl font-bold text-[#021637]">
              BASIC<br />HYDRATION APPS
            </h3>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-3 text-sm md:text-base text-[#021637]">{feature}</span>
                  {renderIcon(hydrationApps[index])}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Curvy Bottom Image */}
      <motion.div
        className="mt-30 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <img
          src="/images/curvy.png"
          alt="curvy"
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </section>
  );
};



const MeetOurTeamSection = () => {
  const [showMore, setShowMore] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'Raju',
      designation: 'Founder & Chief Vision Architect',
      image: '/images/raju.jpg',
      description:
        "With 17+ years of experience in avionics and system validation, Raju brings clarity, depth, and purpose to the product vision.He’s the soul of FROST grounding big ideas in real user needs and simple rituals.Raju leads with belief, momentum, and a mission to make well-being effortless.His leadership is what turns daily habits into meaningful movements.",
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/raju-chaluva',
      },
    },
    {
      id: 2,
      name: 'Yeshwanth',
      designation: 'Product Owner, Hardware & Experience',
      image: '/images/yeshwanth.png',
      description:
        "Yeshwanth owns the heart of the device how it looks, feels, and works in the real world.He leads design and mechanical development from prototyping to production.Every curve, button, and interaction flows through his hands with care.He brings harmony between product engineering and emotional experience.",
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/yeshwanth-shivraj',
      },
    },
    {
      id: 3,
      name: 'Indresh',
      designation: 'Supply Chain Navigator',
      image: '/images/indresh.png',
      description:
        "If FROST feels seamless, it’s because Indresh keeps every gear aligned behind the scenes.He bridges the global supply chain with grounded local execution.From vendor negotiations to part sourcing and timelines, he ensures delivery never breaks the rhythm.His precision ensures we stay lean, cost-effective, and ready to scale.",
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/indresh3114250',
      },
    },
    {
      id: 4,
      name: 'Dilip Narayana',
      designation: 'Head of Launch & Growth',
      image: '/images/dilip.png',
      description:
        "Dilip transforms vision into traction. From strategy to street-level execution, he’s the power behind our go-to-market engine.He builds early believer momentum and leads the charge on crowdfunding initiatives.With sharp thinking and structured energy, he ensures nothing is just “launched” it’s lifted.Dilip helps turn belief into backing, and plans into people-driven success.",
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/dilipnarayana',
      },
    },
    {
      id: 7,
      name: 'Ayesha',
      designation: 'Operations & Experience Flow Lead',
      image: '/images/ayesha.png',
      description:
        "Ayesha ensures that the backstage runs as beautifully as the stage.She orchestrates timelines, support flows, and team ops with thoughtfulness and discipline.Her calm efficiency ensures that nothing slips from internal sync to customer-facing systems.She brings emotional clarity and functional sharpness to the FROST experience.",
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/ayeshafirdous786',
      },
    },
    {
      id: 9,
      name: 'Ankita',
      designation: 'Brand Storyteller & Community Builder',
      image: '/images/ankita.png',
      description:
        "Ankitha shapes how the world sees FROST through stories, campaigns, and connection.She writes with emotion, markets with intention, and builds a brand people feel.Every social post, message, and interaction carries the heartbeat she infuses.She turns product into narrative — and community into believers.",
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/ankitasharma2703',
      },
    },
    {
      id: 10,
      name: 'Pragya',
      designation: 'Creative Experience Designer',
      image: '/images/pragya.png',
      description:
        "Pragya gives FROST its visual soul from brand mood to moving pixels.She brings stories to life through design, illustration, and UI flow.Whether it’s a screen, a card, or a poster, she adds spark, softness, and soul.Her work transforms product into presence and clarity into emotion.",
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/pragyasingh1001',
      },
    },
    {
      id: 11,
      name: 'DJ Angel Johal',
      designation: 'Sound Healer Specialist',
      image: '/images/angel.png',
      description:
        "Angel A Johal also known as DJ Angel is the visionary founder of Sound of Vedas, a transformative platform where ancient sound wisdom meets modern healing. With over 18 years in the global music industry, DJ Angel has performed across continents, channeling high-energy rhythms that uplift the soul and awaken consciousness.",
      socialLinks: {
        linkedin: 'https://www.instagram.com/djangeljohal',
      },
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const leftMembers = teamMembers.filter((_, idx) => idx % 2 === 0);
  const rightMembers = teamMembers.filter((_, idx) => idx % 2 === 1);

  const renderExtendedContent = (member) => {
    if (member.id !== 11) return null;

    const viewMoreRef = useRef(null);

    const handleClose = () => {
      setShowMore(false);
      if (viewMoreRef.current) {
        viewMoreRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <div>
        {!showMore ? (
          <div ref={viewMoreRef}>
            <button
              className="mt-2 text-sm text-[#389ED7] underline"
              onClick={() => setShowMore(true)}
              style={{ fontFamily: 'Roboto', font: 'medium' }}
            >
              {/*Read More About DJ Angel Johal*/}
            </button>
          </div>
        ) : (
          <div className="mt-3 text-sm text-gray-700" style={{ fontFamily: 'Roboto', font: 'light' }}>
            <p>
              Her journey didn’t stop with the decks. Driven by a deeper calling, Angel immersed herself in the ancient science of Nāda Yoga (the yoga of sound), Vedic mantras, frequencies, and vibrational healing modalities. She has since become a passionate practitioner and guide in the world of sound therapy, integrating her musical intuition with sacred sound traditions to create profound shifts in the mind, body, and spirit.
            </p>
            <br />
            <p>
              As a student of both Eastern mysticism and modern sound technology, Angel bridges worlds — offering sound journeys, frequency activations, and guided practices rooted in Vedic lineage. Her work includes research into healing chronic diseases through sound, teaching everyday sound rituals, and uncovering the esoteric origins of cosmic resonance.
            </p>
            <br />
            <p>
              Whether on stage or in silent meditation, she weaves together the seen and unseen, making her a rare artist-healer who is both performer and priestess. Through Sound of Vedas, she now brings this sacred fusion to the world — one frequency at a time.
            </p>
            <button
              className="mt-4 text-sm text-[#389ED7] underline"
              onClick={handleClose}
              style={{ fontFamily: 'Roboto', font: 'medium' }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderTeamMember = (member, index) => (
    <motion.div
      key={member.id}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="flex flex-col gap-4 p-6 rounded-lg mx-auto w-full max-w-md"
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white self-center"
      />
      <div className="flex flex-col items-start text-left flex-1">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#021637]" style={{ fontFamily: 'Roboto', font: 'medium' }}>
          {member.name}
        </h3>
        <p className="text-md text-[#021637] mb-2" style={{ fontFamily: 'Roboto', font: 'regular' }}>
          {member.designation}
        </p>
        {member.socialLinks.linkedin && (
          <div className="flex mt-1 mb-2">
            <a
              href={member.socialLinks.linkedin}
              className="flex h-8 w-8 items-center justify-center rounded-full"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: '#389ED7' }}
            >
              {member.id === 11 ? (
                <Instagram size={20} color="white" />
              ) : (
                <img
                  src="https://www.iconpacks.net/icons/1/free-linkedin-icon-130-thumb.png"
                  alt="LinkedIn"
                  className="h-5 w-5"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              )}
            </a>
            {member.id === 11 && !showMore && (
             
            <Link to="/djangel">
              <button
                className="ml-3 px-3 py-1 rounded-full text-white text-sm"
                style={{ backgroundColor: '#389ED7', fontFamily: 'Roboto', fontWeight: '500' }}
              >
                Read More
              </button>
            </Link>
          
          )}
          </div>
        )}
        <p className="text-sm text-gray-700" style={{ fontFamily: 'Roboto', font: 'light' }}>
          {member.description}
        </p>
        {renderExtendedContent(member)}
      </div>
    </motion.div>
  );

  return (
    <section id="team" className="-mt-10 container py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'Roboto', font: 'semibold' }}>
            <span className="text-[#389ED7]">Meet Our</span>
            <br />
            <span className="text-[#021637]">Team</span>
          </h2>
          <br />
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm md:text-base" style={{ fontFamily: 'Roboto', font: 'regular' }}>
            We are creators, dreamers, and doers united by a passion for wellness through innovation. From design to tech, our team thrives on collaboration and building something meaningful together. FROST is a reflection of our shared vision and belief in a healthier tomorrow.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 justify-center items-stretch">
          <div className="flex flex-col gap-12 flex-1">
            {leftMembers.map((member, index) => renderTeamMember(member, index))}
          </div>
          <div className="flex flex-col gap-12 flex-1">
            {rightMembers.map((member, index) => renderTeamMember(member, index))}
          </div>
        </div>

        <div className="md:-mt-[50px] w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <img src="/images/curvy1.png" alt="curvy" className="w-full h-auto object-cover" />
        </div>
      </div>
    </section>
  );
};



const initialTestimonials = [
  {
    id: 1,
    name: 'Khushi',
    designation: 'Junior Project Manager',
    image: '/images/khushi.jpg',
    testimonial:
      "I didn’t realize how often I was forgetting to drink water until I started using Frost Aura. The gentle glow on my desk is such a calming reminder it doesn’t interrupt my work, but it nudges me just when I need it. Within the first week, I was drinking more, feeling less tired in the afternoons, and even started using the breathing reminders during stressful meetings. It’s honestly the smartest upgrade I’ve made to my workspace.",
    email: 'kushikushala2020@gmail.com',
  },
  {
    id: 2,
    name: 'Likith',
    designation: 'Quality control,Berlin',
    image: '/images/likith.jpg',
    testimonial:
      "After I moved abroad, between work and busy days full of calls, I would often miss my vitamin D or iron supplements which are really important for me. With Frost Aura on my desk, I get this gentle nudge that says, ‘Hey, take a breath. Take care of you.’ It’s small, but it’s made a big  difference in how I feel.",
    linkedin: 'https://www.linkedin.com/in/likithgowda-k-r-102296214?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    email: 'mailto:someone@example.com',
  },
  {
    id: 3,
    name: 'Channegowda',
    designation: 'Cloud Devops Engineer, Bangalore',
    image: '/images/channegowda.jpg',
    testimonial:
      "I’ve been working remotely for the past six months, and I slowly realized I wasn’t hydrating enough or moving at all during the day. Even though I have a smartwatch, I really wanted something physical something made just for wellness, not just time or steps. Frost Aura changed that completely. The glow reminds me to sip water, stretch, and breathe. It’s like a quiet little coach on my desk.",
    linkedin: 'https://www.linkedin.com/in/channe-gowda-j-l-195736138?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    email: 'mailto:someone@example.com',
  },
];

const moreTestimonials = [
  {
    id: 4,
    name: 'Priya',
    designation: 'Marketing Specialist',
    image: '/images/priya.jpg',
    testimonial:
      "Frost Aura has been a game-changer for my focus. As a marketer, I'm constantly juggling multiple campaigns. The subtle light and breathing exercises help me recenter and stay productive throughout the day. Plus, it looks really sleek on my desk!",
    linkedin: 'https://www.linkedin.com/',
    email: 'mailto:someone@example.com',
  },
  {
    id: 5,
    name: 'Arjun',
    designation: 'Software Developer',
    image: '/images/arjun.jpg',
    testimonial:
      "Long hours coding often meant I'd forget to take breaks. Frost Aura's gentle reminders to hydrate and stretch have made a noticeable difference in my energy levels and reduced stiffness. It's a simple yet effective way to prioritize well-being during intense work periods.",
    linkedin: 'https://www.linkedin.com/',
    email: 'mailto:someone@example.com',
  },
  {
    id: 6,
    name: 'Sneha',
    designation: 'UX Designer',
    image: '/images/sneha.jpg',
    testimonial:
      "I love how Frost Aura integrates wellness into my workspace without being intrusive. The breathing prompts are especially helpful when I'm facing design challenges. It's a thoughtful and beautifully designed product that supports a healthier work routine.",
    linkedin: 'https://www.linkedin.com/',
    email: 'mailto:someone@example.com',
  },
];

const iconWrapperStyle = {
  width: 32,
  height: 32,
  borderRadius: 8,
  backgroundColor: '#389ED7',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const iconStyle = {
  color: '#ffffff',
};

const TestimonialsSection = () => {
  const [visibleTestimonials, setVisibleTestimonials] = useState(initialTestimonials);
  const [showMore, setShowMore] = useState(true);
  const seeMoreRef = useRef(null);
  const [scrollToSeeMore, setScrollToSeeMore] = useState(false);

  const handleSeeMore = () => {
    setVisibleTestimonials((prev) => [...prev, ...moreTestimonials]);
    setShowMore(false);
  };

  const handleHide = () => {
    setVisibleTestimonials(initialTestimonials);
    setShowMore(true);
    setScrollToSeeMore(true);
  };

  useLayoutEffect(() => {
    if (scrollToSeeMore && seeMoreRef.current) {
      seeMoreRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setScrollToSeeMore(false);
    }
  }, [scrollToSeeMore]);

  return (
    <>
      <motion.section
        id="testimonials"
        className="container relative overflow-x-hidden"
        style={{ minHeight: '100vh', paddingBottom: '0px' }} // Remove extra bottom padding
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          hidden: { opacity: 0 },
        }}
      >
        <div className="-mt-10 container mx-4 md:mx-20 px-0 pt-10 max-w-3xl">
          <motion.h2
            className="mb-2 font-bold text-3xl"
            style={{ fontFamily: 'Roboto' }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 },
            }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#389ED7] block">What Our</span>
            <span className="text-[#021637]">Customers Says!!</span>
          </motion.h2>
          <motion.p
            className="mb-6 text-base text-[#389ED7] max-w-xl break-words"
            style={{ fontFamily: 'Roboto' }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 },
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our users feel the difference hydrated, focused, and energized like never before.
            Every review is a story of transformation, one sip at a time.
            With FROST, you don’t just drink water, you experience wellness.
          </motion.p>
        </div>
        <div className="mt-10 relative flex flex-col gap-16 max-w-3xl mx-auto z-10">
          <AnimatePresence>
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="relative flex items-start md:flex-row flex-col px-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative w-full md:w-auto">
                  <div className="relative z-10 flex-shrink-0 mb-4 md:mb-0">
                    <div
                      className="rounded-full border-4 shadow-lg flex items-center justify-center overflow-hidden"
                      style={{
                        width: 160,
                        height: 160,
                        borderColor: '#d7e9f5',
                        background: 'linear-gradient(180deg, #eaf7ff 0%, #d7e9f5 100%)',
                        marginRight: 16,
                      }}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        style={{
                          width: 150,
                          height: 150,
                          objectFit: 'cover',
                          borderRadius: '50%',
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="bg-white border border-[#d7e9f5] shadow rounded-md p-5 pl-6 flex-1 md:ml-[-30px] relative"
                    style={{
                      minHeight: 120,
                      marginLeft: -16,
                      zIndex: 1,
                      marginTop: 20,
                      boxShadow: '0 3px 24px 0 rgba(56,158,215,0.11)',
                    }}
                  >
                    <div className="absolute -top-8 left-1 z-20 flex gap-2">
                      {testimonial.linkedin && (
                        <a
                          href={testimonial.linkedin}
                          aria-label="LinkedIn"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={iconWrapperStyle}
                        >
                          <svg
                            fill="currentColor"
                            viewBox="0 0 448 512"
                            width="18"
                            height="18"
                            style={iconStyle}
                          >
                            <path d="M100.28 448H7.4V148.9h92.88zm-46.44-341a53.67 53.67 0 1 1 53.61-53.66 53.64 53.64 0 0 1-53.61 53.66zM447.8 448h-92.4V302.4c0-34.7-12.4-58.4-43.3-58.4-23.6 0-37.6 15.8-43.8 31-2.3 5.6-2.8 13.4-2.8 21.2V448h-92.4s1.2-241.1 0-266.1h92.4v37.7c-.2.3-.5.7-.7 1h.7v-1c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.7 39.8 106.7 125.4V448z" />
                          </svg>
                        </a>
                      )}
                      {testimonial.id === 1 && (
                        <a
                          href={`mailto:${testimonial.email}`}
                          aria-label="Email"
                          style={iconWrapperStyle}
                        >
                          <Mail size={20} color="#ffffff" />
                        </a>
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-lg text-[#222]">{testimonial.name}</span>
                      <div className="text-[#222] text-sm">{testimonial.designation}</div>
                      <p className="text-[#222] text-sm mt-2 font-light leading-snug break-words">
                        {testimonial.testimonial}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div ref={seeMoreRef} className="w-full flex justify-center mt-8"> {/* was mt-12 */}
          {showMore ? (
            <motion.button
              onClick={handleSeeMore}
              className="text-[#389ed7] -mt-4 text-base font-medium cursor-pointer"
              style={{ textDecoration: 'none', fontWeight: 400, fontSize: 18, marginTop: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/*see more....*/}
            </motion.button>
          ) : (
            <motion.button
              onClick={handleHide}
              className="text-[#389ed7] text-base font-medium cursor-pointer"
              style={{ textDecoration: 'none', fontWeight: 400, fontSize: 18, marginTop: 24 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Hide ↑
            </motion.button>
          )}
        </div>
      </motion.section>

      {/* Curvy image: much smaller negative margin on all screens, only increases for large desktop */}
      <div className="w-full relative -mt-4 sm:-mt-6 md:-mt-12 lg:-mt-20" style={{ left: 0, right: 0 }}>
        <img
          src="/images/curvy.png"
          alt="curvy"
          className="w-full h-auto object-cover"
          style={{ display: 'block', maxWidth: '100vw' }}
        />
      </div>
    </>
  );
};


const BlogSection = () => {
  const [bookmarked, setBookmarked] = useState(() => {
    const saved = localStorage.getItem("bookmarkedBlogs");
    return saved ? JSON.parse(saved) : {};
  });

  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      title: "Why 80% of Professionals Are Working Unknowingly Dehydrated",
      excerpt: "3-Minute Read",
      fullText: "Extended content for Blog 1...",
      slug: "blog-1",
      image: "/images/blog1image.png ",
      url: "/blogs",
    },
    {
      id: 2,
      title: "Hidden Health Risks of Not Drinking Enough Water at Work",
      excerpt:  "3-Minute Read",
      fullText: "More content for Blog 2...",
      slug: "blog-2",
      image: "/images/blog2image.png",
      url: "/blogs2",
    },
    {
      id: 3,
      title: "Thirst Isn’t Always the  First Sign of Body Dehydration",
      excerpt: "3-Minute Read",
      fullText: "Deeper insights into Blog 3...",
      slug: "blog-3",
      image: "/images/blog3image.png",
      url: "/blogs3",
    },
    {
      id: 4,
      title: "Can Sound Frequencies Energize Your Water?",
      excerpt:"3-Minute Read",
      fullText: "Details about Blog 4...",
      slug: "blog-4",
      image: "/images/blog4image.png",
      url: "/blogs4",
    },
    //{
      //id: 5,
      //title: "A Blog On DJ Angel Johal",
      //excerpt:"3-Minute Read",
      //fullText: "Details about Blog 4...",
      //slug: "blog-5",
      //image: "/images/djangel.jpg",
     // url: "/djangel",
   //},
  ];

  const toggleBookmark = (id) => {
    const updated = {
      ...bookmarked,
      [id]: !bookmarked[id],
    };
    setBookmarked(updated);
    localStorage.setItem("bookmarkedBlogs", JSON.stringify(updated));
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.section
      id="blog"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="container -mt-0 mx-auto pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl"
    >
      <motion.div className="text-center mb-12" variants={fadeUp}>
        <h2
          className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight"
          style={{ fontFamily: "Roboto", fontWeight: 600 }}
        >
          <span className="text-[#021637]">Blogs/</span>
          <span className="text-[#389ED7]"> Resources</span>
        </h2>
        <p
          className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed "
          style={{ fontFamily: "Roboto" }}
        >
          Dive deeper into hydration, wellness, and the science behind FROST.
          Tips, guides, and inspiring reads curated to elevate your lifestyle.
        </p>
      </motion.div>

      <div className="overflow-x-auto overflow-y-hidden px-2 sm:px-4 pb-[10px] custom-scrollbar">
        <div className="flex gap-4 sm:gap-6 whitespace-nowrap">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              className="w-80 sm:w-96 flex-shrink-0"
              custom={i}
              variants={fadeUp}
            >
              <Card className="flex flex-col h-full overflow-hidden rounded-2xl border shadow-md hover:shadow-lg transition ">
                <div className="relative w-full h-60 sm:h-80 bg-secondary overflow-hidden">
                  <img
                    src={post.image}
                    alt={`Blog post ${post.id} image`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md z-10"
                  >
                    {bookmarked[post.id] ? (
                      <BookmarkCheck className="text-blue-500 w-5 h-5" />
                    ) : (
                      <Bookmark className="text-gray-500 w-5 h-5" />
                    )}
                  </button>
                </div>
                <CardHeader className="pt-4 px-5">
                  <CardTitle
                    className="text-lg sm:text-xl text-foreground leading-snug break-words whitespace-pre-line"
                    style={{
                      fontFamily: "Roboto",
                      whiteSpace: "normal", // Allow text to wrap to next line
                      overflow: "visible",
                      textOverflow: "unset",
                      minHeight: "auto",
                      lineHeight: "1.2em",
                    }}
                  >
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5 flex-grow flex flex-col">
                  <p
                    className="text-sm sm:text-base mb-4 leading-relaxed"
                    style={{ fontFamily: "Roboto" }}
                  >
                    {post.excerpt}
                  </p>
                  <div className="flex gap-2 mt-auto">
                    <a
                      href={post.url}
                      className="relative flex items-center justify-between border-2 border-[#389ED7] text-[#389ED7] font-medium px-6 py-2 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:bg-[#e6f4fb] transition-all duration-300 w-fit"
                      style={{ fontFamily: "Roboto" }}
                    >
                      <span>Read More</span>
                      <span
                        className="ml-3 w-6 h-6 rounded-full"
                        style={{
                          backgroundColor: "#B7E6FF",
                          boxShadow:
                            "inset -4px -4px 10px rgba(255, 255, 255, 0.6), inset 4px 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};


const TryItNowSection = () => {
  return (
    <section className="container" id="try">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-full min-h-0 bg-white mt-10 overflow-hidden font-sans"
      >
        {/* Decorative Zigzags */}
        <motion.img
          src="/images/zigzag1.png"
          alt="Zigzag"
          className="absolute top-[-126px] left-2 w-8 h-32 sm:w-16 sm:h-40 md:top-[-157px] md:left-[20px] md:w-[60px] md:h-[160px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        />
        <motion.img
          src="/images/zigzag2.png"
          alt="Zigzag line"
          className="absolute top-[-126px] right-1 w-20 h-32 sm:w-32 sm:h-40 md:top-[-158px] md:right-[2px] md:w-[140px] md:h-[160px] z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        />

        <Card className="relative mx-auto max-w-full md:max-w-7xl lg:max-w-[90rem] rounded-[20px] shadow-[inset_0px_4px_4px_#00000040,inset_0px_-4px_4px_#00000040] bg-gradient-to-b from-[#b1e3ff] to-white px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-16 my-0 md:my-12 z-10 overflow-visible">
          <CardContent className="p-0">
            {/* Title */}
            <motion.div
              className="text-center mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h1 className="font-semibold text-4xl md:text-5xl leading-tight">
                <span className="text-[#021637]">TRY it </span>
                <span className="text-[#389ed7]">NOW!!</span>
              </h1>
              <p className="font-semibold text-lg md:text-xl text-[#021637] mt-3">
                Hurry UP, Go Ahead
              </p>
            </motion.div>

            {/* Content Row */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-8">
              {/* Animated Left Image */}
              <motion.div
                className="relative w-full md:w-1/2 flex justify-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative max-w-[320px] sm:max-w-[360px] md:max-w-[500px] w-full aspect-[370/618] bg-[#eef8f733] rounded-[50%]">
                  <div className="absolute inset-[5%] bg-[#bbebff33] rounded-[50%]">
                    <div className="absolute inset-[8%] bg-[#7ad6fb33] rounded-[50%]"></div>
                    <div className="absolute top-[20%] left-[24%] w-[52%] h-[48%] bg-[#015b8f33] rounded-[50%]"></div>
                    <img
                      className="absolute w-[98%] h-[90%] top-0 left-[3%] object-contain"
                      alt="frost kit"
                      src="/images/kit.png"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Animated Text + Buttons */}
              <motion.div
                className="w-full md:w-1/2 px-2 md:px-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="font-semibold text-3xl md:text-4xl text-[#FFFFFF] mb-4">
                  <span className="text-[#021637]">Let&apos;s Get in Touch!!</span>
                </h2>
                <p className="text-base md:text-lg text-[#021637] max-w-lg">
                  We’d love to hear from you whether it’s a question, feedback,
                  or just a hello. Let’s build a healthier future together, one sip at a time.
                </p>

                {/* Buttons */}
                <div className="mt-10 flex flex-col gap-8 items-center relative">
                  {[{ label: "Book Now", link: "/order" }, { label: "Get in Touch", link: "#contact" }].map((btn) => (
                      <motion.div
                        key={btn.label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-full max-w-xs"
                      >
                        <a
                          href={btn.link}
                          className="group relative block w-full rounded-[40px] overflow-hidden no-underline"
                        >
                          <div className="absolute inset-0 bg-[#389ed733] rounded-[40px] border-[5px] border-[#b1e3ff] z-0" />
                          <div className="relative z-10 h-14 md:h-16 w-full bg-[#389ED7] text-white text-lg md:text-xl font-medium flex items-center justify-between px-6 rounded-[40px] shadow-[1px_4px_12.8px_#00000040]">
                            {btn.label === "Book Now" ? (
                              <>
                                <span>{btn.label}</span>
                                <div className="w-[37px] h-[37px] bg-white rounded-full shadow-[inset_0px_4px_4px_#00000040]" />
                              </>
                            ) : (
                              <>
                                <div className="w-[37px] h-[37px] bg-white rounded-full shadow-[inset_0px_4px_4px_#00000040]" />
                                <span>{btn.label}</span>
                              </>
                            )}
                          </div>
                        </a>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </div>
            {/* Floating Circles Animation - Now INSIDE Card and layered above bg */}
            <motion.div
              className="absolute -bottom-10 md:bottom-10 right-0 md:-right-20 w-[220px] h-[180px] sm:w-[260px] sm:h-[220px] md:w-[360px] md:h-[320px] z-20 pointer-events-none"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ pointerEvents: "none" }}
            >
              {/* Big Circles */}
              <div className="absolute bottom-0 right-0 scale-75 sm:scale-90 md:scale-100 w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[240px] md:h-[240px]">
                <div className="absolute inset-0 bg-[#b1e3ff88] rounded-full"></div>
                <div className="absolute inset-[10px] md:inset-[20px] bg-[#7ad6fb88] rounded-full"></div>
                <div className="absolute inset-[24px] md:inset-[60px] bg-[#389ed7] rounded-full"></div>
              </div>
              {/* Small Circles */}
              <div className="absolute top-32 left-24 sm:top-16 sm:left-24 md:top-60 md:left-30 w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[120px] md:h-[120px]">
                <div className="absolute inset-0 bg-[#b1e3ff88] rounded-full"></div>
                <div className="absolute inset-[5px] md:inset-[12px] bg-[#7ad6fb88] rounded-full"></div>
                <div className="absolute inset-[10px] md:inset-[30px] bg-[#389ed7] rounded-full"></div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};


const ContactSection = () => {
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxv_rlA8zUYbhhN8PuMVbcoh0mhXzlWAetJA9EH8qAGAd3Ya4myK8tt1h3yPFZ3d2TN/exec";

  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, query, message } = formData;

    // Front-end validation
    if (!name || !email || !phone || !query || !message) {
      toast({
        title: "All fields are required",
        description: "Please fill in every field before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll be in touch soon.",
        variant: "default",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        query: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const buttonTap = {
    whileTap: { scale: 0.95 },
  };

  return (
    <section
      id="contact"
      className="
        container
        py-6 sm:py-10 lg:py-20
        px-2 sm:px-4 lg:px-8
        mt-0
        "
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="mb-8 md:mb-10 text-center text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#021637]"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <span className="text-[#021637]">Contact</span>
          <span className="text-[#389ED7]"> Us</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h3
              className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#021637]"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              Get in Touch <span className="text-[#389ed7]">with Us</span>
            </motion.h3>

            <motion.p
              className="mb-6 md:mb-8 text-base sm:text-lg lg:text-xl text-[#021637] max-w-2xl leading-relaxed"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              Have a query or collaboration idea? Drop us a message below!
              Fill out the form and our team will get back to you as soon as possible.
              We’re here to support your journey with FROST.
            </motion.p>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-6"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="rounded-lg bg-[#c7ebff] px-5 py-3 text-[#021637cc] placeholder-[#021637cc] focus:ring-[#389ed7] focus:border-[#389ed7]"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="rounded-lg bg-[#c7ebff] px-5 py-3 text-[#021637cc] placeholder-[#021637cc] focus:ring-[#389ed7] focus:border-[#389ed7]"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="rounded-lg bg-[#c7ebff] px-5 py-3 text-[#021637cc] placeholder-[#021637cc] focus:ring-[#389ed7] focus:border-[#389ed7]"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                <Input
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="Query"
                  required
                  className="rounded-lg bg-[#c7ebff] px-5 py-3 text-[#021637cc] placeholder-[#021637cc] focus:ring-[#389ed7] focus:border-[#389ed7]"
                />
              </motion.div>

              <motion.div className="sm:col-span-2" whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Feedback"
                  className="h-36 w-full rounded-lg bg-[#c7ebff] px-5 py-4 text-base text-[#021637cc] placeholder-[#021637cc] focus:ring-[#389ed7] focus:border-[#389ed7]"
                  required
                />
              </motion.div>

              <motion.div className="sm:col-span-2" {...buttonTap}>
                <Button
                  type="submit"
                  className="w-full rounded-lg bg-[#389ed7] py-3 text-center text-lg font-medium text-white hover:bg-[#2b7ec5] transition"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center"
          >
            <div className="mt-8 md:mt-15">
              <img
                src="/images/contactimg.png"
                width={350}
                alt="Contact Graphic"
                className=""
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const Home = () => (
  <>
    <style>
      {`
        .container {
          max-width: 100vw; /* Ensure the container does not exceed the viewport width */
          overflow-x: hidden; /* Prevent horizontal overflow */
        }
      `}
    </style>

    <Header />
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <GallerySection />
    <TechnicalSpecification />
    <ComparisonFrost />
    <MeetOurTeamSection />
    <TestimonialsSection />
     <BlogSection />
    <TryItNowSection />
    <ContactSection />
  </>
);
export default Home;