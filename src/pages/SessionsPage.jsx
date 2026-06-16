import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Frost Aura — Sessions Page
 * Self-contained React component. No external dependencies.
 * Styling is injected via a scoped <style> tag so it works in any React setup.
 *
 * Brand: Frost Aura (frostactive.com) — Smart Hydration & Wellness Dock
 * Primary color: Frost Blue (#1F6FEB) with icy-cyan accents.
 */

const SESSIONS = [
  {
    id: "pomodoro-focus",
    title: "Pomodoro Focus Session",
    date: "2026-02-07",
    status: "completed",
    tag: "Focus & Productivity",
    description:
      "Our very first community session. We guided participants through the Pomodoro method paired with mindful hydration breaks — building deep focus, one calm interval at a time.",
    icon: "timer",
    bannerImage: "/images/pomodoro-session.jpeg",
  },
  {
    id: "pause-to-perform",
    title: "Pause to Perform",
    date: "2026-06-14",
    status: "upcoming",
    tag: "Performance & Wellness",
    description:
      "A hands-on session on building sustainable performance habits — energy management, hydration rhythms, and mindful breaks that keep you sharp through the day.",
    icon: "spark",
    bannerImage: "/images/pause-to-perform.jpeg",
  },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  const day = String(d.getDate()).padStart(2, "0");
  return `${day} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function daysUntil(iso) {
  const target = new Date(iso + "T00:00:00");
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

function Icon({ name }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (name === "timer") {
    return (
      <svg {...common}>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2.5" />
        <path d="M9 2h6" />
      </svg>
    );
  }
  if (name === "spark") {
    return (
      <svg {...common}>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
      </svg>
    );
  }
  if (name === "check") {
    return (
      <svg {...common}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }
  if (name === "calendar") {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="17" rx="3" />
        <path d="M3 9h18M8 2v4M16 2v4" />
      </svg>
    );
  }
  return null;
}

function Drop() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.5c3.4 4.2 6 7.6 6 11a6 6 0 1 1-12 0c0-3.4 2.6-6.8 6-11Z"
        fill="url(#dropG)"
      />
      <defs>
        <linearGradient id="dropG" x1="6" y1="3" x2="18" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5BB8FF" />
          <stop offset="1" stopColor="#1F6FEB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const FILTERS = [
  { key: "all", label: "All Sessions" },
  { key: "completed", label: "Completed" },
  { key: "upcoming", label: "Upcoming" },
];

export default function SessionsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const counts = useMemo(
    () => ({
      all: SESSIONS.length,
      completed: SESSIONS.filter((s) => s.status === "completed").length,
      upcoming: SESSIONS.filter((s) => s.status === "upcoming").length,
    }),
    []
  );

  const visible = useMemo(
    () => (filter === "all" ? SESSIONS : SESSIONS.filter((s) => s.status === filter)),
    [filter]
  );

  const handleReserveClick = (sessionId) => {
    navigate(`/sessions/${sessionId}`);
  };

  return (
    <div className="fa-root mt-16">
      <style>{styles}</style>

      {/* Atmospheric background */}
      <div className="fa-bg" aria-hidden="true">
        <span className="fa-orb fa-orb--1" />
        <span className="fa-orb fa-orb--2" />
        <span className="fa-orb fa-orb--3" />
        <span className="fa-grid" />
      </div>

      <main className="fa-container">
        {/* Header */}
        <header className="fa-header">
          <div className="fa-eyebrow">
            <Drop />
            <span>Frost Aura · Community</span>
          </div>
          <h1 className="fa-title">
            Our <span className="fa-title-accent">Sessions</span>
          </h1>
          <p className="fa-subtitle">
            Mindful gatherings on focus, hydration, and sustainable performance —
            here's everything we've hosted and what's coming up next.
          </p>

          {/* Stats 
          <div className="fa-stats">
            <div className="fa-stat">
              <span className="fa-stat-num">{counts.all}</span>
              <span className="fa-stat-label">Total</span>
            </div>
            <span className="fa-stat-divider" />
            <div className="fa-stat">
              <span className="fa-stat-num">{counts.completed}</span>
              <span className="fa-stat-label">Completed</span>
            </div>
            <span className="fa-stat-divider" />
            <div className="fa-stat">
              <span className="fa-stat-num">{counts.upcoming}</span>
              <span className="fa-stat-label">Upcoming</span>
            </div>
          </div> */}
        </header>

        {/* Filters 
        <div className="fa-filters" role="tablist" aria-label="Filter sessions">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              className={`fa-filter ${filter === f.key ? "is-active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              <span className="fa-filter-count">{counts[f.key]}</span>
            </button>
          ))}
        </div> */}

        {/* Session cards */}
        <section className="fa-grid-cards">
          {visible.map((s, i) => {
            const days = daysUntil(s.date);
            const isUpcoming = s.status === "upcoming";
            return (
              <article
                key={s.id}
                className={`fa-card ${isUpcoming ? "fa-card--upcoming" : "fa-card--completed"} ${s.id === "pomodoro-focus" ? "fa-card--compact" : ""}`}
                style={{ animationDelay: `${0.08 * i + 0.1}s` }}
              >
                {/* Banner Image */}
                <div className="fa-card-banner">
                  <img 
                    src={s.bannerImage} 
                    alt={s.title}
                    className="fa-banner-img"
                  />
                  <div className="fa-banner-overlay" />
                </div>

                <div className="fa-card-content">
                  <div className="fa-card-top">
                    <span className={`fa-card-icon ${isUpcoming ? "ic-up" : "ic-done"}`}>
                      <Icon name={s.icon} />
                    </span>
                    <span className={`fa-badge ${isUpcoming ? "badge-up" : "badge-done"}`}>
                      {isUpcoming ? (
                        <>
                          <span className="fa-dot" /> Upcoming
                        </>
                      ) : (
                        <>
                          <Icon name="check" /> Completed
                        </>
                      )}
                    </span>
                  </div>

                  <span className="fa-card-tag">{s.tag}</span>
                  <h2 className="fa-card-title">{s.title}</h2>
                  <p className="fa-card-desc">{s.description}</p>

                  <div className="fa-card-meta">
                    <span className="fa-date">
                      <Icon name="calendar" />
                      {formatDate(s.date)}
                    </span>
                    {isUpcoming && days > 0 && (
                      <span className="fa-countdown">
                        in {days} {days === 1 ? "day" : "days"}
                      </span>
                    )}
                  </div>

                  {s.id === "pomodoro-focus" ? null : (
  <button
    className={`fa-cta ${isUpcoming ? "cta-up" : "cta-done"}`}
    onClick={() => handleReserveClick(s.id)}
  >
    {isUpcoming ? "Reserve your spot" : "View Recap"}
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </button>
)}
                </div>
              </article>
            );
          })}
        </section>

        {visible.length === 0 && (
          <div className="fa-empty">No sessions in this category yet.</div>
        )}

        {/* Footer note */}
        <footer className="fa-foot">
          Stay hydrated, stay focused. — <strong>Frost Aura</strong>
        </footer>
      </main>
    </div>
  );
}

