import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&family=Barlow+Condensed:wght@500;600;700;800&display=swap');`;

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --green-dark: #004d1a;
  --green: #006622;
  --green-mid: #1a7a33;
  --green-light: #e8f4eb;
  --green-pale: #f2f9f4;
  --red: #b91c1c;
  --red-light: #fef2f2;
  --gold: #b8860b;
  --gold-light: #fdf8e7;
  --black: #0f0f0f;
  --ink: #1a1a1a;
  --text: #2d3333;
  --sub: #4a5568;
  --muted: #718096;
  --border: #d4dbd6;
  --border-light: #e8eee9;
  --bg: #f7f8f6;
  --white: #ffffff;
  --rule: #c8d5ca;
}
html { scroll-behavior: smooth; }
body { background: var(--white); color: var(--text); font-family: 'Barlow', sans-serif; overflow-x: hidden; }
::selection { background: var(--green); color: #fff; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--green); border-radius: 2px; }

/* UTILITY ALERT BAR */
.alert-bar { background: var(--green-dark); color: rgba(255,255,255,0.85); padding: 9px 60px; display: flex; justify-content: space-between; align-items: center; font-family: 'Barlow', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.04em; }
.alert-left { display: flex; align-items: center; gap: 20px; }
.alert-divider { width: 1px; height: 12px; background: rgba(255,255,255,0.25); }
.alert-badge { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); padding: 3px 10px; font-size: 10px; letter-spacing: 0.08em; font-weight: 600; }
.alert-right { display: flex; align-items: center; gap: 8px; font-size: 10px; letter-spacing: 0.06em; }
.live-dot { width: 6px; height: 6px; background: #4ade80; border-radius: 50%; animation: livePulse 2s infinite; flex-shrink: 0; }
@keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

/* HEADER / NAV */
.site-header { background: var(--white); border-bottom: 3px solid var(--green); box-shadow: 0 2px 12px rgba(0,0,0,0.06); position: sticky; top: 0; z-index: 100; }
.header-inner { padding: 0 60px; display: flex; justify-content: space-between; align-items: center; height: 78px; }
.logo-area { display: flex; align-items: center; gap: 18px; cursor: pointer; }
.logo-seal { width: 54px; height: 54px; background: var(--green); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid var(--green-dark); flex-shrink: 0; }
.logo-seal svg { width: 30px; height: 30px; fill: #fff; }
.logo-text-main { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 800; color: var(--green-dark); letter-spacing: 0.06em; line-height: 1; text-transform: uppercase; }
.logo-text-sub { font-family: 'Barlow', sans-serif; font-size: 10px; font-weight: 500; color: var(--sub); letter-spacing: 0.08em; margin-top: 3px; text-transform: uppercase; }
.nav-menu { display: flex; align-items: center; gap: 0; }
.nav-item { font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--sub); cursor: pointer; padding: 28px 16px; border-bottom: 3px solid transparent; margin-bottom: -3px; transition: all 0.2s; }
.nav-item:hover { color: var(--green-dark); border-bottom-color: var(--green); }
.nav-portal-btn { margin-left: 16px; background: var(--green); color: #fff; border: none; padding: 10px 22px; font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
.nav-portal-btn:hover { background: var(--green-dark); }

/* HERO */
.hero { position: relative; overflow: hidden; background: var(--green-dark); }
.hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.18; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(105deg, rgba(0,60,18,0.96) 40%, rgba(0,80,25,0.75) 100%); }
.hero-body { position: relative; z-index: 2; padding: 100px 60px 90px; display: grid; grid-template-columns: 1fr 380px; gap: 80px; align-items: center; max-width: 1300px; margin: 0 auto; }
.hero-eyebrow { display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 6px 14px; margin-bottom: 24px; }
.hero-eyebrow-text { font-family: 'Barlow', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.8); }
.hero-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(52px, 7vw, 88px); font-weight: 800; line-height: 0.92; text-transform: uppercase; letter-spacing: 0.01em; color: #fff; margin-bottom: 28px; }
.hero-title em { font-style: normal; color: #6ee7a0; }
.hero-desc { font-family: 'Libre Baskerville', Georgia, serif; font-size: 17px; font-weight: 400; font-style: italic; color: rgba(255,255,255,0.65); line-height: 1.75; max-width: 520px; margin-bottom: 36px; border-left: 3px solid rgba(255,255,255,0.25); padding-left: 18px; }
.hero-motto { font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.5); letter-spacing: 0.04em; margin-bottom: 40px; }
.hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-white { background: #fff; color: var(--green-dark); border: 2px solid #fff; padding: 14px 32px; font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
.btn-white:hover { background: transparent; color: #fff; }
.btn-outline-white { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.4); padding: 14px 32px; font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
.btn-outline-white:hover { border-color: #fff; }
.hero-card { background: rgba(255,255,255,0.07); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.15); padding: 36px; }
.hero-card-label { font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: rgba(255,255,255,0.5); margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
.hero-card-label::before { content: ''; width: 20px; height: 1px; background: rgba(255,255,255,0.3); flex-shrink: 0; }
.hero-card-stat { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); }
.hero-card-stat:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.hero-stat-num { font-family: 'Barlow Condensed', sans-serif; font-size: 44px; font-weight: 800; color: #fff; line-height: 1; }
.hero-stat-label { font-family: 'Barlow', sans-serif; font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; }

/* BREADCRUMB / ACCREDITATION STRIP */
.accreditation { background: var(--bg); border-bottom: 1px solid var(--border); padding: 14px 60px; display: flex; align-items: center; justify-content: space-between; }
.accreditation-list { display: flex; align-items: center; gap: 0; }
.accred-item { display: flex; align-items: center; gap: 10px; padding: 0 24px 0 0; margin-right: 24px; border-right: 1px solid var(--rule); font-family: 'Barlow', sans-serif; font-size: 11px; font-weight: 600; color: var(--sub); text-transform: uppercase; letter-spacing: 0.06em; }
.accred-item:last-child { border-right: none; }
.accred-dot { width: 8px; height: 8px; background: var(--green); border-radius: 50%; flex-shrink: 0; }
.accred-right { font-family: 'Barlow', sans-serif; font-size: 11px; font-weight: 500; color: var(--muted); }

/* SECTION ANATOMY */
.section { padding: 90px 60px; }
.section-alt { background: var(--bg); }
.section-green { background: var(--green-dark); }
.section-inner { max-width: 1300px; margin: 0 auto; }
.section-eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.section-eyebrow-line { width: 28px; height: 3px; background: var(--green); flex-shrink: 0; }
.section-eyebrow-text { font-family: 'Barlow', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: var(--green); }
.section-title { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(36px, 4vw, 52px); font-weight: 800; text-transform: uppercase; letter-spacing: 0.02em; color: var(--green-dark); line-height: 0.95; margin-bottom: 16px; }
.section-title span { color: var(--green-mid); }
.section-subtitle { font-family: 'Libre Baskerville', serif; font-size: 15px; font-style: italic; color: var(--sub); max-width: 520px; line-height: 1.7; }
.section-header-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 52px; }

/* ABOUT SPLIT */
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; min-height: 560px; }
.about-content { padding: 80px 60px; background: var(--white); display: flex; flex-direction: column; justify-content: center; }
.about-body { font-family: 'Barlow', sans-serif; font-size: 16px; line-height: 1.85; color: var(--sub); margin: 24px 0 36px; }
.vm-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.vm-pill { background: var(--green-pale); border: 1px solid var(--border-light); border-left: 4px solid var(--green); padding: 18px 20px; }
.vm-pill.mission { border-left-color: var(--red); background: var(--red-light); }
.vm-pill-tag { font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: var(--green); margin-bottom: 6px; }
.vm-pill.mission .vm-pill-tag { color: var(--red); }
.vm-pill-text { font-family: 'Barlow', sans-serif; font-size: 13px; color: var(--text); line-height: 1.6; font-weight: 500; }
.about-image { position: relative; overflow: hidden; }
.about-image img { width: 100%; height: 100%; object-fit: cover; }
.about-image-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,60,18,0.7) 0%, transparent 50%); }
.about-image-tag { position: absolute; bottom: 0; left: 0; right: 0; padding: 32px 36px; }
.about-image-tag-num { font-family: 'Barlow Condensed', sans-serif; font-size: 52px; font-weight: 800; color: #fff; line-height: 1; }
.about-image-tag-label { font-family: 'Barlow', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.7); margin-top: 4px; }

