import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from '@/components/ui/use-toast';
import ProductHuntLaunch from "../components/ProductHuntLaunch";

/* ─────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }

  :root {
    --blue: #579CD3; --blue-mid: #4A8EC7; --blue-light: #EBF4FC;
    --blue-pale: #F0F7FC; --blue-glow: rgba(87,156,211,.12);
    --cyan: #5BB8D4; --pink: #FF3D8B; --pink-light: #FFF0F6;
    --pink-glow: rgba(255,61,139,.18); --white: #FFFFFF; --off: #FAFCFF;
    --gray-50: #F8FAFC; --gray-100: #F1F5F9; --gray-200: #E2E8F0;
    --gray-400: #94A3B8; --gray-600: #475569; --gray-700: #334155;
    --gray-900: #0F172A; --r: 16px; --r-lg: 24px; --r-xl: 36px;
    --shadow-sm: 0 2px 12px rgba(87,156,211,.08);
    --shadow-md: 0 8px 40px rgba(87,156,211,.13);
    --shadow-lg: 0 24px 80px rgba(87,156,211,.16);
  }

  body { font-family: 'Outfit', sans-serif; background: #fff; color: var(--gray-700); overflow-x: hidden; line-height: 1.6; }

  /* ── HERO ── */
  .hero {
    min-height: 100vh; background: #fff;
    display: flex; align-items: center;
    padding: 140px 80px 80px; position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 50% at 80% 20%, rgba(87,156,211,.07) 0%, transparent 60%),
                radial-gradient(ellipse 40% 40% at 10% 80%, rgba(91,184,212,.05) 0%, transparent 60%);
    pointer-events: none;
  }
  .hero-deco { position: absolute; pointer-events: none; }
  .hero-deco.d1 { width:500px;height:500px;border-radius:50%;border:1px solid rgba(87,156,211,.08);top:-100px;right:-150px; }
  .hero-deco.d2 { width:300px;height:300px;border-radius:50%;border:1px solid rgba(87,156,211,.06);top:50px;right:-50px; }
  .hero-deco.d3 { width:120px;height:120px;border-radius:50%;background:rgba(91,184,212,.07);bottom:100px;left:60px; }
  .hero-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 70px; align-items: center; width: 100%;
  }

  .h-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg,#EBF4FC,#DCF0FA);
    border: 1px solid #A8D1EF; color: var(--blue);
    font-size: 12.5px; font-weight: 700; padding: 7px 16px;
    border-radius: 100px; margin-bottom: 28px; letter-spacing: .03em;
  }
  .h-badge-dot {
    width: 7px; height: 7px; background: var(--cyan); border-radius: 50%;
    animation: dotpulse 2s ease infinite;
  }
  @keyframes dotpulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(.7);opacity:.5} }

  .hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(40px,5vw,66px); line-height: 1.06;
    color: var(--gray-900); margin-bottom: 22px; letter-spacing: -.01em;
  }
  .hero h1 .grad {
    background: linear-gradient(135deg,var(--blue),var(--cyan));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hero h1 .pinkgrad {
    background: linear-gradient(135deg,var(--pink),#FF8CC8);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hero-sub { font-size: 17px; font-weight: 400; color: var(--gray-600); line-height: 1.75; max-width: 480px; margin-bottom: 40px; }

  /* Hero form */
  .hero-form {
   
    border-radius: 24px; padding: 32px 28px;
    display: flex; flex-direction: column; gap: 14px;
    box-shadow: 0 16px 60px rgba(6, 60, 105, 0.46);
  }
  .hf-input {
    background: rgba(107, 164, 196, 0.41); border: none; border-radius: 10px;
    padding: 10px 22px; font-size: 15px; font-family: 'Outfit', sans-serif;
    color: #0F172A; width: 100%; outline: none; transition: background .2s;
    backdrop-filter: blur(4px);
  }
  .hf-input::placeholder { color: rgba(10,40,80,.55); font-weight: 500; }
  .hf-input:focus { background: #93c9e4; }
  .hf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .hf-row-submit { grid-template-columns: 1fr auto; }
  .hf-submit {
    background: #0A1F3C; color: #fff; border: none;
    border-radius: 10px; padding: 10px 32px;
    font-size: 15px; font-weight: 700; font-family: 'Outfit', sans-serif;
    cursor: pointer; white-space: nowrap; transition: all .25s; letter-spacing: .02em;
  }
  .hf-submit:hover { background: #0D2851; transform: translateY(-1px); }

  /* Hero right */
.hero-right { position: relative; }

.hero-img-wrap {
  position: relative;
  border-radius: var(--r-xl);
  overflow: hidden;
  box-shadow: 0 32px 100px rgba(87,156,211,.18);
}

.hero-img-wrap img {
  width: 100%;
  height: 520px;
  object-fit: cover;
  object-position: center;
  display: block;
}

.hero-img-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg,transparent 55%,rgba(15,23,42,.25));
}

/* Mobile view fix */
@media (max-width: 767px) {
  .hero-img-wrap {
    overflow: visible; /* Allow image to be fully visible */
  }

  .hero-img-wrap img {
    height: auto; /* Let image scale naturally */
    object-fit: contain; /* Show complete image without cropping */
    object-position: center;
  }

  .hero-right {
    width: 100%;
    overflow: visible;
  }
}
  /* Floating cards */
  .fc {
    position: absolute; background: #fff; border-radius: var(--r);
    padding: 13px 17px; display: flex; align-items: center; gap: 11px;
    box-shadow: 0 10px 40px rgba(0,0,0,.12); border: 1px solid rgba(255,255,255,.8);
    animation: float 4.5s ease-in-out infinite; z-index: 2;
  }
  .fc1 { top: 36px; left: -36px; animation-delay: 0s; }
  .fc2 { top: 15%; right: -32px; transform: translateY(-50%); animation-delay: 1.6s; }
  .fc3 { bottom: 30px; left: -26px; animation-delay: .9s; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  .fc2 { transform: translateY(-50%); }
  .fc-ico {
    width: 40px; height: 40px; border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    font-size: 19px; flex-shrink: 0;
  }
  .hp-blue { background: linear-gradient(135deg,#DBEAFE,#BFDBFE); }
  .hp-cyan { background: linear-gradient(135deg,#CFFAFE,#A5F3FC); }
  .hp-pink { background: linear-gradient(135deg,#FCE7F3,#FBCFE8); }
  .fc-lbl { font-size: 16px; color: var(--gray-400); font-weight: 500; line-height: 1.2; }
  .fc-val { font-size: 18px; font-weight: 800; color: var(--gray-900); line-height: 1.2; font-family: 'DM Serif Display', serif; }
  .fc-unit { font-size: 11px; color: var(--gray-300); }

  /* Wave */
  .wave { display: block; width: 100%; line-height: 0; overflow: hidden; }

  @media (max-width: 767px) {

   .fc1 { top: -10px; left: -36px; animation-delay: 0s; }
  .fc2 { top: 1%; right: -32px; transform: translateY(-50%); animation-delay: 1.6s; }
  .fc3 { bottom: -10px; left: -26px; animation-delay: .9s; }

  .hero-img-wrap,
  .hero-img-wrap img {
    border-radius: 20px;
  }

  .hero-img-wrap {
    overflow: hidden;
  }

  .hero-img-wrap img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}

  /* ── SECTION 2 ── */
  .s2 { background: var(--blue-pale); padding: 110px 80px; }
  .s2-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 90px;
  align-items: center;
}

  .eyebrow {
    font-size: 11px; font-weight: 800; letter-spacing: .22em;
    text-transform: uppercase; color: var(--blue);
    display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
  }
  .eyebrow::before {
    content: ''; width: 28px; height: 2.5px;
    background: linear-gradient(90deg,var(--blue),var(--cyan)); border-radius: 2px;
  }
  .s2 h2 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(28px,3.2vw,46px); line-height: 1.12;
    color: var(--gray-900); margin-bottom: 18px;
  }
  .s2 .section-desc { font-size: 16.5px; color: var(--gray-600); line-height: 1.75; margin-bottom: 44px; }

  .feature-list { display: flex; flex-direction: column; gap: 2px; }
  .fi {
    display: flex; align-items: flex-start; gap: 18px;
    padding: 22px 20px; border-radius: var(--r-lg);
    transition: all .3s; cursor: default;
  }
  .fi:hover { background: #fff; box-shadow: var(--shadow-sm); }
  .fi-num {
    font-size: 12px; font-weight: 800; color: var(--blue);
    background: var(--blue-light); width: 34px; height: 34px;
    border-radius: 10px; display: flex; align-items: center;
    justify-content: center; flex-shrink: 0; margin-top: 2px;
  }
  .fi h4 { font-size: 15.5px; font-weight: 700; color: var(--gray-900); margin-bottom: 6px; }
  .fi p { font-size: 14px; color: var(--gray-600); line-height: 1.65; }

  .s2-vis {
  position: relative;
}

.s2-img-main {
  width: 100%;
  height: 520px;
  object-fit: cover;
  object-position: center top;
  border-radius: var(--r-xl);
  display: block;
  box-shadow: var(--shadow-lg);
}

.s2-img-overlay {
  position: absolute;
  inset: 0;
  border-radius: var(--r-xl);
  background: linear-gradient(180deg,transparent 50%,rgba(15,23,42,.55));
}

.s2-stats-bar {
  position: absolute;
  bottom: 28px;
  left: 24px;
  right: 24px;
  display: flex;
  gap: 10px;
}

/* Mobile view fix */
@media (max-width: 767px) {
  .s2-inner {
    grid-template-columns: 1fr; /* Stack vertically on mobile */
    gap: 40px;
  }

  .s2-vis {
    position: relative;
    overflow: visible; /* Allow image to be fully visible */
  }

  .s2-img-main {
    height: auto; /* Let image scale naturally */
    object-fit: contain; /* Show complete image without cropping */
    object-position: center;
  }

  .s2-img-overlay {
    /* Keep overlay as is */
  }

  .s2-stats-bar {
    bottom: 16px;
    left: 16px;
    right: 16px;
    gap: 8px;
    flex-wrap: wrap; /* Allow stats to wrap on small screens */
  }
}
  .s2-sb {
    flex: 1; background: rgba(255,255,255,.14); backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,.28);
    border-radius: 14px; padding: 14px 12px; text-align: center;
  }
  .s2-sv { font-family: 'DM Serif Display', serif; font-size: 24px; color: #fff; line-height: 1; }
  .s2-sl { font-size: 11px; color: rgba(255,255,255,.6); margin-top: 4px; font-weight: 500; }
  .s2-badge {
    position: absolute; top: 28px; right: -20px;
    background: #fff; border-radius: 14px; padding: 12px 18px;
    box-shadow: 0 10px 40px rgba(30,111,255,.15); border: 1px solid var(--gray-100);
    text-align: center;
  }
  .s2-badge-ico { font-size: 22px; margin-bottom: 4px; }
  .s2-badge-val { font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--blue); line-height: 1; }
  .s2-badge-lbl { font-size: 11px; color: var(--gray-400); font-weight: 500; }

  /* ── SECTION 3 ── */
  .s3 { background: #fff; padding: 110px 80px; text-align: center; }
  .s3-inner { max-width: 1160px; margin: 0 auto; }
  .s3 h2 { font-family: 'DM Serif Display', serif; font-size: clamp(28px,4vw,52px); color: var(--gray-900); margin-bottom: 14px; }
  .s3 .section-desc { font-size: 16px; color: var(--gray-600); max-width: 500px; margin: 0 auto 72px; }

  .steps-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 22px; margin-bottom: 80px; }
  .step-card {
    background: var(--blue-pale); border: 1.5px solid #C8DFF0;
    border-radius: var(--r-lg); padding: 34px 22px 28px;
    text-align: left; position: relative; overflow: hidden;
    transition: all .35s; cursor: default;
  }
  .step-card:hover { transform: translateY(-8px); box-shadow: 0 24px 64px rgba(87,156,211,.14); border-color: #A8CBE8; background: #fff; }
  .step-card::after {
    content: attr(data-n); position: absolute; bottom: -16px; right: 10px;
    font-family: 'DM Serif Display', serif; font-size: 100px;
    color: rgba(87,156,211,.06); line-height: 1; pointer-events: none;
  }
  .sc-ico-wrap {
    width: 56px; height: 56px; border-radius: 16px;
    background: linear-gradient(135deg,var(--blue),var(--cyan));
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; margin-bottom: 20px; box-shadow: 0 6px 20px rgba(87,156,211,.28);
  }
  .sc-title { font-size: 16px; font-weight: 700; color: var(--gray-900); margin-bottom: 9px; }
  .sc-desc { font-size: 13.5px; color: var(--gray-600); line-height: 1.65; }
  .sc-chip {
    display: inline-block; margin-top: 16px; font-size: 11px; font-weight: 700;
    color: var(--blue); background: var(--blue-light); padding: 4px 12px;
    border-radius: 100px; letter-spacing: .04em;
  }

  /* Process banner */
  .proc-wrap {
    border-radius: var(--r-xl); overflow: hidden; position: relative;
    height: 400px; display: grid; grid-template-columns: 1fr 1fr;
  }
  .proc-left { position: relative; overflow: hidden; }
  .proc-left img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; display: block; }
  .proc-ov {
    position: absolute; inset: 0;
    background: linear-gradient(110deg,rgba(87,156,211,.92) 0%,rgba(91,184,212,.75) 60%,rgba(87,156,211,.4) 100%);
  }
  .proc-content { position: absolute; top: 50%; left: 48px; right: 32px; transform: translateY(-50%); }
  .proc-content h3 { font-family: 'DM Serif Display', serif; font-size: clamp(22px,2.4vw,34px); color: #fff; line-height: 1.18; margin-bottom: 12px; }
  .proc-content p { font-size: 14.5px; color: rgba(255,255,255,.8); max-width: 300px; line-height: 1.68; }
  .proc-pills { display: flex; gap: 8px; margin-top: 20px; flex-wrap: wrap; }
  .proc-pill {
    background: rgba(255,255,255,.18); border: 1px solid rgba(255,255,255,.3);
    backdrop-filter: blur(8px); color: #fff; font-size: 11.5px;
    font-weight: 600; padding: 5px 13px; border-radius: 100px;
  }
  .proc-right { position: relative; overflow: hidden; }
  .proc-right img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; transition: transform .5s ease; }
  .proc-right:hover img { transform: scale(1.04); }
  .proc-right-overlay { position: absolute; inset: 0; background: linear-gradient(180deg,transparent 55%,rgba(10,37,64,.35)); }
  .proc-right-tag {
    position: absolute; bottom: 20px; left: 20px;
    background: rgba(255,255,255,.92); backdrop-filter: blur(10px);
    border-radius: 12px; padding: 10px 16px;
    display: flex; align-items: center; gap: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,.1);
  }
  .proc-right-tag-ico { font-size: 20px; }
  .proc-right-tag-text { font-size: 12px; font-weight: 700; color: #0F172A; line-height: 1.3; }
  .proc-right-tag-sub { font-size: 11px; color: #579CD3; font-weight: 600; }

  /* ── SECTION 4 (Pricing) ── */
  .s4 {
    background: linear-gradient(135deg,#EFF6FF 0%,#F0FCFF 50%,#FFF0F6 100%);
    padding: 110px 80px; text-align: center;
  }
  .s4-inner { max-width: 1020px; margin: 0 auto; }
  .s4 h2 { font-family: 'DM Serif Display', serif; font-size: clamp(28px,4vw,52px); color: var(--gray-900); margin-bottom: 14px; }
  .s4 .section-desc { font-size: 16px; color: var(--gray-600); margin-bottom: 48px; }

  .cdown { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 58px; }
  .cdb { background: #fff; border: 1.5px solid #C8DFF0; border-radius: 16px; padding: 20px 28px; min-width: 90px; text-align: center; box-shadow: 0 4px 20px rgba(87,156,211,.1); }
  .cdn { font-family: 'DM Serif Display', serif; font-size: 42px; color: var(--blue); line-height: 1; display: block; }
  .cdl { font-size: 10.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--gray-400); margin-top: 6px; display: block; }
  .cdsep { font-family: 'DM Serif Display', serif; font-size: 36px; color: var(--blue-mid); opacity: .4; margin-bottom: 24px; }

  .prow { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; margin-bottom: 50px; }
  .pc {
    background: #fff; border: 1.5px solid var(--gray-200);
    border-radius: var(--r-lg); padding: 30px 20px 26px;
    text-align: center; transition: all .3s; position: relative; overflow: hidden;
  }
  .pc:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: #A8CBE8; }
  .pc.star { border: 2.5px solid var(--pink); box-shadow: 0 12px 52px var(--pink-glow); }
  .pc.star:hover { transform: translateY(-6px); box-shadow: 0 20px 60px var(--pink-glow); }
  .best-badge {
    position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(135deg,var(--pink),#FF6BAD); color: #fff;
    font-size: 10px; font-weight: 800; letter-spacing: .1em;
    text-transform: uppercase; padding: 5px 16px;
    border-radius: 0 0 12px 12px; white-space: nowrap;
  }
  .pc-tier { font-size: 10.5px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: var(--gray-400); margin-top: 8px; margin-bottom: 16px; }
  .pc-amt { font-family: 'DM Serif Display', serif; font-size: 52px; color: var(--gray-900); line-height: 1; }
  .pc-amt sup { font-size: 24px; vertical-align: super; font-family: 'Outfit', sans-serif; font-weight: 600; }
  .pc.star .pc-amt { color: var(--pink); }
  .pc-save { font-size: 13px; font-weight: 700; color: var(--pink); margin-top: 10px; }
  .pc-was { font-size: 12px; color: var(--gray-400); text-decoration: line-through; margin-top: 4px; }
  .pc-cta {
    display: inline-block; margin-top: 20px;
    background: var(--blue-pale); color: var(--blue);
    font-size: 12.5px; font-weight: 700; padding: 8px 18px;
    border-radius: 100px; text-decoration: none;
    transition: all .2s; border: 1px solid #A8CBE8;
  }
  .pc-cta:hover { background: var(--blue-light); }
  .pc.star .pc-cta { background: var(--pink-light); color: var(--pink); border-color: #FBCFE8; }
  .pc.star .pc-cta:hover { background: #FCE7F3; }

  .btn-pink-lg {
    display: inline-flex; align-items: center; gap: 10px;
    background: linear-gradient(135deg,var(--pink),#FF6BAD);
    color: #fff; font-size: 16.5px; font-weight: 700;
    padding: 19px 52px; border-radius: 100px;
    text-decoration: none; transition: all .3s;
    box-shadow: 0 8px 40px var(--pink-glow); letter-spacing: .01em;
  }
  .btn-pink-lg:hover { transform: translateY(-3px); box-shadow: 0 14px 52px var(--pink-glow); }

  .trust-row { display: flex; justify-content: center; gap: 36px; margin-top: 32px; flex-wrap: wrap; }
  .trust-item { display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--gray-400); font-weight: 500; }

  /* ── GALLERY ── */

.s-gallery {
  background: #F8FBFF;
  padding: 100px 0;
}

.s-gallery-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 80px;
}

.gallery-scroll-wrap {
  overflow-x: auto;
  margin-top: 52px;
  cursor: grab;
  user-select: none;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: thin;
  scrollbar-color: rgba(87,156,211,.3) transparent;
}

.gallery-scroll-wrap::-webkit-scrollbar {
  height: 5px;
}

.gallery-scroll-wrap::-webkit-scrollbar-track {
  background: transparent;
}

.gallery-scroll-wrap::-webkit-scrollbar-thumb {
  background: rgba(87,156,211,.3);
  border-radius: 10px;
}

.gallery-scroll-wrap.grabbing {
  cursor: grabbing;
}

.gallery-track {
  display: flex;
  gap: 20px;
  padding: 8px 80px 20px;
  width: max-content;
}

/* CARD */

.gallery-card {
  flex-shrink: 0;
  width: 340px;
  height: 240px;

  border-radius: 22px;
  overflow: hidden;

  position: relative;

  box-shadow: 0 8px 40px rgba(87,156,211,.14);

  transition:
    transform .45s ease,
    box-shadow .45s ease;
}

.gallery-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 70px rgba(87,156,211,.22);
}

/* IMAGE */

.gallery-card img {
  width: 100%;
  height: 100%;

  object-fit: cover;
  display: block;

  transition:
    transform .7s ease,
    filter .7s ease;
}

/* OVERLAY */

.gallery-card::before {
  content: "";

  position: absolute;
  inset: 0;

  background: linear-gradient(
    to top,
    rgba(8,20,40,.78),
    rgba(8,20,40,.2),
    transparent
  );

  opacity: 0;

  transition: opacity .45s ease;

  z-index: 1;
}

/* TEXT */

.gallery-card-cap {
  position: absolute;

  left: 22px;
  right: 22px;
  bottom: 20px;

  z-index: 2;

  opacity: 0;
  transform: translateY(30px);

  transition:
    opacity .45s ease,
    transform .45s ease;
}

.gallery-card-cap h4 {
  font-family: 'DM Serif Display', serif;
  font-size: 22px;
  font-weight: 400;
  line-height: 1.3;

  color: #fff;

  margin-bottom: 6px;
}

.gallery-card-cap p {
  font-size: 13px;
  color: rgba(255,255,255,.78);
  line-height: 1.5;
}

/* HOVER EFFECTS */

.gallery-card:hover img {
  transform: scale(1.08);
  filter: brightness(.75);
}

.gallery-card:hover::before {
  opacity: 1;
}

.gallery-card:hover .gallery-card-cap {
  opacity: 1;
  transform: translateY(0);
}

/* NAVIGATION */

.gallery-nav {
  display: flex;
  gap: 10px;
  margin-top: 28px;
  justify-content: center;
}

.gnav-btn {
  width: 46px;
  height: 46px;

  border-radius: 50%;
  background: #fff;

  border: 1.5px solid #C8DFF0;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all .22s;

  color: var(--blue);
  font-size: 18px;
}

.gnav-btn:hover {
  background: var(--blue);
  color: #fff;
  border-color: var(--blue);
}

/* MOBILE */

@media (max-width: 768px) {

  .gallery-card {
    width: 300px;
    height: 220px;
  }

  /* Overlay hidden by default */
  .gallery-card::before {
    opacity: 0;
  }

  /* Text hidden initially */
  .gallery-card-cap {
    opacity: 0;
    transform: translateY(20px);
    pointer-events: none;

    transition:
      opacity .35s ease,
      transform .35s ease;
  }

  /* Disable desktop hover zoom on mobile */
  .gallery-card:hover img {
    transform: scale(1);
    filter: brightness(1);
  }

  .gallery-card:hover::before {
    opacity: 0;
  }

  .gallery-card:hover .gallery-card-cap {
    opacity: 0;
    transform: translateY(20px);
  }

  /* SHOW TEXT WHEN CLICK / TAP */
  .gallery-card:active::before,
  .gallery-card:focus-within::before {
    opacity: 1;
  }

  .gallery-card:active .gallery-card-cap,
  .gallery-card:focus-within .gallery-card-cap {
    opacity: 1;
    transform: translateY(0);
  }

  .gallery-track {
    padding: 8px 24px 20px;
  }

  .s-gallery-inner {
    padding: 0 24px;
  }
}

  /* ── APP SECTION ── */
  .s-app { background: #F8FBFF; padding: 100px 80px; }
  .s-app-inner { max-width: 1200px; margin: 0 auto; }
  .app-browser-wrap {
    background: #fff; border-radius: 14px; overflow: hidden;
    box-shadow: 0 12px 60px rgba(87,156,211,.18); border: 1px solid #DCF0FA;
  }
  .app-browser-bar {
    background: #F1F5F9; padding: 10px 16px;
    display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #E2E8F0;
  }
  .abb-dots { display: flex; gap: 6px; }
  .abb-dots span { width: 10px; height: 10px; border-radius: 50%; display: block; }
  .abb-url {
    flex: 1; background: #fff; border: 1px solid #E2E8F0; border-radius: 6px;
    padding: 4px 12px; font-size: 11px; color: #94A3B8; text-align: center;
    max-width: 280px; margin: 0 auto;
  }
  .app-featured { margin-bottom: 28px; }
  .app-featured-label { text-align: center; margin-top: 14px; font-size: 12px; font-weight: 700; color: #94A3B8; letter-spacing: .1em; text-transform: uppercase; }

  .app-screen-dashboard { display: flex; height: 340px; overflow: hidden; }
  .app-sidebar { width: 140px; background: #0A2540; flex-shrink: 0; padding: 16px 10px; display: flex; flex-direction: column; gap: 4px; }
  .app-sidebar-logo { padding: 8px 10px 16px; border-bottom: 1px solid rgba(255,255,255,.08); margin-bottom: 8px; }
  .app-nav-item { display: flex; align-items: center; gap: 8px; padding: 9px 10px; border-radius: 9px; font-size: 11px; font-weight: 600; color: rgba(255,255,255,.5); cursor: pointer; transition: all .2s; }
  .app-nav-active { background: rgba(87,156,211,.2); color: #fff; }
  .app-main { flex: 1; padding: 18px 20px; overflow: hidden; background: #F8FBFF; }
  .app-toprow { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .app-kpi-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-bottom: 14px; }
  .app-kpi { background: #fff; border-radius: 12px; padding: 12px 14px; border: 1px solid #E2E8F0; box-shadow: 0 2px 8px rgba(87,156,211,.06); }
  .app-kpi-icon { font-size: 16px; margin-bottom: 6px; }
  .app-kpi-val { font-family: 'DM Serif Display', serif; font-size: 20px; color: #0F172A; line-height: 1; }
  .app-kpi-lbl { font-size: 10px; color: #94A3B8; margin-top: 3px; font-weight: 500; }
  .app-kpi-bar { background: #F1F5F9; height: 4px; border-radius: 4px; margin-top: 8px; overflow: hidden; }
  .app-kpi-sub { font-size: 9px; color: #94A3B8; margin-top: 4px; }
  .app-bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .app-chart-card, .app-activity-card { background: #fff; border-radius: 12px; padding: 14px; border: 1px solid #E2E8F0; }
  .app-card-title { font-size: 11px; font-weight: 700; color: #334155; margin-bottom: 12px; }
  .app-chart-bars { display: flex; align-items: flex-end; gap: 6px; height: 70px; }
  .app-chart-col { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
  .app-bar-fill { width: 100%; border-radius: 4px 4px 0 0; min-height: 6px; }
  .app-chart-col span { font-size: 9px; color: #94A3B8; }
  .app-act-item { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #F1F5F9; }
  .app-act-item:last-child { border-bottom: none; }
  .app-act-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .app-screens-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
  .app-screen-sm { overflow: hidden; min-height: 320px; }
  .app-screen-label { text-align: center; margin-top: 12px; font-size: 12px; font-weight: 700; color: #94A3B8; letter-spacing: .08em; text-transform: uppercase; }

  /* ── CONTACT ── */
  .s5 { background: #fff; padding: 110px 80px; }
  .s5-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 90px; align-items: start; }
  .s5-left h2 { font-family: 'DM Serif Display', serif; font-size: clamp(28px,3.5vw,48px); color: var(--gray-900); line-height: 1.12; margin-bottom: 18px; }
  .s5-left p { font-size: 16px; color: var(--gray-600); line-height: 1.75; margin-bottom: 38px; }
  .contact-info { display: flex; flex-direction: column; gap: 18px; }
  .ci-item { display: flex; align-items: center; gap: 16px; }
  .ci-ico { width: 46px; height: 46px; border-radius: 14px; background: var(--blue-pale); border: 1px solid #DBEAFE; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .ci-label { font-size: 12px; color: var(--gray-400); font-weight: 600; letter-spacing: .05em; text-transform: uppercase; margin-bottom: 2px; }
  .ci-val { font-size: 15px; font-weight: 600; color: var(--gray-900); }

  .contact-form { background: var(--blue-pale); border: 1.5px solid #DBEAFE; border-radius: var(--r-xl); padding: 44px 40px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 18px; }
  .form-group { display: flex; flex-direction: column; gap: 7px; margin-bottom: 18px; }
  .form-group label { font-size: 13px; font-weight: 700; color: var(--gray-700); letter-spacing: .03em; }
  .form-control {
    background: #fff; border: 1.5px solid var(--gray-200); border-radius: 12px;
    padding: 13px 16px; font-size: 14.5px; font-family: 'Outfit', sans-serif;
    color: var(--gray-900); outline: none; transition: border-color .22s, box-shadow .22s; width: 100%;
  }
  .form-control:focus { border-color: var(--blue); box-shadow: 0 0 0 4px rgba(87,156,211,.12); }
  .form-control::placeholder { color: var(--gray-400); }
  textarea.form-control { resize: vertical; min-height: 120px; }
  .form-submit {
    width: 100%; padding: 15px;
    background: linear-gradient(135deg,var(--blue),#4F94FF);
    color: #fff; font-size: 15px; font-weight: 700; font-family: 'Outfit', sans-serif;
    border: none; border-radius: 100px; cursor: pointer; transition: all .3s;
    box-shadow: 0 6px 28px rgba(30,111,255,.25);
  }
  .form-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(30,111,255,.35); }
  .form-note { font-size: 12px; color: var(--gray-400); text-align: center; margin-top: 14px; }

  /* Reveal */
  .reveal { opacity: 0; transform: translateY(30px); transition: opacity .6s ease, transform .6s ease; }
  .reveal.in { opacity: 1; transform: translateY(0); }

  /* ── RESPONSIVE ── */
  @media (max-width: 960px) {
    .hero, .s2, .s3, .s4, .s5, .s-app { padding-left: 28px; padding-right: 28px; }
    .hero-inner, .s2-inner, .s5-inner { grid-template-columns: 1fr; gap: 50px; }
    .hero { padding-top: 120px; }
    .steps-grid, .prow { grid-template-columns: 1fr 1fr; }
    .s2-badge { right: 16px; top: 16px; }
    .proc-wrap { grid-template-columns: 1fr; height: auto; }
    .proc-left { height: 300px; }
    .proc-right { height: 260px; }
    .proc-content { left: 28px; right: 20px; }
    .app-screen-dashboard { flex-direction: column; height: auto; }
    .app-sidebar { width: 100%; flex-direction: row; overflow-x: auto; padding: 10px 12px; gap: 2px; }
    .app-kpi-row { grid-template-columns: 1fr 1fr; }
    .app-screens-row { grid-template-columns: 1fr; }
    .s-gallery-inner { padding-left: 24px; padding-right: 24px; }
  }
  @media (max-width: 600px) {
    .hero h1 { font-size: 36px; }
    .steps-grid, .prow { grid-template-columns: 1fr; }
    .cdown { gap: 6px; }
    .cdb { min-width: 68px; padding: 16px; }
    .cdn { font-size: 32px; }
    .form-row { grid-template-columns: 1fr; }
    .contact-form { padding: 30px 24px; }
    .gallery-card { width: 280px; }
    .app-bottom-row { grid-template-columns: 1fr; }
    .hf-row { grid-template-columns: 1fr; }
    .hf-row-submit { grid-template-columns: 1fr; }
    .hf-submit { width: 100%; border-radius: 14px; }
  }
`;

/* ─────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────── */

function HeroSection() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const GOOGLE_SCRIPT =
    "https://script.google.com/macros/s/AKfycbyXWe1qfAIiQWK9C1NRIKF3LbW_izrXivtcZoAIKa9g_-geUFAWIfq5dinc8ialkXM/exec";

  const MASTER_GOOGLE_SCRIPT =
    "https://script.google.com/macros/s/AKfycbxqXNa5d1oYF9yiHJpsxtv6sdtV0KsdGUSg_2oSe--dHl4YIe7tPCYHZzeBsIojmqXt/exec";

  const validateEmails = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[A-Za-z.]{2,}$/;
    if (!regex.test(email)) return false;

    const validTLDs = new Set([
      "com", "org", "net", "info", "biz", "xyz", "dev", "app", "pro", "me",
      "name", "online", "site", "tech", "store", "ai", "io", "cloud",
      "digital", "media", "in", "us", "uk", "ca", "au", "nz", "de", "fr",
      "jp", "sg", "ae", "sa", "pk", "lk", "bd", "cn", "es", "it", "nl",
      "co.in", "org.in", "net.in", "ac.in", "gov.in", "nic.in",
      "co.uk", "org.uk", "ac.uk", "co.za", "co.jp", "com.au",
      "com.sg", "com.pk",
    ]);

    const parts = email.toLowerCase().split("@")[1].split(".");
    const tld1 = parts[parts.length - 1];
    const tld2 = parts.length >= 2 ? parts.slice(-2).join(".") : null;

    return validTLDs.has(tld1) || (tld2 && validTLDs.has(tld2));
  };

  const handleSubscribe = async () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!city.trim()) {
      setError("City is required.");
      return;
    }

    if (!validateEmails(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Google Sheet 1
      fetch(GOOGLE_SCRIPT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `name=${encodeURIComponent(name)}
        &phone=${encodeURIComponent(phone)}
        &city=${encodeURIComponent(city)}
        &email=${encodeURIComponent(email)}`,
      }).catch(() => {});

      // Google Sheet 2
      fetch(MASTER_GOOGLE_SCRIPT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}&source=Pre Launch`,
      }).catch(() => {});

      // Cheerio API
      const CHEERIO_API_KEY =
        "dfd7bcf44867df2f37bccce492a2368dcb0d9cdcd5963dd47acd270de09208ba";

      await fetch(
        "https://newprod.api.cheerio.in/direct-apis/v1/manualTriggerWorkflow",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": CHEERIO_API_KEY,
          },
          body: JSON.stringify({
            email,
            workflowId: "691d8bd1024212623f2b31b8",
          }),
        }
      );

      // Save LocalStorage
      localStorage.setItem("frost_email", email);
      localStorage.setItem("frost_name", name);

      setSuccess(true);

      // Reset fields
      setName("");
      setPhone("");
      setCity("");
      setEmail("");

      // Redirect
      setTimeout(() => navigate("/reserve"), 1000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero lg:mt-6 mt-0" id="home">
      <div className="hero-deco d1" />
      <div className="hero-deco d2" />
      <div className="hero-deco d3" />

      <div className="hero-inner">
        <div className="-mt-10">
          <div className="h-badge">
            <div className="h-badge-dot" />
            Now Live on Indiegogo
          </div>

          <h1>
            Turn Your Desk Into a <span className="grad">Habit</span>{" "}
            <span className="pinkgrad">System</span>
          </h1>

          <p className="hero-sub">
            A smart hydration & wellness tracker that builds better habits
          </p>

          <div className="hero-form lg:-mt-4">
            <div style={{ width: "100%" }}>
              <input
                className="hf-input"
                type="text"
                placeholder="Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            
            <div className="hf-row">
              <input
                className="hf-input"
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                className="hf-input"
                type="text"
                placeholder="City *"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="hf-row hf-row-submit">
              <input
                className="hf-input"
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                className="hf-submit"
                onClick={handleSubscribe}
                disabled={loading}
                style={
                  success
                    ? {
                        background:
                          "linear-gradient(135deg,#10B981,#059669)",
                      }
                    : {}
                }
              >
                {loading
                  ? "Submitting..."
                  : success
                  ? "✅ Subscribed!"
                  : "Subscribe"}
              </button>
            </div>

            {error && (
              <p style={{ color: "#ef4444", marginTop: "10px" }}>{error}</p>
            )}
          </div>
        </div>

        <div className="hero-right">
          <div className="fc fc1">
            <div className="fc-ico hp-blue">💧</div>
            <div>
              <div className="fc-lbl">Hydration</div>
              <div className="fc-val">82% <span className="fc-unit">daily goal</span></div>
            </div>
          </div>
          <div className="fc fc2">
            <div className="fc-ico hp-cyan">🧠</div>
            <div>
              <div className="fc-lbl">Focus Score</div>
              <div className="fc-val">9.1 <span className="fc-unit">/ 10</span></div>
            </div>
          </div>
          <div className="fc fc3">
            <div className="fc-ico hp-pink">🏃</div>
            <div>
              <div className="fc-lbl">Break Due</div>
              <div className="fc-val">12 <span className="fc-unit">min</span></div>
            </div>
          </div>
          <div className="hero-img-wrap">
            <img
              src="/images/heroimg.jpeg"
              alt="Minimal desk setup with water bottle and laptop"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
   const [countdown, setCountdown] = useState({ d: "14", h: "00", m: "00", s: "00" });

  useEffect(() => {
  
  
  const end = new Date("2026-08-15T00:00:00+05:30").getTime();
  const pad = (n) => String(Math.max(0, Math.floor(n))).padStart(2, "0");

  let id;

  const tick = () => {
    const diff = end - Date.now();

    if (diff <= 0) {
      setCountdown({ d: "00", h: "00", m: "00", s: "00" });
      clearInterval(id);
      return;
    }

    setCountdown({
      d: pad(diff / (1000 * 60 * 60 * 24)),
      h: pad((diff / (1000 * 60 * 60)) % 24),
      m: pad((diff / (1000 * 60)) % 60),
      s: pad((diff / 1000) % 60),
    });
  };

  tick();
  id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);

  const campaignLink =
    "https://www.indiegogo.com/en/projects/frostactive-38748367/stay-hydrated-focused-balanced-meet-frost-aura";

  const tiers = [
    { tier: "MSRP", price: 99, save: null, was: "Full retail", cta: "Learn more", star: false },
    { tier: "Standard", price: 69, save: "Save $30", was: "was $99", cta: "Learn more", star: false },
    { tier: "Early Bird", price: 59, save: "Save $40", was: "was $99", cta: "Learn more", star: false },
    { tier: "Super Early Bird", price: 49, save: "Save 51% — Biggest discount!", was: "was $99", cta: "Back now", star: true },
  ];

  return (
    <section className="s4 lg:-mt-2" id="pricing">
      <div className="lg:-mt-16 -mt-16">
        <div className="s4-inner">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Limited Launch Offer
          </div>

          <h2>Launch Pricing Ends Soon</h2>

          <p className="section-desc">
            Back early. Save more. Only a limited number of units available at these prices.
          </p>

          <div className="cdown">
            {[["d", "Days"], ["h", "Hours"], ["m", "Min"], ["s", "Sec"]].map(([k, l], i) => (
              <div key={k} style={{ display: "contents" }}>
                <div className="cdb">
                  <span className="cdn">{countdown[k]}</span>
                  <span className="cdl">{l}</span>
                </div>
                {i < 3 && <div className="cdsep">:</div>}
              </div>
            ))}
          </div>

          <div className="prow">
            {tiers.map(({ tier, price, save, was, cta, star }) => (
              <div className={`pc reveal${star ? " star" : ""}`} key={tier}>
                {star && <div className="best-badge">⚡ Best Deal</div>}
                <div className="pc-tier">{tier}</div>
                <div className="pc-amt"><sup>$</sup>{price}</div>
                {save && <div className="pc-save">{save}</div>}
                <div className="pc-was">{was}</div>
                <a href={campaignLink} target="_blank" rel="noopener noreferrer" className="pc-cta">
                  {cta}
                </a>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 10 }}>
            <a href={campaignLink} target="_blank" rel="noopener noreferrer" className="btn-pink-lg">
              Back Frost Aura on Indiegogo
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="trust-row">
            {["🔒 Secure checkout", "📦 Ships worldwide", "💎 Premium Quality", "⚡ Limited stock"].map((t) => (
              <div className="trust-item" key={t}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function AboutSection() {
  return (
    <section className="s2" id="about">
      <div className="lg:-mt-8 -mt-16">
        <div className="s2-inner">
          <div className="reveal">
            <div className="eyebrow">What is Frost Aura</div>
            <h2>Your Desk, Now a Habit System</h2>
            <p className="section-desc">
              Frost Aura is an AI desk wellness device that supports hydration, focus, and daily habits — quietly and intelligently, without interrupting your flow.
            </p>
            <div className="feature-list">
              {[
                { n: "01", title: "Non-invasive by design", desc: "Simply sits on your desk. No wearables, no straps, no friction. Fits naturally into any workspace setup." },
                { n: "02", title: "Works with any bottle", desc: "Use the bottle you already love. No proprietary accessories or special hardware required — ever." },
                { n: "03", title: "Tracks completely automatically", desc: "AI learns your unique patterns over time and adapts. You just work — Frost Aura does the rest." },
              ].map(({ n, title, desc }) => (
                <div className="fi" key={n}>
                  <div className="fi-num">{n}</div>
                  <div><h4>{title}</h4><p>{desc}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="s2-vis reveal">
            <img className="s2-img-main" src="/images/what.svg" alt="Modern desk with productivity device" />
          </div>
        </div>
      </div>
    </section>
  );
}


function HowItWorksSection() {
  const cards = [
    {
      number: "1",
      title: "Place Your Bottle",
      desc: "Set Frost Aura on your desk and place any water bottle nearby. Tracking begins automatically the moment it's powered on.",
      image: "/images/how1.svg",
    },
    {
      number: "2",
      title: "Device Learns Patterns",
      desc: "Work as you normally would. The onboard AI quietly observes your hydration habits, focus blocks, and work sessions.",
      image: "/images/how2.svg",
    },
    {
      number: "3",
      title: "Get Gentle Cues",
      desc: "Receive perfectly timed, non-intrusive hydration nudges and movement prompts — never disruptive, always helpful.",
      image: "/images/how3.svg",
    },
    {
      number: "4",
      title: "Habits Build Themselves",
      desc: "Consistency compounds. Unlock newer wellness habits automatically as your patterns improve over time.",
      image: "/images/how4.svg",
    },
  ];

  return (
    <>
      <style>{`
        .how-it-works-section {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 40px;
          font-family: 'DM Sans', sans-serif;
        }

        .how-header {
          margin-bottom: 60px;
          animation: fadeUp 0.7s ease forwards;
        }

        .how-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #5aaed4;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .how-title {
          font-family: 'Playfair Display', serif;
          font-weight: 800;
          font-size: clamp(28px, 5vw, 40px);
          color: #1a2e3d;
          line-height: 1.25;
          max-width: 700px;
        }

        .how-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }

        .how-card {
          animation: fadeUp 0.7s ease forwards;
          animation-delay: calc(var(--card-index) * 0.1s);
          opacity: 0;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* NUMBER ABOVE IMAGE */
        .card-number {
          font-size: 32px;
          font-weight: 400;
          color: #000000;
          line-height: 1;
          margin-bottom: 10px;
          font-family: 'DM Sans', sans-serif;
        }

        .card-image-wrapper {
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 18px;
          background: #f4f4f4;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .how-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-content {
          text-align: center;
          padding-top: 24px;
        }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 500;
          color: #5aaed4;
          line-height: 1.3;
          margin-bottom: 12px;
        }

        .card-desc {
          font-size: 14px;
          line-height: 1.45;
          color: #000000;
          max-width: 240px;
          margin: 0 auto;
        }

        /* TABLET */
        @media (max-width: 1024px) {
          .how-it-works-section {
            padding: 50px 30px;
          }

          .how-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .card-number {
            font-size: 46px;
          }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .how-it-works-section {
            padding: 40px 20px;
          }

          .how-cards-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .card-number {
            font-size: 40px;
          }

          .card-title {
            font-size: 18px;
          }

          .card-desc {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .how-it-works-section {
            padding: 30px 16px;
          }

          .card-number {
            font-size: 34px;
          }

          .card-title {
            font-size: 17px;
          }

          .card-desc {
            font-size: 13px;
          }
        }
      `}</style>

      <section className="how-it-works-section" id="how">
        <div className="how-header">
          <div className="eyebrow">The Process</div>

          <h2 className="how-title">
            Your Roadmap to a Healthier,
            <br />
            More Focused Lifestyle
          </h2>
        </div>

        <div className="how-cards-grid">
          {cards.map((card, index) => (
            <div
              key={index}
              className="how-card"
              style={{ "--card-index": index }}
            >
              <div className="card-number">
                {card.number}
              </div>

              <div className="card-image-wrapper">
                <img
                  src={card.image}
                  alt={card.title}
                  className="card-image"
                />
              </div>

              <div className="card-content">
                <h3 className="card-title">
                  {card.title}
                </h3>

                <p className="card-desc">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function FeaturedOnSection() {
  const platforms = [
    {
      name: "Indiegogo",
      status: "Live Campaign",
      desc: "Back Frost Aura today and lock in exclusive early-bird pricing before the campaign ends.",
      cta: "Back us on Indiegogo",
      href: "https://www.indiegogo.com/en/projects/frostactive-38748367/stay-hydrated-focused-balanced-meet-frost-aura",
      accent: "#EB1478",
      accentSoft: "#FDEBF4",
      accentBorder: "#F9C6DE",
      logo: (
        <img
          src="/images/go.png"
          alt="Indiegogo logo"
          width="46"
          height="46"
          style={{
            width: 46,
            height: 46,
            objectFit: "contain",
            borderRadius: 13,
            display: "block",
          }}
        />
      ),
    },
    {
      name: "Product Hunt",
      status: "Featured Product",
      desc: "Frost Aura is live on Product Hunt — check out our page, leave a review, and show your support.",
      cta: "View us on Product Hunt",
      href: "https://www.producthunt.com/products/frost-aura?launch=frost-aura",
      accent: "#FF6154",
      accentSoft: "#FFF0EE",
      accentBorder: "#FFC9C2",
      logo: (
        <svg viewBox="0 0 48 48" width="46" height="46" aria-hidden="true">
          <circle cx="24" cy="24" r="24" fill="#FF6154" />
          <path
            d="M27.2 24.4h-5.6v-5.8h5.6c1.6 0 2.9 1.3 2.9 2.9s-1.3 2.9-2.9 2.9zm0-10.4H17v20h4.6v-5h5.6c4.1 0 7.5-3.4 7.5-7.5S31.3 14 27.2 14z"
            fill="#fff"
          />
        </svg>
      ),
    },
  ];
 
  return (
    <>
      <style>{`
        .s-featured {
          background: #fff;
          padding: 40px 80px 110px;
        }
        .s-featured-inner {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }
        .s-featured h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 4vw, 48px);
          color: var(--gray-900);
          line-height: 1.12;
          margin-bottom: 14px;
        }
        .s-featured .section-desc {
          font-size: 16px;
          color: var(--gray-600);
          max-width: 540px;
          margin: 0 auto 56px;
          line-height: 1.75;
        }
 
        .platform-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 26px;
        }
 
        .platform-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          text-decoration: none;
          background: #fff;
          border: 1.5px solid var(--gray-200);
          border-radius: var(--r-lg);
          padding: 36px 34px 32px;
          overflow: hidden;
          transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
        }
        .platform-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--pc-accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .4s ease;
        }
        .platform-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 24px 64px rgba(15, 23, 42, .1);
          border-color: var(--pc-border);
        }
        .platform-card:hover::before { transform: scaleX(1); }
        .platform-card:focus-visible {
          outline: 3px solid var(--pc-accent);
          outline-offset: 3px;
        }
 
        .platform-top {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          width: 100%;
        }
        .platform-logo {
          flex-shrink: 0;
          display: flex;
          border-radius: 13px;
          box-shadow: 0 6px 20px rgba(15, 23, 42, .12);
          transition: transform .35s ease;
        }
        .platform-card:hover .platform-logo { transform: scale(1.06) rotate(-2deg); }
        .platform-name {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          color: var(--gray-900);
          line-height: 1.15;
        }
        .platform-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 5px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: .05em;
          text-transform: uppercase;
          color: var(--pc-accent);
          background: var(--pc-soft);
          border: 1px solid var(--pc-border);
          padding: 4px 12px;
          border-radius: 100px;
        }
        .platform-status-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--pc-accent);
          animation: dotpulse 2s ease infinite;
        }
        .platform-desc {
          font-size: 14.5px;
          color: var(--gray-600);
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .platform-cta {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-top: auto;
          font-size: 14px;
          font-weight: 700;
          color: var(--pc-accent);
          letter-spacing: .01em;
        }
        .platform-cta svg { transition: transform .3s ease; }
        .platform-card:hover .platform-cta svg { transform: translateX(5px); }
 
        @media (prefers-reduced-motion: reduce) {
          .platform-card, .platform-card::before,
          .platform-logo, .platform-cta svg { transition: none; }
          .platform-status-dot { animation: none; }
        }
 
        @media (max-width: 960px) {
          .s-featured { padding: 30px 28px 90px; }
        }
        @media (max-width: 768px) {
          .platform-grid { grid-template-columns: 1fr; gap: 20px; }
          .platform-card { padding: 28px 24px 26px; }
          .platform-name { font-size: 21px; }
        }
      `}</style>
 
      <section className="s-featured lg:mt-6 mt-10" id="featured">
        <div className="s-featured-inner">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Where To Find Us
          </div>
          <h2>We're Live On</h2>
          <p className="section-desc">
            Frost Aura is launching on the world's biggest platforms for new
            products. Back the campaign, follow the launch, and join the
            community.
          </p>
 
          <div className="platform-grid">
            {platforms.map(
              ({ name, status, desc, cta, href, accent, accentSoft, accentBorder, logo }) => (
                <a
                  key={name}
                  className="platform-card"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${cta} (opens in a new tab)`}
                  style={{
                    "--pc-accent": accent,
                    "--pc-soft": accentSoft,
                    "--pc-border": accentBorder,
                  }}
                >
                  <div className="platform-top">
                    <div className="platform-logo">{logo}</div>
                    <div>
                      <div className="platform-name">{name}</div>
                      <div className="platform-status">
                        <span className="platform-status-dot" />
                        {status}
                      </div>
                    </div>
                  </div>
 
                  <p className="platform-desc">{desc}</p>
 
                  <span className="platform-cta">
                    {cta}
                    <svg width="17" height="17" fill="none" stroke="currentColor"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}



function GallerySection() {
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const cards = [
    { src: "/gallery/1.jpeg", title: "Desk Companion", sub: "Clean desk, clear mind" },
    { src: "/images/heroimg1.jpeg", title: "Developer's Corner", sub: "Focus mode, activated" },
    { src: "/gallery/3.jpeg", title: "Creative Space", sub: "Where ideas flow freely" },
    { src: "/gallery/4.jpeg", title: "Home Office Bliss", sub: "Wellness, built in" },
    { src: "/gallery/5.jpeg", title: "Peak Productivity", sub: "Hydrated & focused" },
    { src: "/gallery/6.png", title: "Wellness at Work", sub: "Habits made effortless" },
    { src: "/gallery/7.jpeg", title: "Work Station", sub: "Wellness, seamlessly built in" },
  ];

  const handleMouseDown = (e) => {
    isDown.current = true;
    scrollRef.current.classList.add("grabbing");
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };
  const handleMouseLeave = () => { isDown.current = false; scrollRef.current.classList.remove("grabbing"); };
  const handleMouseUp = () => { isDown.current = false; scrollRef.current.classList.remove("grabbing"); };
  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };

  return (
    <section className="s-gallery lg:-mt-24" id="gallery">
      {/* Desktop-only size overrides (≥1024px). Mobile keeps original CSS. */}
   <style>{`
  @media (min-width: 1024px) {
    .gallery-card {
      width: clamp(420px, 34vw, 520px);
      height: clamp(220px, 21vw, 320px); /* taller card */
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
    }
    .gallery-card img {
      width: 100%;
      flex: 1;                              /* image fills remaining card height */
      min-height: 0;
      height: auto;
      object-fit: fill;
      display: block;
    }
    .gallery-track {
      gap: 28px;
      align-items: stretch;
    }
    .gallery-scroll-wrap {
      padding-block: 8px;
    }
  }
`}</style>

      <div className="lg:-mt-0 -mt-6">
        <div className="s-gallery-inner">
          <div className="eyebrow">Experience Frost</div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(28px,4vw,48px)", color: "var(--gray-900)", marginBottom: 12 }}>
            Frost Aura in Action
          </h2>
          <p style={{ fontSize: 16, color: "var(--gray-600)", maxWidth: 520 }}>
            See how Frost Aura seamlessly fits into real workspaces — minimal, beautiful, and quietly effective.
          </p>
        </div>

        <div
          className="gallery-scroll-wrap"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="gallery-track">
            {cards.map(({ src, title, sub }) => (
              <div className="gallery-card" key={title}>
                <img src={src} alt={title} />
                <div className="gallery-card-cap">
                  <h4>{title}</h4>
                  <p>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-nav">
          <button className="gnav-btn" onClick={() => scrollRef.current.scrollBy({ left: -460, behavior: "smooth" })}>←</button>
          <button className="gnav-btn" onClick={() => scrollRef.current.scrollBy({ left: 460, behavior: "smooth" })}>→</button>
        </div>
      </div>
    </section>
  );
}

function AppSection() {
  const navItems = [
    { icon: "📊", label: "Dashboard", active: true },
    { icon: "💧", label: "Hydration" },
    { icon: "🧠", label: "Focus" },
    { icon: "🏃", label: "Movement" },
    { icon: "📅", label: "History" },
    { icon: "⚙️", label: "Settings" },
  ];

  const kpis = [
    { icon: "💧", val: "2.4L", lbl: "Hydration", pct: 82, color: "#5BB8D4" },
    { icon: "🧠", val: "94m", lbl: "Deep Focus", pct: 94, color: "#8B5CF6" },
    { icon: "🏃", val: "3×", lbl: "Move Breaks", pct: 60, color: "#F59E0B" },
    { icon: "🌿", val: "12d", lbl: "Streak", pct: 70, color: "#10B981" },
  ];

  const bars = [
    { h: "72%", day: "M", active: false },
    { h: "58%", day: "T", active: false },
    { h: "88%", day: "W", active: false },
    { h: "65%", day: "T", active: false },
    { h: "82%", day: "F", active: true },
    { h: "30%", day: "S", active: false, gray: true },
    { h: "20%", day: "S", active: false, gray: true },
  ];

  const activities = [
    { dot: "#5BB8D4", label: "Drank 350ml", time: "2 min ago" },
    { dot: "#8B5CF6", label: "Focus: 47 minutes", time: "1 hour ago" },
    { dot: "#F59E0B", label: "Movement break", time: "2 hours ago" },
    { dot: "#10B981", label: "Streak extended!", time: "Today" },
  ];

  const BrowserChrome = ({ url, large = false, children }) => (
    <div className="app-browser-wrap">
      <div className="app-browser-bar" style={large ? { padding: "12px 20px" } : {}}>
        <div className="abb-dots">
          <span style={{ background: "#FF5F57" }} />
          <span style={{ background: "#FEBC2E" }} />
          <span style={{ background: "#28C840" }} />
        </div>
        <div className="abb-url">{url}</div>
      </div>
      {children}
    </div>
  );

  return (
    <section className="s-app lg:-mt-8 -mt-10" id="app">
      <div className="s-app-inner">
        <div className="reveal" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 64px" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>Web App</div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(28px,4vw,50px)", color: "var(--gray-900)", marginBottom: 14 }}>
            Everything at a Glance
          </h2>
          <p style={{ fontSize: 16, color: "var(--gray-600)", lineHeight: 1.75 }}>
            Your personal wellness command centre — beautifully designed, available on any browser.
          </p>
        </div>

        <div className="app-featured reveal">
          <BrowserChrome url="app.frostactive.com" large>
            <div className="app-screen app-screen-dashboard">
              <div className="app-sidebar">
                <div className="app-sidebar-logo">
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", letterSpacing: ".08em" }}>❄ FROST</div>
                </div>
                {navItems.map(({ icon, label, active }) => (
                  <div className={`app-nav-item${active ? " app-nav-active" : ""}`} key={label}>
                    <span>{icon}</span><span>{label}</span>
                  </div>
                ))}
              </div>
              <div className="app-main">
                <div className="app-toprow">
                  <div>
                    <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>Good morning</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginTop: 2 }}>Today's Overview</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ background: "#EBF4FC", border: "1px solid #C8DFF0", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "#579CD3" }}>Thu, Apr 24</div>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#579CD3,#5BB8D4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14 }}>👤</div>
                  </div>
                </div>

                <div className="app-kpi-row">
                  {kpis.map(({ icon, val, lbl, pct, color }) => (
                    <div className="app-kpi" key={lbl}>
                      <div className="app-kpi-icon">{icon}</div>
                      <div className="app-kpi-val">{val}</div>
                      <div className="app-kpi-lbl">{lbl}</div>
                      <div className="app-kpi-bar"><div style={{ width: `${pct}%`, background: color, height: 4, borderRadius: 4 }} /></div>
                      <div className="app-kpi-sub">{pct}% of goal</div>
                    </div>
                  ))}
                </div>

                <div className="app-bottom-row">
                  <div className="app-chart-card">
                    <div className="app-card-title">Weekly Hydration</div>
                    <div className="app-chart-bars">
                      {bars.map(({ h, day, active, gray }) => (
                        <div className="app-chart-col" key={day + h}>
                          <div className="app-bar-fill" style={{ height: h, background: gray ? "#E2E8F0" : "linear-gradient(180deg,#579CD3,#5BB8D4)" }} />
                          <span style={active ? { color: "#579CD3", fontWeight: 700 } : {}}>{day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="app-activity-card">
                    <div className="app-card-title">Recent Activity</div>
                    {activities.map(({ dot, label, time }) => (
                      <div className="app-act-item" key={label}>
                        <div className="app-act-dot" style={{ background: dot }} />
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#0F172A" }}>{label}</div>
                          <div style={{ fontSize: 11, color: "#94A3B8" }}>{time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </BrowserChrome>
          <div className="app-featured-label">Dashboard · Overview</div>
        </div>

        <div className="app-screens-row">
          <div className="reveal">
            <BrowserChrome url="app.frostactive.com">
              <div className="app-screen app-screen-sm" style={{ background: "#F0FAFF", padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 16 }}>💧 Hydration Tracker</div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <div style={{ position: "relative", width: 100, height: 100 }}>
                    <svg viewBox="0 0 100 100" style={{ width: "100%", transform: "rotate(-90deg)" }}>
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#579CD3" strokeWidth="10" strokeDasharray="264" strokeDashoffset="48" strokeLinecap="round" />
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: "#579CD3" }}>82%</div>
                      <div style={{ fontSize: 9, color: "#94A3B8" }}>of goal</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div style={{ background: "#fff", borderRadius: 10, padding: 10, textAlign: "center", border: "1px solid #DCF0FA" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#579CD3" }}>2.4L</div>
                    <div style={{ fontSize: 10, color: "#94A3B8" }}>consumed</div>
                  </div>
                  <div style={{ background: "#fff", borderRadius: 10, padding: 10, textAlign: "center", border: "1px solid #DCF0FA" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#94A3B8" }}>0.5L</div>
                    <div style={{ fontSize: 10, color: "#94A3B8" }}>remaining</div>
                  </div>
                </div>
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                  {[["9:00 AM","100%","350ml"],["11:30 AM","85%","300ml"],["2:15 PM","70%","250ml"]].map(([time, w, ml]) => (
                    <div key={time} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 10 }}>
                      <span style={{ color: "#475569" }}>{time}</span>
                      <div style={{ flex: 1, height: 3, background: "#DCF0FA", margin: "0 8px", borderRadius: 3 }}>
                        <div style={{ width: w, height: "100%", background: "#579CD3", borderRadius: 3 }} />
                      </div>
                      <span style={{ color: "#579CD3", fontWeight: 600 }}>{ml}</span>
                    </div>
                  ))}
                </div>
              </div>
            </BrowserChrome>
            <div className="app-screen-label">Hydration Tracker</div>
          </div>

          <div className="reveal">
            <BrowserChrome url="app.frostactive.com">
              <div className="app-screen app-screen-sm" style={{ background: "#F5F0FF", padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 16 }}>🧠 Focus Sessions</div>
                <div style={{ background: "linear-gradient(135deg,#7C3AED,#8B5CF6)", borderRadius: 20, padding: "16px 24px", textAlign: "center", marginBottom: 18 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.7)", marginBottom: 4 }}>Current Session</div>
                  <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 32, color: "#fff" }}>47:23</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.6)", marginTop: 4 }}>Deep Focus Active</div>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
                    {["Pause","End"].map(b => (
                      <div key={b} style={{ background: "rgba(255,255,255,.2)", borderRadius: 8, padding: "5px 14px", fontSize: 11, fontWeight: 600, color: "#fff", cursor: "pointer" }}>{b}</div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[["3","sessions"],["94m","total"],["9.1","score"]].map(([v, l]) => (
                    <div key={l} style={{ background: "#fff", borderRadius: 10, padding: 10, textAlign: "center", border: "1px solid #EDE9FE" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#8B5CF6" }}>{v}</div>
                      <div style={{ fontSize: 9, color: "#94A3B8" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </BrowserChrome>
            <div className="app-screen-label">Focus Sessions</div>
          </div>

          <div className="reveal">
            <BrowserChrome url="app.frostactive.com">
              <div className="app-screen app-screen-sm" style={{ background: "#F0FFF8", padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 16 }}>🌿 Habit Streaks</div>
                <div style={{ background: "linear-gradient(135deg,#10B981,#059669)", borderRadius: 16, padding: 14, textAlign: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 28, marginBottom: 2 }}>🔥</div>
                  <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26, color: "#fff" }}>12 Days</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.75)" }}>Personal best streak!</div>
                </div>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#475569", marginBottom: 8 }}>This Month</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} style={{ aspectRatio: "1", borderRadius: 5, background: i < 11 ? "rgba(16,185,129,.3)" : i === 11 ? "#10B981" : "#E2E8F0" }} />
                  ))}
                </div>
              </div>
            </BrowserChrome>
            <div className="app-screen-label">Habit Streaks</div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 52 }} className="reveal">
          <a href="https://app.frostactive.com/" className="btn-pink-lg" style={{ fontSize: 15, padding: "16px 38px" }}>
            Try the Web App
          </a>
        </div>
      </div>
    </section>
  );
}


function ContactSection() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", query: "", message: "" });

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxv_rlA8zUYbhhN8PuMVbcoh0mhXzlWAetJA9EH8qAGAd3Ya4myK8tt1h3yPFZ3d2TN/exec";
  const MASTER_GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxqXNa5d1oYF9yiHJpsxtv6sdtV0KsdGUSg_2oSe--dHl4YIe7tPCYHZzeBsIojmqXt/exec";
  const CHEERIO_API_KEY =
    "dfd7bcf44867df2f37bccce492a2368dcb0d9cdcd5963dd47acd270de09208ba";

  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[A-Za-z.]{2,}$/;
    if (!regex.test(email)) return false;
    const validTLDs = new Set([
      "com","org","net","info","biz","xyz","dev","app","pro","me","name",
      "online","site","tech","store","ai","io","cloud","digital","media",
      "in","us","uk","ca","au","nz","de","fr","jp","sg","ae","sa","pk","lk",
      "bd","cn","es","it","nl",
      "co.in","org.in","net.in","ac.in","gov.in","nic.in",
      "co.uk","org.uk","ac.uk","co.za","co.jp","com.au","com.sg","com.pk"
    ]);
    const parts = email.toLowerCase().split("@")[1].split(".");
    const tld1 = parts[parts.length - 1];
    const tld2 = parts.length >= 2 ? parts.slice(-2).join(".") : null;
    return validTLDs.has(tld1) || (tld2 && validTLDs.has(tld2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, query, message } = formData;

    if (!name || !email || !phone || !query || !message) {
      toast({ title: "All Fields Required", description: "Please complete all fields before submitting the form.", variant: "destructive" });
      return;
    }
    if (!validateEmail(email)) {
      toast({ title: "Invalid Email Address", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      fetch(GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) }).catch(() => {});
      fetch(MASTER_GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: `email=${encodeURIComponent(email)}&source=Contact Us` }).catch(() => {});
      await fetch("https://newprod.api.cheerio.in/direct-apis/v1/manualTriggerWorkflow", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": CHEERIO_API_KEY },
        body: JSON.stringify({ email, workflowId: "691d8c61dfc2664a0552732b" }),
      });
      toast({ title: "Message Successfully Sent", description: "Thank you for contacting us. Our team has received your message and will get back to you soon." });
      setFormData({ name: "", email: "", phone: "", query: "", message: "" });
    } catch (error) {
      toast({ title: "Submission Failed", description: "We encountered an issue while submitting your request. Please try again shortly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="s5 lg:-mt-0" id="contact">
      <div className="lg:-mt-0 -mt-14">
        <div className="s5-inner" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "24px" : "32px", alignItems: "stretch" }}>
          <div className="reveal s5-left" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <div className="eyebrow">Get In Touch</div>
            <h2 style={{ fontSize: isMobile ? "28px" : "", lineHeight: isMobile ? "1.25" : "" }}>
              We'd Love to Hear From You
            </h2>
            <p style={{ fontSize: isMobile ? "15px" : "", lineHeight: isMobile ? "1.7" : "" }}>
              Have questions about Frost Aura? Need product support, business inquiries, or want to share your experience? Send us a message and our team will get back to you as soon as possible.
            </p>
            <div style={{ flex: 1, marginTop: "20px", borderRadius: "22px", overflow: "hidden", minHeight: isMobile ? "260px" : "auto" }}>
              <img src="/images/contactimg1.jpeg" alt="Contact Us" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>

          <div className="reveal" style={{ height: "100%" }}>
            <form className="contact-form" onSubmit={handleSubmit} style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "22px" : "" }}>
              <div className="eyebrow" style={{ marginBottom: 22, textAlign: isMobile ? "center" : "left" }}>Send a Message</div>

              <div className="form-row" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label>Name</label>
                  <input className="form-control" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" />
                </div>
              </div>

              <div className="form-row" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px", marginTop: "16px" }}>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input className="form-control" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
                </div>
                <div className="form-group">
                  <label>Query</label>
                  <input className="form-control" type="text" name="query" value={formData.query} onChange={handleChange} placeholder="What would you like to ask?" />
                </div>
              </div>

              <div className="form-group full-width" style={{ flex: 1, marginTop: "16px" }}>
                <label>Feedback</label>
                <textarea className="form-control" name="message" value={formData.message} onChange={handleChange} placeholder="Share your thoughts or feedback..." style={{ height: isMobile ? "140px" : "100%", resize: "none" }} />
              </div>

              <button type="submit" className="form-submit" disabled={submitting} style={{ marginTop: "18px", width: "100%", padding: isMobile ? "14px" : "", fontSize: isMobile ? "15px" : "", background: submitting ? "linear-gradient(135deg,#10B981,#059669)" : "" }}>
                {submitting ? "Sending..." : "Send Message →"}
              </button>

              <p className="form-note" style={{ textAlign: "center", fontSize: isMobile ? "13px" : "", marginTop: "14px" }}>
                🔒 Your information is safe with us. No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ─────────────────────────────────────────────────
   WAVE COMPONENTS — perfectly matched to new section order:
   Hero(#fff) → Pricing(gradient) → About(#F0F7FC) → HowItWorks(#fff) → Gallery(#F8FBFF) → App(#F8FBFF) → Contact(#fff)
───────────────────────────────────────────────── */

/* Wave between Hero (#fff) and Pricing (gradient: #EFF6FF→#F0FCFF→#FFF0F6) */
const WaveHeroToPricing = () => (
  <svg className="wave lg:-mt-4" viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ background: "#fff" }} preserveAspectRatio="none">
    <defs>
      <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#EFF6FF" />
        <stop offset="50%" stopColor="#F0FCFF" />
        <stop offset="100%" stopColor="#FFF0F6" />
      </linearGradient>
    </defs>
    <path d="M0 60 C360 0 1080 0 1440 60 V60 H0Z" fill="url(#wg1)" />
  </svg>
);

/* Wave between Pricing (gradient) and About (#F0F7FC / blue-pale) */
const WavePricingToAbout = () => (
  <svg className="wave" viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ background: "linear-gradient(135deg,#EFF6FF,#F0FCFF,#FFF0F6)" }}>
    <path d="M0 0 C480 60 960 60 1440 0 V60 H0Z" fill="#F0F7FC" />
  </svg>
);

/* Wave between About (#F0F7FC) and HowItWorks (#fff) */
const WaveAboutToHow = () => (
  <svg className="wave" viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ background: "#F0F7FC" }} preserveAspectRatio="none">
    <path d="M0 0 C360 60 1080 60 1440 0 V60 H0Z" fill="#fff" />
  </svg>
);

/* Wave between HowItWorks (#fff) and Gallery (#F8FBFF) */
const WaveHowToGallery = () => (
  <svg className="wave lg:-mt-0 -mt-14" viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ background: "#fff" }} preserveAspectRatio="none">
    <path d="M0 60 C480 0 960 0 1440 60 V60 H0Z" fill="#F8FBFF" />
  </svg>
);

/* Wave between Gallery (#F8FBFF) and App (#F8FBFF) — same color, gentle visual separator */
const WaveGalleryToApp = () => (
  <svg className="wave" viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ background: "#F8FBFF" }}>
    <path d="M0 0 C480 30 960 30 1440 0 V60 H0Z" fill="#F0F7FC" opacity="0.5" />
    <path d="M0 60 C480 30 960 30 1440 60 V60 H0Z" fill="#F8FBFF" />
  </svg>
);

/* Wave between App (#F8FBFF) and Contact (#fff) */
const WaveAppToContact = () => (
  <svg className="wave lg:-mt-16" viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ background: "#F8FBFF" }}>
    <path d="M0 0 C480 60 960 60 1440 0 V60 H0Z" fill="#fff" />
  </svg>
);


/* ─────────────────────────────────────────────────
   MAIN HOME — New section order:
   Hero → Pricing → About → HowItWorks → Gallery → App → Contact
───────────────────────────────────────────────── */
export default function Home() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el, i) => {
      el.style.transitionDelay = (i % 3) * 0.1 + "s";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* 1. Hero — bg: #fff */}
      <HeroSection />

      {/* Wave: #fff → gradient */}
      <WaveHeroToPricing />

      {/* 2. Pricing — bg: gradient (#EFF6FF → #F0FCFF → #FFF0F6) */}
      <PricingSection />

      {/* Wave: gradient → #F0F7FC */}
      <WavePricingToAbout />

      {/* 3. About — bg: #F0F7FC (blue-pale) */}
      <AboutSection />

       

      {/* Wave: #F0F7FC → #fff */}
      <WaveAboutToHow />

      {/* 4. How It Works — bg: #fff */}
      <HowItWorksSection />

      <FeaturedOnSection />

      {/* Wave: #fff → #F8FBFF */}
      <WaveHowToGallery />

      {/* 5. Gallery — bg: #F8FBFF */}
      <GallerySection />

      {/* Wave: #F8FBFF → #F8FBFF (same, gentle separator) */}
      <WaveGalleryToApp />

      {/* 6. App — bg: #F8FBFF */}
      <AppSection />

      {/* Wave: #F8FBFF → #fff */}
      <WaveAppToContact />

      {/* 7. Contact — bg: #fff */}
      <ContactSection />
    </>
  );
}