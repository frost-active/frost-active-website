import { useState, useEffect } from "react";
import { X } from "lucide-react"; // nice close icon

export default function EmailPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
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
    }, 30000); // 30000 ms = 30 seconds

    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", syncPopupAcrossTabs);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);

    localStorage.setItem("emailSubscribed", "true");
    setShowPopup(false);
    localStorage.setItem("popupShown", "true");
  };

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem("popupShown", "true");
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fadeIn">
            
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4  hover:text-gray-600"
            >
              <X size={20} />
            </button>

            {/* Illustration / Icon */}
            <div className="flex justify-center mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                alt="Newsletter"
                className="w-16 h-16"
              />
            </div>

            {/* Headline */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to FrostActive!
            </h2>
            <p className="text-gray-600 mb-6">
                Thank you for visiting. Elevate your day with Frost Aura—your smart hydration and wellness companion. Sign up to receive exclusive updates, helpful wellness tips, and special launch offers crafted just for you.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#389ED7] text-gray-800"
              />
              <button
                type="submit"
                className="bg-[#389ED7] hover:bg-[#287fad] text-white px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto"
              >
                Send
              </button>
            </form>

            {/* Small reassurance text 
            <p className="text-xs text-gray-400 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p> */}
          </div>
        </div>
      )}
    </>
  );
}
