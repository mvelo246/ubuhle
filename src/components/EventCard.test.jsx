import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EventCard from './EventCard';

const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('EventCard', () => {
  const mockEvent = {
    id: 1,
    title: 'Test Concert',
    date: 'October 29, 2025',
    image: 'https://example.com/event.jpg',
    description: 'A great concert event',
  };

  it('renders event title', () => {
    renderWithRouter(<EventCard event={mockEvent} />);
    expect(screen.getByText('Test Concert')).toBeInTheDocument();
  });

  it('renders event date', () => {
    renderWithRouter(<EventCard event={mockEvent} />);
    expect(screen.getByText('October 29, 2025')).toBeInTheDocument();
  });

  it('renders event description', () => {
    renderWithRouter(<EventCard event={mockEvent} />);
    expect(screen.getByText('A great concert event')).toBeInTheDocument();
  });

  it('renders event image with correct src and alt', () => {
    renderWithRouter(<EventCard event={mockEvent} />);
    const img = screen.getByRole('img', { name: 'Test Concert' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/event.jpg');
  });

  it('renders Read More link to event detail page', () => {
    renderWithRouter(<EventCard event={mockEvent} />);
    const link = screen.getByRole('link', { name: /read more/i });
    expect(link).toHaveAttribute('href', '/event/1');
  });
});
