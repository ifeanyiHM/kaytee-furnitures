// lib/email.ts
// Replace Resend with Nodemailer. Install: npm install nodemailer @types/nodemailer

import nodemailer from "nodemailer";

// ─── Transporter ────────────────────────────────────────────────────────────
// Works with Gmail, Outlook, custom SMTP, Zoho, etc.
// For Gmail: enable "App Passwords" in your Google account and use that as SMTP_PASS
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g. smtp.gmail.com
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE !== "false", // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER, // your email address
    pass: process.env.SMTP_PASS, // app password or SMTP password
  },
});

const FROM_NAME = "kaytee Furnitures"; // Display name for the sender
const FROM_EMAIL = process.env.SMTP_USER || "hello@kayteefurnitures.com";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "hello@kayteefurnitures.com";
const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://kayteefurnitures.com";

// ─── Brand colors (mirrors CSS theme) ───────────────────────────────────────
const BRAND = {
  charcoal: "#111111",
  charcoalLight: "#1e1e1e",
  brand600: "#8c6a3f",
  brand400: "#b8956a",
  brand100: "#ede6da",
  sand50: "#fdfaf6",
  sand100: "#f5efe6",
  sand200: "#ede0cc",
  muted: "#6b7280",
  white: "#ffffff",
};

// ─── Base HTML shell ─────────────────────────────────────────────────────────
function emailShell(content: string, previewText = ""): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Kaytee Furnitures</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: ${BRAND.sand50}; font-family: 'Inter', Arial, sans-serif; -webkit-font-smoothing: antialiased; }
    a { color: ${BRAND.brand600}; text-decoration: none; }
    img { display: block; max-width: 100%; }
  </style>
</head>
<body style="background-color:${BRAND.sand50};margin:0;padding:0;">
  ${previewText ? `<div style="display:none;max-height:0;overflow:hidden;font-size:1px;color:${BRAND.sand50};">${previewText}</div>` : ""}

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:${BRAND.sand50};padding:40px 0px;">
    <tr>
      <td align="center">
        <!-- Email container -->
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;">

          <!-- ── Header ── -->
          <tr>
            <td style="background-color:${BRAND.charcoal};padding:36px 48px;border-radius:12px 12px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td>
                    <!-- Logo mark -->
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td>
                          <img
                            src="http://localhost:3000/logo.png"
                            alt="Kaytee Furnitures"
                            width="180"
                            height="48"
                            style="display:block;width:180px;height:48px;"
                        />
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="font-family:'Inter',Arial,sans-serif;font-size:10px;color:rgba(255,255,255,0.3);letter-spacing:0.2em;text-transform:uppercase;">Lagos, Nigeria</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Brand accent line ── -->
          <tr>
            <td style="background:linear-gradient(90deg,${BRAND.brand600} 0%,${BRAND.brand400} 100%);height:2px;"></td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="background-color:${BRAND.white};padding:48px;border-radius:0 0 12px 12px;">
              ${content}
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="padding:32px 48px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="border-top:1px solid ${BRAND.sand200};padding-top:24px;">
                    <p style="font-family:'Inter',Arial,sans-serif;font-size:11px;color:${BRAND.muted};line-height:1.6;margin-bottom:8px;">
                      kaytee Furnitures Ltd · 14 Design Boulevard, Victoria Island, Lagos
                    </p>
                    <p style="font-family:'Inter',Arial,sans-serif;font-size:11px;color:${BRAND.muted};line-height:1.6;">
                      <a href="${SITE_URL}" style="color:${BRAND.brand600};">kayteefurnitures.com</a> &nbsp;·&nbsp;
                      <a href="mailto:hello@kayteefurnitures.com" style="color:${BRAND.brand600};">hello@kayteefurnitures.com</a> &nbsp;·&nbsp;
                      +234 801 234 5678
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bottom spacing -->
          <tr><td style="height:40px;"></td></tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Reusable section components ─────────────────────────────────────────────
function sectionHeading(text: string): string {
  return `<p style="font-family:'Inter',Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${BRAND.brand600};margin-bottom:16px;">${text}</p>`;
}

function divider(): string {
  return `<div style="height:1px;background-color:${BRAND.sand100};margin:32px 0;"></div>`;
}

function messagePreviewBox(message: string): string {
  return `
    <div style="background-color:${BRAND.sand50};border-left:3px solid ${BRAND.brand400};border-radius:0 8px 8px 0;padding:20px 24px;margin-top:8px;">
      <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:17px;font-style:italic;color:${BRAND.charcoal};line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
    </div>`;
}

function metaRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.sand100};" width="35%">
        <span style="font-family:'Inter',Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.muted};">${label}</span>
      </td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid ${BRAND.sand100};">
        <span style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:${BRAND.charcoal};">${escapeHtml(value)}</span>
      </td>
    </tr>`;
}

function ctaButton(text: string, href: string): string {
  return `
    <table cellpadding="0" cellspacing="0" role="presentation" style="margin-top:32px;">
      <tr>
        <td style="background-color:${BRAND.brand600};border-radius:10px;">
          <a href="${href}" style="display:inline-block;font-family:'Inter',Arial,sans-serif;font-size:13px;font-weight:500;color:${BRAND.white};letter-spacing:0.05em;padding:14px 28px;text-decoration:none;">${text}</a>
        </td>
      </tr>
    </table>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── 1. Contact form — client confirmation ───────────────────────────────────
function buildContactClientEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): string {
  const content = `
    <!-- Greeting -->
    <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:36px;font-weight:400;color:${BRAND.charcoal};line-height:1.1;letter-spacing:-0.02em;margin-bottom:16px;">
      Thank you, ${escapeHtml(data.name.split(" ")[0])}.
    </h1>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:${BRAND.muted};line-height:1.7;margin-bottom:0;">
      We've received your message and will get back to you within 24 hours — usually sooner.
    </p>

    ${divider()}

    <!-- Message preview -->
    ${sectionHeading("Your message")}
    <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;font-weight:600;color:${BRAND.charcoal};margin-bottom:12px;">${escapeHtml(data.subject)}</p>
    ${messagePreviewBox(data.message)}

    ${divider()}

    <!-- Your details -->
    ${sectionHeading("Your details")}
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      ${metaRow("Name", data.name)}
      ${metaRow("Email", data.email)}
      ${data.phone ? metaRow("Phone", data.phone) : ""}
    </table>

    ${divider()}

    <!-- What's next -->
    ${sectionHeading("What happens next")}
    <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
      ${[
        "A member of our team will review your message personally.",
        "You'll hear from us within 24 hours — weekdays, 9am–6pm WAT.",
        "If your enquiry is project-related, we'll suggest a free consultation call.",
      ]
        .map(
          (step, i) => `
        <tr>
          <td width="32" style="vertical-align:top;padding-top:2px;">
            <div style="width:22px;height:22px;background-color:${BRAND.brand100};border-radius:50%;text-align:center;line-height:22px;">
              <span style="font-family:'Inter',Arial,sans-serif;font-size:9px;font-weight:600;color:${BRAND.brand600};">${String(i + 1).padStart(2, "0")}</span>
            </div>
          </td>
          <td style="padding:0 0 16px 12px;">
            <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:${BRAND.charcoal};line-height:1.6;">${step}</p>
          </td>
        </tr>`,
        )
        .join("")}
    </table>

    ${ctaButton("Visit our website", SITE_URL)}

    <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:16px;font-style:italic;color:${BRAND.muted};margin-top:40px;">
      — The Kaytee Furnitures Team
    </p>`;

  return emailShell(
    content,
    `We've received your message and will reply within 24 hours.`,
  );
}

// ─── 2. Contact form — admin notification ───────────────────────────────────
function buildContactAdminEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): string {
  const content = `
    <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:30px;font-weight:400;color:${BRAND.charcoal};margin-bottom:8px;">
      New contact enquiry
    </h1>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:${BRAND.muted};margin-bottom:0;">
      Submitted via the website contact form.
    </p>

    ${divider()}

    ${sectionHeading("From")}
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      ${metaRow("Name", data.name)}
      ${metaRow("Email", data.email)}
      ${data.phone ? metaRow("Phone", data.phone) : ""}
      ${metaRow("Subject", data.subject)}
    </table>

    ${divider()}

    ${sectionHeading("Message")}
    ${messagePreviewBox(data.message)}

    ${ctaButton("Reply to enquiry", `mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}`)}`;

  return emailShell(content, `New enquiry from ${data.name} — ${data.subject}`);
}

