import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 Momentum Code/)).toBeInTheDocument();
  });

  it('renders all 5 social media links', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
  });

  it('has correct social media hrefs', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    const hrefs = links.map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('https://facebook.com');
    expect(hrefs).toContain('https://instagram.com');
    expect(hrefs).toContain('https://tiktok.com');
    expect(hrefs).toContain('https://youtube.com');
    expect(hrefs).toContain('https://twitter.com');
  });

  it('opens social links in new tab', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders SVG icons with xmlns attribute', () => {
    render(<Footer />);
    const svgs = document.querySelectorAll('svg');
    expect(svgs).toHaveLength(5);
    svgs.forEach((svg) => {
      expect(svg.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    });
  });

  it('includes top margin by default', () => {
    render(<Footer />);
    const footer = document.querySelector('footer');
    expect(footer.className).toContain('mt-12');
  });

  it('removes top margin when noTopMargin is true', () => {
    render(<Footer noTopMargin={true} />);
    const footer = document.querySelector('footer');
    expect(footer.className).not.toContain('mt-12');
  });
});