const styles = `
 @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');

.fa-root{
  --frost-primary:#1F6FEB;
  --frost-primary-deep:#0E4FC0;
  --frost-cyan:#38BDF8;
  --frost-navy:#0A2540;
  --frost-ink:#0B1B33;
  --frost-slate:#5B6B85;
  --frost-50:#F2F8FF;
  --frost-100:#E5F0FF;
  --frost-200:#CADEFF;
  --glass:rgba(255,255,255,0.72);
  --glass-border:rgba(255,255,255,0.85);

  position:relative;
  min-height:100vh;
  width:100%;
  overflow:hidden;
  font-family:'Manrope',system-ui,sans-serif;
  color:var(--frost-ink);
  background:
    radial-gradient(120% 120% at 80% -10%, #EAF4FF 0%, #F6FBFF 45%, #FFFFFF 100%);
  box-sizing:border-box;
}
.fa-root *{box-sizing:border-box;}

/* Background atmosphere 
.fa-bg{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;}
.fa-orb{position:absolute;border-radius:50%;filter:blur(60px);opacity:.55;}
.fa-orb--1{width:420px;height:420px;top:-120px;right:-80px;
  background:radial-gradient(circle at 30% 30%, #6FBBFF, #1F6FEB);}
.fa-orb--2{width:360px;height:360px;bottom:-140px;left:-100px;
  background:radial-gradient(circle at 50% 50%, #9FE0FF, #38BDF8);opacity:.4;}
.fa-orb--3{width:280px;height:280px;top:40%;left:55%;
  background:radial-gradient(circle at 50% 50%, #CFE8FF, #7CC4FF);opacity:.3;}
.fa-grid{position:absolute;inset:0;
  background-image:linear-gradient(rgba(31,111,235,.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(31,111,235,.05) 1px,transparent 1px);
  background-size:54px 54px;
  mask-image:radial-gradient(110% 80% at 50% 0%, #000 30%, transparent 75%);
  -webkit-mask-image:radial-gradient(110% 80% at 50% 0%, #000 30%, transparent 75%);}  */

/* Container */
.fa-container{position:relative;z-index:1;max-width:1120px;margin:0 auto;
  padding:72px 24px 64px;}

/* Header */
.fa-header{text-align:center;max-width:680px;margin:0 auto;}
.fa-eyebrow{display:inline-flex;align-items:center;gap:9px;
  padding:8px 16px 8px 12px;border-radius:999px;
  background:var(--glass);border:1px solid var(--glass-border);
  box-shadow:0 6px 22px rgba(31,111,235,.10);
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  font-weight:600;font-size:13px;letter-spacing:.02em;color:var(--frost-primary-deep);
  animation:faUp .7s ease both;}
.fa-title{font-family:'Fraunces',serif;font-weight:600;
  font-size:clamp(2.6rem,7vw,4.4rem);line-height:1.02;
  letter-spacing:-.02em;margin:22px 0 0;color:var(--frost-navy);
  animation:faUp .7s .08s ease both;}
.fa-title-accent{background:linear-gradient(120deg,var(--frost-primary),var(--frost-cyan));
  -webkit-background-clip:text;background-clip:text;color:transparent;font-style:italic;}
.fa-subtitle{margin:18px auto 0;max-width:560px;font-size:clamp(1rem,2.4vw,1.12rem);
  line-height:1.6;color:var(--frost-slate);animation:faUp .7s .16s ease both;}

/* Stats */
.fa-stats{display:inline-flex;align-items:center;gap:22px;margin-top:34px;
  padding:18px 30px;border-radius:20px;background:var(--glass);
  border:1px solid var(--glass-border);backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);box-shadow:0 14px 40px rgba(31,111,235,.12);
  animation:faUp .7s .24s ease both;}
.fa-stat{display:flex;flex-direction:column;align-items:center;min-width:58px;}
.fa-stat-num{font-family:'Fraunces',serif;font-size:1.9rem;font-weight:600;
  color:var(--frost-primary);line-height:1;}
.fa-stat-label{font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;
  color:var(--frost-slate);margin-top:6px;font-weight:600;}
.fa-stat-divider{width:1px;height:34px;background:linear-gradient(var(--frost-200),transparent);}

/* Filters */
.fa-filters{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;
  margin:50px auto 30px;animation:faUp .7s .3s ease both;}
.fa-filter{display:inline-flex;align-items:center;gap:8px;cursor:pointer;
  padding:11px 18px;border-radius:999px;font-family:inherit;font-weight:600;
  font-size:.92rem;color:var(--frost-slate);background:rgba(255,255,255,.6);
  border:1px solid var(--frost-200);transition:all .25s ease;}
.fa-filter:hover{color:var(--frost-primary-deep);border-color:var(--frost-primary);
  transform:translateY(-1px);}
.fa-filter.is-active{color:#fff;background:linear-gradient(120deg,var(--frost-primary),var(--frost-primary-deep));
  border-color:transparent;box-shadow:0 10px 26px rgba(31,111,235,.32);}
.fa-filter-count{font-size:.72rem;padding:2px 8px;border-radius:999px;
  background:rgba(31,111,235,.12);color:var(--frost-primary-deep);font-weight:700;}
.fa-filter.is-active .fa-filter-count{background:rgba(255,255,255,.25);color:#fff;}

/* Cards grid */
.fa-grid-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));
  gap:24px;margin-top:50px;}

.fa-card{position:relative;overflow:hidden;border-radius:24px;
  background:var(--glass);border:1px solid var(--glass-border);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  box-shadow:0 18px 50px rgba(10,37,64,.08);
  transition:transform .35s cubic-bezier(.2,.7,.3,1),box-shadow .35s ease;
  animation:faCard .6s ease both;
  display:flex;
  flex-direction:column;
}

.fa-card::before{content:"";position:absolute;inset:0 0 auto 0;height:4px;z-index:10;}
.fa-card--upcoming::before{background:linear-gradient(90deg,var(--frost-cyan),var(--frost-primary));}
.fa-card--completed::before{background:linear-gradient(90deg,#9DB4CE,#C7D6E8);}
.fa-card:hover{transform:translateY(-6px);box-shadow:0 30px 70px rgba(31,111,235,.18);}

/* Compact card for Pomodoro (removes flex-grow from description) */
.fa-card--compact .fa-card-desc{flex-grow:0;}

/* Banner Section */
.fa-card-banner{position:relative;width:100%;height:300px;overflow:hidden;flex-shrink:0;}
.fa-banner-img{width:100%;height:100%;object-fill:cover;display:block;transition:transform .5s ease;}
.fa-card:hover .fa-banner-img{transform:scale(1.05);}


/* Content Section */
.fa-card-content{padding:30px 28px 28px;flex-grow:1;display:flex;flex-direction:column;}

.fa-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;}
.fa-card-icon{display:grid;place-items:center;width:46px;height:46px;border-radius:14px;}
.ic-up{color:#fff;background:linear-gradient(135deg,var(--frost-primary),var(--frost-cyan));
  box-shadow:0 8px 20px rgba(31,111,235,.35);}
.ic-done{color:var(--frost-primary-deep);background:var(--frost-100);}

.fa-badge{display:inline-flex;align-items:center;gap:6px;padding:7px 13px;
  border-radius:999px;font-size:.76rem;font-weight:700;letter-spacing:.02em;}
.fa-badge svg{width:14px;height:14px;}
.badge-up{color:var(--frost-primary-deep);background:rgba(56,189,248,.16);
  border:1px solid rgba(56,189,248,.35);}
.badge-done{color:#3F5468;background:#EDF2F8;border:1px solid #DCE6F1;}
.fa-dot{width:7px;height:7px;border-radius:50%;background:var(--frost-cyan);
  box-shadow:0 0 0 0 rgba(56,189,248,.55);animation:faPulse 1.8s infinite;}

.fa-card-tag{display:inline-block;font-size:.74rem;font-weight:700;letter-spacing:.1em;
  text-transform:uppercase;color:var(--frost-primary);margin-bottom:8px;}
.fa-card-title{font-family:'Fraunces',serif;font-weight:600;font-size:1.55rem;
  line-height:1.15;color:var(--frost-navy);margin:0 0 12px;}
.fa-card-desc{font-size:.95rem;line-height:1.6;color:var(--frost-slate);margin:0 0 22px;flex-grow:1;}

.fa-card-meta{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:22px;}
.fa-date{display:inline-flex;align-items:center;gap:8px;font-weight:600;
  font-size:.9rem;color:var(--frost-ink);}
.fa-date svg{width:16px;height:16px;color:var(--frost-primary);}
.fa-countdown{font-size:.78rem;font-weight:700;padding:5px 11px;border-radius:999px;
  background:linear-gradient(120deg,var(--frost-primary),var(--frost-cyan));color:#fff;}

.fa-cta{display:inline-flex;align-items:center;gap:8px;cursor:pointer;
  font-family:inherit;font-weight:700;font-size:.92rem;padding:12px 20px;
  border-radius:14px;border:none;transition:all .25s ease;align-self:flex-start;}
.fa-cta svg{transition:transform .25s ease;}
.fa-cta:hover svg{transform:translateX(4px);}
.cta-up{color:#fff;background:linear-gradient(120deg,var(--frost-primary),var(--frost-primary-deep));
  box-shadow:0 12px 28px rgba(31,111,235,.3);}
.cta-up:hover{box-shadow:0 16px 34px rgba(31,111,235,.42);transform:translateY(-2px);}
.cta-done{color:var(--frost-primary-deep);background:var(--frost-100);}
.cta-done:hover{background:var(--frost-200);}

.fa-empty{text-align:center;padding:60px 20px;color:var(--frost-slate);
  font-size:1.05rem;}

.fa-foot{text-align:center;margin-top:56px;font-size:.92rem;color:var(--frost-slate);}
.fa-foot strong{color:var(--frost-primary-deep);}

/* Animations */
@keyframes faUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:none;}}
@keyframes faCard{from{opacity:0;transform:translateY(26px) scale(.98);}to{opacity:1;transform:none;}}
@keyframes faPulse{0%{box-shadow:0 0 0 0 rgba(56,189,248,.5);}70%{box-shadow:0 0 0 8px rgba(56,189,248,0);}100%{box-shadow:0 0 0 0 rgba(56,189,248,0);}}

/* Responsive */
@media (max-width:1024px){
  .fa-card-banner{height:300px;}
}

@media (max-width:768px){
  .fa-card-banner{height:250px;}
}

@media (max-width:640px){
  .fa-container{padding:52px 18px 48px;}
  .fa-stats{gap:14px;padding:16px 20px;}
  .fa-grid-cards{grid-template-columns:1fr;}
  .fa-card{padding:0;}
  .fa-card-content{padding:20px 18px 18px;}
  .fa-card-banner{height:220px;}
  .fa-card-title{font-size:1.3rem;}
  .fa-card-desc{font-size:.9rem;}
}

@media (max-width:480px){
  .fa-container{padding:40px 12px 32px;}
  .fa-card-banner{height:200px;}
  .fa-card-content{padding:16px 14px 14px;}
  .fa-card-title{font-size:1.1rem;}
  .fa-cta{font-size:.85rem;padding:10px 16px;}
}

@media (max-width:360px){
  .fa-container{padding:32px 10px 24px;}
  .fa-card-banner{height:180px;}
  .fa-card-content{padding:14px 12px 12px;}
  .fa-card-title{font-size:1rem;}
  .fa-card-desc{font-size:.85rem;}
}

@media (prefers-reduced-motion:reduce){
  .fa-root *{animation:none !important;transition:none !important;}
}
`;
