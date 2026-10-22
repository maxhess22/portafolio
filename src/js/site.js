(function () {
  var root = document.documentElement;
  var themeToggle = document.querySelector("[data-theme-toggle]");
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navPanel = document.querySelector("[data-nav-panel]");
  var desktopQuery = window.matchMedia("(min-width: 64rem)");

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  function applyTheme(theme) {
    var dark = theme === "dark";
    root.setAttribute("data-theme", theme);
    if (!themeToggle) return;
    themeToggle.setAttribute("aria-pressed", dark ? "true" : "false");
    themeToggle.setAttribute("aria-label", dark ? "Activar tema claro" : "Activar tema oscuro");
  }

  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch (error) {
        /* El sitio sigue usable si el almacenamiento está bloqueado. */
      }
      applyTheme(next);
    });
  }

  function setNavOpen(open) {
    if (!navToggle || !navPanel) return;
    var show = open && !desktopQuery.matches;
    navPanel.classList.toggle("is-open", show);
    navToggle.setAttribute("aria-expanded", show ? "true" : "false");
    var label = navToggle.querySelector("[data-nav-label]");
    if (label) label.textContent = show ? "Cerrar" : "Menú";
    document.body.classList.toggle("has-nav-open", show);
  }

  if (navToggle && navPanel) {
    navToggle.addEventListener("click", function () {
      setNavOpen(navToggle.getAttribute("aria-expanded") !== "true");
    });

    navPanel.addEventListener("click", function (event) {
      if (event.target.closest("a")) setNavOpen(false);
    });

    document.addEventListener("click", function (event) {
      if (!navPanel.classList.contains("is-open")) return;
      if (navPanel.contains(event.target) || navToggle.contains(event.target)) return;
      setNavOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !navPanel.classList.contains("is-open")) return;
      setNavOpen(false);
      navToggle.focus();
    });

    desktopQuery.addEventListener("change", function () {
      setNavOpen(false);
    });
  }

  if (!navPanel || !("IntersectionObserver" in window)) return;

  var links = Array.prototype.slice.call(navPanel.querySelectorAll("a[href*='#']"));
  var sections = links
    .map(function (link) {
      var id = (link.getAttribute("href") || "").split("#")[1];
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      var visible = entries
        .filter(function (entry) {
          return entry.isIntersecting;
        })
        .sort(function (a, b) {
          return b.intersectionRatio - a.intersectionRatio;
        })[0];
      if (!visible) return;
      links.forEach(function (link) {
        var id = (link.getAttribute("href") || "").split("#")[1];
        if (id === visible.target.id) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