/* STATS ROW */
.stats-row { background: var(--green); }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.stat-box { padding: 44px 48px; border-right: 1px solid rgba(255,255,255,0.12); }
.stat-box:last-child { border-right: none; }
.stat-num { font-family: 'Barlow Condensed', sans-serif; font-size: 56px; font-weight: 800; color: #fff; line-height: 1; }
.stat-label { font-family: 'Barlow', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.65); margin-top: 6px; font-weight: 600; }
.stat-sub { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 4px; font-style: italic; }

/* OPERATIONS */
.ops-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border-light); border: 1px solid var(--border-light); }
.ops-card { background: var(--white); position: relative; overflow: hidden; height: 320px; cursor: pointer; }
.ops-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; filter: saturate(0.7); }
.ops-card:hover img { transform: scale(1.06); filter: saturate(1); }
.ops-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,40,12,0.88) 0%, rgba(0,40,12,0.15) 55%, transparent 100%); transition: opacity 0.3s; }
.ops-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 28px 28px 24px; }
.ops-tag { font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.25em; color: #6ee7a0; margin-bottom: 8px; }
.ops-title { font-family: 'Barlow Condensed', sans-serif; font-size: 24px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #fff; line-height: 1.1; }
.ops-sub { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 6px; max-height: 0; overflow: hidden; transition: max-height 0.3s; }
.ops-card:hover .ops-sub { max-height: 40px; }
.ops-card.tall { height: 100%; grid-row: span 2; }
.ops-card.tall .ops-title { font-size: 30px; }

/* PARTNERS */
.partners-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 52px; }
.partner-card { border: 1px solid var(--border); padding: 40px 36px; background: var(--white); transition: all 0.25s; border-top: 4px solid transparent; }
.partner-card:hover { border-top-color: var(--green); box-shadow: 0 8px 30px rgba(0,0,0,0.08); transform: translateY(-2px); }
.partner-flag { font-size: 44px; display: block; margin-bottom: 18px; }
.partner-country { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--green-dark); margin-bottom: 6px; }
.partner-badge { display: inline-block; background: var(--green-pale); border: 1px solid var(--border-light); color: var(--green); font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; padding: 4px 10px; margin-bottom: 14px; }
.partner-detail { font-size: 14px; line-height: 1.75; color: var(--sub); }

