import React, { useState, useEffect, useRef, useLayoutEffect } from "react"; 
import { motion, AnimatePresence, useAnimation,  useMotionValue, animate } from "framer-motion";
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ChevronDown, Bookmark, BookmarkCheck, Menu, ChevronLeft, ChevronRight, Pill, Clock, Brain, Dumbbell, Footprints, CheckCircle, Droplet, Bell, Coffee, HeartPulse, Users, Thermometer, BarChart, Zap, Settings, Smartphone, ArrowRight, Linkedin, Instagram, Twitter, Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
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
import { Autoplay, Pagination } from "swiper/modules";




//NEW HOME PAGE BANNER DECEMBER LATEST
const HomeBanner2 = () => {
  const textColor = "#5B869D";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const images = [
  "/images/hb1.1.png",
  "/images/hb2.svg",
  "/images/hb3.svg",
 // "/images/hb4.svg",
  "/images/hb5.svg",
  // "/images/hb6.svg",
  // "/images/hb7.svg",
  // "/images/hb8.svg",
];

const [currentImage, setCurrentImage] = useState(0);
const MASTER_GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxqXNa5d1oYF9yiHJpsxtv6sdtV0KsdGUSg_2oSe--dHl4YIe7tPCYHZzeBsIojmqXt/exec";


useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, 2000); // 2 second Display Image CHANGING TIME 

  return () => clearInterval(interval);
}, []);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyXWe1qfAIiQWK9C1NRIKF3LbW_izrXivtcZoAIKa9g_-geUFAWIfq5dinc8ialkXM/exec";

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[A-Za-z.]{2,}$/;
    if (!regex.test(email)) return false;

    const validTLDs = new Set([
      "com","org","net","info","biz","xyz","dev","app","pro","me","name",
      "online","site","tech","store","ai","io","cloud","digital","media",
      "in","us","uk","ca","au","nz","de","fr","jp","sg","ae","sa","pk","lk",
      "bd","cn","es","it","nl",
      "co.in","org.in","net.in","ac.in","gov.in","nic.in",
      "co.uk","org.uk","ac.uk",
      "co.za","co.jp","com.au","com.sg","com.pk"
    ]);

    const parts = email.toLowerCase().split("@")[1].split(".");
    const tld1 = parts[parts.length - 1];
    const tld2 = parts.length >= 2 ? parts.slice(-2).join(".") : null;

    return validTLDs.has(tld1) || (tld2 && validTLDs.has(tld2));
  };

  const handleSubscribe = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}`,
      }).catch(() => {});

      fetch(MASTER_GOOGLE_SCRIPT_URL, {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `email=${encodeURIComponent(email)}&source=Pre Launch`,
});


      const CHEERIO_API_KEY =
        "dfd7bcf44867df2f37bccce492a2368dcb0d9cdcd5963dd47acd270de09208ba";

      await fetch(
        "https://newprod.api.cheerio.in/direct-apis/v1/manualTriggerWorkflow",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": CHEERIO_API_KEY,
          },
          body: JSON.stringify({
            email,
            workflowId: "691d8bd1024212623f2b31b8",
          }),
        }
      );

      // Store email in persistent browser storage
localStorage.setItem("frost_email", email);

setSuccess(true);
setEmail("");

setTimeout(() => navigate("/reserve"), 1500);  

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        width: "100%",
        background: "#F6FCFF",
        fontFamily: "Inter, sans-serif",
        padding: "60px 40px 0",
        boxSizing: "border-box",
      }}
     >
      {/* TOP CONTENT */}
      <div className="lg:-ml-14 lg:-mt-8">
      <div
        className="homeBannerTop"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1400px",
          margin: "auto",
          gap: "80px",
          flexWrap: "wrap",
        }}
       >
        {/* LEFT IMAGE */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div className="lg:-mt-8">
          <img
            src={images[currentImage]}
            alt="Aura Device"
            style={{
              width: "760px",
              maxWidth: "100%",
              display: "block",
              margin: "0 auto",
              transition: "opacity 0.2s ease-in-out",
            }}
          />
          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div
          className="lg:-mt-[110px] -mt-[120px]"
          style={{
            flex: 1,
            maxWidth: "460px",
            color: textColor,
            marginLeft: "auto",
            textAlign: "right",
          }}
        >
          <h1
            className="auraTitle"
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "90px",
              letterSpacing: "6px",
              margin: "0 0 -14px 0",
            }}
          >
            FROST AURA
          </h1>

          <div
            className="pill"
            style={{
              background: textColor,
              color: "#fff",
              display: "inline-block",
              padding: "10px 36px",
              borderRadius: "38px",
              fontSize: "20px",
              letterSpacing: "1px",
              marginBottom: "40px",
              marginRight: "60px",
            }}
          >
            FOCUS || CALM || FLOW
          </div>

          <h2
            className="prelaunchTitle"
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "40px",
              margin: "0 0 24px 0",
              letterSpacing: "4px",
              marginRight: "115px",
            }}
          >
            PRE-LAUNCH
          </h2>

          <p
            className="lg:-mt-6 -mt-4 text-justify"
            style={{
              fontSize: "17px",
              lineHeight: "1.4",
              marginBottom: "36px",
            }}
          >
            We remind you to drink healed water, breathe, stretch, and move.
            Rest your eyes and mind, feel relaxed, and stay productive with
            smart Pomodoro breaks.
          </p>

          {/* EMAIL + BUTTON */}
          <div className="lg:-mt-4" style={{ width: "100%" }}>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: `2px solid ${textColor}`,
                fontSize: "16px",
                marginBottom: "12px",
                boxSizing: "border-box",
                textAlign: "center",
              }}
            />

            <button
              onClick={handleSubscribe}
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                background: textColor,
                color: "#fff",
                border: "none",
                fontSize: "18px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>

            {error && (
              <p 
              className="lg:mr-28"
              style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
                {error}
              </p>
            )}

            {success && (
              <p style={{ marginTop: "10px", color: "#021637", fontWeight: 600 }}>
                ✅ Thanks for subscribing. Please check your inbox for updates.
              </p>
            )}
          </div>
        </div>
       </div>
      </div>
       {/* BOTTOM FEATURES BAR */}
      <div
        className="lg:-mt-24 mt-6 w-screen -ml-[calc((100vw-100%)/2)]"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          background: textColor,
          color: "#fff",
        }}
      >
        {[
          { value: "10+", label: "Features" },
          { value: "10+", label: "Customizable Reminders" },
          { value: "432Hz", label: "Water Healing" },
          { value: "360°", label: "Daily Wellness" },
        ].map((item, index) => (
          <div
            key={index}
            className="featureItem"
            style={{
              padding: "20px 20px",
              textAlign: "center",
              fontSize: "20px",
              borderRight:
                index !== 3 ? "2px solid rgba(255,255,255,0.25)" : "none",
            }}
          >
            <div style={{ fontSize: "28px", fontWeight: "600" }}>
              {item.value}
            </div>
            {item.label}
          </div>
        ))}
      </div>

      {/* MOBILE STYLES */}
      <style>{`
        @media (max-width: 768px) {
          .homeBannerTop {
            flex-direction: column !important;
            text-align: center;
          }

          .homeBannerTop > div {
            max-width: 100% !important;
            margin-left: 0 !important;
            text-align: center !important;
          }

          .auraTitle {
            font-size: 56px !important;
            letter-spacing: 3px !important;
            white-space: nowrap;
            text-align: center !important;
          }

          .prelaunchTitle {
            margin-right: 0 !important;
            text-align: center !important;
          }

          .pill {
            margin-right: 0 !important;
          }

          .featureItem {
            border-right: none !important;
            border-bottom: 2px solid rgba(255,255,255,0.25);
          }

          .featureItem:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
};




