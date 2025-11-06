import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useContactForm } from '../useContactForm';

// Mock react-hook-form
vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual('react-hook-form');
  return {
    ...actual,
    useForm: vi.fn(() => ({
      register: vi.fn(),
      handleSubmit: vi.fn((fn) => fn),
      formState: { errors: {}, isSubmitting: false },
      reset: vi.fn(),
    })),
  };
});

describe('useContactForm', () => {
  it('should return form methods', () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current).toHaveProperty('register');
    expect(result.current).toHaveProperty('handleSubmit');
    expect(result.current).toHaveProperty('errors');
    expect(result.current).toHaveProperty('isSubmitting');
    expect(result.current).toHaveProperty('reset');
  });
});
