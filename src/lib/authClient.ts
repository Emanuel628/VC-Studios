import { emailOTPClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { API_BASE_URL } from './apiBaseUrl';

export const authClient = createAuthClient({
  baseURL: API_BASE_URL,
  plugins: [
    emailOTPClient(),
    inferAdditionalFields({
      user: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
      },
    }),
  ],
});

export const { useSession } = authClient;
