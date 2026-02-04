import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";


const MASTER_SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxqXNa5d1oYF9yiHJpsxtv6sdtV0KsdGUSg_2oSe--dHl4YIe7tPCYHZzeBsIojmqXt/exec";

// 🔹 Send ONLY email to Master Sheet (silent, duplicate-safe)
async function sendEmailToMasterSheet(email) {
  try {
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("source", "Quiz Form");

    await fetch(MASTER_SHEET_WEBHOOK_URL, {
      method: "POST",
      body: formData,
    });
  } catch (err) {
    // fail silently
  }
}

const NoThanksPage = () => {
  const questions = [
    {
      question: "After following the water intake challenge for 31 days, what change did you notice the most?",
      options: [" Better energy levels throughout the day", "Improved digestion / less bloating", " Better skin & freshness", " I’m still building the habit"],
    },
    {
      question: " When your daily water intake is good, which of these usually improves first?",
      options: [
        "Concentration & focus",
        " Digestion and metabolism",
        " Skin hydration",
        "All of the above",
      ],
    
    },
    {
      question: "What is one common sign that your body is dehydrated?",
      options: [" Feeling tired or low on energy", "Dry lips or skin", "Headache or poor focusn", " All of the above"],
    },
    {
      question: "  Going forward, how do you plan to maintain your water intake habit?",
      options: ["Using reminders / alarms", "  Tracking daily intake", "Listening to body signals", " Using a smart solution like FROST"],
    },
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  // New states for collecting details
  const [collectingDetails, setCollectingDetails] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // New state to show error when not all questions answered
  const [answerError, setAnswerError] = useState(false);

  // Detect macOS desktop/laptop (not mobile) so we can nudge the right-side content up only on mac laptops
  const [isMacLaptop, setIsMacLaptop] = useState(false);

  useEffect(() => {
    const detectMacLaptop = () => {
      if (typeof window === "undefined" || typeof navigator === "undefined") {
        setIsMacLaptop(false);
        return;
      }

      const ua = navigator.userAgent || "";
      const platform = navigator.platform || "";

      // Detect mac platform (common tokens) and exclude mobile tokens.
      const isMac =
        /Macintosh|MacIntel|MacPPC|Mac68K/.test(platform) || /Mac OS X/.test(ua);
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(ua);

      // Only treat as "laptop/desktop" when viewport is at least Tailwind's lg breakpoint (1024px)
      const isDesktopWidth = window.innerWidth >= 1024;

      setIsMacLaptop(Boolean(isMac && !isMobile && isDesktopWidth));
    };

    // run detection on mount
    detectMacLaptop();

    // update on resize so the class applies/clears when the viewport crosses desktop/mobile width
    window.addEventListener("resize", detectMacLaptop);
    return () => window.removeEventListener("resize", detectMacLaptop);
  }, []);

  const handleOptionClick = (optionIndex) => {
    const q = questions[current];
    const newAnswers = [...answers];
    const optionText = q.options[optionIndex];

    if (q.multiple) {
      let selected = newAnswers[current] || [];
      if (selected.includes(optionText)) {
        selected = selected.filter((txt) => txt !== optionText);
      } else {
        selected = [...selected, optionText];
      }
      newAnswers[current] = selected;
    } else {
      newAnswers[current] = optionText;
    }

    setAnswers(newAnswers);
    // clear the "answer all" error when user interacts
    if (answerError) setAnswerError(false);
  };

  const handleTextChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[current] = e.target.value;
    setAnswers(newAnswers);
    if (answerError) setAnswerError(false);
  };

  const handleNext = () => {
    // If currently on the last question, validate all questions answered before moving to details
    if (current === questions.length - 1) {
      // validate each question
      const allAnswered = questions.every((q, idx) => {
        const a = answers[idx];
        if (q.multiple) {
          return Array.isArray(a) && a.length > 0;
        }
        return a !== null && a !== "" && typeof a !== "undefined";
      });

      if (!allAnswered) {
        setAnswerError(true);
        return;
      }

      // all good -> proceed to details
      setCollectingDetails(true);
      setAnswerError(false);
      return;
    }

    if (current < questions.length - 1) {
      setCurrent(current + 1);
      // moving forward — clear any previous error
      if (answerError) setAnswerError(false);
    }
  };

  const handlePrevious = () => {
    if (collectingDetails) {
      setCollectingDetails(false);
      return;
    }
    if (current > 0) {
      setCurrent(current - 1);
      if (answerError) setAnswerError(false);
    }
  };

  // Robust email validation (reasonable coverage for typical address formats)
  const isValidEmail = (value) => {
    if (!value) return false;
    const re = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;
    return re.test(String(value).trim());
  };

  // professional confetti run for `durationMs` milliseconds
  const runConfetti = (durationMs = 10000) => {
    const duration = durationMs;
    const animationEnd = Date.now() + duration;

    const colors = ["#2E86AB", "#389ED7", "#FFC107", "#4CAF50", "#FF5722"]; // refined palette

    (function frame() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return;
      }

      const particleCount = Math.max(8, Math.floor(60 * (timeLeft / duration)));

      // center bursts
      confetti({
        particleCount: Math.floor(particleCount * 0.4),
        startVelocity: 35,
        spread: 100,
        ticks: 200,
        gravity: 0.6,
        scalar: 1.0,
        colors,
        origin: { x: 0.5, y: 0.35 },
      });

      // left burst
      confetti({
        particleCount: Math.floor(particleCount * 0.3),
        startVelocity: 30,
        spread: 120,
        ticks: 200,
        gravity: 0.6,
        scalar: 0.95,
        colors,
        origin: { x: 0.2 + Math.random() * 0.1, y: 0.2 + Math.random() * 0.2 },
      });

      // right burst
      confetti({
        particleCount: Math.floor(particleCount * 0.3),
        startVelocity: 30,
        spread: 120,
        ticks: 200,
        gravity: 0.6,
        scalar: 0.95,
        colors,
        origin: { x: 0.8 - Math.random() * 0.1, y: 0.2 + Math.random() * 0.2 },
      });

      requestAnimationFrame(frame);
    })();
  };

  // Cheerio API key provided
  const CHEERIO_API_KEY =
    "dfd7bcf44867df2f37bccce492a2368dcb0d9cdcd5963dd47acd270de09208ba";

  const handleFinalSubmit = async () => {
    if (!name.trim()) {
      alert("Please enter your Name.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your Email.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    const payload = {
      answers,
      details: { name: name.trim(), email: email.trim(), phone: phone.trim() },
    };

    setSubmitting(true);

    const sheetUrl =
      "https://script.google.com/macros/s/AKfycbzz2WETcMP5sKzYfF3HNN5aTaNcUwkIJNt7V1lzz0KgUe3ZEI8xBktpF_KUbzkbFHQzZw/exec";

    const cheerioUrl =
      "https://newprod.api.cheerio.in/direct-apis/v1/manualTriggerWorkflow";

    try {
      // Fire both requests and wait for them to settle. Using Promise.allSettled ensures
      // both are attempted even if one fails (the Google sheet call uses no-cors).
      const sheetFetch = fetch(sheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const cheerioBody = {
        email: email.trim(),
        workflowId: "694fd337ed53fc930a67bef7",
      };

      const cheerioFetch = fetch(cheerioUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CHEERIO_API_KEY,
        },
        body: JSON.stringify(cheerioBody),
      });

      const results = await Promise.allSettled([sheetFetch, cheerioFetch]);
      sendEmailToMasterSheet(email.trim());


      // Determine overall success: consider it successful if at least one request fulfilled.
      const anyFulfilled = results.some((r) => r.status === "fulfilled");

      setSubmitted(true);

      // If at least one request was fulfilled, run short confetti, otherwise longer confetti to indicate something unusual
      if (anyFulfilled) {
        runConfetti(2 * 1000);
      } else {
        runConfetti(10 * 1000);
      }
    } catch (err) {
      console.error("Error sending payload to endpoints:", err);
      // keep UX similar to before: mark submitted and run confetti (longer)
      setSubmitted(true);
      runConfetti(10 * 1000);
    } finally {
      setSubmitting(false);
    }
  };

  // Water fill progress calculation
  const progress = collectingDetails ? 100 : ((current + 1) / questions.length) * 100;

  return (
    <div
      className="bg-[#E3F6FF] relative min-h-screen lg:min-h-[100dvh] overflow-hidden"
      style={{
        // using CSS variable fallback: keep minHeight for older browsers, but on large screens prefer dynamic viewport height (100dvh)
        WebkitTapHighlightColor: "transparent",
      }}
    >
   
  
      {/* Foreground Content */}
      <div className="bg-[#E3F6FF] lg:mt-14 mt-12 flex flex-col min-h-screen lg:min-h-[100dvh] font-['Roboto'] bg-transparent relative z-10">
        <div className="bg-[#E3F6FF] flex flex-1 flex-col lg:flex-row w-full lg:h-[100dvh] h-screen items-stretch relative lg:left-[-60px]">
          {/* Left Section - ensure it stays on top on small screens so right-side bg doesn't overlap */}
          <div className="lg:-mr-[80px] lg:-mt-4 mt-4 flex-1 flex flex-col justify-center items-center p-8 h-full relative z-20">
            <img className="lg:w-[550px] lg:h-[660px]" src="/images/quiz2.jpeg" alt="Quiz" />
           </div>

          {/* Right Section */}
          <div
            className="lg:-mr-20 lg:bg-[#E3F6FF] -mt-[130px] lg:mt-24 flex-1 flex flex-col justify-center p-8  relative z-10 h-full min-h-screen lg:min-h-[100dvh] sm:min-h-0"
            // apply a small upward nudge only when on macOS desktop/laptop (not on Windows or mobile)
            style={{
              transform: isMacLaptop ? "translateY(-50px)" : undefined,
            }}
          >  {/* lg:mt-8*/}
             <div className="lg:ml-40 ml-2">
                <p className="text-[#135283] font-regular lg:text-[16px] text-[15px] -mt-14 lg:-mt-20 ">Lucky Winners will be connected via email/phone</p>
              </div>
            {/* Only show the quiz heading/number if not in details collection */}
            {!collectingDetails && (
              <div className="text-center mb-2 text-base font-medium text-[#115384]">
                <p className="text-[#135283] font-bold text-[30px] mb-4">QUIZ TIME</p>
                <div className="text-[#115384] mb-8" >
                  {current + 1}/{questions.length}
                </div>
              </div>
            )}

            {/* When collectingDetails is true render the details form (right side) */}
            {collectingDetails ? (
              <div className="lg:mt-8 mt-48 max-w-[900px] w-full mx-auto">
                {!submitted ? (
                  <>
                    {/* Top row: Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-4">
                      <div>
                        <label className="block mb-2 font-medium" style={{ color: "#125282" }}>
                          Name*
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#E9F8FF] placeholder-[#7FC7F0] text-black px-3 py-3 rounded-lg border"
                          style={{ borderColor: "#125282" }}
                          disabled={submitting}
                        />
                      </div>

                      <div>
                        <label className="block mb-2 font-medium" style={{ color: "#125282" }}>
                          Email*
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#E9F8FF] placeholder-[#7FC7F0] text-black px-3 py-3 rounded-lg border"
                          style={{ borderColor: "#125282" }}
                          disabled={submitting}
                        />
                      </div>
                    </div>

                    {/* Phone and Submit row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
                      <div>
                        <label className="block mb-2 font-medium" style={{ color: "#125282" }}>
                          Phone (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#E9F8FF] placeholder-[#7FC7F0] text-black px-3 py-3 rounded-lg border"
                          style={{ borderColor: "#125282" }}
                          disabled={submitting}
                        />
                      </div>

                      <div className="lg:mt-8 lg:ml-2">
                        <button
                          onClick={handleFinalSubmit}
                          className="text-white px-8 py-2 rounded-lg shadow"
                          style={{
                            background: "#115384",
                            minWidth: 120,
                            fontSize: 20,
                          }}
                          disabled={submitting}
                        >
                          {submitting ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </div>

                    {/* Image below fields */}
                    <div className="w-full flex justify-center mb-6">
                      <img src="/images/hb1.png" alt="product" className="max-w-[420px] w-full" />
                    </div>

                    {/* Text and CTA button */}
                    <div className="text-center -mt-20">
                      <p className="text-[#125282] font-medium mb-4 text-lg">
                        Have you visited our PRELAUNCH CAMPAIGN? Still not?
                      </p>
                      <button
                        onClick={() =>
                          (window.location.href =
                            "https://www.indiegogo.com/en/projects/frostactive-38748367/stay-hydrated-focused-balanced-meet-frost-aura?ref=explore")
                        }
                        className="text-white px-6 py-3 rounded-lg"
                        style={{ background: "#115384" }}
                      >
                        Click here to visit
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="lg:mt-0 -mt-28 mb-6  text-center">
                      <p className="text-[#125282] text-lg font-medium mb-4">We have collected your results.</p>
                      <p className="text-[#125282] mb-2">Stay Tuned for name announcement of LUCKY WINNERS</p>
                      <p className="text-[#125282] mb-4">Lucky Winners will be connected via email/phone</p>
                    </div>

                    <div className="w-full flex justify-center mb-6">
                      <img src="/images/hb1.png" alt="product" className="max-w-[420px] w-full" />
                    </div>

                    <div className="text-center -mt-20">
                      <p className="text-[#125282] font-medium mb-4 text-lg">
                        Have you visited our PRELAUNCH CAMPAIGN? Still not?
                      </p>
                      <button
                        onClick={() =>
                          (window.location.href =
                            "https://www.indiegogo.com/en/projects/frostactive-38748367/stay-hydrated-focused-balanced-meet-frost-aura?ref=explore")
                        }
                        className="text-white px-6 py-3 rounded-lg"
                        style={{ background: "#115384" }}
                      >
                        Click here to visit
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <h2 className="text-[17px] text-[#155383] font-regular text-center mb-8">{questions[current].question}</h2>

                {questions[current].textInput ? (
                  <input
                    type="text"
                    placeholder="Type here"
                    value={answers[current] || ""}
                    onChange={handleTextChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-black"
                  />
                ) : (
                  <div className="flex flex-col gap-4">
                    {questions[current].options.map((option, index) => {
                      const selected = questions[current].multiple
                        ? (answers[current] || []).includes(option)
                        : answers[current] === option;

                      return (
                        <div
                          key={index}
                          onClick={() => handleOptionClick(index)}
                          className={`flex items-center border rounded-md px-4 py-2 cursor-pointer transition max-w-[380px] mx-auto w-full text-sm
                            ${
                              selected
                                ? "border-[#155383] bg-white "
                                : "border-[#155383] text-[#155383] bg-white" 
                            }
                          `}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center
                            ${
                              selected
                                ? " bg-[#155383]"
                                : "border-[#000000] bg-white"
                            }
                            `}
                          >
                            {selected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                          {option}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex justify-between items-center mt-14">
                  {current > 0 ? (
                    <button onClick={handlePrevious} className="-mt-8 lg:ml-36  ml-6 text-base text-[#115384]">
                      previous
                    </button>
                  ) : (
                    <span></span>
                  )}

                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={handleNext}
                      className="absolute right-36 top-4/6 -translate-x-1/2 -translate-y-[30px]
                              bg-[#115384] text-white px-3 py-1 rounded text-base shadow-md"
                    >
                      Next
                    </button>

                    {/* Error message displayed below Next button when not all answered */}
                    {answerError && (
                      <div className="mt-4 text-sm lg:mr-48 mr-24 text-red-600">Answer all the questions</div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fall {
  0% { transform: translateY(-120%); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(120%); opacity: 0; }
}
.animate-fall {
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

/* Notes:
   - We apply lg:min-h-[100dvh] and lg:h-[100dvh] to key containers so that on large screens
     (laptops/desktops) the layout uses the dynamic viewport height (100dvh). This fixes the
     extra-bottom-space issue observed specifically on Mac browsers (where 100vh can behave
     inconsistently due to browser chrome).
   - Mobile view remains untouched (no changes to mobile-specific spacing/behavior).
*/
      `}</style>
    </div>
  );
};

export default NoThanksPage;