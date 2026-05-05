import React, { useEffect, useRef, useState } from "react";
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from "react-router-dom";


const HomePage = () => {

  /* ---------------- PRODUCTIVE GIF SECTION ---------------- */
  const [activeGif, setActiveGif] = useState(1);


    // PRODUCTIVE Mobile Swipe Logic
    const [touchStartX, setTouchStartX] = useState(0);
        const [touchEndX, setTouchEndX] = useState(0);

        const handleTouchStart = (e) => {
        setTouchStartX(e.targetTouches[0].clientX);
        };

        const handleTouchMove = (e) => {
        setTouchEndX(e.targetTouches[0].clientX);
        };

        const handleTouchEnd = () => {
        const distance = touchStartX - touchEndX;

        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            // Swiped Left → Next Slide
            setActiveGif((prev) => (prev + 1) % gifList.length);
        } else if (distance < -minSwipeDistance) {
            // Swiped Right → Previous Slide
            setActiveGif((prev) =>
            prev === 0 ? gifList.length - 1 : prev - 1
            );
        }
        };


  const gifList = [
    "/gifs/gif1.mp4", // LEFT GIF
    "/gifs/gif2.mp4", // CENTER GIF
    "/gifs/gif3.mp4", // RIGHT GIF
    "/gifs/gif4.mp4", // RIGHT GIF

  ];


