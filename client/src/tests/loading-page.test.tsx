import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoadingPage } from '../pages/loading-page/loading-page';

describe('LoadingPage', () => {
  it('отображает анимированный домик', () => {
    render(
      <MemoryRouter>
        <LoadingPage />
      </MemoryRouter>
    );
    
    expect(document.querySelector('.loading__house')).toBeInTheDocument();
  });
});