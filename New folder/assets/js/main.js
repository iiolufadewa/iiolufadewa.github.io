/* =============================================================
   Isaac Olufadewa — site interactions
   1. Transmission-network hero (canvas)
   2. Mobile nav
   3. Scroll reveals
   4. Publication filters
   ============================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Transmission network -------------------------------- */
  function initNetwork(canvas) {
    var ctx = canvas.getContext("2d");
    var W, H, dpr, nodes = [], edges = [], raf;
    var CSS = getComputedStyle(document.documentElement);
    var jade = (CSS.getPropertyValue("--jade-bright") || "#1eb489").trim();
    var coral = (CSS.getPropertyValue("--coral") || "#ee6c4d").trim();
    var mist = "#aec2d1";

    // Labelled "domain" nodes carry meaning; the rest form a community contact web.
    var labels = ["Mental health", "Infectious disease", "AI / ML", "Global equity"];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function build() {
      nodes = [];
      var total = W < 640 ? 26 : (W < 1000 ? 34 : 46);
      for (var i = 0; i < total; i++) {
        var isLabel = i < labels.length;
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: isLabel ? 5.5 : (Math.random() * 2 + 1.4),
          label: isLabel ? labels[i] : null,
          index: i === Math.floor(total / 2) // one "index case"
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, W, H);
      var i, j, a, b, dx, dy, dist, maxD = W < 640 ? 120 : 165;

      // edges
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j];
          dx = a.x - b.x; dy = a.y - b.y;
          dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxD) {
            var o = (1 - dist / maxD) * 0.5;
            ctx.strokeStyle = "rgba(30,180,137," + o.toFixed(3) + ")";
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        if (a.index) { ctx.fillStyle = coral; }
        else if (a.label) { ctx.fillStyle = jade; }
        else { ctx.fillStyle = "rgba(174,194,209,0.55)"; }
        ctx.fill();

        if (a.label) {
          ctx.strokeStyle = "rgba(30,180,137,0.5)";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(a.x, a.y, a.r + 5, 0, Math.PI * 2); ctx.stroke();
          ctx.font = "600 11px 'IBM Plex Mono', monospace";
          ctx.fillStyle = "rgba(174,194,209,0.85)";
          ctx.fillText(a.label, a.x + 12, a.y + 4);
        }
      }
      raf = requestAnimationFrame(step);
    }

    function staticFrame() { step(); cancelAnimationFrame(raf); }

    resize();
    window.addEventListener("resize", debounce(resize, 200));
    if (reduce) { staticFrame(); } else { step(); }
  }

  function debounce(fn, wait) {
    var t; return function () { clearTimeout(t); var a = arguments, c = this; t = setTimeout(function () { fn.apply(c, a); }, wait); };
  }

  /* ---------- 2. Mobile nav ------------------------------------------ */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var open = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* ---------- 3. Scroll reveals -------------------------------------- */
  function initReveals() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); }); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- 4. Publication filters --------------------------------- */
  function initFilters() {
    var btns = document.querySelectorAll(".filter-btn");
    var pubs = document.querySelectorAll(".pub");
    if (!btns.length) return;
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        btns.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var f = btn.getAttribute("data-filter");
        pubs.forEach(function (p) {
          var tags = (p.getAttribute("data-tags") || "");
          p.hidden = !(f === "all" || tags.indexOf(f) !== -1);
        });
      });
    });
  }

  /* ---------- boot --------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var net = document.getElementById("hero-canvas");
    if (net) initNetwork(net);
    var thread = document.getElementById("thread-canvas");
    if (thread) initNetwork(thread);
    initNav();
    initReveals();
    initFilters();
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