/* MEMBERSHIP */
.membership-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); margin-top: 52px; }
.membership-card { background: var(--white); padding: 44px 36px; position: relative; transition: background 0.2s; }
.membership-card:hover { background: var(--green-pale); }
.membership-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--green); transform: scaleX(0); transform-origin: left; transition: transform 0.35s; }
.membership-card:hover::before { transform: scaleX(1); }
.membership-num { font-family: 'Barlow Condensed', sans-serif; font-size: 64px; font-weight: 800; color: var(--border); line-height: 1; position: absolute; top: 16px; right: 20px; transition: color 0.2s; }
.membership-card:hover .membership-num { color: var(--green-light); }
.membership-icon { width: 48px; height: 48px; background: var(--green-pale); border: 2px solid var(--green-light); display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 20px; }
.membership-title { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--green-dark); margin-bottom: 10px; }
.membership-desc { font-size: 13px; line-height: 1.75; color: var(--sub); }

/* LEADERSHIP */
.leadership-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 52px; }
.leader-card { border: 1px solid var(--border); padding: 36px 28px; background: var(--white); transition: all 0.25s; }
.leader-card:hover { border-color: var(--green); box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
.leader-number { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; color: var(--green); letter-spacing: 0.15em; margin-bottom: 20px; }
.leader-role { font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--green-dark); margin-bottom: 6px; }
.leader-divider { width: 28px; height: 3px; background: var(--gold); margin: 14px 0; transition: width 0.4s; }
.leader-card:hover .leader-divider { width: 100%; }
.leader-desc { font-size: 12px; color: var(--sub); line-height: 1.65; }

/* VAULT */
.vault-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 52px; }
.vault-card { border: 1px solid var(--border); padding: 40px; background: var(--white); transition: all 0.25s; }
.vault-card:hover { border-color: var(--green); box-shadow: 0 6px 24px rgba(0,0,0,0.07); }
.vault-type-tag { display: flex; align-items: center; gap: 10px; margin-bottom: 22px; }
.vault-type-icon { width: 40px; height: 40px; background: var(--green-pale); border: 1px solid var(--green-light); display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
.vault-type-label { font-family: 'Barlow', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: var(--green); }
.vault-card-title { font-family: 'Barlow Condensed', sans-serif; font-size: 24px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--green-dark); margin-bottom: 8px; }
.vault-meta { font-size: 13px; color: var(--sub); line-height: 1.6; margin-bottom: 28px; white-space: pre-line; }
.vault-dl-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--green); color: #fff; border: none; padding: 12px 22px; font-family: 'Barlow', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
.vault-dl-btn:hover { background: var(--green-dark); }
.vault-dl-btn svg { width: 13px; height: 13px; fill: currentColor; flex-shrink: 0; }

