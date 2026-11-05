// Booking form.
// To receive requests by email: create a free form at https://formspree.io,
// then paste its endpoint below (looks like https://formspree.io/f/abcdwxyz).
// Until then, the form builds a text message the customer can copy and send.
var FORM_ENDPOINT = "https://formspree.io/f/xvkkvlnz";
var BUSINESS_PHONE = "(760) 415-2208";

(function () {
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Time-limited promos remove themselves once their data-ends date passes.
  var now = Date.now();
  document.querySelectorAll("[data-ends]").forEach(function (el) {
    if (now >= Date.parse(el.getAttribute("data-ends"))) el.remove();
  });

  var form = document.getElementById("booking");
  if (!form) return;
  var msg = document.getElementById("form-msg");
  var submit = document.getElementById("submit");
  var fallback = document.getElementById("fallback");
  var fallbackText = document.getElementById("fallback-text");
  var copied = document.getElementById("copied");

  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }
  function show(text, kind) { msg.textContent = text; msg.className = "form-msg" + (kind ? " " + kind : ""); msg.hidden = false; }

  function asText() {
    var lines = [
      "Repair request from " + val("name") + " (" + val("phone") + ")",
      "Bike: " + val("bike"),
      "Needs: " + val("job"),
      "Town: " + val("town"),
      "Best time: " + (val("when") || "Flexible")
    ];
    if (val("details")) lines.push("Details: " + val("details"));
    return lines.join("\n");
  }

  function showFallback() {
    msg.hidden = true;
    fallbackText.textContent = asText();
    fallback.hidden = false;
    copied.hidden = true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    fallback.hidden = true;
    if (val("company")) return; // spam trap
    var missing = [];
    if (!val("name")) missing.push("your name");
    if (!val("phone")) missing.push("a mobile number");
    if (!val("bike")) missing.push("your bike model");
    if (missing.length) { show("Please add " + missing.join(", ") + ".", "err"); return; }

    if (!FORM_ENDPOINT) { showFallback(); return; }

    submit.disabled = true;
    show("Sending…");
    fetch(FORM_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error("bad status");
        form.reset();
        show("Got it. We'll text you a quote shortly.", "ok");
      })
      .catch(function () {
        showFallback();
      })
      .then(function () { submit.disabled = false; });
  });

  document.getElementById("copy").addEventListener("click", function () {
    function selectIt() {
      var r = document.createRange(); r.selectNodeContents(fallbackText);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    }
    try {
      navigator.clipboard.writeText(fallbackText.textContent).then(function () { copied.hidden = false; }, selectIt);
    } catch (err) { selectIt(); }
  });
})();
