import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Message } from '@/pages/chat/Message/Message';
import type { MessageData } from '@/types/api';

test('renders message data', () => {
  const msg: MessageData = {
    id: 1,
    username: 'Bob',
    message: 'Hello World!',
    created_at: '2024',
  };

  render(<Message message={msg} username="Alice" />);

  const userHeading = screen.getByText('Bob');
  expect(userHeading).toHaveTextContent('Bob');

  const body = screen.getByText('Hello World!', { exact: false });
  expect(body).toHaveTextContent('Hello World!');
});