/* CONTACT */
.contact-wrap { display: grid; grid-template-columns: 1fr 1.3fr; }
.contact-left { background: var(--green-dark); padding: 80px 60px; display: flex; flex-direction: column; justify-content: center; }
.contact-left .section-eyebrow-text { color: rgba(255,255,255,0.6); }
.contact-left .section-eyebrow-line { background: rgba(255,255,255,0.4); }
.contact-left .section-title { color: #fff; }
.contact-left .section-title span { color: #6ee7a0; }
.contact-details { margin-top: 40px; display: flex; flex-direction: column; gap: 30px; }
.contact-block-label { font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.45); margin-bottom: 8px; }
.contact-block-val { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 600; color: #fff; letter-spacing: 0.02em; }
.contact-block-sub { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 4px; }
.contact-phones { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px; }
.phone-item .ph-num { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 600; color: #fff; }
.phone-item .ph-tag { font-family: 'Barlow', sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.4); margin-top: 2px; }
.contact-right { background: var(--bg); padding: 80px 60px; }
.form-title { font-family: 'Barlow Condensed', sans-serif; font-size: 34px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--green-dark); margin-bottom: 36px; }
.form-title span { color: var(--green-mid); }
.form-group { margin-bottom: 14px; }
.form-label { display: block; font-family: 'Barlow', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em; color: var(--sub); margin-bottom: 7px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-input, .form-select, .form-textarea { width: 100%; background: var(--white); border: 1.5px solid var(--border); color: var(--text); padding: 13px 16px; font-family: 'Barlow', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; -webkit-appearance: none; }
.form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--green); }
.form-input::placeholder, .form-textarea::placeholder { color: var(--muted); }
.form-textarea { resize: vertical; min-height: 96px; }
.form-select option { background: var(--white); }
.urgent-row { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: var(--white); border: 1.5px dashed var(--border); cursor: pointer; transition: all 0.2s; margin-bottom: 14px; }
.urgent-row:hover { border-color: var(--red); }
.urgent-row.on { border-color: var(--red); background: var(--red-light); }
.toggle-pill { width: 42px; height: 24px; border-radius: 12px; background: var(--border); position: relative; transition: background 0.25s; flex-shrink: 0; }
.toggle-pill.on { background: var(--red); }
.toggle-knob { position: absolute; width: 18px; height: 18px; background: #fff; border-radius: 50%; top: 3px; left: 3px; transition: left 0.25s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
.toggle-pill.on .toggle-knob { left: 21px; }
.urgent-label { font-family: 'Barlow', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--sub); }
.urgent-row.on .urgent-label { color: var(--red); }
.submit-btn { width: 100%; padding: 17px; background: var(--green); color: #fff; border: none; font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
.submit-btn:hover { background: var(--green-dark); }
.submit-btn.urgent { background: var(--red); }
.submit-btn.sent { background: #2d6a4f; cursor: default; }

/* GALLERY MODAL */
.gallery-overlay { position: fixed; inset: 0; z-index: 200; background: #fff; overflow-y: auto; padding: 60px; animation: fadeIn 0.25s; }
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
.gallery-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 52px; padding-bottom: 28px; border-bottom: 3px solid var(--green); }
.gallery-close { border: 2px solid var(--border); background: var(--white); color: var(--sub); width: 48px; height: 48px; font-size: 18px; cursor: pointer; font-family: 'Barlow', sans-serif; font-weight: 700; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
.gallery-close:hover { background: var(--green); color: #fff; border-color: var(--green); }
.gallery-grid { columns: 4; gap: 16px; }
.gallery-card { break-inside: avoid; margin-bottom: 16px; border: 1px solid var(--border); overflow: hidden; position: relative; cursor: pointer; }
.gallery-card img { width: 100%; display: block; transition: transform 0.5s; }
.gallery-card:hover img { transform: scale(1.04); }
.gallery-caption { padding: 12px 14px; background: var(--bg); border-top: 1px solid var(--border-light); }
.gallery-caption-year { font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: var(--green); }
.gallery-caption-text { font-size: 12px; color: var(--sub); margin-top: 2px; }

/* ACCESS MODAL */
.modal-backdrop { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.65); display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-panel { background: var(--white); border-top: 5px solid var(--red); padding: 52px 48px; max-width: 440px; width: 100%; text-align: center; box-shadow: 0 24px 80px rgba(0,0,0,0.25); }
.modal-icon { font-size: 40px; margin-bottom: 18px; }
.modal-title { font-family: 'Barlow Condensed', sans-serif; font-size: 28px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--green-dark); margin-bottom: 10px; }
.modal-text { font-size: 14px; color: var(--sub); line-height: 1.7; margin-bottom: 32px; font-family: 'Libre Baskerville', serif; font-style: italic; }
.modal-close-btn { width: 100%; padding: 15px; background: var(--red); color: #fff; border: none; font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
.modal-close-btn:hover { background: #991b1b; }

/* FOOTER */
.footer { background: var(--green-dark); color: rgba(255,255,255,0.85); }
.footer-main { padding: 72px 60px 56px; display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 60px; border-bottom: 1px solid rgba(255,255,255,0.1); max-width: 1300px; margin: 0 auto; }
.footer-brand-name { font-family: 'Barlow Condensed', sans-serif; font-size: 30px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #fff; margin-bottom: 6px; }
.footer-brand-full { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.45); font-weight: 500; margin-bottom: 18px; }
.footer-motto { font-family: 'Libre Baskerville', serif; font-style: italic; font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.7; border-left: 2px solid rgba(255,255,255,0.2); padding-left: 14px; margin-bottom: 22px; }
.footer-reg { display: inline-block; border: 1px solid rgba(255,255,255,0.15); padding: 6px 12px; font-family: 'Barlow', sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.4); }
.footer-col-head { font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3em; color: #6ee7a0; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); }
.footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.footer-links li { font-size: 12px; color: rgba(255,255,255,0.5); cursor: pointer; transition: color 0.2s; font-family: 'Barlow', sans-serif; font-weight: 500; }
.footer-links li:hover { color: #fff; }
.footer-contact-block { margin-bottom: 14px; }
.fc-label { font-family: 'Barlow', sans-serif; font-size: 8px; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.3); margin-bottom: 3px; }
.fc-val { font-size: 12px; color: rgba(255,255,255,0.6); font-family: 'Barlow', sans-serif; }
.footer-bottom { padding: 20px 60px; display: flex; justify-content: space-between; align-items: center; max-width: 1300px; margin: 0 auto; }
.footer-copy { font-family: 'Barlow', sans-serif; font-size: 10px; color: rgba(255,255,255,0.3); letter-spacing: 0.06em; }
.footer-verified { display: flex; align-items: center; gap: 8px; font-family: 'Barlow', sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #6ee7a0; }

/* LINK BUTTON */
.link-btn { background: transparent; border: 2px solid var(--green); color: var(--green); padding: 12px 24px; font-family: 'Barlow', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
.link-btn:hover { background: var(--green); color: #fff; }

@media (max-width: 900px) {
  .about-grid, .contact-wrap { grid-template-columns: 1fr; }
  .stats-grid, .membership-grid, .leadership-grid, .vault-grid, .partners-grid { grid-template-columns: 1fr 1fr; }
  .hero-body { grid-template-columns: 1fr; }
  .hero-card { display: none; }
  .ops-grid { grid-template-columns: 1fr 1fr; }
  .ops-card.tall { grid-row: span 1; height: 280px; }
  .footer-main { grid-template-columns: 1fr 1fr; }
  .header-inner, .section, .contact-left, .contact-right, .alert-bar, .accreditation { padding-left: 24px; padding-right: 24px; }
  .footer-main, .footer-bottom { padding-left: 24px; padding-right: 24px; }
  .gallery-grid { columns: 2; }
}
`;

const SealIcon = () => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm0 4c5.52 0 10 4.48 10 10s-4.48 10-10 10S6 21.52 6 16 10.48 6 16 6z"/>
    <path d="M16 9c-1.1 0-2 .9-2 2 0 .74.4 1.38 1 1.72V20h2v-7.28c.6-.34 1-.98 1-1.72 0-1.1-.9-2-2-2z"/>
    <path d="M10 14h2v6h-2zm10 0h2v6h-2z"/>
  </svg>
);

export default function App() {
  const [view, setView] = useState("portal");
  const [isUrgent, setIsUrgent] = useState(false);
  const [showPortalError, setShowPortalError] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [counters, setCounters] = useState({ a: 0, b: 0, c: 0, d: 0 });
  const statsRef = useRef(null);
  const animated = useRef(false);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !animated.current) {
        animated.current = true;
        [2002, 670, 12, 52].forEach((end, i) => {
          const key = ["a","b","c","d"][i];
          let val = 0;
          const step = Math.ceil(end / 55);
          const iv = setInterval(() => {
            val = Math.min(val + step, end);
            setCounters(p => ({ ...p, [key]: val }));
            if (val >= end) clearInterval(iv);
          }, 20);
        });
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleTransmit = () => {
    setIsTransmitting(true);
    setTimeout(() => { setIsTransmitting(false); setIsSent(true); setTimeout(() => setIsSent(false), 5000); }, 2000);
  };

  const operations = [
    { tag: "Training & Capacity Building", title: "Professional Standards Training", sub: "670+ trainees · 12 counties · 193 graduates from Kiambu Training Centre · 52 courses · 2,200+ hours", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600", tall: true },
    { tag: "Equipment & Fleet", title: "Fire Safety Equipment", sub: "Fire engines, extinguishers & personal protective gear furnished to fire service units", img: "https://images.unsplash.com/photo-1582268611958-ebaf16150267?q=80&w=800" },
    { tag: "Public Policy", title: "Influencing Policy & Legislation", sub: "Working with stakeholders in Kenya, Africa and internationally to influence public policy", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800" },
    { tag: "Legislative Advocacy", title: "Fire & Rescue Services Bill 2023", sub: "KENFIBA advocates for enactment of the proposed Fire and Rescue services professionals bill", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800" },
    { tag: "Advanced Rescue", title: "Marine, High Altitude & Medical Rescue", sub: "Advanced pilot activities — high altitude, marine and medical rescue training modules", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800" },
  ];

  const galleryItems = [
    { seed: 71, year: 2014, label: "Polish Aid Programme Launch" },
    { seed: 72, year: 2017, label: "Kilifi County Pilot Training" },
    { seed: 73, year: 2017, label: "Meru County On-Site Training" },
    { seed: 74, year: 2018, label: "Kiambu Advanced Module" },
    { seed: 75, year: 2019, label: "Marine Rescue Certification" },
    { seed: 76, year: 2020, label: "High Altitude Rescue Training" },
    { seed: 77, year: 2021, label: "Medical Rescue Programme" },
    { seed: 78, year: 2021, label: "193 Graduates — Kiambu Training Centre" },
    { seed: 79, year: 2022, label: "Slovak Republic Embassy Visit" },
    { seed: 80, year: 2022, label: "SCDF Singapore Equipment Handover" },
    { seed: 81, year: 2022, label: "Study Visit — Poland" },
    { seed: 82, year: 2023, label: "Fire & Rescue Bill Stakeholder Forum" },
  ];

  return (
    <>
      <style>{FONTS}{CSS}</style>

      {/* ALERT BAR */}
      <div className="alert-bar">
        <div className="alert-left">
          <span>Societies Act Cap 108</span>
          <div className="alert-divider"></div>
          <span className="alert-badge">Charitable No. 21578</span>
          <div className="alert-divider"></div>
          <span>Sheria House Registry · Est. 15 July 2002</span>
        </div>
        <div className="alert-right">
          <div className="live-dot"></div>
          Official National Platform · www.kenfiba.org
        </div>
      </div>

      {/* HEADER */}
      <header className="site-header">
        <div className="header-inner">
          <div className="logo-area" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="logo-seal"><SealIcon /></div>
            <div>
              <div className="logo-text-main">KENFIBA</div>
              <div className="logo-text-sub">Kenya National Fire Brigades Association</div>
            </div>
          </div>
          <nav className="nav-menu">
            {[["about","About"],["operations","Operations"],["membership","Membership"],["leadership","Leadership"],["vault","Statutes"],["contact","Contact"]].map(([id, label]) => (
              <span key={id} className="nav-item" onClick={() => scrollTo(id)}>{label}</span>
            ))}
            <button className="nav-portal-btn" onClick={() => setShowPortalError(true)}>Portal Login</button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2400" className="hero-img" alt="" />
        <div className="hero-overlay"></div>
        <div className="hero-body">
          <div>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-text">Official Stakeholder Platform · Republic of Kenya</span>
            </div>
            <h1 className="hero-title">Kenya National<br />Fire Brigades<br /><em>Association</em></h1>
            <p className="hero-desc">
              The national peak body in Kenya supporting and representing the fire protection and safety sector — coordinating professional fire and disaster response across the Republic of Kenya.
            </p>
            <p className="hero-motto">KENFIBA Motto: "Support the Firemen — the next life they save might be yours"</p>
            <div className="hero-ctas">
              <button className="btn-white" onClick={() => scrollTo("vault")}>Download Charters</button>
              <button className="btn-outline-white" onClick={() => scrollTo("contact")}>Submit Inquiry</button>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-label">Key Statistics</div>
            {[
              { num: "2002", label: "Year Established" },
              { num: "670+", label: "Officers Trained" },
              { num: "12", label: "Counties Reached" },
              { num: "52", label: "Training Courses" },
            ].map((s, i) => (
              <div className="hero-card-stat" key={i}>
                <div className="hero-stat-num">{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCREDITATION STRIP */}
      <div className="accreditation">
        <div className="accreditation-list">
          {["Registered: Societies Act · No. 21578","Established: 15 July 2002","HQ: Tom Mboya Street, Nairobi","Website: www.kenfiba.org"].map(t => (
            <div className="accred-item" key={t}><div className="accred-dot"></div>{t}</div>
          ))}
        </div>
        <div className="accred-right">Republic of Kenya · Fire & Disaster Mitigation Authority</div>
      </div>

      {/* STATS BAR */}
      <div className="stats-row" ref={statsRef}>
        <div className="stats-grid" style={{ maxWidth: 1300, margin: "0 auto" }}>
          {[
            { num: counters.a, suf: "", label: "Year Founded", sub: "Established at Sheria House" },
            { num: counters.b, suf: "+", label: "Officers Trained", sub: "Across 12 Kenya counties" },
            { num: counters.c, suf: "", label: "Counties Reached", sub: "Including Kilifi, Meru, Kiambu" },
            { num: counters.d, suf: "", label: "Training Courses", sub: "Over 2,200 hours delivered" },
          ].map((s, i) => (
            <div className="stat-box" key={i}>
              <div className="stat-num">{s.num}{s.suf}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ padding: 0 }}>
        <div className="about-grid">
          <div className="about-content">
            <div className="section-eyebrow"><div className="section-eyebrow-line"></div><span className="section-eyebrow-text">Who We Are</span></div>
            <h2 className="section-title">About <span>KENFIBA</span></h2>
            <p className="about-body">
              The Kenya National Fire Brigades Association (KENFIBA) is the national peak body in Kenya supporting and representing the fire protection and safety sector. The Association was established in the year 2002 by fire fighters countrywide and was registered at Sheria House under section "10" of the Societies Act of the laws of the Republic of Kenya — Charitable No. 21578. Its registered office is situated at Tom Mboya Street, Fire and Ambulance Headquarters, Nairobi-Kenya.
            </p>
            <div className="vm-row">
              <div className="vm-pill">
                <div className="vm-pill-tag">Vision</div>
                <div className="vm-pill-text">To be the body of reference representing business and professional interest of all Fire and Rescue Services in Kenya.</div>
              </div>
              <div className="vm-pill mission">
                <div className="vm-pill-tag">Mission</div>
                <div className="vm-pill-text">To promote and improve safety and economic growth through good fire and rescue services delivery.</div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200" alt="KENFIBA Operations" />
            <div className="about-image-overlay"></div>
            <div className="about-image-tag">
              <div className="about-image-tag-num">USD 1M+</div>
              <div className="about-image-tag-label">Total Training Programme Value</div>
            </div>
          </div>
        </div>
      </section>

      {/* ASSOCIATION OBJECTIVES — from brochure */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-eyebrow"><div className="section-eyebrow-line"></div><span className="section-eyebrow-text">What We Stand For</span></div>
          <h2 className="section-title">Association <span>Objectives</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 52 }}>
            {[
              { num: "01", title: "Policy Development", desc: "Develop policies on issues which affect our members and through their employing authorities." },
              { num: "02", title: "Public Policy Influence", desc: "Working in partnership with other stakeholders in order to influence public policy issues in Kenya, Africa and International communities continuously." },
              { num: "03", title: "Professional Standards", desc: "Improve the professional standards of our members and help attain high level of expertise and effectiveness by developing the knowledge, skills and understanding to ensure competence and provide a range of services for our members." },
              { num: "04", title: "Training Provision", desc: "Provision of training and enquiry for fire brigade units in Kenya. With each year the percentage of trained recruits is rising — fire service units are also furnished with firefighting and personal equipment." },
              { num: "05", title: "Crisis Management", desc: "Based on experience gained through study visits, crisis management plans were developed for 5 Kenyan counties covering an area of more than 22,000 sq km and 6 million inhabitants." },
              { num: "06", title: "Statutory Advocacy", desc: "KENFIBA advocates for the proposed Fire and Rescue services professionals Bill 2023. Once enacted, it will lead the Association's aim to improve fire and rescue services delivery in Kenya." },
            ].map((o, i) => (
              <div key={i} style={{ background: "var(--white)", border: "1px solid var(--border)", padding: "32px 28px", transition: "all 0.25s", borderTop: "4px solid transparent", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.borderTopColor = "var(--green)"}
                onMouseLeave={e => e.currentTarget.style.borderTopColor = "transparent"}
              >
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 700, color: "var(--green)", letterSpacing: "0.2em", marginBottom: 12 }}>Objective {o.num}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--green-dark)", marginBottom: 10 }}>{o.title}</div>
                <div style={{ fontSize: 13, lineHeight: 1.75, color: "var(--sub)" }}>{o.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATIONS */}
      <section id="operations" className="section section-alt">
        <div className="section-inner">
          <div className="section-header-row">
            <div>
              <div className="section-eyebrow"><div className="section-eyebrow-line"></div><span className="section-eyebrow-text">What We Do</span></div>
              <h2 className="section-title">National <span>Operations</span></h2>
            </div>
            <button className="link-btn" onClick={() => setView("gallery")}>View Full Archive →</button>
          </div>
          <div className="ops-grid" style={{ gridTemplateRows: "320px 320px" }}>
            {operations.map((op, i) => (
              <div key={i} className={`ops-card${op.tall ? " tall" : ""}`}>
                <img src={op.img} alt={op.title} />
                <div className="ops-overlay"></div>
                <div className="ops-content">
                  <div className="ops-tag">{op.tag}</div>
                  <div className="ops-title">{op.title}</div>
                  <div className="ops-sub">{op.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="section">
        <div className="section-inner">
          <div className="section-eyebrow"><div className="section-eyebrow-line"></div><span className="section-eyebrow-text">Global Alliances</span></div>
          <h2 className="section-title">International <span>Partners</span></h2>
          <p className="section-subtitle">KENFIBA works in partnership with international bodies for training, equipment donations and knowledge exchange to improve fire service standards in Kenya.</p>
          <div className="partners-grid">
            {[
              { flag: "🇸🇰", country: "Slovak Republic", badge: "Active Partner", detail: "On 23rd October 2022, KENFIBA with support of the Slovak Republic Embassy in Kenya went for a study visit to Slovakia, sponsored by the Slovak-Aid wing. KENFIBA was given donations of fire engines and other equipment including extinguishers from the Directorate of fire safety services." },
              { flag: "🇸🇬", country: "Singapore", badge: "Equipment Partner", detail: "Singapore SCDF (Directorate of fire safety services) is a shipping partner for fire engines and other equipment that KENFIBA needs. The partnership supports fleet and safety equipment development for fire brigade units across Kenya." },
              { flag: "🇵🇱", country: "Poland", badge: "Training Partner Since 2014", detail: "Aided by the MFA in the Polish Aid programme, KENFIBA has been working since 2014 to improve professional training for firemen and women. A study visit to Poland took place in 2018 where KENFIBA learnt a lot from fire services management across several Polish cities." },
            ].map((p, i) => (
              <div className="partner-card" key={i}>
                <span className="partner-flag">{p.flag}</span>
                <div className="partner-country">{p.country}</div>
                <div className="partner-badge">{p.badge}</div>
                <div className="partner-detail">{p.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" className="section section-alt">
        <div className="section-inner">
          <div className="section-eyebrow"><div className="section-eyebrow-line"></div><span className="section-eyebrow-text">Join KENFIBA</span></div>
          <h2 className="section-title">Membership <span>Benefits</span></h2>
          <div className="membership-grid">
            {[
              { num: "01", icon: "⚖️", title: "Advocacy", desc: "Close liaison with the government — KENFIBA policies issues lobbying for better laws and other industry players in making legislative policies. Members benefit from direct government engagement on fire and rescue matters." },
              { num: "02", icon: "🎓", title: "Capacity Building", desc: "KENFIBA has well-coordinated local and international industry-specific training for members. Access to identification and sharing of regional and international fire and rescue training opportunities." },
              { num: "03", icon: "💼", title: "Business Support", desc: "Business support to members — identification and sharing of business opportunities. Access to regional and international business opportunities. Members enjoy discounted rates on local and international industry products and services." },
              { num: "04", icon: "🤝", title: "Networking", desc: "Networking and sharing of knowledge — database of regional and international fire and rescue firms. KENFIBA organises a number of events throughout the year both locally and internationally." },
            ].map((b, i) => (
              <div className="membership-card" key={i}>
                <div className="membership-num">{b.num}</div>
                <div className="membership-icon">{b.icon}</div>
                <div className="membership-title">{b.title}</div>
                <div className="membership-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="section">
        <div className="section-inner">
          <div className="section-eyebrow"><div className="section-eyebrow-line"></div><span className="section-eyebrow-text">Executive Committee</span></div>
          <h2 className="section-title">National <span>Leadership</span></h2>
          <p className="section-subtitle">The Association is governed by an elected Executive Committee of fire officers drawn from across Kenya.</p>
          <div className="leadership-grid">
            {[
              { num: "01", role: "National Chairman", desc: "Supreme authority and strategic direction of the Association at national level." },
              { num: "02", role: "Secretary General", desc: "Responsible for day-to-day operations, official correspondence and institutional governance." },
              { num: "03", role: "National Treasurer", desc: "Oversees financial stewardship, budgetary management and statutory reporting obligations." },
              { num: "04", role: "Organizing Secretary", desc: "Leads events management, membership coordination and county-level liaison." },
            ].map((l, i) => (
              <div className="leader-card" key={i}>
                <div className="leader-number">Position {l.num}</div>
                <div className="leader-role">{l.role}</div>
                <div className="leader-divider"></div>
                <div className="leader-desc">{l.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VAULT */}
      <section id="vault" className="section section-alt">
        <div className="section-inner">
          <div className="section-eyebrow"><div className="section-eyebrow-line"></div><span className="section-eyebrow-text">Legal Documents</span></div>
          <h2 className="section-title">Statutory <span>Vault</span></h2>
          <div className="vault-grid">
            {[
              { icon: "📄", typeLabel: "PDF · Official Certificate", title: "Registration Certificate", meta: "Societies Registry No. 21578\nDated 15 July 2002 · Nairobi, Kenya", btn: "Download Credential" },
              { icon: "📋", typeLabel: "DOC · Constitution", title: "KENFIBA Charter", meta: "Constitution & Operational Mandate\nSocieties Act Cap 108, Republic of Kenya", btn: "Download Charter" },
              { icon: "⚖️", typeLabel: "BILL · Proposed Legislation", title: "Fire & Rescue Services Bill 2023", meta: "Proposed national fire services legislation\nActively advocated by KENFIBA", btn: "View Bill Details" },
            ].map((v, i) => (
              <div className="vault-card" key={i}>
                <div className="vault-type-tag">
                  <div className="vault-type-icon">{v.icon}</div>
                  <div className="vault-type-label">{v.typeLabel}</div>
                </div>
                <div className="vault-card-title">{v.title}</div>
                <div className="vault-meta">{v.meta}</div>
                <button className="vault-dl-btn">
                  <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                  {v.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: 0 }}>
        <div className="contact-wrap">
          <div className="contact-left">
            <div className="section-eyebrow"><div className="section-eyebrow-line"></div><span className="section-eyebrow-text">Get In Touch</span></div>
            <h2 className="section-title">Official <span>Liaison</span></h2>
            <div className="contact-details">
              <div>
                <div className="contact-block-label">Electronic Correspondence</div>
                <div className="contact-block-val">kenfiba@yahoo.com</div>
                <div className="contact-block-sub">www.kenfiba.org</div>
              </div>
              <div>
                <div className="contact-block-label">Direct Command Lines</div>
                <div className="contact-phones">
                  {[["0721 981 017","Primary Secretariat"],["020 2113850","Headquarters"],["0750 694 989","Operations"],
                    ["+254 020-237 1263","International"]].map(([num, tag]) => (
                    <div className="phone-item" key={num}><div className="ph-num">{num}</div><div className="ph-tag">{tag}</div></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="contact-block-label">Registered Office</div>
                <div className="contact-block-val" style={{ fontSize: 17, lineHeight: 1.5 }}>Fire & Ambulance HQ<br />Tom Mboya Street, Nairobi</div>
                <div className="contact-block-sub">P.O. Box 10104-00400 · Nairobi, Kenya</div>
              </div>
            </div>
          </div>

          <div className="contact-right">
            <div className="form-title">Submit an <span>Inquiry</span></div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input className="form-input" placeholder="07XX XXX XXX" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Organisation / County</label>
                <input className="form-input" placeholder="Ministry / County / Company" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Nature of Inquiry</label>
              <select className="form-select">
                <option>General Assistance</option>
                <option>Membership &amp; Certification</option>
                <option>Training Programme Inquiry</option>
                <option>Statutory Compliance</option>
                <option>Fire &amp; Rescue Services Bill 2023</option>
                <option>Operational Support Request</option>
                <option>International Partnership</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Details</label>
              <textarea className="form-textarea" placeholder="Briefly describe your request..." />
            </div>
            <div className={`urgent-row${isUrgent ? " on" : ""}`} onClick={() => setIsUrgent(v => !v)}>
              <div className={`toggle-pill${isUrgent ? " on" : ""}`}><div className="toggle-knob"></div></div>
              <span className="urgent-label">Flag as Urgent Operational Response</span>
            </div>
            <button
              className={`submit-btn${isUrgent ? " urgent" : ""}${isSent ? " sent" : ""}`}
              onClick={handleTransmit}
              disabled={isTransmitting || isSent}
            >
              {isTransmitting ? "Submitting..." : isSent ? "✓ Inquiry Received" : isUrgent ? "Submit Emergency Inquiry" : "Submit Official Inquiry"}
            </button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      {view === "gallery" && (
        <div className="gallery-overlay">
          <div className="gallery-top">
            <div>
              <div className="section-eyebrow"><div className="section-eyebrow-line"></div><span className="section-eyebrow-text">Visual Record</span></div>
              <h2 className="section-title" style={{ fontSize: "clamp(40px,6vw,72px)" }}>National <span>Archives</span></h2>
            </div>
            <button className="gallery-close" onClick={() => setView("portal")}>✕</button>
          </div>
          <div className="gallery-grid">
            {galleryItems.map((item, i) => (
              <div className="gallery-card" key={i}>
                <img src={`https://picsum.photos/seed/${item.seed}/800/${i % 3 === 0 ? 1050 : 720}`} alt={item.label} loading="lazy" />
                <div className="gallery-caption">
                  <div className="gallery-caption-year">Case Log: {item.year}</div>
                  <div className="gallery-caption-text">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PORTAL MODAL */}
      {showPortalError && (
        <div className="modal-backdrop" onClick={() => setShowPortalError(false)}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">🔒</div>
            <div className="modal-title">Access Restricted</div>
            <div className="modal-text">This portal is restricted to Ministry of Interior whitelisted IP addresses only. Please contact kenfiba@yahoo.com or call 0721 981 017 to request officer portal credentials.</div>
            <button className="modal-close-btn" onClick={() => setShowPortalError(false)}>Acknowledge Security Protocol</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <div>
            <div className="footer-brand-name">KENFIBA</div>
            <div className="footer-brand-full">Kenya National Fire Brigades Association</div>
            <div className="footer-motto">"Support the Firemen — the next life they save might be yours"</div>
            <div className="footer-reg">Charitable No. 21578 · Societies Act · Est. 2002</div>
          </div>
          <div>
            <div className="footer-col-head">Statutory</div>
            <ul className="footer-links">
              {["Fire & Rescue Services Bill 2023","County Response Framework","Institutional Membership","Officer Code of Conduct","Societies Act Cap 108"].map(l => <li key={l}>{l}</li>)}
            </ul>
          </div>
          <div>
            <div className="footer-col-head">Navigation</div>
            <ul className="footer-links">
              {[["about","About KENFIBA"],["operations","Operations"],["leadership","Leadership"],["membership","Membership"],["vault","Document Vault"],["contact","Contact Us"]].map(([id, l]) => (
                <li key={id} onClick={() => scrollTo(id)}>{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-head">Command HQ</div>
            {[
              { l: "Address", v: "Tom Mboya Street, Nairobi" },
              { l: "P.O. Box", v: "10104-00400" },
              { l: "Primary", v: "0721 981 017" },
              { l: "Headquarters", v: "020 2113850" },
              { l: "International", v: "+254 020-237 1263" },
              { l: "Email", v: "kenfiba@yahoo.com" },
              { l: "Website", v: "www.kenfiba.org" },
            ].map(c => (
              <div className="footer-contact-block" key={c.l}>
                <div className="fc-label">{c.l}</div>
                <div className="fc-val">{c.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2002–2026 Kenya National Fire Brigades Association · All Rights Reserved · Republic of Kenya</div>
          <div className="footer-verified">
            <div className="live-dot"></div>
            National Integrity Verified
          </div>
        </div>
      </footer>
    </>
  );
}