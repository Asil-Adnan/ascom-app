export const OTP_TEMPLATE = (code: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
  <style>
    /* Reset & Basics */
    body { margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
    table { border-spacing: 0; border-collapse: collapse; }
    td { padding: 0; }
    img { border: 0; }
    
    /* Container */
    .wrapper { width: 100%; table-layout: fixed; background-color: #f4f4f5; padding-bottom: 40px; }
    .main-table { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 500px; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    
    /* Branding */
    .brand-strip { background-color: #ef4444; height: 6px; width: 100%; }
    .logo-container { padding: 40px 0 20px 0; text-align: center; }
    .logo-img { width: 180px; height: auto; } /* Adjust width based on your preference */

    /* Content */
    .content-body { padding: 0 40px 40px 40px; text-align: center; }
    .heading { color: #18181b; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; letter-spacing: -0.5px; }
    .subtext { color: #52525b; font-size: 15px; line-height: 24px; margin: 0 0 32px 0; }
    
    /* The OTP Hero */
    .otp-container { background-color: #fef2f2; border-radius: 12px; border: 1px solid #fee2e2; padding: 24px; margin-bottom: 32px; }
    .otp-code { font-family: 'Courier New', Courier, monospace; font-size: 42px; font-weight: 800; color: #ef4444; letter-spacing: 12px; margin: 0; line-height: 1; }
    .otp-label { font-size: 11px; text-transform: uppercase; color: #991b1b; font-weight: 600; letter-spacing: 1px; margin-top: 12px; display: block; opacity: 0.7; }

    /* Footer */
    .footer { text-align: center; padding: 20px; color: #a1a1aa; font-size: 12px; line-height: 18px; }
    .footer-link { color: #a1a1aa; text-decoration: underline; }
  </style>
</head>
<body>

  <div class="wrapper">
    <br><br>
    
    <table class="main-table" align="center">
      <tr>
        <td class="brand-strip"></td>
      </tr>

      <tr>
        <td class="logo-container">
          <img src="https://raw.githubusercontent.com/aaofasdxb/email/refs/heads/main/allsupport-logo.png" alt="allsupport.com" class="logo-img">
        </td>
      </tr>

      <tr>
        <td class="content-body">
          <h1 class="heading">Login Verification</h1>
          <p class="subtext">
            Hello, <br>
            Use the code below to complete your authentication. 
            <br>This code is valid for <strong>5 minutes</strong>.
          </p>

          <div class="otp-container">
            <div class="otp-code">${code}</div>
            <span class="otp-label">Verification Code</span>
          </div>

          <p class="subtext" style="font-size: 13px; color: #71717a; margin-bottom: 0;">
            If you didn't request this email, there's nothing to worry about, you can safely ignore it.
          </p>
        </td>
      </tr>
    </table>

    <div class="footer">
      <p>
        &copy; ${new Date().getFullYear()} allsupport digital.<br>
        Dubai, United Arab Emirates
      </p>
      <p>
        <a href="#" class="footer-link">Privacy Policy</a> &bull; <a href="#" class="footer-link">Contact Support</a>
      </p>
    </div>

  </div>

</body>
</html>
`;