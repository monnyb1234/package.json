
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.type("html").send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#101020">
<title>Orbit Hub</title>
<style>
:root {
  --bg:#101020;
  --panel:#19192e;
  --panel2:#22223b;
  --border:#343452;
  --text:#f7f5ff;
  --muted:#aaa8c6;
  --accent:#b5a4ff;
}
* { box-sizing:border-box }
html { scroll-behavior:smooth }
body {
  margin:0;
  min-height:100vh;
  color:var(--text);
  background:
    radial-gradient(ellipse at 15% 0%,#39306a55,transparent 45%),
    radial-gradient(ellipse at 90% 40%,#31265a33,transparent 40%),
    var(--bg);
  font-family:system-ui,-apple-system,sans-serif;
}
button,input { font:inherit }
button,a { -webkit-tap-highlight-color:transparent }
button {
  color:var(--text);
  background:var(--panel2);
  border:1px solid var(--border);
  border-radius:11px;
  padding:10px 14px;
  cursor:pointer;
  transition:transform .18s,border-color .18s,background .18s;
}
button:hover { border-color:var(--accent);transform:translateY(-1px) }
a { color:inherit;text-decoration:none }
.wrap { max-width:1100px;margin:auto;padding:0 22px }
header {
  position:sticky;
  top:0;
  z-index:5;
  backdrop-filter:blur(18px);
  background:#101020dd;
  border-bottom:1px solid #34345288;
}
.nav {
  min-height:72px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:14px;
}
.brand { display:flex;align-items:center;gap:11px;font-weight:800;font-size:18px }
.logo {
  display:grid;
  place-items:center;
  width:40px;height:40px;
  border-radius:14px;
  color:#151127;
  background:linear-gradient(135deg,#d5caff,#9381ff);
  box-shadow:0 0 28px #9d8bff33;
  font-size:25px;
}
.navlinks { display:flex;gap:7px;flex-wrap:wrap }
.navlinks a {
  color:var(--muted);
  padding:9px 12px;
  border-radius:9px;
}
.navlinks a:hover { color:var(--text);background:var(--panel) }
.hero { text-align:center;padding:75px 0 46px }
.pill {
  display:inline-block;
  padding:7px 12px;
  color:#d3c9ff;
  background:#a994ff18;
  border:1px solid #a994ff44;
  border-radius:99px;
  font-size:12px;
  letter-spacing:.5px;
}
h1 {
  margin:20px 0 12px;
  font-size:clamp(42px,8vw,76px);
  line-height:1.04;
  letter-spacing:-3px;
}
.gradient {
  background:linear-gradient(100deg,#e2d8ff,#a89aff,#f3aefb);
  background-clip:text;
  -webkit-background-clip:text;
  color:transparent;
}
.sub {
  color:var(--muted);
  line-height:1.7;
  max-width:540px;
  margin:0 auto;
}
.search {
  max-width:650px;
  display:flex;
  gap:8px;
  padding:8px;
  margin:30px auto 0;
  background:#1c1c32;
  border:1px solid #45415f;
  border-radius:16px;
  box-shadow:0 15px 55px #0002;
}
.search input {
  flex:1;
  width:0;
  min-width:0;
  border:0;
  outline:0;
  background:transparent;
  padding:12px;
  color:var(--text);
  font-size:15px;
}
.primary {
  background:var(--accent);
  color:#19132f;
  border-color:transparent;
  font-weight:750;
}
.primary:hover { background:#cbbfff }
.section { padding:20px 0 30px }
.sectionhead {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-bottom:17px;
}
h2 { font-size:20px;margin:0;letter-spacing:-.4px }
.small { color:var(--muted);font-size:12px }
.grid {
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:13px;
}
.card {
  position:relative;
  min-width:0;
  padding:20px;
  border-radius:17px;
  background:linear-gradient(145deg,#202039,#17172a);
  border:1px solid var(--border);
  transition:transform .2s,border-color .2s,box-shadow .2s;
}
.card:hover {
  transform:translateY(-4px);
  border-color:#8f80d6;
  box-shadow:0 12px 35px #0002;
}
.cardicon {
  width:46px;height:46px;
  display:grid;place-items:center;
  background:#b5a4ff16;
  border:1px solid #b5a4ff26;
  border-radius:14px;
  font-size:24px;
  margin-bottom:17px;
}
.card h3 { margin:0 0 6px;font-size:15px }
.card p { color:var(--muted);font-size:12px;line-height:1.6;margin:0 }
.card .arrow { position:absolute;right:15px;top:15px;color:var(--muted) }
.tilelink { display:block;height:100% }
.tilelink:focus-visible { outline:2px solid var(--accent) }
.remove {
  position:absolute;
  right:10px;bottom:10px;
  padding:4px 8px;
  font-size:11px;
  display:none;
}
.card.custom:hover .remove { display:block }
.addform {
  display:flex;
  gap:8px;
  flex-wrap:wrap;
  padding:15px;
  background:var(--panel);
  border:1px solid var(--border);
  border-radius:14px;
  margin-top:15px;
}
.addform input {
  flex:1;
  min-width:130px;
  color:var(--text);
  background:#111123;
  border:1px solid var(--border);
  border-radius:9px;
  padding:10px;
}
#addarea { display:none }
footer {
  margin-top:35px;
  padding:28px 0;
  border-top:1px solid var(--border);
  color:var(--muted);
  font-size:12px;
}
.footrow {
  display:flex;
  align-items:center;
  justify-content:space-between;
  flex-wrap:wrap;
  gap:12px;
}
#message { color:#d3c9ff;font-size:12px;min-height:18px;margin-top:12px }
@media(max-width:760px) {
  .grid { grid-template-columns:repeat(2,minmax(0,1fr)) }
  .hero { padding:55px 0 30px }
  h1 { letter-spacing:-2px }
}
@media(max-width:430px) {
  .wrap { padding:0 14px }
  .nav { min-height:62px }
  .navlinks a { padding:8px 6px;font-size:12px }
  .brand { font-size:15px;gap:7px }
  .logo { width:34px;height:34px }
  .grid { gap:9px }
  .card { padding:15px }
  .cardicon { width:40px;height:40px }
  .search button { padding:9px }
}
</style>
</head>
<body>
<header>
  <div class="wrap nav">
    <a class="brand" href="#top">
      <span class="logo">◉</span>
      <span>Orbit <span class="gradient">Hub</span></span>
    </a>
    <nav class="navlinks">
      <a href="#resources">Resources</a>
      <a href="#games">Games</a>
      <a href="#shortcuts">My links</a>
    </nav>
  </div>
</header>

<main id="top" class="wrap">
  <section class="hero">
    <span class="pill">✦ YOUR PERSONAL DASHBOARD</span>
    <h1>Your space.<br><span class="gradient">Your orbit.</span></h1>
    <p class="sub">
      One simple homepage for finding useful websites,
      learning something new, and taking a break.
    </p>
    <form class="search" id="searchform">
      <input id="query" aria-label="Search the web"
        placeholder="Search the web or enter a website..."
        autocomplete="off" required>
      <button class="primary" type="submit">Search ↗</button>
    </form>
    <div id="message" role="status"></div>
  </section>

  <section class="section" id="resources">
    <div class="sectionhead">
      <h2>📚 Learning resources</h2>
      <span class="small">Learn something today</span>
    </div>
    <div class="grid">
      <a class="card tilelink" href="https://www.khanacademy.org/" target="_blank" rel="noopener noreferrer">
        <span class="arrow">↗</span><div class="cardicon">🎓</div>
        <h3>Khan Academy</h3><p>Lessons and practice for school subjects.</p>
      </a>
      <a class="card tilelink" href="https://www.wikipedia.org/" target="_blank" rel="noopener noreferrer">
        <span class="arrow">↗</span><div class="cardicon">📖</div>
        <h3>Wikipedia</h3><p>Explore articles and discover new topics.</p>
      </a>
      <a class="card tilelink" href="https://www.desmos.com/calculator" target="_blank" rel="noopener noreferrer">
        <span class="arrow">↗</span><div class="cardicon">📐</div>
        <h3>Desmos</h3><p>Graph equations and explore math.</p>
      </a>
      <a class="card tilelink" href="https://scratch.mit.edu/" target="_blank" rel="noopener noreferrer">
        <span class="arrow">↗</span><div class="cardicon">🧩</div>
        <h3>Scratch</h3><p>Learn coding by making projects.</p>
      </a>
    </div>
  </section>

  <section class="section" id="games">
    <div class="sectionhead">
      <h2>🎮 Games & creativity</h2>
      <span class="small">Explore and create</span>
    </div>
    <div class="grid">
      <a class="card tilelink" href="https://lichess.org/" target="_blank" rel="noopener noreferrer">
        <span class="arrow">↗</span><div class="cardicon">♟️</div>
        <h3>Lichess</h3><p>Play chess and practice tactics.</p>
      </a>
      <a class="card tilelink" href="https://www.coolmathgames.com/" target="_blank" rel="noopener noreferrer">
        <span class="arrow">↗</span><div class="cardicon">🕹️</div>
        <h3>Coolmath Games</h3><p>Puzzles, strategy, and casual games.</p>
      </a>
      <a class="card tilelink" href="https://poki.com/" target="_blank" rel="noopener noreferrer">
        <span class="arrow">↗</span><div class="cardicon">🎯</div>
        <h3>Poki</h3><p>Discover browser games.</p>
      </a>
      <a class="card tilelink" href="https://www.geogebra.org/" target="_blank" rel="noopener noreferrer">
        <span class="arrow">↗</span><div class="cardicon">🌌</div>
        <h3>GeoGebra</h3><p>Explore interactive math and geometry.</p>
      </a>
    </div>
  </section>

  <section class="section" id="shortcuts">
    <div class="sectionhead">
      <h2>⭐ My quick links</h2>
      <button id="toggleadd">＋ Add a link</button>
    </div>
    <p class="small">Your custom links are saved in this browser on this device.</p>
    <div class="grid" id="customlinks"></div>
    <div id="addarea">
      <form class="addform" id="addform">
        <input id="linkname" placeholder="Link name" maxlength="40" required>
        <input id="linkurl" placeholder="https://example.com" required>
        <button class="primary" type="submit">Save link</button>
      </form>
    </div>
  </section>
</main>

<footer>
  <div class="wrap footrow">
    <span>◉ Orbit Hub · Your personal dashboard</span>
    <span>Use the web responsibly and follow your school's rules.</span>
  </div>
</footer>

<script>
(function () {
  const $ = id => document.getElementById(id);
  const KEY = "orbit-hub-links-v1";
  const message = $("message");

  function validUrl(raw) {
    try {
      const u = new URL(raw);
      if (u.protocol === "https:" || u.protocol === "http:") {
        return u.href;
      }
    } catch (_) {}
    return null;
  }

  function searchUrl(raw) {
    const value = raw.trim();
    if (!value) return null;

    const explicit = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value);
    if (explicit) return validUrl(value);

    if (/^[^\\s]+\\.[^\\s]+$/.test(value)) {
      return validUrl("https://" + value);
    }

    return "https://www.google.com/search?q=" +
      encodeURIComponent(value);
  }

  $("searchform").addEventListener("submit", function (event) {
    event.preventDefault();
    const destination = searchUrl($("query").value);
    if (!destination) {
      message.textContent = "Enter a valid HTTP or HTTPS website address.";
      return;
    }
    window.open(destination, "_blank", "noopener,noreferrer");
    message.textContent = "Opening your search in a new tab.";
  });

  function readLinks() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(data)) return [];
      return data.filter(item =>
        item &&
        typeof item.name === "string" &&
        typeof item.url === "string" &&
        validUrl(item.url)
      ).slice(0, 24);
    } catch (_) {
      return [];
    }
  }

  function saveLinks(links) {
    try {
      localStorage.setItem(KEY, JSON.stringify(links));
      return true;
    } catch (_) {
      message.textContent = "Couldn't save links in this browser.";
      return false;
    }
  }

  function renderLinks() {
    const container = $("customlinks");
    container.replaceChildren();
    const links = readLinks();

    if (!links.length) {
      const empty = document.createElement("div");
      empty.className = "card";
      empty.style.gridColumn = "1 / -1";
      empty.innerHTML =
        '<div class="cardicon">✨</div><h3>Your links go here</h3>' +
        '<p>Click “Add a link” to save your favorite websites.</p>';
      container.appendChild(empty);
      return;
    }

    links.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "card custom";

      const link = document.createElement("a");
      link.className = "tilelink";
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const icon = document.createElement("div");
      icon.className = "cardicon";
      icon.textContent = "🔗";

      const title = document.createElement("h3");
      title.textContent = item.name;

      const description = document.createElement("p");
      description.textContent = new URL(item.url).hostname;

      link.append(icon, title, description);

      const remove = document.createElement("button");
      remove.className = "remove";
      remove.type = "button";
      remove.textContent = "Remove";
      remove.setAttribute("aria-label", "Remove " + item.name);
      remove.addEventListener("click", () => {
        const next = readLinks();
        next.splice(index, 1);
        saveLinks(next);
        renderLinks();
        message.textContent = "Link removed.";
      });

      card.append(link, remove);
      container.appendChild(card);
    });
  }

  $("toggleadd").addEventListener("click", () => {
    const area = $("addarea");
    const opening = area.style.display !== "block";
    area.style.display = opening ? "block" : "none";
    $("toggleadd").textContent = opening ? "✕ Cancel" : "＋ Add a link";
    if (opening) $("linkname").focus();
  });

  $("addform").addEventListener("submit", event => {
    event.preventDefault();

    const name = $("linkname").value.trim();
    const url = validUrl($("linkurl").value.trim());

    if (!name || !url) {
      message.textContent = "Enter a name and a valid HTTP or HTTPS URL.";
      return;
    }

    const links = readLinks();
    if (links.length >= 24) {
      message.textContent = "You can save up to 24 custom links.";
      return;
    }

    links.push({ name, url });
    if (saveLinks(links)) {
      $("addform").reset();
      $("addarea").style.display = "none";
      $("toggleadd").textContent = "＋ Add a link";
      renderLinks();
      message.textContent = "Your link has been saved!";
    }
  });

  renderLinks();
})();
</script>
</body>
</html>`);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Orbit Hub listening on port " + PORT);
});
