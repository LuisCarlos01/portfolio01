import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders correctly', () => {
    render(<Textarea placeholder="Enter message" />);
    expect(screen.getByPlaceholderText('Enter message')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Textarea error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('associates error with textarea via aria-describedby', () => {
    render(<Textarea id="test-textarea" error="Error message" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-describedby', 'test-textarea-error');
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'test message');
    expect(textarea).toHaveValue('test message');
  });

  it('applies disabled state', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });
});
