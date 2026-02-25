import { useEffect, useState, useRef } from "react";
import { Globe, X } from "lucide-react";
import "./GoogleTranslateOverrides.css";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },  // German
  { code: "es", label: "Español" },  //Spanish
  { code: "fr", label: "Français" },  //French
  { code: "hi", label: "हिन्दी" }, //Hindi
  { code: "it", label: "Italiano" }, //Italian
  { code: "kn", label: "ಕನ್ನಡ" }, //Kannada
  { code: "ml", label: "മലയാളം" }, //Malayalam
  { code: "nl", label: "Nederlands" }, //Dutch
  { code: "ru", label: "русский" },  //Russian
  { code: "ta", label: "தமிழ்" },  //Tamil
  { code: "te", label: "తెలుగు" },  //Telugu
];

const PAGE_LANGUAGE =
  (document && document.documentElement && document.documentElement.lang) || "en";

function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; path=/; expires=${expires}; SameSite=Lax`;
  try {
    const host = window.location.hostname;
    const parts = host.split(".");
    if (parts.length >= 2) {
      const rootDomain = "." + parts.slice(-2).join(".");
      document.cookie = `${name}=${value}; path=/; domain=${rootDomain}; expires=${expires}; SameSite=Lax`;
    }
  } catch {}
}

const GoogleTranslate = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: PAGE_LANGUAGE,
            includedLanguages: LANGUAGES.map((l) => l.code).join(","),
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      } catch {}
    };

    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (targetLang) => {
    try {
      const sel = document.querySelector(
        "#google_translate_element select.goog-te-combo"
      );
      if (sel) {
        sel.value = targetLang;
        const event = new Event("change", { bubbles: true });
        sel.dispatchEvent(event);
      }
    } catch {}

    const cookieValue = `/${PAGE_LANGUAGE}/${targetLang}`;
    setCookie("googtrans", cookieValue);
    const base = window.location.href.split("#")[0];
    window.location.href = `${base}#googtrans=${cookieValue}`;
    setTimeout(() => {
      window.location.reload();
    }, 120);
  };

  return (
    <div
      ref={wrapperRef}
      style={{ position: "fixed", top: "10px", right: "12px", zIndex: 99999 }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open language selector"
        style={{ background: "transparent", border: "none", cursor: "pointer", padding: 6 }}
      >
        <Globe size={30} color="#41587E" />
      </button>

      {open && (
        <div className="gt-dropdown notranslate" role="menu" aria-label="Language list">
          <div className="gt-dropdown-header">
            <span style={{ fontSize: 14, fontWeight: 600 }}>Language</span>
            <button
              className="gt-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          <div className="gt-lang-list">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className="gt-lang-btn"
                onClick={() => {
                  handleLanguageSelect(lang.code);
                  setOpen(false);
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        id="google_translate_element"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "0",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          pointerEvents: "none",
          opacity: 0,
        }}
      />
    </div>
  );
};

export default GoogleTranslate;
