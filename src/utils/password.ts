export type PasswordRuleKey = 'length' | 'uppercase' | 'lowercase' | 'number' | 'symbol';

export type PasswordRule = {
  key: PasswordRuleKey;
  label: string;
  test: (password: string) => boolean;
};

export const PASSWORD_RULES: PasswordRule[] = [
  {
    key: 'length',
    label: 'At least 8 characters',
    test: (password) => password.length >= 8,
  },
  {
    key: 'uppercase',
    label: 'One uppercase letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    key: 'lowercase',
    label: 'One lowercase letter',
    test: (password) => /[a-z]/.test(password),
  },
  {
    key: 'number',
    label: 'One number',
    test: (password) => /\d/.test(password),
  },
  {
    key: 'symbol',
    label: 'One symbol',
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

export type PasswordStrength = {
  score: number;
  level: 0 | 1 | 2 | 3 | 4;
  label: 'Enter a password' | 'Weak' | 'Fair' | 'Good' | 'Strong';
  results: Record<PasswordRuleKey, boolean>;
};

export function evaluatePassword(password: string): PasswordStrength {
  const results = PASSWORD_RULES.reduce<Record<PasswordRuleKey, boolean>>(
    (current, rule) => {
      current[rule.key] = rule.test(password);
      return current;
    },
    {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      symbol: false,
    },
  );

  const score = Object.values(results).filter(Boolean).length;

  if (!password) {
    return { score, level: 0, label: 'Enter a password', results };
  }

  if (score <= 2) {
    return { score, level: 1, label: 'Weak', results };
  }

  if (score === 3) {
    return { score, level: 2, label: 'Fair', results };
  }

  if (score === 4) {
    return { score, level: 3, label: 'Good', results };
  }

  return { score, level: 4, label: 'Strong', results };
}

export function isPasswordValid(password: string): boolean {
  return PASSWORD_RULES.every((rule) => rule.test(password));
}
