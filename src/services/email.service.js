
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"PaySphere" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to PaySphere — You're in!";

  const text = `Hello ${name},

We're delighted to have you join PaySphere.

Your account is live and ready. Here's what you can do right now:
  - Send & receive instant payments
  - Track spending with smart analytics
  - Enjoy bank-grade security on every transaction
  - Reach our 24/7 support team anytime

Get started: https://app.paysphere.com/dashboard

If you have any questions, just reply to this email — we read every message.

Warm regards,
The PaySphere Team`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to PaySphere</title>
</head>
<body style="margin:0;padding:0;background:#060912;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#060912;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;background:#0B0F1A;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">

          <!-- Header -->
          <tr>
            <td style="padding:48px 48px 36px;background:#0B0F1A;border-bottom:1px solid rgba(255,255,255,0.06);text-align:center;">
              <!-- Logo -->
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="background:linear-gradient(135deg,#4F8EF7,#7B6CF6);border-radius:9px;width:36px;height:36px;text-align:center;vertical-align:middle;">
                    <span style="color:#fff;font-size:18px;font-weight:700;">$</span>
                  </td>
                  <td style="padding-left:10px;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;vertical-align:middle;">PaySphere</td>
                </tr>
              </table>
              <!-- Badge -->
              <div style="display:inline-block;background:rgba(79,142,247,0.12);border:1px solid rgba(79,142,247,0.25);border-radius:100px;padding:6px 18px;margin-bottom:20px;">
                <span style="font-size:12px;color:#4F8EF7;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">Welcome aboard</span>
              </div>
              <!-- Headline -->
              <h1 style="margin:0 0 12px;font-size:32px;font-weight:400;color:#ffffff;line-height:1.2;letter-spacing:-0.02em;font-family:Georgia,serif;">
                Hello, <em style="font-style:italic;color:#7B9FFF;">${name}</em>
              </h1>
              <p style="color:rgba(255,255,255,0.45);font-size:15px;margin:0;">Your account is live and ready.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 48px;background:#0E1320;">
              <p style="font-size:16px;color:rgba(255,255,255,0.75);line-height:1.8;margin:0 0 28px;">
                We're genuinely delighted to have you join PaySphere. You now have access to a full suite of financial tools designed to make managing money effortless, intelligent, and secure.
              </p>

              <!-- Feature grid -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td width="48%" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px;vertical-align:top;">
                    <div style="background:rgba(79,142,247,0.15);width:32px;height:32px;border-radius:8px;margin-bottom:12px;text-align:center;line-height:32px;">
                      <span style="color:#4F8EF7;font-size:16px;">&#9646;</span>
                    </div>
                    <p style="font-size:13px;font-weight:600;color:#ffffff;margin:0 0 4px;">Instant Payments</p>
                    <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0;line-height:1.5;">Send and receive money in seconds.</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px;vertical-align:top;">
                    <div style="background:rgba(123,108,246,0.15);width:32px;height:32px;border-radius:8px;margin-bottom:12px;text-align:center;line-height:32px;">
                      <span style="color:#7B6CF6;font-size:16px;">&#9646;</span>
                    </div>
                    <p style="font-size:13px;font-weight:600;color:#ffffff;margin:0 0 4px;">Bank-Grade Security</p>
                    <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0;line-height:1.5;">256-bit encryption on every transaction.</p>
                  </td>
                </tr>
                <tr><td colspan="3" style="height:12px;"></td></tr>
                <tr>
                  <td width="48%" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px;vertical-align:top;">
                    <div style="background:rgba(32,201,151,0.15);width:32px;height:32px;border-radius:8px;margin-bottom:12px;text-align:center;line-height:32px;">
                      <span style="color:#20C997;font-size:16px;">&#9646;</span>
                    </div>
                    <p style="font-size:13px;font-weight:600;color:#ffffff;margin:0 0 4px;">Smart Analytics</p>
                    <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0;line-height:1.5;">Real-time spending insights at a glance.</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px;vertical-align:top;">
                    <div style="background:rgba(255,178,36,0.15);width:32px;height:32px;border-radius:8px;margin-bottom:12px;text-align:center;line-height:32px;">
                      <span style="color:#FFB224;font-size:16px;">&#9646;</span>
                    </div>
                    <p style="font-size:13px;font-weight:600;color:#ffffff;margin:0 0 4px;">24/7 Support</p>
                    <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0;line-height:1.5;">Our team is always here for you.</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
                <tr>
                  <td align="center">
                    <a href="https://app.paysphere.com/dashboard"
                       style="display:inline-block;background:linear-gradient(135deg,#4F8EF7,#7B6CF6);color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 36px;border-radius:100px;letter-spacing:0.01em;">
                      Get Started with PaySphere &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Closing note -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px solid rgba(255,255,255,0.06);padding-top:28px;">
                    <p style="font-size:14px;color:rgba(255,255,255,0.4);line-height:1.7;margin:0;">
                      Have questions? Reply to this email — we read every message. We're excited to be part of your financial journey.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 48px;background:#090D18;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
              <p style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.6);margin:0 0 4px;">The PaySphere Team</p>
              <p style="font-size:11px;color:rgba(255,255,255,0.2);margin:0;letter-spacing:0.03em;">
                &copy; 2025 PaySphere &middot;
                <a href="#" style="color:rgba(255,255,255,0.2);text-decoration:none;">Unsubscribe</a> &middot;
                <a href="#" style="color:rgba(255,255,255,0.2);text-decoration:none;">Privacy Policy</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await sendEmail(userEmail, subject, text, html);
}
module.exports = {
  sendRegistrationEmail
}