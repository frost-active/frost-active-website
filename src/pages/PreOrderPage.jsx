import React, { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence  } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router-dom";

const PreOrderPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // tab state
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState("/images/preorder.jpg");
  const thumbnails = [
    "/images/preorder.jpg", // First thumbnail same as main preorder image
    "/images/gallery3-2.jpg",
    // "/images/thumb11.png",
   // "/images/thumb10.png",
    
    "/images/thumb12.jpg",
   "/images/thumb13.jpg",
   "/images/thumb4.1.png",
    "/images/gif3.gif",
   
    // "/images/thumb3.1.jpg",
   
    "/images/gallery3-4.jpg",
     "/images/thumb2.png",
    // "/images/thumb5.jpg",
    // "/images/thumb7.jpg",
    
  ];

  // Google Sheet Script URL
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyXWe1qfAIiQWK9C1NRIKF3LbW_izrXivtcZoAIKa9g_-geUFAWIfq5dinc8ialkXM/exec";

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.(com|in|org|net|edu|gov|co|io)$/i.test(email);
  };

  const handleSubscribe = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}`,
      });

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        window.location.href = "/reserve";
      }, 1000);
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };




// FAQ Related Const and Google Sheet Link
  const [openIndex, setOpenIndex] = useState(null);
  const [form, setForm] = useState({ question: "", email: "" });
    
    const GOOGLE_SHEET_URL =
      "https://script.google.com/macros/s/AKfycbyawYwbLt3La9UhYhhNvkdDaID1ScUTeoV58S5qcTfGwlOPRxM2fDModKVyWmOW7Dz2YA/exec";
  
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
      setSuccess(false);
      try {
        const params = new URLSearchParams();
        params.append("question", form.question);
        params.append("email", form.email);
  
        await fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          body: params,
        });
        setShowModal(true); // open modal on successful submission
        setForm({ question: "", email: "" });
  
        // Automatically hide success message after 3 seconds
      setTimeout(() => {
        setShowModal(false);
      }, 10000);
  
      } catch (err) {
        alert("Failed to send. Try again.");
      }
      setLoading(false);
    };
  
    //  FAQ List  question and answer
    const faqs = [
      {
        question: "What does the $3 preorder mean?",
        answer: "Your $3 is a *refundable deposit* to secure your spot as an early backer of FROST Aura. This guarantees you access to the *lowest launch price* when the campaign goes live.",
      },
      {
        question: "Do I get the full product for $3?",
        answer: "No, this is a reservation fee, not the final product cost. When FROST launches, you’ll get an exclusive **early-bird discount* applied to your order.",
      },
      {
        question: "Is my $3 deposit refundable?",
        answer: "Yes ✅. If you decide not to back us later, you can request a *full refund anytime before the campaign ends*.",
      },
      {
        question: "When will FROST be available to purchase fully?",
        answer: "We are preparing for our *Indiegogo crowdfunding launch* soon. Preordering now ensures you’re first in line.",
      },
      {
        question: "How much will the full product cost?",
        answer: "The retail price will be around $120–$140, but early supporters who preorder with $3 will get access to **exclusive discounted pricing* at launch.",
      },
      {
        question: "What do I get for preordering?",
        answer: "* Guaranteed early-bird access* Locked-in lowest launch price* Priority updates on the campaign and production progress* Exclusive access to Frost Aura App _ Premium version for 6 months",
      },
      {
        question: "How will I know when it’s time to complete my purchase?",
        answer: "We’ll notify you via *email and WhatsApp* when the campaign goes live, with clear instructions to claim your early-bird offer.",
      },
      {
        question: "Where will you ship?",
        answer: "We plan to ship *worldwide 🌍*, with final shipping details and costs shared during the crowdfunding campaign.",
      },
      {
        question: "What happens if the campaign doesn’t succeed?",
        answer: "If for any reason the campaign doesn’t go forward, your $3 will be *refunded in full*.",
      },
      { question: "Why should I preorder now?",
        answer: "Preordering shows your support early, gives you the *best deal possible*, and helps us bring Frost to life faster.",
      },
    ];

   //Overview Tab - Image Gallery Related Code
   const images = [
    "/images/frost1.png",
    "/images/frost2.png",
    "/images/frost3.png",
    "/images/frost4.png",
    "/images/frost5.png",
    "/images/frost6.png",
    "/images/frost7.png",
    "/images/frost8.png",
  ];

   const n = images.length;
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // start in the middle copy
  const [index, setIndex] = useState(n);
  const indexRef = useRef(index);
  indexRef.current = index;

  const skipTransitionRef = useRef(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // calculate width (half container so 2 images always fit)
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const w = Math.floor(containerRef.current.clientWidth / 2);
      setSlideWidth(w);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // apply transform when index/slideWidth changes
  useEffect(() => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = skipTransitionRef.current
      ? "none"
      : "transform 600ms ease";
    trackRef.current.style.transform = `translateX(-${index * slideWidth}px)`;
    if (skipTransitionRef.current) skipTransitionRef.current = false;
  }, [index, slideWidth]);

  // reset after transition when we go too far
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onTransitionEnd = () => {
      setIsAnimating(false);
      if (indexRef.current >= 2 * n) {
        const newIndex = indexRef.current - n;
        skipTransitionRef.current = true;
        setIndex(newIndex);
      } else if (indexRef.current < n) {
        const newIndex = indexRef.current + n;
        skipTransitionRef.current = true;
        setIndex(newIndex);
      }
    };

    track.addEventListener("transitionend", onTransitionEnd);
    return () => track.removeEventListener("transitionend", onTransitionEnd);
  }, [n]);

  // manual navigation
  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => prev - 1);
  };

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => prev + 1);
  };

  // build extended slides for smooth loop
  const slides = [...images, ...images, ...images];

  const goToThumbnailPair = (i) => {
    skipTransitionRef.current = false;
    setIndex(n + i);
  };


  return (
    <div className="mt-[135px] font-['Roboto'] w-full min-h-screen bg-white flex flex-col items-center px-4 sm:px-6 md:px-10 xl:px-20">
      {/* Main Content Container */}
      <div className="w-full max-w-screen-2xl flex flex-col lg:flex-row items-start gap-10">
        {/* Left Image Side */}
         <div className="w-full lg:w-1/2 flex flex-col items-center">
      {/* Main Image */}
       <div className="w-full max-w-lg h-[350px] flex justify-center items-center">
      <img
        src={mainImage}
        alt="Frost Aura Hydration Dock"
        className="w-full h-full object-cover rounded-xl"
      />
      </div>

      {/* Thumbnails */}
      <div className="flex flex-row flex-wrap sm:flex-nowrap justify-center mt-4 gap-2">
        {thumbnails.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumbnail ${index + 1}`}
            className={`md:w-16 md:h-16 w-10 h-16 object-cover rounded border ${
              mainImage === src
                ? "border-2 border-[#389ED7]" // highlight selected
                : "border-gray-300"
            } cursor-pointer`}
            onClick={() => setMainImage(src)}
          />
        ))}
      </div>
    </div>

        {/* Right Text Side */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-[#021637]">
            FROST AURA:
            <br />
            The World's First AI-Powered Hydration Dock
          </h1>
          <p className="text-[#021637] text-sm mt-4 tracking-wider">
            Frost Aura is an AI-powered hydration dock that energises water
            using healing frequencies.
            <br />
            Your smart wellness bot for better hydration, focus, and balance.
          </p>

          {/* Email Subscription */}
          <div className="mt-20 w-full flex flex-col items-center lg:items-start gap-4">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setError("")}
              className="border border-gray-300 px-4 py-2 rounded w-full sm:w-4/5 md:w-[480px]"
            />

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className={`px-6 py-2 rounded w-full sm:w-4/5 md:w-[480px] ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-[#389ED7] text-white"
              }`}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && (
              <p className=" text-[#021637] font-semibold">
                ✅ Thank You for Subscribing!
              </p>
            )}
          </div>
          </div>
         </div>

          {/* Tabs Section */}
          <div className="w-full mt-8">
         {/* Full width border line with tabs inside */}
         <div className="w-screen -ml-[calc((100vw-100%)/2)] flex justify-start bg-[#021637]">
          <div className="flex ml-4 md:ml-[60px]">
          <button
            onClick={() => setActiveTab("overview")}
            className={`relative px-6 py-2 font-medium text-white ${
              activeTab === "overview"
                ? "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[4px] after:border-b-2 after:border-white"
                : ""
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab("faq")}
            className={`relative px-6 py-2 font-medium text-white ${
              activeTab === "faq"
                ? "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[4px] after:border-b-2 after:border-white"
                : ""
            }`}
          >
            FAQ
          </button>
        </div>

        </div>

        {/* Tab Content */}
        <div className="mt-4 text-sm text-gray-700 leading-relaxed">
          {activeTab === "overview" && (
            
              <div className="-mt-4 w-full font-['Roboto'] text-gray-900">
      {/* Top Section */}
      <section className="text-center px-6 md:px-20 py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#021637]">
          Experience <br />
          the future of Wellness
        </h2>
        <p className="mt-4 text-base md:text-base text-[#021637] max-w-3xl mx-auto">
          Frost is more than just a docking station; it&apos;s your personal wellness
          companion, seamlessly integrating into your daily life to promote hydration,
          focus, and overall well-being. Discover the effortless way to elevate your routine.
        </p>
      </section>

      {/* Image Gallery */}
      <section className="relative">
        <div ref={containerRef} className="w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex"
            style={{
              width: `${slides.length * slideWidth}px`,
              willChange: "transform",
            }}
          >
            {slides.map((src, i) => (
              <div
                key={i}
                style={{
                  minWidth: slideWidth ? `${slideWidth}px` : "50%",
                  maxWidth: slideWidth ? `${slideWidth}px` : "50%",
                  boxSizing: "border-box",
                  padding: "8px",
                }}
              >
                <img
                  src={src}
                  alt={`Frost device ${i + 1}`}
                  className="w-full md:h-[480px] h-full object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute z-20 lg:-left-14 -left-4  top-1/2 -translate-y-1/2 lg:w-10 lg:h-10 w-7 h-7 rounded-full bg-white/80 hover:bg-white border border-[#008cd0] flex items-center justify-center shadow transition"
          style={{
            pointerEvents: isAnimating ? "none" : "auto",
            opacity: isAnimating ? 0.3 : 1,
          }}
        >
          <svg viewBox="0 0 13 20" width="22" height="22">
            <polyline
              points="10,3 3,10 10,17"
              stroke="#008CD0"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          onClick={nextImage}
          className="absolute z-20 lg:-right-14 -right-4 top-1/2 -translate-y-1/2 lg:w-10 lg:h-10 w-7 h-7 rounded-full bg-white/80 hover:bg-white border border-[#008cd0] flex items-center justify-center shadow transition"
          style={{
            pointerEvents: isAnimating ? "none" : "auto",
            opacity: isAnimating ? 0.3 : 1,
          }}
        >
          <svg viewBox="0 0 13 20" width="22" height="22">
            <polyline
              points="10,3 3,10 10,17"
              stroke="#008CD0"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              transform="rotate(180 6.5,10)"
            />
          </svg>
        </button>
      </section>

      {/* Thumbnails */}
      <div className="flex justify-center gap-3 mt-2 flex-wrap px-6">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => goToThumbnailPair(i)}
            className="focus:outline-none"
          >
            <img
              src={src}
              alt={`Thumbnail ${i + 1}`}
              className="md:w-24 md:h-24 w-7 h-7 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-[#389ED7] transition-transform duration-200 hover:scale-110"
            />
          </button>
        ))}
      </div>

      {/* Key Highlights */}
      <section className="mt-6 w-screen -ml-[calc((100vw-100%)/2)] bg-[#021637] text-white py-12 px-6 md:px-20 text-center">
        <h3 className="text-xl md:text-2xl font-semibold mb-10">Key Highlights</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white text-gray-900 rounded-lg p-6 shadow-lg">
            <h4 className="text-lg font-semibold mb-2 leading-tight">
              <span className="block">Universal</span> Compatibility
            </h4>
            <p className="text-sm">
              Designed to work with any cup or bottle, Frost ensure your favourite
              drink-ware becomes smart, without needing specialised containers.
            </p>
          </div>

          <div className="bg-white text-gray-900 rounded-lg p-6 shadow-lg">
            <h4 className="text-lg font-semibold mb-2 leading-tight">
              <span className="block">Smart Hydration</span> Tracking
            </h4>
            <p className="text-sm">
              Sensors monitor your intake and provide personalised reminders
              to keep you hydrated and energised throughout the day.
            </p>
          </div>

          <div className="bg-white text-gray-900 rounded-lg p-6 shadow-lg">
            <h4 className="text-lg font-semibold mb-2 leading-tight">
              <span className="block">Wellness</span> Ecosystem
            </h4>
            <p className="text-sm">
              Connects with the Frost app to configure wellness program, from mindfulness
              exercise to posture reminders, promoting holistic health.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-white text-[#0B1B3A] px-6 py-3 rounded-lg font-medium shadow-md hover:bg-gray-200 transition"
          >
            Secure Your Frost Device Now
          </button>
        </div>
      </section>
    </div>
          )}
          {activeTab === "faq" && (
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
        </section>
      )}
        </div>
      </div>


      {/* Footer Banner */}
      <div className="w-[1500px] bg-[#389ED7] text-white text-center md:text-lg mt-10 py-3 px-4 rounded-lg overflow-hidden group relative">
        <div className="scroll-wrapper whitespace-nowrap inline-block group-hover:[animation-play-state:paused]">
          <span className="mx-3">100% Money-Back Guarantee</span>
          <span className="mx-3">||</span>
          <span className="mx-3">Risk-Free Commitment</span>
          <span className="mx-3">||</span>
          <span className="mx-3">Cancel anytime before launch</span>
          <span className="mx-3">||</span>
          <span className="mx-3">No strings attached</span>
          <span className="mx-3">||</span>
          <span className="mx-3">Just Attention</span>
        </div>
      </div>
    </div>
  );
};

export default PreOrderPage;
