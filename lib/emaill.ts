import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.FROM_EMAIL || "hello@luxeinteriors.com";
const SITE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function sendOrderConfirmation(order: {
  orderNumber: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
  user: { name?: string | null; email: string };
}) {
  const itemsHtml = order.items
    .map(i => `<tr><td>${i.name}</td><td>${i.quantity}</td><td>₦${i.price.toLocaleString()}</td></tr>`)
    .join("");

  await resend.emails.send({
    from: `Luxe Interiors <${FROM}>`,
    to: order.user.email,
    subject: `Order Confirmed — ${order.orderNumber}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#1C1917">Thank you, ${order.user.name ?? ""}!</h2>
        <p>Your order <strong>${order.orderNumber}</strong> has been confirmed.</p>
        <table border="0" cellpadding="8" style="width:100%;border-collapse:collapse">
          <thead><tr style="background:#F5EFE6"><th>Item</th><th>Qty</th><th>Price</th></tr></thead>
          <tbody>${itemsHtml}</tbody>
          <tfoot><tr><td colspan="2"><strong>Total</strong></td><td><strong>₦${order.total.toLocaleString()}</strong></td></tr></tfoot>
        </table>
        <p><a href="${SITE}/orders/${order.orderNumber}" style="color:#8C6A3F">Track your order →</a></p>
      </div>`,
  });
}

export async function sendBookingConfirmation(booking: {
  firstName: string;
  email: string;
  serviceName: string;
}) {
  await resend.emails.send({
    from: `Luxe Interiors <${FROM}>`,
    to: booking.email,
    subject: "Your consultation request has been received",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#1C1917">Hi ${booking.firstName}!</h2>
        <p>We've received your request for <strong>${booking.serviceName}</strong>.</p>
        <p>Our team will review your project details and reach out within 24 hours to schedule your consultation.</p>
        <p style="color:#8C6A3F;font-style:italic">— The Luxe Interiors Team</p>
      </div>`,
  });
}

export async function sendInquiryNotification(inquiry: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await resend.emails.send({
    from: `Luxe Interiors <${FROM}>`,
    to: process.env.ADMIN_EMAIL || FROM,
    subject: `New inquiry: ${inquiry.subject}`,
    html: `
      <div style="font-family:sans-serif">
        <h3>New Contact Inquiry</h3>
        <p><strong>From:</strong> ${inquiry.name} (${inquiry.email})</p>
        <p><strong>Subject:</strong> ${inquiry.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${inquiry.message}</p>
      </div>`,
  });
}
