import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmEmailLink = `http://localhost:3000/new-email-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your Email",
    html: `<p><a href="${confirmEmailLink}">Click here</a> to confirm your Email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetPasswordLink = `http://localhost:3000/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your Password",
    html: `<p><a href="${resetPasswordLink}">Click here</a> to reset your Password.</p>`,
  });
};
