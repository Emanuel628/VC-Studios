import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('shows the brand link and only the two legal links', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Platinum VC Studios' })).toHaveAttribute('href', '#top');

    const legalNav = screen.getByRole('navigation', { name: 'Legal' });
    const links = screen.getAllByRole('link', { name: /Terms & Conditions|Privacy Policy/ });
    expect(links).toHaveLength(2);
    expect(legalNav).toContainElement(screen.getByRole('link', { name: 'Terms & Conditions' }));
    expect(screen.getByRole('link', { name: 'Terms & Conditions' })).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
  });
});
