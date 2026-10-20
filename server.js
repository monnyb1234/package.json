
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
<meta name="theme-color" content="#10111b">
<title>Orbit Browser</title>
<style>
:root {
  color-scheme: dark;
  --bg:#10111b;
  --panel:#191b29;
  --panel2:#222437;
  --border:#30334a;
  --text:#f4f4fb;
  --muted:#a0a4bd;
  --accent:#a5a1ff;
}
* { box-sizing:border-box }
body {
  margin:0;
  background:var(--bg);
  color:var(--text);
  font:14px system-ui,sans-serif;
  height:100dvh;
  overflow:hidden;
}
button,input { font:inherit }
button {
  cursor:pointer;
  color:var(--text);
  border:1px solid transparent;
  background:transparent;
  border-radius:9px;
  padding:8px 11px;
}
button:hover { background:var(--panel2) }
button:focus-visible,input:focus-visible {
  outline:2px solid var(--accent);
  outline-offset:2px;
}
button:disabled { opacity:.3;cursor:default }
#app {
  height:100%;
  display:flex;
  flex-direction:column;
}
.top {
  background:#151622;
  border-bottom:1px solid var(--border);
}
.brandline {
  display:flex;
  align-items:center;
  gap:10px;
  padding:10px 14px 5px;
}
.logo {
  display:grid;
  place-items:center;
  width:30px;
  height:30px;
  border-radius:10px;
  background:linear-gradient(135deg,#aaa5ff,#6965db);
  color:#10111b;
  font-size:21px;
  font-weight:900;
}
.brand { font-size:16px;font-weight:750 }
.tagline { color:var(--muted);font-size:11px }
#tabs {
  display:flex;
  gap:5px;
  align-items:center;
  padding:7px 10px 0;
  overflow-x:auto;
}
.tab {
  display:flex;
  align-items:center;
  gap:8px;
  min-width:90px;
  max-width:210px;
  flex:0 1 190px;
  background:#202132;
  border:1px solid var(--border);
  border-bottom:0;
  padding:8px 10px;
  border-radius:10px 10px 0 0;
}
.tab.active { background:var(--bg) }
.tabname {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  flex:1;
}
.close {
  padding:1px 5px;
  border-radius:5px;
}
#toolbar {
  display:flex;
  align-items:center;
  gap:5px;
  padding:9px 12px 11px;
}
#address {
  flex:1;
  min-width:0;
  background:#242638;
  border:1px solid #383b54;
  color:var(--text);
  border-radius:12px;
  padding:11px 14px;
  outline:none;
}
#address:focus { border-color:var(--accent) }
#go {
  background:var(--accent);
  color:#141426;
  font-weight:750;
}
#go:hover { background:#c1beff }
#bookmarks {
  display:flex;
  gap:6px;
  padding:0 14px 10px;
  overflow-x:auto;
}
.bookmark {
  background:#222437;
  border:1px solid var(--border);
  white-space:nowrap;
  font-size:12px;
  padding:6px 10px;
}
main {
  position:relative;
  flex:1;
  min-height:0;
}
#home {
  height:100%;
  overflow:auto;
  padding:clamp(22px,5vw,65px) 20px;
  text-align:center;
}
.hero { margin:0 auto;max-width:680px }
.orb {
  font-size:65px;
  line-height:1.2;
  color:var(--accent);
  text-shadow:0 0 45px #7973ff55;
}
h1 {
  font-size:clamp(35px,7vw,58px);
  letter-spacing:-2px;
  margin:7px 0;
}
.subtitle { color:var(--muted);font-size:15px }
#homesearch {
  display:flex;
  gap:7px;
  margin:28px auto;
  padding:7px;
  max-width:600px;
  background:var(--panel);
  border:1px solid var(--border);
  border-radius:15px;
}
#homesearch input {
  flex:1;
  min-width:0;
  padding:12px;
  background:transparent;
  border:0;
  color:var(--text);
  outline:none;
}
.tiles {
  max-width:600px;
  margin:25px auto;
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(125px,1fr));
  gap:12px;
  text-align:left;
}
.tile {
  border:1px solid var(--border);
  background:var(--panel);
  padding:17px;
  border-radius:13px;
  min-width:0;
}
.tile:hover { border-color:#7772ce }
.tileicon { font-size:24px;margin-bottom:9px }
.tiletitle { font-weight:700 }
.tileurl {
  color:var(--muted);
  font-size:11px;
  margin-top:4px;
  overflow:hidden;
  text-overflow:ellipsis;
}
.sectiontitle {
  color:var(--muted);
  font-size:12px;
  max-width:600px;
  margin:22px auto 0;
  text-align:left;
}
#viewer {
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  border:0;
  background:white;
  display:none;
}
#notice {
  display:none;
  position:absolute;
  inset:0;
  overflow:auto;
  padding:35px 20px;
  background:var(--bg);
  text-align:center;
}
.noticecard {
  max-width:550px;
  margin:35px auto;
  padding:25px;
  border:1px solid var(--border);
  background:var(--panel);
  border-radius:16px;
}
.noticecard p { color:var(--muted);line-height:1.7 }
#status {
  display:flex;
  justify-content:space-between;
  gap:12px;
  padding:6px 12px;
  border-top:1px solid var(--border);
  color:var(--muted);
  font-size:11px;
}
#status span {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
@media(max-width:520px) {
  .tagline { display:none }
  #toolbar { gap:2px;padding:7px }
  #toolbar button { padding:8px }
  #bookmarks { padding-left:8px }
  .tab { min-width:75px;padding:8px 6px }
}
</style>
</head>
<body>
<div id="app">
  <header class="top">
    <div class="brandline">
      <div class="logo">◉</div>
      <div>
        <div class="brand">Orbit Browser</div>
        <div class="tagline">Your corner of the internet</div>
      </div>
    </div>
    <div id="tabs"></div>
    <div id="toolbar">
      <button id="back" title="Back">←</button>
      <button id="forward" title="Forward">→</button>
      <button id="refresh" title="Refresh">↻</button>
      <button id="homebtn" title="Home">⌂</button>
      <input id="address" placeholder="Search or enter a website address"
        autocomplete="off" spellcheck="false">
      <button id="star" title="Bookmark this page">☆</button>
      <button id="go">Go</button>
      <button id="newtab" title="New tab">＋</button>
    </div>
    <div id="bookmarks"></div>
  </header>

  <main>
    <section id="home">
      <div class="hero">
        <div class="orb">◉</div>
        <h1>Explore further.</h1>
        <div class="subtitle">A little space for your next destination.</div>
        <form id="homesearch">
          <input id="homeinput" placeholder="Search the web or enter a URL..."
            aria-label="Search the web" autocomplete="off">
          <button id="homesubmit" type="submit">Search ↗</button>
        </form>
      </div>
      <div class="sectiontitle">QUICK ACCESS</div>
      <div class="tiles" id="tiles"></div>
      <div class="sectiontitle">TIP: You can search by typing a question or a website address.</div>
    </section>

    <iframe id="viewer" title="Website viewer"
      referrerpolicy="strict-origin-when-cross-origin"></iframe>

    <section id="notice">
      <div class="noticecard">
        <div style="font-size:38px">🌐</div>
        <h2>This page may not support embedding</h2>
        <p>Some websites prevent other apps from displaying them.
        This is a website security setting, not a problem with Orbit.</p>
        <button id="openexternal" style="background:var(--accent);color:#141426">
          Open website in a new tab ↗
        </button>
        <p id="noticeurl" style="overflow-wrap:anywhere"></p>
        <button id="returnhome">Return to Orbit</button>
      </div>
    </section>
  </main>

  <footer id="status">
    <span id="statustext">Ready to explore</span>
    <span>Orbit Browser · Web app</span>
  </footer>
