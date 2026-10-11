# CVM Power Controls — Landing Page

A responsive, static HTML/CSS/JavaScript landing page designed to generate product and service enquiries.

## Files
- `index.html` — page content and form
- `styles.css` — responsive design and styling
- `cvm-logo-mark.svg` — temporary vector interpretation of the circular symbol visible on the supplied Justdial signboard; replace it with the company’s original logo artwork when provided
- `script.js` — mobile navigation, product prefill, validation, call/WhatsApp links, email submission
- `README.md` — setup and launch instructions

## 1. Preview locally
1. Extract the ZIP.
2. Open `index.html` in a browser.
3. For a more production-like local preview, use VS Code's Live Server extension or run `python -m http.server 8000` from this folder and visit `http://localhost:8000`.

The page can render locally without a build step.

## 2. Configure the client's real contact details (required)
Open `script.js` and edit the `CONFIG` object:

```js
const CONFIG = {
  businessName: "CVM Power Controls",
  phoneDisplay: "+91 98765 43210",
  phoneDial: "+919876543210",
  whatsappNumber: "919876543210",
  enquiryEmail: "enquiries@example.com",
  formSubmitEndpoint: "https://formsubmit.co/ajax/"
};
```

Replace every example with the contact details confirmed by the business owner:
- `phoneDisplay`: formatted phone number shown on the page.
- `phoneDial`: number in international dial format for click-to-call.
- `whatsappNumber`: country code + phone number, digits only, without `+`, spaces or hyphens.
- `enquiryEmail`: an email inbox controlled by the client and monitored for new leads.

**Do not publish the example phone number or example email.** If the client has not confirmed these details, leave them blank and the page will avoid pretending that the contact links work.

## 3. Email enquiry integration
The form submits JSON to FormSubmit.co's AJAX endpoint. This is a third-party service, so check its current terms, privacy/security practices, spam controls, availability, and suitability for the client before using it in production.

Typical activation steps:
1. Set `CONFIG.enquiryEmail` to the confirmed client inbox.
2. Deploy the website to a public HTTPS URL.
3. Submit a real test enquiry using your own test data.
4. Check the inbox (including spam/junk) for any FormSubmit activation/confirmation request and complete it.
5. Submit another test enquiry and verify that the message arrives with all fields.
6. Test error handling by temporarily using an invalid email, then restore the correct setting.
7. Get the client's approval for the email delivery workflow and privacy notice.

The page deliberately reports that delivery is not configured when the email is blank. Browser-only HTML/JS cannot safely store leads in a private database or send email through a private SMTP account. If the client requires guaranteed delivery, lead history, access controls, anti-spam/rate limits, or CRM integration, add a serverless/backend endpoint (for example, a server-side function with an email provider) instead of putting secret keys in JavaScript.

## 4. WhatsApp and phone
Once numbers are configured:
- Call buttons use `tel:`.
- WhatsApp opens a prefilled conversation via `wa.me`.
- The customer still needs to press Send in WhatsApp. This does not automatically submit a lead to a database.

## 5. Domain and hosting
The client needs to purchase a domain from a reputable registrar and hosting with HTTPS. The domain name is not reserved by this project. Potential names to check for availability (not guaranteed available or trademark-cleared):
- `cvmpowercontrols.in`
- `cvmpowercontrols.com`
- `cvmcontrols.in`

Before purchase, confirm the preferred spelling with the owner, check domain availability and renewal pricing, and check relevant trademark/business-name conflicts. The domain registrar and hosting provider are separate decisions.

For simple static hosting, options include Netlify, Cloudflare Pages, GitHub Pages, or a standard hosting provider. Use the provider's current official instructions for connecting the domain, setting DNS records, and enabling HTTPS. Do not share registrar passwords with the developer; invite them with appropriate limited access if needed.

## 6. Confirm these items with the client before launch
- Correct legal/trading name and logo.
- Primary business phone, WhatsApp number and monitored enquiry email.
- Correct business address: public listings show a Church Street, Chittoor address and a separate Bangarupalem address. Confirm which is current and whether the second is a workshop/branch.
- Product list: starter panels, automatic control panels, changeover panels, meter boxes, APFC panels, energy meter panels, PCC/VCB panels and any repair services.
- Whether they manufacture, supply, install, commission or repair each product.
- Service area, delivery/installation coverage and operating hours.
- Original logo file (preferably SVG/PNG with transparent background) and owner approval for its use.
- Real product photographs for each product category, with permission to publish them on the website.
- Technical claims, certifications, standards, warranties and experience claims (do not publish unverified claims).
- Privacy notice and who will respond to enquiries.
- Who owns the domain, hosting and website source files.

## 7. Before you hand it over
- [ ] Test at phone, tablet and desktop widths.
- [ ] Verify every navigation link and product enquiry button.
- [ ] Confirm valid and invalid form inputs.
- [ ] Test email activation and receipt with the client.
- [ ] Test click-to-call on a phone.
- [ ] Test WhatsApp prefilled message on a phone.
- [ ] Replace illustrative stock images with approved client photos where possible.
- [ ] Check page title, description, favicon, social preview and domain.
- [ ] Publish a privacy notice and cookie notice if applicable to the actual tools deployed.
- [ ] Confirm that the client owns the domain, hosting and enquiry inbox.
- [ ] Add analytics only after agreeing on the tool and privacy approach.

## Notes
- The page currently references photos from CVM Power Controls' Justdial gallery. They are temporary references only: confirm reuse permission, and replace them with the business owner's original product photographs before launch. The logo mark is a visual approximation based on the signboard in the supplied screenshot, not a verified original logo file. Replace it with the exact logo artwork supplied by the business owner.
- Business details were drafted from public listing information and require owner confirmation.
- This is a static site; no database, CRM or admin dashboard is included.
