import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the welcome heading', () => {
    render(<Hero />);
    expect(screen.getByText('Welcome to Ubuhle Benkonjane')).toBeInTheDocument();
  });

  it('renders the tagline text', () => {
    render(<Hero />);
    expect(
      screen.getByText(/Music is powerful. As people listen to it/)
    ).toBeInTheDocument();
  });

  it('renders background image', () => {
    render(<Hero />);
    const img = screen.getByRole('img', { name: 'Background' });
    expect(img).toBeInTheDocument();
  });
});
