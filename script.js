/* ===== EDIT ONLY THIS BLOCK ===== */
const CONFIG = {
  name: "Nazmeen",
  creator: "Imran",
  birthday: { month: 10, day: 29 },
  photos: { her: "assets/her-photo.jpg", mine: "assets/my-photo.jpg" },
  music: "assets/music.mp3", // optional: music button stays hidden if the file is missing
  greeting: "HAPPY BIRTHDAY, BEAUTIFUL",
  past: "Belated wishes. I hope your day was beautiful.",
  // Approved memories only. Never paste private chats here.
  chapters: [
    { title: "The Memories", lines: ["Some moments are remembered without needing words."] },
    { title: "An Unexpected Meeting", lines: ["Some chapters begin quietly."] },
    { title: "October 29", lines: ["A day that belongs entirely to you."] }
  ],
  letter: [
    "I just wanted to make something special for your birthday.",
    "I hope this new year of your life brings you happiness, peace, beautiful memories, and countless reasons to smile.",
    "You deserve a wonderful day.",
    "Happy Birthday."
  ],
  final: ["No expectations.", "No pressure.", "Just a little surprise, made with a genuine smile.", "Happy Birthday."]
};
/* ===== END EDIT BLOCK ===== */

(() => {
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x) e.textContent = x; return e; };
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const smooth = reduce ? "auto" : "smooth";
const dpr = () => Math.min(devicePixelRatio || 1, 2);
const root = document.documentElement;
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

/* ---- text from config ---- */
$("#who").textContent = CONFIG.name;
$("#bd-h").textContent = CONFIG.greeting;
$("#by").textContent = CONFIG.creator ? " — " + CONFIG.creator : "";
$$("[data-c]").forEach(e => { e.textContent = CONFIG[e.dataset.c]; });
CONFIG.final.forEach(t => $("#ft").append(el("span", "rv", t)));

/* ---- photos + fullscreen ---- */
const dlg = $("#view"), vimg = $("img", dlg);
dlg.onclick = () => dlg.close();
$$(".frame").forEach(f => {
  const img = $("img", f), ph = $(".ph", f), src = CONFIG.photos[f.dataset.k];
  f.disabled = true; ph.textContent = "Loading…";
  img.onload = () => { f.classList.add("ok"); f.disabled = false; };
  img.onerror = () => { ph.textContent = "Add " + src; ph.style.animation = "none"; };
  img.src = src;
  f.onclick = () => { vimg.src = img.src; vimg.alt = img.alt; dlg.showModal(); };
});

/* ---- chapters ---- */
const tl = $("#tl");
CONFIG.chapters.forEach((c, i) => {
  const li = el("li", "rv"), b = el("button"), p = el("div", "pn"), w = el("div");
  b.type = "button"; b.setAttribute("aria-expanded", "false");
  p.id = "chp" + i; b.setAttribute("aria-controls", p.id);
  b.append(el("span", "dot"), el("span", "", c.title));
  c.lines.forEach(l => w.append(el("p", "", l)));
  p.append(w); li.append(b, p); tl.append(li);
  b.onclick = () => $$("button", tl).forEach(x =>
    x.setAttribute("aria-expanded", String(x === b && x.getAttribute("aria-expanded") !== "true")));
});
$("button", tl).setAttribute("aria-expanded", "true");

/* ---- atmosphere particles ---- */
const bg = $("#bg"), bx = bg.getContext("2d");
let W, H, P = [], raf, lw = innerWidth;
const size = () => { const d = dpr(); W = bg.width = innerWidth * d; H = bg.height = innerHeight * d; };
const seed = () => {
  P = Array.from({ length: innerWidth < 600 ? 26 : 50 }, () => ({
    x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + .4,
    s: Math.random() * 1e-4 + 3e-5, a: Math.random() * .45 + .15, p: Math.random() * 6.3 }));
};
const draw = t => {
  bx.clearRect(0, 0, W, H); bx.fillStyle = "#e9e9ee";
  for (const p of P) {
    p.y -= p.s; if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); }
    bx.globalAlpha = p.a * (.6 + .4 * Math.sin(t / 900 + p.p));
    bx.beginPath(); bx.arc(p.x * W, p.y * H, p.r * dpr(), 0, 6.283); bx.fill();
  }
};
const loop = t => { draw(t); raf = requestAnimationFrame(loop); };
const run = () => { cancelAnimationFrame(raf); if (reduce) draw(0); else if (!document.hidden) raf = requestAnimationFrame(loop); };
size(); seed(); run();
document.addEventListener("visibilitychange", run);
addEventListener("resize", () => { if (innerWidth === lw) return; lw = innerWidth; size(); seed(); run(); });

