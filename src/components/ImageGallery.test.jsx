import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageGallery from './ImageGallery';

const mockImages = [
  'https://example.com/img1.jpg',
  'https://example.com/img2.jpg',
  'https://example.com/img3.jpg',
  'https://example.com/img4.jpg',
];

describe('ImageGallery', () => {
  it('renders all gallery thumbnail images', () => {
    render(<ImageGallery images={mockImages} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(4);
  });

  it('renders images with correct alt text', () => {
    render(<ImageGallery images={mockImages} />);
    expect(screen.getByAltText('Gallery 1')).toBeInTheDocument();
    expect(screen.getByAltText('Gallery 2')).toBeInTheDocument();
    expect(screen.getByAltText('Gallery 3')).toBeInTheDocument();
    expect(screen.getByAltText('Gallery 4')).toBeInTheDocument();
  });

  it('renders images with correct src', () => {
    render(<ImageGallery images={mockImages} />);
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', 'https://example.com/img1.jpg');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/img2.jpg');
    expect(images[2]).toHaveAttribute('src', 'https://example.com/img3.jpg');
    expect(images[3]).toHaveAttribute('src', 'https://example.com/img4.jpg');
  });

  it('does not show lightbox overlay initially', () => {
    render(<ImageGallery images={mockImages} />);
    // Lightbox has cursor-zoom-out class on its overlay
    const overlay = document.querySelector('.cursor-zoom-out');
    expect(overlay).not.toBeInTheDocument();
  });

  it('opens lightbox when clicking a thumbnail', () => {
    render(<ImageGallery images={mockImages} />);
    const thumbnails = screen.getAllByRole('img');
    fireEvent.click(thumbnails[0]);
    // After click, lightbox should appear with the full image
    const lightboxImage = screen.getByAltText('Gallery image 1');
    expect(lightboxImage).toBeInTheDocument();
    expect(lightboxImage).toHaveAttribute('src', 'https://example.com/img1.jpg');
  });

  it('opens lightbox with correct image when clicking second thumbnail', () => {
    render(<ImageGallery images={mockImages} />);
    const thumbnails = screen.getAllByRole('img');
    fireEvent.click(thumbnails[1]);
    const lightboxImage = screen.getByAltText('Gallery image 2');
    expect(lightboxImage).toBeInTheDocument();
    expect(lightboxImage).toHaveAttribute('src', 'https://example.com/img2.jpg');
  });

  it('navigates to next image with next button', () => {
    render(<ImageGallery images={mockImages} />);
    // Open lightbox on first image
    const thumbnails = screen.getAllByRole('img');
    fireEvent.click(thumbnails[0]);

    // Find the next button (second button in lightbox)
    const buttons = document.querySelectorAll('.fixed button');
    const nextButton = buttons[1];
    fireEvent.click(nextButton);

    // Should now show image 2
    const lightboxImage = screen.getByAltText('Gallery image 2');
    expect(lightboxImage).toHaveAttribute('src', 'https://example.com/img2.jpg');
  });

  it('navigates to previous image with prev button', () => {
    render(<ImageGallery images={mockImages} />);
    // Open lightbox on second image
    const thumbnails = screen.getAllByRole('img');
    fireEvent.click(thumbnails[1]);

    // Find the prev button (first button in lightbox)
    const buttons = document.querySelectorAll('.fixed button');
    const prevButton = buttons[0];
    fireEvent.click(prevButton);

    // Should now show image 1
    const lightboxImage = screen.getByAltText('Gallery image 1');
    expect(lightboxImage).toHaveAttribute('src', 'https://example.com/img1.jpg');
  });

  it('wraps around to first image when next on last image', () => {
    render(<ImageGallery images={mockImages} />);
    // Open lightbox on last image (index 3)
    const thumbnails = screen.getAllByRole('img');
    fireEvent.click(thumbnails[3]);

    // Click next
    const buttons = document.querySelectorAll('.fixed button');
    const nextButton = buttons[1];
    fireEvent.click(nextButton);

    // Should wrap to first image
    const lightboxImage = screen.getByAltText('Gallery image 1');
    expect(lightboxImage).toHaveAttribute('src', 'https://example.com/img1.jpg');
  });

  it('wraps around to last image when prev on first image', () => {
    render(<ImageGallery images={mockImages} />);
    // Open lightbox on first image
    const thumbnails = screen.getAllByRole('img');
    fireEvent.click(thumbnails[0]);

    // Click prev
    const buttons = document.querySelectorAll('.fixed button');
    const prevButton = buttons[0];
    fireEvent.click(prevButton);

    // Should wrap to last image
    const lightboxImage = screen.getByAltText('Gallery image 4');
    expect(lightboxImage).toHaveAttribute('src', 'https://example.com/img4.jpg');
  });

  it('closes lightbox when clicking overlay background', () => {
    render(<ImageGallery images={mockImages} />);
    const thumbnails = screen.getAllByRole('img');
    fireEvent.click(thumbnails[0]);

    // Lightbox should be open
    expect(screen.getByAltText('Gallery image 1')).toBeInTheDocument();

    // Click the overlay background
    const overlay = document.querySelector('.cursor-zoom-out');
    fireEvent.click(overlay);

    // Lightbox should be closed
    expect(screen.queryByAltText('Gallery image 1')).not.toBeInTheDocument();
  });

  it('closes lightbox when Escape key is pressed', () => {
    render(<ImageGallery images={mockImages} />);
    const thumbnails = screen.getAllByRole('img');
    fireEvent.click(thumbnails[0]);

    expect(screen.getByAltText('Gallery image 1')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByAltText('Gallery image 1')).not.toBeInTheDocument();
  });

  it('handles empty images array', () => {
    render(<ImageGallery images={[]} />);
    const images = screen.queryAllByRole('img');
    expect(images).toHaveLength(0);
  });

  it('navigates with ArrowRight key', () => {
    render(<ImageGallery images={mockImages} />);
    const thumbnails = screen.getAllByRole('img');
    fireEvent.click(thumbnails[0]);

    fireEvent.keyDown(window, { key: 'ArrowRight' });

    const lightboxImage = screen.getByAltText('Gallery image 2');
    expect(lightboxImage).toHaveAttribute('src', 'https://example.com/img2.jpg');
  });

  it('navigates with ArrowLeft key', () => {
    render(<ImageGallery images={mockImages} />);
    const thumbnails = screen.getAllByRole('img');
    fireEvent.click(thumbnails[1]);

    fireEvent.keyDown(window, { key: 'ArrowLeft' });

    const lightboxImage = screen.getByAltText('Gallery image 1');
    expect(lightboxImage).toHaveAttribute('src', 'https://example.com/img1.jpg');
  });
});
