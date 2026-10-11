/*
 * CVM Power Controls landing page
 * IMPORTANT: Set the contact details and enquiry email in CONFIG below before launch.
 * Email submissions use FormSubmit.co (third-party email form service).
 * First submission may require confirmation from the destination inbox.
 */
const CONFIG = {
  businessName: "CVM Power Controls",
  phoneDisplay: "",       // Example: "+91 98765 43210" — replace with client's confirmed number
  phoneDial: "",          // Example: "+919876543210" — digits with country code
  whatsappNumber: "",     // Example: "919876543210" — country code + number, no +, spaces or dashes
  enquiryEmail: "",       // Replace with an inbox the business controls; required for email form delivery
  formSubmitEndpoint: "https://formsubmit.co/ajax/" // No changes usually needed
};

const $ = (selector, root = document) => root.querySelector(selector);
const form = $("#enquiryForm");
const message = $("#formMessage");
const submitButton = $(".submit-button");
const submitText = $("#submitText");
const phoneLabel = $("#phoneLabel");
const callLink = $("#callLink");
const whatsappLink = $("#whatsappLink");

$("#year").textContent = new Date().getFullYear();

function setMessage(text, type) {
  message.textContent = text;
  message.className = `form-message show ${type}`;
}
function digitsOnly(value) { return (value || "").replace(/\D/g, ""); }

function configureContactLinks() {
  if (CONFIG.phoneDial) {
    callLink.href = `tel:${CONFIG.phoneDial}`;
    phoneLabel.textContent = CONFIG.phoneDisplay || CONFIG.phoneDial;
  } else {
    callLink.href = "#enquiry";
    phoneLabel.textContent = "Phone number to be confirmed";
    callLink.addEventListener("click", (event) => {
      if (!CONFIG.phoneDial) {
        event.preventDefault();
        document.querySelector("#phone").focus();
        setMessage("The business phone number has not been configured yet. Please use the enquiry form after the owner confirms the contact details.", "error");
      }
    });
  }
  if (CONFIG.whatsappNumber) {
    const greeting = encodeURIComponent("Hello CVM Power Controls, I would like to enquire about your electrical control panel solutions.");
    whatsappLink.href = `https://wa.me/${digitsOnly(CONFIG.whatsappNumber)}?text=${greeting}`;
  } else {
    whatsappLink.href = "#enquiry";
    whatsappLink.removeAttribute("target");
    whatsappLink.addEventListener("click", (event) => {
      if (!CONFIG.whatsappNumber) {
        event.preventDefault();
        document.querySelector("#phone").focus();
        setMessage("The business WhatsApp number has not been configured yet. Please ask the owner for the correct number before launch.", "error");
      }
    });
  }
}
configureContactLinks();

const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.querySelectorAll(".select-product").forEach(button => {
  button.addEventListener("click", () => {
    $("#product").value = button.dataset.product;
    $("#enquiry").scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => $("#name").focus({ preventScroll: true }), 500);
  });
});

function validateForm() {
  const name = $("#name").value.trim();
  const phone = $("#phone").value.trim();
  const phoneDigits = digitsOnly(phone);
  if (name.length < 2) return "Please enter your full name.";
  if (phoneDigits.length < 10 || phoneDigits.length > 13) return "Please enter a valid phone number, including country code if applicable.";
  if (!$("#product").value) return "Please select the product or service you need.";
  if (!$("#consent").checked) return "Please confirm that the business may contact you about this enquiry.";
  const email = $("#email").value.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address or leave it blank.";
  return "";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const validationError = validateForm();
  if (validationError) {
    setMessage(validationError, "error");
    return;
  }

  // No destination email means we cannot claim that the form has been delivered.
  if (!CONFIG.enquiryEmail || !CONFIG.enquiryEmail.includes("@")) {
    setMessage("The enquiry form is ready, but email delivery is not configured yet. Ask the site owner to add the client's confirmed enquiry email in script.js before publishing.", "error");
    return;
  }

  const originalText = submitText.textContent;
  submitButton.disabled = true;
  submitText.textContent = "Sending…";
  message.className = "form-message";

  const formData = new FormData(form);
  const payload = {
    name: formData.get("name").trim(),
    phone: formData.get("phone").trim(),
    email: formData.get("email").trim(),
    product: formData.get("product"),
    details: formData.get("details").trim() || "No additional details provided",
    preferred_contact: formData.get("contactMethod"),
    _subject: `New website enquiry — ${formData.get("product")}`,
    _template: "table",
    _captcha: "true"
  };

  try {
    const response = await fetch(`${CONFIG.formSubmitEndpoint}${encodeURIComponent(CONFIG.enquiryEmail)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok || result.success === "false" || result.success === false) {
      throw new Error(result.message || "The email service did not accept the enquiry.");
    }
    form.reset();
    setMessage("Thank you. Your enquiry has been submitted. If this is the first submission, check the configured inbox for a FormSubmit confirmation email.", "success");
  } catch (error) {
    setMessage("We couldn't confirm delivery of your enquiry. Please try again later or contact the business directly. No submission is shown as successful unless the email service confirms it.", "error");
  } finally {
    submitButton.disabled = false;
    submitText.textContent = originalText;
  }
});
