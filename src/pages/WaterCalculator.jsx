import { useState, useRef } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@600;700&family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Playfair+Display:ital,wght@0,700;1,400&family=Bebas+Neue&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blue: #29aae1; --blue2: #1a96cc; --blue3: #e6f5fc; --blue4: #cce8f7;
    --pink: #f0457a; --navy: #0d2a3a; --white: #ffffff; --bg: #f4f9fd;
    --text: #0d2a3a; --sub: #4a7d97; --muted: #5a9cb8; --border: #d5ecf7;
    --red: #e53935; --red-bg: #fff5f5; --red-border: #ffcdd2;
    --green: #2e7d32; --green-bg: #f1f8f1; --green-border: #c8e6c9;
    --amber: #b26a00; --amber-bg: #fff8ec; --amber-border: #ffe0a3; --r: 14px;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }

  .wic-nav { background: var(--white); border-bottom: 1px solid var(--border); padding: 0 2.5rem; height: 62px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
  .wic-logo { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; letter-spacing: .06em; color: var(--navy); line-height: 1; }
  .wic-logo b { color: var(--blue); }
  .wic-logo small { font-size: .42rem; font-weight: 400; color: var(--muted); letter-spacing: .15em; display: block; margin-top: 2px; }
  .wic-nav-links { display: flex; gap: 2rem; list-style: none; }
  .wic-nav-links a { font-size: .83rem; color: var(--sub); text-decoration: none; transition: color .18s; }
  .wic-nav-links a:hover { color: var(--blue); }
  .wic-nav-pill { background: var(--pink); color: #fff; border: none; padding: .52rem 1.4rem; border-radius: 100px; font-size: .78rem; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; box-shadow: 0 3px 14px rgba(240,69,122,.3); transition: all .2s; }
  .wic-nav-pill:hover { background: #d93a6a; transform: translateY(-1px); }

  .wic-hero { background: linear-gradient(135deg,#1a96cc 0%,#29aae1 55%,#3dbfe8 100%); padding: 3.5rem 2.5rem 5rem; position: relative; overflow: hidden; }
  .wic-hero-circle1 { position: absolute; width: 420px; height: 420px; border-radius: 50%; background: rgba(255,255,255,.06); top: -140px; right: -80px; pointer-events: none; }
  .wic-hero-circle2 { position: absolute; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,255,255,.05); bottom: -60px; left: 38%; pointer-events: none; }
  .wic-hero-circle3 { position: absolute; width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,.07); bottom: 40px; right: 120px; pointer-events: none; }
  .wic-hero-inner {
    max-width: 760px;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1.2rem;
    margin: 0 auto;
  }

  .wic-hero-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    background: rgba(255,255,255,.15);
    border: 1px solid rgba(255,255,255,.28);
    color: #fff;
    font-size: .83rem;
    font-weight: 500;
    letter-spacing: .22em;
    text-transform: uppercase;
    padding: .3rem .9rem;
    border-radius: 100px;
  }

  .wic-hero-pretitle {
    font-family: 'DM Sans', sans-serif;
    font-size: .78rem;
    font-weight: 400;
    color: rgba(255,255,255,.9);
    letter-spacing: .14em;
    text-transform: uppercase;
    margin-bottom: .6rem;
    text-align: center;
  }

  .wic-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.4rem,5vw,3.8rem);
    font-weight: 700;
    color: #fff;
    line-height: 1.08;
    letter-spacing: -.01em;
    margin-bottom: 1rem;
    text-align: center;
  }

  .wic-hero-divider {
    width: 60px;
    height: 2.5px;
    background: rgba(255,255,255,.65);
    border-radius: 2px;
    margin: 0 auto;
  }

  .wic-hero-sub {
    font-size: 1rem;
    color: rgba(255,255,255,.93);
    line-height: 1.8;
    font-weight: 400;
    max-width: 650px;
    margin: 0 auto;
    text-align: center;
  }

  .wic-hero-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    width: 100%;
    margin-top: .6rem;
  }

  .wic-hst {
    background: rgba(255,255,255,.18);
    border: 1px solid rgba(255,255,255,.35);
    border-radius: 16px;
    padding: 1rem 1.5rem;
    text-align: center;
    min-width: 150px;
    backdrop-filter: blur(6px);
    transition: all .25s ease;
  }

  .wic-hst:hover {
    transform: translateY(-3px);
    background: rgba(255,255,255,.22);
  }

  .wic-hst-n {
    font-family: 'Roboto', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: #fff;
    line-height: 1;
  }

  .wic-hst-l {
    font-size: .7rem;
    color: rgba(255,255,255,.9);
    text-transform: uppercase;
    letter-spacing: .1em;
    margin-top: 6px;
    font-weight: 500;
    line-height: 1.4;
  }

  @media (max-width: 640px) {
    .wic-hero { padding: 2.5rem 1.2rem 4rem; }
    .wic-hero-inner { gap: 1rem; }
    .wic-hero-sub { font-size: .9rem; max-width: 100%; }
    .wic-hero-stats { flex-direction: row; justify-content: center; gap: .8rem; }
    .wic-hst { min-width: 95px; flex: 1; padding: .9rem 1rem; }
    .wic-hst-n { font-size: 1.5rem; }
    .wic-hst-l { font-size: .58rem; }
  }
  .wic-wrap { max-width: 760px; margin: -2rem auto 0; padding: 0 1.5rem 4rem; position: relative; z-index: 2; }
  .wic-card { background: var(--white); border-radius: 20px; box-shadow: 0 12px 50px rgba(41,170,225,.1), 0 2px 8px rgba(0,0,0,.04); padding: 2.5rem 2.75rem; }

  .wic-sh { display: flex; align-items: center; gap: .7rem; margin-bottom: 1rem; }
  .wic-sh-lbl { font-size: .6rem; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; color: var(--blue); white-space: nowrap; }
  .wic-sh-line { flex: 1; height: 1px; background: linear-gradient(90deg,var(--border),transparent); }

  .wic-g-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
  .wic-gc { display: flex; align-items: center; gap: .85rem; padding: .9rem 1.2rem; border-radius: var(--r); background: var(--bg); border: 2px solid var(--border); cursor: pointer; transition: all .22s; font-family: 'DM Sans', sans-serif; width: 100%; text-align: left; }
  .wic-gc-circle { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 700; flex-shrink: 0; transition: all .22s; }
  .wic-gc-info { text-align: left; }
  .wic-gc-title { font-size: .9rem; font-weight: 500; color: var(--text); display: block; line-height: 1; }
  .wic-gc-sub { font-size: .63rem; color: var(--muted); display: block; margin-top: 2px; }
  .wic-gc-male .wic-gc-circle { background: #dff2fb; color: var(--blue); }
  .wic-gc-female .wic-gc-circle { background: #fde8ef; color: var(--pink); }
  .wic-gc-male:hover { border-color: var(--blue); background: #edf8ff; }
  .wic-gc-female:hover { border-color: var(--pink); background: #fff5f8; }
  .wic-gc-male.wic-on { border-color: var(--blue); background: #edf8ff; }
  .wic-gc-male.wic-on .wic-gc-circle { background: var(--blue); color: #fff; }
  .wic-gc-male.wic-on .wic-gc-title { color: var(--blue2); }
  .wic-gc-female.wic-on { border-color: var(--pink); background: #fff5f8; }
  .wic-gc-female.wic-on .wic-gc-circle { background: var(--pink); color: #fff; }
  .wic-gc-female.wic-on .wic-gc-title { color: var(--pink); }

  .wic-row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; align-items: end; }
  .wic-f { display: flex; flex-direction: column; gap: 5px; }
  .wic-f label { font-size: .7rem; font-weight: 500; color: var(--sub); letter-spacing: .04em; }
  .wic-f input, .wic-f select { background: transparent; border: none; border-bottom: 2px solid var(--border); color: var(--text); padding: .55rem 0; font-family: 'DM Sans', sans-serif; font-size: .95rem; outline: none; transition: border-color .2s; width: 100%; appearance: none; -webkit-appearance: none; }
  .wic-f input::placeholder { color: #6fa8c0; }
  .wic-f input:focus { border-bottom-color: var(--blue); }
  .wic-f select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%2329aae1' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right .2rem center; padding-right: 1.4rem; cursor: pointer; }
  .wic-f select:focus { border-bottom-color: var(--blue); }
  .wic-f select option { background: #fff; color: var(--text); }
  .wic-height-field { display: flex; flex-direction: column; gap: 0; }
  .wic-height-label-row { display: flex; align-items: center; justify-content: space-between; height: 1.05rem; margin-bottom: 5px; }
  .wic-height-label-row label { font-size: .7rem; font-weight: 500; color: var(--sub); letter-spacing: .04em; margin: 0; line-height: 1; }
  .wic-height-unit-sw { display: flex; background: #e0f1fa; border-radius: 100px; padding: 2px; gap: 1px; }
  .wic-husw { padding: .18rem .6rem; border-radius: 100px; border: none; background: transparent; color: var(--sub); font-family: 'DM Sans', sans-serif; font-size: .65rem; cursor: pointer; transition: all .18s; font-weight: 500; letter-spacing: .02em; line-height: 1; }
  .wic-husw.wic-on { background: var(--blue); color: #fff; font-weight: 600; }
  .wic-husw:not(.wic-on):hover { background: #c2e0f5; color: var(--blue2); }
  .wic-height-input { background: transparent; border: none; border-bottom: 2px solid var(--border); color: var(--text); padding: .55rem 0; font-family: 'DM Sans', sans-serif; font-size: .95rem; outline: none; transition: border-color .2s; width: 100%; }
  .wic-height-input::placeholder { color: #6fa8c0; }
  .wic-height-input:focus { border-bottom-color: var(--blue); }
  .wic-ftin { display: flex; gap: .6rem; }
  .wic-ftin-cell { flex: 1; display: flex; align-items: baseline; gap: 4px; border-bottom: 2px solid var(--border); transition: border-color .2s; }
  .wic-ftin-cell:focus-within { border-bottom-color: var(--blue); }
  .wic-ftin-cell input { background: transparent; border: none; color: var(--text); padding: .55rem 0; font-family: 'DM Sans', sans-serif; font-size: .95rem; outline: none; width: 100%; -webkit-appearance: none; appearance: none; }
  .wic-ftin-cell input::placeholder { color: #6fa8c0; }
  .wic-ftin-unit { font-size: .68rem; color: var(--muted); font-weight: 500; }

  .wic-act-row { display: flex; gap: .6rem; margin-bottom: 2rem; }
  .wic-ab { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 7px; background: var(--bg); border: 2px solid var(--border); border-radius: 14px; padding: .85rem .4rem .7rem; cursor: pointer; transition: all .22s; font-family: 'DM Sans', sans-serif; }
  .wic-ab-ic { font-size: 1.4rem; line-height: 1; }
  .wic-ab-lb { font-size: .62rem; color: var(--sub); font-weight: 400; text-align: center; line-height: 1.25; transition: color .2s; }
  .wic-ab:hover { border-color: var(--blue); background: #edf8ff; }
  .wic-ab:hover .wic-ab-lb { color: var(--blue2); }
  .wic-ab.wic-on { border-color: var(--blue); background: var(--blue); }
  .wic-ab.wic-on .wic-ab-lb { color: #fff; font-weight: 500; }

  .wic-chips { display: flex; flex-wrap: nowrap; gap: .55rem; margin-bottom: 2rem; overflow-x: auto; padding-bottom: 4px; }
  .wic-chips::-webkit-scrollbar { height: 3px; }
  .wic-chips::-webkit-scrollbar-track { background: #f0f8fd; border-radius: 100px; }
  .wic-chips::-webkit-scrollbar-thumb { background: var(--border); border-radius: 100px; }
  .wic-chip { display: inline-flex; align-items: center; gap: 5px; padding: .42rem .9rem; border-radius: 100px; background: var(--bg); color: var(--sub); font-size: .78rem; cursor: pointer; user-select: none; border: 1.5px solid var(--border); transition: all .2s; font-family: 'DM Sans', sans-serif; white-space: nowrap; flex-shrink: 0; }
  .wic-chip:hover { background: #dff2fb; border-color: var(--blue); color: var(--blue2); }
  .wic-chip.wic-on { background: var(--blue); color: #fff; border-color: var(--blue); }
  .wic-chip-tick { font-size: .65rem; }

  .wic-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
  .wic-email-hint { font-size: .65rem; color: #6fa8c0; margin-top: 5px; font-style: normal; font-weight: 400; }
  .wic-req { color: var(--pink); }

  .wic-calc-btn-wrap { margin-bottom: 2rem; }
  .wic-btn-calc { width: 100%; background: var(--blue); color: #fff; border: none; padding: 1.1rem 2rem; border-radius: var(--r); font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; transition: all .22s; box-shadow: 0 5px 22px rgba(41,170,225,.35); display: flex; align-items: center; justify-content: center; gap: .6rem; }
  .wic-btn-calc:hover { background: var(--blue2); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(41,170,225,.42); }
  .wic-btn-calc:active { transform: scale(.98); }
  .wic-btn-calc-sub { background: transparent; color: var(--sub); border: 1.5px solid var(--border); padding: .85rem 2rem; border-radius: var(--r); font-family: 'DM Sans', sans-serif; font-size: .88rem; font-weight: 500; cursor: pointer; transition: all .22s; margin-top: .75rem; width: 100%; display: block; text-align: center; text-decoration: none; }
  .wic-btn-calc-sub:hover { border-color: var(--pink); color: var(--pink); }

  .wic-result { border-radius: 18px; overflow: hidden; border: 1.5px solid var(--border); transition: all .3s; }
  .wic-res-empty { padding: 2.5rem; text-align: center; color: var(--muted); font-size: .88rem; display: flex; flex-direction: column; align-items: center; gap: .6rem; background: var(--bg); border-radius: 18px; }
  .wic-res-drop { opacity: .25; }
  .wic-res-hero { background: linear-gradient(135deg,#1a96cc,#29aae1); padding: 2rem 2.25rem; text-align: center; }
  .wic-res-heading { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: .22em; margin-bottom: .35rem; }
  .wic-res-subheading { font-size: .78rem; color: rgba(255,255,255,.8); font-weight: 400; letter-spacing: .06em; margin-bottom: .5rem; text-transform: uppercase; }
  .wic-res-num { font-family: 'Bebas Neue', sans-serif; font-size: 6rem; font-weight: 400; color: #fff; line-height: 1; letter-spacing: .02em; }
  .wic-res-unit { font-size: .7rem; color: rgba(255,255,255,.75); text-transform: uppercase; letter-spacing: .18em; margin-top: 5px; margin-bottom: 1.5rem; font-weight: 500; }
  .wic-res-glass-row { display: flex; align-items: center; justify-content: center; gap: 1rem; border-top: 1px solid rgba(255,255,255,.18); padding-top: 1.25rem; }
  .wic-res-glass-ic { display: flex; align-items: center; justify-content: center; line-height: 1; }
  .wic-res-glass-n { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 700; color: #fff; line-height: 1; }
  .wic-res-glass-l { font-size: .65rem; color: rgba(255,255,255,.75); text-transform: uppercase; letter-spacing: .1em; margin-top: 3px; font-weight: 500; }
  .wic-res-bars { padding: 1.5rem 2.25rem; background: #fff; display: flex; flex-direction: column; gap: .85rem; }
  .wic-rbar { display: flex; align-items: center; gap: 12px; }
  .wic-rbar-l { font-size: .72rem; color: var(--sub); min-width: 120px; font-weight: 400; }
  .wic-rbar-t { flex: 1; height: 6px; background: var(--blue3); border-radius: 100px; overflow: hidden; }
  .wic-rbar-f { height: 100%; border-radius: 100px; background: var(--blue); transition: width 1s cubic-bezier(.4,0,.2,1); }
  .wic-rbar-v { font-size: .72rem; color: var(--text); font-weight: 600; min-width: 36px; text-align: right; }
  .wic-res-note { padding: 0 2.25rem 1.25rem; background: #fff; font-size: .72rem; color: var(--muted); line-height: 1.55; }
  .wic-res-note strong { color: var(--sub); }
  .wic-res-status { margin: 0 2.25rem 1.5rem; border-radius: 12px; padding: 1.25rem 1.5rem; }
  .wic-res-status.warn { background: var(--red-bg); border: 1.5px solid var(--red-border); }
  .wic-res-status.good { background: var(--green-bg); border: 1.5px solid var(--green-border); }
  .wic-res-status.optimal { background: #f0fdf4; border: 1.5px solid #86efac; }
  .wic-res-status.over { background: var(--amber-bg); border: 1.5px solid var(--amber-border); }
  .wic-res-status-top { display: flex; align-items: center; gap: .75rem; margin-bottom: .75rem; }
  .wic-res-status-icon { font-size: 1.5rem; }
  .wic-res-status-title { font-family: 'Syne', sans-serif; font-size: .95rem; font-weight: 700; }
  .wic-res-status.warn .wic-res-status-title { color: var(--red); }
  .wic-res-status.good .wic-res-status-title { color: var(--green); }
  .wic-res-status.optimal .wic-res-status-title { color: #22c55e; }
  .wic-res-status.over .wic-res-status-title { color: var(--amber); }
  .wic-res-status-body { font-size: .8rem; line-height: 1.65; color: var(--sub); }
  .wic-res-status.warn .wic-res-status-body { color: #c62828; }
  .wic-res-status.good .wic-res-status-body { color: #2e7d32; }
  .wic-res-status.optimal .wic-res-status-body { color: #166534; }
  .wic-res-status.over .wic-res-status-body { color: #8a5200; }
  .wic-res-status-list { margin-top: .6rem; padding-left: 1rem; display: flex; flex-direction: column; gap: .35rem; }
  .wic-res-status-list li { font-size: .78rem; line-height: 1.5; }
  .wic-res-status.warn .wic-res-status-list li { color: #c62828; }
  .wic-res-status.good .wic-res-status-list li { color: #2e7d32; }
  .wic-res-status.optimal .wic-res-status-list li { color: #166534; }
  .wic-res-status.over .wic-res-status-list li { color: #8a5200; }
  .wic-res-disclaimer { padding: 0 2.25rem 1.5rem; background: #fff; font-size: .77rem; color: var(--muted); line-height: 1.5; font-style: italic; }
  .wic-sec-gap { margin-bottom: 2rem; }
  .wic-err { font-size: .7rem; color: var(--pink); margin-top: 4px; }
  .wic-field-err input, .wic-field-err select, .wic-field-err .wic-height-input, .wic-field-err .wic-ftin-cell { border-bottom-color: var(--pink) !important; }

  @keyframes wicFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .wic-res-live { animation: wicFadeUp .4s ease; }

  @media (max-width: 640px) {
    .wic-nav { padding: 0 1rem; }
    .wic-nav-links { display: none; }
    .wic-hero { padding: 2rem 1.25rem 3.5rem; }
    .wic-hero-inner { grid-template-columns: 1fr; }
    .wic-hero-stats { flex-direction: row; flex-wrap: wrap; }
    .wic-hst { flex: 1; min-width: 80px; }
    .wic-wrap { padding: 0 .75rem 3rem; }
    .wic-card { padding: 1.5rem 1.25rem; }
    .wic-g-row, .wic-row3, .wic-row2 { grid-template-columns: 1fr; }
    .wic-act-row { flex-wrap: wrap; }
    .wic-ab { flex: calc(33% - .5rem); min-width: calc(33% - .5rem); }
  }
`;

// ==================== BACKEND LOGIC & CALCULATIONS ====================
//
// HYDRATION MODEL (evidence-based)
// --------------------------------
// Baseline: ml of water per kg of body weight per day. Major bodies (IOM /
// National Academy of Medicine, EFSA, ACSM, Mayo) put the healthy band at
// ~30-35 ml/kg at rest, rising to ~40-45 ml/kg for active people. We fold the
// activity level directly into that coefficient so it never leaves the band.
//
//   sedentary 30 | light 33 | moderate 36 | high 40 | extreme 45  (ml/kg/day)
//
// Adjustments are MULTIPLICATIVE so they scale correctly with body size
// (a flat "+0.6 L" over-corrects a 50 kg person and under-corrects a 110 kg one):
//   - sex:     female x0.95 (slightly lower lean mass at equal weight)
//   - climate: cold x0.95, temperate x1.00, hot x1.15, humid x1.20
//   - age:     under 16 x1.05 (higher turnover), 65+ x0.97
//
// Other fluid sources (tea/coffee/juice/milk/soda/food) genuinely count toward
// intake, so each selected source applies a small fluid CREDIT that reduces the
// plain-water target — capped at 30% of the requirement (and max 1 L), with a
// hard floor so we never recommend an unsafe-low amount.
//
// Final value is clamped to a sane [1.3 L, 6.0 L] daily window.

// ml of water per kg of body weight per day, by activity level
const ACTIVITY_MULTIPLIERS = { sedentary: 30, light: 33, moderate: 36, high: 40, extreme: 45 };

// multiplicative climate factors
const CLIMATE_MULTIPLIER = { cold: 0.95, temperate: 1.0, hot: 1.15, humid: 1.2 };

// approximate daily fluid (L) contributed by each "additional source"
const CHIP_FLUID_CREDIT = { tea: 0.2, coffee: 0.2, juice: 0.2, milk: 0.2, soda: 0.15, food: 0.4 };

const MIN_WATER_L = 1.3;
const MAX_WATER_L = 6.0;

// reference for the health notes shown to the user
const HYDRATION_REF = "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2908954/";

// Google Sheets Web App URLs
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycby3a3Mx3DjTXlj3M4Eim0QzQC5r5PQEecvEvp266pGsEesxVahO1kGuKijVDB8HMO7NRg/exec';
const MASTER_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxqXNa5d1oYF9yiHJpsxtv6sdtV0KsdGUSg_2oSe--dHl4YIe7tPCYHZzeBsIojmqXt/exec";

// ---------- Validation ----------
function validateEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

// formData.height here is already converted to centimetres
function validateForm(formData) {
  const newErrors = {};
  const { age, weight, email, height } = formData;
  const a = parseFloat(age), w = parseFloat(weight), h = parseFloat(height);

  if (!w || w < 20 || w > 300) newErrors.weight = true;
  if (!a || a < 2 || a > 120) newErrors.age = true;
  if (!h || h < 50 || h > 250) newErrors.height = true;       // sane human range in cm
  if (!validateEmail((email || "").trim())) newErrors.email = true;

  return newErrors;
}

// ---------- Height conversion ----------
function toCentimetres(unit, cmValue, ftValue, inValue) {
  if (unit === "cm") return parseFloat(cmValue) || 0;
  const ft = parseFloat(ftValue) || 0;
  const inch = parseFloat(inValue) || 0;
  return ft * 30.48 + inch * 2.54;
}

// ---------- Core water calculation ----------
function calculateWaterNeeded(formData) {
  const { gender, age, weight, activity, climate, chips } = formData;
  const w = parseFloat(weight);
  const a = parseFloat(age);

  if (!w || !a) return null;

  // 1. Base intake from body weight + activity
  let d = (w * (ACTIVITY_MULTIPLIERS[activity] || 30)) / 1000;

  // 2. Sex
  if (gender === "female") d *= 0.95;

  // 3. Climate (multiplicative — scales with body size)
  if (climate && CLIMATE_MULTIPLIER[climate] !== undefined) {
    d *= CLIMATE_MULTIPLIER[climate];
  }

  // 4. Age
  if (a < 16) d *= 1.05;
  else if (a >= 65) d *= 0.97;

  const baseTotal = d; // recommended fluid before crediting other sources

  // 5. Credit for other fluid sources (capped + floored so it stays safe)
  let credit = 0;
  if (Array.isArray(chips)) {
    credit = chips.reduce((sum, c) => sum + (CHIP_FLUID_CREDIT[c] || 0), 0);
  }
  credit = Math.min(credit, baseTotal * 0.3, 1.0);
  d = Math.max(baseTotal - credit, baseTotal * 0.7);

  // 6. Clamp to a sane daily window
  d = Math.max(MIN_WATER_L, Math.min(MAX_WATER_L, d));

  const rounded = Math.round(d * 10) / 10;
  const glasses = Math.round(rounded / 0.25); // 250 ml glasses

  return {
    totalNeeded: rounded,
    glasses,
    rawValue: d,
    baseTotal: Math.round(baseTotal * 10) / 10,
    creditApplied: Math.round(credit * 10) / 10,
  };
}

// ---------- Backend submission ----------
async function sendDataToGoogleSheet(payload) {
  try {
    await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Error sending to Google Sheet:", err);
  }
}

async function sendEmailToMasterSheet(email, source) {
  try {
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("source", source);
    await fetch(MASTER_SHEET_WEBHOOK_URL, { method: "POST", body: formData });
  } catch (err) {
    console.error("Error sending to Master Sheet:", err);
  }
}



// ---------- Hydration status ----------
// current = plain water (L/day) the person drinks; target = recommended (L/day)
function getHydrationStatus(current, target) {
  const ratio = target > 0 ? current / target : 0;

  // OVER-HYDRATION: clearly above need AND high in absolute terms.
  // Keyed to the person's actual need, not a flat 4 L — so a hot-climate
  // athlete who needs 4 L is fine, but a small sedentary person in a cold
  // climate (need ~1.5 L) drinking 4.5 L is correctly flagged.
  if (current >= 4 && (current >= target * 1.8 || current >= target + 2.5)) {
    return {
      level: "More Than You Need",
      statusClass: "over",
      icon: "🌊",
      message:
        "You're drinking noticeably more than your body needs for your size, activity and climate. For most healthy people the body simply passes the excess, but consistently very high intake gives no extra benefit — and your kidneys clear only about 0.8–1 L per hour, so it's best to spread water through the day rather than in large bursts. If you've deliberately increased intake on medical advice, keep following that.",
      diseases: [],
      ref: HYDRATION_REF,
    };
  }

  if (ratio >= 0.9) {
    return {
      level: "Optimal Hydration",
      statusClass: "optimal",
      icon: "✅",
      message:
        "You're well hydrated for your profile. The simplest day-to-day check is urine colour — pale straw means you're on track. Keep it up.",
      diseases: [],
      ref: HYDRATION_REF,
    };
  }

  if (ratio >= 0.7) {
    return {
      level: "On Track",
      statusClass: "good",
      icon: "👍",
      message:
        "You're close to your target. Remember that roughly 20% of your daily water also comes from food, so you're in a healthy range — adding a glass or two will tip you into optimal.",
      diseases: [],
      ref: HYDRATION_REF,
    };
  }

  if (ratio >= 0.5) {
    return {
      level: "Mildly Below Target",
      statusClass: "warn",
      icon: "⚠️",
      message: "You're drinking a bit less than your body needs. Even mild shortfalls are commonly linked to:",
      diseases: [
        "Headaches and afternoon fatigue",
        "Reduced focus and alertness",
        "Sluggish digestion and constipation",
      ],
      ref: HYDRATION_REF,
    };
  }

  return {
    level: "Well Below Target",
    statusClass: "warn",
    icon: "⚠️",
    message: "Your intake is well under what your body needs. Sustained low intake is associated with:",
    diseases: [
      "Persistent fatigue and brain fog",
      "Higher risk of kidney stones",
      "Urinary tract infections (UTIs)",
      "Reduced physical and cognitive performance",
    ],
    ref: HYDRATION_REF,
  };
}

// ==================== FRONTEND COMPONENT ====================

const ACTIVITY_OPTIONS = [
  { v: "sedentary", ic: "🧘", lb: "Sedentary" },
  { v: "light", ic: "🚶", lb: "Light" },
  { v: "moderate", ic: "🏃", lb: "Moderate" },
  { v: "high", ic: "🏋️", lb: "High" },
  { v: "extreme", ic: "🔥", lb: "Extreme" },
];

const CHIP_OPTIONS = [
  { value: "tea", label: "🍵 Tea" },
  { value: "coffee", label: "☕ Coffee" },
  { value: "juice", label: "🧃 Juice" },
  { value: "milk", label: "🥛 Milk" },
  { value: "soda", label: "🥤 Soda" },
  { value: "food", label: "🥗 Food, Fruits & Vegetables" },
];

export default function WaterIntakeCalculator() {
  const [gender, setGender] = useState("male");
  const [heightUnit, setHeightUnit] = useState("feet");
  const [activity, setActivity] = useState("sedentary");
  const [chips, setChips] = useState([]);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");   // cm-mode value
  const [heightFt, setHeightFt] = useState("");    // feet-mode: feet
  const [heightIn, setHeightIn] = useState("");    // feet-mode: inches
  const [climate, setClimate] = useState("");
  const [curr, setCurr] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [barWidth, setBarWidth] = useState(0);
  const resultRef = useRef(null);

  const toggleChip = (val) => {
    setChips((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const calculate = () => {
    const cm = toCentimetres(heightUnit, heightCm, heightFt, heightIn);

    const formData = {
      gender,
      age,
      weight,
      height: cm,
      activity,
      climate,
      email,
      chips,
      currIntake: curr,
      timestamp: new Date().toISOString(),
    };

    // Validate
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setResult({ error: true });
      return;
    }

    // Calculate
    const calcResult = calculateWaterNeeded(formData);
    if (!calcResult) {
      setResult({ error: true });
      return;
    }

    const { totalNeeded, glasses, baseTotal, creditApplied } = calcResult;
    const cu = parseFloat(curr) || 0;
    const pct = cu > 0 ? Math.round((cu / totalNeeded) * 100) : 0; // uncapped (for display we cap the bar fill only)
    const status = cu > 0 ? getHydrationStatus(cu, totalNeeded) : null;

    const finalResult = {
      r: totalNeeded,
      gl: glasses,
      cu,
      pct,
      baseTotal,
      creditApplied,
      status,
      error: false,
    };

    setResult(finalResult);
    setBarWidth(0);

    setTimeout(() => setBarWidth(Math.min(100, pct)), 80);
    setTimeout(() => {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 100);

    // Send data to backend (no-op / silently fails inside sandboxed previews)
    sendDataToGoogleSheet({ ...formData, result: finalResult });
    sendEmailToMasterSheet(email, "Water Intake Calculator");
    sendEmailToCheerio(email);
  };

  const GlassIcon = () => (
    <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4 L7 36 Q7.5 38 10 38 L22 38 Q24.5 38 25 36 L27 4 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinejoin="round" />
      <clipPath id="wic-gc">
        <path d="M5.5 4.5 L7.5 36 Q8 37.5 10 37.5 L22 37.5 Q24 37.5 24.5 36 L26.5 4.5 Z" />
      </clipPath>
      <g clipPath="url(#wic-gc)">
        <rect x="4" y="20" width="26" height="18" fill="rgba(255,255,255,0.55)" />
        <path d="M4 20 Q10 17.5 16 20 Q22 22.5 28 20" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" fill="none" />
      </g>
      <line x1="5" y1="4" x2="27" y2="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  const renderStatus = () => {
    if (!result || result.error) return null;
    const { r, status } = result;

    // Current intake not selected yet
    if (!status) {
      return (
        <div className="wic-res-status over">
          <div className="wic-res-status-top">
            <span className="wic-res-status-icon">💧</span>
            <span className="wic-res-status-title">Track Your Intake</span>
          </div>
          <div className="wic-res-status-body">
            Your body needs approximately <strong>{r.toFixed(1)} L/day</strong>. Pick your current daily
            water intake above to see how you compare and get personalised guidance.
          </div>
        </div>
      );
    }

    return (
      <div className={`wic-res-status ${status.statusClass}`}>
        <div className="wic-res-status-top">
          <span className="wic-res-status-icon">{status.icon}</span>
          <span className="wic-res-status-title">{status.level}</span>
        </div>
        <div className="wic-res-status-body">{status.message}</div>
        {status.diseases.length > 0 && (
          <ul className="wic-res-status-list">
            {status.diseases.map((d, idx) => (
              <li key={idx}>{d}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const barColor = () => {
    if (!result || result.error || !result.status) return "var(--blue)";
    switch (result.status.statusClass) {
      case "optimal":
      case "good":
        return "#2e7d32";
      case "over":
        return "#e0a008";
      default:
        return "#e53935";
    }
  };

  return (
    <>
      <style>{CSS}</style>

      {/* HERO */}
      <div className="wic-hero mt-[66px]">
        <div className="wic-hero-circle1" />
        <div className="wic-hero-circle2" />
        <div className="wic-hero-circle3" />

        <div className="wic-hero-inner">
          <div className="wic-hero-badge">Hydration Science</div>

          <div>
            <div className="wic-hero-pretitle">Personalised for you</div>
            <h1>
              Water Intake<br />
              <span>Calculator</span>
            </h1>
          </div>

          <div className="wic-hero-divider" />

          <p className="wic-hero-sub">
            Discover exactly how much water your body needs — based on your biology, activity &amp; environment.
          </p>

          <div className="wic-hero-stats">
            <div className="wic-hst">
              <div className="wic-hst-n">2.7L</div>
              <div className="wic-hst-l">Average Daily Requirement for Women</div>
            </div>
            <div className="wic-hst">
              <div className="wic-hst-n">3.7L</div>
              <div className="wic-hst-l">Average Daily Requirement for Men</div>
            </div>
            <div className="wic-hst">
              <div className="wic-hst-n">75%</div>
              <div className="wic-hst-l">Population Chronically Dehydrated</div>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="wic-wrap">
        <div className="wic-card">

          {/* GENDER */}
          <div className="wic-sh"><span className="wic-sh-lbl">Gender</span><div className="wic-sh-line" /></div>
          <div className="wic-g-row">
            <button
              type="button"
              className={`wic-gc wic-gc-male${gender === "male" ? " wic-on" : ""}`}
              onClick={() => setGender("male")}
            >
              <div className="wic-gc-circle">♂</div>
              <div className="wic-gc-info">
                <span className="wic-gc-title">Male</span>
                <span className="wic-gc-sub">Biological gender</span>
              </div>
            </button>
            <button
              type="button"
              className={`wic-gc wic-gc-female${gender === "female" ? " wic-on" : ""}`}
              onClick={() => setGender("female")}
            >
              <div className="wic-gc-circle">♀</div>
              <div className="wic-gc-info">
                <span className="wic-gc-title">Female</span>
                <span className="wic-gc-sub">Biological gender</span>
              </div>
            </button>
          </div>

          {/* BODY PARAMETERS */}
          <div className="wic-sh"><span className="wic-sh-lbl">Body Parameters</span><div className="wic-sh-line" /></div>
          <div className="wic-row3 wic-sec-gap">
            <div className={`wic-f${errors.age ? " wic-field-err" : ""}`}>
              <label>Age (years) <span className="wic-req">*</span></label>
              <input type="number" placeholder="e.g. 25" min="2" max="120" value={age} onChange={e => setAge(e.target.value)} />
              {errors.age && <span className="wic-err">Enter an age between 2 and 120</span>}
            </div>
            <div className={`wic-f${errors.weight ? " wic-field-err" : ""}`}>
              <label>Weight (kg) <span className="wic-req">*</span></label>
              <input type="number" placeholder="e.g. 70" min="20" max="300" value={weight} onChange={e => setWeight(e.target.value)} />
              {errors.weight && <span className="wic-err">Enter a weight between 20 and 300 kg</span>}
            </div>
            <div className={`wic-height-field${errors.height ? " wic-field-err" : ""}`}>
              <div className="wic-height-label-row">
                <label>Height <span className="wic-req">*</span></label>
                <div className="wic-height-unit-sw">
                  <button type="button" className={`wic-husw${heightUnit === "feet" ? " wic-on" : ""}`} onClick={() => setHeightUnit("feet")}>ft/in</button>
                  <button type="button" className={`wic-husw${heightUnit === "cm" ? " wic-on" : ""}`} onClick={() => setHeightUnit("cm")}>cm</button>
                </div>
              </div>

              {heightUnit === "cm" ? (
                <input
                  className="wic-height-input"
                  type="number"
                  placeholder="e.g. 170"
                  min="50"
                  max="250"
                  value={heightCm}
                  onChange={e => setHeightCm(e.target.value)}
                />
              ) : (
                <div className="wic-ftin">
                  <div className="wic-ftin-cell">
                    <input type="number" placeholder="5" min="1" max="8" value={heightFt} onChange={e => setHeightFt(e.target.value)} />
                    <span className="wic-ftin-unit">ft</span>
                  </div>
                  <div className="wic-ftin-cell">
                    <input type="number" placeholder="7" min="0" max="11" value={heightIn} onChange={e => setHeightIn(e.target.value)} />
                    <span className="wic-ftin-unit">in</span>
                  </div>
                </div>
              )}
              {errors.height && <span className="wic-err">Please enter a valid height</span>}
            </div>
          </div>

          {/* ACTIVITY */}
          <div className="wic-sh"><span className="wic-sh-lbl">Activity Level</span><div className="wic-sh-line" /></div>
          <div className="wic-act-row wic-sec-gap">
            {ACTIVITY_OPTIONS.map(opt => (
              <button
                type="button"
                key={opt.v}
                className={`wic-ab${activity === opt.v ? " wic-on" : ""}`}
                onClick={() => setActivity(opt.v)}
              >
                <div className="wic-ab-ic">{opt.ic}</div>
                <span className="wic-ab-lb">{opt.lb}</span>
              </button>
            ))}
          </div>

          {/* CHIPS */}
          <div className="wic-sh"><span className="wic-sh-lbl">Additional Water Sources</span><div className="wic-sh-line" /></div>
          <p style={{ fontSize: ".72rem", color: "var(--sub)", marginBottom: ".75rem", marginTop: "-.25rem" }}>
            Select all that apply — these count toward your daily fluids
          </p>
          <div className="wic-chips wic-sec-gap">
            {CHIP_OPTIONS.map(opt => (
              <div
                key={opt.value}
                className={`wic-chip${chips.includes(opt.value) ? " wic-on" : ""}`}
                onClick={() => toggleChip(opt.value)}
              >
                {chips.includes(opt.value) && <span className="wic-chip-tick">✓ </span>}
                {opt.label}
              </div>
            ))}
          </div>

          {/* CLIMATE & CURRENT */}
          <div className="wic-sh"><span className="wic-sh-lbl">Environment &amp; Current Habits</span><div className="wic-sh-line" /></div>
          <div className="wic-row2 wic-sec-gap">
            <div className="wic-f">
              <label>Climate</label>
              <select value={climate} onChange={e => setClimate(e.target.value)}>
                <option value="">Choose your climate</option>
                <option value="cold">❄️ Cold</option>
                <option value="temperate">🌤️ Temperate</option>
                <option value="hot">☀️ Hot</option>
                <option value="humid">💨 Hot &amp; Humid</option>
              </select>
            </div>
            <div className="wic-f">
              <label>Current Water Intake (liters / day)</label>
              <select value={curr} onChange={e => setCurr(e.target.value)}>
                <option value="">Your daily estimate</option>
                <option value="0.5">Less than 1 L</option>
                <option value="1.5">1 – 2 L</option>
                <option value="2.5">2 – 3 L</option>
                <option value="3.5">3 – 4 L</option>
                <option value="4.5">More than 4 L</option>
              </select>
            </div>
          </div>

          {/* EMAIL */}
          <div className="wic-sh"><span className="wic-sh-lbl">Get Your Free Hydration Plan</span><div className="wic-sh-line" /></div>
          <div className="wic-sec-gap">
            <div className={`wic-f${errors.email ? " wic-field-err" : ""}`}>
              <label>Email Address <span className="wic-req">*</span></label>
              <input type="email" placeholder="yourname@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              <p className="wic-email-hint">* Enter your email to get free 7-day hydration tips directly to your inbox!</p>
              {errors.email && <span className="wic-err">Please enter a valid email address</span>}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="wic-calc-btn-wrap">
            <button type="button" className="wic-btn-calc" onClick={calculate}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2C6 8 4 12 4 15a8 8 0 0016 0c0-3-2-7-8-13z" />
              </svg>
              Calculate My Water Intake
            </button>
            <a href="https://www.indiegogo.com/en/projects/frostactive-38748367/stay-hydrated-focused-balanced-meet-frost-aura" className="wic-btn-calc-sub">
              Join Early Access
            </a>
          </div>

          {/* RESULT */}
          <div className="wic-result" id="wic-rc" ref={resultRef}>
            {(!result || result.error) ? (
              <div className="wic-res-empty">
                <svg className="wic-res-drop" width="32" height="38" viewBox="0 0 32 38" fill="none">
                  <path d="M16 2C16 2,2 14,2 22C2 31,8 36,16 36C24 36,30 31,30 22C30 14,16 2,16 2Z" fill="#29aae1" />
                </svg>
                {result?.error
                  ? "Please fill in the required fields (marked *) correctly."
                  : "Fill in the fields above and hit Calculate"}
              </div>
            ) : (
              <div className="wic-res-live">
                <div className="wic-res-hero">
                  <div className="wic-res-heading">Your Results</div>
                  <div className="wic-res-subheading">Daily Water Requirement</div>
                  <div className="wic-res-num">{result.r.toFixed(1)}L</div>
                  <div className="wic-res-unit">litres per day</div>
                  <div className="wic-res-glass-row">
                    <span className="wic-res-glass-ic"><GlassIcon /></span>
                    <div>
                      <div className="wic-res-glass-n">{result.gl}</div>
                      <div className="wic-res-glass-l">Standard Glasses (250 ml)</div>
                    </div>
                  </div>
                </div>

                <div className="wic-res-bars">
                  <div className="wic-rbar">
                    <span className="wic-rbar-l">Your Daily Goal</span>
                    <div className="wic-rbar-t"><div className="wic-rbar-f" style={{ width: "100%" }} /></div>
                    <span className="wic-rbar-v">{result.r.toFixed(1)} L</span>
                  </div>
                  <div className="wic-rbar">
                    <span className="wic-rbar-l">Current Intake</span>
                    <div className="wic-rbar-t">
                      <div className="wic-rbar-f" style={{ width: `${barWidth}%`, background: barColor() }} />
                    </div>
                    <span className="wic-rbar-v" style={{ color: result.cu > 0 ? barColor() : "var(--text)" }}>
                      {result.cu > 0 ? `${result.cu.toFixed(1)} L` : "Not set"}
                    </span>
                  </div>
                  <div className="wic-rbar">
                    <span className="wic-rbar-l">Completion Rate</span>
                    <div className="wic-rbar-t"><div className="wic-rbar-f" style={{ width: `${Math.min(100, result.pct)}%` }} /></div>
                    <span className="wic-rbar-v">{result.pct}%</span>
                  </div>
                </div>

                {result.creditApplied > 0 && (
                  <div className="wic-res-note">
                    Your goal includes a small allowance — about <strong>{result.creditApplied.toFixed(1)} L</strong> of
                    your fluids come from the other sources you selected (before that, your raw requirement was
                    ~{result.baseTotal.toFixed(1)} L).
                  </div>
                )}

                {renderStatus()}

                <div className="wic-res-disclaimer">
                 <b>Note : </b>
                  This estimate is for general guidance for healthy individuals and is not medical advice. Needs rise
                  with intense exercise, heat, illness, pregnancy or breastfeeding. If you have a kidney, heart or
                  hormonal condition, follow your doctor's fluid plan.
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}