/* ---- confetti ---- */
const fx = $("#fx"), fc = fx.getContext("2d");
let C = [], fr, D = 1;
const step = () => {
  fc.clearRect(0, 0, fx.width, fx.height);
  C.forEach(p => {
    p.vy += .38 * D; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.l -= .008;
    fc.save(); fc.globalAlpha = Math.max(p.l, 0); fc.translate(p.x, p.y); fc.rotate(p.r);
    fc.fillStyle = p.c; fc.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); fc.restore();
  });
  C = C.filter(p => p.l > 0);
  if (C.length) fr = requestAnimationFrame(step); else fc.clearRect(0, 0, fx.width, fx.height);
};
const burst = () => {
  if (reduce) return;
  D = dpr(); fx.width = innerWidth * D; fx.height = innerHeight * D;
  const cols = ["#e9e9ee", "#b9b9c4", "#a3182f", "#ffffff"];
  C = Array.from({ length: 110 }, () => ({
    x: fx.width / 2, y: fx.height * .55, vx: (Math.random() - .5) * 16 * D, vy: (-Math.random() * 15 - 5) * D,
    w: (Math.random() * 6 + 4) * D, h: (Math.random() * 3 + 2) * D, r: Math.random() * 6, vr: (Math.random() - .5) * .3,
    c: cols[Math.random() * 4 | 0], l: 1 }));
  cancelAnimationFrame(fr); step();
};

/* ---- music (only shown if the file exists) ---- */
const aud = $("#aud"), mus = $("#mus"); let musOK = false;
const setM = on => {
  mus.setAttribute("aria-pressed", String(on)); mus.textContent = on ? "♪ PAUSE" : "♪ PLAY";
  mus.setAttribute("aria-label", on ? "Pause music" : "Play music");
};
fetch(CONFIG.music, { method: "HEAD" }).then(r => {
  if (!r.ok) return;
  aud.src = CONFIG.music; musOK = true; mus.hidden = root.classList.contains("lock");
}).catch(() => {});
mus.onclick = () => {
  if (aud.paused) aud.play().then(() => setM(true), () => setM(false));
  else { aud.pause(); setM(false); }
};

/* ---- reveal on scroll, intro lock ---- */
const reveal = s => {
  const st = +s.dataset.step || .15;
  $$(".rv", s).forEach((e, i) => { e.style.animationDelay = reduce ? "0s" : i * st + "s"; e.classList.add("in"); });
};
const io = "IntersectionObserver" in window && new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  io.unobserve(e.target); reveal(e.target);
  if (e.target.id === "birthday") burst();
}), { threshold: .15 });
$$(".scene").forEach(s => io ? io.observe(s) : reveal(s));

const lock = on => {
  root.classList.toggle("lock", on);
  $$(".scene:not(#intro)").forEach(s => s.toggleAttribute("inert", on));
};
lock(true); scrollTo(0, 0);
$("#open").onclick = () => {
  lock(false); mus.hidden = !musOK;
  $("#photos").scrollIntoView({ behavior: smooth });
  setTimeout(() => $("#ph-h").focus({ preventScroll: true }), reduce ? 0 : 900);
};

/* ---- countdown ---- */
{
  const n = new Date(), b = new Date(n.getFullYear(), CONFIG.birthday.month - 1, CONFIG.birthday.day);
  const d = Math.round((b - new Date(n.getFullYear(), n.getMonth(), n.getDate())) / 864e5);
  $("#count").textContent = d > 1 ? d + " DAYS TO GO" : d === 1 ? "TOMORROW" : d === 0 ? "TODAY IS THE DAY" : CONFIG.past;
}

/* ---- cake ---- */
const cake = $("#cake"), wish = $("#wish");
wish.onclick = () => {
  const out = cake.classList.toggle("out");
  wish.textContent = out ? "LIGHT THEM AGAIN" : "BLOW OUT THE CANDLES";
  $("#wm").textContent = out ? "Make a wish." : "";
  if (out) burst();
};

/* ---- letter ---- */
const env = $("#env"), paper = $("#paper"), go = $("#go");
CONFIG.letter.forEach(t => paper.append(el("span", "ln", t)));
paper.append(el("span", "ln sg", "— " + CONFIG.creator));
env.onclick = () => {
  env.setAttribute("aria-expanded", "true"); env.disabled = true; $("#hint").hidden = true;
  const gap = reduce ? 0 : 1500, L = $$(".ln", paper);
  setTimeout(() => {
    paper.hidden = false; paper.focus({ preventScroll: true });
    paper.scrollIntoView({ behavior: smooth, block: "center" });
    L.forEach((l, i) => setTimeout(() => {
      l.classList.add("in");
      if (i === L.length - 1) setTimeout(() => { go.hidden = false; }, gap);
    }, i * gap));
  }, reduce ? 0 : 900);
};
go.onclick = () => $("#final").scrollIntoView({ behavior: smooth });
$("#replay").onclick = () => scrollTo({ top: 0, behavior: smooth });
})();
