import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';

describe('VideoPlayer', () => {
  it('shows YouTube embed when youtubeUrl with watch format is provided', () => {
    const song = {
      name: 'Test Song',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    };
    render(<VideoPlayer song={song} />);
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toContain('youtube.com/embed/dQw4w9WgXcQ');
  });

  it('shows YouTube embed from youtu.be short URL', () => {
    const song = {
      name: 'Short URL Song',
      youtubeUrl: 'https://youtu.be/abc123xyz',
    };
    render(<VideoPlayer song={song} />);
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toContain('youtube.com/embed/abc123xyz');
  });

  it('shows YouTube embed from embed URL', () => {
    const song = {
      name: 'Embed Song',
      youtubeUrl: 'https://www.youtube.com/embed/xyz789abc',
    };
    render(<VideoPlayer song={song} />);
    const iframe = document.querySelector('iframe');
    expect(iframe.src).toContain('youtube.com/embed/xyz789abc');
  });

  it('shows YouTube embed from shorts URL', () => {
    const song = {
      name: 'Shorts Song',
      youtubeUrl: 'https://www.youtube.com/shorts/shortId123',
    };
    render(<VideoPlayer song={song} />);
    const iframe = document.querySelector('iframe');
    expect(iframe.src).toContain('youtube.com/embed/shortId123');
  });

  it('shows fallback message when no youtubeUrl', () => {
    render(<VideoPlayer song={{}} />);
    expect(screen.getByText('No YouTube link available')).toBeInTheDocument();
  });

  it('shows fallback message when song is null', () => {
    render(<VideoPlayer song={null} />);
    expect(screen.getByText('No YouTube link available')).toBeInTheDocument();
  });

  it('shows fallback message when youtubeUrl is not a valid YouTube URL', () => {
    const song = {
      name: 'Bad URL',
      youtubeUrl: 'https://example.com/not-youtube',
    };
    render(<VideoPlayer song={song} />);
    expect(screen.getByText('No YouTube link available')).toBeInTheDocument();
  });

  it('sets iframe title from song name', () => {
    const song = {
      name: 'My Custom Song',
      youtubeUrl: 'https://www.youtube.com/watch?v=test123',
    };
    render(<VideoPlayer song={song} />);
    const iframe = document.querySelector('iframe');
    expect(iframe.title).toBe('My Custom Song');
  });

  it('uses default iframe title when song has no name', () => {
    const song = {
      youtubeUrl: 'https://www.youtube.com/watch?v=test123',
    };
    render(<VideoPlayer song={song} />);
    const iframe = document.querySelector('iframe');
    expect(iframe.title).toBe('YouTube video player');
  });

  it('extracts video ID correctly when URL has extra params', () => {
    const song = {
      name: 'Param Song',
      youtubeUrl: 'https://www.youtube.com/watch?v=abc123&list=PLxyz&index=5',
    };
    render(<VideoPlayer song={song} />);
    const iframe = document.querySelector('iframe');
    expect(iframe.src).toContain('youtube.com/embed/abc123');
  });
});
