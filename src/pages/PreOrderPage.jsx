
import React, { useState } from "react";
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
    "/images/thumb11.png",
    "/images/thumb10.png",
    "/images/gif3.gif",
    "/images/thumb2.1.jpg",
    "/images/thumb3.1.jpg",
    "/images/thumb4.1.jpg",
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
         <div className="w-screen -ml-[calc((100vw-100%)/2)] border-b border-gray-200 flex justify-start">
          <div className="flex ml-4 md:ml-[60px]"> 
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-2 font-medium ${
                activeTab === "overview"
                  ? "border-b-2 border-[#389ED7] text-[#389ED7]"
                  : "text-[#021637]"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-6 py-2 font-medium ${
                activeTab === "faq"
                  ? "border-b-2 border-[#389ED7] text-[#389ED7]"
                  : "text-[#021637]"
              }`}
            >
              FAQ
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-4 text-sm text-gray-700 leading-relaxed">
          {activeTab === "overview" && (
            <div>
              <p>
                Frost Aura is the world’s first AI-powered hydration dock,
                designed to energize your water using natural healing
                frequencies. It’s not just hydration—it’s smarter,
                cleaner, and built for balance.
              </p>
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
