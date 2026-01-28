// src/tests/pages/StaticPage/StaticPage.test.tsx

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import StaticPage from '../../../pages/StaticPage/StaticPage';

// Mock the useNavigate hook from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

import { useNavigate } from 'react-router-dom';

describe('StaticPage Component', () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders the welcome message', () => {
    render(<StaticPage />);
    expect(screen.getByText(/welcome to todo app/i)).toBeTruthy();
  });

  it('renders the subtitle', () => {
    render(<StaticPage />);
    expect(screen.getByText(/powered by react \+ supabase/i)).toBeTruthy();
  });

  it('navigates to the Form page when the button is clicked', () => {
    render(<StaticPage />);
    const button = screen.getByRole('button', { name: /go to form/i });
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith('/form');
  });

  it('matches the snapshot', () => {
    const { container } = render(<StaticPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
