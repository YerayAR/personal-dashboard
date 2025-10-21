import { describe, it, expect } from 'vitest';
import {
  sanitizeString,
  validateAmount,
  validateTransactionType,
  validateDate,
  validateCategory,
  RateLimiter
} from '../../src/lib/utils/security';

describe('Security utilities', () => {
  describe('sanitizeString', () => {
    it('should sanitize XSS attempts', () => {
      expect(sanitizeString('<script>alert("xss")</script>'))
        .toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    });

    it('should handle empty strings', () => {
      expect(sanitizeString('')).toBe('');
      expect(sanitizeString(null as any)).toBe('');
      expect(sanitizeString(undefined as any)).toBe('');
    });

    it('should trim whitespace', () => {
      expect(sanitizeString('  test  ')).toBe('test');
    });
  });

  describe('validateAmount', () => {
    it('should accept valid amounts', () => {
      expect(validateAmount(100)).toBe(100);
      expect(validateAmount(0.01)).toBe(0.01);
      expect(validateAmount('123.45')).toBe(123.45);
    });

    it('should reject invalid amounts', () => {
      expect(validateAmount(-1)).toBeNull();
      expect(validateAmount(NaN)).toBeNull();
      expect(validateAmount(Infinity)).toBeNull();
      expect(validateAmount(1000001)).toBeNull();
      expect(validateAmount('abc')).toBeNull();
    });

    it('should round to 2 decimal places', () => {
      expect(validateAmount(123.456)).toBe(123.46);
    });
  });

  describe('validateTransactionType', () => {
    it('should accept valid types', () => {
      expect(validateTransactionType('income')).toBe('income');
      expect(validateTransactionType('expense')).toBe('expense');
    });

    it('should reject invalid types', () => {
      expect(validateTransactionType('invalid')).toBeNull();
      expect(validateTransactionType('')).toBeNull();
      expect(validateTransactionType(null)).toBeNull();
    });
  });

  describe('validateDate', () => {
    it('should accept valid dates', () => {
      const today = new Date().toISOString().split('T')[0];
      expect(validateDate(today)).toBe(today);
    });

    it('should reject invalid dates', () => {
      expect(validateDate('invalid-date')).toBeNull();
      expect(validateDate('')).toBeNull();
      expect(validateDate(null)).toBeNull();
    });

    it('should reject dates too far in past/future', () => {
      expect(validateDate('1900-01-01')).toBeNull();
      expect(validateDate('2050-01-01')).toBeNull();
    });
  });

  describe('validateCategory', () => {
    it('should accept valid categories', () => {
      expect(validateCategory('Food')).toBe('Food');
      expect(validateCategory('Transport-Bus')).toBe('Transport-Bus');
    });

    it('should reject invalid categories', () => {
      expect(validateCategory('')).toBeNull();
      expect(validateCategory('a'.repeat(51))).toBeNull();
      expect(validateCategory('<script>')).toBeNull();
    });

    it('should sanitize category names', () => {
      expect(validateCategory('Food and Drinks')).toBe('Food and Drinks');
    });

    it('should reject categories with invalid characters', () => {
      expect(validateCategory('Food & Drinks')).toBeNull();
      expect(validateCategory('Food<script>')).toBeNull();
    });
  });

  describe('RateLimiter', () => {
    it('should allow requests within limits', () => {
      const limiter = new RateLimiter(2, 1000);
      expect(limiter.isAllowed('test')).toBe(true);
      expect(limiter.isAllowed('test')).toBe(true);
    });

    it('should block requests over limit', () => {
      const limiter = new RateLimiter(2, 1000);
      limiter.isAllowed('test');
      limiter.isAllowed('test');
      expect(limiter.isAllowed('test')).toBe(false);
    });

    it('should allow different identifiers', () => {
      const limiter = new RateLimiter(1, 1000);
      limiter.isAllowed('user1');
      expect(limiter.isAllowed('user2')).toBe(true);
    });
  });
});