//CONTACT US FORM LOGIC and INTEGRATIONS
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxv_rlA8zUYbhhN8PuMVbcoh0mhXzlWAetJA9EH8qAGAd3Ya4myK8tt1h3yPFZ3d2TN/exec";

  const MASTER_GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxqXNa5d1oYF9yiHJpsxtv6sdtV0KsdGUSg_2oSe--dHl4YIe7tPCYHZzeBsIojmqXt/exec";

  const CHEERIO_API_KEY =
    "dfd7bcf44867df2f37bccce492a2368dcb0d9cdcd5963dd47acd270de09208ba";

  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= EMAIL VALIDATION =================
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

    if (validTLDs.has(tld1)) return true;
    if (tld2 && validTLDs.has(tld2)) return true;

    return false;
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, query, message } = formData;

    if (!name || !email || !phone || !query || !message) {
      toast({
        title: "All Fields Required",
        description: "Please complete all fields before submitting the form.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email Address",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // 1️⃣ Send full form to Google Sheet
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch(() => {});

      // 2️⃣ Send email to Master Sheet
      fetch(MASTER_GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}&source=Contact Us`,
      }).catch(() => {});

      // 3️⃣ Trigger Cheerio workflow
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

      // ✅ SUCCESS MESSAGE (Professional)
      toast({
        title: "Message Successfully Sent",
        description:
          "Thank you for contacting us. Our team has received your message and will get back to you at the earliest possible time.",
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
      toast({
        title: "Submission Failed",
        description:
          "We encountered an issue while submitting your request. Please try again shortly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };


  /* ---------------- AI CUSTOMISE SECTION ---------------- */
const [activeAI, setActiveAI] = useState(2);

  const aiImages = [
    "/images/ai1.svg",
    "/images/ai2.svg",
    "/images/ai3.svg",
    "/images/ai4.svg",
    "/images/ai5.svg",
  ];
  const [touchStartX1, setTouchStartX1] = useState(null);
  const [touchEndX1, setTouchEndX1] = useState(null);

const isMobile = window.innerWidth <= 768; // mobile breakpoint
const swipeThreshold = 50; // minimum swipe distance

  const handleTouchStart1 = (e) => {
  if (!isMobile) return;
  setTouchEndX(null);
  setTouchStartX1(e.targetTouches[0].clientX);
};

const handleTouchMove1 = (e) => {
  if (!isMobile) return;
  setTouchEndX1(e.targetTouches[0].clientX);
};

const handleTouchEnd1 = () => {
  if (!isMobile || !touchStartX1 || !touchEndX1) return;

  const distance = touchStartX1 - touchEndX1;

  if (distance > swipeThreshold) {
    // Swiped Left → Next
    setActiveAI((prev) => (prev + 1) % aiImages.length);
  } else if (distance < -swipeThreshold) {
    // Swiped Right → Previous
    setActiveAI((prev) =>
      prev === 0 ? aiImages.length - 1 : prev - 1
    );
  }
};


  /* ---------------- VIDEO AUTOPLAY WHEN IN VIEW ---------------- */
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play();
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);


   // ================= TYPEWRITER EFFECT for HERO BANNER  =================
  const fullText = "FOCUS || CALM || FLOW";
    const [displayText, setDisplayText] = React.useState("");
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [charIndex, setCharIndex] = React.useState(0);

    React.useEffect(() => {
      const typingSpeed = isDeleting ? 40 : 80; // delete faster, type smoother
      const pauseTime = 1000;

      const timeout = setTimeout(() => {
        if (!isDeleting && charIndex < fullText.length) {
          setDisplayText(fullText.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else if (!isDeleting && charIndex === fullText.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && charIndex > 0) {
          setDisplayText(fullText.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
        }
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }, [charIndex, isDeleting]);  



    // ================= EMAIL SUBSCRIBE LOGIC OF HERO BANNER ================= 

    const navigate = useNavigate();
    const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [city, setCity] = useState("");
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState(false);
const [isFocused, setIsFocused] = useState(false);

const GOOGLE_SCRIPT =
  "https://script.google.com/macros/s/AKfycbyXWe1qfAIiQWK9C1NRIKF3LbW_izrXivtcZoAIKa9g_-geUFAWIfq5dinc8ialkXM/exec";

const MASTER_GOOGLE_SCRIPT =
  "https://script.google.com/macros/s/AKfycbxqXNa5d1oYF9yiHJpsxtv6sdtV0KsdGUSg_2oSe--dHl4YIe7tPCYHZzeBsIojmqXt/exec";


const validateEmails = (email) => {
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
  // ================= NAME VALIDATION =================
  if (!name || name.trim() === "") {
    setError("Name is required.");
    return;
  }

  // ================= EMAIL VALIDATION (UNCHANGED) =================
  if (!validateEmails(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  setError("");
  setLoading(true);

  try {
    // ================= GOOGLE SHEET 1 (ALL DETAILS) =================
    fetch(GOOGLE_SCRIPT, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `name=${encodeURIComponent(name)}&phone=${encodeURIComponent(
        phone
      )}&city=${encodeURIComponent(city)}&email=${encodeURIComponent(email)}`,
    }).catch(() => {});

    // ================= GOOGLE SHEET 2 (ONLY EMAIL) =================
    fetch(MASTER_GOOGLE_SCRIPT, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${encodeURIComponent(email)}&source=Pre Launch`,
    });

    // ================= CHEERIO (EMAIL ONLY) =================
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
          email, // ✅ ONLY EMAIL
          workflowId: "691d8bd1024212623f2b31b8",
        }),
      }
    );

    // ================= LOCAL STORAGE =================
    localStorage.setItem("frost_email", email);
    localStorage.setItem("frost_name", name);

    setSuccess(true);

    // Reset fields
    setName("");
    setPhone("");
    setCity("");
    setEmail("");

    // Navigate after 1 second
    setTimeout(() => navigate("/reserve"), 1000);

  } catch (err) {
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

   return (
    <div style={{ fontFamily: "Rethink Sans, sans-serif" }}>
      

     {/* ================= HERO SECTION ================= */}
    <section
  className="hero-section lg:mt-0 mt-10"
  style={{
    background:
      "linear-gradient(to right, #ECF8FF 0%, #F9FCFE 15%, #009AFF 100%)",
    padding: "clamp(60px, 8vw, 120px) 20px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <div
    style={{
      maxWidth: "1200px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "60px",
      flexWrap: "wrap",
    }}
  >
    {/* LEFT IMAGE */}
    <div style={{ flex: "0 1 550px", display: "flex", justifyContent: "center" }}>
      <img
        src="/images/heroimage1.svg"
        alt="Frost Aura Product"
        style={{
          width: "100%",
          maxWidth: "600px",
        }}
      />
    </div>

    {/* RIGHT CONTENT */}
    <div
      style={{
        flex: "0 1 500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "20px",
      }}
    >
      <h1 className="lg:mt-0 -mt-12 text-white text-[clamp(2rem,5vw,2rem)] font-semibold">
        Coming Soon.
      </h1>

      <p className="lg:mt-0 -mt-2 text-white text-[clamp(1rem,2vw,1.4rem)] max-w-[90%]">
        Your Desk&apos;s intelligent wellness companion
      </p>

      {/* Progress */}
      <div className="w-full max-w-[90%] lg:-mt-2 -mt-3">
        <div className="relative w-full h-[45px] rounded-full border-2 border-white flex items-center overflow-hidden">
          <div className="absolute left-1 top-1 bottom-1 w-[65%] bg-white rounded-full" />
          <span className="absolute left-4 text-sm text-gray-600 z-10">
            Loading...
          </span>
          <span className="absolute right-4 text-sm text-white z-10">
            75%
          </span>
        </div>
      </div>

      {/* FORM */}
    {/* FORM */}
<div className="lg:mt-12 form-container">
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleSubscribe();
    }}
    className="w-full flex flex-col gap-4"
  >
    {/* NAME (60% DESKTOP ONLY) */}
    <input
      type="text"
      placeholder="Name *"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="input-style name-input"
    />

    {/* PHONE + CITY */}
    <div className="flex gap-4 w-full responsive-row">
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="input-style flex-4"
      />

      <input
        type="text"
        placeholder="City *"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        className="input-style flex-4"
      />
    </div>

    {/* EMAIL + BUTTON */}
    <div className="flex w-full responsive-row email-row">
      <input
        type="email"
        placeholder="Email *"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        className="input-style flex-4 email-input"
      />

      <button
        type="submit"
        disabled={loading}
        className="subscribe-btn overlap-btn"
      >
        {loading ? "..." : "Subscribe"}
      </button>
    </div>
  </form>

  {/* ERROR */}
  {error && <p className="error-msg">{error}</p>}

  {/* SUCCESS */}
  {success && (
    <p className="success-msg">Successfully submitted!</p>
  )}
</div>
    </div>
  </div>

  {/* STYLES */}
  <style>{`
    /* ================= FORM CONTAINER ================= */
    .form-container {
      width: 100%;
      max-width: 90%;
      position: relative;
      padding-bottom: 30px; /* reserve space for error */
    }

    /* ================= INPUT ================= */
    .input-style {
      width: 100%;
      height: 45px;
      padding: 0 16px;
      border-radius: 4px;
      background: #cbf2ff;
      color: #021637;
      outline: none;
      font-size: 14px;
    }
     .input-style::-webkit-input-placeholder {
  color: #021637;
}
    /* ================= BUTTON ================= */
    .subscribe-btn {
      background: #021637;
      color: white;
      padding: 0 20px;
      border-radius: 0px !important;
      font-weight: 500;
      cursor: pointer;
      transition: 0.3s;
      
    }

    .subscribe-btn:hover {
      background: #032a5e;
    }

    /* ================= ERROR ================= */
    .error-msg {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      color: red;
      font-size: 13px;
      white-space: nowrap;
    }

    .success-msg {
      text-align: center;
      color: #00ffae;
      font-size: 13px;
      margin-top: 8px;
    }

    /* ================= MOBILE ================= */
    @media (max-width: 900px) {
      .hero-section {
        background: linear-gradient(
          to bottom,
          #ECF8FF 0%,
          #F9FCFE 4%,
          #009AFF 100%
        ) !important;
      }

      .responsive-row {
        flex-direction: column;
      }

      .input-style {
        width: 100%;
        height: 40px;
        border-radius: 4px;
        text-align: center;
      }

      .subscribe-btn {
        width: 100%;
        height: 50px;
        border-radius: 4px !important;
        margin-top: 10px;
      }

      .email-row {
    flex-direction: column;
  }

  /* EMAIL FIELD */
  .email-input {
    min-height: 45px;
    height: 55px;
  }

  /* BUTTON */
  .subscribe-btn {
    min-height: 55px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
    }


    /* NAME FIELD CONTROL */
.name-input {
  width: 100%;
}

/* EMAIL ROW */
.email-row {
  display: flex;
  width: 100%;
}

/* EMAIL INPUT */
.email-input {
  border-radius: 4px;
  flex: 0.55 ;   /* 👈 smaller */
}

/* BUTTON BIGGER */
.overlap-btn {
  flex: 0.45 ;   /* 👈 bigger */
  margin-left: -10px; /* slight overlap like design */
  z-index: 2;
  border-radius: 8px;
  padding: 0 20px;
}

/* DESKTOP ONLY */
@media (min-width: 901px) {
  .name-input {
    width: 60%;
  }
}

/* MOBILE */
@media (max-width: 900px) {
  .overlap-btn {
    margin-left: 0;
    width: 100%;
    margin-top: 10px;
    flex: 4
  }
}
  `}</style>
</section>

      {/* ================= HYDRATION SECTION ================= */}
      <section
      id="features"
      className="-mt-8 lg:-mt-20"
        style={{
          background: "#E6F6FF",
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <h2
        className="-mt-8 text-xl md:text-3xl lg:text-4xl text-foreground mb-2"
          style={{
            letterSpacing: "6px",
            color: "#41587E",
          }}
        >
          KEEP YOURSELF HYDRATED
        </h2>

        <p 
        className="text-xs md:text-sm mb-8"
        style={{ letterSpacing: "4px", marginTop: "10px" }}>
          WITH GENTLE REMINDERS
        </p>

        <div style={{ marginTop: "50px",
          display: "flex",              // center horizontally
          justifyContent: "center",
          alignItems: "center",
          width: "100%", }}>
          <video
            ref={videoRef}
            src="/videos/hydration.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            style={{
            width: "100%",
            maxWidth: "900px",
            borderRadius: "20px",
            }}
            />
        </div>
      </section>

      {/* ================= PRODUCTIVE SECTION ================= */}
      <section
      className="-mt-8"
        style={{
          background: "#E2EFF7",
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <h2 
        className="-mt-8 text-xl md:text-3xl lg:text-4xl text-foreground mb-4"
        style={{ letterSpacing: "6px", color: "#41587E" }}>
          KEEP YOURSELF PRODUCTIVE
        </h2>

        <p 
        className="text-xs md:text-sm mb-20"
        style={{ letterSpacing: "4px", marginTop: "10px" }}>
          WITH PERFECTLY TIMED SOLUTIONS
        </p>

        <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
            position: "relative",
            width: "100%",
            maxWidth: "1000px",
            height: "480px",
            margin: "60px auto 0",
            touchAction: "pan-y", // prevents scroll conflict
        }}>
        {gifList.map((video, index) => {
          const total = gifList.length;
          const diff = (index - activeGif + total) % total;

          let position = 3;
          if (diff === 0) position = 0;
          else if (diff === 1) position = 1;
          else if (diff === total - 1) position = -1;

          const baseStyle = {
        position: "absolute",
        top: "50%",
        transition: "all 0.6s cubic-bezier(.22,1,.36,1)",
        borderRadius: "30px",
        cursor: "pointer",

  // ✅ NEW BORDER ADDED
      border: "1px solid #021637",   // thin dark blue border
      boxSizing: "border-box",       // prevents size shift
    };

    const styles = {
  0: {
    left: "50%",
    transform: "translate(-50%, -50%) scale(1)",
    width: "650px",   // 🔥 increased from 480px
    zIndex: 30,
    opacity: 1,
  },
  1: {
    left: "calc(50% + 170px)", // slight adjustment
    transform: "translate(0, -50%) scale(0.9)", // slightly bigger
    width: "500px",   // 🔥 increased from 400px
    zIndex: 20,
    opacity: 0.6,
  },
  "-1": {
    left: "calc(50% - 620px)", // adjusted for spacing
    transform: "translate(0, -50%) scale(0.9)",
    width: "500px",   // 🔥 increased from 400px
    zIndex: 20,
    opacity: 0.6,
  },
  3: {
    left: "50%",
    transform: "translate(-50%, -50%) scale(0.6)", // slightly larger
    width: "240px",   // increased from 200px
    zIndex: 0,
    opacity: 0,
  },
};
    return (
      <video
      className="lg:-mt-20 -mt-44"
      
        key={index}
        src={video}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        onClick={() => setActiveGif(index)}
        style={{ ...baseStyle, ...styles[position] }}
      />
    );
  })}
</div>

        {/* Dots */}
        <div 
        className="lg:-mt-24 -mt-[280px]">
        <div 
        style={{ marginTop: "0px", display: "flex", justifyContent: "center", gap: "10px" }}>
          {gifList.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveGif(i)}
              style={{
                height: "8px",
                width: activeGif === i ? "30px" : "8px",
                borderRadius: "20px",
                background: "#41587E",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
        </div>
      </section>


      
     {/* ================= CUSTOMISE AI SECTION ================= */}
<section
className="-mt-10"
  style={{
    background: "#D2E3EE",
    padding: "120px 20px",
    textAlign: "center",
    overflow: "hidden",
  }}
>
  <h2
   className="-mt-12 text-xl md:text-3xl lg:text-4xl text-foreground mb-2"
    style={{
      letterSpacing: "6px",
      color: "#41587E",
      
    }}
  >
    CUSTOMISE FROST AURA WITH AI
  </h2>

  <p
  className="text-xs md:text-sm mb-10"
    style={{
      letterSpacing: "4px",
      marginTop: "16px",
      
    }}
  >
    AS PER YOUR CONVENIENCE
  </p>

  {/* Carousel */}
  <div
  style={{
    position: "relative",
    width: "100%",
    maxWidth: "1000px",
    height: "480px",
    margin: "80px auto 0",
  }}
  onTouchStart={handleTouchStart1}
  onTouchMove={handleTouchMove1}
  onTouchEnd={handleTouchEnd1}
>
    {aiImages.map((img, index) => {
      const total = aiImages.length;
      const diff = (index - activeAI + total) % total;

      let position = 3;
      if (diff === 0) position = 0;
      else if (diff === 1) position = 1;
      else if (diff === 2) position = 2;
      else if (diff === total - 1) position = -1;
      else if (diff === total - 2) position = -2;

      const baseStyle = {
        position: "absolute",
        top: "50%",
        transition: "all 0.6s cubic-bezier(.22,1,.36,1)",
       // borderRadius: "30px",
        overflow: "hidden",
        cursor: "pointer",
      };

      const styles = {
  0: {
    left: "50%",
    transform: "translate(-50%, -50%) scale(1)",
    width: "260px",
    height: "460px",
    zIndex: 30,
    opacity: 1,
    //boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
  },

  1: {
    left: "calc(50% + 80px)",   // 🔥 tighter spacing
    transform: "translate(0, -50%) scale(0.92)",
    width: "240px",
    height: "430px",
    zIndex: 25,
    opacity: 1,                 // ✅ fully visible
  },

  "-1": {
    left: "calc(50% - 320px)",   // 🔥 tighter spacing
    transform: "translate(0, -50%) scale(0.92)",
    width: "240px",
    height: "430px",
    zIndex: 25,
    opacity: 1,                 // ✅ fully visible
  },

  2: {
    left: "calc(50% + 220px)",   // 🔥 reduced spacing
    transform: "translate(0, -50%) scale(0.85)",
    width: "220px",
    height: "400px",
    zIndex: 20,
    opacity: 1,                 // ✅ fully visible
  },

  "-2": {
    left: "calc(50% - 450px)",   // 🔥 reduced spacing
    transform: "translate(0, -50%) scale(0.85)",
    width: "220px",
    height: "400px",
    zIndex: 20,
    opacity: 1,                 // ✅ fully visible
  },

  3: {
    left: "50%",
    transform: "translate(-50%, -50%) scale(0.7)",
    width: "200px",
    height: "360px",
    zIndex: 0,
    opacity: 0,
  },
};
      return (
        <div
        className="-mt-10"
          key={index}
          style={{ ...baseStyle, ...styles[position] }}
          onClick={() => setActiveAI(index)}
         >
          <img
            src={img}
            alt="AI Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      );
    })}
  </div>

  {/* Dots */}
  <div className="lg:-mt-6 -mt-6">
<div
  style={{
    marginTop: "-15px",
    width: "100%",
    textAlign: "center",   // ensures proper centering
  }}
>
  <div
    style={{
      display: "inline-flex",   // ✅ forces horizontal row
      flexDirection: "row",     // ✅ explicitly row
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      whiteSpace: "nowrap",     // ✅ prevents wrapping
    }}
  >
    {aiImages.map((_, i) => (
      <div
        key={i}
        onClick={() => setActiveAI(i)}
        style={{
          height: "10px",
          width: activeAI === i ? "24px" : "10px",
          borderRadius: "20px",
          background: "#41587E",
          transition: "all 0.3s ease",
          opacity: activeAI === i ? 1 : 0.4,
          cursor: "pointer",
          flexShrink: 0,          // ✅ prevents shrink
        }}
      />
    ))}
  </div>
</div>
</div>
 </section>


  
{/* ================= KNOW MORE SECTION ================= */}
<section
  className="-mt-14"
  style={{
    background: "#3881A4",
    padding: "clamp(60px, 8vw, 120px) 20px",
    textAlign: "center",
  }}
>
  {/* Title */}
  <h2
    className="lg:-mt-10 -mt-0"
    style={{
      letterSpacing: "6px",
      color: "#E6F0FE",
      fontSize: "clamp(18px, 3vw, 32px)",
      fontWeight: 500,
    }}
  >
    KNOW MORE ABOUT FROST AURA
  </h2>

  {/* Subtitle */}
  <p
    style={{
      letterSpacing: "4px",
      marginTop: "12px",
      color: "#FFFFFF",
      fontSize: "clamp(10px, 2vw, 14px)",
    }}
  >
    WITH PERFECTLY TIMED SOLUTIONS
  </p>

  {/* Gallery Grid */}
   <div
    style={{
      marginTop: "clamp(30px, 6vw, 70px)", // Less space above grid on mobile
      maxWidth: "1100px",
      marginInline: "auto",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "clamp(8px, 10vw, 5px)", // 40 px Smaller gap on mobile, normal on desktop
     }}
      className="gallery-grid"
  >
     {[
      "Smart hydration dock keeps water within reach at your workspace.",
      "Work smarter: Frost Aura gently nudges you to stay hydrated.",
      "Effortless hydration: Frost Aura tracks your intake so you focus.",
      "Even a silver flask: Frost Aura supports all bottle types.",
      "Focus on creation: Frost Aura keeps hydration in your workspace.",
      "Portable hydration: Frost Aura goes with you wherever you are.",
      "Sleek ergonomic design: Frost Aura feels natural in your hand.",
      "Sleek and compact: Frost Aura’s smart dock fits any workspace.",
      "Personalize your desk: Frost Aura available in black or orange.",
      "Stay connected: Frost Aura syncs hydration data to your App.",
      "Productivity station: Frost Aura keeps hydration part of your workflow.",
      "Home comfort: Frost Aura brings hydration to your cozy workspace.",
     ].map((text, index) => (
      <div
        key={index}
        className="glass-card"
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        
        <img
          src={`/gallery/gallery${index + 1}.png`}
          alt={`Frost Aura ${index + 1}`}
          className="glass-img"
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            objectFit: "fill",
            display: "block",
            transition: "transform 0.6s ease",
          }}
        />

        {/* Glass Overlay */}
        <div className="glass-overlay">
          <span className="glass-text">{text}</span>
        </div>
      </div>
    ))}
  </div>

  {/* All Styles Inside Section */}
<style>{`

  .glass-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    text-align: center;

    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.75) 0%,
      rgba(0, 0, 0, 0.55) 40%,
      rgba(0, 0, 0, 0.35) 70%,
      rgba(0, 0, 0, 0.15) 100%
    );

    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .glass-text {
    color: white;
    font-size: clamp(12px, 1.4vw, 16px);
    letter-spacing: 1px;
    transform: translateY(20px);
    transition: transform 0.5s ease;
    max-width: 85%;
  }

  /* ✅ HOVER EFFECTS ONLY FOR DEVICES THAT SUPPORT HOVER (DESKTOP) */
  @media (hover: hover) and (pointer: fine) {

    .glass-card:hover .glass-overlay {
      opacity: 1;
    }

    .glass-card:hover .glass-text {
      transform: translateY(0);
    }

    .glass-card:hover .glass-img {
      transform: scale(1.08);
    }

  }

  /* ✅ MOBILE DEVICES (NO HOVER SUPPORT) */
  @media (hover: none) {

    .glass-overlay {
      opacity: 0 !important;
    }

    .glass-img {
      transform: none !important;
    }

    .glass-text {
      transform: none !important;
    }

  }

  /* ✅ Desktop View (4 per row) */
@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(4, 1fr) !important;
  }
}

`}</style>
</section>


{/* ================= CONTACT US SECTION ================= */}
<section
className="lg:-mt-8 -mt-4"
      style={{
        background: "#E2EFF7",
        padding: "clamp(60px, 8vw, 120px) 20px",
        textAlign: "center",
      }}
    >
      <h2
      className="lg:-mt-10"
        style={{
          letterSpacing: "6px",
          color: "#41587E",
          fontSize: "clamp(22px, 4vw, 36px)",
          fontWeight: 500,
        }}
      >
        CONTACT US
      </h2>

      <p
        style={{
          letterSpacing: "4px",
          marginTop: "12px",
          color: "#41587E",
          fontSize: "clamp(12px, 2vw, 16px)",
          opacity: 0.8,
        }}
      >
        WE WOULD LOVE TO HEAR FROM YOU
      </p>

      <div style={{ maxWidth: "1100px", margin: "60px auto 0" }}>
        <form className="contact-grid" onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="contact-input" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="contact-input" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="contact-input" />
          <input name="query" value={formData.query} onChange={handleChange} placeholder="Query" className="contact-input" />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Feedback"
            rows="5"
            className="contact-input contact-full"
          />

          <button
            type="submit"
            className="contact-button contact-full"
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <style>{`
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
  }

  @media (min-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .contact-input {
    width: 100%;
    padding: 18px 24px;
    border-radius: 18px;
    border: none;
    background: #FFFFFF;
    font-size: clamp(14px, 2vw, 18px);
    color: #41587E;
    outline: none;
  }

  /* ✅ Placeholder Color Fix */
  .contact-input::placeholder {
    color: #41587E;
    opacity: 1;
  }

  .contact-full {
    grid-column: 1 / -1;
  }

  .contact-button {
    padding: 16px;
    border-radius: 18px;
    border: none;
    background: #41587E;
    color: #FFFFFF;
    font-size: clamp(16px, 2vw, 20px);
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .contact-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .contact-button:hover:not(:disabled) {
    opacity: 0.9;
  }
`}</style> 
    </section>

 </div>
  );
};

export default HomePage;