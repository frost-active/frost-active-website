import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');

  :root {
    --blue: #579CD3;
    --blue-mid: #4A8EC7;
    --blue-light: #EBF4FC;
    --blue-pale: #F0F7FC;
    --blue-glow: rgba(87,156,211,.12);
    --cyan: #5BB8D4;
    --pink: #FF3D8B;
    --pink-light: #FFF0F6;
    --pink-glow: rgba(255,61,139,.18);
    --white: #FFFFFF;
    --gray-200: #E2E8F0;
    --gray-400: #94A3B8;
    --gray-600: #475569;
    --gray-700: #334155;
    --gray-900: #0F172A;
  }

  .ticker-bar {
    background: linear-gradient(90deg, var(--blue), #7BB8E0, var(--blue));
    background-size: 200% 100%;
    animation: gradmove 5s ease infinite;
    padding: 10px 0;
    overflow: hidden;
    position: relative;
    z-index: 210;
  }

  @keyframes gradmove {
    0%,100% { background-position:0% 50% }
    50% { background-position:100% 50% }
  }

  .ticker-track {
    display: flex;
    animation: tickroll 26s linear infinite;
    white-space: nowrap;
    width: max-content;
  }

  .ticker-track span {
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: #fff;
    padding: 0 48px;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    opacity: .95;
  }

  .ticker-track span::after {
    content: '◆';
    font-size: 7px;
    opacity: .55;
  }

  @keyframes tickroll {
    from { transform:translateX(0) }
    to { transform:translateX(-50%) }
  }

  .navbar {
    position: fixed;
    top: 36px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 80px);
    max-width: 1200px;
    z-index: 200;
    background: rgba(255,255,255,.88);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(87,156,211,.18);
    border-radius: 100px;
    padding: 0 10px 0 20px;
    box-shadow: 0 8px 40px rgba(87,156,211,.1);
    transition: top .3s, box-shadow .3s;
    font-family: 'Outfit', sans-serif;
  }

  .navbar.scrolled {
    top: 12px;
    box-shadow: 0 12px 60px rgba(30,111,255,.15);
  }

  .nav-inner {
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .logo {
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .logo-img {
    height: 40px;
    width: auto;
    max-width: 410px;
    object-fit: contain;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nav-links a {
    font-size: 14px;
    font-weight: 500;
    color: var(--gray-600);
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 100px;
    transition: .22s;
  }

  .nav-links a:hover {
    color: var(--blue);
    background: var(--blue-pale);
  }

  .nav-links a.active {
    color: var(--blue);
    font-weight: 600;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-cta {
    background: linear-gradient(135deg, var(--pink), #FF6BAD);
    color: #fff;
    font-size: 13.5px;
    font-weight: 700;
    padding: 11px 24px;
    border-radius: 100px;
    text-decoration: none;
    white-space: nowrap;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
  }

  .hamburger span {
    width: 22px;
    height: 2px;
    background: var(--gray-700);
  }
/* HAMBURGER ANIMATION */

.hamburger {
  width: 42px;
  height: 42px;

  position: relative;

  align-items: center;
  justify-content: center;

  padding: 0;
}

.hamburger span {
  position: absolute;

  width: 22px;
  height: 2px;

  background: var(--gray-700);

  border-radius: 10px;

  transition:
    transform .3s ease,
    opacity .25s ease,
    top .3s ease;
}

/* Default 3 Lines */

.hamburger span:nth-child(1) {
  top: 14px;
}

.hamburger span:nth-child(2) {
  top: 20px;
}

.hamburger span:nth-child(3) {
  top: 26px;
}

/* OPEN STATE → X */

.hamburger.open span:nth-child(1) {
  top: 20px;
  transform: rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  top: 20px;
  transform: rotate(-45deg);
}
  .mobile-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    background: rgba(255,255,255,.97);
    padding: 20px 28px;
    border-radius: 0 0 20px 20px;
  }

  .mobile-menu.open {
    display: flex;
  }

  .mobile-menu a {
    padding: 10px 0;
    text-decoration: none;
    color: var(--gray-600);
  }

  /* ✅ MOBILE FIX ONLY */
  @media (max-width: 960px) {
    .ticker-bar {
      padding-top: 0;
    }

    .navbar {
      width: calc(100% - 40px);
      top: 52px;   /* moved below ticker */
      border-radius: 16px;
    }

    .navbar.scrolled {
      top: 52px;   /* keep same on scroll */
    }

    .nav-links {
      display: none;
    }

    .hamburger {
      display: flex;
    }

    .logo-img {
      height: 24px;
      max-width: 120px;
    }
  }
`;

const tickerItems = [
  "Up to 51% Off",
  "Early Access on Indiegogo",
  "AI Desk Wellness Device",
  "No apps. No alarms.",
  "Tracks Hydration · Focus · Movement",
  "Limited Units Available",
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = ["home", "about", "how", "pricing", "gallery", "contact"];
      let current = "home";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
   // { href: "/#about", label: "About" },
    { href: "/#how", label: "How It Works" },
    { href: "/#pricing", label: "Pricing" },
    { href : "/waterintakecalculator", label: "Water Intake Calculator" },
   // { href: "/#gallery", label: "Gallery" },
    //{ href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      <style>{styles}</style>

      <div className="ticker-bar">
        <div className="ticker-track mt-2 lg:mt-0">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      <nav className={`navbar -mt-4  lg:mt-1${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">

          <a className="logo" href="/">
            <img src="/images/logo4.png" alt="Company Logo" className="logo-img" />
          </a>

          <div className="nav-links">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={activeSection === href.split("#")[1] ? "active" : ""}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="nav-right">
            <a
              href="https://www.indiegogo.com/en/projects/frostactive-38748367/stay-hydrated-focused-balanced-meet-frost-aura"
              className="nav-cta"
            >
              Back on Indiegogo →
            </a>
          </div>

        <button
  className={`hamburger ${menuOpen ? "open" : ""}`}
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label="Toggle Menu"
>
  <span />
  <span />
  <span />
</button>
          <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </div>

        </div>
      </nav>
    </>
  );
}