/* =========================================================
   Smart Dog Training School — site interactions
   Vanilla JS, no dependencies.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Current year ---------- */
  function setYear() {
    var nodes = document.querySelectorAll("[data-year]");
    var year = String(new Date().getFullYear());
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = year;
  }

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav__toggle");
    var menu = document.getElementById("primary-menu");
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Mobile: tapping a parent item opens its submenu instead of navigating.
    var parents = menu.querySelectorAll(".has-dropdown > .nav__link");
    for (var i = 0; i < parents.length; i++) {
      parents[i].addEventListener("click", function (e) {
        if (window.innerWidth > 880) return;
        var li = this.parentNode;
        if (!li.classList.contains("is-open")) {
          e.preventDefault();
          li.classList.add("is-open");
        }
      });
    }

    menu.addEventListener("click", function (e) {
      var link = e.target.closest ? e.target.closest("a") : null;
      if (link && !link.parentNode.classList.contains("has-dropdown")) close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 880) close();
    });
  }

  /* ---------- Header shadow on scroll + back to top ---------- */
  function initScrollUi() {
    var header = document.querySelector(".header");
    var toTop = document.querySelector(".to-top");
    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (header) header.classList.toggle("is-scrolled", y > 8);
      if (toTop) toTop.classList.toggle("is-visible", y > 520);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toTop) {
      toTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      });
    }
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add("is-in");
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
          window.setTimeout(function () {
            el.classList.add("is-in");
          }, delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    for (var j = 0; j < items.length; j++) io.observe(items[j]);
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;

    function run(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      if (isNaN(target)) return;
      if (reduceMotion) {
        el.textContent = target + suffix;
        return;
      }
      var duration = 1400;
      var start = null;
      function frame(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) window.requestAnimationFrame(frame);
      }
      window.requestAnimationFrame(frame);
    }

    if (!("IntersectionObserver" in window)) {
      for (var i = 0; i < nums.length; i++) run(nums[i]);
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          run(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    for (var k = 0; k < nums.length; k++) io.observe(nums[k]);
  }

  /* ---------- Contact form (no backend: opens a prefilled email) ---------- */
  function initForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("form-status");

    function show(msg, ok) {
      if (!status) return;
      status.textContent = msg;
      status.className = "form-status is-visible " + (ok ? "is-ok" : "is-err");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var service = (data.get("service") || "").toString().trim();
      var dog = (data.get("dog") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        show("Please add your name, email, and a short message so we can help.", false);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        show("That email address doesn't look right — please double-check it.", false);
        return;
      }

      var lines = [
        "Name: " + name,
        "Email: " + email,
        "Phone: " + (phone || "Not provided"),
        "Service of interest: " + (service || "Not specified"),
        "Dog (breed / age): " + (dog || "Not provided"),
        "",
        message
      ];

      var href =
        "mailto:steve.delarosa18@gmail.com" +
        "?subject=" +
        encodeURIComponent("Training enquiry from " + name) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));

      window.location.href = href;
      show(
        "Thanks, " +
          name.split(" ")[0] +
          "! Your email app is opening with the details ready to send. Prefer to talk now? Call (661) 547-8165.",
        true
      );
      form.reset();
    });
  }

  function init() {
    setYear();
    initNav();
    initScrollUi();
    initReveal();
    initCounters();
    initForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
