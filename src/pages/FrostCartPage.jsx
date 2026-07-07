import React, { useState } from "react";
import {
  Droplet,
  Clock,
  Waves,
  Activity,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// FROST AURA — Pre-Book / Cart Page
// Brand blue: #389ED7  |  Font: Roboto only  |  Background: white / light
//
// TO DO: replace the placeholder below with your real product photo.
// Native image size: 1280 x 662 — the frame below is sized to match
// that exact ratio, so the photo fills it edge to edge with no crop.
const PRODUCT_IMAGE_SRC = "/images/heroimg1.jpeg";
const INDIEGOGO_URL =
  "https://www.indiegogo.com/en/projects/frostactive-38748367/stay-hydrated-focused-balanced-meet-frost-aura";
const UNIT_PRICE = 49;
const ORIGINAL_PRICE = 99;
// ─────────────────────────────────────────────────────────────

export default function FrostAuraCartPage() {
  const [imgFailed, setImgFailed] = useState(false);

  const goToIndiegogo = () => {
    window.open(INDIEGOGO_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fa-page lg:mt-4 mt-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

        :root{
          --fa-blue: #389ED7;
          --fa-blue-dark: #1F7FAE;
          --fa-blue-deep: #145E86;
          --fa-ice: #EFF8FC;
          --fa-ice-2: #E1F1FA;
          --fa-line: #D8ECF6;
          --fa-text: #16262E;
          --fa-muted: #5D7885;
          --fa-white: #FFFFFF;
        }

        .fa-page{
          font-family: 'Roboto', Arial, sans-serif;
          background: var(--fa-white);
          color: var(--fa-text);
          min-height: 100%;
          width: 100%;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }
        .fa-page *{ box-sizing: border-box; }

        /* ---------- Hero ---------- */
        .fa-hero{
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 48px;
          align-items: center;
          padding: clamp(32px, 6vw, 72px) clamp(20px, 5vw, 64px);
          max-width: 1240px;
          margin: 0 auto;
        }

        /* Image frame sized to the product photo's native 1280:662 ratio,
           so the image fills it completely with zero letterboxing/cropping */
        .fa-hero-visual{
          position: relative;
          width: 100%;
          
          aspect-ratio: 1280 / 962;  /* ---------- 662  ---------- */
          border-radius: 24px;
         /*--------------- background: linear-gradient(145deg, var(--fa-ice) 0%, var(--fa-ice-2) 100%);
          box-shadow: 0 24px 50px -28px rgba(20,94,134,0.35); ----------------- */
          overflow: hidden;
        }
           /* ---------- Cart / Pre-book card ---------- */
        .fa-product-img{
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .fa-img-placeholder{
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: var(--fa-blue-dark);
          text-align: center;
          padding: 24px;
        }
        .fa-img-placeholder-icon{
          width: 56px; height: 56px;
          border-radius: 50%;
          background: var(--fa-white);
          border: 1.5px dashed var(--fa-blue);
          display: flex; align-items: center; justify-content: center;
        }
        .fa-img-placeholder span{
          font-size: 12.5px;
          font-weight: 500;
          color: var(--fa-muted);
          max-width: 220px;
        }

        .fa-eyebrow{
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--fa-ice-2);
          color: var(--fa-blue-deep);
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 999px;
          margin-bottom: 18px;
        }
        .fa-hero h1{
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 900;
          line-height: 1.12;
          margin: 0 0 16px;
          letter-spacing: -0.5px;
        }
        .fa-hero h1 span{ color: var(--fa-blue); }
        .fa-hero p.fa-sub{
          font-size: 16px;
          color: var(--fa-muted);
          font-weight: 400;
          max-width: 480px;
          margin: 0 0 26px;
        }
        .fa-price-row{
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 24px;
        }
        .fa-price-row .fa-price{
          font-size: 40px;
          font-weight: 900;
          color: var(--fa-text);
        }
        .fa-price-row .fa-price-tag{
          font-size: 13px;
          font-weight: 600;
          color: var(--fa-blue-dark);
          background: var(--fa-ice-2);
          padding: 5px 10px;
          border-radius: 8px;
        }
        .fa-price-row .fa-price-original{
          font-size: 22px;
          font-weight: 700;
          color: var(--fa-muted);
          text-decoration: line-through;
          text-decoration-color: #E0555C;
          text-decoration-thickness: 2px;
        }
        .fa-price-row .fa-price-offer-tag{
          display: inline-flex;
          align-items: center;
          font-size: 12.5px;
          font-weight: 800;
          letter-spacing: 0.3px;
          color: var(--fa-white);
          background: #E0555C;
          padding: 5px 10px;
          border-radius: 8px;
        }
        .fa-cta-primary{
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--fa-blue);
          color: var(--fa-white);
          font-family: 'Roboto', sans-serif;
          font-size: 15.5px;
          font-weight: 700;
          border: none;
          padding: 15px 26px;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.1s ease;
        }
        .fa-cta-primary:hover{ background: var(--fa-blue-dark); transform: translateY(-1px); }
        .fa-cta-primary:active{ transform: translateY(0); }
        .fa-hero-note{
          margin-top: 14px;
          font-size: 13px;
          color: var(--fa-muted);
        }

        /* ---------- Cart / Pre-book card ---------- */
        .fa-cart-section{
          padding: 0 clamp(20px, 5vw, 64px) clamp(40px, 6vw, 72px);
          max-width: 1240px;
          margin: 0 auto;
        }
        .fa-cart-card{
          background: var(--fa-white);
          border: 1px solid var(--fa-line);
          border-radius: 22px;
          box-shadow: 0 20px 45px -25px rgba(20,94,134,0.25);
          padding: clamp(20px, 3vw, 34px);
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 32px;
        }
        .fa-cart-heading{
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--fa-blue-deep);
          margin-bottom: 18px;
        }
        .fa-cart-item{
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--fa-line);
        }
        .fa-cart-thumb{
          width: 84px; height: 84px;
          border-radius: 14px;
          background: var(--fa-ice);
          overflow: hidden;
          
        }
        .fa-cart-thumb img{ width: 100%; height: 100%; object-fit: cover; }
        .fa-cart-item-info h3{
          margin: 0 0 4px;
          font-size: 16.5px;
          font-weight: 700;
        }
        .fa-cart-item-info p{
          margin: 0 0 8px;
          font-size: 13.5px;
          color: var(--fa-muted);
        }
        .fa-limit-badge{
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          color: var(--fa-blue-deep);
          background: var(--fa-ice-2);
          padding: 4px 9px;
          border-radius: 999px;
        }
        .fa-prebook-note{
          display: flex;
          gap: 10px;
          background: var(--fa-ice);
          border: 1px solid var(--fa-line);
          border-radius: 14px;
          padding: 14px 16px;
          font-size: 13.5px;
          color: var(--fa-text);
          margin-top: 18px;
        }
        .fa-prebook-note b{ color: var(--fa-blue-deep); }

        .fa-summary{
          background: var(--fa-ice);
          border-radius: 16px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          height: fit-content;
        }
        .fa-summary-row{
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: var(--fa-muted);
        }
        .fa-summary-row.total{
          font-size: 18px;
          font-weight: 800;
          color: var(--fa-text);
        }
        .fa-summary-divider{
          height: 1px;
          background: var(--fa-line);
          margin: 2px 0;
        }
        .fa-summary .fa-cta-primary{
          width: 100%;
          justify-content: center;
          margin-top: 4px;
        }
        .fa-secure-line{
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--fa-muted);
          justify-content: center;
        }

        /* ---------- How it works ---------- */
        .fa-steps-section{
          background: var(--fa-ice);
          padding: clamp(40px, 6vw, 64px) clamp(20px, 5vw, 64px);
        }
        .fa-steps-inner{ max-width: 1240px; margin: 0 auto; }
        .fa-section-title{
          font-size: 26px;
          font-weight: 900;
          margin: 0 0 8px;
          letter-spacing: -0.3px;
        }
        .fa-section-sub{
          font-size: 14.5px;
          color: var(--fa-muted);
          margin: 0 0 32px;
          max-width: 560px;
        }
        .fa-steps-grid{
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .fa-step-card{
          background: var(--fa-white);
          border: 1px solid var(--fa-line);
          border-radius: 16px;
          padding: 22px;
        }
        .fa-step-num{
          width: 30px; height: 30px;
          border-radius: 50%;
          background: var(--fa-blue);
          color: var(--fa-white);
          font-size: 13px;
          font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
        }
        .fa-step-card h4{ margin: 0 0 6px; font-size: 15.5px; font-weight: 700; }
        .fa-step-card p{ margin: 0; font-size: 13.5px; color: var(--fa-muted); }

        /* ---------- Features ---------- */
        .fa-features-section{
          padding: clamp(40px, 6vw, 64px) clamp(20px, 5vw, 64px);
          max-width: 1240px;
          margin: 0 auto;
        }
        .fa-features-grid{
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .fa-feature{
          border: 1px solid var(--fa-line);
          border-radius: 16px;
          padding: 20px;
        }
        .fa-feature-icon{
          width: 40px; height: 40px;
          border-radius: 10px;
          background: var(--fa-ice-2);
          color: var(--fa-blue-deep);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 12px;
        }
        .fa-feature h4{ margin: 0 0 6px; font-size: 14.5px; font-weight: 700; }
        .fa-feature p{ margin: 0; font-size: 13px; color: var(--fa-muted); }

        /* ---------- Bottom CTA banner ---------- */
        .fa-banner{
          margin: 0 clamp(20px, 5vw, 64px) clamp(48px, 6vw, 72px);
          max-width: 1240px;
          margin-left: auto;
          margin-right: auto;
          background: linear-gradient(120deg, var(--fa-blue) 0%, var(--fa-blue-deep) 100%);
          border-radius: 24px;
          padding: clamp(28px, 5vw, 44px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          color: var(--fa-white);
        }
        .fa-banner h3{ margin: 0 0 6px; font-size: 22px; font-weight: 800; }
        .fa-banner p{ margin: 0; font-size: 14px; opacity: 0.9; }
        .fa-banner .fa-cta-primary{
          background: var(--fa-white);
          color: var(--fa-blue-deep);
          flex-shrink: 0;
        }
        .fa-banner .fa-cta-primary:hover{ background: var(--fa-ice); }

        /* ---------- Responsive ---------- */
        @media (max-width: 900px){
          .fa-hero{ grid-template-columns: 1fr; }
          .fa-hero-visual{ max-width: 520px; margin: 0 auto; }
          .fa-cart-card{ grid-template-columns: 1fr; }
          .fa-steps-grid{ grid-template-columns: 1fr; }
          .fa-features-grid{ grid-template-columns: repeat(2, 1fr); }
          .fa-banner{ flex-direction: column; text-align: center; }
        }
        @media (max-width: 520px){
          .fa-features-grid{ grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <section className="fa-hero">
        <div className="fa-hero-visual">
          {!imgFailed ? (
            <img
              className="fa-product-img"
              src={PRODUCT_IMAGE_SRC}
              alt="Frost Aura smart hydration and wellness dock"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="fa-img-placeholder">
              <span className="fa-img-placeholder-icon">
                <Droplet size={26} color="#389ED7" />
              </span>
              <span>Product image goes here — add your Frost Aura photo</span>
            </div>
          )}
        </div>

        <div>
          <span className="fa-eyebrow">
            <Droplet size={13} /> Pre-Book Now Open
          </span>
          <h1>
            Reserve the <span>Frost Aura</span> smart wellness dock
          </h1>
          <p className="fa-sub">
            A desk companion that nudges you to hydrate, breathe, and move
            with gentle light cues, a focus timer, and sound-based water
            energizing. Pre-book here, then confirm your spot on Indiegogo.
          </p>
          <div className="fa-price-row">
            <span className="fa-price">${UNIT_PRICE}</span>
            <span className="fa-price-original">${ORIGINAL_PRICE}</span>
            <span className="fa-price-offer-tag">50% OFF</span>
          </div>
          <button className="fa-cta-primary" onClick={goToIndiegogo}>
            Pre-book on Indiegogo <ArrowUpRight size={17} />
          </button>
          <p className="fa-hero-note">
            You'll complete your reservation securely on our official
            Indiegogo campaign page.
          </p>
        </div>
      </section>

      {/* Cart / pre-book card */}
      <section className="fa-cart-section">
        <div className="fa-cart-card">
          <div>
            <div className="fa-cart-heading">
              <CheckCircle2 size={15} /> Your pre-book
            </div>

            <div className="fa-cart-item">
              <div className="fa-cart-thumb">
                {!imgFailed ? (
                  <img src={PRODUCT_IMAGE_SRC} alt="Frost Aura" onError={() => setImgFailed(true)} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Droplet size={24} color="#389ED7" />
                  </div>
                )}
              </div>
              <div className="fa-cart-item-info">
                <h3>Frost Aura — Smart Wellness Dock</h3>
                <p>Includes desk dock, light + sound cues, companion app</p>
                <span className="fa-limit-badge">
                  <CheckCircle2 size={12} /> Limited to 1 unit per pre-book
                </span>
              </div>
            </div>

            <div className="fa-prebook-note">
              <ShieldCheck size={18} color="#389ED7" style={{ flexShrink: 0 }} />
              <span>
                <b>This is a pre-book, not a final checkout.</b> Clicking
                "Continue to Indiegogo" takes you to our official campaign
                page to complete and secure your pledge.
              </span>
            </div>
          </div>

          <div className="fa-summary">
            <div className="fa-summary-row">
              <span>Frost Aura — 1 unit</span>
              <span>
                <span style={{ textDecoration: "line-through", textDecorationColor: "#E0555C", marginRight: 8, opacity: 0.75 }}>
                  ${ORIGINAL_PRICE.toFixed(2)}
                </span>
                ${UNIT_PRICE.toFixed(2)}
              </span>
            </div>
            <div className="fa-summary-divider" />
            <div className="fa-summary-row total">
              <span>Total due on Indiegogo</span>
              <span>${UNIT_PRICE.toFixed(2)}</span>
            </div>
            <button className="fa-cta-primary" onClick={goToIndiegogo}>
              Continue to Indiegogo <ArrowUpRight size={17} />
            </button>
            <div className="fa-secure-line">
              <ShieldCheck size={13} /> Secured via Indiegogo checkout
            </div>
          </div>
        </div>
      </section>

      {/* How pre-booking works */}
      <section className="fa-steps-section">
        <div className="fa-steps-inner">
          <h2 className="fa-section-title">How pre-booking works</h2>
          <p className="fa-section-sub">
            Three simple steps between here and your Frost Aura arriving on
            your desk.
          </p>
          <div className="fa-steps-grid">
            <div className="fa-step-card">
              <div className="fa-step-num">1</div>
              <h4>Reserve here</h4>
              <p>Lock in the ${UNIT_PRICE} offer price (50% off ${ORIGINAL_PRICE}) for your one unit.</p>
            </div>
            <div className="fa-step-card">
              <div className="fa-step-num">2</div>
              <h4>Confirm on Indiegogo</h4>
              <p>Complete your pledge securely on our official campaign page.</p>
            </div>
            <div className="fa-step-card">
              <div className="fa-step-num">3</div>
              <h4>Get shipping updates</h4>
              <p>We'll keep you posted on production and delivery timelines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="fa-features-section">
        <h2 className="fa-section-title">What's inside Frost Aura</h2>
        <p className="fa-section-sub">
          Built to make small, healthy habits easy to keep during a long
          workday.
        </p>
        <div className="fa-features-grid">
          <div className="fa-feature">
            <div className="fa-feature-icon">
              <Droplet size={19} />
            </div>
            <h4>Hydration reminders</h4>
            <p>Gentle cues so you never lose track of your water intake.</p>
          </div>
          <div className="fa-feature">
            <div className="fa-feature-icon">
              <Clock size={19} />
            </div>
            <h4>Focus timer</h4>
            <p>Built-in pomodoro-style sessions to structure deep work.</p>
          </div>
          <div className="fa-feature">
            <div className="fa-feature-icon">
              <Waves size={19} />
            </div>
            <h4>Sound-based energizing</h4>
            <p>Soothing tones designed to work alongside your routine.</p>
          </div>
          <div className="fa-feature">
            <div className="fa-feature-icon">
              <Activity size={19} />
            </div>
            <h4>Movement nudges</h4>
            <p>Breaks the habit of long sitting with light, timely prompts.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA banner */}
      <div className="fa-banner">
        <div>
          <h3>Ready to reserve your Frost Aura?</h3>
          <p>
            Offer price{" "}
            <span style={{ textDecoration: "line-through", opacity: 0.75, marginRight: 6 }}>
              ${ORIGINAL_PRICE}
            </span>
            ${UNIT_PRICE} — complete your pledge on Indiegogo.
          </p>
        </div>
        <button className="fa-cta-primary" onClick={goToIndiegogo}>
          Pre-book on Indiegogo <ArrowUpRight size={17} />
        </button>
      </div>
    </div>
  
  );
}