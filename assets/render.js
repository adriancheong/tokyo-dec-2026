/* ─────────────────────────────────────────────────────────────
   Renders the TRIP object from /itinerary.js into the page.

   You shouldn't need to edit this to change the trip — only if
   you want to add a new kind of field to the itinerary.
   ───────────────────────────────────────────────────────────── */

(function () {
  "use strict";

  if (typeof TRIP === "undefined") {
    document.getElementById("week").innerHTML =
      "<p>The itinerary file didn't load. Check that <code>itinerary.js</code> " +
      "is sitting next to <code>index.html</code>.</p>";
    return;
  }

  /* escape anything that goes into innerHTML */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function telLink(tel) {
    var digits = String(tel).replace(/[^0-9+]/g, "");
    return '<a href="tel:' + esc(digits) + '">' + esc(tel) + "</a>";
  }

  /* A small pin, so it's obvious the name opens a map. */
  var PIN =
    '<svg class="pin" viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
    '<path d="M8 1.2c-2.5 0-4.5 2-4.5 4.5 0 3.3 4.5 9.1 4.5 9.1s4.5-5.8 4.5-9.1' +
    'c0-2.5-2-4.5-4.5-4.5zm0 6.3a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6z"/></svg>';

  /* Google Maps deep link. The place id opens the business card — hours,
     photos, a Directions button — rather than dropping a pin at a coordinate.
     Without a place id, a `map` search phrase still opens Google Maps on
     the right spot; with neither, the name stays plain text. */
  function mapLink(placeId, label, inner, query) {
    if (!placeId && !query) return inner;
    var href =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(query || label) +
      (placeId ? "&query_place_id=" + encodeURIComponent(placeId) : "");
    return (
      '<a class="maplink" href="' + esc(href) + '" target="_blank" rel="noopener"' +
      ' aria-label="' + esc(label) + ', open in Google Maps">' +
      inner + PIN + "</a>"
    );
  }

  function set(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  var STATUS_LABEL = {
    booked: "Booked",
    walkin: "Just turn up",
    tbc: "Being arranged",
    tobook: "To book",
    free: "Nothing planned",
    travel: "Travel",
    ride: "Riding",
  };

  function statusMark(status) {
    if (!status) return "";
    var label = STATUS_LABEL[status] || status;
    return '<span class="status ' + esc(status) + '">' + esc(label) + "</span>";
  }

  /* ── masthead ─────────────────────────────────────────── */

  set("city", esc(TRIP.city));
  set("dates", esc(TRIP.dates));
  set("standfirst", esc(TRIP.standfirst));
  document.title = TRIP.city + " · " + TRIP.dates;

  /* TRIP.stays: every hotel in date order, one compact row each.
     Takes over the masthead box; TRIP.base is the older single-hotel form. */
  if (TRIP.stays && TRIP.stays.length) {
    set(
      "base",
      '<p class="stays-label">Where we sleep</p>' +
      '<ol class="stays">' +
      TRIP.stays
        .map(function (s) {
          return (
            '<li class="stay">' +
            '<div class="stay-when">' + esc(s.when) +
              (s.nights ? "<span>" + esc(s.nights) + "</span>" : "") + "</div>" +
            '<div class="stay-what"><strong>' +
              mapLink(s.place, s.name, esc(s.name), s.map) + "</strong>" +
              (s.where ? "<p>" + esc(s.where) + "</p>" : "") +
              (s.cancel ? '<p class="stay-cancel">' + esc(s.cancel) + "</p>" : "") +
              (s.tel ? "<p>" + telLink(s.tel) + "</p>" : "") +
            "</div></li>"
          );
        })
        .join("") +
      "</ol>"
    );
  } else if (TRIP.base) {
    var b = TRIP.base;
    var baseHtml = "<strong>" + mapLink(b.place, b.name, esc(b.name), b.map) + "</strong>";
    if (b.address) baseHtml += esc(b.address);
    if (b.tel) baseHtml += "<p>" + telLink(b.tel) + "</p>";
    if (b.note) baseHtml += "<p>" + esc(b.note) + "</p>";
    set("base", baseHtml);
  }

  /* ── flights ──────────────────────────────────────────── */

  if (TRIP.flights && TRIP.flights.length) {
    set(
      "flights-rows",
      TRIP.flights
        .map(function (f) {
          return (
            '<div class="flight">' +
            '<div class="flight-code">' + esc(f.code) +
              '<span>' + esc(f.dir) + "</span></div>" +
            '<div class="flight-detail">' +
              "<strong>" + esc(f.route) + "</strong>" +
              '<p class="flight-times">' +
                esc(f.depart) + " &rarr; " + esc(f.arrive) +
              "</p>" +
              '<p class="flight-date">' + esc(f.date) + "</p>" +
            "</div></div>"
          );
        })
        .join("")
    );
  } else {
    document.getElementById("flights").hidden = true;
  }

  /* ── the fixed bookings ───────────────────────────────── */

  if (TRIP.locked && TRIP.locked.length) {
    if (TRIP.lockedTitle) set("locked-h", esc(TRIP.lockedTitle));
    set(
      "locked-rows",
      TRIP.locked
        .map(function (l) {
          return (
            '<div class="locked-row">' +
            '<div class="locked-when">' + esc(l.time) +
              "<span>" + esc(l.day) + "</span></div>" +
            '<div class="locked-what"><strong>' +
              mapLink(l.place, l.name, esc(l.name), l.map) + "</strong>" +
              (l.note ? "<p>" + esc(l.note) + "</p>" : "") +
            "</div></div>"
          );
        })
        .join("")
    );
  } else {
    document.getElementById("locked").hidden = true;
  }

  /* ── one meal ─────────────────────────────────────────── */

  function renderMeal(m) {
    var h = '<article class="meal">';

    /* time / slot / status */
    h += '<div class="meal-top">';
    if (m.time) h += '<span class="meal-time">' + esc(m.time) + "</span>";
    if (m.slot) h += '<span class="meal-slot">' + esc(m.slot) + "</span>";
    h += statusMark(m.status);
    h += "</div>";

    /* name — becomes a map link when the entry has a place id */
    h += "<h3>" + mapLink(m.place, m.name, esc(m.name), m.map);
    if (m.stars) h += '<span class="stars">' + "★".repeat(m.stars) + "</span>";
    if (m.jp) h += '<span class="jp">' + esc(m.jp) + "</span>";
    h += "</h3>";

    if (m.dish) h += '<p class="dish">' + esc(m.dish) + "</p>";

    /* practical facts, one per line — never joined with dots */
    var facts = [];
    if (m.where) facts.push(esc(m.where));
    if (m.walk) facts.push(esc(m.walk));
    if (m.tel) facts.push(telLink(m.tel));
    if (facts.length) {
      h += '<ul class="facts">';
      facts.forEach(function (f) { h += "<li>" + f + "</li>"; });
      h += "</ul>";
    }

    if (m.notes && m.notes.length) {
      h += '<ul class="notes">';
      m.notes.forEach(function (n) { h += "<li>" + esc(n) + "</li>"; });
      h += "</ul>";
    }

    if (m.menu) {
      var mu = m.menu;
      h += '<div class="menu"><h4>' + esc(mu.label || "What to order") + "</h4>";
      if (mu.intro) h += '<p class="intro">' + esc(mu.intro) + "</p>";
      h += "<dl>";
      (mu.items || []).forEach(function (it) {
        h += '<div class="row' + (it.pick ? " pick" : "") + '">';
        h += "<dt>" + esc(it.name);
        if (it.note) h += "<small>" + esc(it.note) + "</small>";
        h += "</dt>";
        h += "<dd>" + esc(it.price || "") + "</dd></div>";
      });
      h += "</dl>";
      if (mu.footnote) h += '<p class="foot">' + esc(mu.footnote) + "</p>";
      h += "</div>";
    }

    if (m.fallback) {
      h += '<div class="fallback"><strong>' + esc(m.fallback.label) + "</strong>" +
           "<p>" + esc(m.fallback.text) + "</p></div>";
    }

    if (m.why) h += '<p class="why">' + esc(m.why) + "</p>";

    return h + "</article>";
  }

  /* ── the week ─────────────────────────────────────────── */

  set(
    "week",
    (TRIP.days || [])
      .map(function (d) {
        var h = '<section class="day">';
        /* a date range such as "27–30" gets a smaller numeral so it fits */
        var numClass = String(d.date).length > 2 ? "num range" : "num";
        h += '<div class="day-mark" aria-hidden="true">' +
               '<span class="' + numClass + '">' + esc(d.date) + "</span>" +
               '<span class="mon">' + esc(d.month || "") + "</span></div>";
        h += "<div>";
        var heading = d.heading || (d.dow + " " + d.date + " " + (d.month || ""));
        h += '<div class="day-head"><h2>' + esc(heading) + "</h2>";
        if (d.area) h += '<p class="area">' + esc(d.area) + "</p>";
        if (d.aside) h += '<p class="aside">' + esc(d.aside) + "</p>";
        h += "</div>";
        h += (d.meals || []).map(renderMeal).join("");
        return h + "</div></section>";
      })
      .join("")
  );

  /* ── still to pin down ────────────────────────────────── */

  if (TRIP.floating) {
    if (TRIP.floatingTitle) set("floating-h", esc(TRIP.floatingTitle));
    var floats = [].concat(TRIP.floating);
    set("floating-body", floats.map(renderMeal).join(""));
  } else {
    document.getElementById("floating").hidden = true;
  }

  /* ── reference lists ──────────────────────────────────── */

  /* TRIP.refs: any number of two-column lists, each with its own title.
     [{ title: "…", rows: [{ label: "…", value: "…" }] }] */
  if (TRIP.refs && TRIP.refs.length) {
    set(
      "refs",
      TRIP.refs
        .map(function (r, i) {
          var hid = "ref-h-" + i;
          return (
            '<section class="ref" aria-labelledby="' + hid + '">' +
            '<h2 id="' + hid + '">' + esc(r.title) + "</h2>" +
            (r.intro ? '<p class="ref-intro">' + esc(r.intro) + "</p>" : "") +
            '<dl class="closures">' +
            (r.rows || [])
              .map(function (row) {
                return "<div><dt>" + esc(row.label) + "</dt><dd>" + esc(row.value) + "</dd></div>";
              })
              .join("") +
            "</dl></section>"
          );
        })
        .join("")
    );
  }

  set(
    "closures",
    (TRIP.closures || [])
      .map(function (c) {
        return "<div><dt>" + esc(c.name) + "</dt><dd>" + esc(c.closed) + "</dd></div>";
      })
      .join("")
  );

  set(
    "phones",
    (TRIP.phones || [])
      .map(function (p) {
        return "<div><dt>" + esc(p.name) + "</dt><dd>" + telLink(p.tel) + "</dd></div>";
      })
      .join("")
  );

  set(
    "footnotes",
    (TRIP.footnotes || []).map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("")
  );
})();
