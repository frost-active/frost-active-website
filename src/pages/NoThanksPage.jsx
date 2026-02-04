import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useEffect } from "react";


const NoThanksPage = () => {
  const questions = [
    {
      question: "What’s your ideal range for this product?",
      options: ["Under $30", "$30–$50", "$50–$70", " Above $70 is fine if value is clear"],
    },
    {
      question: "Which features interests you most?",
      options: [
        "Water energizing with sound waves",
        " Hydration reminders",
        "Pomodoro / focus timer",
        "Wellness alerts (stretch, take medicine, move)",
        " All of them together",
      ],
      multiple: true,
    },
    {
      question: "Which feature feels least useful to you?",
      options: ["Water energizing", "Hydration reminders", "Pomodoro timer", "Wellness alerts", " None — all useful"],
    },
    {
      question: "Why not pre-order now?",
      options: ["Want to see reviews first", "Not convinced of value yet", "Waiting for discounts or bundles", "Unsure about benefits"],
    },
    {
      question: " I’m unsure about water energizing because:",
      options: ["Never heard of it before", " Not convinced by the science", " Seems unnecessary", "Believe in it but need proof"],
    },
    {
      question: " Which would make you more likely to buy?",
      options: [" Bigger launch discount", " Bundle with bottle/accessories", "More proof & real user stories", " Extended warranty"],
    },
    {
      question: "Hydration reminders are not useful because:",
      options: [" I already drink enough water", "I use another device/app", " Not a priority right now"],
    },
    {
      question: "What would you use FROST for the most?",
      options: [" Home hydration & wellness", " Office productivity & reminders", "Fitness / workout hydration", "Health recovery & medicine reminders"],
    },
    {
      question: "Concerns about the product?",
      options: ["Build quality", "Technology reliability", "Support after-sales", "Warranty & returns"],
      multiple: true,
    },
    {
      question: " Any other reason you didn’t pre-order today?",
      options: null,
      textInput: true,
    },
  ];
  
  const [email, setEmail] = useState("");
  useEffect(() => {
    const storedEmail = localStorage.getItem("frost_email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showModal, setShowModal] = useState(false);
  
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
  };

  const handleTextChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[current] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleSkip = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handleSubmit = () => {
  const payload = {
  email: email || "unknown",
  answers: answers,
  timestamp: new Date().toISOString(),
  page: "NoThanks"
};

  fetch(
    "https://script.google.com/macros/s/AKfycbzhFh1Yjgen6NSFpXz38YxYG0FqHKQkEdFQJC9BSJfHIWt_qxLYhKhwip18zTSwdkmB/exec",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  console.log("Submitted Answers:", answers);

  // 🎉 Run confetti for 20 seconds
  const duration = 20 * 1000;
  const animationEnd = Date.now() + duration;

  const defaults = {
    startVelocity: 25,
    spread: 360,
    ticks: 60,
    zIndex: 9999,
    colors: ["#389ED7", "#FFC107", "#4CAF50", "#FF5722"],
  };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Left burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    // Right burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);

  setShowModal(true);
};
  // Water fill progress calculation
  const progress = ((current + 1) / questions.length) * 100;
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Water background with animated curved wave top */}
      <div
        className="absolute bottom-0 left-0 w-full transition-all duration-700 ease-in-out overflow-hidden"
        style={{ height: `${progress}%` }}
      >
        <svg
          className="absolute top-0 left-0 w-full h-32"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#CFF2FF"
            d="M0,192L80,197.3C160,203,320,113,480,102.7C640,102,800,160,960,194.7C1120,199,1280,171,1360,181.3L1440,192L1440,320L0,320Z">
            </path>
        </svg>

        <div className="absolute top-32 left-0 w-full bottom-0 bg-[#CFF2FF]"></div>
      </div>

      {/* Foreground Content */}
      <div className="lg:mt-14 mt-12 flex flex-col min-h-screen font-['Roboto'] bg-transparent relative z-10">
        <div className="flex flex-1 flex-col lg:flex-row w-full h-screen items-stretch relative lg:left-[-60px]">
          {/* Left Section */}
          <div className="lg:mt-20 mt-4 flex-1 flex flex-col justify-center items-center p-8 h-full">
            <div className="text-3xl md:text-5xl font-bold text-[#389ED7] text-left w-full max-w-[360px]">
              Your 2 minutes can help us make Frost better for you
            </div>
            <div className="text-lg mt-3 lg:ml-24 w-full max-w-md text-black">
              Your response matters a lot
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:mt-6 -mt-48 flex-1 flex flex-col justify-center p-8 relative z-10 h-full min-h-screen sm:min-h-0">
            <div className="text-center mb-2 text-sm font-medium text-black">
              {current + 1} of {questions.length}
            </div>

            <h2 className="text-xl font-bold text-center mb-8">{questions[current].question}</h2>

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
                      className={`flex items-center border rounded-md px-4 py-3 cursor-pointer transition
                        ${
                          selected
                            ? "border-[#389ED7] text-[#389ED7]"
                            : "border-[#4B4B4B] text-black"
                        }
                      `}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center
                        ${
                          selected
                            ? "border-[#389ED7] bg-[#389ED7]"
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
                <button onClick={handlePrevious} className="-mt-8 ml-6 text-sm text-black">
                  previous
                </button>
              ) : (
                <span></span>
              )}

              {current === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="bg-[#389ED7] -mt-8 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={handleNext}
                    className="absolute left-1/2 top-4/6 -translate-x-1/2 -translate-y-[30px]
                            bg-[#389ED7] text-white px-3 py-1 rounded text-base shadow-md"
                  >
                    Next
                  </button>
                  <button onClick={handleSkip} className=" -mt-8 mr-6 text-sm text-black">
                    skip
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl relative w-[90%] max-w-md">
            <h2 className="text-2xl font-bold text-[#389ED7] mb-3">Thank You 🎉</h2>
            <p className="text-gray-700">
              Your feedback has been received — our team will carefully review it and reach out to
              ensure we address your concerns.
            </p>

            {/* Floating Emojis */}



            <button
              onClick={() => (window.location.href = "/")}
              className="mt-6 bg-[#389ED7] text-white px-6 py-2 rounded shadow-md"
            >
              OK
            </button>
          </div>
        </div>
      )}

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

      `}</style>
    </div>
  );
};

export default NoThanksPage;
