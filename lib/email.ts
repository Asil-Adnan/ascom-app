import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com', // fallback
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendEmail(to: string, subject: string, html: string) {
    if (!process.env.SMTP_USER) {
        console.warn('⚠️ SMTP_USER not set. Email simulation mode.');
        console.log(`[EMAIL SIMULATION] To: ${to} | Subject: ${subject} | Content: ${html}`);
        return true;
    }

    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || '"AllSupport Secure" <no-reply@allsupport.digital>',
            to,
            subject,
            html,
        });
        console.log('Message sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}
