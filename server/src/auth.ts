import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { emailOTP } from 'better-auth/plugins';
import { Resend } from 'resend';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'Platinum VC Studios <onboarding@resend.dev>';

const OTP_SUBJECTS: Record<'sign-in' | 'email-verification' | 'forget-password' | 'change-email', string> = {
  'sign-in': 'Your Platinum VC Studios sign-in code',
  'email-verification': 'Verify your Platinum VC Studios email',
  'forget-password': 'Your Platinum VC Studios password reset code',
  'change-email': 'Confirm your new Platinum VC Studios email',
};

/**
 * Last OTP sent per "email:type", kept in memory only so integration tests can
 * read the real generated code without needing a live inbox. Never exposed over HTTP.
 */
export const lastSentOtps = new Map<string, string>();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.CLIENT_ORIGIN ?? 'http://localhost:5183'],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      firstName: {
        type: 'string',
        required: true,
      },
      lastName: {
        type: 'string',
        required: true,
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        lastSentOtps.set(`${email}:${type}`, otp);

        const { error } = await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: OTP_SUBJECTS[type],
          text: `Your code is ${otp}. It expires in 5 minutes. If you did not request this, you can ignore this email.`,
        });

        if (error) {
          console.error(`Failed to send ${type} OTP to ${email}:`, error);
        }
      },
    }),
  ],
});
