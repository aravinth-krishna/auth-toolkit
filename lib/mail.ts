import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmEmailLink = `${domain}/new-email-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your Email",
    html: `<p><a href="${confirmEmailLink}">Click here</a> to confirm your Email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetPasswordLink = `${domain}/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your Password",
    html: `<p><a href="${resetPasswordLink}">Click here</a> to reset your Password.</p>`,
  });
};

export const sendTwoFactorAuthTokenEmail = async (
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your 2FA code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};
