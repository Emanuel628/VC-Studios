import { describe, expect, it } from 'vitest';
import { PASSWORD_RULES, evaluatePassword, isPasswordValid } from './password';

describe('PASSWORD_RULES', () => {
  it('checks length', () => {
    const rule = PASSWORD_RULES.find((r) => r.key === 'length')!;
    expect(rule.test('short')).toBe(false);
    expect(rule.test('longenough')).toBe(true);
  });

  it('checks uppercase, lowercase, number, and symbol independently', () => {
    const uppercase = PASSWORD_RULES.find((r) => r.key === 'uppercase')!;
    const lowercase = PASSWORD_RULES.find((r) => r.key === 'lowercase')!;
    const number = PASSWORD_RULES.find((r) => r.key === 'number')!;
    const symbol = PASSWORD_RULES.find((r) => r.key === 'symbol')!;

    expect(uppercase.test('abc')).toBe(false);
    expect(uppercase.test('Abc')).toBe(true);

    expect(lowercase.test('ABC')).toBe(false);
    expect(lowercase.test('ABc')).toBe(true);

    expect(number.test('abc')).toBe(false);
    expect(number.test('abc1')).toBe(true);

    expect(symbol.test('abc1')).toBe(false);
    expect(symbol.test('abc1!')).toBe(true);
  });
});

describe('evaluatePassword', () => {
  it('returns the empty state for an empty password', () => {
    const result = evaluatePassword('');
    expect(result.level).toBe(0);
    expect(result.label).toBe('Enter a password');
  });

  it('scores a password meeting two or fewer rules as Weak', () => {
    const result = evaluatePassword('abc');
    expect(result.score).toBeLessThanOrEqual(2);
    expect(result.level).toBe(1);
    expect(result.label).toBe('Weak');
  });

  it('scores a password meeting exactly three rules as Fair', () => {
    const result = evaluatePassword('abcdefgh1');
    expect(result.score).toBe(3);
    expect(result.level).toBe(2);
    expect(result.label).toBe('Fair');
  });

  it('scores a password meeting exactly four rules as Good', () => {
    const result = evaluatePassword('Abcdefgh1');
    expect(result.score).toBe(4);
    expect(result.level).toBe(3);
    expect(result.label).toBe('Good');
  });

  it('scores a password meeting every rule as Strong', () => {
    const result = evaluatePassword('Abcdefgh1!');
    expect(result.score).toBe(5);
    expect(result.level).toBe(4);
    expect(result.label).toBe('Strong');
  });
});

describe('isPasswordValid', () => {
  it('rejects a password missing any required rule', () => {
    expect(isPasswordValid('abcdefgh1')).toBe(false);
  });

  it('accepts a password meeting every rule', () => {
    expect(isPasswordValid('Abcdefgh1!')).toBe(true);
  });
});