// ─── 3. Consultation form — client confirmation ──────────────────────────────
function buildConsultationClientEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceName: string;
  budget?: string;
  spaceSize?: string;
  preferredDate?: string;
  description: string;
}): string {
  const content = `
    <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:36px;font-weight:400;color:${BRAND.charcoal};line-height:1.1;letter-spacing:-0.02em;margin-bottom:16px;">
      Request received, ${escapeHtml(data.firstName)}.
    </h1>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:${BRAND.muted};line-height:1.7;margin-bottom:0;">
      Your consultation request is in. A dedicated design lead will call you within 24 hours to discuss your project.
    </p>

    ${divider()}

    <!-- Project summary -->
    ${sectionHeading("Your project brief")}
    ${messagePreviewBox(data.description)}

    ${divider()}

    <!-- Booking details -->
    ${sectionHeading("Consultation details")}
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      ${metaRow("Service", data.serviceName)}
      ${data.budget ? metaRow("Budget range", data.budget) : ""}
      ${data.spaceSize ? metaRow("Space size", data.spaceSize) : ""}
      ${data.preferredDate ? metaRow("Preferred date", data.preferredDate) : ""}
      ${metaRow("Phone", data.phone)}
      ${metaRow("Email", data.email)}
    </table>

    ${divider()}

    <!-- Timeline -->
    ${sectionHeading("What happens next")}
    <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
      ${[
        {
          step: "01",
          label: "Design lead review",
          desc: "A senior designer reviews your brief before reaching out — so the first call is already informed.",
        },
        {
          step: "02",
          label: "Call within 24 hours",
          desc: "Expect a call on the number you provided. If we miss you, we'll leave a message and follow up by email.",
        },
        {
          step: "03",
          label: "Detailed quote within 48h",
          desc: "After the call, you'll receive a clear, itemised quote with no obligation to proceed.",
        },
        {
          step: "04",
          label: "Consultation begins",
          desc: "Virtual or in-person — we'll schedule at a time that suits you.",
        },
      ]
        .map(
          ({ step, label, desc }) => `
        <tr>
          <td width="40" style="vertical-align:top;padding-top:3px;padding-bottom:24px;">
            <div style="width:26px;height:26px;background-color:${BRAND.brand100};border-radius:50%;text-align:center;line-height:26px;">
              <span style="font-family:'Inter',Arial,sans-serif;font-size:9px;font-weight:600;color:${BRAND.brand600};">${step}</span>
            </div>
          </td>
          <td style="padding-bottom:24px;">
            <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;font-weight:600;color:${BRAND.charcoal};margin-bottom:4px;">${label}</p>
            <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:${BRAND.muted};line-height:1.6;">${desc}</p>
          </td>
        </tr>`,
        )
        .join("")}
    </table>

    <!-- Portfolio CTA -->
    <div style="background-color:${BRAND.sand50};border-radius:10px;padding:24px;margin-top:8px;">
      <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:20px;color:${BRAND.charcoal};margin-bottom:8px;">While you wait…</p>
      <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:${BRAND.muted};line-height:1.6;margin-bottom:16px;">Browse our portfolio to see what we've created for clients across Lagos and beyond.</p>
      ${ctaButton("Explore our portfolio", `${SITE_URL}/portfolio`)}
    </div>

    <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:16px;font-style:italic;color:${BRAND.muted};margin-top:40px;">
      — The Kaytee Furnitures Team
    </p>`;

  return emailShell(
    content,
    `Your consultation request has been received. A design lead will call within 24 hours.`,
  );
}

// ─── 4. Consultation form — admin notification ───────────────────────────────
function buildConsultationAdminEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceName: string;
  budget?: string;
  spaceSize?: string;
  preferredDate?: string;
  description: string;
}): string {
  const content = `
    <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:30px;font-weight:400;color:${BRAND.charcoal};margin-bottom:8px;">
      New consultation request
    </h1>
    <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:${BRAND.muted};margin-bottom:0;">
      ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)} submitted a booking via the website.
    </p>

    ${divider()}

    ${sectionHeading("Client details")}
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      ${metaRow("Name", `${data.firstName} ${data.lastName}`)}
      ${metaRow("Email", data.email)}
      ${metaRow("Phone", data.phone)}
      ${metaRow("Service", data.serviceName)}
      ${data.budget ? metaRow("Budget", data.budget) : ""}
      ${data.spaceSize ? metaRow("Space size", data.spaceSize) : ""}
      ${data.preferredDate ? metaRow("Preferred date", data.preferredDate) : ""}
    </table>

    ${divider()}

    ${sectionHeading("Project description")}
    ${messagePreviewBox(data.description)}

    ${ctaButton("Call client", `tel:${data.phone.replace(/\s/g, "")}`)}`;

  return emailShell(
    content,
    `New booking: ${data.firstName} ${data.lastName} — ${data.serviceName}`,
  );
}

// ─── Public send functions ───────────────────────────────────────────────────

export async function sendContactEmails(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  await Promise.all([
    // Confirmation to client
    transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: data.email,
      subject: `We've received your message — ${data.subject}`,
      html: buildContactClientEmail(data),
    }),
    // Notification to admin
    transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      replyTo: data.email,
      subject: `[Contact] ${data.name} — ${data.subject}`,
      html: buildContactAdminEmail(data),
    }),
  ]);
}

export async function sendConsultationEmails(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceName: string;
  budget?: string;
  spaceSize?: string;
  preferredDate?: string;
  description: string;
}) {
  await Promise.all([
    // Confirmation to client
    transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: data.email,
      subject: `Your ${data.serviceName} consultation request — Kaytee Furnitures`,
      html: buildConsultationClientEmail(data),
    }),
    // Notification to admin
    transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      replyTo: data.email,
      subject: `[Booking] ${data.firstName} ${data.lastName} — ${data.serviceName}`,
      html: buildConsultationAdminEmail(data),
    }),
  ]);
}
