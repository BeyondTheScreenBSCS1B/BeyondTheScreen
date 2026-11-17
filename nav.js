/* Shared nav bar for Beyond The Screen.
   Add <script src="nav.js"></script> at the end of <body> on every page.
   To rename or add pages, edit the two lists below. */
(function () {
  var main = [
    { href: "index.html",    label: "Home" },
    { href: "about.html",    label: "About Us" },
    { href: "audience.html", label: "Audience" }
  ];
  var phases = [
    { href: "phase1.html", label: "Phase 1", sub: "Needs Assessment" },
    { href: "phase2.html", label: "Phase 2", sub: "Timeline" },
    { href: "phase3.html", label: "Phase 3", sub: "Slides" },
    { href: "phase4.html", label: "Phase 4", sub: "Evaluation" },
    { href: "phase5.html", label: "Phase 5", sub: "SDG Connection" }
  ];

  var current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var inPhases = phases.some(function (p) { return p.href === current; });

  var css = [
    ".btsnav{position:relative;z-index:100;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:0 32px;min-height:64px;background:rgba(32,52,90,.92);font-family:'Sora',system-ui,sans-serif;flex-wrap:wrap}",
    ".btsnav .brand{font-weight:800;color:#fff;text-decoration:none;font-size:1.05rem}",
    ".btsnav .links{display:flex;gap:6px;align-items:center;flex-wrap:wrap}",
    ".btsnav .links>a,.btsnav .dd>button{font:inherit;font-weight:700;font-size:.95rem;color:#fff;background:none;border:0;text-decoration:none;padding:7px 14px;border-radius:999px;cursor:pointer}",
    ".btsnav .links>a:hover,.btsnav .dd>button:hover{background:rgba(255,255,255,.12)}",
    ".btsnav .active{background:#4a4dff!important}",
    ".btsnav a:focus-visible,.btsnav button:focus-visible{outline:2px solid #fff;outline-offset:2px}",
    ".btsnav .dd{position:relative}",
    ".btsnav .dd>button::after{content:'';display:inline-block;margin-left:8px;width:7px;height:7px;border-right:2px solid #fff;border-bottom:2px solid #fff;transform:translateY(-2px) rotate(45deg);transition:transform .15s}",
    ".btsnav .dd.open>button::after{transform:translateY(1px) rotate(-135deg)}",
    ".btsnav .menu{display:none;position:absolute;right:0;top:calc(100% + 8px);min-width:230px;padding:8px;background:#0f1a33;border:1px solid rgba(255,255,255,.18);border-radius:16px;box-shadow:0 12px 30px rgba(0,0,0,.45)}",
    ".btsnav .dd.open .menu{display:block}",
    ".btsnav .menu a{display:block;color:#fff;text-decoration:none;padding:9px 12px;border-radius:10px;font-weight:700;font-size:.92rem}",
    ".btsnav .menu a small{display:block;font-family:'Fira Mono',monospace;font-weight:400;font-size:.78rem;color:#aab4d4}",
    ".btsnav .menu a:hover{background:rgba(255,255,255,.1)}",
    ".btsnav .menu a.active{background:#4a4dff}",
    ".btsnav .menu a.active small{color:#dfe3ff}",
    "@media (max-width:600px){.btsnav{padding:10px 16px}}"
  ].join("\n");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  function link(item) {
    var a = '<a href="' + item.href + '"' + (item.href === current ? ' class="active" aria-current="page"' : "") + ">";
    return a + item.label + "</a>";
  }

  var html =
    '<a class="brand" href="index.html">Beyond The Screen</a>' +
    '<div class="links">' +
      main.map(link).join("") +
      '<div class="dd" id="btsPhases">' +
        '<button type="button" aria-haspopup="true" aria-expanded="false"' + (inPhases ? ' class="active"' : "") + ">Phases</button>" +
        '<div class="menu">' +
          phases.map(function (p) {
            return '<a href="' + p.href + '"' + (p.href === current ? ' class="active" aria-current="page"' : "") + ">" +
                   p.label + "<small>" + p.sub + "</small></a>";
          }).join("") +
        "</div>" +
      "</div>" +
    "</div>";

  var nav = document.createElement("nav");
  nav.className = "btsnav";
  nav.setAttribute("aria-label", "Main");
  nav.innerHTML = html;
  document.body.insertBefore(nav, document.body.firstChild);

  var dd = document.getElementById("btsPhases");
  var btn = dd.querySelector("button");
  function setOpen(open) {
    dd.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  btn.addEventListener("click", function (e) { e.stopPropagation(); setOpen(!dd.classList.contains("open")); });
  document.addEventListener("click", function (e) { if (!dd.contains(e.target)) setOpen(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setOpen(false); btn.focus(); } });
})();
