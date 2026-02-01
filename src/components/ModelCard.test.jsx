import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ModelCard from './ModelCard';

const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('ModelCard', () => {
  const mockModel = {
    id: 1,
    name: 'Test Model',
    image: 'https://example.com/model.jpg',
  };

  it('renders model name', () => {
    renderWithRouter(<ModelCard model={mockModel} />);
    expect(screen.getByText('Test Model')).toBeInTheDocument();
  });

  it('renders model image with correct src and alt', () => {
    renderWithRouter(<ModelCard model={mockModel} />);
    const img = screen.getByRole('img', { name: 'Test Model' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/model.jpg');
  });

  it('renders See More link to model detail page', () => {
    renderWithRouter(<ModelCard model={mockModel} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/model/1');
  });

  it('renders See More button text', () => {
    renderWithRouter(<ModelCard model={mockModel} />);
    expect(screen.getByText('See More')).toBeInTheDocument();
  });

  it('links to correct detail page for different model ids', () => {
    const model2 = { id: 42, name: 'Model 42', image: '/img.jpg' };
    renderWithRouter(<ModelCard model={model2} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/model/42');
  });

  it('renders with different model names correctly', () => {
    const model = { id: 3, name: 'Fashion Star', image: '/star.jpg' };
    renderWithRouter(<ModelCard model={model} />);
    expect(screen.getByText('Fashion Star')).toBeInTheDocument();
    const img = screen.getByRole('img', { name: 'Fashion Star' });
    expect(img).toHaveAttribute('src', '/star.jpg');
  });

  it('renders the button inside the link', () => {
    renderWithRouter(<ModelCard model={mockModel} />);
    const button = screen.getByRole('button', { name: /see more/i });
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/model/1');
  });
});
