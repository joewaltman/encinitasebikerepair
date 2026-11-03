# Encinitas E-Bike Repair site

Plain HTML/CSS/JS. No build step. Upload the folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

## Before going live

1. **Name and contact.** The phone number is set to `(760) 415-2208`. Replace "Encinitas E-Bike Repair" and `willwaltman12@gmail.com` in all three HTML files if they change.
2. **Booking form.** Connected to Formspree (`FORM_ENDPOINT` in `script.js`). Requests are emailed to the address on that Formspree account. If Formspree is ever unreachable, the form falls back to a copy-and-text message.
3. **Policies.** Check that the hours, payment methods, 30-day labor warranty, 2-hour cancellation window and record-keeping times in `terms.html` and `privacy.html` match how you actually run things. If you add analytics or a different payment or form service, update the "Who we share it with" and "Cookies" sections.
4. **Domain.** Add `<link rel="canonical">` and a `"url"` to the JSON-LD block in `index.html` once you have a domain.
