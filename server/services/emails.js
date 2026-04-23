import { transporter } from "../config/mailtrap.js";

export const sendContactEmail = async (
  name, email, subject, message
) => {
  const recipients = [process.env.EMAIL_USER];
  try {
    const info = await transporter.sendMail({
      from: {
        name: "Portfolio Contact Form",
        address: process.env.EMAIL_USER,
      },
      to: recipients,
      replyTo: email,
      subject: `New Message: ${subject}`,
      html: `
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.08); border: 1px solid #eaeaea;">
          <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">New Portfolio Message</h2>
          </div>
          <div style="padding: 30px;">
            <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px; line-height: 1.5;">You have received a new message from your portfolio contact form.</p>
            
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #4f46e5;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500; width: 80px;">Name:</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Email:</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600;">
                    <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Subject:</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600;">${subject}</td>
                </tr>
              </table>
            </div>

            <h3 style="color: #111827; font-size: 16px; margin-bottom: 10px; font-weight: 600;">Message Content:</h3>
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
              <p style="color: #374151; margin: 0; line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${message}</p>
            </div>
          </div>
          <div style="background-color: #f3f4f6; padding: 15px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">Sent automatically from your portfolio website.</p>
          </div>
        </div>
      `
    });
    console.log(`Contact email sent to ${process.env.EMAIL_USER}`);
  } catch (error) {
    console.log(`Error in sending contact email ${error.message}`);
  }
};

export const sendAutoReply = async (name, email) => {
  try {
    await transporter.sendMail({
      from: {
        name: "Nevil Nakrani",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: "Message Received! Thanks for getting in touch",
      html: `
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.08); border: 1px solid #eaeaea;">
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%); padding: 30px 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">Message Received!</h2>
          </div>
          <div style="padding: 30px;">
            <h3 style="color: #111827; font-size: 20px; margin-top: 0; margin-bottom: 15px;">Hi ${name},</h3>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for reaching out! This is an automated reply to let you know that I have received your message. 
            </p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              I will review it and get back to you as soon as possible. If you need to share any additional details, feel free to reply directly to this email.
            </p>
            
            <div style="border-top: 2px solid #f3f4f6; padding-top: 25px; margin-top: 30px;">
              <p style="color: #111827; font-weight: 600; font-size: 16px; margin: 0 0 5px 0;">Nevil Nakrani</p>
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0;">Full-Stack Developer</p>
              <a href="https://portfolio-eta-silk-0fo3y5164j.vercel.app" style="display: inline-block; background-color: #f3f4f6; color: #4b5563; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: 600; transition: background-color 0.2s;">Visit My Portfolio</a>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Auto-reply sent");
  } catch (error) {
    console.log(`Error in auto reply ${error.message}`);
  }
};