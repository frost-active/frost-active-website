import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from '@/components/ui/use-toast';

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
  .fc2 { top: 45%; right: -32px; transform: translateY(-50%); animation-delay: 1.6s; }
  .fc3 { bottom: 80px; left: -26px; animation-delay: .9s; }
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
  .fc-lbl { font-size: 11px; color: var(--gray-400); font-weight: 500; line-height: 1.2; }
  .fc-val { font-size: 18px; font-weight: 800; color: var(--gray-900); line-height: 1.2; font-family: 'DM Serif Display', serif; }
  .fc-unit { font-size: 11px; color: var(--gray-400); }

  /* Wave */
  .wave { display: block; width: 100%; line-height: 0; overflow: hidden; }

  @media (max-width: 767px) {
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
  .s-gallery { background: #F8FBFF; padding: 100px 0; }
  .s-gallery-inner { max-width: 1200px; margin: 0 auto; padding: 0 80px; }
  .gallery-scroll-wrap {
    overflow-x: auto; margin-top: 52px; cursor: grab;
    user-select: none; -webkit-overflow-scrolling: touch;
    scrollbar-width: thin; scrollbar-color: rgba(87,156,211,.3) transparent;
  }
  .gallery-scroll-wrap::-webkit-scrollbar { height: 5px; }
  .gallery-scroll-wrap::-webkit-scrollbar-track { background: transparent; }
  .gallery-scroll-wrap::-webkit-scrollbar-thumb { background: rgba(87,156,211,.3); border-radius: 10px; }
  .gallery-scroll-wrap.grabbing { cursor: grabbing; }
  .gallery-track { display: flex; gap: 20px; padding: 8px 80px 20px; width: max-content; }
  .gallery-card {
    flex-shrink: 0; width: 340px; border-radius: 22px; overflow: hidden;
    position: relative; box-shadow: 0 8px 40px rgba(87,156,211,.14);
    transition: transform .3s, box-shadow .3s;
  }
  .gallery-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(87,156,211,.22); }
  .gallery-card img { width: 100%; height: 240px; object-fit: cover; display: block; }
  .gallery-card-cap {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: linear-gradient(180deg,transparent,rgba(10,30,60,.65));
    padding: 20px 20px 16px; color: #fff;
  }
  .gallery-card-cap h4 { font-family: 'DM Serif Display', serif; font-size: 16px; font-weight: 400; line-height: 1.3; }
  .gallery-card-cap p { font-size: 12px; color: rgba(255,255,255,.7); margin-top: 3px; }
  .gallery-nav { display: flex; gap: 10px; margin-top: 28px; justify-content: center; }
  .gnav-btn {
    width: 46px; height: 46px; border-radius: 50%; background: #fff;
    border: 1.5px solid #C8DFF0; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all .22s; color: var(--blue); font-size: 18px;
  }
  .gnav-btn:hover { background: var(--blue); color: #fff; border-color: var(--blue); }

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

          <div className="hero-form">
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
          <div className="hero-img-wrap">
            <img
              src="/images/heroimg.svg"
              alt="Minimal desk setup with water bottle and laptop"
            />
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
  const svgIcons = {
    bottle: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="16" fill="url(#paint0_linear_11580_4261)"/>
        <path d="M18.4285 34.0287C18.7812 33.3938 19.4505 33 20.1768 33H36.2639C37.0215 33 37.714 33.428 38.0528 34.1056L40.5528 39.1056C41.2177 40.4354 40.2507 42 38.7639 42H17.399C15.8741 42 14.9101 40.3618 15.6507 39.0287L18.4285 34.0287Z" fill="black"/>
        <rect x="24" y="17" width="8" height="16" rx="0.5" fill="#6E6C6C"/>
        <rect x="24" y="14" width="8" height="2" rx="0.5" fill="#6E6C6C"/>
        <defs>
          <linearGradient id="paint0_linear_11580_4261" x1="6" y1="6" x2="48.5" y2="53.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1B79F9"/>
            <stop offset="1" stopColor="#0DACDB"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    patterns: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="16" fill="url(#paint0_linear_11580_4262)"/>
        <path d="M18.6895 22.1846C20.6224 22.1846 22.1895 20.6176 22.1895 18.6846C22.1895 16.7516 20.6224 15.1846 18.6895 15.1846C16.7565 15.1846 15.1895 16.7516 15.1895 18.6846C15.1895 20.6176 16.7565 22.1846 18.6895 22.1846Z" fill="black"/>
        <path d="M31.5343 28.0296C31.533 27.3079 31.3079 26.6044 30.89 26.016C30.4721 25.4276 29.882 24.9833 29.201 24.7443V21.9676C29.6871 21.793 30.1285 21.5125 30.493 21.1465C30.8576 20.7806 31.1364 20.3382 31.3091 19.8513H34.0706C34.2442 20.3397 34.5244 20.7832 34.8909 21.1497C35.2574 21.5162 35.7009 21.7964 36.1893 21.97V24.7466C35.4112 25.0238 34.7562 25.5671 34.34 26.2805C33.9238 26.994 33.7733 27.8315 33.9149 28.6453C34.0566 29.459 34.4813 30.1964 35.1141 30.7272C35.7469 31.258 36.547 31.548 37.373 31.5459C38.1989 31.5439 38.9975 31.2499 39.6277 30.7159C40.2578 30.1819 40.6789 29.4424 40.8165 28.628C40.954 27.8136 40.7993 26.9768 40.3795 26.2654C39.9598 25.5541 39.302 25.0141 38.5226 24.7408V21.9688C39.0797 21.7731 39.578 21.4393 39.9709 20.9986C40.3639 20.558 40.6388 20.0249 40.7698 19.4492C40.9008 18.8735 40.8837 18.274 40.72 17.7067C40.5564 17.1394 40.2516 16.6228 39.8341 16.2054C39.4166 15.7879 38.9 15.483 38.3328 15.3194C37.7655 15.1558 37.1659 15.1387 36.5902 15.2697C36.0145 15.4007 35.4814 15.6755 35.0408 16.0685C34.6002 16.4615 34.2664 16.9598 34.0706 17.5168H31.3091C31.1131 16.9595 30.7788 16.461 30.3376 16.068C29.8964 15.6751 29.3627 15.4005 28.7864 15.27C28.2102 15.1395 27.6103 15.1573 27.0428 15.3219C26.4754 15.4864 25.9589 15.7922 25.5419 16.2107C25.1248 16.6292 24.8207 17.1467 24.6582 17.7147C24.4956 18.2827 24.4798 18.8827 24.6122 19.4585C24.7447 20.0342 25.0211 20.567 25.4155 21.0069C25.81 21.4467 26.3096 21.7793 26.8676 21.9735V24.7431C26.1862 24.9813 25.5957 25.4254 25.1778 26.014C24.76 26.6026 24.5356 27.3066 24.5356 28.0285C24.5356 28.7503 24.76 29.4543 25.1778 30.0429C25.5957 30.6315 26.1862 31.0757 26.8676 31.3138V34.0846C26.376 34.2574 25.9294 34.5382 25.5606 34.9062C25.1917 35.2743 24.91 35.7203 24.7361 36.2115H21.977C21.8037 35.722 21.5234 35.2774 21.1565 34.91C20.7895 34.5427 20.3452 34.2619 19.856 34.0881V31.3173C20.6349 31.0444 21.2922 30.505 21.7119 29.7943C22.1316 29.0837 22.2865 28.2476 22.1494 27.4337C22.0122 26.6199 21.5917 25.8807 20.9623 25.3469C20.3329 24.813 19.535 24.5189 18.7097 24.5164C17.8844 24.5139 17.0847 24.8033 16.4521 25.3333C15.8195 25.8634 15.3946 26.6 15.2526 27.413C15.1105 28.226 15.2604 29.0631 15.6758 29.7762C16.0912 30.4894 16.7454 31.0328 17.5226 31.3103V34.087C16.966 34.2828 16.468 34.6165 16.0752 35.0569C15.6825 35.4973 15.4077 36.03 15.2767 36.6054C15.1456 37.1808 15.1625 37.78 15.3257 38.347C15.489 38.9141 15.7933 39.4305 16.2102 39.8481C16.6272 40.2657 17.1431 40.5708 17.71 40.735C18.2768 40.8991 18.8759 40.917 19.4515 40.7868C20.0271 40.6566 20.5603 40.3827 21.0013 39.9907C21.4423 39.5986 21.7768 39.1012 21.9735 38.5448H24.7385C24.9349 39.1007 25.2689 39.5979 25.7093 39.9899C26.1497 40.3819 26.6822 40.656 27.2572 40.7866C27.8322 40.9173 28.4308 40.9002 28.9974 40.737C29.564 40.5738 30.08 40.2697 30.4974 39.8533C30.9147 39.4368 31.2198 38.9214 31.3842 38.3552C31.5486 37.7889 31.5669 37.1903 31.4375 36.6151C31.3081 36.0398 31.0351 35.5067 30.644 35.0655C30.2529 34.6242 29.7565 34.2892 29.201 34.0916V31.315C29.8821 31.0759 30.4724 30.6315 30.8903 30.0428C31.3082 29.4542 31.5332 28.7515 31.5343 28.0296Z" fill="black"/>
        <path d="M37.3574 40.874C39.2904 40.874 40.8574 39.307 40.8574 37.374C40.8574 35.441 39.2904 33.874 37.3574 33.874C35.4244 33.874 33.8574 35.441 33.8574 37.374C33.8574 39.307 35.4244 40.874 37.3574 40.874Z" fill="black"/>
        <defs>
          <linearGradient id="paint0_linear_11580_4262" x1="6" y1="6" x2="48.5" y2="53.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1B79F9"/>
            <stop offset="1" stopColor="#0DACDB"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    cues: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="16" fill="url(#paint0_linear_11580_4264)"/>
        <path d="M38.375 35.9587V37.167H16.625V35.9587L19.0417 33.542V26.292C19.0417 22.5462 21.4946 19.2474 25.0833 18.1841V17.8337C25.0833 17.1927 25.3379 16.578 25.7912 16.1248C26.2444 15.6716 26.8591 15.417 27.5 15.417C28.1409 15.417 28.7556 15.6716 29.2088 16.1248C29.6621 16.578 29.9167 17.1927 29.9167 17.8337V18.1841C33.5054 19.2474 35.9583 22.5462 35.9583 26.292V33.542L38.375 35.9587ZM29.9167 38.3753C29.9167 39.0163 29.6621 39.631 29.2088 40.0842C28.7556 40.5374 28.1409 40.792 27.5 40.792C26.8591 40.792 26.2444 40.5374 25.7912 40.0842C25.3379 39.631 25.0833 39.0163 25.0833 38.3753" fill="black"/>
        <defs>
          <linearGradient id="paint0_linear_11580_4264" x1="6" y1="6" x2="48.5" y2="53.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1B79F9"/>
            <stop offset="1" stopColor="#0DACDB"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    habits: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="16" fill="url(#paint0_linear_11580_4266)"/>
        <path d="M15.125 36.2175C15.125 36.2175 16.5 20.7488 20.625 15.125L27.5 16.5L26.125 20.7488H23.375V30.5938H24.75C27.5 26.3725 33.1925 24.8325 36.63 26.3725C41.1675 28.4763 40.755 34.815 36.63 37.62C33.33 39.875 23.375 41.8413 15.125 36.2175Z" fill="black"/>
        <defs>
          <linearGradient id="paint0_linear_11580_4266" x1="6" y1="6" x2="48.5" y2="53.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1B79F9"/>
            <stop offset="1" stopColor="#0DACDB"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  };

  const steps = [
    { svgKey: "bottle",   title: "Place your bottle",      desc: "Set Frost Aura on your desk and place any water bottle nearby. Tracking begins automatically the moment it's powered on.", chip: "Zero setup" },
    { svgKey: "patterns", title: "Device learns patterns",  desc: "Work as you normally would. The onboard AI quietly observes your hydration habits, focus blocks, and work sessions.", chip: "Passive AI learning" },
    { svgKey: "cues",     title: "Get gentle cues",         desc: "Receive perfectly timed, non-intrusive hydration nudges and movement prompts — never disruptive, always helpful.", chip: "Smart nudges" },
    { svgKey: "habits",   title: "Habits build themselves", desc: "Consistency compounds. Unlock newer wellness habits automatically as your patterns improve over time.", chip: "Effortless routine" },
  ];

  return (
    <section className="s3" id="how">
      <div className="lg:-mt-16 -mt-10">
      <div className="s3-inner">
        <div className="eyebrow" style={{ justifyContent: "center" }}>The Process</div>
        <h2>How It Works</h2>
        <p className="section-desc">
          Your roadmap to a healthier, more focused lifestyle — without changing anything about how you work.
        </p>

        <div className="steps-grid">
          {steps.map(({ svgKey, title, desc, chip }, i) => (
            <div className="step-card reveal" data-n={i + 1} key={i}>
              {/* SVG icon replaces .sc-ico-wrap — no wrapper div needed */}
              <div style={{ marginBottom: 20 }}>
                {svgIcons[svgKey]}
              </div>
              <div className="sc-title">{title}</div>
              <div className="sc-desc">{desc}</div>
              <div className="sc-chip">{chip}</div>
            </div>
          ))}
        </div>

        <div className="proc-wrap reveal">
          <div className="proc-left">
            <img
              src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=900&auto=format&fit=crop&q=85"
              alt="Productive desk setup"
            />
            <div className="proc-ov" />
            <div className="proc-content">
              <h3>Built for the way<br />you actually work.</h3>
              <p>No lifestyle overhaul needed. Frost Aura integrates seamlessly into any existing workspace, quietly and intelligently.</p>
              <div className="proc-pills">
                {["💧 Hydration", "🧠 Focus", "🏃 Movement", "🌿 Habits"].map((p) => (
                  <div className="proc-pill" key={p}>{p}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="proc-right">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=85&crop=top"
              alt="Happy energetic man working at desk"
            />
            <div className="proc-right-overlay" />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [countdown, setCountdown] = useState({
    d: "30",
    h: "00",
    m: "00",
    s: "00",
  });

  useEffect(() => {
    const storageKey = "pricingCountdownEnd";

    // Check if timer already exists in localStorage
    let savedEnd = localStorage.getItem(storageKey);

    // If no timer exists, create 30-day timer
    if (!savedEnd) {
      const newEnd = Date.now() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem(storageKey, newEnd);
      savedEnd = newEnd;
    }

    const end = Number(savedEnd);

    const pad = (n) => String(Math.floor(n)).padStart(2, "0");

    const tick = () => {
      const diff = end - Date.now();

      if (diff <= 0) {
        setCountdown({
          d: "00",
          h: "00",
          m: "00",
          s: "00",
        });
        clearInterval(id);
        return;
      }

      const days = diff / (1000 * 60 * 60 * 24);
      const hours = (diff / (1000 * 60 * 60)) % 24;
      const mins = (diff / (1000 * 60)) % 60;
      const secs = (diff / 1000) % 60;

      setCountdown({
        d: pad(days),
        h: pad(hours),
        m: pad(mins),
        s: pad(secs),
      });
    };

    tick();
    const id = setInterval(tick, 1000);

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

              <div className="pc-amt">
                <sup>$</sup>
                {price}
              </div>

              {save && <div className="pc-save">{save}</div>}

              <div className="pc-was">{was}</div>

              <a
                href={campaignLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pc-cta"
              >
                {cta}
              </a>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 10 }}>
          <a
            href={campaignLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pink-lg"
          >
            Back Frost Aura on Indiegogo

            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="trust-row">
          {["🔒 Secure checkout", "📦 Ships worldwide", "💎 Premium Quality", "⚡ Limited stock"].map(
            (t) => (
              <div className="trust-item" key={t}>
                {t}
              </div>
            )
          )}
        </div>
      </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const cards = [
    { src: "/gallery/1.jpeg", sub: "Clean desk, clear mind" },
    { src: "/gallery/2.jpeg", title: "Developer's Corner", sub: "Focus mode, activated" },
    { src: "/gallery/3.jpeg", title: "Creative Space", sub: "Where ideas flow freely" },
    { src: "/gallery/4.jpeg", title: "Home Office Bliss", sub: "Wellness, built in" },
    { src: "/gallery/5.jpeg", title: "Peak Productivity", sub: "Hydrated & focused" },
    { src: "/gallery/6.jpeg", title: "Wellness at Work", sub: "Habits made effortless" },
      { src: "/gallery/7.jpeg", title: "Work Station ", sub: "Wellness, seamlessly built in" },
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
    <section className="s-gallery lg:-mt-6" id="gallery">
      <div className="lg:-mt-0 -mt-16">
      <div className="s-gallery-inner">
        <div className="eyebrow">Visual Showcase</div>
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
        <button className="gnav-btn" onClick={() => scrollRef.current.scrollBy({ left: -380, behavior: "smooth" })}>←</button>
        <button className="gnav-btn" onClick={() => scrollRef.current.scrollBy({ left: 380, behavior: "smooth" })}>→</button>
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
    <div className="app-browser-wrap" style={large ? {} : {}}>
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

        {/* Dashboard */}
        <div className="app-featured reveal">
          <BrowserChrome url="app.frostactive.com " large>
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

        {/* 3 small screens */}
        <div className="app-screens-row">
          {/* Hydration */}
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

          {/* Focus */}
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

          {/* Habits */}
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
    message: "",
  });

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxv_rlA8zUYbhhN8PuMVbcoh0mhXzlWAetJA9EH8qAGAd3Ya4myK8tt1h3yPFZ3d2TN/exec";

  const MASTER_GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxqXNa5d1oYF9yiHJpsxtv6sdtV0KsdGUSg_2oSe--dHl4YIe7tPCYHZzeBsIojmqXt/exec";

  const CHEERIO_API_KEY =
    "dfd7bcf44867df2f37bccce492a2368dcb0d9cdcd5963dd47acd270de09208ba";

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= EMAIL VALIDATION =================
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[A-Za-z.]{2,}$/;
    if (!regex.test(email)) return false;

    const validTLDs = new Set([
      "com","org","net","info","biz","xyz","dev","app","pro","me","name",
      "online","site","tech","store","ai","io","cloud","digital","media",
      "in","us","uk","ca","au","nz","de","fr","jp","sg","ae","sa","pk","lk",
      "bd","cn","es","it","nl",
      "co.in","org.in","net.in","ac.in","gov.in","nic.in",
      "co.uk","org.uk","ac.uk",
      "co.za","co.jp","com.au","com.sg","com.pk"
    ]);

    const parts = email.toLowerCase().split("@")[1].split(".");
    const tld1 = parts[parts.length - 1];
    const tld2 = parts.length >= 2 ? parts.slice(-2).join(".") : null;

    return validTLDs.has(tld1) || (tld2 && validTLDs.has(tld2));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, query, message } = formData;

    if (!name || !email || !phone || !query || !message) {
      toast({
        title: "All Fields Required",
        description: "Please complete all fields before submitting the form.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email Address",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // 1️⃣ Google Sheet Full Form
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch(() => {});

      // 2️⃣ Master Email Sheet
      fetch(MASTER_GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(email)}&source=Contact Us`,
      }).catch(() => {});

      // 3️⃣ Cheerio Workflow
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
            workflowId: "691d8c61dfc2664a0552732b",
          }),
        }
      );

      toast({
        title: "Message Successfully Sent",
        description:
          "Thank you for contacting us. Our team has received your message and will get back to you soon.",
      });

      // Reset
      setFormData({
        name: "",
        email: "",
        phone: "",
        query: "",
        message: "",
      });

    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          "We encountered an issue while submitting your request. Please try again shortly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="s5 lg:-mt-0 " id="contact">
      <div className="lg:-mt-0 -mt-14">
      <div
        className="s5-inner"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "24px" : "32px",
          alignItems: "stretch",
        }}
      >
        {/* LEFT */}
        <div
          className="reveal s5-left"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="eyebrow">Get In Touch</div>

          <h2
            style={{
              fontSize: isMobile ? "28px" : "",
              lineHeight: isMobile ? "1.25" : "",
            }}
          >
            We'd Love to Hear From You
          </h2>

          <p
            style={{
              fontSize: isMobile ? "15px" : "",
              lineHeight: isMobile ? "1.7" : "",
            }}
          >
            Have questions about Frost Aura? Need product support, business
            inquiries, or want to share your experience? Send us a message and
            our team will get back to you as soon as possible.
          </p>

          <div
            style={{
              flex: 1,
              marginTop: "20px",
              borderRadius: "22px",
              overflow: "hidden",
              minHeight: isMobile ? "260px" : "auto",
            }}
          >
            <img
              src="/images/contactimg1.jpeg"
              alt="Contact Us"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="reveal" style={{ height: "100%" }}>
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: isMobile ? "22px" : "",
            }}
          >
            <div
              className="eyebrow"
              style={{
                marginBottom: 22,
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Send a Message
            </div>

            {/* Row 1 */}
            <div
              className="form-row"
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "16px",
              }}
            >
              <div className="form-group">
                <label>Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div
              className="form-row"
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "16px",
                marginTop: "16px",
              }}
            >
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  className="form-control"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label>Query</label>
                <input
                  className="form-control"
                  type="text"
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="What would you like to ask?"
                />
              </div>
            </div>

            {/* Message */}
            <div
              className="form-group full-width"
              style={{
                flex: 1,
                marginTop: "16px",
              }}
            >
              <label>Feedback</label>
              <textarea
                className="form-control"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your thoughts or feedback..."
                style={{
                  height: isMobile ? "140px" : "100%",
                  resize: "none",
                }}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="form-submit"
              disabled={submitting}
              style={{
                marginTop: "18px",
                width: "100%",
                padding: isMobile ? "14px" : "",
                fontSize: isMobile ? "15px" : "",
                background: submitting
                  ? "linear-gradient(135deg,#10B981,#059669)"
                  : "",
              }}
            >
              {submitting ? "Sending..." : "Send Message →"}
            </button>

            <p
              className="form-note"
              style={{
                textAlign: "center",
                fontSize: isMobile ? "13px" : "",
                marginTop: "14px",
              }}
            >
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
   WAVE HELPERS
───────────────────────────────────────────────── */
const Wave1 = () => (
  <svg className="wave lg:-mt-4 " viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ background: "#fff" }} preserveAspectRatio="none">
    <path d="M0 60 C360 0 1080 0 1440 60 V60 H0Z" fill="#F0F7FF" />
  </svg>
);
const Wave2 = () => (
  <svg className="wave" viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ background: "#F0F7FF" }} preserveAspectRatio="none">
    <path d="M0 0 C360 60 1080 60 1440 0 V60 H0Z" fill="#fff" />
  </svg>
);
const Wave3 = () => (
  <svg className="wave lg:-mt-0 -mt-14" viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ background: "#fff" }} preserveAspectRatio="none">
    <path d="M0 60 C480 0 960 0 1440 60 V60 H0Z" fill="url(#pg)" />
    <defs><linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#EFF6FF" /><stop offset="50%" stopColor="#F0FCFF" /><stop offset="100%" stopColor="#FFF0F6" /></linearGradient></defs>
  </svg>
);
const Wave4 = () => (
  <svg className="wave" viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ background: "linear-gradient(135deg,#EFF6FF,#F0FCFF,#FFF0F6)" }}>
    <path d="M0 0 C480 60 960 60 1440 0 V60 H0Z" fill="#F8FBFF" />
  </svg>
);
const Wave5 = () => (
  <svg className="wave" viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ background: "#F8FBFF" }}>
    <path d="M0 0 C480 60 960 60 1440 0 V60 H0Z" fill="#fff" />
  </svg>
);
const Wave6 = () => (
  <svg className="wave lg:-mt-16" viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ background: "#F8FBFF" }}>
    <path d="M0 60 C480 0 960 0 1440 60 V60 H0Z" fill="#F0F7FC" />
  </svg>
);

/* ─────────────────────────────────────────────────
   MAIN HOME
───────────────────────────────────────────────── */
export default function Home() {
  // Scroll reveal
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
      <HeroSection />
      <Wave1 />
      <AboutSection />
      <Wave2 />
      <HowItWorksSection />
      <Wave3 />
      <PricingSection />
      <Wave4 />
      <GallerySection />
      <Wave5 />
      <AppSection />
      <Wave6 />
      <ContactSection />
    </>
  );
}