</div>

<script>
(function () {
  "use strict";

  const $ = function (id) {
    return document.getElementById(id);
  };

  const HOME = "__orbit_home__";
  const STORAGE = "orbit-browser-v1";

  let tabs = [];
  let activeId = 0;
  let nextId = 1;
  let bookmarks = [];
  let lastExternal = "https://www.google.com/";
  let homeTiles = [
    { title:"Google", url:"https://www.google.com/", icon:"🔎" },
    { title:"Wikipedia", url:"https://www.wikipedia.org/", icon:"📚" },
    { title:"YouTube", url:"https://www.youtube.com/", icon:"▶️" },
    { title:"DuckDuckGo", url:"https://duckduckgo.com/", icon:"🦆" }
  ];

  function loadSaved() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE) || "{}");
      if (Array.isArray(saved.bookmarks)) {
        bookmarks = saved.bookmarks.filter(function (b) {
          return b && typeof b.url === "string" &&
            typeof b.title === "string";
        });
      }
    } catch (_) {}
  }

  function save() {
    try {
      localStorage.setItem(STORAGE, JSON.stringify({
        bookmarks: bookmarks
      }));
    } catch (_) {}
  }

  function current() {
    return tabs.find(function (t) {
      return t.id === activeId;
    });
  }

  function normalize(input) {
    let value = input.trim();
    if (!value) return null;

    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value)) {
      try {
        const parsed = new URL(value);
        if (parsed.protocol !== "http:" &&
            parsed.protocol !== "https:") return null;
        return parsed.href;
      } catch (_) {
        return null;
      }
    }

    if (/^localhost(?::\\d+)?(?:\\/.*)?$/i.test(value) ||
        /^\\d{1,3}(?:\\.\\d{1,3}){3}(?::\\d+)?(?:\\/.*)?$/.test(value)) {
      return "http://" + value;
    }

    if (/^[^\\s]+\\.[^\\s]+$/.test(value) &&
        !value.includes(" ")) {
      return "https://" + value;
    }

    return "https://www.google.com/search?q=" +
      encodeURIComponent(value);
  }

  function safeUrl(url) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "https:" ||
        parsed.protocol === "http:";
    } catch (_) {
      return false;
    }
  }

  function newTab(url) {
    const tab = {
      id: nextId++,
      title: "New tab",
      url: HOME,
      history: [],
      index: -1
    };
    tabs.push(tab);
    activeId = tab.id;
    if (url) navigate(url);
    render();
  }

  function navigate(input, addHistory) {
    const url = normalize(input);
    if (!url || !safeUrl(url)) {
      $("statustext").textContent =
        "Enter a valid HTTP or HTTPS website address.";
      return;
    }

    const tab = current();
    if (!tab) return;

    if (addHistory !== false) {
      tab.history = tab.history.slice(0, tab.index + 1);
      tab.history.push(url);
      tab.index = tab.history.length - 1;
    }

    tab.url = url;
    tab.title = titleFromUrl(url);
    lastExternal = url;
    render();
    showViewer(url);
  }

  function titleFromUrl(url) {
    try {
      return new URL(url).hostname.replace(/^www\\./, "");
    } catch (_) {
      return "Website";
    }
  }

  function showViewer(url) {
    $("home").style.display = "none";
    $("notice").style.display = "none";
    $("viewer").style.display = "block";
    $("viewer").src = url;
    $("address").value = url;
    $("statustext").textContent = "Opening " + titleFromUrl(url);
    updateButtons();
  }

  function showHome() {
    const tab = current();
    if (!tab) return;
    tab.url = HOME;
    $("viewer").style.display = "none";
    $("viewer").src = "about:blank";
    $("notice").style.display = "none";
    $("home").style.display = "block";
    $("address").value = "";
    $("homeinput").value = "";
    $("statustext").textContent = "Ready to explore";
    render();
  }

  function back() {
    const tab = current();
    if (!tab || tab.index <= 0) {
      showHome();
      return;
    }
    tab.index--;
    tab.url = tab.history[tab.index];
    render();
    showViewer(tab.url);
  }

  function forward() {
    const tab = current();
    if (!tab || tab.index >= tab.history.length - 1) return;
    tab.index++;
    tab.url = tab.history[tab.index];
    render();
    showViewer(tab.url);
  }

  function refresh() {
    const tab = current();
    if (!tab || tab.url === HOME) {
      showHome();
      return;
    }
    showViewer(tab.url);
  }

  function activate(id) {
    activeId = id;
    const tab = current();
    if (!tab) return;
    render();

    if (tab.url === HOME) showHome();
    else showViewer(tab.url);
  }

  function closeTab(id) {
    if (tabs.length === 1) {
      tabs = [];
      newTab();
      return;
    }

    const index = tabs.findIndex(function (t) {
      return t.id === id;
    });
    tabs = tabs.filter(function (t) {
      return t.id !== id;
    });

    if (activeId === id) {
      activeId = tabs[Math.max(0, index - 1)].id;
      activate(activeId);
    } else {
      render();
    }
  }

  function renderTabs() {
    const container = $("tabs");
    container.replaceChildren();

    tabs.forEach(function (tab) {
      const el = document.createElement("div");
      el.className = "tab" + (tab.id === activeId ? " active" : "");

      const name = document.createElement("span");
      name.className = "tabname";
      name.textContent = tab.url === HOME ? "New tab" : tab.title;
      name.title = name.textContent;
      name.addEventListener("click", function () {
        activate(tab.id);
      });

      const close = document.createElement("button");
      close.className = "close";
      close.textContent = "×";
      close.title = "Close tab";
      close.addEventListener("click", function (event) {
        event.stopPropagation();
        closeTab(tab.id);
      });

      el.append(name, close);
      el.addEventListener("click", function () {
        activate(tab.id);
      });
      container.appendChild(el);
    });
  }

  function renderBookmarks() {
    const container = $("bookmarks");
    container.replaceChildren();

    bookmarks.forEach(function (b, index) {
      const button = document.createElement("button");
      button.className = "bookmark";
      button.textContent = "☆ " + b.title;
      button.title = b.url;
      button.addEventListener("click", function () {
        navigate(b.url);
      });
      button.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        if (confirm("Remove bookmark " + b.title + "?")) {
          bookmarks.splice(index, 1);
          save();
          renderBookmarks();
          renderTiles();
        }
      });
      container.appendChild(button);
    });
  }

  function renderTiles() {
    const container = $("tiles");
    container.replaceChildren();

    homeTiles.forEach(function (tile) {
      const el = document.createElement("button");
      el.className = "tile";
      el.style.textAlign = "left";

      const icon = document.createElement("div");
      icon.className = "tileicon";
      icon.textContent = tile.icon;

      const title = document.createElement("div");
      title.className = "tiletitle";
      title.textContent = tile.title;

      const url = document.createElement("div");
      url.className = "tileurl";
      url.textContent = titleFromUrl(tile.url);

      el.append(icon, title, url);
      el.addEventListener("click", function () {
        navigate(tile.url);
      });
      container.appendChild(el);
    });

    bookmarks.slice(0, 4).forEach(function (b) {
      const el = document.createElement("button");
      el.className = "tile";
      el.style.textAlign = "left";

      const icon = document.createElement("div");
      icon.className = "tileicon";
      icon.textContent = "☆";

      const title = document.createElement("div");
      title.className = "tiletitle";
      title.textContent = b.title;

      const url = document.createElement("div");
      url.className = "tileurl";
      url.textContent = titleFromUrl(b.url);

      el.append(icon, title, url);
      el.addEventListener("click", function () {
        navigate(b.url);
      });
      container.appendChild(el);
    });
  }

  function render() {
    renderTabs();
    renderBookmarks();
    renderTiles();
    updateButtons();

    const tab = current();
    if (tab) {
      $("address").value = tab.url === HOME ? "" : tab.url;
      $("star").textContent = bookmarks.some(function (b) {
        return b.url === tab.url;
      }) ? "★" : "☆";
    }
  }

  function updateButtons() {
    const tab = current();
    $("back").disabled = !tab ||
      (tab.index <= 0 && tab.url === HOME);
    $("forward").disabled = !tab ||
      tab.index >= tab.history.length - 1;
  }

  function submitAddress(value) {
    const tab = current();
    if (!tab) return;
    navigate(value);
  }

  function addBookmark() {
    const tab = current();
    if (!tab || tab.url === HOME) {
      $("statustext").textContent =
        "Open a website before bookmarking it.";
      return;
    }

    const existing = bookmarks.findIndex(function (b) {
      return b.url === tab.url;
    });

    if (existing >= 0) {
      bookmarks.splice(existing, 1);
      $("statustext").textContent = "Bookmark removed";
    } else {
      bookmarks.unshift({
        title: tab.title || titleFromUrl(tab.url),
        url: tab.url
      });
      $("statustext").textContent = "Bookmark saved";
    }

    save();
    render();
  }

  $("go").addEventListener("click", function () {
    submitAddress($("address").value);
  });

  $("address").addEventListener("keydown", function (event) {
    if (event.key === "Enter") submitAddress($("address").value);
  });

  $("homesearch").addEventListener("submit", function (event) {
    event.preventDefault();
    const value = $("homeinput").value.trim();
    if (value) submitAddress(value);
  });

  $("back").addEventListener("click", back);
  $("forward").addEventListener("click", forward);
  $("refresh").addEventListener("click", refresh);
  $("homebtn").addEventListener("click", showHome);
  $("newtab").addEventListener("click", function () {
    newTab();
  });
  $("star").addEventListener("click", addBookmark);

  $("openexternal").addEventListener("click", function () {
    const url = lastExternal;
    if (safeUrl(url)) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  });

  $("returnhome").addEventListener("click", showHome);

  $("viewer").addEventListener("load", function () {
    const tab = current();
    if (tab && tab.url !== HOME) {
      $("statustext").textContent =
        "Website loaded if supported by the destination.";
    }
  });

  document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "l") {
      event.preventDefault();
      $("address").focus();
      $("address").select();
    }

    if ((event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "t") {
      event.preventDefault();
      newTab();
    }

    if ((event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "w" && tabs.length > 1) {
      event.preventDefault();
      closeTab(activeId);
    }
  });

  loadSaved();
  newTab();
})();
</script>
</body>
</html>`);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Orbit Browser running on port " + PORT);
});
