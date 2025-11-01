import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.send("✅ Backend is running correctly");
});

// ===== SEND MAIL ROUTE =====
app.post("/sendMail", async (req, res) => {
  console.log("📩 Received mail request:", req.body);
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Highly Compatible Email Template
    const emailTemplate = (title, intro, details, footerNote) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0;padding:0;">
    <tr>
      <td align="center" style="padding:20px 0;">
        
        <!-- Main Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff;max-width:600px;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#0b132b;padding:30px 20px;">
              <img src="https://raw.githubusercontent.com/rauf-alluviam/paramount/main/assets/logo.png" alt="Logo" width="80" height="80" style="display:block;border-radius:50%;margin:0 auto 15px auto;">
              <h1 style="color:#ffffff;font-size:24px;margin:0;font-family:Arial,sans-serif;font-weight:bold;">Paramount Propack Pvt. Ltd.</h1>
            </td>
          </tr>
          
          <!-- Body Content -->
          <tr>
            <td style="padding:40px 30px;font-family:Arial,sans-serif;">
              <h2 style="color:#ec792b;font-size:20px;margin:0 0 20px 0;font-weight:bold;">${title}</h2>
              <div style="color:#333333;font-size:15px;line-height:1.8;margin-bottom:20px;">${intro}</div>
              
              ${details}
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:30px;">
                <tr>
                  <td align="center" style="background-color:#ec792b;border-radius:5px;">
                    <a href="https://paramountpropack.in" style="display:inline-block;padding:14px 30px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:bold;font-family:Arial,sans-serif;">Visit Our Website</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="background-color:#0b132b;color:#ffffff;padding:30px 20px;font-family:Arial,sans-serif;">
              <p style="margin:0 0 10px 0;font-size:14px;line-height:1.6;">
                &copy; 2025 Paramount Propack Pvt. Ltd.<br>
                Chhatral, Gujarat, India
              </p>
              ${footerNote ? `<p style="margin:0;font-size:12px;color:#cccccc;line-height:1.5;">${footerNote}</p>` : ''}
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
</body>
</html>
`;

    // ✅ Owner Email - With Styled Details
    const userDetails = `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:25px 0;border:1px solid #dddddd;border-collapse:collapse;">
  <tr>
    <td style="padding:12px 15px;background-color:#f8f9fa;border:1px solid #dddddd;font-weight:bold;color:#333333;font-family:Arial,sans-serif;width:35%;">Name</td>
    <td style="padding:12px 15px;background-color:#ffffff;border:1px solid #dddddd;color:#333333;font-family:Arial,sans-serif;">${name}</td>
  </tr>
  <tr>
    <td style="padding:12px 15px;background-color:#f8f9fa;border:1px solid #dddddd;font-weight:bold;color:#333333;font-family:Arial,sans-serif;">Email</td>
    <td style="padding:12px 15px;background-color:#ffffff;border:1px solid #dddddd;color:#333333;font-family:Arial,sans-serif;"><a href="mailto:${email}" style="color:#ec792b;text-decoration:none;">${email}</a></td>
  </tr>
  <tr>
    <td style="padding:12px 15px;background-color:#f8f9fa;border:1px solid #dddddd;font-weight:bold;color:#333333;font-family:Arial,sans-serif;">Phone</td>
    <td style="padding:12px 15px;background-color:#ffffff;border:1px solid #dddddd;color:#333333;font-family:Arial,sans-serif;"><a href="tel:${phone}" style="color:#ec792b;text-decoration:none;">${phone}</a></td>
  </tr>
  <tr>
    <td style="padding:12px 15px;background-color:#f8f9fa;border:1px solid #dddddd;font-weight:bold;color:#333333;font-family:Arial,sans-serif;vertical-align:top;">Message</td>
    <td style="padding:12px 15px;background-color:#ffffff;border:1px solid #dddddd;color:#333333;font-family:Arial,sans-serif;">${message || '<span style="color:#999999;font-style:italic;">(No message provided)</span>'}</td>
  </tr>
</table>
`;

    const ownerMail = {
      from: `"Paramount Website" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: "📩 New Quote Request from Paramount Website",
      html: emailTemplate(
        "New Quote Request Received",
        "A new customer has submitted a quote request through your website. Here are the details:",
        userDetails,
        
      ),
    };

    // ✅ User Acknowledgement Email
    const userMail = {
      from: `"Paramount Propack Pvt. Ltd." <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.OWNER_EMAIL,
      subject: "Thank You for Your Quote Request - Paramount Propack",
      html: emailTemplate(
        "Thank You for Reaching Out!",
        `Hi <strong style="color:#ec792b;">${name}</strong>,<br><br>We have received your quote request and our team will contact you within 24 hours.<br><br>We appreciate your interest in <strong>Paramount Propack Pvt. Ltd.</strong> and look forward to serving you.`,
        "",
        
      ),
    };

    // ✅ Respond to client immediately
    res.json({ success: true, message: "Emails are being sent" });

    // ✅ Send both emails in parallel
    Promise.all([
      transporter.sendMail(ownerMail),
      transporter.sendMail(userMail),
    ])
      .then(() => console.log("✅ Both emails sent successfully"))
      .catch((error) => console.error("❌ Email sending failed:", error));

  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ error: "Failed to send mail" });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});