//new home banner NOVEMBER
const HomeBanner = () => {
  const banners = [
    {
      bgColor: "#99B9C5",
      circleColor: "#86ABBE",
      productSrc: "/images/device.png",
    },
    {
      bgColor: "#B2815C",
      circleColor: "#845B3C",
      productSrc: "/images/device2.png",
    },
    {
      bgColor: "#45423F",
      circleColor: "#1F1E1D",
      productSrc: "/images/device3.png",
    },
  ];

  const [current, setCurrent] = useState(0);

  const handleNext = () => setCurrent((prev) => (prev + 1) % banners.length);
  const handlePrev = () =>
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  const { bgColor, circleColor, productSrc } = banners[current];

  return (
    <section
      className="home-banner"
      style={{
        backgroundColor: bgColor,
        transition: "background 0.6s ease-in-out",
      }}
    >
      {/* LEFT CONTENT */}
      <div className="hb-left mt-16 md:ml-14">
        {/* ✅ BRAND TEXT (Anton only for FROST) */}
        <h1 className="hb-brand">
          <span className="frost-text">AURA</span>{" "}
          {/* <span className="aura-text">AURA</span> */}
        </h1>

        <div className="hb-pill">
          <span>FOCUS | CALM | FLOW</span>
        </div>

        <div className="hb-text">
          <h2>Your desk’s smart wellness dock</h2>
          <p>
            Frost Aura nudges you to hydrate, breathe & move.
            <br />
            Breaking long sitting with intelligent display & sound cues.
          </p>
        </div>
      </div>

      {/* PRODUCT IMAGE */}
      <div className="hb-product">
        <img src={productSrc} alt="Frost device" />
      </div>

      {/* CTA + NAV */}
      <div className="md:mt-0 -mt-8">
        <button className="hb-cta">
          <a href="/prelaunch">PRE LAUNCH</a>
        </button>

        <button
          className="hb-nav hb-nav-left"
          onClick={handlePrev}
          aria-label="prev"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          className="hb-nav hb-nav-right"
          onClick={handleNext}
          aria-label="next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ---------- STYLES ---------- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

        .home-banner {
          position: relative;
          overflow: hidden;
          min-height: 580px;
          padding: 56px 48px 120px 92px;
          box-sizing: border-box;
          font-family: Inter, "Helvetica Neue", Arial, sans-serif;
          color: white;
          display: flex;
          align-items: flex-start;
        }

        /* BACKGROUND CIRCLE */
        .home-banner::before {
          content: "";
          position: absolute;
          right: 30px;
          top: -240px;
          width: 1200px;
          height: 1050px;
          border-radius: 50%;
          background: ${circleColor};
          z-index: 1;
          transition: background 0.6s ease-in-out;
        }

        .hb-left {
          position: relative;
          z-index: 4;
          width: 48%;
          max-width: 620px;
        }

        .hb-brand {
          margin: 0;
          font-size: 120px;
          line-height: 0.78;
          font-weight: 900;
          letter-spacing: 20px;
          text-transform: uppercase;
          display: flex;
          align-items: baseline;
          gap: 12px;
        }

        .hb-brand .frost-text {
          font-family: 'Anton', sans-serif;
          font-weight: 400;
        }

        .hb-brand .aura-text {
          font-size: 75px;
          font-weight: 700;
          letter-spacing: 1px;
          opacity: 0.9;
          margin-left: -26px;
          transform: translateY(-16px);
        }

        .hb-pill {
          display: inline-block;
          margin-left: -20px;
          margin-top: -55px;
          margin-bottom: 28px;
          padding: 40px 23px;
          border-radius: 56px;
          background: rgba(255,255,255,0.08);
          box-shadow: inset 0 -2px rgba(0,0,0,0.03);
          position: relative;
          white-space: nowrap;
        }

        .hb-pill span {
          font-size: 21px;
          font-weight: 600;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.95);
          position: relative;
          top: 20px;
          right: 0px;
          display: inline-block;
          text-align: center;
        }

        .hb-text h2 {
          margin: 0 0 12px 0;
          font-size: 28px;
          font-weight: 700;
          line-height: 1.12;
          color: rgba(255,255,255,0.96);
        }

        .hb-text p {
          margin: 0;
          font-size: 16px;
          color: rgba(255,255,255,0.88);
          max-width: 520px;
          line-height: 1.6;
        }

        .hb-product {
          position: absolute;
          right: -50px;
          top: 18px;
          z-index: 6;
          pointer-events: none;
        }

        .hb-product img {
          display: block;
          width: 800px;
          max-width: 68vw;
          height: auto;
          transform: translateY(60px);
          filter: drop-shadow(0 36px 44px rgba(0,0,0,0.45));
          transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
        }

        .hb-cta {
          position: absolute;
          left: 9%;
          transform: translateX(20%);
          bottom: 80px;
          z-index: 7;
          background: rgba(255,255,255,0.18);
          color: white;
          padding: 14px 16px;
          border-radius: 10px;
          border: 2px solid rgba(255,255,255,0.12);
          font-weight: 700;
          letter-spacing: 1px;
          transition: background 0.2s ease;
        }

        .hb-cta:hover { background: rgba(255,255,255,0.28); }

        .hb-nav {
          position: absolute;
          bottom: 36px;
          width: 66px;
          height: 66px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 7;
          cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        .hb-nav:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.5);
        }

        .hb-nav-left { left: 28px; }
        .hb-nav-right { right: 28px; }

        /* ✅ MOBILE RESPONSIVE (unchanged) */
        @media (max-width: 960px) {
          .home-banner {
            flex-direction: column;
            padding: 40px 20px 140px 20px;
            align-items: center;
            text-align: center;
          }
          .hb-left { width: 100%; max-width: 760px; z-index: 6; }
          .hb-brand { font-size: 88px; letter-spacing: 6px; line-height: 0.9; }
          .hb-brand .aura-text { font-size: 52px; transform: translateY(6px); }
          .hb-pill { margin: 10px auto 24px; }
          .hb-text h2 { font-size: 22px; }
          .hb-text p { font-size: 15px; margin: 0 auto; max-width: 88%; }
          .hb-product { position: relative; right: 0; top: 18px; margin-top: 6px; width: 100%; display: flex; justify-content: center; }
          .hb-product img { width: 72%; max-width: 420px; transform: none; }
        }

        @media (max-width: 768px) {
          .hb-pill { margin-top: -35px; padding: 24px 20px; border-radius: 40px; }
          .hb-pill span {
            font-size: 12px;
            top: 10px;
            right: 0;
            letter-spacing: 2px;
          }
          .hb-cta { left: 50%; transform: translateX(-50%); bottom: 24px; }
        }

        @media (max-width: 420px) {
        .hb-brand .frost-text {font-size: 100px;  margin-left: 7px;}
          .hb-brand { margin-left: 80px; font-size: 56px; letter-spacing: 3px; }
          .hb-brand .aura-text { font-size: 28px; margin-left: -10px; transform: translateY(-10px); }
          .hb-pill span { font-size: 15px; }
          .hb-text h2 { font-size: 18px; }
          .hb-text p { font-size: 14px; }
          .hb-product img { width: 86%; max-width: 320px; }          
        }

        /* ✅ MAC-ONLY FIXES */
        @supports (-webkit-touch-callout: none) {
          .hb-brand { transform: translateY(-4px); }
          .home-banner::before { top: -210px; }
          .hb-product img { transform: translateY(48px); }
          .hb-pill span { top: 18px; }
        }
      `}</style>
    </section>
  );
};



// New FEATURES SECTION NOVEMBER
const Features = () => {
  const IMAGES = [
    "/images/feature6.png",
    "/images/feature2.png",
    "/images/feature4.png",
    "/images/feature3.png",
    "/images/feature5.png",
    "/images/feature1.png",
    "/images/feature7.png",
    "/images/feature8.jpg",
    "/images/feature9.png",
  ];

  const TITLES = [
    "Healing Frequencies at 432Hz",
    "Pomodoro Focus Cycles",
    "Micro-Stretch & Posture Alerts",
    "Breathing & Relaxation Prompts",
    "Workout Reminders",
    "Smart Hydration Cues",
    "Manifestation Mantras & Affirmations",
    "Frost App Sync",
    "Frost Spirit – AI Wellness Guide",
  ];

  const TITLE_COLOR = [
    "#6B676C",
    "#636870",
    "#4B4339",
    "#5C6242",
    "#DEDDD9",
    "#FFFFFF",
    "#63645E",
    "#000000",
    "#E6DFD7",
  ];

  const TITLE_BG = [
    "#F5F1EC",
    "#D2DCE1",
    "#E1E1E0",
    "#BBB968",
    "#6B676C",
    "#747E6E",
    "#F0F2EB",
    "#F7F7F7",
    "#5C554C",
  ];

  const HOVER_TEXT = [
    "Experience soothing soundscapes tuned to natural frequencies that harmonize body, mind, and subtle energy.",
    "Stay productive without fatigue. Frost structures your work and rest with mindful light and tone sequences.",
    "Subtle reminders to stretch, move, or correct posture—helping you beat the hidden dangers of long sitting.",
    "Short guided breathing breaks that lower stress, restore focus, and bring calm back to your desk.",
    "Frost Aura gently reminds you to move beyond your desk — whether it’s a short walk, a stretch session, or your scheduled workout. It syncs with your daily routine to encourage consistent physical activity and balanced energy flow.",
    "Frost Aura learns your rhythm and reminds you to sip water on time through gentle light, sound, and text signals.",
    "Play positive mantras and affirmations that energize your water and reinforce intention and focus.",
    "Personalize hydration, Pomodoro cycles, light themes, and sound modes—all from the Frost mobile app.",
    "A friendly digital guide that encourages healthy habits through responsive light, tone, and vibration cues.",
  ];

  const GAP = 24;
  const LEFT_PADDING = 48;
  const RIGHT_PADDING = 0;

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [cardsPerView, setCardsPerView] = useState(2.5);
  const [cardWidth, setCardWidth] = useState(0);
  const total = IMAGES.length;

  const x = useMotionValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const href =
      "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";
    if (!document.querySelector(`link[href='${href}']`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }, []);

  // Responsive cards per view
  useEffect(() => {
    const calc = () => {
      const w = containerRef.current
        ? containerRef.current.clientWidth
        : window.innerWidth;
      setContainerWidth(w);
      if (w >= 1200) setCardsPerView(3.3);
      else if (w >= 768) setCardsPerView(2.3);
      else setCardsPerView(1.2); // mobile
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Calculate card width
  useEffect(() => {
    const effectiveContainerWidth = Math.max(
      0,
      containerWidth - LEFT_PADDING - RIGHT_PADDING
    );
    setCardWidth(effectiveContainerWidth / Math.max(0.0001, cardsPerView));
  }, [containerWidth, cardsPerView]);

  const clampIndex = (i) => {
    const max = Math.max(0, total - Math.floor(cardsPerView));
    return Math.min(Math.max(0, i), max);
  };

  const computeBounds = () => {
    const visible = Math.max(0, containerWidth - LEFT_PADDING - RIGHT_PADDING);
    const trackWidth = total * (cardWidth + GAP);
    const minX = Math.min(0, visible - trackWidth);
    const maxX = 0;
    return { minX, maxX, visible, trackWidth };
  };

  // Sync index with motion
  useEffect(() => {
    const unsub = x.onChange((val) => {
      if (!cardWidth) return;
      const approxIndex = Math.round(-val / (cardWidth + GAP));
      setCurrentIndex(clampIndex(approxIndex));
    });
    return () => unsub();
  }, [cardWidth, GAP, total, cardsPerView]);

  // Desktop arrow controls
  const goToIndex = (i) => {
    if (!cardWidth) return;
    const { minX, maxX } = computeBounds();
    const step = cardWidth + GAP;
    const target = Math.max(minX, Math.min(maxX, -i * step));
    animate(x, target, {
      type: "spring",
      stiffness: 260,
      damping: 30,
      mass: 0.5,
    });
    setCurrentIndex(clampIndex(i));
  };
  const goRight = () => goToIndex(clampIndex(currentIndex + 1));
  const goLeft = () => goToIndex(clampIndex(currentIndex - 1));


  return (
    <section
      id="features"
      className="w-full px-6 md:px-12 lg:px-10 py-8 bg-[#FFFFFF]"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#021637] mb-2">
          Features{" "}
          <span className="font-bold text-[#5B869D]">
            that keep you hydrated and productive
          </span>
        </h2>
      </div>

      <div className="relative lg:ml-10 lg:mr-0 mr-14">
        {currentIndex > 0 && (
          <button
            onClick={goLeft}
            className="hidden md:flex absolute lg:-left-[75px] -left-8 top-1/2 -translate-y-1/2 z-20 
              items-center justify-center w-14 h-14 rounded-full bg-[#E1E1E5] shadow-md hover:shadow-lg transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <button
          onClick={goRight}
          disabled={currentIndex >= total - Math.floor(cardsPerView)}
          className="hidden md:flex absolute lg:-right-10 -right-5 top-1/2 -translate-y-1/2 z-20 
            items-center justify-center w-14 h-14 rounded-full bg-[#E1E1E5] shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-40"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Track */}
        <div
          ref={containerRef}
          className="
            w-screen -ml-[calc((100vw-100%)/2)]
            rounded-lg
            select-none
            overflow-x-auto md:overflow-hidden
            scrollbar-hide
          "
          style={{
            paddingTop: 0,
            paddingBottom: 8,
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div style={{ paddingLeft: LEFT_PADDING }}>
            <motion.div
              className="flex items-stretch"
              style={{
                x,
                width: total * (cardWidth + GAP),
                gap: GAP,
              }}
            >
              {IMAGES.map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 rounded-3xl overflow-hidden shadow-md bg-white"
                  style={{ width: cardWidth, minWidth: cardWidth }}
                >
                  <div
                    className="px-4 py-6 font-semibold text-lg md:text-xl text-center rounded-t-lg"
                    style={{ background: TITLE_BG[i], color: TITLE_COLOR[i] }}
                  >
                    {TITLES[i]}
                  </div>
                  <div className="relative h-80 md:h-72 lg:h-[366px] group">
                    <img
                      src={src}
                      alt={TITLES[i]}
                      className="object-fill w-full lg:h-full h-[350px]"
                      draggable={false}
                    />
                    <div
                      className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 
                        transition-opacity flex items-center justify-center p-6 text-white 
                        text-xl text-semibold leading-relaxed text-center"
                    >
                      <div>
                        {HOVER_TEXT[i].split("\n").map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};



// New DISPLAY REMINDER SECTION
const Reminder = () => {
  const cardsPerView = 5;
  const scrollRef = useRef(null);

  const reminders = [
    {
      title: "Drink Water",
      img: ["/images/rem1b.svg", "/images/rem1c.svg"],
      desc: "Get personalized nudges to drink water throughout your day, no more guesswork, just natural hydration.",
    },
    {
      title: "Clean Bottle",
      img: ["/images/rem2.svg", "/images/rem2b.svg"],
      desc: "FROST remembers what you forget. It tracks when you last cleaned your bottle and reminds you to wash it, keeping bacteria at bay.",
    },
    {
      title: "Place Bottle",
      img: ["/images/rem3.svg"],
      desc: "Left your bottle behind? FROST gently notifies you to place it back on the dock so your tracking never skips a beat.",
    },
    {
      title: "Water Healing",
      img: ["/images/rem4.svg"],
      desc: "FROST Aura turns hydration into a mindful ritual, infusing water with healing frequencies and mantras to harmonize energy and wellbeing.",
    },
    {
      title: "Pomodoro",
      img: ["/images/rem5.svg"],
      desc: "Work in deep focus cycles with built-in Pomodoro timers, paired with hydration cues to keep your energy flowing.",
    },
    {
      title: "Take Medicines",
      img: ["/images/rem6.svg"],
      desc: "Set gentle, scheduled medicine reminders aligned with your hydration cycle. Stay consistent with your health routine.",
    },
    {
      title: "Meditation",
      img: ["/images/rem7.svg"],
      desc: "Activate focused modes for your practice — FROST emits healing vibrations (like 432 Hz) to harmonize body and mind.",
    },
    {
      title: "Take Break",
      img: ["/images/rem8.svg"],
      desc: "Protect your focus with short, intentional breaks. Stretch, blink, breathe — let FROST cue your brain to reset.",
    },
  ];

  const total = reminders.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoveredFullyExpanded, setHoveredFullyExpanded] = useState(null);

  const [mobileExpand, setMobileExpand] = useState(null);

  const goLeft = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    const width = scrollRef.current.clientWidth / cardsPerView;
    scrollRef.current.scrollTo({ left: newIndex * width, behavior: "smooth" });
  };

  const goRight = () => {
    const newIndex = Math.min(currentIndex + 1, total - cardsPerView);
    setCurrentIndex(newIndex);
    const width = scrollRef.current.clientWidth / cardsPerView;
    scrollRef.current.scrollTo({ left: newIndex * width, behavior: "smooth" });
  };

  const getExpandedWidth = (title) => {
    if (title === "Drink Water") return "w-[560px]";
    if (title === "Clean Bottle") return "w-[580px]";
    return "w-[400px]";
  };

  const getGridShift = () => {
    if (hoverIndex === total - 1) return "-translate-x-[180px]";
    return "translate-x-0";
  };

  React.useEffect(() => {
    if (hoverIndex !== null) {
      setHoveredFullyExpanded(null);
      const timer = setTimeout(() => {
        setHoveredFullyExpanded(hoverIndex);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setHoveredFullyExpanded(null);
    }
  }, [hoverIndex]);

  return (
    <div className="bg-[#F6FCFF] w-full relative flex justify-center font-['Roboto']">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12 lg:px-14 py-8 relative">
        <h2 className="text-[#021637] text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold mb-8">
          Display Reminders <span className="text-[#5B869D]">that you can customize</span>
        </h2>

        {/* LEFT BUTTON */}
        {currentIndex > 0 && (
          <button
            onClick={goLeft}
            className="hidden md:flex absolute lg:left-4 -left-10 bottom-28 -translate-y-1/2 z-50
            w-14 h-14 rounded-full bg-[#E1E1E5] shadow-md hover:shadow-lg transition-all duration-300
            items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* RIGHT BUTTON */}
        {currentIndex < total - cardsPerView && (
          <button
            onClick={goRight}
            className="hidden md:flex absolute lg:right-4 -right-10 bottom-28 -translate-y-1/2 z-50
            w-14 h-14 rounded-full bg-[#E1E1E5] shadow-md hover:shadow-lg transition-all duration-300
            items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* ---------------------------- MOBILE ---------------------------- */}
        <div className="md:hidden w-full overflow-x-auto flex gap-3 pb-10 no-scrollbar snap-x snap-mandatory">
          {reminders.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-[80%] flex-shrink-0 snap-start"
            >
              <div
                onClick={() => setMobileExpand(mobileExpand === index ? null : index)}
                className="
                  bg-white shadow-lg rounded-2xl p-4 w-full flex-shrink-0
                  transition-all duration-300 relative"
              >
                {mobileExpand !== index && (
                  <div className="flex justify-center items-center py-6">
                    <img
                      src={item.img[0]}
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                )}

                {mobileExpand === index && (
                  <div className="mt-4">
                    {(() => {
                      switch (item.title) {
                        case "Drink Water":
                          return (
                            <div className="flex justify-center items-center h-32 mb-4 relative">
                              {item.img.map((src, i) => (
                                <img
                                  key={i}
                                  src={src}
                                  className={`
                                    w-28 h-28 object-contain absolute
                                    ${i === 0 ? "left-[35%] -translate-x-1/2 z-30" : ""}
                                    ${i === 1 ? "left-[43%] z-20" : ""}
                                    ${i === 2 ? "left-[60%] z-10" : ""}
                                  `}
                                />
                              ))}
                            </div>
                          );

                        case "Clean Bottle":
                          return (
                            <div className="flex justify-center items-center h-32 mb-4 relative">
                              {item.img.map((src, i) => (
                                <img
                                  key={i}
                                  src={src}
                                  className={`
                                    w-28 h-28 object-contain absolute
                                    ${i === 0 ? "left-[40%] -translate-x-1/2 z-30" : ""}
                                    ${i === 1 ? "left-[50%] z-20" : ""}
                                  `}
                                />
                              ))}
                            </div>
                          );

                        default:
                          return (
                            <div className="flex justify-center items-center h-28 mb-4 relative">
                              {item.img.map((src, i) => (
                                <img
                                  key={i}
                                  src={src}
                                  className={`
                                    w-28 h-28 object-contain absolute
                                    ${i === 0 ? "left-1/2 -translate-x-1/2 z-30" : ""}
                                    ${i === 1 ? "left-[58%] z-20" : ""}
                                    ${i === 2 ? "left-[68%] z-10" : ""}
                                  `}
                                />
                              ))}
                            </div>
                          );
                      }
                    })()}

                    <p className="text-gray-600 text-[14px] leading-[20px] text-center px-1">
                      {item.desc}
                    </p>
                  </div>
                )}
              </div>

              <p className="text-[18px] font-bold text-[#5B869D] mt-3 text-center">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* ---------------------------- DESKTOP ---------------------------- */}
        <div
          ref={scrollRef}
          className="hidden md:block w-screen -ml-[calc((100vw-100%)/2)] overflow-hidden pl-6 md:pl-16"
        >
          <div
            className={`grid grid-flow-col auto-cols-max gap-6 md:gap-8 transition-all duration-500 ${getGridShift()}`}
          >
            {reminders.map((item, index) => (
              <div
                key={index}
                className={`
                  relative flex flex-col items-center transition-all duration-500
                  ${hoverIndex === index ? getExpandedWidth(item.title) : "w-[220px]"}
                `}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div
                  className={`
                    rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] bg-white overflow-visible
                    transition-all duration-500 h-44 lg:h-48 w-full
                    ${hoverIndex === index ? "flex flex-row" : "flex items-center justify-center"}
                  `}
                >
                  {hoverIndex === index ? (
                    hoveredFullyExpanded === index ? (
                      item.title === "Drink Water" || item.title === "Clean Bottle" ? (
                        <>
                          <div className="w-1/2 h-full flex items-center p-3">
                            <div className="w-40 h-40 flex items-center">
                              {item.img.map((src, i) => (
                                <img
                                  key={i}
                                  src={src}
                                  className={`w-[92%] h-[92%] object-contain ${i !== 0 ? "-ml-8" : ""}`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* ⭐ TEXT WITH FADE-IN ANIMATION ⭐ */}
                          <div className="w-1/2 flex flex-col justify-center p-3">
                            <p
                              className={`
                                text-gray-600 text-[13px] leading-[18px]
                                opacity-0 transition-opacity duration-500
                                ${hoveredFullyExpanded === index ? "opacity-100" : ""}
                              `}
                            >
                              {item.desc}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-1/2 h-full flex items-center justify-center p-3">
                            <img src={item.img[0]} className="w-[92%] h-[92%] object-contain" />
                          </div>

                          {/* ⭐ TEXT WITH FADE-IN ⭐ */}
                          <div className="w-1/2 flex flex-col justify-center p-3">
                            <p
                              className={`
                                text-gray-600 text-[13px] leading-[18px]
                                opacity-0 transition-opacity duration-500
                                ${hoveredFullyExpanded === index ? "opacity-100" : ""}
                              `}
                            >
                              {item.desc}
                            </p>
                          </div>
                        </>
                      )
                    ) : (
                      item.title === "Drink Water" || item.title === "Clean Bottle" ? (
                        <>
                          <div className="w-1/2 h-full flex items-center p-3">
                            <div className="w-40 h-40 flex items-center">
                              {item.img.map((src, i) => (
                                <img
                                  key={i}
                                  src={src}
                                  className={`w-[92%] h-[92%] object-contain ${i !== 0 ? "-ml-8" : ""}`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="w-1/2 flex flex-col justify-center p-3"></div>
                        </>
                      ) : (
                        <>
                          <div className="w-1/2 h-full flex items-center justify-center p-3">
                            <img src={item.img[0]} className="w-[92%] h-[92%] object-contain" />
                          </div>
                          <div className="w-1/2 flex flex-col justify-center p-3"></div>
                        </>
                      )
                    )
                  ) : (
                    <div className="w-40 h-40 flex justify-center items-center">
                      <img src={item.img[0]} alt={item.title} className="w-[92%] h-[92%] object-contain" />
                    </div>
                  )}
                </div>

                <p
                  className={`
                    text-[18px] md:text-[20px] font-bold text-[#5B869D] transition-all duration-500
                    ${
                      hoverIndex === index
                        ? "absolute left-2 bottom-2 text-left"
                        : "mt-3 text-center w-full"
                    }
                  `}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

//NEW TECHNICAL SPECIFICATION NOVEMBER
const TechnicalSpecifications = () => {
  const specs = [
    {
      img: "/images/processor.svg",
      title: "Smart Core Engine",
      description: (
        <>
          Dual-core 32-bit processor with Wi-Fi + BLE 5.0.
          <br />
          Optimized for low-power performance, secure boot, and over-the-air updates.
        </>
      ),
    },
    {
      img: "/images/audio.svg",
      title: "Resonant Audio System",
      description: (
        <>
          Built-in DSP decodes MP3/WAV/WMA with studio-grade clarity.
          <br />
          Tuned acoustic chamber delivers calm, 432 Hz water-energizing sound.
        </>
      ),
    },
    {
      img: "/images/gesture.svg",
      title: "Gesture & Dock Detection",
      description: (
        <>
          High-speed IR sensor detects hand-waves and bottle movement.
          <br />
          Millisecond-response engine ensures intuitive, touch-free control.
        </>
      ),
    },
    {
      img: "/images/ai.svg",
      title: "Hydration & Wellness Intelligence",
      description: (
        <>
          AI-driven scheduler learns your hydration rhythm.
          <br />
          Sends adaptive reminders, wellness cues, and mindful prompts.
        </>
      ),
    },
    {
      img: "/images/vividdisplay.svg",
      title: "️Circular IPS Display",
      description: (
        <>
          1.28″ 240×240 px vivid screen with fluid animations.
          <br />
          Displays time, hydration status, and mood-based visuals.
        </>
      ),
    },
    {
      img: "/images/connectivity.svg",
      title: "Seamless Connectivity",
      description: (
        <>
          Dual-mode Wi-Fi + BLE communication.
          <br />
          Syncs time, reminders, and audio cues from your phone effortlessly.
        </>
      ),
    },
    {
      img: "/images/current.svg",
      title: "Power & Safety Optimized",
      description: (
        <>
          USB-C powered with dynamic dimming and power scaling.
          <br />
          Built-in surge, thermal, and overcurrent protection.
        </>
      ),
    },
    {
      img: "/images/humidity.svg",
      title: "Built for Real-World Use",
      description: (
        <>
          Operates from –10 °C to +55 °C with humidity protection.
          <br />
          Shock-resistant, EMI-safe, and thermally optimized.
        </>
      ),
    },
  ];

  return (
    <section id="technical">
      <div className="bg-[#FFFFFF] py-16 px-6 font-['Roboto']">
        {/* --- Section Heading --- */}
        <div className="max-w-6xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#021637] mb-2 text-left">
            Technical Specifications{" "}
            <span className="font-bold text-[#5B869D]">
              Engineered for accuracy, comfort, and longevity
            </span>
          </h2>
        </div>

        {/* --- Specifications Grid --- */}
        <div className="lg:-mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {specs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.15)] transition-all duration-300 flex flex-col items-center text-center p-8 min-h-[180px]"
            >
              {/* Icon */}
              <div className="mb-5 flex justify-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-8 h-8 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-[17px] font-semibold text-[#021637] mb-1 whitespace-nowrap">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#6E6E72] leading-snug">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};




//New Testimonials NOVEMBER
const Testimonials = () => {
  const testimonials = [
    {
      img: "/images/maxim.svg",
      name: (
        <>
          Maxim Bishop 
          <br />
          <span className="font-bold">(HG Maitreya Rishi Dasa)</span>
        </>
      ),
      title: "Temple President BLISS, South London",
      desc: "Everybody drinks water. But did you know you can become spiritual by drinking water?",

      extra: "FROST transforms our water into a spiritual beverage by vibrating special frequencies. Sometimes, we need a reminder to stretch. Or to take medication. Everyone needs a break from work sometimes. FROST keeps us well by making sure we don't forget.",
      icons: [
        { src: "/images/globe.svg", link: "https://gopiayurveda.shop/" },
        { src: "/images/insta.svg", link: "https://www.instagram.com/expandtheblisslondon" },
      ],
      titleMb: "mb-1.5",
      descMb: "mb-2.5",
    },
    {
      img: "/images/aitana.svg",
      name: "Aitana",
      title: "Software Engineer, Spain",
      desc: "Even in its early stage, Frost Aura is already making a difference. As a Software Engineer juggling multiple campaigns, I often struggle to stay centered.",

      extra: "The MVP’s subtle lighting cues and basic breathing guidance have helped me refocus during high-pressure moments. It’s a promising start—and the clean, minimal design already feels like a natural fit on my desk",
      icons: [
        { src: "/images/in.svg", link: "https://www.linkedin.com/in/aitana-peinado-contreras-365a27258/" },
      ],
      titleMb: "mb-2",
      descMb: "mb-3",
    },
    {
      img: "/images/khushi.jpg",
      name: "Khushi",
      title: "Junior Project Manager",
      desc: "I didn’t realize how often I was forgetting to drink water until I started using Frost Aura. The gentle glow on my desk is such a calming reminder it doesn’t interrupt my work.",

      extra: "But it nudges me just when I need it. Within the first week, I was drinking more, feeling less tired in the afternoons, and even started using the breathing reminders during stressful meetings. It’s honestly the smartest upgrade I’ve made to my workspace.",
      icons: [{ src: "/images/mail.svg", link: "mailto:kushikushala2020@gmail.com" }],
      titleMb: "mb-1",
      descMb: "mb-4",
    },
  ];

  return (
    <div className="font-['Roboto'] w-full bg-white py-12 px-4 sm:px-6 lg:px-12">
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#021637]">
          Testimonials{" "}
          <span className="font-bold text-[#5B869D]">
            See what our customers say!
          </span>
        </h2>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="group bg-[#DEF3FF] rounded-2xl p-6 flex flex-col h-auto shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden hover:scale-[1.02]"
          >
            {/* Image with overlay name/title */}
            <div className="relative flex justify-center mb-4 transition-all duration-500">
              <img
                src={t.img}
                alt={typeof t.name === "string" ? t.name : "testimonial-image"}
                className="w-80 h-80 sm:w-78 sm:h-78 object-cover rounded-2xl transition-all duration-500"
              />

              {/* Hover overlay for name/title */}
              <div className="absolute inset-0 flex flex-col justify-end items-start p-4 bg-black/0 group-hover:bg-black/40 transition-all duration-500 rounded-2xl">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-white text-lg sm:text-xl font-bold leading-snug mb-1">
                    {t.name}
                  </h3>
                  <p className="text-white text-sm sm:text-base">{t.title}</p>
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="text-left text-[#021637] flex flex-col flex-grow transition-all duration-500 group-hover:h-auto">
              {/* Name/Title (visible when not hovered) */}
              <div className="transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-4">
                <h3 className={`text-lg sm:text-xl font-bold leading-snug ${t.titleMb}`}>
                  {t.name}
                </h3>
                <p className={`text-sm sm:text-base ${t.descMb}`}>{t.title}</p>
              </div>

              {/* Description (moves up on hover) */}
              <p className="text-sm sm:text-[15px] leading-relaxed mb-3 transition-all duration-500 group-hover:-translate-y-16">
                {t.desc}
              </p>

              {/* Extra content appears on hover */}
              <p className="-mt-16 text-sm sm:text-[15px] leading-relaxed mb-16 max-h-0 group-hover:max-h-40 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden">
                {t.extra}
              </p>

              {/* Icons */}
              <div className="flex gap-4 mt-auto">
                {t.icons.map((icon, idx) => (
                  <a
                    key={idx}
                    href={icon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={icon.src}
                      alt="social-icon"
                      className="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer hover:opacity-80 transition"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// Home banner with Animation(OLD)
function renderSubtitle(subtitle) {
  const idx = subtitle.indexOf("Companion");
  if (idx === -1) return subtitle;

  return (
    <>
      <span className="block leading-[1.2]">
        {subtitle.slice(0, idx).trim()}
      </span>
      <span className="block leading-[1]">Companion</span>
    </>
  );
}

const HeroBanner = () => {
  const mainImages = [
    "/images/desktop-companion2.jpg",
    "/images/desktop-companion3.jpg",
    "/images/desktop-companion5.jpg",
    "/images/desktop-companion4.jpg",
    "/images/desktop-companion6.jpg",
    "/images/desktop-companion7.jpg",
  ];

  const subtitles = [
    "Desktop Companion",
    "Kitchen Companion",
    "Gym Companion",
    "Meditation Corner Companion",
    "Clinic Companion",
    "Couch/Living Room Companion",
  ];

  const descriptions = [
    "Stay hydrated and focused with posture resets, mindful breathing, and soothing eye relaxation.",
    "Hydrate with intention as you cook, eat, or relax water infused with restorative frequencies.",
    "Train harder, recover smarter mid-set hydration with energizing buzz syncing to fitness rhythm.",
    "Elevate your stillness—affirmations and sound frequencies deepen your mind-body harmony.",
    "Care meets clarity—smart medication reminders and water cues elevate daily wellness routines.",
    "Even your downtime deserves intention gentle reminders keep you hydrated and balanced.",
  ];

  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageWidth = 180; 
  const mainWidth = 420; 

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [isPaused]);

  const getDisplayImages = () => {
    // Repeat images many times so we can scroll infinitely without snap-back
    return Array(80).fill(mainImages).flat();
  };

  const images = getDisplayImages();

  return (
  <>
    <div
      className="mt-20 flex flex-col lg:flex-row items-center lg:items-start px-4 sm:px-6 lg:px-8 font-['Roboto'] gap-x-6 relative"
      // onMouseEnter={() => setIsPaused(true)}
      // onMouseLeave={() => setIsPaused(false)}
    >
      {/* IMAGE BELT */}
      <div className="lg:mt-7 lg:-ml-12 flex-shrink-0 w-full lg:w-[40%] pr-4 relative">
        <motion.div
          className="flex items-center"
          animate={{
            x: -currentIndex * imageWidth,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ height: 466 }}
        >
          {images.map((src, i) => {
            const isMain = i === currentIndex;
            return (
              <motion.img
                key={`${src}-${i}`}
                src={src}
                animate={{
                  width: isMain ? mainWidth : 160,
                  height: isMain ? 466 : 240, 
                  y: isMain ? 0 : 120,
                  // Apply x offset only on lg screens (≥1024px)
                  x: typeof window !== "undefined" && window.innerWidth >= 1024 
                    ? (isMain ? 0 : -50) 
                    : 0,
                  zIndex: isMain ? 10 : 1,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="object-contain rounded-lg"
                style={{
                  borderRadius: 12,
                  marginRight: 20,
                  flexShrink: 0,
                }}
              />
            );
          })}
        </motion.div>
      </div>

      {/* RIGHT SIDE TEXT */}
      <div className="lg:mt-0 mt-8 flex flex-col lg:w-[80%] items-center lg:items-end justify-center text-center lg:text-right gap-3  font-['Roboto']">
        <motion.h2
          key={`subtitle-${currentIndex % mainImages.length}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[28px] xl:text-[38px] text-[#5B869D] font-bold"
        >
          {renderSubtitle(subtitles[currentIndex % mainImages.length])}
        </motion.h2>

        <motion.p
          key={`desc-${currentIndex % mainImages.length}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-sm xl:text-base text-[#021637] max-w-[350px]"
        >
          {descriptions[currentIndex % mainImages.length]}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:mt-6 flex items-center bg-[#5B869D] text-lg text-white px-2 py-2 rounded-md shadow-md"
        >
          <a href="/prelaunch">Pre Launch</a>
          <span className="ml-2 bg-white w-6 h-6 rounded flex items-center justify-center">
            <ArrowUpRight className="w-6 h-5 text-[#5B869D]" />
          </span>
        </motion.button>
      </div>
    </div>

    {/* Curvy background */}
    <div className="lg:mt-2 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      <img
        src="/images/curvy1.png"
        loading="lazy"
        alt="curvy"
        className="w-full h-auto object-cover"
      />
    </div>
  </>
);
};


//Old Home banner with Buttons
const heroContent = [
  {
    heading: "YOUR NEW",
    subheading: "DESKTOP COMPANION",
    description:
      "Stay sharp, stay centered. FROST keeps you hydrated and focused with timely posture resets, deep breathing cues, and eye relaxation prompts that recharge your workflow.",
    image: "/images/bottle.png", 
    imageStyles: { top: "10px", left: "243px", height: "258px", width: "85px" } , 
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
                  className={`font-roboto font-semibold text-[28px] md:text-[34px] text-[#5B869D] ${
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
                      initial={{ opacity: 0, y: -100 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
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





// NEW Features Section (SEPTEMBER)
const tabs = [
  "Key Reminders",
  "Hydration",
  "Water Energisation",
  "App Integration",
  "Social & Gamification",
];

// Images for "Key Reminders" tab
const keyRemindersImages = [
  { src: "/images/drinkwater.jpg" },
  { src: "/images/cleanbottle.jpg", },
  { src: "/images/placebottle.jpg",  },
  { src: "/images/takemedicine.jpg",  },
  { src: "/images/meditation.jpg", },
  { src: "/images/takebreak.jpg" },
  { src: "/images/pomodoro.jpg"},
  { src: "/images/tomato.png"},
];

const KeyFeaturesSection = () => {
  const [activeTab, setActiveTab] = useState("Key Reminders");

  return (
    <section className="w-full px-4 md:px-12 py-8 font-['Roboto']">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#021637]">
          FEATURES by <br /> <span style={{ color: "#5B869D" }}>FROST</span>
        </h2>
        {/* Image on the right */}
        <img
          src="/images/features-icons.png"
          alt="Features Icons"
          className="w-52 md:w-80"
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-6 md:gap-32 border-b border-gray-300 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-base md:text-lg font-medium ${
              activeTab === tab ? "text-[#021637] font-bold border-b-2 border-[#021637]" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        {activeTab === "Key Reminders" && (
          <>
            {keyRemindersImages.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <div className="mt-8 relative w-28 h-28 md:w-52 md:h-52 flex items-center justify-center ">  
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-52 h-52 object-contain"  // div:32 , classname:40 
                  />
                </div>
                {item.label && (
                  <p className="absolute text-[10px] md:text-xs font-bold mt-1 text-center">
                    {item.label}
                  </p>
                )}
              </div>
            ))}
          </>
        )}

        {/* Placeholder for other tabs */}
        {activeTab === "Hydration" && (
          <p className="col-span-4 text-center text-gray-500">
            (Hydration tab content will go here)
          </p>
        )}
        {activeTab === "Water Energisation" && (
          <p className="col-span-4 text-center text-gray-500">
            (Water Energisation tab content will go here)
          </p>
        )}
        {activeTab === "App Integration" && (
          <p className="col-span-4 text-center text-gray-500">
            (App Integration tab content will go here)
          </p>
        )}
        {activeTab === "Social & Gamification" && (
          <p className="col-span-4 text-center text-gray-500">
            (Social & Gamification tab content will go here)
          </p>
        )}
      </div>
      {/* Curvy background */}
      <div className="lg:mt-2 -mt-12 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        <img
          src="/images/curvy1.png"
          loading="lazy"
          alt="curvy"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};





{/* NEW Features Section */}
const KeyFeatures = () => {
  const images = [
   "/images/drink-water.png",
    "/images/clean-bottle.png",
    "/images/take-medicine.png",
    "/images/water-remainder.png",
    "/images/meditation.png",
    "/images/walk.png",
    "/images/exercise.png",
    "/images/shortbreak.png",
    "/images/pomodoro.png",
    "/images/waterhealing.png",
  ];

  const headings = [
    "Drink Water",
    "Clean Bottle",
    "Take Medicine",
    "Water Remainder",
    "Meditation, Yoga & Workout",
    "Short Walk",
    "Place Bottle",
    "Short Break",
    "Pomodoro Activity",
    "Water Energizing",
  ];

  const descriptions = [
   "Get personalized nudges to drink water throughout your day — no more guesswork, just natural hydration.",
    "FROST remembers what you forget. It tracks when you last cleaned your bottle and reminds you to wash it — keeping bacteria at bay.",
    "Set gentle, scheduled medicine reminders aligned with your hydration cycle. Stay consistent with your health routine.",
    "Monitor daily water intake, set goals, and get insights via the FROST mobile app — all without micromanaging.",
    "Activate focused modes for your practice — FROST emits healing vibrations (like 432 Hz) to harmonize body and mind.",
    "Been sitting too long? FROST encourages short movement breaks to keep your circulation flowing and your head clear.",
    "Left your bottle behind? FROST gently notifies you to place it back on the dock — so your tracking never skips a beat.",
    "Protect your focus with short, intentional breaks. Stretch, blink, breathe — let FROST cue your brain to reset.",
    "Work in deep focus cycles with built-in Pomodoro timers — paired with hydration cues to keep your energy flowing.",
    "FROST Aura turns hydration into a mindful ritual, infusing water with healing frequencies and mantras to harmonize energy and wellbeing.",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
      setFade(true);
    }, 300);
  };

  const handleThumbnailClick = (index) => {
    setFade(false);
    setTimeout(() => {
      setActiveIndex(index);
      setFade(true);
    }, 300);
  };

  return (
    <section id="features">
      {/* Mobile Heading First */}
      <div className="lg:hidden text-center py-6">
        <h2 className="text-4xl text-[#021637] font-bold mb- font-['Roboto'] ">
          <span style={{ color: "#021637" }}>KEY </span>
          <span style={{ color: "#5B869D" }}>FEATURES</span>
        </h2>
        <p className="text-lg text-[#021637] mb-4 font-['Roboto'] ">explore in-depth</p>
      </div>

      <div className="font-['Roboto'] md:-mt-5 flex flex-col lg:flex-row items-center lg:items-start gap-8 px-4 lg:px-20 py-10">
        {/* Left side - Image + Thumbnails */}
        <div className="-mt-12 lg:mt-2  lg:pt-2 flex flex-col items-center lg:w-1/2 order-2 lg:order-1">
          <div className="w-full flex justify-center">
            <img
              src={images[activeIndex]}
              alt={headings[activeIndex]}
              className={`w-[300px] sm:w-[350px] md:w-[400px] lg:w-[250px] transition-opacity duration-500 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          <div className="flex overflow-x-auto lg:gap-3 mt-4 pb-2 scrollbar-hide">
            {images.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full cursor-pointer border-2   flex-shrink-0 ${
                  activeIndex === index
                    ? "border-[#5B869D]"
                    : "border-transparent"
                } transition duration-300`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Right side - Text */}
        <div className="lg:w-1/2 text-center lg:text-left lg:pl-28 lg:pt-4 order-3 lg:order-2">
          {/* Desktop heading */}
          <div className="hidden lg:block">
            <h2 className="text-4xl text-[#021637] font-bold mb-0">
              <span style={{ color: "#021637" }}>KEY </span>
              <span style={{ color: "#5B869D" }}>FEATURES</span>
            </h2>
            <p className="text-lg text-[#021637] mb-10">explore in-depth</p>
          </div>

          <h3
            className={`text-[#5B869D] text-xl font-bold transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {headings[activeIndex]}
          </h3>

          <p
            className={`text-[#021637] md:mb-16 lg:w-[65%] transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
            style={{ minHeight: "100px" }}
          >
            {descriptions[activeIndex]}
          </p>
          <div className="md:-mt-8">
          <a href="#" className="text-[#5B869D] font-medium hover:underline transition" >
             {/* learn more → */}
            </a>
            </div>
        </div>
      </div>

      {/* Curvy background */}
      <div className="lg:-mt-12 -mt-12 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-   [50vw] overflow-hidden">
        <img
          src="/images/curvy1.png"
          loading="lazy"
          alt="curvy"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};


//OLd Key Featutes Section Code
const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Drink Water",
      description: "Get personalized nudges to drink water throughout your day — no more guesswork, just natural hydration.",
      details: "Even mild dehydration (just 1–2% of body weight) can impair memory, concentration, and mood. Office workers often forget to drink water during long stretches of screen time. Frost Aura delivers gentle, timely nudges—so hydration becomes effortless, not an afterthought.",
      backed: "Harvard T.H. Chan School of Public Health, Lieberman HR (2007)",
      img: "/images/drink-water.png",
    },
    {
      id: 2,
      title: "Clean Bottle",
      description: "FROST remembers what you forget. It tracks when you last cleaned your bottle and reminds you to wash it — keeping bacteria at bay.",
      details: "Reusable bottles can become breeding grounds for bacteria if not cleaned regularly. Studies show biofilms develop within 48 hours. Frost Aura tracks your cleaning intervals and reminds you when it’s time to wash—so your sips stay safe.",
      backed: "NSF International, Dr. Philip Tierno, NYU Langone",
      img: "/images/clean-bottle.png",
    },
    {
      id: 3,
      title: "Take Medicine",
      description: "Set gentle, scheduled medicine reminders aligned with your hydration cycle. Stay consistent with your health routine.",
      details: "Medication routines are easy to forget—especially when tied to meals or water intake. Frost Aura links hydration and medicine reminders, helping users stay consistent and healthy with subtle, supportive alerts.",
      backed: "WHO Adherence Report, CDC Medication Compliance",
      img: "/images/take-medicine.png",
    },
    {
      id: 4,
      title: "Water Reminder",
      description: "Monitor daily water intake, set goals, and get insights via the FROST mobile app — all without micromanaging.",
      details: "Most people under-drink water without realizing it. Frost Aura helps you monitor your daily water intake with smart tracking and insights—building healthier habits one sip at a time.",
      backed: "JAMA (hydration & disease prevention), BJ Fogg's Behavior Model",
      img: "/images/water-remainder.png",
    },
    {
      id: 5,
      title: "Meditation, Yoga & Workout",
      description: "Activate focused modes for your practice — FROST emits healing vibrations (like 432 Hz) to harmonize body and mind.",
      details: "Your water can carry more than hydration—it can carry healing intent. Frost Aura uses vibrational frequencies like 432 Hz to enhance meditation and yoga sessions, energizing water and harmonizing mind and body.",
      backed: "PubMed - Sound Frequencies on Water, Emoto Water Crystal Study",
      img: "/images/meditation.png",
    },
    {
      id: 6,
      title: "Short Walk",
      description: "Been sitting too long? FROST encourages short movement breaks to keep your circulation flowing and your head clear.",
      details: "Prolonged sitting is linked to heart disease, diabetes, and fatigue. Just 2–3 minutes of walking every hour reduces these risks. Frost Aura gently encourages short walks to reset your posture and energy.",
      backed: "WHO Activity Guidelines, American Heart Association",
      img: "/images/walk.png",
    },
    {
      id: 7,
      title: "Place Bottle",
      description: "Left your bottle behind? FROST gently notifies you to place it back on the dock — so your tracking never skips a beat.",
      details: "Habit stacking is key to behavior change. When your bottle is on the dock, you're more likely to hydrate and stay consistent. Frost Aura reminds you to place your bottle—keeping the loop intact.",
      backed: "James Clear (Atomic Habits), Charles Duhigg (The Power of Habit)",
      img: "/images/exercise.png",
    },
    {
      id: 8,
      title: "Short Break",
      description: "Protect your focus with short, intentional breaks. Stretch, blink, breathe — let FROST cue your brain to reset.",
      details: "Micro-breaks reduce eye strain, mental fatigue, and back pain. Frost Aura suggests 2–3 min pauses to stretch, blink, or breathe—recharging your focus without disrupting your flow.",
      backed: "American Optometric Association, Microsoft Human Factors Lab Study",
      img: "/images/cleanbottle.png",
    },
    {
      id: 9,
      title: "Pomodoro Activity",
      description: "Work in deep focus cycles with built-in Pomodoro timers — paired with hydration cues to keep your energy flowing.",
      details: "The Pomodoro technique boosts focus by breaking tasks into 25-min sprints with 5-min breaks. Frost Aura builds hydration cues into these cycles, keeping your brain fresh and your body fueled.",
      backed: "Francesco Cirillo (Pomodoro Creator), UC Irvine Study on Deep Work",
      img: "/images/pomodoro.png",
    },
  ];

  const [expandedRows, setExpandedRows] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollInterval = useRef(null);
  const isHovered = useRef(false);
  const isTouching = useRef(false);
  const resumeTimeout = useRef(null);
  const hasEntered = useRef(false);

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered.current) {
          hasEntered.current = true;
          startAutoScroll();
        }
      },
      { threshold: 0.5 } //  Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      stopAutoScroll();
      clearTimeout(resumeTimeout.current);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
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
    <section
      id="features"
      ref={sectionRef}
      className="container bg-white py-16 px-4 mt-0 md:px-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-foreground" style={{ fontFamily: "Roboto", fontWeight: "600" }}>
        <span style={{ color: "#021637" }}>KEY </span>
        <span style={{ color: "#5B869D" }}>FEATURES</span>
      </h2>
      <p className="text-center text-muted-foreground mb-8">
        <span style={{ color: "#5B869D" }}>Explore here </span>
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
          {Array(5)
            .fill(features)
            .flat()
            .map((feature, index) => (
              <div key={`${feature.id}-${index}`} className="flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4 }}
                  className={`snap-start min-w-[300px] max-w-sm flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-md p-6 flex flex-col relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[6px] after:bg-sky-600 after:rounded-b-xl ${[2, 4, 6, 8].includes(feature.id) ? "relative top-20" : ""}`}
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
                      style={{ color: "#5B869D" }}
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
              activeIndex === i ? "bg-[#5B869D]" : "bg-[#B3DDF3]"
            }`}
          />
        ))}
      </div>

      {/* Curvy background */}
      <div className="mt-0 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        <img src="/images/curvy1.png" loading="lazy" alt="curvy" className="w-full h-auto object-cover" />
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
  const sectionRef = useRef(null);
  const audio1Ref = useRef(null);
  const audio2Ref = useRef(null);
  const [audioAllowed, setAudioAllowed] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);
        if (!visible) {
          stopAllAudio();
          setAudioAllowed(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (audio1Ref.current && audio2Ref.current) {
      audio1Ref.current.volume = 0.3;
      audio2Ref.current.volume = 0.3; 
    }
  }, []);

  useEffect(() => {
    if (audioAllowed && isInView) {
      playAudioSequence();
    }
  }, [audioAllowed, isInView]);

  const playAudioSequence = () => {
    if (!audio1Ref.current || !audio2Ref.current) return;
    audio1Ref.current.currentTime = 0;
    audio2Ref.current.currentTime = 0;
    audio1Ref.current.play().catch(() => {});

    audio1Ref.current.onended = () => {
      if (audioAllowed && isInView) {
        audio2Ref.current.play().catch(() => {});
      }
    };

    audio2Ref.current.onended = () => {
      if (audioAllowed && isInView) {
        playAudioSequence();
      }
    };
  };

  const stopAllAudio = () => {
    [audio1Ref, audio2Ref].forEach((ref) => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });
  };

  const handleAllowSound = () => {
    setAudioAllowed(true);
    playAudioSequence();
  };

  return (
    <>
      <audio ref={audio1Ref} src="/audio/how-it-works-1.mp3" preload="auto" />
      <audio ref={audio2Ref} src="/audio/how-it-works-2.mp3" preload="auto" />

      <section
        ref={sectionRef}
        id="how-it-works"
        className="-mt-10 w-full bg-white px-0 py-20 flex flex-col md:flex-row items-center justify-between"
      >
        {/* Left Content */}
        <div className="w-full md:w-1/2 relative left-4 md:left-20 px-4 sm:px-6">
          <div className="flex items-center justify-between mb-12 w-full">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "Roboto" }}
            >
              <span className="text-[#021637]">How it </span>
              <br />
              <span className="text-[#5B869D]">WORKS?</span>
            </h2>
            
            <button
              onClick={handleAllowSound}
             
              className="transform md:-translate-x-56 -translate-x-10 bg-[#5B869D] text-white px-5 py-2 rounded-full font-medium hover:bg-[#2CA4E0]/90 animate-pulse whitespace-nowrap"
            >
              🎧 Allow Sound
            </button>
   
          </div>

          {/* Steps */}
          <div className="relative space-y-20 left-0 sm:left-1">
            {steps.map((step, index) => (
              <div key={index} className="relative pl-12 sm:pl-16 pr-4">
                <span className="absolute -left-2 md:left-2 -top-8 text-[72px] font-bold text-[#E6EAF0] leading-none z-0 select-none">
                  {step.number}
                </span>
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-10 md:top-10 h-24 border-l-2 border-dotted border-[#B0C4D8] z-0" />
                )}
                <div className="relative z-10">
                  <h3
                    className="text-2xl font-semibold text-[#021637]"
                    style={{ fontFamily: "Roboto" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm text-[#021637] mt-2 leading-relaxed max-w-full sm:max-w-sm font-light"
                    style={{ fontFamily: "Roboto" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="absolute left-8 top-[330px] md:top-[285px] h-24 border-l-2 border-dotted border-[#B0C4D8] z-0" />
          </div>

          <div className="mt-14 pl-0">
            <button className="rounded-full px-6 py-3 text-white bg-[#5B869D] hover:bg-[#2CA4E0]/90 text-base font-medium shadow-md">
              <a href="/prelaunch">Pre Launch</a>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 mt-60 md:mt-16 lg:mt-0 flex justify-center md:justify-end relative">
          <img
            src="/images/BlueBackgroundImage.png"
            loading="lazy"
            alt="Background Shape"
            className="absolute -top-[160px] md:-top-10 right-[1px] md:-right-20 w-[200px] md:w-[500px] h-[300px] md:h-[650px] z-0"
          />
          <div className="relative z-10">
            <img
              src="/images/ringdesign.png"
              loading="lazy"
              alt="Ring Design"
              className="absolute left-[185px] top-[8px] md:left-[130px] md:top-[350px] md:w-[210px] md:h-[115px] w-[130px] h-[70px] z-20 animate-vibrate"
            />
            <img
              src="/images/works1.png"
              loading="lazy"
              alt="How it Works"
              className="relative left-[185px] md:left-[120px] -top-[160px] md:top-[30px] z-10 md:w-[350px] md:h-[550px] w-[200px]  h-[300px]"
            />
          </div>
          <img
            src="/images/square1.png"
            loading="lazy"
            alt="square1"
            className="relative right-[10px] -top-[240px] md:right-[180px] md:-top-[60px] w-[30px] h-[30px]"
          />
          <img
            src="/images/square2.png"
            loading="lazy"
            alt="square2"
            className="relative -right-[40px] -top-[210px] md:right-[100px] md:-top-[40px] z-10 w-10 h-10 "
          />
          <img
            src="/images/square3.png"
            loading="lazy"
            alt="square3"
            className="relative right-[100px] -top-[150px] md:right-[260px] md:top-[45px] z-10 w-[30px] h-[30px] "
          />
        </div>
      </section>

      <div className="-mt-[230px] md:-mt-[78px] relative -ml-[1vw] -mr-[5vw] overflow-hidden w-screen">
        <img
          src="/images/curvy1.png"
          loading="lazy"
          alt="curvy"
          className="w-full h-auto md:h-[200px] object-cover"
        />
      </div>
    </>
  );
};


// GALLERY SECTION UPDATED 

const allImages = [
  "/images/gallery6.png",  "/images/gallery2.png",
  "/images/gallery3.png", "/images/gallery4.png", "/images/gallery5.png",
  "/images/gallery1.png", "/images/gallery7.png", "/images/gallery8.png",
 "/images/gallery9.png", "/images/gallery10.png", "/images/gallery11.png",
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
    <section className="bg-[#F6FCFF] w-full py-14 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#021637] mb-2">
      Product Gallery{" "}
          <span className="font-bold text-[#5B869D]">
           Story of ours
          </span>
        </h2>
      </div>
      {/* <p className="text-sm md:text-base max-w-2xl mx-auto mt-2 text-center px-2">
        Witness how FROST blends into your life from sunrise to sleep. More than a device,
        it’s your hydration companion. Every sip tells a story of care, energy, and better living.
      </p> */}

      <div className="relative max-w-7xl mx-auto mt-8">
        <button
          onClick={prevImage}
          className="absolute z-20 lg:left-6 left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-[#5B869D] flex items-center justify-center shadow transition"
          style={{ pointerEvents: isAnimating ? "none" : "auto", opacity: isAnimating ? 0.3 : 1 }}
        >
          <svg viewBox="0 0 13 20" width="22" height="22">
            <polyline points="10,3 3,10 10,17" stroke="#5B869D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
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
              className="carousel-image absolute rounded-xl overflow-hidden cursor-pointer"
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
          className="absolute z-20 lg:right-6 right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-white border border-[#5B869D] flex items-center justify-center shadow transition"
          style={{ pointerEvents: isAnimating ? "none" : "auto", opacity: isAnimating ? 0.3 : 1 }}
        >
          <svg viewBox="0 0 13 20" width="22" height="22">
            <polyline points="10,3 3,10 10,17" stroke="#5B869D" strokeWidth="2.5" fill="none" strokeLinecap="round" transform="rotate(180 6.5,10)" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex justify-center mt-4 gap-2">
          {allImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCenter(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`w-2.5 h-2.5 rounded-full border-2 border-[#5B869D] ${idx === center ? "bg-[#5B869D]" : "bg-white"}`}
              style={{ transition: "background 0.3s, border 0.3s" }}
            />
          ))}
        </div>
      </div>

 {/* <div className="mt-0 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        <motion.img
          src="/images/curvy.png" loading="lazy"
          alt="curvy"
          className="w-screen h-auto object-cover"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
      </div> */}
    </section>
  );
};



const TechnicalSpecification = () => {
  return (
    <section id="technical">
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
        <span className="text-[#5B869D]"> SPECIFICATIONS</span>
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
          src="/images/TechnicalSpecification1.png" loading="lazy"
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
    </section>
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
          <span className="text-[#5B869D]"> why FROST AURA?</span>
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
            className="relative md:-top-20 rounded-xl bg-[#5B869D] p-6 shadow-md max-w-sm w-full mx-auto"
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
                <a href="/prelaunch">Pre Launch</a>
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
          src="/images/curvy1.png"
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
              className="mt-2 text-sm text-[#5B869D] underline"
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
              className="mt-4 text-sm text-[#5B869D] underline"
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
              style={{ backgroundColor: '#5B869D' }}
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
                style={{ backgroundColor: '#5B869D', fontFamily: 'Roboto', fontWeight: '500' }}
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
            <span className="text-[#5B869D]">Meet Our</span>
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
      {/*  Curvy Bottom Image */}
        <div className="md:-mt-[50px] w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <img src="/images/curvy1.png" loading="lazy" alt="curvy" className="w-full h-auto object-cover" />
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
    name: ' Maxim Bishop (HG Maitreya Rishi Dasa)',
    designation: 'Temple President BLISS(Bhaktivedanta Lives In Sound Society), South London',
    image: '/images/Maxim Bishop.jpg',
    testimonial:
      "Everybody drinks water. But did you know you can become spiritual by drinking water? FROST transforms our water into a spiritual beverage by vibrating special frequencies. Sometimes, we need a reminder to stretch. Or to take medication. Everyone needs a break from work sometimes. FROST keeps us well by making sure we don't forget to do these simple actions that make our life better. A small device on your desk can change our lives in so many ways. That's why I think FROST is a great product.",
    linkedin: 'https://www.linkedin.com/',
    email: 'mailto:someone@example.com',
  },
   {
    id: 4,
    name: 'Aitana',
    designation: 'Software Engineer, Spain',  
    image: '/images/aitana1.png',
    testimonial:
      "Even in its early stage, Frost Aura is already making a difference. As a Software Engineer juggling multiple campaigns, I often struggle to stay centered. The MVP’s subtle lighting cues and basic breathing guidance have helped me refocus during high-pressure moments. It’s a promising start—and the clean, minimal design already feels like a natural fit on my desk",
    linkedin: 'https://www.linkedin.com/in/aitana-peinado-contreras-365a27258/',
  },

  
  //{
    //id: 3,
    //name: 'Channegowda',
    //designation: 'Cloud Devops Engineer, Bangalore',
    //image: '/images/channegowda.jpg',
    //testimonial:
      //"I’ve been working remotely for the past six months, and I slowly realized I wasn’t hydrating enough or moving at all during the day. Even though I have a smartwatch, I really wanted something physical something made just for wellness, not just time or steps. Frost Aura changed that completely. The glow reminds me to sip water, stretch, and breathe. It’s like a quiet little coach on my desk.",
    //linkedin: 'https://www.linkedin.com/in/channe-gowda-j-l-195736138?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    //email: 'mailto:someone@example.com',
  //},

];

const moreTestimonials = [
  {
    id: 5,
    name: 'Priya',
    designation: 'Marketing Specialist',
    image: '/images/priya.jpg',
    testimonial:
      "Frost Aura has been a game-changer for my focus. As a marketer, I'm constantly juggling multiple campaigns. The subtle light and breathing exercises help me recenter and stay productive throughout the day. Plus, it looks really sleek on my desk!",
    linkedin: 'https://www.linkedin.com/',
    email: 'mailto:someone@example.com',
  },
  {
    id: 6,
    name: 'Arjun',
    designation: 'Software Developer',
    image: '/images/arjun.jpg',
    testimonial:
      "Long hours coding often meant I'd forget to take breaks. Frost Aura's gentle reminders to hydrate and stretch have made a noticeable difference in my energy levels and reduced stiffness. It's a simple yet effective way to prioritize well-being during intense work periods.",
    linkedin: 'https://www.linkedin.com/',
    email: 'mailto:someone@example.com',
  },
  {
    id: 7,
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
  backgroundColor: '#5B869D',
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
        style={{ minHeight: '50vh', paddingBottom: '0px' }} // Remove extra bottom padding
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
            <span className="text-[#5B869D] block">What Our</span>
            <span className="text-[#021637]">Customers Says!!</span>
          </motion.h2>
          <motion.p
            className="mb-6 text-base text-[#5B869D] max-w-xl break-words"
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
                        width: 180,
                        height: 180,
                        borderColor: '#d7e9f5',
                        background: 'linear-gradient(180deg, #eaf7ff 0%, #d7e9f5 100%)',
                        marginRight: 16,
                        padding: 4,
                      }}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
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
                      marginTop: 25, // 25
                      boxShadow: '0 3px 24px 0 rgba(56,158,215,0.11)',
                    }}
                   >
                    
                    <div className="absolute -top-8 left-1 z-20 flex gap-2">
                      {/* LinkedIn: only show if NOT id 2 */}
                      {testimonial.linkedin && testimonial.id !== 2 && (
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

                      {/* Custom icons for id:2 (Maxim Bishop) */}
                      {testimonial.id === 2 && (
                        <>
                          {/* Globe Website icon */}
                          <div className=" absolute flex gap-1">
                          <a
                            href="https://gopiayurveda.shop/"
                            aria-label="Website"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={iconWrapperStyle}
                          >
                            <div
                              style={{
                                width: 24,
                                height: 24,
                            
                                borderRadius: "50%",
                                border: "2px solid #fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 8,
                                fontWeight: "bold",
                                color: "#fff",
                              }}
                            >
                              www
                            </div>
                          </a>

                          {/* Instagram icon (lucide-react) */}
                          <a
                            href="https://www.instagram.com/expandtheblisslondon"
                            aria-label="Instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={iconWrapperStyle}
                          >
                            <Instagram size={24} color="#ffffff" />
                          </a>
                          

                          </div>
                        </>
                      )}

                      {/* Email for id:1 only */}
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
              className="text-[#5B869D] -mt-4 text-base font-medium cursor-pointer"
              style={{ textDecoration: 'none', fontWeight: 400, fontSize: 18, marginTop: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/*see more.... */}
            </motion.button>
          ) : (
            <motion.button
              onClick={handleHide}
              className="text-[#5B869D] text-base font-medium cursor-pointer"
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
      <div className="md:-mt-[50px] w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <img src="/images/curvy1.png" loading="lazy" alt="curvy" className="w-full h-auto object-cover" />
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
      image: "/images/blog2image.png" , 
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
          <span className="text-[#5B869D]"> Resources</span>
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
                      className="relative flex items-center justify-between border-2 border-[#5B869D] text-[#5B869D] font-medium px-6 py-2 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:bg-[#e6f4fb] transition-all duration-300 w-fit"
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
        
        <Card
            className="
              relative mx-auto max-w-full md:max-w-7xl lg:max-w-[90rem] 
              rounded-[20px]
              shadow-[inset_0px_4px_4px_#00000040,inset_0px_-4px_4px_#00000040]
              bg-gradient-to-b from-[#B1E3FF] to-[#FFFFFF]
              px-4 sm:px-8 md:px-12 lg:px-16
              py-12 sm:py-16 md:py-16
              my-0 md:my-12
              max-h-[800px] overflow-hidden
              z-10 overflow-visible"
          >

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
                <span className="text-[#5B869D]">NOW!!</span>
              </h1>
              <p className="font-semibold text-lg md:text-xl text-[#021637] mt-3">
                Hurry UP, Go Ahead
              </p>
            </motion.div>

            {/* Content Row */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
              {/* Animated Left Image */}
              <motion.div
                className="relative w-full md:w-[1300px] flex justify-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="md:mt-0 -mt-10 relative max-w-[320px] sm:max-w-[360px] md:max-w-[600px] w-full h-[618px]  rounded-[50%]">
              <img
                className="absolute md:w-[130%] md:h-[55%] top-10 md:-left-[6%] rounded-2xl"
                alt="frost kit"
                src="/images/kit.jpg"
                loading="lazy"
              />
             </div>
              </motion.div>

              {/* Animated Text + Buttons */}
              <motion.div
                className="w-full md:w-full px-2 md:px-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="md:ml-20 md:-mt-52 -mt-[380px]">
                <h2 className="font-semibold text-3xl md:text-4xl text-[#FFFFFF] mb-4">
                  <span className="text-[#021637]">Let&apos;s Get in Touch!!</span>
                </h2>
                <p className="text-base md:text-lg text-[#021637] max-w-lg">
                  We’d love to hear from you whether it’s a question, feedback,
                  or just a hello. Let’s build a healthier future together, one sip at a time.
                </p>
                </div>

                {/* Buttons */}
                <div className="mt-10 md:ml-8 flex flex-col gap-8 items-center relative">
                  {[{ label: "Pre Launch", link: "/prelaunch" }, { label: "Get in Touch", link: "#contact" }].map((btn) => (
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
                          <div className="absolute inset-0 bg-[#5B869D33] rounded-[40px] border-[5px] border-[#b1e3ff] z-0" />
                          <div className="relative z-10 h-14 md:h-16 w-full bg-[#5B869D] text-white text-lg md:text-xl font-medium flex items-center justify-between px-6 rounded-[40px] shadow-[1px_4px_12.8px_#00000040]">
                            {btn.label === "Pre Launch" ? ( 
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
              className="
                absolute
                bottom-[-100px] sm:bottom-[-60px] md:bottom-12
                right-[-20px] sm:right-[-40px] md:-right-20
                w-[220px] h-[180px]
                sm:w-[260px] sm:h-[220px]
                md:w-[360px] md:h-[320px]
                z-20 pointer-events-none
              "
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ pointerEvents: 'none' }}
            >

              {/* Big Circles */}
              <div className="absolute bottom-0 right-0 scale-75 sm:scale-90 md:scale-100 w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[240px] md:h-[240px]">
                <div className="absolute inset-0 bg-[#b1e3ff88] rounded-full"></div>
                <div className="absolute inset-[10px] md:inset-[20px] bg-[#7ad6fb88] rounded-full"></div>
                <div className="absolute inset-[24px] md:inset-[60px] bg-[#5B869D] rounded-full"></div>
              </div>
              {/* Small Circles */}
              <div className="absolute top-32 left-24 sm:top-16 sm:left-24 md:top-60 md:left-30 w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[120px] md:h-[120px]">
                <div className="absolute inset-0 bg-[#b1e3ff88] rounded-full"></div>
                <div className="absolute inset-[5px] md:inset-[12px] bg-[#7ad6fb88] rounded-full"></div>
                <div className="absolute inset-[10px] md:inset-[30px] bg-[#5B869D] rounded-full"></div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};


//Contact US Section
const ContactSection = () => {
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxv_rlA8zUYbhhN8PuMVbcoh0mhXzlWAetJA9EH8qAGAd3Ya4myK8tt1h3yPFZ3d2TN/exec";

      const MASTER_GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxqXNa5d1oYF9yiHJpsxtv6sdtV0KsdGUSg_2oSe--dHl4YIe7tPCYHZzeBsIojmqXt/exec";

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
  
  
 const validateEmail = (email) => {
  // Basic structure check
  const regex = /^[^\s@]+@[^\s@]+\.[A-Za-z.]{2,}$/;
  if (!regex.test(email)) return false;

  // Full valid TLD list (master list)
  const validTLDs = new Set([
    // Global & generic TLDs
    "com","org","net","info","biz","xyz","dev","app","pro","me","name",
    "online","site","tech","store","ai","io","cloud","digital","media",

    // Country-code TLDs
    "in","us","uk","ca","au","nz","de","fr","jp","sg","ae","sa","pk","lk",
    "bd","cn","es","it","nl",

    // Multi-level Indian
    "co.in","org.in","net.in","ac.in","gov.in","nic.in",

    // Multi-level UK
    "co.uk","org.uk","ac.uk",

    // More
    "co.za","co.jp","com.au","com.sg","com.pk"
  ]);

  // Split email
  const parts = email.toLowerCase().split("@")[1].split(".");

  // Build possible TLDs
  const tld1 = parts[parts.length - 1];                       // "com"
  const tld2 = parts.length >= 2 ? parts.slice(-2).join(".") : null; // "co.in"

  // Case 1: exact match (single TLD)
  if (validTLDs.has(tld1)) return true;

  // Case 2: exact match (multi-level TLD)
  if (tld2 && validTLDs.has(tld2)) return true;

  // ❌ Anything else → invalid (prevents "aiiiii", "commm", etc.)
  return false;
};


const CHEERIO_API_KEY =
  "dfd7bcf44867df2f37bccce492a2368dcb0d9cdcd5963dd47acd270de09208ba";

const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, phone, query, message } = formData;

  // 1️⃣ Validation
  if (!name || !email || !phone || !query || !message) {
    toast({
      title: "All fields are required",
      description: "Please fill in every field before submitting.",
      variant: "destructive",
    });
    return;
  }

  // 2️⃣ Email validation
  if (!validateEmail(email)) {
    toast({
      title: "Invalid Email",
      description: "Please enter a valid email address.",
      variant: "destructive",
    });
    return;
  }

  setSubmitting(true);

  try {
    // 3️⃣ Google Sheet (UNCHANGED — sends all details)
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).catch(() => {});
   

    // a Master Email Sheet (EMAIL ONLY)
    fetch(MASTER_GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${encodeURIComponent(email)}&source=Contact Us`,
    }).catch(() => {});


    // 4️⃣ Cheerio Manual Workflow Trigger (UPDATED — email only)
    await fetch(
      "https://newprod.api.cheerio.in/direct-apis/v1/manualTriggerWorkflow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CHEERIO_API_KEY,
        },
        body: JSON.stringify({
          email: email,
          workflowId: "691d8c61dfc2664a0552732b",
        }),
      }
    );

    // 5️⃣ Success
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll be in touch soon.",
      variant: "default",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      query: "",
      message: "",
    });

  } catch (error) {
    console.error("Error submitting form:", error);
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
      className="bg-[#E3F6FF]
        container
        py-14 sm:py-10 lg:py-20
        px-4 sm:px-4 lg:px-8
        mt-0
        "
    >
      <div className="lg:-mt-10 max-w-6xl mx-auto">
        <motion.h2
          className="mb-8 md:mb-10 text-center text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#021637]"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h2 className=" text-left text-2xl md:text-3xl font-semibold text-[#021637] mb-2">
          Contact Us{" "}
          <span className="font-bold text-[#5B869D]">
          Will love to hear from you
          </span>
        </h2>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* <motion.h3
              className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#021637]"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              Get in Touch <span className="text-[#5B869D]">with Us</span>
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
            </motion.p> */}

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
                  className="rounded-lg bg-[#FFFFFF] px-5 py-3 text-[#115384] placeholder-[#115384] ring-[#115384] border-[#115384]"
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
                  className="rounded-lg bg-[#FFFFFF] px-5 py-3 text-[#021637cc] placeholder-[#021637cc] ring-[#115384] border-[#115384]"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                <Input
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                    setFormData((prev) => ({ ...prev, phone: onlyNums }));
                  }}
                  onPaste={(e) => {
                    const paste = e.clipboardData.getData("text");
                    if (!/^[0-9]+$/.test(paste)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Phone Number"
                  required
                  className="rounded-lg bg-[#FFFFFF] px-5 py-3 text-[#021637] placeholder-[#021637] ring-[#115384] border-[#115384]"
                />
              </motion.div>


              <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                <Input
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="Query"
                  required
                  className="rounded-lg bg-[#FFFFFF] px-5 py-3 text-[#021637] placeholder-[#021637] ring-[#115384] border-[#115384]"
                />
              </motion.div>

              <motion.div className="sm:col-span-2" whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Feedback"
                  className="h-36 w-full rounded-lg bg-[#FFFFFF] px-5 py-4 text-base text-[#021637] placeholder-[#021637] ring-[#115384] border-[#115384]"
                  required
                />
              </motion.div>

              <motion.div className="sm:col-span-2" {...buttonTap}>
                <Button
                  type="submit"
                  className="w-full rounded-lg bg-[#5B869D] py-3 text-center text-lg font-medium text-white transition"
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
            <div className="mt-8 lg:-mt-20">
              <img
                src="/images/contactimg1.jpeg"
                width={520}
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


// STORY Section
const Story = () => {
  const videos = [
    "/videos/video3.mp4",
    "/videos/video2.mp4",
    "/videos/video4.mp4",
    "/videos/video1.mp4",
  ];

  // Thumbnail images (only for 2nd & 4th video)
  const thumbnails = [
    null,
    "/images/video2thumb.png", // 👉 add your 2nd video thumbnail
    null,
    "/images/video4thumb.png", // 👉 add your 4th video thumbnail
  ];

  const instaLinks = [
    "https://www.instagram.com/frost_active?igsh=MXA3N2FoYXY2aDBpbQ%3D%3D&utm_source=qr",
    "https://www.instagram.com/frost_espana?igsh=MXQ1NnBmc2V2M2V2Ng%3D%3D&utm_source=qr",
    "https://www.instagram.com/frost.deutschland?igsh=MW5sajVqNGtlZ2Q1eQ%3D%3D&utm_source=qr",
    "https://www.instagram.com/frost_portugal?igsh=em0ydzZoa2F0NmJy&utm_source=qr",
  ];

  return (
    <section className="bg-[#F6FCFF] py-12 px-6 md:px-16 relative">
      <h2 className="text-2xl md:text-3xl mb-10">
        <span className="text-[#021637] font-bold">Know </span>
        <span className="text-[#5B869D] font-bold">Our Story</span>
      </h2>

      {/* DESKTOP */}
      <div className="-mt-4 hidden md:block overflow-hidden">
        <div className="flex justify-between gap-5">
          {videos.map((src, i) => (
            <div key={i} className="w-1/4 flex flex-col items-center">
              <div className="bg-white rounded-2xl shadow-md p-2 w-full">
                <video
                  src={src}
                  controls
                  poster={thumbnails[i] || undefined}
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>

              <div className="mt-3 flex justify-start w-full">
                <a href={instaLinks[i]} target="_blank" rel="noreferrer">
                  <img
                    src="/images/insta.svg"
                    className="w-10 h-10 opacity-80 hover:opacity-100 transition"
                    alt="Instagram"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex gap-6 overflow-x-scroll snap-x snap-mandatory no-scrollbar">
        {videos.map((src, i) => (
          <div key={i} className="min-w-[80%] snap-start">
            <div className="bg-white rounded-2xl shadow-md p-2">
              <video
                src={src}
                controls
                poster={thumbnails[i] || undefined}
                className="w-full h-auto rounded-2xl"
              />
            </div>

            <div className="mt-3">
              <a href={instaLinks[i]} target="_blank" rel="noreferrer">
                <img
                  src="/images/insta.svg"
                  className="w-10 h-10 opacity-80 hover:opacity-100 transition"
                  alt="Instagram"
                />
              </a>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};


//NEW Testimonials 2
const Testimonials2 = () => {
  const data = [
    {
      img: "/images/maxim1.svg",
      name: "Maxim Bishop (HG Maitreya Rishi Dasa)",
      title: "Temple President BLISS, South London",
      date: "May 20, 2025",
      desc: `Everybody drinks water. But did you know you can become spiritual by drinking water?FROST transforms our water into a spiritual beverage by vibrating special frequencies. Sometimes, we need a reminder to stretch or to take medication. Everyone needs a break from work sometimes. FROST keeps us well by making sure we don't forget.`,
    },
    {
      img: "/images/aitana1.png",
      name: "Aitana",
      title: "Software Engineer, Spain",
      date: "June 18, 2025",
      desc: `Even in its early stage, Frost Aura is already making a difference. As a Software Engineer juggling multiple campaigns, I often struggle to stay centered.The MVP’s subtle lighting cues and basic breathing guidance have helped me refocus during high-pressure moments. It’s a promising start—and the clean, minimal design already feels like a natural fit on my desk`,
    },
    {
      img: "/images/khushi.jpg",
      name: "Khushi",
      title: "Junior Project Manager, Bengaluru",
      date: "July 10, 2025",
      desc: `I didn’t realize how often I was forgetting to drink water until I started using Frost Aura. The gentle glow on my desk is such a calming reminder it doesn’t interrupt my work.But it nudges me just when I need it. Within the first week, I was drinking more, feeling less tired in the afternoons, and even started using the breathing reminders during stressful meetings. It’s honestly the smartest upgrade I’ve made to my workspace.`,
    },
    {
      img: "/images/channegowda.jpg",
      name: "Channegowda",
      title: "Cloud Devops Engineer, Bengaluru",
      date: "Sep 05, 2025",
      desc: `I’ve been working remotely for the past six months, and I slowly realized I wasn’t hydrating enough or moving at all during the day. Even though I have a smartwatch, I really wanted something physical something made just for wellness, not just time or steps. Frost Aura changed that completely. The glow reminds me to sip water, stretch, and breathe. It’s like a quiet little coach on my desk.`,
    },
  ];

  return (
    <div className=" bg-[#FFFFF] w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12 lg:px-14 font-['Roboto'] py-8 sm:py-10 lg:py-10">
      {/* Heading */}
      <h2 className="text-[#021637] text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold mb-5 sm:mb-8 lg:mb-12">
        Testimonials{" "}
        <span className="text-[#5B869D] font-bold">
          See what our customers say!
        </span>
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 lg:gap-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-[20px] shadow-[0_4px_30px_rgba(0,0,0,0.08)] p-5 sm:p-7 lg:p-8 flex flex-col transition ease-in-out hover:shadow-lg focus:shadow-lg"
            tabIndex={0}
          >
            {/* Profile Row */}
            <div className="flex items-center gap-3 sm:gap-5 mb-4">
              <img
                src={item.img}
                alt={`Photo of ${item.name}`}
                className="w-12 h-12 sm:w-20 sm:h-20 rounded-full object-cover object-center border border-gray-100"
                loading="lazy"
              />
              <div>
                <div className="text-[15px] sm:text-[17px] lg:text-[18px] font-bold text-[#021637]">{item.name}</div>
                <div className="text-[13px] sm:text-[15px] text-[#021637]">{item.title}</div>
                <div className="text-[11px] sm:text-[13px] text-[#ADADAD] mt-1 font-bold">
                  {item.date}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-200 mb-3"></div>

            {/* Description */}
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-gray-700 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};



const InstagramReels = () => {
  const reels = [
    "https://www.instagram.com/reel/DQuYBdfk6wS/embed",
    "https://www.instagram.com/reel/DQt_j2QjwK6/embed",
    "https://www.instagram.com/reel/DQuYBdfk6wS/embed", // duplicate to show 3 slides — replace with new one later
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-12 text-center">
      {/* Section Heading */}
       <h2 className=" text-left text-2xl md:text-3xl font-semibold text-[#021637] mb-2">
          Testimonials{" "}
          <span className="font-normal text-[#5B869D]">
          See what out customers say!
          </span>
        </h2>

      {/* Carousel */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop
        className="max-w-7xl mx-auto"
      >
        {reels.map((reel, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-black">
              <iframe
                src={reel}
                width="100%"
                height="480"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                className="w-full h-[480px]"
              ></iframe>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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

    <HomeBanner2/>
   {/* HomeBanner */}
    <Features/>
    <Reminder/>
    <TechnicalSpecifications />
    {/* <FeaturesSection/> */}
    {/*HeroBanner /> */}
    {/* <KeyFeaturesSection/> */}
     {/* <KeyFeatures/> */}
    {/*<HowItWorksSection /> */}
    <GallerySection />
    <Testimonials2 />
    {/* <Testimonials /> */}
     <Story/>
     {/* TechnicalSpecification */}
    {/* <ComparisonFrost /> */}
    {/*<MeetOurTeamSection /> */}
  {/* <TestimonialsSection /> */}
  {/*<BlogSection /> */}
    {/*<TryItNowSection /> */}
    <ContactSection />
    {/* <InstagramReels /> */}
  </>
);
export default Home;