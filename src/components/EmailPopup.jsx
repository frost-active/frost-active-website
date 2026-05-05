import { useState, useEffect } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react"; // ✅ Added Loader2 icon
import { useNavigate } from "react-router-dom";

export default function EmailPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Added loading state
  const [popupContent, setPopupContent] = useState({});
  const navigate = useNavigate();

  // All possible popup messages
  const popupMessages = [
    {
      title: "🧠Track Your Daily Water Intake for Free",
      desc: "Start building better hydration habits today—get your free tracker and improve your routine effortlessly.",
    },
    {
      title: "🌊Heal Naturally with Every Sip",
      desc: "Transform your health journey — one glass of pure, healing water at a time.",
    },
    {
      title: "⚡Energize Your Day with Water",
      desc: "Feel refreshed and recharged — every sip fuels your body’s natural vitality.",
    },
  ];

  useEffect(() => {
    let currentIndex = parseInt(localStorage.getItem("popupMessageIndex")) || 0;
    setPopupContent(popupMessages[currentIndex]);

    const nextIndex = (currentIndex + 1) % popupMessages.length;
    localStorage.setItem("popupMessageIndex", nextIndex);

    const shownThisSession = sessionStorage.getItem("popupShown");
    const subscribed = localStorage.getItem("emailSubscribed");
    if (shownThisSession || subscribed) return;

    const syncPopupAcrossTabs = (event) => {
      if (event.key === "popupShown" && event.newValue === "true") {
        setShowPopup(false);
        sessionStorage.setItem("popupShown", "true");
      }
    };
    window.addEventListener("storage", syncPopupAcrossTabs);

    const timer = setTimeout(() => {
      setShowPopup(true);
      sessionStorage.setItem("popupShown", "true");
      localStorage.setItem("popupShown", "true");
    }, 10000); //Time Set for 10 Seconds 

    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", syncPopupAcrossTabs);
    };
  }, []);

  // Email validation
  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };

  const CHEERIO_API_KEY = "dfd7bcf44867df2f37bccce492a2368dcb0d9cdcd5963dd47acd270de09208ba"; // ← replace with your real key

const MASTER_GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxqXNa5d1oYF9yiHJpsxtv6sdtV0KsdGUSg_2oSe--dHl4YIe7tPCYHZzeBsIojmqXt/exec";

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  if (!validateEmail(email)) {
    setError("Please enter a valid email address.");
    setLoading(false);
    return;
  }

  try {
    // 1️⃣ Send to Google Sheet (UNCHANGED)
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwYvpfXERzc9fLK90Fa6pk82xMNpxzPpEwfJQtLBzYBKxCRBp-VFVJexseH4S9bhc9YaA/exec",
      {
        method: "POST",
        body: new URLSearchParams({ email }),
      }
    );

  fetch(MASTER_GOOGLE_SCRIPT_URL, {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `email=${encodeURIComponent(email)}&source=Welcome Email`,
});


    if (!response.ok) {
      setError("Failed to submit. Please try again later.");
      setLoading(false);
      return;
    }

    // 2️⃣ Cheerio Manual Workflow Trigger (UPDATED)
    await fetch(
      "https://newprod.api.cheerio.in/direct-apis/v1/manualTriggerWorkflow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "dfd7bcf44867df2f37bccce492a2368dcb0d9cdcd5963dd47acd270de09208ba",
        },
        body: JSON.stringify({
          email: email,
          workflowId: "691d8bd1024212623f2b31b8",
        }),
      }
    );

    // 3️⃣ Mark as subscribed
    localStorage.setItem("emailSubscribed", "true");
    setSubmitted(true);

  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem("popupShown", "true");
  };

  return (
    <>
      {showPopup && (
        <div className="mt-16 fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
            >
              <X size={22} />
            </button>

            {/* Left Side Image */}
            <div className="md:w-1/2 w-full h-60 md:h-auto">
              <img
                src="/images/product.jpeg"
                alt="Stay hydrated"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Side Content */}
            <div className="md:w-1/2 w-full p-8 flex flex-col justify-center text-center md:text-left">
              {!submitted ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                    {popupContent.title}
                  </h2>
                  <p className="text-gray-600 mb-6 text-sm md:text-base">
                    {popupContent.desc}
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 w-full"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className={`w-full border ${
                        error
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#389ED7]"
                      } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#389ED7] text-gray-800`}
                    />
                    {error && (
                      <p className="text-red-500 text-sm -mt-2">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex items-center justify-center gap-2 bg-[#389ED7] hover:bg-[#287fad] text-white px-6 py-3 rounded-lg font-medium transition w-full ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={24} />
                         
                        </>
                      ) : (
                        "Send me free wellness tips!"
                      )}
                    </button>
                  </form>
                  <p className="text-xs text-gray-400 mt-4">
                    *By signing up, you’ll receive exclusive updates and
                    hydration tips from <strong>FROST AURA</strong> to support
                    your wellness journey.
                  </p>
                </>
              ) : (
                // Success Message
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <CheckCircle className="text-green-500" size={48} />
                  <h2 className="text-2xl font-bold text-gray-900">
                    You're all set!
                  </h2>
                  <p className="text-gray-600">
                    Check your hydration insights and calculate your ideal water
                    intake.
                  </p>
                  <button
                    onClick={() => {
                      setShowPopup(false);
                      navigate("/waterintakecalculator");
                    }}
                    className="mt-2 bg-[#389ED7] hover:bg-[#287fad] text-white px-6 py-3 rounded-lg font-medium transition"
                  >
                    Check My Water Intake
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
