import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { SubjectListItem } from '@/pages/subjects/SubjectListItem';
import type { SubjectData } from '@/types/api';

const baseSubject: SubjectData = {
  id: 1,
  name: 'Math 101',
  description: 'Algebra and geometry',
  created_at: '2026-01-15T10:30:00Z',
};

it('renders the subject name', () => {
  render(
    <MemoryRouter>
      <SubjectListItem subject={baseSubject} onDelete={() => {}} />
    </MemoryRouter>,
  );

  expect(screen.getByText('Math 101')).toBeInTheDocument();
});

it('renders the description', () => {
  render(
    <MemoryRouter>
      <SubjectListItem subject={baseSubject} onDelete={() => {}} />
    </MemoryRouter>,
  );

  expect(screen.getByText('Algebra and geometry')).toBeInTheDocument();
});

it('shows fallback dash when description is empty', () => {
  render(
    <MemoryRouter>
      <SubjectListItem
        subject={{ ...baseSubject, description: '' }}
        onDelete={() => {}}
      />
    </MemoryRouter>,
  );

  expect(screen.getByText('-')).toBeInTheDocument();
});

it('shows fallback dash when description is only whitespace', () => {
  render(
    <MemoryRouter>
      <SubjectListItem
        subject={{ ...baseSubject, description: '   ' }}
        onDelete={() => {}}
      />
    </MemoryRouter>,
  );

  expect(screen.getByText('-')).toBeInTheDocument();
});

it('renders the creation date in a short format', () => {
  render(
    <MemoryRouter>
      <SubjectListItem subject={baseSubject} onDelete={() => {}} />
    </MemoryRouter>,
  );

  expect(screen.getByText(/1\/15\/26/)).toBeInTheDocument();
});

it('calls onDelete with the subject id when Delete button is clicked', async () => {
  const onDelete = vi.fn();

  render(
    <MemoryRouter>
      <SubjectListItem subject={baseSubject} onDelete={onDelete} />
    </MemoryRouter>,
  );

  await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
  expect(onDelete).toHaveBeenCalledExactlyOnceWith(1);
});

it('renders a View link pointing to the subject detail page', () => {
  render(
    <MemoryRouter>
      <SubjectListItem subject={baseSubject} onDelete={() => {}} />
    </MemoryRouter>,
  );

  const link = screen.getByRole('link', { name: 'View' });
  expect(link).toHaveAttribute('href', '/subjects/1');
});
