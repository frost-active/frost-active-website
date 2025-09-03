import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setShowBanner(true);
      setTimeout(() => setAnimateIn(true), 50);
    } else {
      loadTrackingScripts();
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setAnimateIn(false);
    setTimeout(() => setShowBanner(false), 300);
    loadTrackingScripts();
  };

  const loadTrackingScripts = () => {
    // Google Analytics
    const gaScript = document.createElement("script");
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-99JHLLHHSR";
    gaScript.async = true;
    document.head.appendChild(gaScript);

    gaScript.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-99JHLLHHSR");
    };

    // Facebook Pixel
    const fbScript = document.createElement("script");
    fbScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,"script",
      "https://connect.facebook.net/en_US/fbevents.js");
      fbq("init", "FACEBOOK_PIXEL_ID");
      fbq("track", "PageView");
    `;
    document.head.appendChild(fbScript);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9999] w-full px-4 sm:px-8 py-5 
                  bg-white/60 backdrop-blur-xl text-[#021637] border-t border-white/20
                  transition-all duration-300 ease-in-out 
                  ${animateIn ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-base text-center sm:text-left text-gray-900 leading-snug sm:flex-1">
          We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also disclose information about your use of our site with our social media, advertising and analytics. <br />See our{" "}
          <a
            href="/privacy"
            className="text-[#389ED7] underline hover:opacity-80"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>.
        </p>
        <div className="flex justify-center sm:justify-end">
          <button
            onClick={acceptCookies}
            className="bg-[#389ED7] text-white px-6 py-2 rounded-lg
          hover:bg-[#2a6f9c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       text-base font-medium shadow transition-all whitespace-nowrap"
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
