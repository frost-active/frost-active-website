import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzKvZ0eEtE8pt79rgvozrqs6kfkJoTkbcCFXDn9uuDrpg5qsdAsLn-uTVM25fycBsXI/exec";

  const MASTER_GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxqXNa5d1oYF9yiHJpsxtv6sdtV0KsdGUSg_2oSe--dHl4YIe7tPCYHZzeBsIojmqXt/exec";

const CHEERIO_API_KEY = "dfd7bcf44867df2f37bccce492a2368dcb0d9cdcd5963dd47acd270de09208ba"; // <-- replace with your key

const handleSubscribe = async (e) => {
  e.preventDefault();

  if (!email.includes("@") || !email.includes(".")) {
    setErrorMessage("Please enter a valid email address.");
    return;
  }

  setErrorMessage("");
  setIsSubscribing(true);
  setSuccessMessage("");

  try {
    // 1️⃣ Google Sheet (UNCHANGED)
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email }).toString(),
    });

    fetch(MASTER_GOOGLE_SCRIPT_URL, {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `email=${encodeURIComponent(email)}&source=Newsletter Subscription`,
});


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

    setSuccessMessage("✅ Thank you for subscribing!");
  } catch (err) {
    console.error("Error subscribing:", err);
    setErrorMessage("Something went wrong. Please try again later.");
  } finally {
    setIsSubscribing(false);
    setEmail("");
  }
};



  const handleComingSoon = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 3000);
  };

  return (
    <footer className="relative  px-4 sm:px-6 lg:px-8 flex flex-col pt-8 border-t border-blue-100">
      <div className="flex-1">

        {/* Main Content Row */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left items-start">

          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className="text-sm max-w-md font-[Roboto]">
              Frost Aura is your smart hydration and wellness dock, designed to
              transform your desk into a healthier workspace. We believe small
              habits like drinking water, taking mindful breaks, and moving more
              can make a big difference.
            </p>
            <div className="flex flex-col items-center md:items-start">
              <div className="flex flex-row justify-center md:justify-start gap-4 mt-4">
                <a
                  href="https://app.frostactive.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/appstore.png" alt="App Store" className="h-10 w-auto object-contain" />
                </a>

                <a
                  href="https://app.frostactive.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/playstore.png" alt="Google Play" className="h-10 w-auto object-contain" />
                </a>

              </div>
              {showComingSoon && (
                <div className="mt-2 md:ml-14 w-fit px-6 py-3 bg-white shadow-lg rounded-xl border border-gray-200 text-gray-800 text-sm font-medium font-[Roboto] transition-opacity duration-300 ease-in-out">
                  📱 Coming Soon !
                </div>
              )}
            </div>
            <div className="md:mt-2 mt-2 flex gap-4 justify-center md:justify-start">
              <a href="https://www.linkedin.com/company/frost-active/" target="_blank" rel="noopener noreferrer">
                <img src="/images/linkedin.png" alt="LinkedIn" className="h-6 w-6 object-contain hover:brightness-90" />
              </a>
              <a href="https://www.facebook.com/share/16Q37LVMTM/" target="_blank" rel="noopener noreferrer">
                <img src="/images/facebook.png" alt="Facebook" className="h-6 w-6 object-contain hover:brightness-90" />
              </a>
              <a href="https://www.instagram.com/frost_active?igsh=MXA3N2FoYXY2aDBpbQ==" target="_blank" rel="noopener noreferrer">
                <img src="/images/instagram.png" alt="instagram" className="h-6 w-6 object-contain hover:brightness-90" />
              </a>
              <a href="https://www.youtube.com/@Frost_active" target="_blank" rel="noopener noreferrer">
                <img src="/images/youtube.png" alt="youtube" className="h-7 w-7 object-contain hover:brightness-90" />
              </a>
              <a href="https://discordapp.com/users/1381888153929121844" target="_blank" rel="noopener noreferrer">
                <img src="/images/discord.png" alt="discord" className="h-7 w-7 object-contain hover:brightness-90" />
              </a>
              
              <a href="https://x.com/frostactive_07?s=21" target="_blank" rel="noopener noreferrer">
                <img src="/images/twitter.png" alt="twitter" className="h-7 w-7 object-contain hover:brightness-90" />
              </a>
            </div>
          </div>

          {/* Information Links */}
          <div className="md:pl-6 flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-0 text-blue-700 text-lg">
              <span className="text-[#579CD3]">Information</span>
            </h4>
            <ul className="space-y-0">
              <li><Link to="/about" className="text-sm text-[#021637] hover:text-blue-700 font-[Roboto]">About Us</Link></li>
              <li><Link to="/community" className="text-sm text-[#021637] hover:text-blue-700 font-[Roboto]">Community & Beta</Link></li>
              <li><Link to="/sessions" className="text-sm text-[#021637] hover:text-blue-700 font-[Roboto]">Wellness Sessions</Link></li>
              <li><Link to="https://app.frostactive.com" className="text-sm text-[#021637] hover:text-blue-700 font-[Roboto]">Web App</Link></li>
              <li><Link to="/blogs" className="text-sm text-[#021637] hover:text-blue-700 font-[Roboto]">Blogs</Link></li>
              <li><Link to="/invest" className="text-sm text-[#021637] hover:text-blue-700 font-[Roboto]">Invest</Link></li>
                <li><Link to="/privacy" className="text-sm text-[#021637] hover:text-blue-700 font-[Roboto]">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-[#021637] hover:text-blue-700 font-[Roboto]">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:pl-6 md:-ml-16 flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-1 text-blue-700 text-lg">
              <span className="text-[#579CD3]">Contact Info</span>
            </h4>
            <ul className="space-y-1 text-sm text-[#021637] font-[Roboto]">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <img src="/images/mail.png" alt="Mail" className="h-4 w-4" />
                <a href="mailto:info@frostactive.com">info@frostactive.com</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <img src="/images/phone.png" alt="Phone" className="h-4 w-4" />
                <a href="tel:+017613892344">017613892344</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <img src="/images/location.png" alt="Location" className="h-5 w-5 h-5 w-5 relative sm:left-0 md:left-0 lg:left-0 left-12 sm:bottom-0 md:bottom-0 lg:bottom-0 bottom-2" />
                <span>131 Continental Dr, Suite 305, Newark, DE 19713, United States</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="md:pl-6 flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-1 text-lg">
              <span className="text-[#579CD3]">Subscribe to our Newsletter</span>
            </h4>
            <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => {
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                placeholder="Enter your email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#579CD3] text-sm"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className={`w-full px-4 py-2 rounded-sm transition-colors text-sm 
                  ${isSubscribing 
                    ? "bg-blue-300 cursor-not-allowed" 
                    : "bg-[#579CD3]  text-white"}`}
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </button>

              {errorMessage && <p className="text-red-600 text-sm font-[Roboto]">{errorMessage}</p>}
              {successMessage && <p className="text-green-700 text-sm font-[Roboto] font-medium">{successMessage}</p>}
            </form>
          </div>

          {/* Social media Icons*/}
          
        </div>

      
        {/* Partners */}
      <div className="mt-6 pt-6 border-t border-blue-100">
        <div className="max-w-7xl mx-auto w-full flex justify-center">
          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-blue-700 mb-4 text-base md:text-lg text-center">
              <span className="text-[#000000]">Designed in Germany in collaboration with</span>
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <img src="/images/onesmallstep.jpg" alt="EXIST" className="h-[60px] object-contain" />
              <img src="/images/fablab.png" alt="German Ministry" className="h-[60px] object-contain" />
            </div>
          </div>
        </div>
      </div>
  {/* Bottom Blue Bar */}
      <div className="w-screen h-[35px] bg-[#579CD3] mt-4 mx-[-1rem] sm:mx-[-1.5rem] lg:mx-[-2rem]"></div>
      </div>

   
    </footer>
  );
};

export default Footer;
